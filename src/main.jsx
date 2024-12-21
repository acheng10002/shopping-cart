// main.jsx initializes and renders the app
import { StrictMode } from "react";
// creates  React root for rendering my React app into the DOM
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
/* PageProvider is the provider component that wraps part or all of the 
app, making shared state and logic available to its descendants */
import { PageProvider } from "./components/PageContext";

createRoot(document.getElementById("root")).render(
  /* StrictMode helps ID potential issues in an app during development */
  <StrictMode>
    <BrowserRouter>
      {/* custom context provider component that wraps the app and provides a
      shared state to all components that need access to it */}
      <PageProvider>
        {/* - RouterProvider component that manages the routing logic
        - router is the primary prop that takes a router object created by 
          createBrowserRouter 
        - router defines the app's route configuration */}
        <App />
      </PageProvider>
    </BrowserRouter>
  </StrictMode>
);
