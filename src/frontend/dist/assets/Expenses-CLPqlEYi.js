import { u as useFinanceStore, r as reactExports, j as jsxRuntimeExports, P as PageContainer, e as PageHeader, g as SectionCard, E as EXPENSE_CATEGORIES, B as Button, S as Skeleton, a as Badge } from "./index-wWuc713R.js";
import { I as Input, u as ue } from "./index-BcQTdD8j.js";
import { L as Label, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, P as Plus } from "./select-B32YR50T.js";
import { u as useExpenses, a as useAnomalyReport, b as useAddExpense, c as useDeleteExpense, g as generateAlertsFromReport } from "./useAnomalyReport-nnhAxypV.js";
import { f as formatCurrency } from "./currency-DMUw_CfW.js";
import { f as format } from "./format-BGwA-lBQ.js";
import { m as motion } from "./proxy-D8dG5x07.js";
import { P as Package, B as Bus, H as HeartPulse, F as Film, U as UtensilsCrossed } from "./utensils-crossed-EXqaYIEl.js";
import { T as TriangleAlert, Z as Zap } from "./zap-DlqOA8Rf.js";
import { T as Trash2 } from "./trash-2-qEmDRwyB.js";
import { H as House, S as ShoppingBag } from "./shopping-bag-cYLbYNGa.js";
import "./index-BdIDyt6T.js";
import "./useQuery-B8PX_R-9.js";
const CATEGORY_META = {
  "Food & Dining": {
    icon: UtensilsCrossed,
    color: "text-chart-2",
    bg: "bg-chart-2/10"
  },
  Transportation: {
    icon: Bus,
    color: "text-chart-5",
    bg: "bg-chart-5/10"
  },
  Shopping: {
    icon: ShoppingBag,
    color: "text-primary",
    bg: "bg-primary/10"
  },
  Entertainment: {
    icon: Film,
    color: "text-chart-4",
    bg: "bg-chart-4/10"
  },
  Healthcare: {
    icon: HeartPulse,
    color: "text-chart-3",
    bg: "bg-chart-3/10"
  },
  Housing: {
    icon: House,
    color: "text-foreground",
    bg: "bg-secondary"
  },
  Utilities: {
    icon: Zap,
    color: "text-muted-foreground",
    bg: "bg-muted"
  },
  Travel: {
    icon: Bus,
    color: "text-chart-2",
    bg: "bg-chart-2/10"
  },
  Other: {
    icon: Package,
    color: "text-muted-foreground",
    bg: "bg-muted"
  }
};
function CategoryIcon({
  category,
  size = "sm"
}) {
  const meta = CATEGORY_META[category] ?? CATEGORY_META.Other;
  const Icon = meta.icon;
  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  const padSize = size === "sm" ? "p-1.5" : "p-2";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center justify-center rounded-lg ${padSize} ${meta.bg} flex-shrink-0`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `${iconSize} ${meta.color}` })
    }
  );
}
function Expenses() {
  const { data: expenses = [], isLoading } = useExpenses();
  const { data: anomalyReport } = useAnomalyReport();
  const addExpense = useAddExpense();
  const deleteExpense = useDeleteExpense();
  const addAlert = useFinanceStore((s) => s.addAlert);
  const today = format(/* @__PURE__ */ new Date(), "yyyy-MM-dd");
  const [form, setForm] = reactExports.useState({
    amount: "",
    category: "",
    note: "",
    date: today
  });
  const [errors, setErrors] = reactExports.useState({ amount: "", category: "" });
  const anomalousIds = new Set(
    (anomalyReport == null ? void 0 : anomalyReport.expenseAnomalies.map((a) => a.expenseId)) ?? []
  );
  const validate = () => {
    const newErrors = { amount: "", category: "" };
    const amount = Number.parseFloat(form.amount);
    if (!form.amount || Number.isNaN(amount) || amount <= 0) {
      newErrors.amount = "Please enter a valid amount greater than 0";
    }
    if (!form.category) {
      newErrors.category = "Please select a category";
    }
    setErrors(newErrors);
    return !newErrors.amount && !newErrors.category;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const amount = Number.parseFloat(form.amount);
    const newExpense = await addExpense.mutateAsync({
      amount,
      category: form.category,
      note: form.note,
      date: new Date(form.date).getTime()
    });
    if (anomalyReport) {
      const newAlerts = generateAlertsFromReport(
        [newExpense],
        anomalyReport.averageExpense,
        anomalyReport.categoryComparisons,
        anomalyReport.dailySpending
      );
      for (const alert of newAlerts) {
        addAlert(alert);
      }
    }
    ue.success("Expense added successfully");
    setForm({ amount: "", category: "", note: "", date: today });
    setErrors({ amount: "", category: "" });
  };
  const handleDelete = async (id) => {
    await deleteExpense.mutateAsync(id);
    ue.success("Expense deleted");
  };
  const recentExpenses = expenses.slice(0, 20);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageContainer, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Expenses",
        description: "Track and manage your spending"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { className: "lg:col-span-2 h-fit", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground mb-5", children: "Add Expense" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: handleSubmit,
            className: "space-y-4",
            "data-ocid": "expenses.add_form",
            noValidate: true,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "amount", children: "Amount" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none text-sm font-medium", children: "₹" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "amount",
                      type: "number",
                      min: "0.01",
                      step: "0.01",
                      placeholder: "0.00",
                      value: form.amount,
                      onChange: (e) => {
                        setForm((f) => ({ ...f, amount: e.target.value }));
                        if (errors.amount)
                          setErrors((er) => ({ ...er, amount: "" }));
                      },
                      className: "pl-9",
                      "aria-invalid": !!errors.amount,
                      "data-ocid": "expenses.amount_input"
                    }
                  )
                ] }),
                errors.amount && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "expenses.amount_field_error",
                    children: errors.amount
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "category", children: "Category" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: form.category,
                    onValueChange: (v) => {
                      setForm((f) => ({ ...f, category: v }));
                      if (errors.category)
                        setErrors((er) => ({ ...er, category: "" }));
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          id: "category",
                          "aria-invalid": !!errors.category,
                          "data-ocid": "expenses.category_select",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a category", children: form.category && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryIcon, { category: form.category }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: form.category })
                          ] }) })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: EXPENSE_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: cat, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryIcon, { category: cat }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cat })
                      ] }) }, cat)) })
                    ]
                  }
                ),
                errors.category && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "expenses.category_field_error",
                    children: errors.category
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "note", children: [
                  "Note",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(optional)" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "note",
                    placeholder: "What was this for?",
                    value: form.note,
                    onChange: (e) => setForm((f) => ({ ...f, note: e.target.value })),
                    "data-ocid": "expenses.note_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "date", children: "Date" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "date",
                    type: "date",
                    value: form.date,
                    onChange: (e) => setForm((f) => ({ ...f, date: e.target.value })),
                    "data-ocid": "expenses.date_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "submit",
                  className: "w-full gap-2",
                  disabled: addExpense.isPending,
                  "data-ocid": "expenses.submit_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
                    addExpense.isPending ? "Adding..." : "Add Expense"
                  ]
                }
              )
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { className: "lg:col-span-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Recent Transactions" }),
          recentExpenses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            recentExpenses.length,
            " expense",
            recentExpenses.length !== 1 ? "s" : ""
          ] })
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[60px] rounded-lg" }, i)) }) : recentExpenses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            className: "flex flex-col items-center justify-center py-16 gap-3 text-center",
            "data-ocid": "expenses.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-5 w-5 text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm", children: "No expenses yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Add your first expense above." })
              ] })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "expenses.transactions_list", children: recentExpenses.map((expense, i) => {
          const isAnomaly = anomalousIds.has(expense.id);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -10 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: i * 0.04, duration: 0.25 },
              className: `flex items-center justify-between px-3 py-3 rounded-lg border transition-smooth group ${isAnomaly ? "border-destructive/30 bg-destructive/5 hover:bg-destructive/8" : "border-border hover:bg-secondary/50"}`,
              "data-ocid": `expenses.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryIcon, { category: expense.category, size: "md" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate max-w-[160px]", children: expense.note || expense.category }),
                      isAnomaly && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Badge,
                        {
                          className: "text-[10px] font-semibold px-1.5 py-0 h-4 bg-destructive/15 text-destructive border-destructive/30 gap-1 flex-shrink-0",
                          variant: "outline",
                          "data-ocid": `expenses.anomaly_badge.${i + 1}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-2.5 w-2.5" }),
                            "Anomaly"
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      expense.category,
                      " ·",
                      " ",
                      format(new Date(expense.date), "MMM d, yyyy")
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0 ml-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `text-sm font-semibold tabular-nums ${isAnomaly ? "text-destructive" : "text-foreground"}`,
                      children: [
                        "-",
                        formatCurrency(expense.amount)
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      className: "h-7 w-7 opacity-0 group-hover:opacity-100 transition-smooth text-muted-foreground hover:text-destructive hover:bg-destructive/10",
                      onClick: () => handleDelete(expense.id),
                      disabled: deleteExpense.isPending,
                      "aria-label": `Delete expense: ${expense.note || expense.category}`,
                      "data-ocid": `expenses.delete_button.${i + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
                    }
                  )
                ] })
              ]
            },
            expense.id
          );
        }) })
      ] })
    ] })
  ] });
}
export {
  Expenses as default
};
