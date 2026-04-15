import { c as createLucideIcon, u as useFinanceStore, r as reactExports, j as jsxRuntimeExports, P as PageContainer, e as PageHeader, X, g as SectionCard, a as Badge } from "./index-wWuc713R.js";
import { I as Input, C as Check, u as ue } from "./index-BcQTdD8j.js";
import { f as formatCurrency } from "./currency-DMUw_CfW.js";
import { A as AnimatePresence } from "./index-EsWnr_P0.js";
import { m as motion } from "./proxy-D8dG5x07.js";
import { T as TriangleAlert, Z as Zap } from "./zap-DlqOA8Rf.js";
import { T as TrendingUp } from "./trending-up-BUfJX3YN.js";
import { T as TrendingDown } from "./trending-down-u-ACY-kH.js";
import { P as Package, H as HeartPulse, F as Film, B as Bus, U as UtensilsCrossed } from "./utensils-crossed-EXqaYIEl.js";
import { H as House, S as ShoppingBag } from "./shopping-bag-cYLbYNGa.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",
      key: "1v9wt8"
    }
  ]
];
const Plane = createLucideIcon("plane", __iconNode);
const CATEGORY_META = {
  "Food & Dining": {
    icon: UtensilsCrossed,
    color: "text-chart-2",
    bg: "bg-chart-2/10"
  },
  Transportation: { icon: Bus, color: "text-chart-5", bg: "bg-chart-5/10" },
  Shopping: { icon: ShoppingBag, color: "text-primary", bg: "bg-primary/10" },
  Entertainment: { icon: Film, color: "text-chart-4", bg: "bg-chart-4/10" },
  Healthcare: { icon: HeartPulse, color: "text-chart-3", bg: "bg-chart-3/10" },
  Housing: { icon: House, color: "text-foreground", bg: "bg-secondary" },
  Utilities: { icon: Zap, color: "text-muted-foreground", bg: "bg-muted" },
  Travel: { icon: Plane, color: "text-chart-2", bg: "bg-chart-2/10" },
  Other: { icon: Package, color: "text-muted-foreground", bg: "bg-muted" }
};
function ProgressBar({ pct }) {
  const clamped = Math.min(pct, 100);
  const color = pct > 100 ? "bg-destructive" : pct >= 80 ? "bg-[oklch(0.72_0.22_41)]" : "bg-[oklch(0.55_0.18_145)]";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full rounded-full bg-secondary overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: `h-full rounded-full ${color}`,
      initial: { width: 0 },
      animate: { width: `${clamped}%` },
      transition: { duration: 0.6, ease: "easeOut" }
    }
  ) });
}
function StatCard({
  label,
  value,
  icon: Icon,
  variant = "default"
}) {
  const colors = {
    default: {
      bg: "bg-primary/8",
      icon: "text-primary",
      value: "text-foreground"
    },
    danger: {
      bg: "bg-destructive/8",
      icon: "text-destructive",
      value: "text-destructive"
    },
    success: {
      bg: "bg-[oklch(0.55_0.18_145)]/10",
      icon: "text-[oklch(0.55_0.18_145)]",
      value: "text-[oklch(0.45_0.18_145)]"
    }
  };
  const c = colors[variant];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { className: "flex items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: `inline-flex items-center justify-center w-10 h-10 rounded-xl ${c.bg} flex-shrink-0`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-5 w-5 ${c.icon}` })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-lg font-semibold tabular-nums ${c.value}`, children: value })
    ] })
  ] });
}
function BudgetCard({ budget, index }) {
  const updateBudget = useFinanceStore((s) => s.updateBudget);
  const [editing, setEditing] = reactExports.useState(false);
  const [inputVal, setInputVal] = reactExports.useState("");
  const pct = budget.monthlyLimit > 0 ? budget.spent / budget.monthlyLimit * 100 : 0;
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
      ue.error("Please enter a valid amount");
      return;
    }
    updateBudget(budget.category, parsed);
    ue.success(`Budget updated for ${budget.category}`);
    setEditing(false);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") saveEdit();
    if (e.key === "Escape") cancelEdit();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.06, duration: 0.3 },
      "data-ocid": `budget.card.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        SectionCard,
        {
          className: `flex flex-col gap-4 ${isOver ? "border-destructive/30" : ""}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `inline-flex items-center justify-center w-9 h-9 rounded-xl ${meta.bg} flex-shrink-0`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-4 w-4 ${meta.color}` })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: budget.category }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                    pct.toFixed(0),
                    "% used"
                  ] })
                ] })
              ] }),
              isOver && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-[10px] font-semibold px-1.5 py-0 h-5 bg-destructive/10 text-destructive border-destructive/30 flex-shrink-0",
                  "data-ocid": `budget.over_budget_badge.${index + 1}`,
                  children: "Over Budget"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBar, { pct }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mb-1", children: "Budget" }),
                editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-1",
                    "data-ocid": `budget.edit_form.${index + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          type: "number",
                          min: "0",
                          value: inputVal,
                          onChange: (e) => setInputVal(e.target.value),
                          onKeyDown: handleKeyDown,
                          className: "h-7 text-xs px-1.5 text-center tabular-nums",
                          autoFocus: true,
                          "data-ocid": `budget.limit_input.${index + 1}`
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          onClick: saveEdit,
                          type: "button",
                          className: "flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded bg-primary text-primary-foreground hover:opacity-90 transition-smooth",
                          "aria-label": "Save budget limit",
                          "data-ocid": `budget.save_button.${index + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          onClick: cancelEdit,
                          type: "button",
                          className: "flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded bg-secondary text-muted-foreground hover:bg-muted transition-smooth",
                          "aria-label": "Cancel edit",
                          "data-ocid": `budget.cancel_button.${index + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
                        }
                      )
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: startEdit,
                    className: "group flex items-center justify-center gap-1 w-full",
                    "aria-label": `Edit budget limit for ${budget.category}`,
                    "data-ocid": `budget.edit_button.${index + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground tabular-nums", children: formatCurrency(budget.monthlyLimit) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-smooth" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mb-1", children: "Spent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: `text-sm font-semibold tabular-nums ${isOver ? "text-destructive" : "text-foreground"}`,
                    children: formatCurrency(budget.spent)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mb-1", children: "Remaining" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: `text-sm font-semibold tabular-nums ${isOver ? "text-destructive" : "text-[oklch(0.45_0.18_145)]"}`,
                    children: isOver ? `-${formatCurrency(Math.abs(remaining))}` : formatCurrency(remaining)
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function BudgetPage() {
  const budgets = useFinanceStore((s) => s.budgets);
  const [dismissedAlerts, setDismissedAlerts] = reactExports.useState(
    /* @__PURE__ */ new Set()
  );
  const now = /* @__PURE__ */ new Date();
  const monthYear = now.toLocaleString("en-IN", {
    month: "long",
    year: "numeric"
  });
  const totalLimit = budgets.reduce((s, b) => s + b.monthlyLimit, 0);
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0);
  const totalRemaining = totalLimit - totalSpent;
  const overBudgetCategories = budgets.filter(
    (b) => b.spent > b.monthlyLimit && !dismissedAlerts.has(b.category)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageContainer, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Monthly Budget", description: monthYear }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: overBudgetCategories.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, height: 0, marginBottom: 0 },
        animate: { opacity: 1, height: "auto", marginBottom: 0 },
        exit: { opacity: 0, height: 0 },
        transition: { duration: 0.25 },
        "data-ocid": `budget.over_budget_alert.${b.category.toLowerCase().replace(/[^a-z]/g, "_")}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-destructive/30 bg-destructive/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-destructive flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-destructive font-medium truncate", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: b.category }),
              " is over budget by ",
              formatCurrency(b.spent - b.monthlyLimit)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setDismissedAlerts((prev) => /* @__PURE__ */ new Set([...prev, b.category])),
              className: "flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-md text-destructive/70 hover:text-destructive hover:bg-destructive/10 transition-smooth",
              "aria-label": `Dismiss alert for ${b.category}`,
              "data-ocid": `budget.dismiss_alert_button.${b.category.toLowerCase().replace(/[^a-z]/g, "_")}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
            }
          )
        ] })
      },
      b.category
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
        "data-ocid": "budget.summary_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Total Budget",
              value: formatCurrency(totalLimit),
              icon: TrendingUp,
              variant: "default"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Total Spent",
              value: formatCurrency(totalSpent),
              icon: TrendingDown,
              variant: totalSpent > totalLimit ? "danger" : "default"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Remaining",
              value: formatCurrency(Math.abs(totalRemaining)),
              icon: totalRemaining >= 0 ? TrendingUp : TriangleAlert,
              variant: totalRemaining < 0 ? "danger" : "success"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide mb-4", children: "Category Budgets" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
          "data-ocid": "budget.cards_grid",
          children: budgets.map((budget, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(BudgetCard, { budget, index: i }, budget.id))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground pb-2", children: "Click the budget amount on any card to edit your monthly limit." })
  ] });
}
export {
  BudgetPage as default
};
