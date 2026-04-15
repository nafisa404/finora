export interface Expense {
  id: number;
  amount: number;
  category: string;
  note: string;
  date: number; // Unix timestamp ms
}

export interface AddExpenseRequest {
  amount: number;
  category: string;
  note: string;
  date: number;
}

export interface DashboardStats {
  totalBalance: number;
  monthlySpending: number;
  savingsProgressPercent: number;
}

export interface CategoryBreakdown {
  category: string;
  total: number;
}

export interface DailySpending {
  dayLabel: string;
  date: number;
  total: number;
}

export interface ExpenseAnomaly {
  expenseId: number;
  amount: number;
  category: string;
  date: number;
  isHighAmount: boolean;
}

export interface CategoryComparison {
  category: string;
  currentMonthTotal: number;
  priorMonthTotal: number;
  percentChange: number;
}

export interface AnomalyReport {
  averageExpense: number;
  expenseAnomalies: ExpenseAnomaly[];
  categoryComparisons: CategoryComparison[];
  dailySpending: DailySpending[];
}

export interface Alert {
  id: string;
  type: "anomaly" | "category_spike" | "daily_overspend";
  severity: "warning" | "critical";
  title: string;
  message: string;
  timestamp: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export type ExpenseCategory =
  | "Food & Dining"
  | "Transportation"
  | "Shopping"
  | "Entertainment"
  | "Healthcare"
  | "Housing"
  | "Utilities"
  | "Travel"
  | "Other";

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Healthcare",
  "Housing",
  "Utilities",
  "Travel",
  "Other",
];
