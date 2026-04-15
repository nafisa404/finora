import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFinanceStore } from "@/store/useFinanceStore";
import { Link } from "@tanstack/react-router";
import { Bell, Menu } from "lucide-react";

interface HeaderProps {
  onMenuToggle?: () => void;
  showMenu?: boolean;
}

export function Header({ onMenuToggle, showMenu = false }: HeaderProps) {
  const alerts = useFinanceStore((s) => s.alerts);
  const alertCount = alerts.length;

  return (
    <header
      className="sticky top-0 z-40 h-16 bg-card border-b border-border shadow-subtle flex items-center px-4 md:px-6 gap-3"
      data-ocid="header"
    >
      {showMenu && (
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuToggle}
          aria-label="Toggle menu"
          data-ocid="header.menu_toggle"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      <Link to="/" className="flex items-center gap-2 mr-auto md:hidden">
        <span className="font-display text-xl font-semibold tracking-tight text-foreground">
          Finora
        </span>
      </Link>

      <div className="ml-auto flex items-center gap-2">
        <Link to="/dashboard/insights" data-ocid="header.alerts_button">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label={`${alertCount} alerts`}
          >
            <Bell className="h-5 w-5 text-muted-foreground" />
            {alertCount > 0 && (
              <Badge
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive text-destructive-foreground border-0"
                data-ocid="header.alert_badge"
              >
                {alertCount > 9 ? "9+" : alertCount}
              </Badge>
            )}
          </Button>
        </Link>
      </div>
    </header>
  );
}
