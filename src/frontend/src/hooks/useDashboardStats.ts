import type { CategoryBreakdown, DailySpending, DashboardStats } from "@/types";
import { useQuery } from "@tanstack/react-query";

const SEED_STATS: DashboardStats = {
  totalBalance: 1248050,
  monthlySpending: 32500,
  savingsProgressPercent: 52,
};

const SEED_CATEGORY_BREAKDOWN: CategoryBreakdown[] = [
  { category: "Housing", total: 18000 },
  { category: "Food & Dining", total: 7200 },
  { category: "Healthcare", total: 3500 },
  { category: "Entertainment", total: 2800 },
  { category: "Transportation", total: 4100 },
  { category: "Shopping", total: 5200 },
];

const SEED_DAILY_SPENDING: DailySpending[] = [
  { dayLabel: "Mon", date: Date.now() - 86400000 * 6, total: 1200 },
  { dayLabel: "Tue", date: Date.now() - 86400000 * 5, total: 4800 },
  { dayLabel: "Wed", date: Date.now() - 86400000 * 4, total: 18500 },
  { dayLabel: "Thu", date: Date.now() - 86400000 * 3, total: 3200 },
  { dayLabel: "Fri", date: Date.now() - 86400000 * 2, total: 2900 },
  { dayLabel: "Sat", date: Date.now() - 86400000 * 1, total: 9800 },
  { dayLabel: "Sun", date: Date.now(), total: 6100 },
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
