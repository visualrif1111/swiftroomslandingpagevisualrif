
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import { getAttribution } from "./app/utils/attribution";
  import "./styles/index.css";

  // Capture marketing attribution (UTM / referrer / landing page) as early as
  // possible — on first load, before any interaction — so it's available to any
  // lead the visitor later submits. First-touch is stored and never overwritten.
  getAttribution();

  createRoot(document.getElementById("root")!).render(<App />);
