import React, { useRef, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { ResizableBox } from 'react-resizable';
import 'chart.js/auto';
import screenfull from 'screenfull';


const Dashboard = () => {
  const [lineData, setLineData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales 1',
        data: [50, 100, 150, 100, 50, 150],
        borderColor: 'red',
        fill: true,
      },
      {
        label: 'Sales 2',
        data: [70, 120, 130, 90, 60, 100],
        borderColor: 'blue',
        fill: true,
      },
    ],
  });

  const [barData, setBarData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Product Sales',
        data: [100, 150, 130, 140, 120, 90],
        backgroundColor: 'blue',
      },
    ],
  });

  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);

  const toggleFullScreen = (ref) => {
    if (screenfull.isEnabled) {
      screenfull.toggle(ref.current);
    }
  };

  const lineChartOptions = {
    plugins: {
      tooltip: {
        enabled: true,
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'xy',
        },
      },
    },
  };

  const barChartOptions = {
    plugins: {
      tooltip: {
        enabled: true,
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'xy',
        },
      },
    },
  };

  const filterData = (month) => {
    const newLineData = {
      ...lineData,
      labels: lineData.labels.filter((label) => label === month),
      datasets: lineData.datasets.map((dataset) => ({
        ...dataset,
        data: dataset.data.filter((_, index) => lineData.labels[index] === month),
      })),
    };

    const newBarData = {
      ...barData,
      labels: barData.labels.filter((label) => label === month),
      datasets: barData.datasets.map((dataset) => ({
        ...dataset,
        data: dataset.data.filter((_, index) => barData.labels[index] === month),
      })),
    };

    setLineData(newLineData);
    setBarData(newBarData);
  };

  const resetFilter = () => {
    setLineData({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Sales 1',
          data: [50, 100, 150, 100, 50, 150],
          borderColor: 'red',
          fill: true,
        },
        {
          label: 'Sales 2',
          data: [70, 120, 130, 90, 60, 100],
          borderColor: 'blue',
          fill: true,
        },
      ],
    });

    setBarData({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Product Sales',
          data: [100, 150, 130, 140, 120, 90],
          backgroundColor: 'blue',
        },
      ],
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-800 p-4 text-white flex justify-between items-center">
        <div className="text-xl font-bold">Dashboard</div>
        <div>
          <a href="#overview" className="mx-2">Overview</a>
          <a href="#analytics" className="mx-2">Analytics</a>
          <a href="#settings" className="mx-2">Settings</a>
              </div>
              
      </nav>
      <div className='p-8'>
      <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Invoice</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Method</th>
                <th className="py-2 px-4 border-b">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">INV001</td>
                <td className="py-2 px-4 border-b">Paid</td>
                <td className="py-2 px-4 border-b">Credit Card</td>
                <td className="py-2 px-4 border-b">$250.00</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">INV002</td>
                <td className="py-2 px-4 border-b">Pending</td>
                <td className="py-2 px-4 border-b">PayPal</td>
                <td className="py-2 px-4 border-b">$150.00</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">INV003</td>
                <td className="py-2 px-4 border-b">Unpaid</td>
                <td className="py-2 px-4 border-b">Bank Transfer</td>
                <td className="py-2 px-4 border-b">$350.00</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">INV004</td>
                <td className="py-2 px-4 border-b">Paid</td>
                <td className="py-2 px-4 border-b">Credit Card</td>
                <td className="py-2 px-4 border-b">$450.00</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">INV005</td>
                <td className="py-2 px-4 border-b">Paid</td>
                <td className="py-2 px-4 border-b">PayPal</td>
                <td className="py-2 px-4 border-b">$550.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
          <div className="p-8">
          <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Filter Data</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => filterData('Jan')}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              January
            </button>
            <button
              onClick={() => filterData('Feb')}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              February
            </button>
            <button
              onClick={() => filterData('Mar')}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              March
            </button>
            <button
              onClick={resetFilter}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      <div className="p-8">
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                  
          <h2 className="text-2xl font-bold mb-2">Sales Overview</h2>
          <p className="mb-4">A line chart showing total sales over time.</p>
          <div className="relative">
            <ResizableBox width={600} height={300} minConstraints={[300, 200]} maxConstraints={[1000, 600]}>
              <div ref={lineChartRef}>
                <Line data={lineData} options={lineChartOptions} />
              </div>
            </ResizableBox>
            <button
              onClick={() => toggleFullScreen(lineChartRef)}
              className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded"
            >
              Full Screen
            </button>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-2">Product Performance</h2>
          <p className="mb-4">A bar chart showing product sales by category.</p>
          <div className="relative">
            <ResizableBox width={600} height={300} minConstraints={[300, 200]} maxConstraints={[1000, 600]}>
              <div ref={barChartRef}>
                <Bar data={barData} options={barChartOptions} />
              </div>
            </ResizableBox>
            <button
              onClick={() => toggleFullScreen(barChartRef)}
              className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded"
            >
              Full Screen
            </button>
          </div>
        </div>
       
       
      </div>
    </div>
  );
};

export default Dashboard;
