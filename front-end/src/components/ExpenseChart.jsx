import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "./ExpenseChart.css";
import { useTheme } from "../context/ThemeContext";

function ExpenseChart({ expenses }) {
  const { theme } = useTheme();
  
  // Handle case with no expenses
  if (expenses.length === 0) {
    return (
      <div className="no-data-message">
        <p>No expenses to display. Add some expenses to see the chart!</p>
      </div>
    );
  }

  // Sort expenses by date in ascending order (oldest to newest)
  const sortedExpenses = [...expenses].sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  // Extract dates and amounts from SORTED expenses
  const dates = sortedExpenses.map((expense) =>
    new Date(expense.date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  );
  const amounts = sortedExpenses.map((expense) => expense.amount);

  // Theme-based colors - FIXED FOR LIGHT MODE
  const isDark = theme === 'dark';
  
  // Background colors for chart container
  const backgroundColor = isDark 
    ? 'rgba(99, 102, 241, 0.2)' 
    : 'rgba(102, 126, 234, 0.15)';
  
  const borderColor = isDark 
    ? '#818cf8' 
    : '#667eea';
    
  const pointColor = isDark 
    ? '#a855f7' 
    : '#764ba2';
    
  const gridColor = isDark 
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(0, 0, 0, 0.08)';
    
  const textColor = isDark 
    ? '#f1f5f9' 
    : '#2d3748';
    
  const tooltipBg = isDark 
    ? '#1e293b' 
    : '#ffffff';
    
  const tooltipBorder = isDark 
    ? '#818cf8' 
    : '#667eea';

  // Define chart data with better styling
  const data = {
    labels: dates,
    datasets: [
      {
        label: "Expenses Over Time",
        data: amounts,
        fill: true,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 3,
        pointBackgroundColor: pointColor,
        pointBorderColor: isDark ? '#ffffff' : '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.3,
      },
    ],
  };

  // Chart options with better sizing and theme support
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: textColor,
          font: {
            size: 15, 
            weight: 'bold',
            family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          },
          padding: 10,
          usePointStyle: true,
          pointStyle: 'circle',
        }
      },
      tooltip: {
        backgroundColor: tooltipBg,
        titleColor: textColor,
        bodyColor: textColor,
        borderColor: tooltipBorder,
        borderWidth: 6,
        cornerRadius: 8,
        padding: 12,
        titleFont: {
          family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          size: 14, 
          weight: 'bold'
        },
        bodyFont: {
          family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          size: 14
        },
        callbacks: {
          label: function(context) {
            return `₹${context.parsed.y.toLocaleString('en-IN')}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: gridColor,
          drawBorder: false,
        },
        ticks: {
          color: textColor,
          font: {
            size: 13, 
            family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          },
          padding: 10,
          callback: function(value) {
            return '₹' + value.toLocaleString('en-IN');
          }
        },
        title: {
          display: true,
          text: "Amount (₹)",
          color: textColor,
          font: {
            size: 16, 
            weight: 'bold',
            family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          },
          padding: { top: 10, bottom: 20 }
        },
      },
      x: {
        grid: {
          color: gridColor,
          drawBorder: false,
        },
        ticks: {
          color: textColor,
          font: {
            size: 12, 
            family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          },
          maxRotation: 45,
          padding: 10,
        },
        title: {
          display: true,
          text: "Date",
          color: textColor,
          font: {
            size: 16, 
            weight: 'bold',
            family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          },
          padding: { top: 20, bottom: 10 }
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart'
    },
    elements: {
      line: {
        tension: 0.3
      }
    }
  };

  return (
  <div className="chart-wrapper">
    <div style={{ 
      width: '100%', 
      height: '480px',
      position: 'relative'
    }}>
      <Line data={data} options={options} />
    </div>
  </div>
  );
}

ExpenseChart.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ExpenseChart;