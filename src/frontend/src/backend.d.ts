import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CategoryComparison {
    priorMonthTotal: number;
    category: string;
    percentChange: number;
    currentMonthTotal: number;
}
export interface CategoryBreakdown {
    total: number;
    category: string;
}
export type Timestamp = bigint;
export interface AddExpenseRequest {
    date: Timestamp;
    note: string;
    category: string;
    amount: number;
}
export interface AnomalyReport {
    categoryComparisons: Array<CategoryComparison>;
    averageExpense: number;
    dailySpending: Array<DailySpending>;
    expenseAnomalies: Array<ExpenseAnomaly>;
}
export type ExpenseId = bigint;
export interface ExpenseAnomaly {
    expenseId: bigint;
    date: bigint;
    isHighAmount: boolean;
    category: string;
    amount: number;
}
export interface Expense {
    id: ExpenseId;
    date: Timestamp;
    note: string;
    category: string;
    amount: number;
}
export interface DashboardStats {
    monthlySpending: number;
    savingsProgressPercent: number;
    totalBalance: number;
}
export interface DailySpending {
    total: number;
    date: bigint;
    dayLabel: string;
}
export interface backendInterface {
    addExpense(req: AddExpenseRequest): Promise<bigint>;
    deleteExpense(id: ExpenseId): Promise<boolean>;
    getAnomalyReport(): Promise<AnomalyReport>;
    getCategoryBreakdown(): Promise<Array<CategoryBreakdown>>;
    getDailySpending(): Promise<Array<DailySpending>>;
    getDashboardStats(): Promise<DashboardStats>;
    listExpenses(): Promise<Array<Expense>>;
}
