import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend);

export const Dashboard = ()=> {
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August']
  const dataLine = {
    labels: labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => Math.floor(Math.random() * 1000)),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => Math.floor(Math.random() * 1000)),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Dataset 3',
        data: labels.map(() => Math.floor(Math.random() * 1000)),
        borderColor: 'rgb(53, 12, 245)',
        backgroundColor: 'rgba(53, 12, 245, 0.5)',
      },
      {
        label: 'Dataset 4',
        data: labels.map(() => Math.floor(Math.random() * 1000)),
        borderColor: 'rgb(53, 12, 200)',
        backgroundColor: 'rgba(53, 12, 200, 0.5)',
      },
    ],
  };

  const optionsLine = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  return (
    <>
    <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          </div>
    </header>
    <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Line data={dataLine} options={optionsLine}></Line>
        </div>
    </main>
    </>
  )
}