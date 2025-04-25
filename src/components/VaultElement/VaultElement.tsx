import { Vault } from "@/types/Vault";

type Props = {
  vault: Vault;
  onClick: () => void;
};

export default function VaultElement({ vault, onClick }: Props) {
  return (
    <tr
      className="hover:bg-muted cursor-pointer transition"
      onClick={onClick}
    >
      <td className="px-4 py-3">{vault.title}</td>

      <td className="px-4 py-3 text-right">
        <span className={vault.netApy < 0 ? "text-red-500" : "text-green-600"}>
          {vault.netApy.toFixed(2)}%
        </span>
      </td>

      <td className="px-4 py-3 text-right">
        <span className={vault.avg30dApy < 0 ? "text-red-500" : "text-green-600"}>
          {vault.avg30dApy.toFixed(2)}%
        </span>
      </td>

      <td className="px-4 py-3 text-right">
        ${vault.tvlUsd.toLocaleString()}
      </td>

      <td className="px-4 py-3 flex items-center gap-2">
        <img src={vault.underlyingLogo} className="w-5 h-5" />
        {vault.underlying}
      </td>

      <td className="px-4 py-3 flex items-center gap-2">
        <img src={vault.chainLogo} className="w-5 h-5" />
        {vault.chainName}
      </td>
    </tr>
  );
}
