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
import Auth from "./_component/auth/Auth.tsx";
import SubCategory from "./_component/SubCategory/SubCategory.tsx";
// import { StrictMode } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Main /> },
      { path: "/garage-doors", element: <GarageDoors /> },
      { path: "/:category/:subCategory", element: <SubCategory /> },
      { path: "/garage-doors/:singleDoor", element: <SingleDoor /> },
      { path: "/commercial-doors", element: <CommercialDoors /> }, // Keep this as is
      { path: "/commercial-doors/:singleDoor", element: <SingleDoor /> },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <>
    {/* <StrictMode> */}
    <RouterProvider router={router} />
    <Toaster />
    {/* </StrictMode> */}
  </>
);
