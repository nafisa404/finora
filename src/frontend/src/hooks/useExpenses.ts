import { useFinanceStore } from "@/store/useFinanceStore";
import type { AddExpenseRequest, Expense } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Seed data for demo experience
const SEED_EXPENSES: Expense[] = [
  {
    id: 1,
    amount: 124.0,
    category: "Food & Dining",
    note: "Dinner at Nobu",
    date: Date.now() - 86400000 * 1,
  },
  {
    id: 2,
    amount: 30.0,
    category: "Transportation",
    note: "Uber ride",
    date: Date.now() - 86400000 * 2,
  },
  {
    id: 3,
    amount: 35.0,
    category: "Shopping",
    note: "Amazon order",
    date: Date.now() - 86400000 * 3,
  },
  {
    id: 4,
    amount: 280.0,
    category: "Food & Dining",
    note: "Team lunch (anomaly)",
    date: Date.now() - 86400000 * 4,
  },
  {
    id: 5,
    amount: 55.0,
    category: "Entertainment",
    note: "Netflix + Spotify",
    date: Date.now() - 86400000 * 5,
  },
  {
    id: 6,
    amount: 18.5,
    category: "Transportation",
    note: "Metro pass top-up",
    date: Date.now() - 86400000 * 6,
  },
  {
    id: 7,
    amount: 92.0,
    category: "Healthcare",
    note: "Pharmacy",
    date: Date.now() - 86400000 * 7,
  },
  {
    id: 8,
    amount: 1200.0,
    category: "Housing",
    note: "Monthly rent",
    date: Date.now() - 86400000 * 8,
  },
];

export function useExpenses() {
  const setExpenses = useFinanceStore((s) => s.setExpenses);

  return useQuery<Expense[]>({
    queryKey: ["expenses"],
    queryFn: async () => {
      const storeExpenses = useFinanceStore.getState().expenses;
      if (storeExpenses.length > 0) {
        return storeExpenses;
      }
      setExpenses(SEED_EXPENSES);
      return SEED_EXPENSES;
    },
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useAddExpense() {
  const queryClient = useQueryClient();
  const addExpenseLocal = useFinanceStore((s) => s.addExpenseLocal);

  return useMutation({
    mutationFn: async (req: AddExpenseRequest): Promise<Expense> => {
      const newExpense: Expense = { ...req, id: Date.now() };
      addExpenseLocal(newExpense);
      return newExpense;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
      queryClient.invalidateQueries({ queryKey: ["anomalyReport"] });
    },
  });
}

export function useDeleteExpense() {
  const queryClient = useQueryClient();
  const removeExpenseLocal = useFinanceStore((s) => s.removeExpenseLocal);

  return useMutation({
    mutationFn: async (id: number): Promise<boolean> => {
      removeExpenseLocal(id);
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
      queryClient.invalidateQueries({ queryKey: ["anomalyReport"] });
    },
  });
}
