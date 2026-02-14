import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import api from './api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function RevenueChart() {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        api.get('/orders/revenue').then(res => {
            const months = res.data.map(item => `Tháng ${item[0]}`);
            const amounts = res.data.map(item => item[1]);

            setChartData({
                labels: months,
                datasets: [
                    {
                        label: 'Doanh thu (VNĐ)',
                        data: amounts,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                    },
                ],
            });
        });
    }, []);

    return (
        <div className="card shadow-sm p-4 mt-4">
            <h4 className="fw-bold mb-4 text-center">Biểu đồ doanh thu năm 2026</h4>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    plugins: { legend: { position: 'top' } },
                }}
            />
        </div>
    );
}

export default RevenueChart;