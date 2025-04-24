import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type VaultCardProps = {
  id: string; // contract address
  title: string;
  description: string;
  netApr: number;
  avg30dApy: number;
  inception: string;
  tvlUsd: number;
  tvlUnderlying: string;
  settlementTime: string;
  assetSymbol: string;
  assetLogo: string;
  chainName: string;
  chainLogo: string;
};

export function VaultCard(props: VaultCardProps) {
  const {
    id,
    title,
    description,
    netApr,
    avg30dApy,
    inception,
    tvlUsd,
    tvlUnderlying,
    settlementTime,
    assetSymbol,
    assetLogo,
    chainName,
    chainLogo,
  } = props;

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <Link to={`/vaults/${id}`}>
        <CardHeader className="flex items-center justify-between space-y-2">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <img src={chainLogo} alt={chainName} className="w-6 h-6" />
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <img src={assetLogo} alt={assetSymbol} className="w-5 h-5" />
            <Badge variant="outline">{assetSymbol}</Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Net APR</span>
              <p className={cn(netApr < 0 ? "text-red-500" : "text-green-600")}>
                {netApr.toFixed(2)}%
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">30d Avg APY</span>
              <p className={cn(avg30dApy < 0 ? "text-red-500" : "text-green-600")}>
                {avg30dApy.toFixed(2)}%
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">TVL</span>
              <p>
                {tvlUnderlying} (~${tvlUsd.toLocaleString()})
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Settlement</span>
              <p>{settlementTime}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Inception</span>
              <p>{inception}</p>
            </div>
          </div>

          <div className="text-right">
            <Button variant="ghost" className="text-sm gap-1">
              View details <ArrowRight size={16} />
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
