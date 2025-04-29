export type Vault = {
  id: string;
  title: string;
  description: string;
  netApy: number;
  avg30dApy: number;
  tvlUnderlying: string;
  tvlUsd: number;
  underlying: string;
  underlyingLogo: string;
  chainName: string;
  chainLogo: string;
  creationDate: string;
  settlementTime: "Instant" | "<1h" | ">1h" | "Days";
  fees: {
    entry: number;
    exit: number;
    performance: number;
  };
  performance: {
    sinceLaunch: number;
    last30Days: number;
  };
  recentEvents: {
    type: "Snapshot" | "Rebalancing" | "Other";
    date: string;
    description: string;
  }[];
};
