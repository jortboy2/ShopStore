import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./components/layout/RootLayout.jsx"; // Importing the RootLayout component
import "./index.css";
import Home from "./page/Home.jsx";
import { SnackbarProvider } from "notistack";

const router = createBrowserRouter([
  {
    element: <RootLayout />, // Using RootLayout for the main layout
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // Add more routes here for private and public access as needed
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <SnackbarProvider maxSnack={3}>
    {/* Your app components */}
    <RouterProvider router={router} />
  </SnackbarProvider>
);
