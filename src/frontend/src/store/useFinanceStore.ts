import type { Alert, Budget, ChatMessage, Expense, Goal } from "@/types";
import { EXPENSE_CATEGORIES } from "@/types";
import { create } from "zustand";

interface FinanceState {
  expenses: Expense[];
  alerts: Alert[];
  chatMessages: ChatMessage[];
  goals: Goal[];
  budgets: Budget[];

  setExpenses: (expenses: Expense[]) => void;
  addExpenseLocal: (expense: Expense) => void;
  removeExpenseLocal: (id: number) => void;

  setAlerts: (alerts: Alert[]) => void;
  dismissAlert: (id: string) => void;
  addAlert: (alert: Alert) => void;

  addChatMessage: (message: ChatMessage) => void;
  clearChat: () => void;

  addGoal: (goal: Omit<Goal, "id" | "createdAt">) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;

  updateBudget: (category: string, monthlyLimit: number) => void;
}

const initialChatMessages: ChatMessage[] = [
  {
    id: "welcome-1",
    role: "assistant",
    content:
      "Hello! I'm Finora, your AI-powered financial assistant. I can help you track expenses, understand spending patterns, and provide personalized insights. What would you like to know?",
    timestamp: Date.now() - 60000,
  },
];

const initialGoals: Goal[] = [
  {
    id: "goal-1",
    name: "Emergency Fund",
    targetAmount: 500000,
    currentAmount: 210000,
    deadline: "2026-12-31",
    category: "Savings",
    createdAt: "2026-01-01",
  },
  {
    id: "goal-2",
    name: "Europe Vacation",
    targetAmount: 150000,
    currentAmount: 62000,
    deadline: "2026-09-30",
    category: "Travel",
    createdAt: "2026-02-01",
  },
  {
    id: "goal-3",
    name: "New Laptop",
    targetAmount: 80000,
    currentAmount: 35000,
    deadline: "2026-06-30",
    category: "Shopping",
    createdAt: "2026-03-01",
  },
];

/** Default monthly limits in INR per category */
const DEFAULT_BUDGET_LIMITS: Record<string, number> = {
  "Food & Dining": 15000,
  Transportation: 8000,
  Shopping: 10000,
  Entertainment: 5000,
  Healthcare: 6000,
  Housing: 25000,
  Utilities: 4000,
  Travel: 12000,
  Other: 5000,
};

function buildInitialBudgets(): Budget[] {
  return EXPENSE_CATEGORIES.map((cat) => ({
    id: `budget-${cat.toLowerCase().replace(/[^a-z]/g, "-")}`,
    category: cat,
    monthlyLimit: DEFAULT_BUDGET_LIMITS[cat] ?? 5000,
    spent: 0,
  }));
}

/** Compute current-month spent per category from the expense list */
function computeSpent(expenses: Expense[], budgets: Budget[]): Budget[] {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const spentMap: Record<string, number> = {};
  for (const expense of expenses) {
    const d = new Date(expense.date);
    if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
      spentMap[expense.category] =
        (spentMap[expense.category] ?? 0) + expense.amount;
    }
  }

  return budgets.map((b) => ({ ...b, spent: spentMap[b.category] ?? 0 }));
}

export const useFinanceStore = create<FinanceState>((set) => ({
  expenses: [],
  alerts: [],
  chatMessages: initialChatMessages,
  goals: initialGoals,
  budgets: buildInitialBudgets(),

  setExpenses: (expenses) =>
    set((state) => ({
      expenses,
      budgets: computeSpent(expenses, state.budgets),
    })),

  addExpenseLocal: (expense) =>
    set((state) => {
      const expenses = [expense, ...state.expenses];
      return { expenses, budgets: computeSpent(expenses, state.budgets) };
    }),

  removeExpenseLocal: (id) =>
    set((state) => {
      const expenses = state.expenses.filter((e) => e.id !== id);
      return { expenses, budgets: computeSpent(expenses, state.budgets) };
    }),

  setAlerts: (alerts) => set({ alerts }),
  dismissAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.filter((a) => a.id !== id),
    })),
  addAlert: (alert) =>
    set((state) => ({
      alerts: [alert, ...state.alerts],
    })),

  addChatMessage: (message) =>
    set((state) => ({
      chatMessages: [...state.chatMessages, message],
    })),
  clearChat: () => set({ chatMessages: initialChatMessages }),

  addGoal: (goal) => {
    const newGoal: Goal = {
      ...goal,
      id: `goal-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
    };
    set((state) => ({ goals: [...state.goals, newGoal] }));
  },

  updateGoal: (id, updates) =>
    set((state) => ({
      goals: state.goals.map((g) => (g.id === id ? { ...g, ...updates } : g)),
    })),

  deleteGoal: (id) =>
    set((state) => ({
      goals: state.goals.filter((g) => g.id !== id),
    })),

  updateBudget: (category, monthlyLimit) =>
    set((state) => ({
      budgets: computeSpent(
        state.expenses,
        state.budgets.map((b) =>
          b.category === category ? { ...b, monthlyLimit } : b,
        ),
      ),
    })),
}));
