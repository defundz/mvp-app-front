// import { useState } from 'react'

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import "./App.css";

const config = getDefaultConfig({
  appName: "FunDex",
  projectId: "", // todo: put it into .env
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
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
