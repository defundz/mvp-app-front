// import { useState } from 'react'

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import "./App.css";

const projectId = import.meta.env.VITE_RAINBOW_PROJECT_ID;

console.log("projectId", projectId);

const config = getDefaultConfig({
  appName: "FunDex",
  projectId: projectId,
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: false,
});

function App() {
  // const [count, setCount] = useState(0)
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ConnectButton />
          <Button>Click me</Button>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
