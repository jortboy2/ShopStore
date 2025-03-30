import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./components/layout/RootLayout.jsx"; // Importing the RootLayout component
import AdminLayout from "./components/admin/layout/AdminLayout.jsx"; // Importing the AdminLayout component
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import "./index.css";
import Home from "./page/Home.jsx";
import Dashboard from "./components/Admin/Dashboard.jsx"; // Importing the Dashboard component
import Categories from "./components/Admin/Categories/Categories.jsx";
import { SnackbarProvider } from "notistack";

const router = createBrowserRouter([
  // Public routes with RootLayout
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <div>About Page</div>,
      },
      {
        path: "/contact",
        element: <div>Contact Page</div>,
      },
    ],
  },
  // Admin routes with AdminLayout and ProtectedRoute
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <div>Quản lý sản phẩm</div>,
      },
      {
        path: "users",
        element: <div>Quản lý người dùng</div>,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "stats",
        element: <div>Thống kê chi tiết</div>,
      },
      {
        path: "settings",
        element: <div>Cài đặt hệ thống</div>,
      },
      {
        path: "profile",
        element: <div>Thông tin cá nhân</div>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <SnackbarProvider maxSnack={3}>
    {/* Your app components */}
    <RouterProvider router={router} />
  </SnackbarProvider>
);
