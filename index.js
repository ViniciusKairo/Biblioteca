import React from "react";
import ReactDOM from "react-dom/client";  // Altere a importação para usar o cliente correto
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));  // Crie a raiz da aplicação
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);