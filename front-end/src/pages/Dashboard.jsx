import { useState, useEffect } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseChart from "../components/ExpenseChart";
import ThemeToggle from "../components/ThemeToggle";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  // Load expenses from localStorage on mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses");
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = async (newExpense) => {
    const expense = {
      ...newExpense,
      id: Date.now(),
    };
    setExpenses([...expenses, expense]);
  };

  const handleExpenseUpdated = (id, updatedExpense) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === id ? updatedExpense : expense
      )
    );
  };

  const handleExpenseDeleted = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  // Calculate total
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <>
      <ThemeToggle />
      <div className="dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Expense Tracker</h1>
          <p className="dashboard-subtitle">
            Take control of your finances · Total spent: ₹{totalExpenses.toLocaleString('en-IN', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </p>
        </div>

        <div className="dashboard-grid">
          <div className="card card-form">
            <ExpenseForm onAddExpense={handleAddExpense} />
          </div>

          <div className="card card-chart">
            <ExpenseChart expenses={expenses} />
          </div>

          <div className="card card-list">
            <ExpenseList
              expenses={expenses}
              onExpenseUpdated={handleExpenseUpdated}
              onExpenseDeleted={handleExpenseDeleted}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;