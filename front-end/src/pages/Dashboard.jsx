/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { getExpenses, addExpense, updateExpense, deleteExpense } from "../services/api";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseChart from "../components/ExpenseChart";
import ThemeToggle from "../components/ThemeToggle"; // ADD THIS IMPORT
import "./Dashboard.css";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState(null);

  // Function to get the current month expenses
  const getCurrentMonthExpenses = (expenses) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );
    });
  };

  // Fetch expenses from the API and handle them
  const fetchExpenses = async () => {
    try {
      const data = await getExpenses(startDate, endDate);
      if (data.length === 0) {
        setError("No data available.");
      } else {
        setError(null);
      }
      const sortedExpenses = data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setExpenses(sortedExpenses);

      // Default to showing current month's expenses if no filter is applied
      if (!startDate && !endDate) {
        setFilteredExpenses(getCurrentMonthExpenses(sortedExpenses));
      } else {
        const filtered = sortedExpenses.filter((expense) => {
          const expenseDate = new Date(expense.date);
          return (
            (!startDate || new Date(expense.date) >= new Date(startDate)) &&
            (!endDate || new Date(expense.date) <= new Date(endDate))
          );
        });
        setFilteredExpenses(filtered);
      }
    } catch (error) {
      setError("Failed to fetch expenses.");
      console.error("Failed to fetch expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [startDate, endDate]);

  const handleAddExpense = async (expense) => {
    try {
      const newExpense = await addExpense(expense);
      const updatedExpenses = [...expenses, newExpense];
      setExpenses(updatedExpenses);

      // Update filtered expenses
      if (!startDate && !endDate) {
        setFilteredExpenses(getCurrentMonthExpenses(updatedExpenses));
      } else {
        setFilteredExpenses(
          updatedExpenses.filter((expense) => {
            const expenseDate = new Date(expense.date);
            return (
              (!startDate || new Date(expense.date) >= new Date(startDate)) &&
              (!endDate || new Date(expense.date) <= new Date(endDate))
            );
          })
        );
      }
    } catch (error) {
      console.error("Failed to add expense:", error);
    }
  };

  const handleUpdateExpense = async (id, updatedData) => {
    try {
      await updateExpense(id, updatedData);  // Call update API
      fetchExpenses();                       // Refresh the list
    } catch (error) {
      console.error("Failed to update expense:", error);
    }
  };

  const handleDeleteExpense = async (id) => {
    console.log("1. Delete button clicked, ID:", id); 
    try {
      console.log("2. Calling deleteExpense API with ID:", id); 
      await deleteExpense(id);
      console.log("3. API call completed, now fetching..."); 
      fetchExpenses();
      console.log("4. All done!"); 
    } catch (error) {
      console.error("ERROR in handleDeleteExpense:", error); 
    }
  };

  const handleFilter = () => {
    fetchExpenses();
  };

  return (
    <div className="dashboard">
      {/* ADD THE THEME TOGGLE HERE */}
      <ThemeToggle />
      
      <div className="main-content">
        <header>
          <h1>Personal Finance Tracker</h1>
        </header>

        {/* WRAP EXPENSE FORM IN CONTAINER */}
        <div className="expense-form-container">
          <ExpenseForm onAddExpense={handleAddExpense} />
        </div>

        {/* UPDATE FILTER SECTION WITH PROPER STYLING */}
        <div className="filter-section">
          <h2>Filter Expenses</h2>
          <div className="filter-inputs">
            <label>
              Start Date:
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label>
              End Date:
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
            <button onClick={handleFilter}>Apply Filter</button>
          </div>
        </div>

        {/* ERROR MESSAGE */}
        {error && <div className="text-red-500">{error}</div>}

        {/* EXPENSE LIST */}
        <ExpenseList
          expenses={filteredExpenses}
          onExpenseUpdated={handleUpdateExpense}     
          onExpenseDeleted={handleDeleteExpense}     
        />
      </div>

      {/* CHART CONTAINER */}
      <div className="chart-sidebar">
        <ExpenseChart expenses={filteredExpenses} />
      </div>
    </div>
  );
}

export default Dashboard;