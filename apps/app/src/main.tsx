import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilProvider } from "./components/providers/RecoilProvider.tsx";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <RecoilProvider>
        <App />
      </RecoilProvider>
    </BrowserRouter>
  </StrictMode>
);
