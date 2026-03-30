import { loadSiteData } from "./data-source.js";
import { renderApp } from "./render.js";

const appRoot = document.getElementById("app");

async function bootstrap() {
  const { dataset, usingFallback, message } = await loadSiteData();
  renderApp(appRoot, dataset, usingFallback, message);
}

bootstrap();
