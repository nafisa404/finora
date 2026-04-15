import type { backendInterface } from "../backend";

const now = BigInt(Date.now()) * BigInt(1_000_000);
const oneDay = BigInt(24 * 60 * 60 * 1_000_000_000);

export const mockBackend: backendInterface = {
  addExpense: async (_req) => BigInt(10),

  deleteExpense: async (_id) => true,

  listExpenses: async () => [
    {
      id: BigInt(1),
      date: now - oneDay * BigInt(1),
      note: "Dinner with friends",
      category: "Food",
      amount: 85.5,
    },
    {
      id: BigInt(2),
      date: now - oneDay * BigInt(2),
      note: "Monthly gym membership",
      category: "Health",
      amount: 45.0,
    },
    {
      id: BigInt(3),
      date: now - oneDay * BigInt(2),
      note: "Grocery shopping",
      category: "Food",
      amount: 120.0,
    },
    {
      id: BigInt(4),
      date: now - oneDay * BigInt(3),
      note: "Netflix subscription",
      category: "Entertainment",
      amount: 15.99,
    },
    {
      id: BigInt(5),
      date: now - oneDay * BigInt(4),
      note: "Uber ride",
      category: "Transport",
      amount: 22.0,
    },
    {
      id: BigInt(6),
      date: now - oneDay * BigInt(5),
      note: "Fancy restaurant — birthday",
      category: "Food",
      amount: 320.0,
    },
  ],

  getDashboardStats: async () => ({
    totalBalance: 12480.55,
    monthlySpending: 1842.3,
    savingsProgressPercent: 62,
  }),

  getCategoryBreakdown: async () => [
    { category: "Food", total: 525.5 },
    { category: "Housing", total: 1200.0 },
    { category: "Transport", total: 180.0 },
    { category: "Health", total: 95.0 },
    { category: "Entertainment", total: 65.0 },
    { category: "Other", total: 110.0 },
  ],

  getDailySpending: async () => [
    { date: now - oneDay * BigInt(6), dayLabel: "Mon", total: 45.0 },
    { date: now - oneDay * BigInt(5), dayLabel: "Tue", total: 320.0 },
    { date: now - oneDay * BigInt(4), dayLabel: "Wed", total: 22.0 },
    { date: now - oneDay * BigInt(3), dayLabel: "Thu", total: 135.99 },
    { date: now - oneDay * BigInt(2), dayLabel: "Fri", total: 165.0 },
    { date: now - oneDay * BigInt(1), dayLabel: "Sat", total: 85.5 },
    { date: now, dayLabel: "Sun", total: 0 },
  ],

  getAnomalyReport: async () => ({
    averageExpense: 98.0,
    expenseAnomalies: [
      {
        expenseId: BigInt(6),
        date: now - oneDay * BigInt(5),
        category: "Food",
        amount: 320.0,
        isHighAmount: true,
      },
    ],
    categoryComparisons: [
      {
        category: "Food",
        currentMonthTotal: 525.5,
        priorMonthTotal: 390.0,
        percentChange: 34.7,
      },
      {
        category: "Entertainment",
        currentMonthTotal: 65.0,
        priorMonthTotal: 48.0,
        percentChange: 35.4,
      },
    ],
    dailySpending: [
      { date: now - oneDay * BigInt(6), dayLabel: "Mon", total: 45.0 },
      { date: now - oneDay * BigInt(5), dayLabel: "Tue", total: 320.0 },
      { date: now - oneDay * BigInt(4), dayLabel: "Wed", total: 22.0 },
      { date: now - oneDay * BigInt(3), dayLabel: "Thu", total: 135.99 },
      { date: now - oneDay * BigInt(2), dayLabel: "Fri", total: 165.0 },
      { date: now - oneDay * BigInt(1), dayLabel: "Sat", total: 85.5 },
      { date: now, dayLabel: "Sun", total: 0 },
    ],
  }),
};
