import { useExpenses } from "@/hooks/useExpenses";
import { generateAlertsFromReport } from "@/lib/anomalyDetection";
import { useFinanceStore } from "@/store/useFinanceStore";
import type { AnomalyReport } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const SEED_REPORT: AnomalyReport = {
  averageExpense: 88.5,
  expenseAnomalies: [
    {
      expenseId: 4,
      amount: 280,
      category: "Food & Dining",
      date: Date.now() - 86400000 * 4,
      isHighAmount: true,
    },
    {
      expenseId: 8,
      amount: 1200,
      category: "Housing",
      date: Date.now() - 86400000 * 8,
      isHighAmount: true,
    },
  ],
  categoryComparisons: [
    {
      category: "Food & Dining",
      currentMonthTotal: 454,
      priorMonthTotal: 280,
      percentChange: 62,
    },
    {
      category: "Entertainment",
      currentMonthTotal: 55,
      priorMonthTotal: 45,
      percentChange: 22,
    },
    {
      category: "Transportation",
      currentMonthTotal: 48.5,
      priorMonthTotal: 60,
      percentChange: -19,
    },
  ],
  dailySpending: [
    { dayLabel: "Mon", date: Date.now() - 86400000 * 6, total: 18.5 },
    { dayLabel: "Tue", date: Date.now() - 86400000 * 5, total: 55 },
    { dayLabel: "Wed", date: Date.now() - 86400000 * 4, total: 280 },
    { dayLabel: "Thu", date: Date.now() - 86400000 * 3, total: 35 },
    { dayLabel: "Fri", date: Date.now() - 86400000 * 2, total: 30 },
    { dayLabel: "Sat", date: Date.now() - 86400000 * 1, total: 124 },
    { dayLabel: "Sun", date: Date.now(), total: 92 },
  ],
};

export function useAnomalyReport() {
  const { data: expenses = [] } = useExpenses();
  const setAlerts = useFinanceStore((s) => s.setAlerts);

  const query = useQuery<AnomalyReport>({
    queryKey: ["anomalyReport"],
    queryFn: async () => SEED_REPORT,
    staleTime: Number.POSITIVE_INFINITY,
  });

  useEffect(() => {
    if (query.data && expenses.length > 0) {
      const alerts = generateAlertsFromReport(
        expenses,
        query.data.averageExpense,
        query.data.categoryComparisons,
        query.data.dailySpending,
      );
      setAlerts(alerts);
    }
  }, [query.data, expenses, setAlerts]);

  return query;
}
