import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { HarvestProvider } from "./context/HarvestContext.jsx";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
<ThemeProvider>
  <HarvestProvider>
    <App />
  </HarvestProvider>
</ThemeProvider>
);