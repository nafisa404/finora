import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, d as cn, u as useFinanceStore, P as PageContainer, e as PageHeader, L as Link, B as Button, S as Skeleton, f as PiggyBank, g as SectionCard, b as Bell, a as Badge, X } from "./index-wWuc713R.js";
import { P as Primitive } from "./index-BdIDyt6T.js";
import { u as useExpenses, a as useAnomalyReport } from "./useAnomalyReport-nnhAxypV.js";
import { u as useDashboardStats } from "./useDashboardStats-CWD3flIJ.js";
import { f as formatCurrency } from "./currency-DMUw_CfW.js";
import { A as ArrowRight } from "./arrow-right-3-wTUTwC.js";
import { T as TrendingUp } from "./trending-up-BUfJX3YN.js";
import { W as Wallet } from "./wallet-BN2ylDCL.js";
import { T as TrendingDown } from "./trending-down-u-ACY-kH.js";
import { m as motion } from "./proxy-D8dG5x07.js";
import { A as AnimatePresence } from "./index-EsWnr_P0.js";
import { C as CircleCheck } from "./circle-check-kxMKawt2.js";
import { Z as Zap, T as TriangleAlert } from "./zap-DlqOA8Rf.js";
import { H as House, S as ShoppingBag } from "./shopping-bag-cYLbYNGa.js";
import { f as format } from "./format-BGwA-lBQ.js";
import "./useQuery-B8PX_R-9.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742",
      key: "178tsu"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05", key: "1hqiys" }]
];
const BellOff = createLucideIcon("bell-off", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2",
      key: "5owen"
    }
  ],
  ["circle", { cx: "7", cy: "17", r: "2", key: "u2ysq9" }],
  ["path", { d: "M9 17h6", key: "r8uit2" }],
  ["circle", { cx: "17", cy: "17", r: "2", key: "axvx0g" }]
];
const Car = createLucideIcon("car", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M10 2v2", key: "7u0qdc" }],
  ["path", { d: "M14 2v2", key: "6buw04" }],
  [
    "path",
    {
      d: "M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1",
      key: "pwadti"
    }
  ],
  ["path", { d: "M6 2v2", key: "colzsn" }]
];
const Coffee = createLucideIcon("coffee", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M11 2v2", key: "1539x4" }],
  ["path", { d: "M5 2v2", key: "1yf1q8" }],
  ["path", { d: "M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1", key: "rb5t3r" }],
  ["path", { d: "M8 15a6 6 0 0 0 12 0v-3", key: "x18d4x" }],
  ["circle", { cx: "20", cy: "10", r: "2", key: "ts1r5v" }]
];
const Stethoscope = createLucideIcon("stethoscope", __iconNode);
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = reactExports.createContext(defaultContext);
    BaseContext.displayName = rootComponentName + "Context";
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      var _a;
      const { scope, children, ...context } = props;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      var _a;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const context = reactExports.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactExports.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
      return reactExports.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }
);
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }
);
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
  return typeof value === "number";
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
const CATEGORY_ICONS = {
  "Food & Dining": Coffee,
  Transportation: Car,
  Shopping: ShoppingBag,
  Entertainment: Zap,
  Healthcare: Stethoscope,
  Housing: House,
  Utilities: Zap,
  Travel: TrendingUp,
  Other: Wallet
};
const CATEGORY_COLORS = {
  "Food & Dining": "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  Transportation: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  Shopping: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  Entertainment: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
  Healthcare: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  Housing: "bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400",
  Utilities: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
  Travel: "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400",
  Other: "bg-secondary text-muted-foreground"
};
function StatCard({
  title,
  value,
  sub,
  icon: Icon,
  index,
  trend,
  subIcon
}) {
  const SubIcon = subIcon;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] },
      "data-ocid": `dashboard.stat_card.${index}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { className: "flex flex-col gap-3 h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-primary" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl font-semibold text-foreground leading-none", children: value }) }),
        sub && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex items-center gap-1.5 text-xs font-medium ${trend === "up" ? "text-emerald-600 dark:text-emerald-400" : trend === "down" ? "text-destructive" : "text-muted-foreground"}`,
            children: [
              SubIcon && /* @__PURE__ */ jsxRuntimeExports.jsx(SubIcon, { className: "h-3 w-3 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: sub })
            ]
          }
        )
      ] })
    }
  );
}
function AlertCard({
  id,
  title,
  message,
  severity,
  index
}) {
  const dismissAlert = useFinanceStore((s) => s.dismissAlert);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -12 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 12, height: 0, marginTop: 0, marginBottom: 0 },
      transition: { duration: 0.25, delay: index * 0.06 },
      className: `relative flex items-start gap-3 rounded-xl border-l-4 border p-4 ${severity === "critical" ? "border-l-destructive bg-destructive/5 border-destructive/15 dark:bg-destructive/10" : "border-l-yellow-500 bg-yellow-50/60 border-yellow-200/60 dark:bg-yellow-900/10 dark:border-yellow-800/30"}`,
      "data-ocid": `dashboard.alert.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `mt-0.5 flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center ${severity === "critical" ? "bg-destructive/15" : "bg-yellow-100 dark:bg-yellow-900/40"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              TriangleAlert,
              {
                className: `h-3 w-3 ${severity === "critical" ? "text-destructive" : "text-yellow-600 dark:text-yellow-400"}`
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1 space-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: `text-[10px] px-1.5 py-0 border-0 font-medium ${severity === "critical" ? "bg-destructive/15 text-destructive" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400"}`,
                children: severity === "critical" ? "High" : "Medium"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: message })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => dismissAlert(id),
            className: "flex-shrink-0 h-6 w-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-smooth -mr-1 -mt-0.5",
            "aria-label": "Dismiss alert",
            "data-ocid": `dashboard.alert_dismiss.${index + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
          }
        )
      ]
    }
  );
}
function SavingsProgressCard({ percent }) {
  const savingsGoal = 5e5;
  const saved = savingsGoal * (percent / 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PiggyBank, { className: "h-4 w-4 text-emerald-600 dark:text-emerald-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Annual Savings Goal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Target: ",
            formatCurrency(savingsGoal)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-xl font-semibold text-foreground", children: [
          percent,
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          formatCurrency(saved),
          " saved"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: percent, className: "h-2.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "₹0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-emerald-600 dark:text-emerald-400 font-medium", children: [
          formatCurrency(saved),
          " reached"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatCurrency(savingsGoal) })
      ] })
    ] })
  ] });
}
function SpendingMiniBar({
  day,
  amount,
  maxAmount
}) {
  const heightPct = maxAmount > 0 ? amount / maxAmount * 100 : 0;
  const isHigh = amount > 1e4;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1.5 flex-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full flex items-end justify-center h-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { scaleY: 0 },
        animate: { scaleY: 1 },
        transition: { duration: 0.5, ease: "easeOut" },
        style: { height: `${Math.max(heightPct, 8)}%`, originY: 1 },
        className: `w-full max-w-[28px] rounded-t-md ${isHigh ? "bg-destructive/70" : "bg-primary/60"}`
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground font-medium", children: day })
  ] });
}
function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: expenses = [], isLoading: expLoading } = useExpenses();
  const alerts = useFinanceStore((s) => s.alerts);
  const { data: anomalyReport } = useAnomalyReport();
  const recentExpenses = expenses.slice(0, 3);
  const dailyData = (anomalyReport == null ? void 0 : anomalyReport.dailySpending) ?? [];
  const maxDaily = Math.max(...dailyData.map((d) => d.total), 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageContainer, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Dashboard",
        description: "Your financial overview at a glance",
        action: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/expenses", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            className: "gap-1.5",
            "data-ocid": "dashboard.add_expense_button",
            children: [
              "Add Expense",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
            ]
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
        "data-ocid": "dashboard.stats_section",
        children: statsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-36 rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-36 rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-36 rounded-xl" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              title: "Total Balance",
              value: formatCurrency((stats == null ? void 0 : stats.totalBalance) ?? 0),
              sub: "+3.25% vs. last month",
              icon: Wallet,
              index: 1,
              trend: "up",
              subIcon: TrendingUp
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              title: "Monthly Spending",
              value: formatCurrency((stats == null ? void 0 : stats.monthlySpending) ?? 0),
              sub: "+18.7% vs. ₹1,64,540 prior",
              icon: TrendingDown,
              index: 2,
              trend: "down",
              subIcon: TrendingDown
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              title: "Savings Progress",
              value: `${(stats == null ? void 0 : stats.savingsProgressPercent) ?? 0}%`,
              sub: "On track to hit goal",
              icon: PiggyBank,
              index: 3,
              trend: "neutral"
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      !statsLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay: 0.35 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SavingsProgressCard, { percent: (stats == null ? void 0 : stats.savingsProgressPercent) ?? 0 })
        }
      ),
      dailyData.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay: 0.45 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Weekly Spending" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/charts", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "text-xs h-7 px-2",
                  "data-ocid": "dashboard.view_charts_button",
                  children: "Full Chart →"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-1 h-20", children: dailyData.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              SpendingMiniBar,
              {
                day: d.dayLabel,
                amount: d.total,
                maxAmount: maxDaily
              },
              d.dayLabel
            )) })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, delay: 0.55 },
        "data-ocid": "dashboard.alerts_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-foreground flex items-center gap-2 text-sm uppercase tracking-wide text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4" }),
              "Active Alerts",
              alerts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 inline-flex items-center justify-center h-5 w-5 rounded-full bg-destructive text-[10px] font-bold text-white", children: alerts.length })
            ] }),
            alerts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/insights", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "text-xs h-7 px-2",
                "data-ocid": "dashboard.view_all_alerts_button",
                children: "View all"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: alerts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              className: "flex flex-col items-center justify-center py-8 rounded-xl border border-dashed border-border gap-2",
              "data-ocid": "dashboard.alerts_empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BellOff, { className: "h-5 w-5 text-muted-foreground" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "All clear" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center max-w-xs", children: "No anomalies detected. Your spending looks healthy!" })
              ]
            },
            "empty"
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            alerts.slice(0, 3).map((alert, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertCard,
              {
                id: alert.id,
                title: alert.title,
                message: alert.message,
                severity: alert.severity,
                index: i
              },
              alert.id
            )),
            alerts.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                className: "text-center pt-1",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/insights", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "text-xs text-muted-foreground h-7",
                    "data-ocid": "dashboard.more_alerts_button",
                    children: [
                      "+",
                      alerts.length - 3,
                      " more alerts — see Insights"
                    ]
                  }
                ) })
              }
            )
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, delay: 0.65 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Recent Transactions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/expenses", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "text-xs h-7 px-2",
                "data-ocid": "dashboard.view_all_expenses_button",
                children: "View all"
              }
            ) })
          ] }),
          expLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 rounded-lg" }, i)) }) : recentExpenses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center py-8 gap-2 text-center",
              "data-ocid": "dashboard.expenses_empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-8 w-8 text-muted-foreground/50" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No expenses yet." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/expenses", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    "data-ocid": "dashboard.add_first_expense_button",
                    children: "Add your first expense"
                  }
                ) })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "space-y-1",
              "data-ocid": "dashboard.recent_transactions_list",
              children: [
                recentExpenses.map((expense, i) => {
                  const CatIcon = CATEGORY_ICONS[expense.category] ?? Wallet;
                  const colorCls = CATEGORY_COLORS[expense.category] ?? "bg-secondary text-muted-foreground";
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, x: -8 },
                      animate: { opacity: 1, x: 0 },
                      transition: { delay: 0.65 + i * 0.08 },
                      className: "flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-secondary/50 transition-smooth group",
                      "data-ocid": `dashboard.transaction.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: `h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0 ${colorCls}`,
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CatIcon, { className: "h-4 w-4" })
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: expense.note || expense.category }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                              expense.category,
                              " ·",
                              " ",
                              format(new Date(expense.date), "MMM d")
                            ] })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-foreground flex-shrink-0 ml-4 tabular-nums", children: [
                          "-",
                          formatCurrency(expense.amount)
                        ] })
                      ]
                    },
                    expense.id
                  );
                }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2 border-t border-border mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/expenses", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "w-full text-xs text-muted-foreground hover:text-foreground",
                    "data-ocid": "dashboard.see_all_transactions_button",
                    children: [
                      "See all transactions",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 ml-1" })
                    ]
                  }
                ) }) })
              ]
            }
          )
        ] })
      }
    )
  ] });
}
export {
  Dashboard as default
};
