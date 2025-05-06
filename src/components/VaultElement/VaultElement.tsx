import { Card, CardContent } from "@/components/ui/card";

export type Vault = {
  id: string;
  title: string;
  netApy: number;
  avg30dApy: number;
  tvlUnderlying: string;
  tvlUsd: number;
  underlyingLogo: string;
  underlying: string;
  chainName: string;
  chainLogo: string;
};

interface VaultProps {
  vault: Vault;
}

export default function VaultElement({ vault }: VaultProps) {
  const netApyColor = vault.netApy >= 0 ? "text-green-500" : "text-red-500";
  const avg30dApyColor =
    vault.avg30dApy >= 0 ? "text-green-500" : "text-red-500";

  return (
    <Card className="hover:bg-muted transition-colors cursor-pointer mx-2">
      <CardContent className="p-4 grid grid-cols-6 items-center gap-4 text-sm">
        <div className="text-left font-bold">{vault.title}</div>
        <div className="flex items-center justify-center gap-2">
          <img src={vault.underlyingLogo} alt="Asset" className="h-6 w-6" />
          <span>{vault.underlying}</span>
        </div>
        <div className={`text-center ${netApyColor}`}>
          {vault.netApy.toFixed(2)}%
        </div>
        <div className={`text-center ${avg30dApyColor}`}>
          {vault.avg30dApy.toFixed(2)}%
        </div>
        <div className="flex flex-col items-center">
          <span>{vault.tvlUnderlying}</span>
          <span className="text-muted-foreground text-xs">
            ${vault.tvlUsd.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-2 justify-end">
          <span>{vault.chainName}</span>
          <img src={vault.chainLogo} alt="Chain" className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  );
}
