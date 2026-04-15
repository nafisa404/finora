import { PageContainer, PageHeader, SectionCard } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useAnomalyReport } from "@/hooks/useAnomalyReport";
import {
  useAddExpense,
  useDeleteExpense,
  useExpenses,
} from "@/hooks/useExpenses";
import { generateAlertsFromReport } from "@/lib/anomalyDetection";
import { formatCurrency } from "@/lib/currency";
import { useFinanceStore } from "@/store/useFinanceStore";
import { EXPENSE_CATEGORIES } from "@/types";
import { format } from "date-fns";
import {
  AlertTriangle,
  Bus,
  Film,
  HeartPulse,
  Home,
  Package,
  Plus,
  ShoppingBag,
  Trash2,
  UtensilsCrossed,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
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
  Transportation: {
    icon: Bus,
    color: "text-chart-5",
    bg: "bg-chart-5/10",
  },
  Shopping: {
    icon: ShoppingBag,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  Entertainment: {
    icon: Film,
    color: "text-chart-4",
    bg: "bg-chart-4/10",
  },
  Healthcare: {
    icon: HeartPulse,
    color: "text-chart-3",
    bg: "bg-chart-3/10",
  },
  Housing: {
    icon: Home,
    color: "text-foreground",
    bg: "bg-secondary",
  },
  Utilities: {
    icon: Zap,
    color: "text-muted-foreground",
    bg: "bg-muted",
  },
  Travel: {
    icon: Bus,
    color: "text-chart-2",
    bg: "bg-chart-2/10",
  },
  Other: {
    icon: Package,
    color: "text-muted-foreground",
    bg: "bg-muted",
  },
};

function CategoryIcon({
  category,
  size = "sm",
}: {
  category: string;
  size?: "sm" | "md";
}) {
  const meta = CATEGORY_META[category] ?? CATEGORY_META.Other;
  const Icon = meta.icon;
  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  const padSize = size === "sm" ? "p-1.5" : "p-2";
  return (
    <span
      className={`inline-flex items-center justify-center rounded-lg ${padSize} ${meta.bg} flex-shrink-0`}
    >
      <Icon className={`${iconSize} ${meta.color}`} />
    </span>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function Expenses() {
  const { data: expenses = [], isLoading } = useExpenses();
  const { data: anomalyReport } = useAnomalyReport();
  const addExpense = useAddExpense();
  const deleteExpense = useDeleteExpense();
  const addAlert = useFinanceStore((s) => s.addAlert);

  const today = format(new Date(), "yyyy-MM-dd");

  const [form, setForm] = useState({
    amount: "",
    category: "",
    note: "",
    date: today,
  });
  const [errors, setErrors] = useState({ amount: "", category: "" });

  // Set of anomalous expense IDs from the report
  const anomalousIds = new Set(
    anomalyReport?.expenseAnomalies.map((a) => a.expenseId) ?? [],
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const amount = Number.parseFloat(form.amount);
    const newExpense = await addExpense.mutateAsync({
      amount,
      category: form.category,
      note: form.note,
      date: new Date(form.date).getTime(),
    });

    // Run anomaly detection on the new expense
    if (anomalyReport) {
      const newAlerts = generateAlertsFromReport(
        [newExpense],
        anomalyReport.averageExpense,
        anomalyReport.categoryComparisons,
        anomalyReport.dailySpending,
      );
      for (const alert of newAlerts) {
        addAlert(alert);
      }
    }

    toast.success("Expense added successfully");
    setForm({ amount: "", category: "", note: "", date: today });
    setErrors({ amount: "", category: "" });
  };

  const handleDelete = async (id: number) => {
    await deleteExpense.mutateAsync(id);
    toast.success("Expense deleted");
  };

  // Show only last 20
  const recentExpenses = expenses.slice(0, 20);

  return (
    <PageContainer>
      <PageHeader
        title="Expenses"
        description="Track and manage your spending"
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* ── Add Expense Form ─────────────────────────────── */}
        <SectionCard className="lg:col-span-2 h-fit">
          <h2 className="font-semibold text-foreground mb-5">Add Expense</h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            data-ocid="expenses.add_form"
            noValidate
          >
            {/* Amount */}
            <div className="space-y-1.5">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none text-sm font-medium">
                  ₹
                </span>
                <Input
                  id="amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  value={form.amount}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, amount: e.target.value }));
                    if (errors.amount)
                      setErrors((er) => ({ ...er, amount: "" }));
                  }}
                  className="pl-9"
                  aria-invalid={!!errors.amount}
                  data-ocid="expenses.amount_input"
                />
              </div>
              {errors.amount && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="expenses.amount_field_error"
                >
                  {errors.amount}
                </p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <Label htmlFor="category">Category</Label>
              <Select
                value={form.category}
                onValueChange={(v) => {
                  setForm((f) => ({ ...f, category: v }));
                  if (errors.category)
                    setErrors((er) => ({ ...er, category: "" }));
                }}
              >
                <SelectTrigger
                  id="category"
                  aria-invalid={!!errors.category}
                  data-ocid="expenses.category_select"
                >
                  <SelectValue placeholder="Select a category">
                    {form.category && (
                      <span className="flex items-center gap-2">
                        <CategoryIcon category={form.category} />
                        <span>{form.category}</span>
                      </span>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {EXPENSE_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      <span className="flex items-center gap-2">
                        <CategoryIcon category={cat} />
                        <span>{cat}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="expenses.category_field_error"
                >
                  {errors.category}
                </p>
              )}
            </div>

            {/* Note */}
            <div className="space-y-1.5">
              <Label htmlFor="note">
                Note{" "}
                <span className="text-muted-foreground text-xs">
                  (optional)
                </span>
              </Label>
              <Input
                id="note"
                placeholder="What was this for?"
                value={form.note}
                onChange={(e) =>
                  setForm((f) => ({ ...f, note: e.target.value }))
                }
                data-ocid="expenses.note_input"
              />
            </div>

            {/* Date */}
            <div className="space-y-1.5">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm((f) => ({ ...f, date: e.target.value }))
                }
                data-ocid="expenses.date_input"
              />
            </div>

            <Button
              type="submit"
              className="w-full gap-2"
              disabled={addExpense.isPending}
              data-ocid="expenses.submit_button"
            >
              <Plus className="h-4 w-4" />
              {addExpense.isPending ? "Adding..." : "Add Expense"}
            </Button>
          </form>
        </SectionCard>

        {/* ── Recent Transactions ───────────────────────────── */}
        <SectionCard className="lg:col-span-3">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-foreground">
              Recent Transactions
            </h2>
            {recentExpenses.length > 0 && (
              <span className="text-xs text-muted-foreground">
                {recentExpenses.length} expense
                {recentExpenses.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-[60px] rounded-lg" />
              ))}
            </div>
          ) : recentExpenses.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-16 gap-3 text-center"
              data-ocid="expenses.empty_state"
            >
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted">
                <Package className="h-5 w-5 text-muted-foreground" />
              </span>
              <div>
                <p className="font-medium text-foreground text-sm">
                  No expenses yet
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Add your first expense above.
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-2" data-ocid="expenses.transactions_list">
              {recentExpenses.map((expense, i) => {
                const isAnomaly = anomalousIds.has(expense.id);
                return (
                  <motion.div
                    key={expense.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                    className={`flex items-center justify-between px-3 py-3 rounded-lg border transition-smooth group ${
                      isAnomaly
                        ? "border-destructive/30 bg-destructive/5 hover:bg-destructive/8"
                        : "border-border hover:bg-secondary/50"
                    }`}
                    data-ocid={`expenses.item.${i + 1}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <CategoryIcon category={expense.category} size="md" />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-medium text-foreground truncate max-w-[160px]">
                            {expense.note || expense.category}
                          </p>
                          {isAnomaly && (
                            <Badge
                              className="text-[10px] font-semibold px-1.5 py-0 h-4 bg-destructive/15 text-destructive border-destructive/30 gap-1 flex-shrink-0"
                              variant="outline"
                              data-ocid={`expenses.anomaly_badge.${i + 1}`}
                            >
                              <AlertTriangle className="h-2.5 w-2.5" />
                              Anomaly
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {expense.category} ·{" "}
                          {format(new Date(expense.date), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                      <span
                        className={`text-sm font-semibold tabular-nums ${
                          isAnomaly ? "text-destructive" : "text-foreground"
                        }`}
                      >
                        -{formatCurrency(expense.amount)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-smooth text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDelete(expense.id)}
                        disabled={deleteExpense.isPending}
                        aria-label={`Delete expense: ${expense.note || expense.category}`}
                        data-ocid={`expenses.delete_button.${i + 1}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </SectionCard>
      </div>
    </PageContainer>
  );
}
