import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "./ExpenseChart.css";

function ExpenseChart({ expenses }) {
  if (expenses.length === 0) {
    return (
      <div className="chart-container">
        <h2>Expense Trends</h2>
        <div className="no-data-message">
          <div className="no-data-icon">📊</div>
          <div className="no-data-title">No data to visualize</div>
          <div className="no-data-text">
            Add some expenses to see your spending trends
          </div>
        </div>
      </div>
    );
  }

  const sortedExpenses = [...expenses].sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  const dates = sortedExpenses.map((expense) =>
    new Date(expense.date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  );
  const amounts = sortedExpenses.map((expense) => expense.amount);

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Spending Over Time",
        data: amounts,
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(102, 126, 234, 0.3)');
          gradient.addColorStop(1, 'rgba(102, 126, 234, 0.0)');
          return gradient;
        },
        borderColor: '#667eea',
        borderWidth: 3,
        pointBackgroundColor: '#667eea',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: '#764ba2',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 3,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(19, 19, 24, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#a0a0b0',
        borderColor: 'rgba(102, 126, 234, 0.5)',
        borderWidth: 1,
        cornerRadius: 12,
        padding: 16,
        displayColors: false,
        titleFont: {
          family: "'Outfit', sans-serif",
          size: 14,
          weight: '600'
        },
        bodyFont: {
          family: "'Space Mono', monospace",
          size: 16,
          weight: '700'
        },
        callbacks: {
          label: function(context) {
            return `₹${context.parsed.y.toLocaleString('en-IN', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        border: {
          display: false
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.06)',
          drawBorder: false,
        },
        ticks: {
          color: '#a0a0b0',
          font: {
            size: 12,
            family: "'Outfit', sans-serif"
          },
          padding: 12,
          callback: function(value) {
            return '₹' + value.toLocaleString('en-IN');
          }
        },
      },
      x: {
        border: {
          display: false
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.06)',
          drawBorder: false,
        },
        ticks: {
          color: '#a0a0b0',
          font: {
            size: 11,
            family: "'Outfit', sans-serif"
          },
          maxRotation: 45,
          padding: 12,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    animation: {
      duration: 1200,
      easing: 'easeInOutQuart'
    },
    elements: {
      line: {
        tension: 0.4
      }
    }
  };

  return (
    <div className="chart-container">
      <h2>Expense Trends</h2>
      <div className="chart-wrapper">
        <div className="chart-canvas">
          <Line data={data} options={options} />
        </div>
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