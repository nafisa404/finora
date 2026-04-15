import { PageContainer, PageHeader, SectionCard } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAnomalyReport } from "@/hooks/useAnomalyReport";
import { useFinanceStore } from "@/store/useFinanceStore";
import type { Alert, CategoryComparison } from "@/types";
import { format } from "date-fns";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Info,
  Lightbulb,
  ShieldAlert,
  TrendingDown,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo } from "react";

// ─── Helpers ────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    n,
  );

const slideUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" as const, delay },
});

// ─── Alert Card ─────────────────────────────────────────────────────────────

function AlertCard({
  alert,
  index,
  onDismiss,
}: {
  alert: Alert;
  index: number;
  onDismiss: (id: string) => void;
}) {
  const isCritical = alert.severity === "critical";

  return (
    <motion.div
      key={alert.id}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className={`group flex items-start gap-4 rounded-xl border p-4 transition-smooth ${
        isCritical
          ? "bg-red-50/70 border-red-200/70 hover:border-red-300/80"
          : "bg-amber-50/60 border-amber-200/60 hover:border-amber-300/70"
      }`}
      data-ocid={`insights.alert.${index + 1}`}
    >
      <div
        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
          isCritical ? "bg-red-100" : "bg-amber-100"
        }`}
      >
        <ShieldAlert
          className={`h-4 w-4 ${isCritical ? "text-red-600" : "text-amber-600"}`}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-foreground">
            {alert.title}
          </span>
          <Badge
            variant="outline"
            className={`text-[10px] font-bold uppercase tracking-widest border-0 px-2 py-0 ${
              isCritical
                ? "bg-red-100 text-red-700"
                : "bg-amber-100 text-amber-700"
            }`}
            data-ocid={`insights.alert_badge.${index + 1}`}
          >
            {isCritical ? "HIGH" : "MEDIUM"}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {alert.message}
        </p>
        <p className="text-[11px] text-muted-foreground/70 mt-1.5">
          {format(new Date(alert.timestamp), "MMM d, yyyy · h:mm a")}
        </p>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className={`h-7 w-7 shrink-0 transition-smooth opacity-0 group-hover:opacity-100 ${
          isCritical
            ? "text-red-400 hover:text-red-600 hover:bg-red-100"
            : "text-amber-400 hover:text-amber-600 hover:bg-amber-100"
        }`}
        onClick={() => onDismiss(alert.id)}
        aria-label="Dismiss alert"
        data-ocid={`insights.dismiss_alert.${index + 1}`}
      >
        <X className="h-3.5 w-3.5" />
      </Button>
    </motion.div>
  );
}

// ─── Category Row ────────────────────────────────────────────────────────────

function CategoryRow({
  comp,
  index,
}: {
  comp: CategoryComparison;
  index: number;
}) {
  const isPositiveChange = comp.percentChange > 0;
  const isBad = comp.percentChange > 30;
  const isWarning = comp.percentChange > 0 && comp.percentChange <= 30;
  const isGood = comp.percentChange <= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 py-3 border-b border-border last:border-0"
      data-ocid={`insights.category_comparison.${index + 1}`}
    >
      <span className="text-sm font-medium text-foreground truncate">
        {comp.category}
      </span>
      <div className="text-right hidden sm:block">
        <p className="text-xs text-muted-foreground">Prior</p>
        <p className="text-sm font-mono text-muted-foreground">
          {fmt(comp.priorMonthTotal)}
        </p>
      </div>
      <div className="text-right">
        <p className="text-xs text-muted-foreground">Current</p>
        <p className="text-sm font-mono font-medium text-foreground">
          {fmt(comp.currentMonthTotal)}
        </p>
      </div>
      <div className="flex items-center gap-1">
        {isPositiveChange ? (
          <ArrowUp
            className={`h-3.5 w-3.5 ${isBad ? "text-red-500" : "text-amber-500"}`}
          />
        ) : (
          <ArrowDown className="h-3.5 w-3.5 text-emerald-500" />
        )}
        <Badge
          variant="outline"
          className={`text-xs border-0 font-semibold tabular-nums ${
            isBad
              ? "bg-red-100 text-red-700"
              : isWarning
                ? "bg-amber-100 text-amber-700"
                : isGood
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-muted text-muted-foreground"
          }`}
        >
          {comp.percentChange > 0 ? "+" : ""}
          {comp.percentChange.toFixed(0)}%
        </Badge>
      </div>
    </motion.div>
  );
}

// ─── Insight Card ────────────────────────────────────────────────────────────

interface InsightItem {
  id: string;
  icon: React.ElementType;
  message: string;
  type: "warning" | "tip" | "positive" | "info";
}

function InsightCard({
  insight,
  index,
}: {
  insight: InsightItem;
  index: number;
}) {
  const styles = {
    warning: {
      bg: "bg-amber-50/70 border-amber-200/60",
      icon: "text-amber-600",
      iconBg: "bg-amber-100",
    },
    tip: {
      bg: "bg-blue-50/60 border-blue-200/50",
      icon: "text-blue-600",
      iconBg: "bg-blue-100",
    },
    positive: {
      bg: "bg-emerald-50/60 border-emerald-200/50",
      icon: "text-emerald-600",
      iconBg: "bg-emerald-100",
    },
    info: {
      bg: "bg-muted/60 border-border",
      icon: "text-muted-foreground",
      iconBg: "bg-secondary",
    },
  };
  const s = styles[insight.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`flex items-start gap-4 rounded-xl border p-4 transition-smooth hover:shadow-card-hover ${s.bg}`}
      data-ocid={`insights.insight.${index + 1}`}
    >
      <div
        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${s.iconBg}`}
      >
        <insight.icon className={`h-4 w-4 ${s.icon}`} />
      </div>
      <p className="text-sm text-foreground leading-relaxed">
        {insight.message}
      </p>
    </motion.div>
  );
}

// ─── Summary Stat ────────────────────────────────────────────────────────────

function SummaryStat({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: "red" | "amber" | "blue" | "green";
}) {
  const colorMap = {
    red: "text-red-600",
    amber: "text-amber-600",
    blue: "text-primary",
    green: "text-emerald-600",
  };
  const valueColor = accent ? colorMap[accent] : "text-foreground";

  return (
    <div className="flex flex-col gap-1 rounded-xl bg-background border border-border p-4">
      <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <span className={`text-2xl font-display font-bold ${valueColor}`}>
        {value}
      </span>
      {sub && <span className="text-xs text-muted-foreground">{sub}</span>}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function Insights() {
  const { data: report, isLoading } = useAnomalyReport();
  const alerts = useFinanceStore((s) => s.alerts);
  const dismissAlert = useFinanceStore((s) => s.dismissAlert);

  // Compute dynamic insights from report data
  const dynamicInsights = useMemo<InsightItem[]>(() => {
    if (!report) return [];

    const insights: InsightItem[] = [];

    // Weekly spending comparison (use dailySpending totals)
    const totalSpending = report.dailySpending.reduce((s, d) => s + d.total, 0);
    const avgDaily = report.averageExpense;
    const expectedWeekly = avgDaily * 7;
    if (expectedWeekly > 0) {
      const pct = Math.round(
        ((totalSpending - expectedWeekly) / expectedWeekly) * 100,
      );
      if (pct > 10) {
        insights.push({
          id: "weekly-spend",
          icon: TrendingUp,
          message: `You spent ${pct}% more this week compared to your average weekly spending.`,
          type: "warning",
        });
      } else if (pct < -10) {
        insights.push({
          id: "weekly-spend",
          icon: TrendingDown,
          message: `Great job! You spent ${Math.abs(pct)}% less this week compared to your average.`,
          type: "positive",
        });
      }
    }

    // Top spending category
    const topCategory = [...report.categoryComparisons].sort(
      (a, b) => b.currentMonthTotal - a.currentMonthTotal,
    )[0];
    if (topCategory) {
      insights.push({
        id: "top-category",
        icon: Info,
        message: `Your top spending category this month is ${topCategory.category} at ${fmt(topCategory.currentMonthTotal)}.`,
        type: "info",
      });
    }

    // Category reduction tip
    const spikedCategory = report.categoryComparisons.find(
      (c) => c.percentChange > 30,
    );
    if (spikedCategory) {
      insights.push({
        id: "reduce-tip",
        icon: Lightbulb,
        message: `Consider reducing ${spikedCategory.category} expenses — they're up ${spikedCategory.percentChange.toFixed(0)}% from last month.`,
        type: "tip",
      });
    } else {
      insights.push({
        id: "reduce-tip",
        icon: Lightbulb,
        message:
          "Your spending categories are well-balanced. No major spikes detected this month.",
        type: "tip",
      });
    }

    // Savings / monthly budget
    const highExpenseCount = report.expenseAnomalies.length;
    if (highExpenseCount === 0) {
      insights.push({
        id: "savings-status",
        icon: CheckCircle2,
        message:
          "You are on track with your savings goal. No unusual expenses detected this period.",
        type: "positive",
      });
    } else {
      insights.push({
        id: "savings-status",
        icon: AlertTriangle,
        message: `You have ${highExpenseCount} high-value transaction${highExpenseCount > 1 ? "s" : ""} this period. Review them to stay within your monthly budget.`,
        type: "warning",
      });
    }

    return insights;
  }, [report]);

  // Summary stats
  const summaryStats = useMemo(() => {
    if (!report) return null;
    const highestExpense = report.expenseAnomalies.reduce(
      (max, a) => Math.max(max, a.amount),
      0,
    );
    const topCategory = [...report.categoryComparisons].sort(
      (a, b) => b.currentMonthTotal - a.currentMonthTotal,
    )[0];
    return {
      anomaliesDetected: report.expenseAnomalies.length + alerts.length,
      highestExpense,
      topCategory: topCategory?.category ?? "N/A",
    };
  }, [report, alerts]);

  return (
    <PageContainer>
      <PageHeader
        title="Insights & Anomaly Detection"
        description="Rule-based anomaly analysis and personalized financial insights"
      />

      {/* Summary Statistics */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
        </div>
      ) : (
        summaryStats && (
          <motion.div
            {...slideUp(0)}
            className="grid grid-cols-2 md:grid-cols-3 gap-3"
            data-ocid="insights.summary_section"
          >
            <SummaryStat
              label="Anomalies Detected"
              value={String(summaryStats.anomaliesDetected)}
              sub="flagged transactions & alerts"
              accent={summaryStats.anomaliesDetected > 0 ? "red" : "green"}
            />
            <SummaryStat
              label="Highest Single Expense"
              value={fmt(summaryStats.highestExpense)}
              sub="largest flagged amount"
              accent="amber"
            />
            <SummaryStat
              label="Top Spending Category"
              value={summaryStats.topCategory}
              sub="highest monthly spend"
              accent="blue"
            />
          </motion.div>
        )
      )}

      {/* Active Alerts */}
      <motion.div {...slideUp(0.05)}>
        <SectionCard data-ocid="insights.alerts_section">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100">
              <ShieldAlert className="h-4 w-4 text-red-600" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-foreground">Active Alerts</h2>
              <p className="text-xs text-muted-foreground">
                Real-time anomaly detection results
              </p>
            </div>
            {alerts.length > 0 && (
              <Badge className="bg-red-100 text-red-700 border-0 font-bold tabular-nums">
                {alerts.length} alert{alerts.length !== 1 ? "s" : ""}
              </Badge>
            )}
          </div>

          {alerts.length === 0 ? (
            <div
              className="flex flex-col items-center py-10 text-center"
              data-ocid="insights.alerts_empty_state"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 mb-3">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              </div>
              <p className="font-semibold text-foreground">All clear!</p>
              <p className="mt-1 text-sm text-muted-foreground">
                No anomalies detected in your recent spending.
              </p>
            </div>
          ) : (
            <div className="space-y-3" data-ocid="insights.alerts_list">
              {alerts.map((alert, i) => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  index={i}
                  onDismiss={dismissAlert}
                />
              ))}
            </div>
          )}
        </SectionCard>
      </motion.div>

      {/* Anomaly Report — Category Comparison Table */}
      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-48 rounded-xl" />
        </div>
      ) : (
        report &&
        report.categoryComparisons.length > 0 && (
          <motion.div {...slideUp(0.1)}>
            <SectionCard data-ocid="insights.category_comparison_section">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">
                    Category Comparison
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Current vs. prior month spending per category
                  </p>
                </div>
              </div>

              {/* Table header */}
              <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-0 pb-2 border-b border-border mb-1">
                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Category
                </span>
                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground hidden sm:block text-right">
                  Prior
                </span>
                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground text-right">
                  Current
                </span>
                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground text-right">
                  Change
                </span>
              </div>

              {report.categoryComparisons.map((comp, i) => (
                <CategoryRow key={comp.category} comp={comp} index={i} />
              ))}

              {/* Legend */}
              <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ArrowUp className="h-3 w-3 text-red-500" />
                  <span>
                    <span className="text-red-600 font-medium">Red ↑</span>{" "}
                    &gt;30% spike
                  </span>
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ArrowUp className="h-3 w-3 text-amber-500" />
                  <span>
                    <span className="text-amber-600 font-medium">Amber ↑</span>{" "}
                    1–30% increase
                  </span>
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ArrowDown className="h-3 w-3 text-emerald-500" />
                  <span>
                    <span className="text-emerald-600 font-medium">
                      Green ↓
                    </span>{" "}
                    decrease
                  </span>
                </span>
              </div>
            </SectionCard>
          </motion.div>
        )
      )}

      {/* Anomaly Report — Flagged Transactions */}
      {report && report.expenseAnomalies.length > 0 && (
        <motion.div {...slideUp(0.15)}>
          <SectionCard data-ocid="insights.flagged_transactions">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100">
                <Zap className="h-4 w-4 text-red-600" />
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-foreground">
                  Flagged Transactions
                </h2>
                <p className="text-xs text-muted-foreground">
                  Expenses exceeding 2× your average of{" "}
                  {fmt(report.averageExpense)}
                </p>
              </div>
              <Badge className="bg-red-100 text-red-700 border-0 font-bold">
                {report.expenseAnomalies.length}
              </Badge>
            </div>

            <div className="space-y-2">
              {report.expenseAnomalies.map((anomaly, i) => (
                <motion.div
                  key={anomaly.expenseId}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center justify-between gap-3 rounded-lg bg-red-50/60 border border-red-100 px-4 py-3"
                  data-ocid={`insights.flagged_transaction.${i + 1}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-red-100">
                      <AlertTriangle className="h-3.5 w-3.5 text-red-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {anomaly.category}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(anomaly.date), "MMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold font-mono text-red-700">
                      {fmt(anomaly.amount)}
                    </p>
                    <p className="text-[11px] text-red-500">
                      {(anomaly.amount / report.averageExpense).toFixed(1)}× avg
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionCard>
        </motion.div>
      )}

      {/* Auto-generated Insights */}
      <motion.div {...slideUp(0.2)}>
        <SectionCard data-ocid="insights.auto_insights">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Lightbulb className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">
                Financial Insights
              </h2>
              <p className="text-xs text-muted-foreground">
                Auto-generated from your spending data
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-16 rounded-xl" />
              <Skeleton className="h-16 rounded-xl" />
              <Skeleton className="h-16 rounded-xl" />
            </div>
          ) : dynamicInsights.length > 0 ? (
            <div className="space-y-3">
              {dynamicInsights.map((insight, i) => (
                <InsightCard key={insight.id} insight={insight} index={i} />
              ))}
            </div>
          ) : (
            <div
              className="text-center py-8 text-muted-foreground text-sm"
              data-ocid="insights.auto_insights_empty_state"
            >
              Add more expenses to generate personalized insights.
            </div>
          )}
        </SectionCard>
      </motion.div>
    </PageContainer>
  );
}
