import { Chart, registerables } from "chart.js";
import dayjs from "dayjs";
import AreaChart from "../../Charts/AreaChart";
import { getGradient } from "../../Charts/getGradients";
// Register Chart.js components
Chart.register(...registerables);

function PerformanceGraph({ graphData, p_data }) {
  const gradientColors = [
    [
      { xValue: 0, color: "rgba(215, 64, 18, 1)" },
      { xValue: 1, color: "rgba(204, 153, 82, 0.01)" },
    ],
    [
      { xValue: 0, color: "rgba(253, 181, 109, 1)" },
      { xValue: 1, color: "rgba(204, 153, 82, 0.01)" },
    ],
  ];

  const indexValue = graphData?.map((items) => items?.index_per);
  const stockValue = graphData?.map((items) => items?.stock_per);
  const dateTime = graphData?.map((items) => dayjs(items?.Date).format("YYYY"));

  const data1 = {
    labels: dateTime,
    datasets: [
      {
        label:
          p_data?.index_symbol === "NIFTY" ? "NIFTY50" : p_data.index_symbol,
        fill: true,
        backgroundColor: "transparent",
        borderColor: "rgba(215, 64, 18, 1)",
        borderWidth: 2.5,
        data: indexValue,
        pointStyle: "rectRot",
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          } else {
            return getGradient(ctx, chartArea, gradientColors[0]);
          }
        },
      },
      {
        label: p_data?.symbol,
        fill: true,
        backgroundColor: "transparent",
        borderColor: "rgba(253, 181, 109, 1)",
        borderWidth: 2.5,
        data: stockValue,
        pointStyle: "rectRot",
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          } else {
            return getGradient(ctx, chartArea, gradientColors[1]);
          }
        },
      },
    ],
  };

  return (
    <div>
      <div
        style={{ height: "400px", width: "100%" }}
        className="my-55 responsive-grap-stock-comaprepage"
      >
        <AreaChart
          dataPoints={data1}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            tension: 0,
            scales: {
              y: {
                type: "linear",
                grid: {
                  display: false,
                  borderColor: "#545E78",
                },
                borderColor: "white",
                ticks: {
                  callback: (v, i) => v,
                  color: "rgba(84, 94, 120, 1)",
                  font: {
                    size: 14,
                  },
                  padding: 5,
                },
              },
              x: {
                type: "category",
                grid: {
                  display: false,
                  borderColor: "#545E78",
                },
                ticks: {
                  color: "rgba(84, 94, 120, 1)",
                  font: {
                    size: 14,
                  },
                  maxTicksLimit: 3,
                  stepSize: Math.ceil(dateTime?.length / 3),
                },
              },
            },
            elements: {
              point: {
                radius: 0,
              },
            },
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  color: "rgba(84, 94, 120, 1)",
                  usePointStyle: true,
                  boxWidth: 5,
                  boxHeight: 5,
                  pointStyle: "triangle",
                  padding: 20,
                },
              },
            },
            interaction: {
              intersect: false,
              mode: "index",
            },
          }}
        />
      </div>
    </div>
  );
}

export default PerformanceGraph;
