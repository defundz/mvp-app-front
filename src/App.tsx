// import { useState } from 'react'

import "@rainbow-me/rainbowkit/styles.css";
import { Button } from "@/components/ui/button";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import "./App.css";

const Layout = () => (
  <>
    {/* <Navbar /> */}
    <ConnectButton />
    <Button>Click me</Button>
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
      // { path: "vaults", element: <VaultsList /> },
      // { path: "vaults/:vaultId", element: <VaultDetail /> },
      // { path: "dashboard", element: <Dashboard /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
