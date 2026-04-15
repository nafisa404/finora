import List "mo:core/List";
import ExpenseTypes "types/expenses";
import ExpensesApi "mixins/expenses-api";
import StatsApi "mixins/stats-api";

actor {
  let expenses = List.empty<ExpenseTypes.Expense>();
  // Single-element list used as a mutable counter box for expense IDs.
  let nextExpenseIdBox = List.singleton<Nat>(0);

  include ExpensesApi(expenses, nextExpenseIdBox);
  include StatsApi(expenses);
};
