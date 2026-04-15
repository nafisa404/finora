import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Types "../types/expenses";

module {
  public type Expense = Types.Expense;
  public type AddExpenseRequest = Types.AddExpenseRequest;
  public type ExpenseId = Types.ExpenseId;

  /// Add a new expense to the list; returns the assigned id.
  public func add(
    expenses : List.List<Expense>,
    nextId : Nat,
    req : AddExpenseRequest,
  ) : Nat {
    Runtime.trap("not implemented");
  };

  /// Return all expenses sorted by date descending.
  public func listSortedByDate(expenses : List.List<Expense>) : [Expense] {
    Runtime.trap("not implemented");
  };

  /// Delete an expense by id; returns true if found and removed.
  public func deleteById(expenses : List.List<Expense>, id : ExpenseId) : Bool {
    Runtime.trap("not implemented");
  };

  /// Sum of all expense amounts.
  public func totalSpent(expenses : List.List<Expense>) : Float {
    Runtime.trap("not implemented");
  };

  /// Sum of expenses whose date falls within [fromNs, toNs).
  public func totalInRange(
    expenses : List.List<Expense>,
    fromNs : Int,
    toNs : Int,
  ) : Float {
    Runtime.trap("not implemented");
  };

  /// Expenses whose date falls within [fromNs, toNs).
  public func inRange(
    expenses : List.List<Expense>,
    fromNs : Int,
    toNs : Int,
  ) : [Expense] {
    Runtime.trap("not implemented");
  };

  /// Average expense amount across all expenses; returns 0.0 if empty.
  public func averageAmount(expenses : List.List<Expense>) : Float {
    Runtime.trap("not implemented");
  };
};
