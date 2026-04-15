import { PageContainer, PageHeader, SectionCard } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useAnomalyReport } from "@/hooks/useAnomalyReport";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useExpenses } from "@/hooks/useExpenses";
import { useFinanceStore } from "@/store/useFinanceStore";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  BellOff,
  Car,
  CheckCircle2,
  Coffee,
  Home,
  PiggyBank,
  ShoppingBag,
  Stethoscope,
  TrendingDown,
  TrendingUp,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

// ─── Category icon map ────────────────────────────────────────────────────────
type IconComp = React.ComponentType<{ className?: string }>;
const CATEGORY_ICONS: Record<string, IconComp> = {
  "Food & Dining": Coffee,
  Transportation: Car,
  Shopping: ShoppingBag,
  Entertainment: Zap,
  Healthcare: Stethoscope,
  Housing: Home,
  Utilities: Zap,
  Travel: TrendingUp,
  Other: Wallet,
};

const CATEGORY_COLORS: Record<string, string> = {
  "Food & Dining":
    "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  Transportation:
    "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  Shopping:
    "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  Entertainment:
    "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
  Healthcare:
    "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  Housing: "bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400",
  Utilities:
    "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
  Travel: "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400",
  Other: "bg-secondary text-muted-foreground",
};

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(n);
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  title,
  value,
  sub,
  icon: Icon,
  index,
  trend,
  subIcon,
}: {
  title: string;
  value: string;
  sub?: string;
  icon: IconComp;
  index: number;
  trend?: "up" | "down" | "neutral";
  subIcon?: IconComp;
}) {
  const SubIcon = subIcon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      data-ocid={`dashboard.stat_card.${index}`}
    >
      <SectionCard className="flex flex-col gap-3 h-full">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        </div>
        <div>
          <p className="font-display text-3xl font-semibold text-foreground leading-none">
            {value}
          </p>
        </div>
        {sub && (
          <div
            className={`flex items-center gap-1.5 text-xs font-medium ${
              trend === "up"
                ? "text-emerald-600 dark:text-emerald-400"
                : trend === "down"
                  ? "text-destructive"
                  : "text-muted-foreground"
            }`}
          >
            {SubIcon && <SubIcon className="h-3 w-3 flex-shrink-0" />}
            <span>{sub}</span>
          </div>
        )}
      </SectionCard>
    </motion.div>
  );
}

// ─── Alert Card ───────────────────────────────────────────────────────────────
function AlertCard({
  id,
  title,
  message,
  severity,
  index,
}: {
  id: string;
  title: string;
  message: string;
  severity: "warning" | "critical";
  index: number;
}) {
  const dismissAlert = useFinanceStore((s) => s.dismissAlert);

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 12, height: 0, marginTop: 0, marginBottom: 0 }}
      transition={{ duration: 0.25, delay: index * 0.06 }}
      className={`relative flex items-start gap-3 rounded-xl border-l-4 border p-4 ${
        severity === "critical"
          ? "border-l-destructive bg-destructive/5 border-destructive/15 dark:bg-destructive/10"
          : "border-l-yellow-500 bg-yellow-50/60 border-yellow-200/60 dark:bg-yellow-900/10 dark:border-yellow-800/30"
      }`}
      data-ocid={`dashboard.alert.${index + 1}`}
    >
      <div
        className={`mt-0.5 flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center ${
          severity === "critical"
            ? "bg-destructive/15"
            : "bg-yellow-100 dark:bg-yellow-900/40"
        }`}
      >
        <AlertTriangle
          className={`h-3 w-3 ${
            severity === "critical"
              ? "text-destructive"
              : "text-yellow-600 dark:text-yellow-400"
          }`}
        />
      </div>
      <div className="min-w-0 flex-1 space-y-0.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-foreground">{title}</span>
          <Badge
            variant="outline"
            className={`text-[10px] px-1.5 py-0 border-0 font-medium ${
              severity === "critical"
                ? "bg-destructive/15 text-destructive"
                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400"
            }`}
          >
            {severity === "critical" ? "High" : "Medium"}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {message}
        </p>
      </div>
      <button
        type="button"
        onClick={() => dismissAlert(id)}
        className="flex-shrink-0 h-6 w-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-smooth -mr-1 -mt-0.5"
        aria-label="Dismiss alert"
        data-ocid={`dashboard.alert_dismiss.${index + 1}`}
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </motion.div>
  );
}

// ─── Savings Progress Card ────────────────────────────────────────────────────
function SavingsProgressCard({ percent }: { percent: number }) {
  const savingsGoal = 50000;
  const saved = savingsGoal * (percent / 100);

  return (
    <SectionCard className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
            <PiggyBank className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Annual Savings Goal
            </p>
            <p className="text-xs text-muted-foreground">
              Target: {formatCurrency(savingsGoal)}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-display text-xl font-semibold text-foreground">
            {percent}%
          </p>
          <p className="text-xs text-muted-foreground">
            {formatCurrency(saved)} saved
          </p>
        </div>
      </div>
      <div className="space-y-1.5">
        <Progress value={percent} className="h-2.5" />
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>$0</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
            {formatCurrency(saved)} reached
          </span>
          <span>{formatCurrency(savingsGoal)}</span>
        </div>
      </div>
    </SectionCard>
  );
}

// ─── Spending Trend Mini Chart ────────────────────────────────────────────────
function SpendingMiniBar({
  day,
  amount,
  maxAmount,
}: { day: string; amount: number; maxAmount: number }) {
  const heightPct = maxAmount > 0 ? (amount / maxAmount) * 100 : 0;
  const isHigh = amount > 150;

  return (
    <div className="flex flex-col items-center gap-1.5 flex-1">
      <div className="w-full flex items-end justify-center h-16">
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ height: `${Math.max(heightPct, 8)}%`, originY: 1 }}
          className={`w-full max-w-[28px] rounded-t-md ${
            isHigh ? "bg-destructive/70" : "bg-primary/60"
          }`}
        />
      </div>
      <span className="text-[10px] text-muted-foreground font-medium">
        {day}
      </span>
    </div>
  );
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────
export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: expenses = [], isLoading: expLoading } = useExpenses();
  const alerts = useFinanceStore((s) => s.alerts);
  const { data: anomalyReport } = useAnomalyReport();

  const recentExpenses = expenses.slice(0, 3);
  const dailyData = anomalyReport?.dailySpending ?? [];
  const maxDaily = Math.max(...dailyData.map((d) => d.total), 1);

  return (
    <PageContainer>
      <PageHeader
        title="Dashboard"
        description="Your financial overview at a glance"
        action={
          <Link to="/dashboard/expenses">
            <Button
              size="sm"
              className="gap-1.5"
              data-ocid="dashboard.add_expense_button"
            >
              Add Expense
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        }
      />

      {/* ── Stat Cards ── */}
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        data-ocid="dashboard.stats_section"
      >
        {statsLoading ? (
          <>
            <Skeleton className="h-36 rounded-xl" />
            <Skeleton className="h-36 rounded-xl" />
            <Skeleton className="h-36 rounded-xl" />
          </>
        ) : (
          <>
            <StatCard
              title="Total Balance"
              value={formatCurrency(stats?.totalBalance ?? 0)}
              sub="+3.25% vs. last month"
              icon={Wallet}
              index={1}
              trend="up"
              subIcon={TrendingUp}
            />
            <StatCard
              title="Monthly Spending"
              value={formatCurrency(stats?.monthlySpending ?? 0)}
              sub="+18.7% vs. $1,980 prior"
              icon={TrendingDown}
              index={2}
              trend="down"
              subIcon={TrendingDown}
            />
            <StatCard
              title="Savings Progress"
              value={`${stats?.savingsProgressPercent ?? 0}%`}
              sub="On track to hit goal"
              icon={PiggyBank}
              index={3}
              trend="neutral"
            />
          </>
        )}
      </div>

      {/* ── Savings Progress + Weekly Spending ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {!statsLoading && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
          >
            <SavingsProgressCard percent={stats?.savingsProgressPercent ?? 0} />
          </motion.div>
        )}

        {/* Weekly Spending Bar Chart */}
        {dailyData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.45 }}
          >
            <SectionCard className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">
                  Weekly Spending
                </p>
                <Link to="/dashboard/charts">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-7 px-2"
                    data-ocid="dashboard.view_charts_button"
                  >
                    Full Chart →
                  </Button>
                </Link>
              </div>
              <div className="flex items-end gap-1 h-20">
                {dailyData.map((d) => (
                  <SpendingMiniBar
                    key={d.dayLabel}
                    day={d.dayLabel}
                    amount={d.total}
                    maxAmount={maxDaily}
                  />
                ))}
              </div>
            </SectionCard>
          </motion.div>
        )}
      </div>

      {/* ── Active Alerts ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.55 }}
        data-ocid="dashboard.alerts_section"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-foreground flex items-center gap-2 text-sm uppercase tracking-wide text-muted-foreground">
            <Bell className="h-4 w-4" />
            Active Alerts
            {alerts.length > 0 && (
              <span className="ml-1 inline-flex items-center justify-center h-5 w-5 rounded-full bg-destructive text-[10px] font-bold text-white">
                {alerts.length}
              </span>
            )}
          </h2>
          {alerts.length > 0 && (
            <Link to="/dashboard/insights">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-7 px-2"
                data-ocid="dashboard.view_all_alerts_button"
              >
                View all
              </Button>
            </Link>
          )}
        </div>

        <AnimatePresence mode="popLayout">
          {alerts.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-8 rounded-xl border border-dashed border-border gap-2"
              data-ocid="dashboard.alerts_empty_state"
            >
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <BellOff className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground">All clear</p>
              <p className="text-xs text-muted-foreground text-center max-w-xs">
                No anomalies detected. Your spending looks healthy!
              </p>
            </motion.div>
          ) : (
            <div className="space-y-2">
              {alerts.slice(0, 3).map((alert, i) => (
                <AlertCard
                  key={alert.id}
                  id={alert.id}
                  title={alert.title}
                  message={alert.message}
                  severity={alert.severity}
                  index={i}
                />
              ))}
              {alerts.length > 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center pt-1"
                >
                  <Link to="/dashboard/insights">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-muted-foreground h-7"
                      data-ocid="dashboard.more_alerts_button"
                    >
                      +{alerts.length - 3} more alerts — see Insights
                    </Button>
                  </Link>
                </motion.div>
              )}
            </div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Recent Transactions ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.65 }}
      >
        <SectionCard>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">
              Recent Transactions
            </h2>
            <Link to="/dashboard/expenses">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-7 px-2"
                data-ocid="dashboard.view_all_expenses_button"
              >
                View all
              </Button>
            </Link>
          </div>

          {expLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-14 rounded-lg" />
              ))}
            </div>
          ) : recentExpenses.length === 0 ? (
            <div
              className="flex flex-col items-center py-8 gap-2 text-center"
              data-ocid="dashboard.expenses_empty_state"
            >
              <CheckCircle2 className="h-8 w-8 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">No expenses yet.</p>
              <Link to="/dashboard/expenses">
                <Button
                  size="sm"
                  variant="outline"
                  data-ocid="dashboard.add_first_expense_button"
                >
                  Add your first expense
                </Button>
              </Link>
            </div>
          ) : (
            <div
              className="space-y-1"
              data-ocid="dashboard.recent_transactions_list"
            >
              {recentExpenses.map((expense, i) => {
                const CatIcon = CATEGORY_ICONS[expense.category] ?? Wallet;
                const colorCls =
                  CATEGORY_COLORS[expense.category] ??
                  "bg-secondary text-muted-foreground";
                return (
                  <motion.div
                    key={expense.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.65 + i * 0.08 }}
                    className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-secondary/50 transition-smooth group"
                    data-ocid={`dashboard.transaction.${i + 1}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0 ${colorCls}`}
                      >
                        <CatIcon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {expense.note || expense.category}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {expense.category} ·{" "}
                          {format(new Date(expense.date), "MMM d")}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-foreground flex-shrink-0 ml-4 tabular-nums">
                      -{formatCurrency(expense.amount)}
                    </span>
                  </motion.div>
                );
              })}
              <div className="pt-2 border-t border-border mt-2">
                <Link to="/dashboard/expenses">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs text-muted-foreground hover:text-foreground"
                    data-ocid="dashboard.see_all_transactions_button"
                  >
                    See all transactions
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </SectionCard>
      </motion.div>
    </PageContainer>
  );
}
