import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  lable: string;
  ci: number;
  ri: number;
};

export default function PieChart(props: Props) {
  const { lable, ci, ri } = props;
  const data = {
    labels: ['Current Intake', 'Required Intake'],
    datasets: [
      {
        label: lable,
        data: [ci, ri],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} width={300} height={300} />;
}
