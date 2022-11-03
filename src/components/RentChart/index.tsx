import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { IRentData } from '../../types/rent';
import styles from './RentChart.module.css';

Chart.register(...registerables);

const RentChart: React.FC<{ data: IRentData[] }> = ({ data }) => {
    const chartData = {
        labels: data.map((item) => item.year),
        datasets: [
            {
                label: 'Effective Rent',
                data: data.map((item) => item.effectiveRent),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Starting Rent',
                data: data.map((item) => item.startingRent),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return <div className={styles.chart}>
        <Line data={chartData} />;
    </div>

}

export default RentChart;
