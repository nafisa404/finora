import { PageContainer, PageHeader, SectionCard } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/currency";
import { useFinanceStore } from "@/store/useFinanceStore";
import type { Budget } from "@/types";
import {
  AlertTriangle,
  Bus,
  Check,
  Film,
  HeartPulse,
  Home,
  Package,
  Pencil,
  Plane,
  ShoppingBag,
  TrendingDown,
  TrendingUp,
  UtensilsCrossed,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Category metadata ────────────────────────────────────────────────────────

const CATEGORY_META: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bg: string;
  }
> = {
  "Food & Dining": {
    icon: UtensilsCrossed,
    color: "text-chart-2",
    bg: "bg-chart-2/10",
  },
  Transportation: { icon: Bus, color: "text-chart-5", bg: "bg-chart-5/10" },
  Shopping: { icon: ShoppingBag, color: "text-primary", bg: "bg-primary/10" },
  Entertainment: { icon: Film, color: "text-chart-4", bg: "bg-chart-4/10" },
  Healthcare: { icon: HeartPulse, color: "text-chart-3", bg: "bg-chart-3/10" },
  Housing: { icon: Home, color: "text-foreground", bg: "bg-secondary" },
  Utilities: { icon: Zap, color: "text-muted-foreground", bg: "bg-muted" },
  Travel: { icon: Plane, color: "text-chart-2", bg: "bg-chart-2/10" },
  Other: { icon: Package, color: "text-muted-foreground", bg: "bg-muted" },
};

// ─── Progress bar ─────────────────────────────────────────────────────────────

function ProgressBar({ pct }: { pct: number }) {
  const clamped = Math.min(pct, 100);
  const color =
    pct > 100
      ? "bg-destructive"
      : pct >= 80
        ? "bg-[oklch(0.72_0.22_41)]"
        : "bg-[oklch(0.55_0.18_145)]";

  return (
    <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${clamped}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
}

// ─── Summary stat card ────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon: Icon,
  variant = "default",
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  variant?: "default" | "danger" | "success";
}) {
  const colors = {
    default: {
      bg: "bg-primary/8",
      icon: "text-primary",
      value: "text-foreground",
    },
    danger: {
      bg: "bg-destructive/8",
      icon: "text-destructive",
      value: "text-destructive",
    },
    success: {
      bg: "bg-[oklch(0.55_0.18_145)]/10",
      icon: "text-[oklch(0.55_0.18_145)]",
      value: "text-[oklch(0.45_0.18_145)]",
    },
  };
  const c = colors[variant];

  return (
    <SectionCard className="flex items-center gap-4">
      <span
        className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${c.bg} flex-shrink-0`}
      >
        <Icon className={`h-5 w-5 ${c.icon}`} />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
        <p className={`text-lg font-semibold tabular-nums ${c.value}`}>
          {value}
        </p>
      </div>
    </SectionCard>
  );
}

// ─── Budget card ──────────────────────────────────────────────────────────────

function BudgetCard({ budget, index }: { budget: Budget; index: number }) {
  const updateBudget = useFinanceStore((s) => s.updateBudget);
  const [editing, setEditing] = useState(false);
  const [inputVal, setInputVal] = useState("");

  const pct =
    budget.monthlyLimit > 0 ? (budget.spent / budget.monthlyLimit) * 100 : 0;
  const remaining = budget.monthlyLimit - budget.spent;
  const isOver = budget.spent > budget.monthlyLimit;

  const meta = CATEGORY_META[budget.category] ?? CATEGORY_META.Other;
  const Icon = meta.icon;

  const startEdit = () => {
    setInputVal(String(budget.monthlyLimit));
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setInputVal("");
  };

  const saveEdit = () => {
    const parsed = Number.parseFloat(inputVal);
    if (Number.isNaN(parsed) || parsed < 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    updateBudget(budget.category, parsed);
    toast.success(`Budget updated for ${budget.category}`);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") saveEdit();
    if (e.key === "Escape") cancelEdit();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.3 }}
      data-ocid={`budget.card.${index + 1}`}
    >
      <SectionCard
        className={`flex flex-col gap-4 ${isOver ? "border-destructive/30" : ""}`}
      >
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span
              className={`inline-flex items-center justify-center w-9 h-9 rounded-xl ${meta.bg} flex-shrink-0`}
            >
              <Icon className={`h-4 w-4 ${meta.color}`} />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {budget.category}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {pct.toFixed(0)}% used
              </p>
            </div>
          </div>
          {isOver && (
            <Badge
              variant="outline"
              className="text-[10px] font-semibold px-1.5 py-0 h-5 bg-destructive/10 text-destructive border-destructive/30 flex-shrink-0"
              data-ocid={`budget.over_budget_badge.${index + 1}`}
            >
              Over Budget
            </Badge>
          )}
        </div>

        {/* Progress bar */}
        <ProgressBar pct={pct} />

        {/* Amounts row */}
        <div className="grid grid-cols-3 gap-2 text-center">
          {/* Monthly limit — editable */}
          <div>
            <p className="text-[10px] text-muted-foreground mb-1">Budget</p>
            {editing ? (
              <div
                className="flex items-center gap-1"
                data-ocid={`budget.edit_form.${index + 1}`}
              >
                <Input
                  type="number"
                  min="0"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="h-7 text-xs px-1.5 text-center tabular-nums"
                  autoFocus
                  data-ocid={`budget.limit_input.${index + 1}`}
                />
                <button
                  onClick={saveEdit}
                  type="button"
                  className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded bg-primary text-primary-foreground hover:opacity-90 transition-smooth"
                  aria-label="Save budget limit"
                  data-ocid={`budget.save_button.${index + 1}`}
                >
                  <Check className="h-3 w-3" />
                </button>
                <button
                  onClick={cancelEdit}
                  type="button"
                  className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded bg-secondary text-muted-foreground hover:bg-muted transition-smooth"
                  aria-label="Cancel edit"
                  data-ocid={`budget.cancel_button.${index + 1}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={startEdit}
                className="group flex items-center justify-center gap-1 w-full"
                aria-label={`Edit budget limit for ${budget.category}`}
                data-ocid={`budget.edit_button.${index + 1}`}
              >
                <span className="text-sm font-semibold text-foreground tabular-nums">
                  {formatCurrency(budget.monthlyLimit)}
                </span>
                <Pencil className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-smooth" />
              </button>
            )}
          </div>

          {/* Spent */}
          <div>
            <p className="text-[10px] text-muted-foreground mb-1">Spent</p>
            <p
              className={`text-sm font-semibold tabular-nums ${isOver ? "text-destructive" : "text-foreground"}`}
            >
              {formatCurrency(budget.spent)}
            </p>
          </div>

          {/* Remaining */}
          <div>
            <p className="text-[10px] text-muted-foreground mb-1">Remaining</p>
            <p
              className={`text-sm font-semibold tabular-nums ${isOver ? "text-destructive" : "text-[oklch(0.45_0.18_145)]"}`}
            >
              {isOver
                ? `-${formatCurrency(Math.abs(remaining))}`
                : formatCurrency(remaining)}
            </p>
          </div>
        </div>
      </SectionCard>
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function BudgetPage() {
  const budgets = useFinanceStore((s) => s.budgets);
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(
    new Set(),
  );

  const now = new Date();
  const monthYear = now.toLocaleString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const totalLimit = budgets.reduce((s, b) => s + b.monthlyLimit, 0);
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0);
  const totalRemaining = totalLimit - totalSpent;

  const overBudgetCategories = budgets.filter(
    (b) => b.spent > b.monthlyLimit && !dismissedAlerts.has(b.category),
  );

  return (
    <PageContainer>
      <PageHeader title="Monthly Budget" description={monthYear} />

      {/* Over-budget alert banners */}
      <AnimatePresence>
        {overBudgetCategories.map((b) => (
          <motion.div
            key={b.category}
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: "auto", marginBottom: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            data-ocid={`budget.over_budget_alert.${b.category.toLowerCase().replace(/[^a-z]/g, "_")}`}
          >
            <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-destructive/30 bg-destructive/5">
              <div className="flex items-center gap-2 min-w-0">
                <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0" />
                <p className="text-sm text-destructive font-medium truncate">
                  <span className="font-semibold">{b.category}</span> is over
                  budget by {formatCurrency(b.spent - b.monthlyLimit)}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setDismissedAlerts((prev) => new Set([...prev, b.category]))
                }
                className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-md text-destructive/70 hover:text-destructive hover:bg-destructive/10 transition-smooth"
                aria-label={`Dismiss alert for ${b.category}`}
                data-ocid={`budget.dismiss_alert_button.${b.category.toLowerCase().replace(/[^a-z]/g, "_")}`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Summary stat cards */}
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        data-ocid="budget.summary_section"
      >
        <StatCard
          label="Total Budget"
          value={formatCurrency(totalLimit)}
          icon={TrendingUp}
          variant="default"
        />
        <StatCard
          label="Total Spent"
          value={formatCurrency(totalSpent)}
          icon={TrendingDown}
          variant={totalSpent > totalLimit ? "danger" : "default"}
        />
        <StatCard
          label="Remaining"
          value={formatCurrency(Math.abs(totalRemaining))}
          icon={totalRemaining >= 0 ? TrendingUp : AlertTriangle}
          variant={totalRemaining < 0 ? "danger" : "success"}
        />
      </div>

      {/* Budget cards grid */}
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-4">
          Category Budgets
        </p>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          data-ocid="budget.cards_grid"
        >
          {budgets.map((budget, i) => (
            <BudgetCard key={budget.id} budget={budget} index={i} />
          ))}
        </div>
      </div>

      {/* Tip footer */}
      <p className="text-center text-xs text-muted-foreground pb-2">
        Click the budget amount on any card to edit your monthly limit.
      </p>
    </PageContainer>
  );
}
