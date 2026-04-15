import { u as useQuery } from "./useQuery-BTEfqfhN.js";
const SEED_STATS = {
  totalBalance: 1248050,
  monthlySpending: 32500,
  savingsProgressPercent: 52
};
const SEED_CATEGORY_BREAKDOWN = [
  { category: "Housing", total: 18e3 },
  { category: "Food & Dining", total: 7200 },
  { category: "Healthcare", total: 3500 },
  { category: "Entertainment", total: 2800 },
  { category: "Transportation", total: 4100 },
  { category: "Shopping", total: 5200 }
];
const SEED_DAILY_SPENDING = [
  { dayLabel: "Mon", date: Date.now() - 864e5 * 6, total: 1200 },
  { dayLabel: "Tue", date: Date.now() - 864e5 * 5, total: 4800 },
  { dayLabel: "Wed", date: Date.now() - 864e5 * 4, total: 18500 },
  { dayLabel: "Thu", date: Date.now() - 864e5 * 3, total: 3200 },
  { dayLabel: "Fri", date: Date.now() - 864e5 * 2, total: 2900 },
  { dayLabel: "Sat", date: Date.now() - 864e5 * 1, total: 9800 },
  { dayLabel: "Sun", date: Date.now(), total: 6100 }
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
