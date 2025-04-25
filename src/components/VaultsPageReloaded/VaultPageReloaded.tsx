import { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ArrowDown, ArrowUp } from "lucide-react";
import VaultElement from "../VaultElement/VaultElement";
import { mockVaults } from "@/mock/vaults";

export default function VaultsPageReloaded() {
  const [sortKey, setSortKey] = useState<
    "netApy" | "avg30dApy" | "tvlUsd" | null
  >(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [chainFilter, setChainFilter] = useState("");
  const [underlyingFilter, setUnderlyingFilter] = useState("");

  const handleSort = (key: typeof sortKey) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const filtered = mockVaults
    .filter((v) => (chainFilter ? v.chainName === chainFilter : true))
    .filter((v) =>
      underlyingFilter ? v.underlying === underlyingFilter : true
    );

  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
  });

  const SortHeader = ({
    label,
    keyName,
  }: {
    label: string;
    keyName: typeof sortKey;
  }) => (
    <TableHead
      className="cursor-pointer select-none"
      onClick={() => handleSort(keyName)}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {sortKey === keyName &&
          (sortOrder === "asc" ? (
            <ArrowUp className="w-4 h-4" />
          ) : (
            <ArrowDown className="w-4 h-4" />
          ))}
      </span>
    </TableHead>
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-center">
        Find the vault that fits your investment strategy
      </h1>

      <div className="flex gap-4 items-center">
        <Select onValueChange={setChainFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by chain" />
          </SelectTrigger>
          <SelectContent>
            {[...new Set(mockVaults.map((v) => v.chainName))].map((chain) => (
              <SelectItem key={chain} value={chain}>
                {chain}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setUnderlyingFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by underlying" />
          </SelectTrigger>
          <SelectContent>
            {[...new Set(mockVaults.map((v) => v.underlying))].map((asset) => (
              <SelectItem key={asset} value={asset}>
                {asset}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-xl border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vault</TableHead>
              <SortHeader label="Net APY" keyName="netApy" />
              <SortHeader label="30d Avg APY" keyName="avg30dApy" />
              <SortHeader label="TVL ($)" keyName="tvlUsd" />
              <TableHead>Underlying</TableHead>
              <TableHead>Chain</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((vault) => (
              <VaultElement
                key={vault.id}
                vault={vault}
                onClick={() => console.log("go to", vault.id)}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
