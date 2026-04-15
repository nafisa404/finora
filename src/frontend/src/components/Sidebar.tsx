import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFinanceStore } from "@/store/useFinanceStore";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart2,
  Bot,
  LayoutDashboard,
  Lightbulb,
  PiggyBank,
  Receipt,
  Target,
  X,
} from "lucide-react";

interface NavItem {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard, exact: true },
  { label: "Expenses", to: "/dashboard/expenses", icon: Receipt },
  { label: "Budget", to: "/dashboard/budget", icon: PiggyBank },
  { label: "Goals", to: "/dashboard/goals", icon: Target },
  { label: "Charts", to: "/dashboard/charts", icon: BarChart2 },
  { label: "Insights", to: "/dashboard/insights", icon: Lightbulb },
  { label: "AI Assistant", to: "/dashboard/ai", icon: Bot },
];

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const alerts = useFinanceStore((s) => s.alerts);
  const alertCount = alerts.length;

  const isActive = (item: NavItem) => {
    if (item.exact) return currentPath === item.to;
    return currentPath.startsWith(item.to);
  };

  return (
    <aside className="flex flex-col h-full bg-card border-r border-border w-64">
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-5 border-b border-border flex-shrink-0">
        <Link
          to="/"
          className="flex items-center gap-2"
          data-ocid="sidebar.logo_link"
        >
          <span className="font-display text-xl font-semibold tracking-tight text-foreground">
            Finora
          </span>
        </Link>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="md:hidden"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Nav */}
      <nav
        className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto"
        data-ocid="sidebar.nav"
      >
        {NAV_ITEMS.map((item) => {
          const active = isActive(item);
          const isInsights = item.to === "/dashboard/insights";

          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth group",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
              data-ocid={`sidebar.${item.label.toLowerCase().replace(/\s+/g, "_")}_link`}
            >
              <item.icon
                className={cn(
                  "h-4 w-4 flex-shrink-0",
                  active
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-foreground",
                )}
              />
              <span className="flex-1">{item.label}</span>
              {isInsights && alertCount > 0 && (
                <Badge
                  className="h-5 min-w-[20px] flex items-center justify-center px-1.5 text-xs bg-destructive text-destructive-foreground border-0"
                  data-ocid="sidebar.alerts_badge"
                >
                  {alertCount}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
