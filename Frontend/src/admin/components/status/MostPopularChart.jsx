import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

function MostPopularChart({ data }) {
    const [chartData, setChartData] = useState(null);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const rawData = data?.mostSold;
        if (!Array.isArray(rawData)) return;

        const sorted = [...rawData]?.sort((a, b) => b.sold - a.sold);
        const top3 = sorted.slice(0, 3);
        const others = sorted.slice(3);

        const totalSold = rawData.reduce((acc, item) => acc + item.sold, 0);
        const othersTotal = others.reduce((acc, item) => acc + item.sold, 0);

        const labels = [...top3.map(item => item.name), 'سایرین'];
        const values = [...top3.map(item => item.sold), othersTotal];

        const colors = ['#0088FE', '#01bb99', '#FFBB28', '#ff5500'];

        setTotal(totalSold);

        setChartData({
            labels,
            datasets: [{
                label: 'درصد فروش',
                data: values,
                backgroundColor: colors,
                borderWidth: 1,
            }],
        });
    }, [data]);

    const options = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    title: () => "",
                    label: function (tooltipItem) {
                        const value = tooltipItem.raw;
                        const percentage = ((value / total) * 100).toFixed(1);
                        const label = tooltipItem.label;
                        return `${label} ${percentage}%`;
                    },
                },
                bodyFont: {
                    family: 'Dana',
                    size: 12,
                },
            },
        },
    };

    if (!chartData) return <p>در حال بارگذاری نمودار...</p>;

    return (
        <>
            <div className="font-bold text-white pb-6 pt-12">پرطرفدار ترین ها :</div>
            <div className="w-52 h-42 mx-auto">
                <Pie data={chartData} options={options} />
            </div>
        </>
    );
}

export default MostPopularChart;
