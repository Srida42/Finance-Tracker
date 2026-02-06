import PropTypes from "prop-types";
import "./ExpenseList.css";

function ExpenseList({ expenses, onExpenseUpdated, onExpenseDeleted }) {
  const handleUpdate = (expense) => {
    const updatedDescription = prompt(
      "Enter new description:",
      expense.description
    );
    const updatedAmount = parseFloat(
      prompt("Enter new amount:", expense.amount)
    );
    const updatedDate = prompt("Enter new date (YYYY-MM-DD):", expense.date);
    const updatedCategory = prompt("Enter new category:", expense.category || "Other");

    if (updatedDescription && updatedAmount && updatedDate) {
      onExpenseUpdated(expense.id, {
        ...expense,
        description: updatedDescription,
        amount: updatedAmount,
        date: updatedDate,
        category: updatedCategory,
      });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      onExpenseDeleted(id);
    }
  };

  const getCategoryEmoji = (category) => {
    const emojis = {
      "Food": "🍔",
      "Shopping": "🛍️",
      "Health & Fitness": "💪",
      "Transport": "🚗",
      "Education": "📚",
      "Entertainment": "🎮",
      "Other": "📦"
    };
    return emojis[category] || "📦";
  };

  if (expenses.length === 0) {
    return (
      <div className="expense-list-container">
        <h2>Recent Expenses</h2>
        <div className="empty-state">
          <div className="empty-state-icon">💸</div>
          <div className="empty-state-title">No expenses yet</div>
          <div className="empty-state-message">
            Start tracking your expenses by adding your first one above
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="expense-list-container">
      <h2>Recent Expenses</h2>
      <div className="expense-list">
        {expenses.map((expense) => (
          <div key={expense.id} className="expense-card">
            <div className="expense-card-header">
              <div className="expense-info">
                <div className="expense-category" data-category={expense.category || "Other"}>
                  <span>{getCategoryEmoji(expense.category || "Other")}</span>
                  <span>{expense.category || "Other"}</span>
                </div>
                <div className="expense-description">{expense.description}</div>
                <div className="expense-date">
                  {new Date(expense.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </div>
              </div>
              <div className="expense-amount">
                ₹{expense.amount.toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </div>
            </div>
            <div className="expense-actions">
              <button 
                className="expense-btn expense-btn-edit" 
                onClick={() => handleUpdate(expense)}
              >
                <span>✏️</span>
                <span>Edit</span>
              </button>
              <button 
                className="expense-btn expense-btn-delete" 
                onClick={() => handleDelete(expense.id)}
              >
                <span>🗑️</span>
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

ExpenseList.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string,
    })
  ).isRequired,
  onExpenseUpdated: PropTypes.func.isRequired,
  onExpenseDeleted: PropTypes.func.isRequired,
};

export default ExpenseList;