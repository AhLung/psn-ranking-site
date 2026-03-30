from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import sys
import time
from datetime import UTC, datetime
from pathlib import Path
from typing import Any

try:
    from dotenv import load_dotenv
except ImportError:  # pragma: no cover - handled by fallback output
    load_dotenv = None

try:
    from psnawp_api import PSNAWP
except ImportError:  # pragma: no cover - handled by fallback output
    PSNAWP = None

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "data"
FRIENDS_PATH = DATA_DIR / "friends.json"
PLAYERS_PATH = DATA_DIR / "players.json"


def utc_now_iso() -> str:
    return datetime.now(UTC).isoformat().replace("+00:00", "Z")


def load_environment() -> None:
    if load_dotenv is None:
        return

    load_dotenv(ROOT / ".env")
    load_dotenv(ROOT / ".env.local", override=False)


def parse_args() -> argparse.Namespace:
    return argparse.ArgumentParser(
        description="Sync PlayStation trophy data into data/players.json using PSNAWP."
    ).parse_args()


def get_request_budget() -> tuple[int, int]:
    max_friends = int(os.getenv("PSN_SYNC_MAX_FRIENDS", "3") or "3")
    max_titles = int(os.getenv("PSN_SYNC_MAX_TITLES_PER_FRIEND", "3") or "3")
    return max(1, max_friends), max(1, max_titles)


def read_friends() -> list[str]:
    if not FRIENDS_PATH.exists():
        return []

    payload = json.loads(FRIENDS_PATH.read_text(encoding="utf-8"))
    raw_entries = payload.get("friends", payload) if isinstance(payload, dict) else payload

    friend_ids: list[str] = []
    for entry in raw_entries if isinstance(raw_entries, list) else []:
        if isinstance(entry, str) and entry.strip():
            friend_ids.append(entry.strip())
            continue

        if isinstance(entry, dict):
            online_id = str(entry.get("onlineId", "")).strip()
            if online_id:
                friend_ids.append(online_id)

    unique_ids: list[str] = []
    seen: set[str] = set()

    for friend_id in friend_ids:
        lowered = friend_id.lower()
        if lowered in seen:
            continue
        seen.add(lowered)
        unique_ids.append(friend_id)

    return unique_ids


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return slug or "psn-player"


def palette_for(seed: str) -> tuple[str, list[str]]:
    digest = hashlib.sha256(seed.encode("utf-8")).hexdigest()
    accent = f"#{digest[:6]}"
    gradient = [f"#{digest[6:12]}", f"#{digest[12:18]}"]
    return accent, gradient


def trophy_mix_to_dict(trophy_set: Any) -> dict[str, int]:
    return {
        "platinum": int(getattr(trophy_set, "platinum", 0) or 0),
        "gold": int(getattr(trophy_set, "gold", 0) or 0),
        "silver": int(getattr(trophy_set, "silver", 0) or 0),
        "bronze": int(getattr(trophy_set, "bronze", 0) or 0),
    }


def estimate_trophy_points(trophy_mix: dict[str, int]) -> int:
    return (
        trophy_mix["platinum"] * 300
        + trophy_mix["gold"] * 90
        + trophy_mix["silver"] * 30
        + trophy_mix["bronze"] * 15
    )


def choose_platform(platforms: Any) -> tuple[str, Any | None]:
    platform_values = list(platforms or [])
    if not platform_values:
        return "Unknown", None

    priority = {
        "PS5": 0,
        "PS4": 1,
        "PS3": 2,
        "PSVITA": 3,
        "PSVITA/TV": 4,
        "PSVR2": 5,
    }

    def key_fn(platform: Any) -> tuple[int, str]:
        label = str(getattr(platform, "value", platform)).upper()
        return priority.get(label, 999), label

    selected = sorted(platform_values, key=key_fn)[0]
    return str(getattr(selected, "value", selected)).upper(), selected


def serialize_trophy(trophy: Any) -> dict[str, Any]:
    trophy_type = getattr(trophy, "trophy_type", None)
    trophy_rarity = getattr(trophy, "trophy_rarity", None)
    earned_dt = getattr(trophy, "earned_date_time", None)

    return {
        "trophyId": getattr(trophy, "trophy_id", None),
        "trophyGroupId": getattr(trophy, "trophy_group_id", None),
        "trophyType": getattr(trophy_type, "value", str(trophy_type) if trophy_type else None),
        "trophyName": getattr(trophy, "trophy_name", None),
        "trophyDetail": getattr(trophy, "trophy_detail", None),
        "earned": getattr(trophy, "earned", None),
        "earnedDateTime": earned_dt.isoformat().replace("+00:00", "Z")
        if hasattr(earned_dt, "isoformat")
        else None,
        "trophyEarnRate": float(getattr(trophy, "trophy_earn_rate", 0) or 0),
        "trophyRarity": getattr(trophy_rarity, "value", str(trophy_rarity) if trophy_rarity else None),
    }


def classify_rarity(trophies: list[dict[str, Any]], completion: int) -> str:
    platinum_trophy = next(
        (trophy for trophy in trophies if str(trophy.get("trophyType", "")).lower() == "platinum"),
        None,
    )

    earn_rate = platinum_trophy.get("trophyEarnRate") if platinum_trophy else None
    if isinstance(earn_rate, (int, float)):
        if earn_rate <= 5:
            return "Ultra Rare"
        if earn_rate <= 20:
            return "Rare"
        return "Common"

    return "Rare" if completion < 100 else "Common"


def derive_milestones(titles: list[dict[str, Any]]) -> list[dict[str, str]]:
    milestones: list[dict[str, str]] = []

    for title in titles:
        if not title.get("platinumUnlocked"):
            continue

        milestone_date = title.get("lastUpdatedAt") or utc_now_iso()
        milestones.append(
            {
                "title": f'{title["titleName"]} platinum',
                "detail": "Synced from PSN trophy data through the PSNAWP ingestion skeleton.",
                "date": milestone_date,
            }
        )

        if len(milestones) >= 3:
            break

    return milestones


def build_stub_player(online_id: str, reason: str, max_friends: int, max_titles: int) -> dict[str, Any]:
    accent, gradient = palette_for(online_id)
    snapshot_date = utc_now_iso()

    return {
        "id": slugify(online_id),
        "psnId": online_id,
        "displayName": online_id,
        "handle": f"@{online_id.lower()}",
        "motto": reason,
        "region": "Unknown",
        "joinedAt": snapshot_date,
        "accent": accent,
        "avatarGradient": gradient,
        "favoriteGenres": ["Unknown"],
        "trophyMix": {"platinum": 0, "gold": 0, "silver": 0, "bronze": 0},
        "stats": {
            "platinum": 0,
            "completion": 0,
            "trophyPoints": 0,
            "gamesCompleted": 0,
            "weeklyTarget": 1,
        },
        "snapshots": [
            {
                "date": snapshot_date,
                "platinum": 0,
                "completion": 0,
                "trophyPoints": 0,
                "gamesCompleted": 0,
            }
        ],
        "gameProgress": [],
        "milestones": [],
        "featuredGameIds": [],
        "syncMetadata": {
            "onlineId": online_id,
            "accountId": None,
            "source": "mock-fallback",
            "retrievedAt": snapshot_date,
            "requestBudget": {
                "maxFriends": max_friends,
                "maxTitlesPerFriend": max_titles,
            },
        },
        "syncedTitles": [],
    }


def build_fallback_payload(
    friends: list[str],
    max_friends: int,
    max_titles: int,
    reason: str,
) -> dict[str, Any]:
    return {
        "generatedAt": utc_now_iso(),
        "source": "mock-fallback",
        "requestBudget": {
            "maxFriends": max_friends,
            "maxTitlesPerFriend": max_titles,
        },
        "friends": friends,
        "players": [build_stub_player(friend, reason, max_friends, max_titles) for friend in friends],
        "games": [],
        "notes": [reason],
    }


def fetch_titles_for_user(user: Any, max_titles: int) -> tuple[list[dict[str, Any]], list[dict[str, Any]], list[str]]:
    notes: list[str] = []
    titles_payload: list[dict[str, Any]] = []
    games_payload: list[dict[str, Any]] = []

    title_iterator = user.trophy_titles(limit=max_titles, page_size=min(max_titles, 50))
    titles = list(title_iterator)[:max_titles]

    for title in titles:
        if not getattr(title, "np_communication_id", None) or not getattr(title, "title_name", None):
            notes.append("Skipped a title because required trophy metadata was missing.")
            continue

        platform_label, platform_value = choose_platform(getattr(title, "title_platform", []))
        defined = trophy_mix_to_dict(getattr(title, "defined_trophies", None))
        earned = trophy_mix_to_dict(getattr(title, "earned_trophies", None))
        game_id = slugify(f'{title.title_name}-{title.np_communication_id}')[:72]
        trophies: list[dict[str, Any]] = []

        if platform_value is not None:
            try:
                trophy_iterator = user.trophies(
                    np_communication_id=title.np_communication_id,
                    platform=platform_value,
                    include_progress=True,
                    trophy_group_id="default",
                    limit=200,
                    page_size=200,
                )
                trophies = [serialize_trophy(trophy) for trophy in trophy_iterator]
            except Exception as exc:  # pragma: no cover - depends on remote response
                notes.append(
                    f'Could not fetch trophy details for "{title.title_name}": {type(exc).__name__}.'
                )

        rarity = classify_rarity(trophies, int(getattr(title, "progress", 0) or 0))
        progress = int(getattr(title, "progress", 0) or 0)
        updated_at = getattr(title, "last_updated_datetime", None)
        updated_at_iso = (
            updated_at.isoformat().replace("+00:00", "Z")
            if hasattr(updated_at, "isoformat")
            else None
        )

        titles_payload.append(
            {
                "gameId": game_id,
                "npCommunicationId": getattr(title, "np_communication_id", None),
                "npServiceName": getattr(title, "np_service_name", None),
                "titleName": title.title_name,
                "platform": platform_label,
                "genre": "Unknown",
                "rarity": rarity,
                "trophyCount": sum(defined.values()),
                "completion": progress,
                "platinumUnlocked": earned["platinum"] > 0,
                "lastUpdatedAt": updated_at_iso,
                "earnedTrophies": earned,
                "definedTrophies": defined,
                "trophies": trophies,
            }
        )

        accent, gradient = palette_for(game_id)
        games_payload.append(
            {
                "id": game_id,
                "title": title.title_name,
                "platform": platform_label,
                "genre": "Unknown",
                "rarity": rarity,
                "releaseYear": datetime.now(UTC).year,
                "trophyCount": sum(defined.values()),
                "coverGradient": [accent, gradient[0]],
            }
        )

        time.sleep(0.2)

    return titles_payload, games_payload, notes


def build_player_record(
    user: Any,
    online_id: str,
    titles_payload: list[dict[str, Any]],
    max_friends: int,
    max_titles: int,
) -> dict[str, Any]:
    trophy_summary = user.trophy_summary()
    trophy_mix = trophy_mix_to_dict(getattr(trophy_summary, "earned_trophies", None))
    trophy_points = estimate_trophy_points(trophy_mix)
    accent, gradient = palette_for(online_id)
    region = "Unknown"

    try:
        raw_region = user.get_region()
        region = getattr(raw_region, "name", None) or str(raw_region or "Unknown")
    except Exception:  # pragma: no cover - depends on remote response
        region = "Unknown"

    average_completion = (
        sum(title["completion"] for title in titles_payload) / len(titles_payload)
        if titles_payload
        else 0
    )
    games_completed = sum(
        1 for title in titles_payload if title["completion"] >= 100 or title["platinumUnlocked"]
    )
    retrieved_at = utc_now_iso()
    featured_game_ids = [title["gameId"] for title in titles_payload[:3]]

    return {
        "id": slugify(online_id),
        "psnId": online_id,
        "displayName": online_id,
        "handle": f"@{online_id.lower()}",
        "motto": "Synced from PSN via the PSNAWP safe sync skeleton.",
        "region": region,
        "joinedAt": retrieved_at,
        "accent": accent,
        "avatarGradient": gradient,
        "favoriteGenres": ["Unknown"],
        "trophyMix": trophy_mix,
        "stats": {
            "platinum": trophy_mix["platinum"],
            "completion": round(average_completion, 1),
            "trophyPoints": trophy_points,
            "gamesCompleted": games_completed,
            "weeklyTarget": 1,
        },
        "snapshots": [
            {
                "date": retrieved_at,
                "platinum": trophy_mix["platinum"],
                "completion": round(average_completion, 1),
                "trophyPoints": trophy_points,
                "gamesCompleted": games_completed,
            }
        ],
        "gameProgress": [
            {
                "gameId": title["gameId"],
                "completion": title["completion"],
                "platinumUnlocked": title["platinumUnlocked"],
                "trophiesEarned": sum(title["earnedTrophies"].values()),
                "lastPlayedAt": title["lastUpdatedAt"] or retrieved_at,
            }
            for title in titles_payload
        ],
        "milestones": derive_milestones(titles_payload),
        "featuredGameIds": featured_game_ids,
        "syncMetadata": {
            "onlineId": online_id,
            "accountId": getattr(user, "account_id", None),
            "source": "psnawp",
            "retrievedAt": retrieved_at,
            "requestBudget": {
                "maxFriends": max_friends,
                "maxTitlesPerFriend": max_titles,
            },
        },
        "syncedTitles": titles_payload,
    }


def write_payload(payload: dict[str, Any]) -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    PLAYERS_PATH.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )


def main() -> int:
    parse_args()
    load_environment()

    friends = read_friends()
    max_friends, max_titles = get_request_budget()
    friend_targets = friends[:max_friends]

    if not friend_targets:
        payload = build_fallback_payload(
            [],
            max_friends,
            max_titles,
            "No friends were found in data/friends.json. Add onlineId values before running the sync.",
        )
        write_payload(payload)
        print("No friends configured. Wrote mock-safe fallback to data/players.json.")
        return 0

    npsso_code = os.getenv("NPSSO_CODE", "").strip()
    if not npsso_code:
        payload = build_fallback_payload(
            friend_targets,
            max_friends,
            max_titles,
            "NPSSO_CODE is missing. Wrote a mock-safe fallback instead of making PSN requests.",
        )
        write_payload(payload)
        print("NPSSO_CODE missing. Wrote mock-safe fallback to data/players.json.")
        return 0

    if PSNAWP is None:
        payload = build_fallback_payload(
            friend_targets,
            max_friends,
            max_titles,
            "PSNAWP is not installed. Install requirements-sync.txt before running a real sync.",
        )
        write_payload(payload)
        print("PSNAWP unavailable. Wrote mock-safe fallback to data/players.json.")
        return 0

    notes: list[str] = []
    players_payload: list[dict[str, Any]] = []
    games_by_id: dict[str, dict[str, Any]] = {}

    try:
        psnawp = PSNAWP(npsso_code)
    except Exception as exc:  # pragma: no cover - depends on external auth
        payload = build_fallback_payload(
            friend_targets,
            max_friends,
            max_titles,
            f"Could not initialize PSNAWP ({type(exc).__name__}). Wrote a mock-safe fallback instead.",
        )
        write_payload(payload)
        print("PSNAWP initialization failed. Wrote mock-safe fallback to data/players.json.")
        return 0

    for online_id in friend_targets:
        try:
            user = psnawp.user(online_id=online_id)
            titles_payload, games_payload, user_notes = fetch_titles_for_user(user, max_titles)
            player_payload = build_player_record(
                user,
                online_id,
                titles_payload,
                max_friends,
                max_titles,
            )

            players_payload.append(player_payload)
            notes.extend(user_notes)

            for game in games_payload:
                games_by_id[game["id"]] = game

        except Exception as exc:  # pragma: no cover - depends on remote response
            notes.append(
                f'Could not sync "{online_id}" because {type(exc).__name__} was raised. A stub record was written instead.'
            )
            players_payload.append(
                build_stub_player(
                    online_id,
                    "Player sync failed. See notes in data/players.json.",
                    max_friends,
                    max_titles,
                )
            )

        time.sleep(0.4)

    payload = {
        "generatedAt": utc_now_iso(),
        "source": "psnawp",
        "requestBudget": {
            "maxFriends": max_friends,
            "maxTitlesPerFriend": max_titles,
        },
        "friends": friend_targets,
        "players": players_payload,
        "games": list(games_by_id.values()),
        "notes": notes or [
            "Sync completed. The request budget stayed intentionally low to avoid excessive PSN traffic."
        ],
    }
    write_payload(payload)

    print(
        f'Synced {len(players_payload)} friend(s) with a budget of {max_titles} title(s) each into "{PLAYERS_PATH.relative_to(ROOT)}".'
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
