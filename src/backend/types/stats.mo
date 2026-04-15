module {
  // Category name → total spent
  public type CategoryBreakdown = {
    category : Text;
    total : Float;
  };

  // Day label (e.g. "Mon") → total spent for that day
  public type DailySpending = {
    dayLabel : Text;   // ISO date string "YYYY-MM-DD"
    date : Int;        // timestamp (start of day, nanoseconds)
    total : Float;
  };

  public type DashboardStats = {
    totalBalance : Float;
    monthlySpending : Float;
    savingsProgressPercent : Float;
  };

  // Anomaly detection result per expense
  public type ExpenseAnomaly = {
    expenseId : Nat;
    amount : Float;
    category : Text;
    date : Int;
    isHighAmount : Bool; // amount > 2x average
  };

  // Category spending comparison (current vs prior month)
  public type CategoryComparison = {
    category : Text;
    currentMonthTotal : Float;
    priorMonthTotal : Float;
    percentChange : Float; // positive = increase
  };

  public type AnomalyReport = {
    averageExpense : Float;
    expenseAnomalies : [ExpenseAnomaly];
    categoryComparisons : [CategoryComparison];
    dailySpending : [DailySpending]; // last 7 days
  };
};
