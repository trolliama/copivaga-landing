import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeGTM } from "./lib/gtm";

// Initialize Google Tag Manager
const gtmId = import.meta.env.VITE_GTM_ID;
if (gtmId) {
  initializeGTM(gtmId);
}

createRoot(document.getElementById("root")!).render(<App />);
