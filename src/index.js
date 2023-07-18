import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TestModeContextProvider } from "./Context/TextModeContext";
import { ThemeContextProvider } from "./Context/ThemeContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeContextProvider>
    <TestModeContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TestModeContextProvider>
  </ThemeContextProvider>
);
