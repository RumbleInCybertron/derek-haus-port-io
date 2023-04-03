import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement } from 'chart.js'

Chart.register(ArcElement);

const labels = ['section 1', 'section 2', 'section 3', 'section 4', 'section 5', 'section 6'];
const data = {
  labels: labels,
  datasets: [{
    label: 'Doughnut chart',
    data: [65, 59, 83, 89, 76, 55, 40],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1,
    hoverBorderWidth: 8,
    hoverBorderColor: ['rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'],
  }]
};

export const DonutChart = () => {
  return (
    <div className="my-5 h-screen">
      <h2 className='text-center font-bold'>Doughnut Sample with Next.js</h2>
      <Doughnut
        data={data}
        options={{
          maintainAspectRatio: false,
          responsive: true,
        }}
      />
    </div>
  );
};

export default DonutChart;