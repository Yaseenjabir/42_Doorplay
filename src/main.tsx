import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./_component/Main/Main.tsx";
import GarageDoors from "./_component/GarageDoors/GarageDoors.tsx";
import SingleDoor from "./_component/SingleDoor/SingleDoor.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import CommercialDoors from "./_component/CommercialDoors/CommercialDoors.tsx";
import Auth from "./_component/auth/Auth.tsx";
import SubCategory from "./_component/SubCategory/SubCategory.tsx";
import Master from "./_component/Dashboard 2/Master.tsx";
import Layout from "./_component/Dashboard 2/Dashboard.tsx";
import AddDoor from "./_component/Dashboard 2/AddDoor/AddDoor.tsx";
import UpdateDoor from "./_component/Dashboard 2/UpdateDoor/UpdateDoor.tsx";
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
    element: <Master />,
    children: [
      {
        path: "/dashboard",
        element: <Layout />,
        children: [
          { path: "", element: <AddDoor /> },
          { path: "update-door", element: <UpdateDoor /> },
        ],
      },
    ],
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
