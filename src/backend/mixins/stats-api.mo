import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import ExpenseTypes "../types/expenses";
import StatsTypes "../types/stats";

mixin (expenses : List.List<ExpenseTypes.Expense>) {

  /// Dashboard summary stats.
  public query func getDashboardStats() : async StatsTypes.DashboardStats {
    Runtime.trap("not implemented");
  };

  /// Expenses grouped by category for the current month.
  public query func getCategoryBreakdown() : async [StatsTypes.CategoryBreakdown] {
    Runtime.trap("not implemented");
  };

  /// Daily spending totals for the last 7 days.
  public query func getDailySpending() : async [StatsTypes.DailySpending] {
    Runtime.trap("not implemented");
  };

  /// Full anomaly detection report.
  public query func getAnomalyReport() : async StatsTypes.AnomalyReport {
    Runtime.trap("not implemented");
  };
};
