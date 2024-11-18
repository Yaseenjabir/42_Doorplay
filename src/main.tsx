// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./_component/Main/Main.tsx";
import GarageDoors from "./_component/GarageDoors/GarageDoors.tsx";
import SingleDoor from "./_component/SingleDoor/SingleDoor.tsx";
import Dashboard from "./_component/Dashboard/Dashboard.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import CommercialDoors from "./_component/CommercialDoors/CommercialDoors.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Main /> },
      { path: "/garage-doors", element: <GarageDoors /> },
      { path: "/garage-doors/:singleDoor", element: <SingleDoor /> },
      { path: "/commercial-doors", element: <CommercialDoors /> },
      { path: "/commercial-doors/:singleDoor", element: <SingleDoor /> },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <>
    <RouterProvider router={router} />
    <Toaster />
  </>
  /* </StrictMode> */
);
