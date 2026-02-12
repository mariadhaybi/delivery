import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App"; // default export من App.tsx
import { AuthProvider } from "./context/authContext";
import "./index.css";
import "leaflet/dist/leaflet.css";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter basename="/delivery">
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

