import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"

// Inject Umami Analytics only in production
if (import.meta.env.PROD) {
  const script = document.createElement("script");
  script.defer = true;
  script.src = "https://analytics.bzvstudio.com/script.js";
  script.setAttribute("data-website-id", "115a2e5f-4906-4336-b2ef-2417d163d14f");
  document.head.appendChild(script);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
