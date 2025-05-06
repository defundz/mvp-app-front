import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockVaults } from "@/mock/vaults";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import VaultElement from "../VaultElement/VaultElement";

export default function VaultsPage() {
  const [search, setSearch] = useState("");
  const [selectedChain, setSelectedChain] = useState<string | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<
    "tvlUsd" | "netApy" | "avg30dApy" | null
  >(null);
  const [sortAsc, setSortAsc] = useState(true);

  const filteredVaults = useMemo(() => {
    let filtered = mockVaults.filter((vault) =>
      vault.title.toLowerCase().includes(search.toLowerCase())
    );

    if (selectedChain) {
      filtered = filtered.filter((vault) => vault.chainName === selectedChain);
    }

    if (selectedAsset) {
      filtered = filtered.filter((vault) => vault.underlying === selectedAsset);
    }

    if (sortKey) {
      filtered.sort((a, b) =>
        sortAsc
          ? (a[sortKey] as number) - (b[sortKey] as number)
          : (b[sortKey] as number) - (a[sortKey] as number)
      );
    }

    return filtered;
  }, [search, selectedChain, selectedAsset, sortKey, sortAsc]);

  const toggleSort = (key: "tvlUsd" | "netApy" | "avg30dApy") => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-center mt-5 mb-8">
        Find the vault that fits your investment strategy
      </h1>
      <div className="sticky top-[60px] z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b pt-[25px]">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
          <Input
            placeholder="Search vaults..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[250px]"
          />

          <div className="flex gap-4">
            <Select
              onValueChange={(value) =>
                setSelectedChain(value === "all" ? null : value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All chains" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All chains</SelectItem>
                {[...new Set(mockVaults.map((v) => v.chainName))].map(
                  (chain) => (
                    <SelectItem key={chain} value={chain}>
                      {chain}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) =>
                setSelectedAsset(value === "all" ? null : value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All assets" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All assets</SelectItem>
                {[...new Set(mockVaults.map((v) => v.underlying))].map(
                  (asset) => (
                    <SelectItem key={asset} value={asset}>
                      {asset}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-6 items-center text-xs font-bold uppercase text-muted-foreground p-2 border-b">
          <div className="text-left">Vault</div>
          <div>Underlying</div>
          <Button
            variant="ghost"
            className="justify-center"
            onClick={() => toggleSort("netApy")}
          >
            APY
            {sortKey === "netApy" &&
              (sortAsc ? (
                <ChevronUp className="ml-1 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-1 h-4 w-4" />
              ))}
          </Button>
          <Button
            variant="ghost"
            className="justify-center"
            onClick={() => toggleSort("avg30dApy")}
          >
            30d APY
            {sortKey === "avg30dApy" &&
              (sortAsc ? (
                <ChevronUp className="ml-1 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-1 h-4 w-4" />
              ))}
          </Button>
          <Button
            variant="ghost"
            className="justify-center"
            onClick={() => toggleSort("tvlUsd")}
          >
            TVL
            {sortKey === "tvlUsd" &&
              (sortAsc ? (
                <ChevronUp className="ml-1 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-1 h-4 w-4" />
              ))}
          </Button>
          <div className="text-right">Chain</div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {filteredVaults.map((vault) => (
          <Link to={`/vaults/${vault.id}`} key={vault.id}>
            <VaultElement vault={vault} />
          </Link>
        ))}
      </div>
    </div>
  );
}
