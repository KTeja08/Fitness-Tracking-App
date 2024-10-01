
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 3, 5, 2, 3, 7],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      title: {
        display: true,
        text: 'Monthly Sales Data'
      }
    },
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      <h2>Bar Chart</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
