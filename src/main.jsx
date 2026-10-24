import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { TransactionsProvider } from "./context/TransactionsContext";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TransactionsProvider>
          <App />
        </TransactionsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
