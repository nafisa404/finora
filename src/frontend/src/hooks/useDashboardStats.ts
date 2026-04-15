import type { CategoryBreakdown, DailySpending, DashboardStats } from "@/types";
import { useQuery } from "@tanstack/react-query";

const SEED_STATS: DashboardStats = {
  totalBalance: 12480.5,
  monthlySpending: 2350.0,
  savingsProgressPercent: 52,
};

const SEED_CATEGORY_BREAKDOWN: CategoryBreakdown[] = [
  { category: "Housing", total: 1200 },
  { category: "Food & Dining", total: 454 },
  { category: "Healthcare", total: 92 },
  { category: "Entertainment", total: 55 },
  { category: "Transportation", total: 48.5 },
  { category: "Shopping", total: 35 },
];

const SEED_DAILY_SPENDING: DailySpending[] = [
  { dayLabel: "Mon", date: Date.now() - 86400000 * 6, total: 18.5 },
  { dayLabel: "Tue", date: Date.now() - 86400000 * 5, total: 55 },
  { dayLabel: "Wed", date: Date.now() - 86400000 * 4, total: 280 },
  { dayLabel: "Thu", date: Date.now() - 86400000 * 3, total: 35 },
  { dayLabel: "Fri", date: Date.now() - 86400000 * 2, total: 30 },
  { dayLabel: "Sat", date: Date.now() - 86400000 * 1, total: 124 },
  { dayLabel: "Sun", date: Date.now(), total: 92 },
];

export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: ["dashboardStats"],
    queryFn: async () => SEED_STATS,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useCategoryBreakdown() {
  return useQuery<CategoryBreakdown[]>({
    queryKey: ["categoryBreakdown"],
    queryFn: async () => SEED_CATEGORY_BREAKDOWN,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useDailySpending() {
  return useQuery<DailySpending[]>({
    queryKey: ["dailySpending"],
    queryFn: async () => SEED_DAILY_SPENDING,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
