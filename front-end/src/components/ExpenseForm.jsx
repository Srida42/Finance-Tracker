import { useState } from "react";
import PropTypes from "prop-types";

function ExpenseForm({ onAddExpense }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Food");
  const [type, setType] = useState("Debit");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (description && amount && date) {
      const newExpense = { 
        description, 
        amount: parseFloat(amount), 
        date,
        category,
        type 
      };
      await onAddExpense(newExpense);
      setDescription("");
      setAmount("");
      setDate("");
      setCategory("Food");
      setType("Debit");
    }
  };

  return (
    <div className="expense-form-container">
      <h2>Add New Expense</h2>
      <form className="expense-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What did you spend on?"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            required
            step="0.01"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="Food">🍔 Food</option>
            <option value="Shopping">🛍️ Shopping</option>
            <option value="Health & Fitness">💪 Health & Fitness</option>
            <option value="Transport">🚗 Transport</option>
            <option value="Education">📚 Education</option>
            <option value="Entertainment">🎮 Entertainment</option>
            <option value="Other">📦 Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="Debit">Debit</option>
            <option value="Credit">Credit</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="btn">Add Expense</button>
      </form>
    </div>
  );
}

ExpenseForm.propTypes = {
  onAddExpense: PropTypes.func.isRequired,
};

export default ExpenseForm;