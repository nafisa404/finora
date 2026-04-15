import List "mo:core/List";
import Runtime "mo:core/Runtime";
import ExpenseTypes "../types/expenses";
import StatsTypes "../types/stats";

module {
  public type Expense = ExpenseTypes.Expense;
  public type CategoryBreakdown = StatsTypes.CategoryBreakdown;
  public type DailySpending = StatsTypes.DailySpending;
  public type AnomalyReport = StatsTypes.AnomalyReport;
  public type DashboardStats = StatsTypes.DashboardStats;

  let MOCK_STARTING_BALANCE : Float = 10_000.0;
  let MOCK_SAVINGS_GOAL : Float = 2_000.0;

  /// Compute dashboard stats: total balance, monthly spending, savings progress.
  public func dashboardStats(
    expenses : List.List<Expense>,
    nowNs : Int,
  ) : DashboardStats {
    Runtime.trap("not implemented");
  };

  /// Group expenses by category for the month containing nowNs.
  public func categoryBreakdownForMonth(
    expenses : List.List<Expense>,
    nowNs : Int,
  ) : [CategoryBreakdown] {
    Runtime.trap("not implemented");
  };

  /// Daily spending totals for the last 7 days relative to nowNs.
  public func dailySpendingLast7Days(
    expenses : List.List<Expense>,
    nowNs : Int,
  ) : [DailySpending] {
    Runtime.trap("not implemented");
  };

  /// Build full anomaly report.
  public func anomalyReport(
    expenses : List.List<Expense>,
    nowNs : Int,
  ) : AnomalyReport {
    Runtime.trap("not implemented");
  };
};
