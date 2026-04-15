import { c as createLucideIcon, u as useFinanceStore, r as reactExports, s as Lightbulb, j as jsxRuntimeExports, P as PageContainer, e as PageHeader, S as Skeleton, f as SectionCard, a as Badge, B as Button, X } from "./index-B-5eHoNj.js";
import { a as useAnomalyReport, T as TriangleAlert, Z as Zap } from "./useAnomalyReport-DCs9OQ7L.js";
import { T as TrendingUp } from "./trending-up-Kox3zMsR.js";
import { T as TrendingDown } from "./trending-down-VbZaYQHJ.js";
import { C as CircleCheck } from "./circle-check-CYxS9qot.js";
import { m as motion } from "./proxy-DqR_Tkk4.js";
import { S as ShieldAlert } from "./shield-alert-XU2GSGWf.js";
import { f as format } from "./format-BGwA-lBQ.js";
import "./useQuery-DY-ZsIeO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
];
const ArrowDown = createLucideIcon("arrow-down", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
  ["path", { d: "M12 19V5", key: "x0mq9r" }]
];
const ArrowUp = createLucideIcon("arrow-up", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode);
const fmt = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
  n
);
const slideUp = (delay) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut", delay }
});
function AlertCard({
  alert,
  index,
  onDismiss
}) {
  const isCritical = alert.severity === "critical";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -12 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 16 },
      transition: { duration: 0.35, delay: index * 0.06 },
      className: `group flex items-start gap-4 rounded-xl border p-4 transition-smooth ${isCritical ? "bg-red-50/70 border-red-200/70 hover:border-red-300/80" : "bg-amber-50/60 border-amber-200/60 hover:border-amber-300/70"}`,
      "data-ocid": `insights.alert.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${isCritical ? "bg-red-100" : "bg-amber-100"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              ShieldAlert,
              {
                className: `h-4 w-4 ${isCritical ? "text-red-600" : "text-amber-600"}`
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: alert.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: `text-[10px] font-bold uppercase tracking-widest border-0 px-2 py-0 ${isCritical ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`,
                "data-ocid": `insights.alert_badge.${index + 1}`,
                children: isCritical ? "HIGH" : "MEDIUM"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: alert.message }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground/70 mt-1.5", children: format(new Date(alert.timestamp), "MMM d, yyyy · h:mm a") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: `h-7 w-7 shrink-0 transition-smooth opacity-0 group-hover:opacity-100 ${isCritical ? "text-red-400 hover:text-red-600 hover:bg-red-100" : "text-amber-400 hover:text-amber-600 hover:bg-amber-100"}`,
            onClick: () => onDismiss(alert.id),
            "aria-label": "Dismiss alert",
            "data-ocid": `insights.dismiss_alert.${index + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
          }
        )
      ]
    },
    alert.id
  );
}
function CategoryRow({
  comp,
  index
}) {
  const isPositiveChange = comp.percentChange > 0;
  const isBad = comp.percentChange > 30;
  const isWarning = comp.percentChange > 0 && comp.percentChange <= 30;
  const isGood = comp.percentChange <= 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 10 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.35, delay: index * 0.07 },
      className: "grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 py-3 border-b border-border last:border-0",
      "data-ocid": `insights.category_comparison.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground truncate", children: comp.category }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right hidden sm:block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Prior" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono text-muted-foreground", children: fmt(comp.priorMonthTotal) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Current" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono font-medium text-foreground", children: fmt(comp.currentMonthTotal) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          isPositiveChange ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            ArrowUp,
            {
              className: `h-3.5 w-3.5 ${isBad ? "text-red-500" : "text-amber-500"}`
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "h-3.5 w-3.5 text-emerald-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: `text-xs border-0 font-semibold tabular-nums ${isBad ? "bg-red-100 text-red-700" : isWarning ? "bg-amber-100 text-amber-700" : isGood ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"}`,
              children: [
                comp.percentChange > 0 ? "+" : "",
                comp.percentChange.toFixed(0),
                "%"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function InsightCard({
  insight,
  index
}) {
  const styles = {
    warning: {
      bg: "bg-amber-50/70 border-amber-200/60",
      icon: "text-amber-600",
      iconBg: "bg-amber-100"
    },
    tip: {
      bg: "bg-blue-50/60 border-blue-200/50",
      icon: "text-blue-600",
      iconBg: "bg-blue-100"
    },
    positive: {
      bg: "bg-emerald-50/60 border-emerald-200/50",
      icon: "text-emerald-600",
      iconBg: "bg-emerald-100"
    },
    info: {
      bg: "bg-muted/60 border-border",
      icon: "text-muted-foreground",
      iconBg: "bg-secondary"
    }
  };
  const s = styles[insight.type];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.4, delay: index * 0.08 },
      className: `flex items-start gap-4 rounded-xl border p-4 transition-smooth hover:shadow-card-hover ${s.bg}`,
      "data-ocid": `insights.insight.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${s.iconBg}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(insight.icon, { className: `h-4 w-4 ${s.icon}` })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: insight.message })
      ]
    }
  );
}
function SummaryStat({
  label,
  value,
  sub,
  accent
}) {
  const colorMap = {
    red: "text-red-600",
    amber: "text-amber-600",
    blue: "text-primary",
    green: "text-emerald-600"
  };
  const valueColor = accent ? colorMap[accent] : "text-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 rounded-xl bg-background border border-border p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-widest text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-2xl font-display font-bold ${valueColor}`, children: value }),
    sub && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: sub })
  ] });
}
function Insights() {
  const { data: report, isLoading } = useAnomalyReport();
  const alerts = useFinanceStore((s) => s.alerts);
  const dismissAlert = useFinanceStore((s) => s.dismissAlert);
  const dynamicInsights = reactExports.useMemo(() => {
    if (!report) return [];
    const insights = [];
    const totalSpending = report.dailySpending.reduce((s, d) => s + d.total, 0);
    const avgDaily = report.averageExpense;
    const expectedWeekly = avgDaily * 7;
    if (expectedWeekly > 0) {
      const pct = Math.round(
        (totalSpending - expectedWeekly) / expectedWeekly * 100
      );
      if (pct > 10) {
        insights.push({
          id: "weekly-spend",
          icon: TrendingUp,
          message: `You spent ${pct}% more this week compared to your average weekly spending.`,
          type: "warning"
        });
      } else if (pct < -10) {
        insights.push({
          id: "weekly-spend",
          icon: TrendingDown,
          message: `Great job! You spent ${Math.abs(pct)}% less this week compared to your average.`,
          type: "positive"
        });
      }
    }
    const topCategory = [...report.categoryComparisons].sort(
      (a, b) => b.currentMonthTotal - a.currentMonthTotal
    )[0];
    if (topCategory) {
      insights.push({
        id: "top-category",
        icon: Info,
        message: `Your top spending category this month is ${topCategory.category} at ${fmt(topCategory.currentMonthTotal)}.`,
        type: "info"
      });
    }
    const spikedCategory = report.categoryComparisons.find(
      (c) => c.percentChange > 30
    );
    if (spikedCategory) {
      insights.push({
        id: "reduce-tip",
        icon: Lightbulb,
        message: `Consider reducing ${spikedCategory.category} expenses — they're up ${spikedCategory.percentChange.toFixed(0)}% from last month.`,
        type: "tip"
      });
    } else {
      insights.push({
        id: "reduce-tip",
        icon: Lightbulb,
        message: "Your spending categories are well-balanced. No major spikes detected this month.",
        type: "tip"
      });
    }
    const highExpenseCount = report.expenseAnomalies.length;
    if (highExpenseCount === 0) {
      insights.push({
        id: "savings-status",
        icon: CircleCheck,
        message: "You are on track with your savings goal. No unusual expenses detected this period.",
        type: "positive"
      });
    } else {
      insights.push({
        id: "savings-status",
        icon: TriangleAlert,
        message: `You have ${highExpenseCount} high-value transaction${highExpenseCount > 1 ? "s" : ""} this period. Review them to stay within your monthly budget.`,
        type: "warning"
      });
    }
    return insights;
  }, [report]);
  const summaryStats = reactExports.useMemo(() => {
    if (!report) return null;
    const highestExpense = report.expenseAnomalies.reduce(
      (max, a) => Math.max(max, a.amount),
      0
    );
    const topCategory = [...report.categoryComparisons].sort(
      (a, b) => b.currentMonthTotal - a.currentMonthTotal
    )[0];
    return {
      anomaliesDetected: report.expenseAnomalies.length + alerts.length,
      highestExpense,
      topCategory: (topCategory == null ? void 0 : topCategory.category) ?? "N/A"
    };
  }, [report, alerts]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageContainer, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Insights & Anomaly Detection",
        description: "Rule-based anomaly analysis and personalized financial insights"
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-xl" })
    ] }) : summaryStats && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        ...slideUp(0),
        className: "grid grid-cols-2 md:grid-cols-3 gap-3",
        "data-ocid": "insights.summary_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SummaryStat,
            {
              label: "Anomalies Detected",
              value: String(summaryStats.anomaliesDetected),
              sub: "flagged transactions & alerts",
              accent: summaryStats.anomaliesDetected > 0 ? "red" : "green"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SummaryStat,
            {
              label: "Highest Single Expense",
              value: fmt(summaryStats.highestExpense),
              sub: "largest flagged amount",
              accent: "amber"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SummaryStat,
            {
              label: "Top Spending Category",
              value: summaryStats.topCategory,
              sub: "highest monthly spend",
              accent: "blue"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { ...slideUp(0.05), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "insights.alerts_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-red-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-4 w-4 text-red-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Active Alerts" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Real-time anomaly detection results" })
        ] }),
        alerts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-red-100 text-red-700 border-0 font-bold tabular-nums", children: [
          alerts.length,
          " alert",
          alerts.length !== 1 ? "s" : ""
        ] })
      ] }),
      alerts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center py-10 text-center",
          "data-ocid": "insights.alerts_empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-6 w-6 text-emerald-600" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "All clear!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "No anomalies detected in your recent spending." })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "insights.alerts_list", children: alerts.map((alert, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        AlertCard,
        {
          alert,
          index: i,
          onDismiss: dismissAlert
        },
        alert.id
      )) })
    ] }) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 rounded-xl" }) }) : report && report.categoryComparisons.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { ...slideUp(0.1), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "insights.category_comparison_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Category Comparison" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Current vs. prior month spending per category" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_auto_auto_auto] gap-4 px-0 pb-2 border-b border-border mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-widest text-muted-foreground", children: "Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-widest text-muted-foreground hidden sm:block text-right", children: "Prior" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-widest text-muted-foreground text-right", children: "Current" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-widest text-muted-foreground text-right", children: "Change" })
      ] }),
      report.categoryComparisons.map((comp, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryRow, { comp, index: i }, comp.category)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 mt-4 pt-4 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "h-3 w-3 text-red-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-600 font-medium", children: "Red ↑" }),
            " ",
            ">30% spike"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "h-3 w-3 text-amber-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-600 font-medium", children: "Amber ↑" }),
            " ",
            "1–30% increase"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "h-3 w-3 text-emerald-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-600 font-medium", children: "Green ↓" }),
            " ",
            "decrease"
          ] })
        ] })
      ] })
    ] }) }),
    report && report.expenseAnomalies.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { ...slideUp(0.15), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "insights.flagged_transactions", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-red-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4 text-red-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Flagged Transactions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Expenses exceeding 2× your average of",
            " ",
            fmt(report.averageExpense)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-100 text-red-700 border-0 font-bold", children: report.expenseAnomalies.length })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: report.expenseAnomalies.map((anomaly, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.07 },
          className: "flex items-center justify-between gap-3 rounded-lg bg-red-50/60 border border-red-100 px-4 py-3",
          "data-ocid": `insights.flagged_transaction.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-red-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3.5 w-3.5 text-red-600" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: anomaly.category }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: format(new Date(anomaly.date), "MMM d, yyyy") })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold font-mono text-red-700", children: fmt(anomaly.amount) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-red-500", children: [
                (anomaly.amount / report.averageExpense).toFixed(1),
                "× avg"
              ] })
            ] })
          ]
        },
        anomaly.expenseId
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { ...slideUp(0.2), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "insights.auto_insights", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "h-4 w-4 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Financial Insights" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Auto-generated from your spending data" })
        ] })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-xl" })
      ] }) : dynamicInsights.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: dynamicInsights.map((insight, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(InsightCard, { insight, index: i }, insight.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "text-center py-8 text-muted-foreground text-sm",
          "data-ocid": "insights.auto_insights_empty_state",
          children: "Add more expenses to generate personalized insights."
        }
      )
    ] }) })
  ] });
}
export {
  Insights as default
};
