import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b px-4 py-4 flex items-center justify-between bg-background mx-12">
        <h1 className="text-xl font-bold">FunDex</h1>
        <div className="flex-1" />

        <NavigationMenu px-12>
          <NavigationMenuList className="gap-8">
            <NavigationMenuItem>
              <Link to="/vaults">
                <NavigationMenuLink
                  className={cn(
                    "px-4 py-2 rounded-md transition-colors hover:bg-muted",
                    isActive("/vaults") && "bg-muted font-semibold"
                  )}
                >
                  Vaults
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/dashboard">
                <NavigationMenuLink
                  className={cn(
                    "px-4 py-2 rounded-md transition-colors hover:bg-muted",
                    isActive("/dashboard") && "bg-muted font-semibold"
                  )}
                >
                  Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex-7" />

        <div className="ml-auto">
          <ConnectButton
            showBalance={{
              smallScreen: false,
              largeScreen: true,
            }}
          />
        </div>
      </div>
    </header>
  );
}
