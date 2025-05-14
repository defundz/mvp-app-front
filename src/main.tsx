import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import App from "./App";

const projectId = import.meta.env.VITE_RAINBOW_PROJECT_ID;

const config = getDefaultConfig({
  appName: "T3Tris",
  projectId: projectId,
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: false,
});

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);
