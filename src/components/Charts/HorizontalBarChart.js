import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import { getNewHeatMapData } from "../../pages/api/fetchClient";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useRouter } from "next/router";
import { getGradient } from "./getGradients";

function HorizontalBarChart({ lightMode }) {
  const [graphData, setgraphData] = useState([]);
  const [graphDuration, setgraphDuration] = useState("days=1");
  const router = useRouter();

  const gradientColors = [
    [
      { xValue: 0, color: "#77BF8A" },
      { xValue: 1, color: "#77BF8A" },
    ],
    [
      { xValue: 0, color: "#119F57" },
      { xValue: 1, color: "#119F57" },
    ],
    [
      { xValue: 0, color: "#027A2E" },
      { xValue: 1, color: "#027A2E" },
    ],
    [
      { xValue: 0, color: "#A11212" },
      { xValue: 1, color: "#A11212" },
    ],
    [
      { xValue: 0, color: "#C91E2D" },
      { xValue: 1, color: "#C91E2D" },
    ],
    [
      { xValue: 0, color: "#F5808B" },
      { xValue: 1, color: "#F5808B" },
    ],
  ];

  const returnGraphDuration = (val) => {
    switch (val) {
      case "days=1":
        return "1D";
      case "days=5":
        return "5D";
      case "months=1":
        return "1M";
      case "months=3":
        return "3M";
      case "months=6":
        return "6M";
      case "years=1":
        return "1Y";
    }
  };

  useEffect(() => {
    const getData = async () => {
      await getNewHeatMapData({
        indexname: "indices",
        page: 1,
        filter: returnGraphDuration(graphDuration),
        page: { perPage: 5000 },
      }).then((res) => {
        const filterData = res?.results.filter((each) => {
          return (
            each.symbol === "NIFTYIT" ||
            each.symbol === "BANKNIFTY" ||
            each.symbol === "NIFTYAUTO" ||
            each.symbol === "NIFTYFINANCE" ||
            each.symbol === "NIFTYPHARMA" ||
            each.symbol === "NIFTYMETAL" ||
            each.symbol === "NIFTYENERGY" ||
            each.symbol === "NIFTYREALTY" ||
            each.symbol === "NIFTYFMCG" ||
            each.symbol === "NIFTYPSUBANK"
          );
        });

        setgraphData(filterData);
      });
    };
    getData();
  }, [graphDuration]);

  const dataGraph = graphData?.map((items) => items?.per_change);
  const posDataGraph = graphData?.map((items) => Math.abs(items?.per_change));
  const graphSymbol = graphData?.map((items) => items?.symbol);

  const backgroundColors = [
    "#F5F5F5",
    "#E0E0E0",
    "#D6D6D6",
    "#CCCCCC",
    "#BFBFBF",
    "#AFAFAF",
  ];

  const progressBar = [
    {
      id: "backgroundBar",
      beforeDatasetsDraw(chart, args, pluginsOptions) {
        const {
          ctx,
          scales: { x, y },
          chartArea: { left, right },
        } = chart;

        y.ticks.forEach((tick, index) => {
          ctx.save();
          ctx.fillStyle = backgroundColors[index % backgroundColors.length];
          ctx.fillRect(
            left,
            y.getPixelForValue(index) - y.height / 2,
            right - left,
            y.height
          );
          ctx.restore();
        });
      },
    },
  ];

  const data = {
    labels: graphSymbol,
    datasets: [
      {
        label: "Data Set 1",
        type: "bar",
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          } else if (
            dataGraph &&
            dataGraph[context.dataIndex] > 0 &&
            dataGraph[context.dataIndex] < 2
          ) {
            return getGradient(ctx, chartArea, gradientColors[0]);
          } else if (
            dataGraph[context.dataIndex] > 2 &&
            dataGraph[context.dataIndex] < 3
          ) {
            return getGradient(ctx, chartArea, gradientColors[1]);
          } else if (dataGraph[context.dataIndex] > 3) {
            return getGradient(ctx, chartArea, gradientColors[2]);
          } else if (
            dataGraph[context.dataIndex] < 0 &&
            dataGraph[context.dataIndex] > -2
          ) {
            return getGradient(ctx, chartArea, gradientColors[5]);
          } else if (
            dataGraph[context.dataIndex] < -2 &&
            dataGraph[context.dataIndex] > -3
          ) {
            return getGradient(ctx, chartArea, gradientColors[4]);
          } else {
            return getGradient(ctx, chartArea, gradientColors[3]);
          }
        },
        borderWidth: 1,
        barPercentage: 0.9,
        borderRadius: 15,
        data: posDataGraph,
        datalabels: {
          color: "white",
          anchor: "end",
          align: (context) => {
            const value = posDataGraph[context.dataIndex];
            return value > 0.3 ? "start" : "end";
          },
          offset: 4,
          backgroundColor: lightMode
            ? "rgba(0, 0, 0, 0.35)"
            : "rgba(0, 0, 0, 0.25)",
          borderRadius: "15",
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    layout: {
      padding: {
        right: 25,
      },
    },
    scales: {
      y: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: lightMode ? "#3B3F4F" : "#ffff",
          font: {
            size: 14,
          },
          padding: 0,
          innerWidth: 0,
        },
      },
      x: {
        beginAtZero: true,
        ticks: {
          color: lightMode ? "#3B3F4F" : "#ffff",
          font: {
            size: 12,
          },
        },
        grid: {
          color: lightMode
            ? "rgb(201 , 215, 222 , 0.3)"
            : "rgb(84, 94, 120 , 0.3)",
          borderColor: lightMode ? "#000" : "#545E78",
          borderWidth: 1,
          borderDash: [5, 15],
          borderDashOffset: 5,
          drawTicks: false,
          lineWidth: 1,
          offset: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  return (
    <div style={{ height: "433px" }}>
      <BarChart
        style={{ height: "100%" }}
        data={data}
        options={options}
        plugins={[progressBar, ChartDataLabels]}
      />
    </div>
  );
}

export default HorizontalBarChart;
