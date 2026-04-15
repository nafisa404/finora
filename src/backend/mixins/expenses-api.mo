import List "mo:core/List";
import Runtime "mo:core/Runtime";
import ExpenseTypes "../types/expenses";

// nextExpenseIdBox is a single-element List<Nat> used as a mutable counter reference.
mixin (
  expenses : List.List<ExpenseTypes.Expense>,
  nextExpenseIdBox : List.List<Nat>,
) {

  /// Add a new expense. Returns the id of the created expense.
  public func addExpense(req : ExpenseTypes.AddExpenseRequest) : async Nat {
    Runtime.trap("not implemented");
  };

  /// List all expenses sorted by date descending.
  public query func listExpenses() : async [ExpenseTypes.Expense] {
    Runtime.trap("not implemented");
  };

  /// Delete an expense by id. Returns true if found and deleted.
  public func deleteExpense(id : ExpenseTypes.ExpenseId) : async Bool {
    Runtime.trap("not implemented");
  };
};
