/* main.jsx initializes and renders the app
StrictMode helps ID potential issues in an app during development 
and renders components twice */
import { StrictMode } from "react";
/* creates React root for rendering my React app into the DOM,
a pointer to the top-level data structure used to track and manage
the rendering of a component tree */
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
/* basic routing context for simplified, declarative routing config 
vs createBrowserRouter which provides fine-grained control over route
definitions and navigation (has advanced features like data fetching,
mutations, loaders, and actions 
mutation - actions that alter server-side or client-side state
loader - used to fetch data required by a route before the component renders
action - handles form submissions or other user interactions that mutate data */
import { BrowserRouter } from "react-router-dom";
/* PageProvider is the provider component that wraps all of the app, making 
shared state and logic available to all descendant consumer components that 
need access to it */
import { PageProvider } from "./components/PageContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PageProvider>
        <App />
      </PageProvider>
    </BrowserRouter>
  </StrictMode>
);
