import { c as createLucideIcon, u as useFinanceStore, r as reactExports, j as jsxRuntimeExports, P as PageContainer, e as PageHeader, B as Button, g as SectionCard, T as Target, a as Badge, X, E as EXPENSE_CATEGORIES } from "./index-wWuc713R.js";
import { u as ue, I as Input } from "./index-BcQTdD8j.js";
import { P as Plus, L as Label, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-B32YR50T.js";
import { f as formatCurrency } from "./currency-DMUw_CfW.js";
import { m as motion } from "./proxy-D8dG5x07.js";
import { A as AnimatePresence } from "./index-EsWnr_P0.js";
import { T as Trash2 } from "./trash-2-qEmDRwyB.js";
import { C as CircleCheck } from "./circle-check-kxMKawt2.js";
import "./index-BdIDyt6T.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$1);
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
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode);
const CATEGORY_COLORS = {
  "Food & Dining": { bg: "bg-chart-2/10", text: "text-chart-2" },
  Transportation: { bg: "bg-chart-5/10", text: "text-chart-5" },
  Shopping: { bg: "bg-primary/10", text: "text-primary" },
  Entertainment: { bg: "bg-chart-4/10", text: "text-chart-4" },
  Healthcare: { bg: "bg-chart-3/10", text: "text-chart-3" },
  Housing: { bg: "bg-secondary", text: "text-foreground" },
  Utilities: { bg: "bg-muted", text: "text-muted-foreground" },
  Travel: { bg: "bg-chart-2/10", text: "text-chart-2" },
  Savings: { bg: "bg-primary/10", text: "text-primary" },
  Other: { bg: "bg-muted", text: "text-muted-foreground" }
};
function categoryStyle(cat) {
  return CATEGORY_COLORS[cat] ?? CATEGORY_COLORS.Other;
}
function formatDeadline(deadline) {
  if (!deadline) return "";
  const d = new Date(deadline);
  return d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}
const EMPTY_FORM = {
  name: "",
  targetAmount: "",
  currentAmount: "",
  deadline: "",
  category: ""
};
function GoalModal({
  open,
  editGoal,
  onClose
}) {
  const addGoal = useFinanceStore((s) => s.addGoal);
  const updateGoal = useFinanceStore((s) => s.updateGoal);
  const [form, setForm] = reactExports.useState(
    () => editGoal ? {
      name: editGoal.name,
      targetAmount: String(editGoal.targetAmount),
      currentAmount: String(editGoal.currentAmount),
      deadline: editGoal.deadline,
      category: editGoal.category
    } : EMPTY_FORM
  );
  const [errors, setErrors] = reactExports.useState({});
  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Goal name is required.";
    const target = Number(form.targetAmount);
    if (!form.targetAmount || Number.isNaN(target) || target <= 0)
      next.targetAmount = "Enter a target amount greater than ₹0.";
    if (!form.deadline) next.deadline = "Deadline is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = {
      name: form.name.trim(),
      targetAmount: Number(form.targetAmount),
      currentAmount: Math.max(0, Number(form.currentAmount) || 0),
      deadline: form.deadline,
      category: form.category || "Other"
    };
    if (editGoal) {
      updateGoal(editGoal.id, payload);
      ue.success("Goal updated");
    } else {
      addGoal(payload);
      ue.success("Goal created");
    }
    onClose();
  };
  const field = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  if (!open) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "dialog",
    {
      open: true,
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent max-w-none max-h-none w-full h-full m-0",
      "aria-label": editGoal ? "Edit goal" : "Add new goal",
      "data-ocid": "goals.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-foreground/20 backdrop-blur-sm",
            onClick: onClose,
            onKeyDown: (e) => e.key === "Escape" && onClose(),
            role: "button",
            tabIndex: 0,
            "aria-label": "Close modal"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.95, y: 8 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.95, y: 8 },
            transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
            className: "relative w-full max-w-md bg-card border border-border rounded-2xl shadow-card-hover",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 pt-5 pb-4 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-4 w-4 text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-base", children: editGoal ? "Edit Goal" : "New Goal" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    className: "h-8 w-8 text-muted-foreground hover:text-foreground",
                    onClick: onClose,
                    "aria-label": "Close",
                    "data-ocid": "goals.close_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "form",
                {
                  onSubmit: handleSubmit,
                  className: "px-6 py-5 space-y-4",
                  noValidate: true,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "goal-name", children: "Goal Name" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "goal-name",
                          placeholder: "e.g. Emergency Fund",
                          value: form.name,
                          onChange: (e) => {
                            field("name", e.target.value);
                            if (errors.name)
                              setErrors((er) => ({ ...er, name: void 0 }));
                          },
                          "aria-invalid": !!errors.name,
                          "data-ocid": "goals.name_input"
                        }
                      ),
                      errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs text-destructive",
                          "data-ocid": "goals.name_field_error",
                          children: errors.name
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "goal-target", children: "Target Amount" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none", children: "₹" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "goal-target",
                              type: "number",
                              min: "1",
                              step: "1",
                              placeholder: "100000",
                              value: form.targetAmount,
                              onChange: (e) => {
                                field("targetAmount", e.target.value);
                                if (errors.targetAmount)
                                  setErrors((er) => ({ ...er, targetAmount: void 0 }));
                              },
                              className: "pl-7",
                              "aria-invalid": !!errors.targetAmount,
                              "data-ocid": "goals.target_amount_input"
                            }
                          )
                        ] }),
                        errors.targetAmount && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-xs text-destructive",
                            "data-ocid": "goals.target_field_error",
                            children: errors.targetAmount
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "goal-current", children: [
                          "Amount Saved",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(so far)" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none", children: "₹" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "goal-current",
                              type: "number",
                              min: "0",
                              step: "1",
                              placeholder: "0",
                              value: form.currentAmount,
                              onChange: (e) => field("currentAmount", e.target.value),
                              className: "pl-7",
                              "data-ocid": "goals.current_amount_input"
                            }
                          )
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "goal-deadline", children: "Deadline" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "goal-deadline",
                          type: "date",
                          value: form.deadline,
                          onChange: (e) => {
                            field("deadline", e.target.value);
                            if (errors.deadline)
                              setErrors((er) => ({ ...er, deadline: void 0 }));
                          },
                          "aria-invalid": !!errors.deadline,
                          "data-ocid": "goals.deadline_input"
                        }
                      ),
                      errors.deadline && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs text-destructive",
                          "data-ocid": "goals.deadline_field_error",
                          children: errors.deadline
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "goal-category", children: "Category" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Select,
                        {
                          value: form.category,
                          onValueChange: (v) => field("category", v),
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              SelectTrigger,
                              {
                                id: "goal-category",
                                "data-ocid": "goals.category_select",
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select category" })
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Savings", children: "Savings" }),
                              EXPENSE_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: cat, children: cat }, cat))
                            ] })
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          type: "button",
                          variant: "outline",
                          className: "flex-1",
                          onClick: onClose,
                          "data-ocid": "goals.cancel_button",
                          children: "Cancel"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          type: "submit",
                          className: "flex-1",
                          "data-ocid": "goals.submit_button",
                          children: editGoal ? "Save Changes" : "Create Goal"
                        }
                      )
                    ] })
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function GoalCard({
  goal,
  index,
  onEdit,
  onDelete
}) {
  const pct = Math.min(
    100,
    Math.round(goal.currentAmount / goal.targetAmount * 100)
  );
  const achieved = goal.currentAmount >= goal.targetAmount;
  const catStyle = categoryStyle(goal.category);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.07, duration: 0.3 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { className: "flex flex-col gap-4 group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10 flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-4 w-4 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm leading-snug truncate", children: goal.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${catStyle.bg} ${catStyle.text}`,
                  children: goal.category
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-smooth", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-secondary",
                onClick: () => onEdit(goal),
                "aria-label": `Edit ${goal.name}`,
                "data-ocid": `goals.edit_button.${index + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-3.5 w-3.5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10",
                onClick: () => onDelete(goal.id),
                "aria-label": `Delete ${goal.name}`,
                "data-ocid": `goals.delete_button.${index + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-foreground tabular-nums", children: formatCurrency(goal.currentAmount) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "of ",
                formatCurrency(goal.targetAmount)
              ] })
            ] }),
            achieved ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                className: "text-xs font-semibold px-2.5 py-1 flex items-center gap-1.5 bg-chart-4/15 text-chart-4 border-chart-4/30",
                variant: "outline",
                "data-ocid": `goals.achieved_badge.${index + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
                  "Achieved!"
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xl font-bold text-primary tabular-nums", children: [
              pct,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: `h-full rounded-full ${achieved ? "bg-chart-4" : "bg-primary"}`,
              style: {
                background: achieved ? "oklch(var(--chart-4))" : "linear-gradient(90deg, oklch(var(--primary)) 0%, oklch(0.65 0.22 246) 100%)"
              },
              initial: { width: 0 },
              animate: { width: `${pct}%` },
              transition: {
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1],
                delay: index * 0.07 + 0.2
              }
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground border-t border-border pt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Target: ",
            formatDeadline(goal.deadline)
          ] })
        ] })
      ] })
    }
  );
}
function Goals() {
  const goals = useFinanceStore((s) => s.goals);
  const deleteGoal = useFinanceStore((s) => s.deleteGoal);
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [editGoal, setEditGoal] = reactExports.useState(null);
  const openAdd = () => {
    setEditGoal(null);
    setModalOpen(true);
  };
  const openEdit = (goal) => {
    setEditGoal(goal);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setEditGoal(null);
  };
  const handleDelete = (id) => {
    deleteGoal(id);
    ue.success("Goal removed");
  };
  const totalTarget = goals.reduce((s, g) => s + g.targetAmount, 0);
  const totalSaved = goals.reduce((s, g) => s + g.currentAmount, 0);
  const achievedCount = goals.filter(
    (g) => g.currentAmount >= g.targetAmount
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(PageContainer, { "data-ocid": "goals.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PageHeader,
        {
          title: "Goals",
          description: "Track your savings goals and milestones",
          action: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "gap-2",
              onClick: openAdd,
              "data-ocid": "goals.add_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
                "Add Goal"
              ]
            }
          )
        }
      ),
      goals.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 6 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3 },
          className: "grid grid-cols-3 gap-4",
          children: [
            { label: "Total Goals", value: goals.length, suffix: "" },
            {
              label: "Total Saved",
              value: formatCurrency(totalSaved),
              suffix: ` / ${formatCurrency(totalTarget)}`
            },
            {
              label: "Achieved",
              value: achievedCount,
              suffix: ` of ${goals.length}`
            }
          ].map(({ label, value, suffix }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { className: "py-4 px-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-foreground text-lg tabular-nums", children: [
              value,
              suffix && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-normal ml-1", children: suffix })
            ] })
          ] }, label))
        }
      ),
      goals.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          className: "flex flex-col items-center justify-center py-24 gap-4 text-center",
          "data-ocid": "goals.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-7 w-7 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-base", children: "No goals yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-xs", children: "Set your first savings goal — from an emergency fund to your dream vacation." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "gap-2 mt-2",
                onClick: openAdd,
                "data-ocid": "goals.empty_add_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
                  "Create your first goal"
                ]
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",
          "data-ocid": "goals.list",
          children: goals.map((goal, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": `goals.item.${i + 1}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            GoalCard,
            {
              goal,
              index: i,
              onEdit: openEdit,
              onDelete: handleDelete
            }
          ) }, goal.id))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: modalOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      GoalModal,
      {
        open: modalOpen,
        editGoal,
        onClose: closeModal
      }
    ) })
  ] });
}
export {
  Goals as default
};
