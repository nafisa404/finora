import { u as useQuery } from "./useQuery-DY-ZsIeO.js";
const SEED_STATS = {
  totalBalance: 12480.5,
  monthlySpending: 2350,
  savingsProgressPercent: 52
};
const SEED_CATEGORY_BREAKDOWN = [
  { category: "Housing", total: 1200 },
  { category: "Food & Dining", total: 454 },
  { category: "Healthcare", total: 92 },
  { category: "Entertainment", total: 55 },
  { category: "Transportation", total: 48.5 },
  { category: "Shopping", total: 35 }
];
const SEED_DAILY_SPENDING = [
  { dayLabel: "Mon", date: Date.now() - 864e5 * 6, total: 18.5 },
  { dayLabel: "Tue", date: Date.now() - 864e5 * 5, total: 55 },
  { dayLabel: "Wed", date: Date.now() - 864e5 * 4, total: 280 },
  { dayLabel: "Thu", date: Date.now() - 864e5 * 3, total: 35 },
  { dayLabel: "Fri", date: Date.now() - 864e5 * 2, total: 30 },
  { dayLabel: "Sat", date: Date.now() - 864e5 * 1, total: 124 },
  { dayLabel: "Sun", date: Date.now(), total: 92 }
];
function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => SEED_STATS,
    staleTime: Number.POSITIVE_INFINITY
  });
}
function useCategoryBreakdown() {
  return useQuery({
    queryKey: ["categoryBreakdown"],
    queryFn: async () => SEED_CATEGORY_BREAKDOWN,
    staleTime: Number.POSITIVE_INFINITY
  });
}
function useDailySpending() {
  return useQuery({
    queryKey: ["dailySpending"],
    queryFn: async () => SEED_DAILY_SPENDING,
    staleTime: Number.POSITIVE_INFINITY
  });
}
export {
  useDailySpending as a,
  useCategoryBreakdown as b,
  useDashboardStats as u
};
