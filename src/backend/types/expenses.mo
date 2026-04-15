import Common "common";

module {
  public type ExpenseId = Common.ExpenseId;
  public type Timestamp = Common.Timestamp;

  // Stored internally — mutable id is auto-assigned
  public type Expense = {
    id : ExpenseId;
    amount : Float;
    category : Text;
    note : Text;
    date : Timestamp;
  };

  // Request payload for adding an expense
  public type AddExpenseRequest = {
    amount : Float;
    category : Text;
    note : Text;
    date : Timestamp;
  };
};
