import "@rainbow-me/rainbowkit/styles.css";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import VaultsPageReloaded from "./components/VaultsPageReloaded/VaultPageReloaded";

const Layout = () => (
  <>
    <Navbar />
    <main className="p-6">
      <Outlet />
    </main>
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, // route enabled on "/"
        element: <Navigate to="/vaults" replace />
      },
      { path: "vaults", element: <VaultsPageReloaded /> },
      // { path: "vaults/:vaultId", element: <VaultDetail /> },
      // { path: "dashboard", element: <Dashboard /> },
      {
        path: "*",
        element: (
          <div className="flex items-center justify-center h-[80vh] text-xl">
            Page not found 👻
          </div>
        ),
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
