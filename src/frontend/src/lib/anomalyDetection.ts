import type { Alert, CategoryComparison, Expense } from "@/types";

const DAILY_SPEND_LIMIT = 200;

export function detectHighAmountAnomaly(
  expense: Expense,
  averageExpense: number,
): Alert | null {
  if (averageExpense <= 0) return null;
  if (expense.amount > averageExpense * 2) {
    return {
      id: `anomaly-high-${expense.id}`,
      type: "anomaly",
      severity: "critical",
      title: "Unusual High Expense Detected",
      message: `$${expense.amount.toFixed(2)} in ${expense.category} is more than 2× your average ($${averageExpense.toFixed(2)})`,
      timestamp: expense.date,
    };
  }
  return null;
}

export function detectCategorySpike(
  comparison: CategoryComparison,
): Alert | null {
  if (comparison.priorMonthTotal <= 0) return null;
  if (comparison.percentChange > 30) {
    return {
      id: `category-spike-${comparison.category.replace(/\s+/g, "-").toLowerCase()}`,
      type: "category_spike",
      severity: "warning",
      title: `${comparison.category} Spending Increased`,
      message: `Your ${comparison.category} spending increased by ${comparison.percentChange.toFixed(0)}% compared to last month`,
      timestamp: Date.now(),
    };
  }
  return null;
}

export function detectDailyOverspend(
  dailyTotal: number,
  dayLabel: string,
): Alert | null {
  if (dailyTotal > DAILY_SPEND_LIMIT) {
    return {
      id: `daily-overspend-${dayLabel}`,
      type: "daily_overspend",
      severity: "warning",
      title: "You Are Overspending Today",
      message: `Daily spending of $${dailyTotal.toFixed(2)} exceeds the $${DAILY_SPEND_LIMIT} limit`,
      timestamp: Date.now(),
    };
  }
  return null;
}

export function generateAlertsFromReport(
  expenses: Expense[],
  averageExpense: number,
  categoryComparisons: CategoryComparison[],
  dailySpending: { dayLabel: string; total: number }[],
): Alert[] {
  const alerts: Alert[] = [];

  for (const expense of expenses) {
    const alert = detectHighAmountAnomaly(expense, averageExpense);
    if (alert) alerts.push(alert);
  }

  for (const comparison of categoryComparisons) {
    const alert = detectCategorySpike(comparison);
    if (alert) alerts.push(alert);
  }

  const today = dailySpending[dailySpending.length - 1];
  if (today) {
    const alert = detectDailyOverspend(today.total, today.dayLabel);
    if (alert) alerts.push(alert);
  }

  return alerts;
}
