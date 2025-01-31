import React from "react";
import { Pie, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

const DashboardCharts = ({ expenses }) => {
  const groupByCategory = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount;
    return acc;
  }, {});

  const categoryLabels = Object.keys(groupByCategory);
  const categoryData = Object.values(groupByCategory);

  const groupByPaymentType = expenses.reduce((acc, expense) => {
    if (!acc[expense.paymentType]) {
      acc[expense.paymentType] = 0;
    }
    acc[expense.paymentType] += expense.amount;
    return acc;
  }, {});

  const paymentTypeLabels = Object.keys(groupByPaymentType);
  const paymentTypeData = Object.values(groupByPaymentType);

  return (
    <div className="graph-container">
      <div className="flex">
        <div>
          <h5>Expenses By Category</h5>
          <div className="pie">
            <Pie
              data={{
                labels: categoryLabels,
                datasets: [
                  {
                    data: categoryData,
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                  },
                ],
              }}
              width={200}
              height={100}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "right",
                    labels: {
                      boxWidth: 10,
                      padding: 5,
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        <div>
          <h5>Expenses By Payment Type</h5>
          <div className="doughnut">
            <Doughnut
              data={{
                labels: paymentTypeLabels,
                datasets: [
                  {
                    data: paymentTypeData,
                    backgroundColor: [
                      "#FF6384",
                      "#36A2EB",
                      "#FFCE56",
                      "#4BC0C0",
                    ],
                  },
                ],
              }}
              width={200}
              height={100}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "right",
                    labels: {
                      boxWidth: 10,
                      padding: 10,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
