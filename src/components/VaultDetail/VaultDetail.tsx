import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockVaults } from "@/mock/vaults";
import { Vault } from "@/types/Vault";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAccount } from "wagmi";
import { InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function VaultDetail() {
  const { vaultId } = useParams();
  const [depositAmount, setDepositAmount] = useState<string>("");
  const { address } = useAccount();

  const vault = mockVaults.find((v) => v.id === vaultId) as Vault;

  if (!vault) {
    return <div>Vault not found</div>;
  }

  const calculateEstimatedReturns = (amount: number) => {
    const yearlyReturn = (amount * vault.netApy) / 100;
    const dailyReturn = yearlyReturn / 365;
    return {
      yearly: yearlyReturn,
      daily: dailyReturn,
    };
  };

  const estimatedReturns = depositAmount
    ? calculateEstimatedReturns(parseFloat(depositAmount))
    : null;

  // Mock data pour les informations utilisateur
  const userData = {
    balance: {
      token: 125,
      usd: 1250,
    },
    returns: {
      apy: 3.25,
      totalToken: 8,
      totalUsd: 8,
      dailyToken: 0.02,
      dailyUsd: 0.02,
    },
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* En-tête du fonds */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <img
              src={vault.underlyingLogo}
              alt={vault.underlying}
              className="h-12 w-12"
            />
            <div>
              <CardTitle className="text-2xl">{vault.title}</CardTitle>
              <p className="text-muted-foreground">{vault.description}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold">Token</h3>
            <p>{vault.underlying}</p>
          </div>
          <div>
            <h3 className="font-semibold">Chain</h3>
            <div className="flex items-center gap-2">
              <img
                src={vault.chainLogo}
                alt={vault.chainName}
                className="h-5 w-5"
              />
              <span>{vault.chainName}</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Created</h3>
            <p>{vault.creationDate}</p>
          </div>
          <div>
            <h3 className="font-semibold">Settlement Time</h3>
            <div className="flex items-center gap-2">
              <p>{vault.settlementTime}</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Average processing time for a deposit or withdrawal</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Fees</h3>
            <p>Entry: {vault.fees.entry}%</p>
            <p>Exit: {vault.fees.exit}%</p>
            <p>Performance: {vault.fees.performance}%</p>
          </div>
        </CardContent>
      </Card>

      {/* Statistiques du fonds */}
      <Card>
        <CardHeader>
          <CardTitle>Vault Statistics</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold">TVL</h3>
            <p>{vault.tvlUnderlying}</p>
            <p className="text-muted-foreground">
              ${vault.tvlUsd.toLocaleString()}
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Performance</h3>
            <p>Since Launch: {vault.performance.sinceLaunch}%</p>
            <p>Last 30 Days: {vault.performance.last30Days}%</p>
          </div>
          <div>
            <h3 className="font-semibold">Recent Events</h3>
            <div className="space-y-2">
              {vault.recentEvents.map((event, index) => (
                <div key={index} className="text-sm">
                  <p className="font-medium">{event.type}</p>
                  <p className="text-muted-foreground">{event.date}</p>
                  <p>{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informations utilisateur */}
      {address && (
        <Card>
          <CardHeader>
            <CardTitle>Your Position</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Balance</h3>
              <p>
                {userData.balance.token} f{vault.underlying}
              </p>
              <p className="text-muted-foreground">${userData.balance.usd}</p>
            </div>
            <div>
              <h3 className="font-semibold">Returns</h3>
              <p>APY: {userData.returns.apy}%</p>
              <p>
                Total: {userData.returns.totalToken} {vault.underlying}
              </p>
              <p className="text-muted-foreground">
                ${userData.returns.totalUsd}
              </p>
              <p>
                Daily: {userData.returns.dailyToken} {vault.underlying}
              </p>
              <p className="text-muted-foreground">
                ${userData.returns.dailyUsd}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Simulateur de performance */}
      <Card>
        <CardHeader>
          <CardTitle>Manage my position</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Amount to deposit ({vault.underlying})
            </label>
            <Input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>
          {estimatedReturns && (
            <div className="space-y-2">
              <h3 className="font-semibold">Estimated Returns</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Yearly</p>
                  <p>
                    {estimatedReturns.yearly.toFixed(2)} {vault.underlying}
                  </p>
                  <p className="text-muted-foreground">
                    ${(estimatedReturns.yearly * 1).toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Daily</p>
                  <p>
                    {estimatedReturns.daily.toFixed(4)} {vault.underlying}
                  </p>
                  <p className="text-muted-foreground">
                    ${(estimatedReturns.daily * 1).toFixed(4)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions utilisateur */}
      <div className="flex gap-4">
        <Button className="flex-1">Invest</Button>
        <Button variant="outline" className="flex-1">
          Withdraw
        </Button>
      </div>
    </div>
  );
}
