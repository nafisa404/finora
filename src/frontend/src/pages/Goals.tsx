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
import { formatCurrency } from "@/lib/currency";
import { useFinanceStore } from "@/store/useFinanceStore";
import { EXPENSE_CATEGORIES } from "@/types";
import type { Goal } from "@/types";
import {
  Calendar,
  CheckCircle2,
  Edit2,
  Plus,
  Target,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Category badge colors ────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  "Food & Dining": { bg: "bg-chart-2/10", text: "text-chart-2" },
  Transportation: { bg: "bg-chart-5/10", text: "text-chart-5" },
  Shopping: { bg: "bg-primary/10", text: "text-primary" },
  Entertainment: { bg: "bg-chart-4/10", text: "text-chart-4" },
  Healthcare: { bg: "bg-chart-3/10", text: "text-chart-3" },
  Housing: { bg: "bg-secondary", text: "text-foreground" },
  Utilities: { bg: "bg-muted", text: "text-muted-foreground" },
  Travel: { bg: "bg-chart-2/10", text: "text-chart-2" },
  Savings: { bg: "bg-primary/10", text: "text-primary" },
  Other: { bg: "bg-muted", text: "text-muted-foreground" },
};

function categoryStyle(cat: string) {
  return CATEGORY_COLORS[cat] ?? CATEGORY_COLORS.Other;
}

function formatDeadline(deadline: string): string {
  if (!deadline) return "";
  const d = new Date(deadline);
  return d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}

// ─── Goal form types ──────────────────────────────────────────────────────────

interface GoalFormValues {
  name: string;
  targetAmount: string;
  currentAmount: string;
  deadline: string;
  category: string;
}

const EMPTY_FORM: GoalFormValues = {
  name: "",
  targetAmount: "",
  currentAmount: "",
  deadline: "",
  category: "",
};

interface GoalFormErrors {
  name?: string;
  targetAmount?: string;
  deadline?: string;
}

// ─── Goal Modal ───────────────────────────────────────────────────────────────

function GoalModal({
  open,
  editGoal,
  onClose,
}: {
  open: boolean;
  editGoal: Goal | null;
  onClose: () => void;
}) {
  const addGoal = useFinanceStore((s) => s.addGoal);
  const updateGoal = useFinanceStore((s) => s.updateGoal);

  const [form, setForm] = useState<GoalFormValues>(() =>
    editGoal
      ? {
          name: editGoal.name,
          targetAmount: String(editGoal.targetAmount),
          currentAmount: String(editGoal.currentAmount),
          deadline: editGoal.deadline,
          category: editGoal.category,
        }
      : EMPTY_FORM,
  );

  const [errors, setErrors] = useState<GoalFormErrors>({});

  const validate = (): boolean => {
    const next: GoalFormErrors = {};
    if (!form.name.trim()) next.name = "Goal name is required.";
    const target = Number(form.targetAmount);
    if (!form.targetAmount || Number.isNaN(target) || target <= 0)
      next.targetAmount = "Enter a target amount greater than ₹0.";
    if (!form.deadline) next.deadline = "Deadline is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      name: form.name.trim(),
      targetAmount: Number(form.targetAmount),
      currentAmount: Math.max(0, Number(form.currentAmount) || 0),
      deadline: form.deadline,
      category: form.category || "Other",
    };

    if (editGoal) {
      updateGoal(editGoal.id, payload);
      toast.success("Goal updated");
    } else {
      addGoal(payload);
      toast.success("Goal created");
    }
    onClose();
  };

  const field = <K extends keyof GoalFormValues>(
    key: K,
    value: GoalFormValues[K],
  ) => setForm((f) => ({ ...f, [key]: value }));

  if (!open) return null;

  return (
    <dialog
      open
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent max-w-none max-h-none w-full h-full m-0"
      aria-label={editGoal ? "Edit goal" : "Add new goal"}
      data-ocid="goals.dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="button"
        tabIndex={0}
        aria-label="Close modal"
      />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-card-hover"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
              <Target className="h-4 w-4 text-primary" />
            </span>
            <h2 className="font-display font-semibold text-foreground text-base">
              {editGoal ? "Edit Goal" : "New Goal"}
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={onClose}
            aria-label="Close"
            data-ocid="goals.close_button"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="px-6 py-5 space-y-4"
          noValidate
        >
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="goal-name">Goal Name</Label>
            <Input
              id="goal-name"
              placeholder="e.g. Emergency Fund"
              value={form.name}
              onChange={(e) => {
                field("name", e.target.value);
                if (errors.name)
                  setErrors((er) => ({ ...er, name: undefined }));
              }}
              aria-invalid={!!errors.name}
              data-ocid="goals.name_input"
            />
            {errors.name && (
              <p
                className="text-xs text-destructive"
                data-ocid="goals.name_field_error"
              >
                {errors.name}
              </p>
            )}
          </div>

          {/* Target & Current amounts */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="goal-target">Target Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
                  ₹
                </span>
                <Input
                  id="goal-target"
                  type="number"
                  min="1"
                  step="1"
                  placeholder="100000"
                  value={form.targetAmount}
                  onChange={(e) => {
                    field("targetAmount", e.target.value);
                    if (errors.targetAmount)
                      setErrors((er) => ({ ...er, targetAmount: undefined }));
                  }}
                  className="pl-7"
                  aria-invalid={!!errors.targetAmount}
                  data-ocid="goals.target_amount_input"
                />
              </div>
              {errors.targetAmount && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="goals.target_field_error"
                >
                  {errors.targetAmount}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="goal-current">
                Amount Saved{" "}
                <span className="text-muted-foreground text-xs">(so far)</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
                  ₹
                </span>
                <Input
                  id="goal-current"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="0"
                  value={form.currentAmount}
                  onChange={(e) => field("currentAmount", e.target.value)}
                  className="pl-7"
                  data-ocid="goals.current_amount_input"
                />
              </div>
            </div>
          </div>

          {/* Deadline */}
          <div className="space-y-1.5">
            <Label htmlFor="goal-deadline">Deadline</Label>
            <Input
              id="goal-deadline"
              type="date"
              value={form.deadline}
              onChange={(e) => {
                field("deadline", e.target.value);
                if (errors.deadline)
                  setErrors((er) => ({ ...er, deadline: undefined }));
              }}
              aria-invalid={!!errors.deadline}
              data-ocid="goals.deadline_input"
            />
            {errors.deadline && (
              <p
                className="text-xs text-destructive"
                data-ocid="goals.deadline_field_error"
              >
                {errors.deadline}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <Label htmlFor="goal-category">Category</Label>
            <Select
              value={form.category}
              onValueChange={(v) => field("category", v)}
            >
              <SelectTrigger
                id="goal-category"
                data-ocid="goals.category_select"
              >
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Savings">Savings</SelectItem>
                {EXPENSE_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
              data-ocid="goals.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              data-ocid="goals.submit_button"
            >
              {editGoal ? "Save Changes" : "Create Goal"}
            </Button>
          </div>
        </form>
      </motion.div>
    </dialog>
  );
}

// ─── Goal Card ────────────────────────────────────────────────────────────────

function GoalCard({
  goal,
  index,
  onEdit,
  onDelete,
}: {
  goal: Goal;
  index: number;
  onEdit: (g: Goal) => void;
  onDelete: (id: string) => void;
}) {
  const pct = Math.min(
    100,
    Math.round((goal.currentAmount / goal.targetAmount) * 100),
  );
  const achieved = goal.currentAmount >= goal.targetAmount;
  const catStyle = categoryStyle(goal.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.3 }}
    >
      <SectionCard className="flex flex-col gap-4 group">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10 flex-shrink-0 mt-0.5">
              <Target className="h-4 w-4 text-primary" />
            </span>
            <div className="min-w-0">
              <p className="font-semibold text-foreground text-sm leading-snug truncate">
                {goal.name}
              </p>
              <span
                className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${catStyle.bg} ${catStyle.text}`}
              >
                {goal.category}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-smooth">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-secondary"
              onClick={() => onEdit(goal)}
              aria-label={`Edit ${goal.name}`}
              data-ocid={`goals.edit_button.${index + 1}`}
            >
              <Edit2 className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              onClick={() => onDelete(goal.id)}
              aria-label={`Delete ${goal.name}`}
              data-ocid={`goals.delete_button.${index + 1}`}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-end justify-between gap-2">
            <div>
              <p className="text-lg font-bold text-foreground tabular-nums">
                {formatCurrency(goal.currentAmount)}
              </p>
              <p className="text-xs text-muted-foreground">
                of {formatCurrency(goal.targetAmount)}
              </p>
            </div>
            {achieved ? (
              <Badge
                className="text-xs font-semibold px-2.5 py-1 flex items-center gap-1.5 bg-chart-4/15 text-chart-4 border-chart-4/30"
                variant="outline"
                data-ocid={`goals.achieved_badge.${index + 1}`}
              >
                <CheckCircle2 className="h-3 w-3" />
                Achieved!
              </Badge>
            ) : (
              <span className="text-xl font-bold text-primary tabular-nums">
                {pct}%
              </span>
            )}
          </div>

          {/* Progress bar */}
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${achieved ? "bg-chart-4" : "bg-primary"}`}
              style={{
                background: achieved
                  ? "oklch(var(--chart-4))"
                  : "linear-gradient(90deg, oklch(var(--primary)) 0%, oklch(0.65 0.22 246) 100%)",
              }}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1],
                delay: index * 0.07 + 0.2,
              }}
            />
          </div>
        </div>

        {/* Deadline */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground border-t border-border pt-3">
          <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
          <span>Target: {formatDeadline(goal.deadline)}</span>
        </div>
      </SectionCard>
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function Goals() {
  const goals = useFinanceStore((s) => s.goals);
  const deleteGoal = useFinanceStore((s) => s.deleteGoal);

  const [modalOpen, setModalOpen] = useState(false);
  const [editGoal, setEditGoal] = useState<Goal | null>(null);

  const openAdd = () => {
    setEditGoal(null);
    setModalOpen(true);
  };

  const openEdit = (goal: Goal) => {
    setEditGoal(goal);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditGoal(null);
  };

  const handleDelete = (id: string) => {
    deleteGoal(id);
    toast.success("Goal removed");
  };

  // Summary stats
  const totalTarget = goals.reduce((s, g) => s + g.targetAmount, 0);
  const totalSaved = goals.reduce((s, g) => s + g.currentAmount, 0);
  const achievedCount = goals.filter(
    (g) => g.currentAmount >= g.targetAmount,
  ).length;

  return (
    <>
      <PageContainer data-ocid="goals.page">
        <PageHeader
          title="Goals"
          description="Track your savings goals and milestones"
          action={
            <Button
              className="gap-2"
              onClick={openAdd}
              data-ocid="goals.add_button"
            >
              <Plus className="h-4 w-4" />
              Add Goal
            </Button>
          }
        />

        {/* Summary strip */}
        {goals.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-3 gap-4"
          >
            {[
              { label: "Total Goals", value: goals.length, suffix: "" },
              {
                label: "Total Saved",
                value: formatCurrency(totalSaved),
                suffix: ` / ${formatCurrency(totalTarget)}`,
              },
              {
                label: "Achieved",
                value: achievedCount,
                suffix: ` of ${goals.length}`,
              },
            ].map(({ label, value, suffix }) => (
              <SectionCard key={label} className="py-4 px-5">
                <p className="text-xs text-muted-foreground mb-1">{label}</p>
                <p className="font-bold text-foreground text-lg tabular-nums">
                  {value}
                  {suffix && (
                    <span className="text-xs text-muted-foreground font-normal ml-1">
                      {suffix}
                    </span>
                  )}
                </p>
              </SectionCard>
            ))}
          </motion.div>
        )}

        {/* Goals grid */}
        {goals.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 gap-4 text-center"
            data-ocid="goals.empty_state"
          >
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10">
              <Target className="h-7 w-7 text-primary" />
            </span>
            <div>
              <p className="font-semibold text-foreground text-base">
                No goals yet
              </p>
              <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                Set your first savings goal — from an emergency fund to your
                dream vacation.
              </p>
            </div>
            <Button
              className="gap-2 mt-2"
              onClick={openAdd}
              data-ocid="goals.empty_add_button"
            >
              <Plus className="h-4 w-4" />
              Create your first goal
            </Button>
          </motion.div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            data-ocid="goals.list"
          >
            {goals.map((goal, i) => (
              <div key={goal.id} data-ocid={`goals.item.${i + 1}`}>
                <GoalCard
                  goal={goal}
                  index={i}
                  onEdit={openEdit}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        )}
      </PageContainer>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <GoalModal
            open={modalOpen}
            editGoal={editGoal}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </>
  );
}
