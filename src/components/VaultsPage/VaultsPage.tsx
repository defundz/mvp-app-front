import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { VaultCard } from "../VaultCard/VaultCard";

// Dummy vaults data for now
const mockVaults = [
  {
    id: "0xabc123",
    title: "ETH Savings Vault",
    description: "Earn yield on ETH with delta-neutral strategies.",
    netApr: 4.5,
    avg30dApy: 3.2,
    inception: "2023-01-01",
    tvlUsd: 1500000,
    tvlUnderlying: "810 ETH",
    settlementTime: "instant",
    assetSymbol: "ETH",
    assetLogo: "src/assets/eth.png",
    chainName: "Arbitrum",
    chainLogo: "src/assets/arbitrum.svg",
  },
  {
    id: "0xdef456",
    title: "USDC Yield Vault",
    description: "Stable and secure returns on USDC deposits.",
    netApr: 2.1,
    avg30dApy: 2.4,
    inception: "2022-11-15",
    tvlUsd: 500000,
    tvlUnderlying: "500,000 USDC",
    settlementTime: "<1h",
    assetSymbol: "USDC",
    assetLogo: "src/assets/usdc.svg",
    chainName: "Base",
    chainLogo: "src/assets/base.webp",
  },
];

export default function VaultsPage() {
  const [search, setSearch] = useState("");
  const [chainFilter, setChainFilter] = useState("all");

  const filtered = mockVaults.filter((vault) => {
    const matchesSearch = vault.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesChain =
      chainFilter === "all" || vault.chainName === chainFilter;
    return matchesSearch && matchesChain;
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-center items-center">
        <h1 className="text-2xl font-semibold tracking-tight text-center m-5">
          Find the vault that fits your investment strategy
        </h1>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <Input
          placeholder="Search vaults..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select value={chainFilter} onValueChange={setChainFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by chain" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All chains</SelectItem>
            <SelectItem value="Arbitrum">Arbitrum</SelectItem>
            <SelectItem value="Base">Base</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((vault) => (
          <VaultCard key={vault.id} {...vault} />
        ))}
      </div>
    </div>
  );
}
