import { CaretUpOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import React, { memo, useMemo } from "react";
import { getGradient } from "../../../components/Charts/getGradients";
import { convertTograph } from "../../../utilityFn/convertDataToChart";
import numberWithCommas from "../../../utilityFn/numberWithCommas";
import { redGreenColorPicker } from "../../../utilityFn/redGreenColor";
import AreaChart from "../../Charts/AreaChart";
import Link from "next/link";

function IndexGraphCard({ lightMode, name, stockChange, graphData = [] }) {
  const chartPoints = useMemo(
    () => convertTograph(graphData, "days=1"),
    [graphData]
  );
const router = useRouter()
  const gradientColors = [
    [
      { xValue: 0, color: "rgba(0, 133, 128, 0.7)" },
      { xValue: 1, color: "rgba(0, 133, 128, 0)" },
    ],
    [
      { xValue: 0, color: "rgba(188, 55, 84, 0.6)" },
      { xValue: 1, color: "rgba(188, 55, 84, 0)" },
    ],
  ];
  const data = {
    labels: chartPoints?.labelArray,
    datasets: [
      {
        fill: true,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          } else if (stockChange?.change >= 0)
            return getGradient(ctx, chartArea, gradientColors[0]);
          else return getGradient(ctx, chartArea, gradientColors[1]);
        },
        label: {
          display: false,
        },
        data: chartPoints?.graphPointsArray,
        borderColor: stockChange?.change >= 0 ? ["#008580"] : ["#BC3754"],
        borderWidth: 2,
      },
    ],
  };

  return (
    
    <Link 
    href="/index/[name]"
    as={`/index/${encodeURIComponent(name)}`} 
      style={{ height: "275px" }}
      className={`animation-div pointer ${
        lightMode ? "card-drop-light-shadow" : "card-drop-dark-shadow"
      }`}
    >
      <div className="p-15">
          <p className="fs-s-16 fw-500 mb-10">{name}</p>
        <p
          className={`d-flex d-flex-row lh-20  fs-s-20 mb-10 fw-500 align-items-center fw-600`}
        >
          <CaretUpOutlined
            style={{
              color: redGreenColorPicker(stockChange?.change, lightMode),
            }}
            rotate={stockChange?.change < 0 ? 180 : 0}
          />
          {numberWithCommas(stockChange?.close)}
        </p>
        <p
          className={` fw-500 fs-s-14 mb-0 `}
          style={{ color: redGreenColorPicker(stockChange?.change, lightMode) }}
        >
          {stockChange?.percent?.toFixed(2)}% ({stockChange?.change?.toFixed(2)}
          )
        </p>
      </div>
      <div style={{ height: "57%" }}>
        <AreaChart
          dataPoints={data}
          options={{
            responsive: true,

            maintainAspectRatio: false,
            tension: 0,
            scales: {
              y: {
                display: false,
              },

              x: {
                display: false,
              },
            },
            elements: {
              point: {
                radius: 0,
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                backgroundColor: lightMode ? "#ffff" : "#292E3F",
                displayColors: false,

                callbacks: {
                  labelTextColor: () => (lightMode ? "black" : "white"),

                  title: (chart, args) => {
                    return "";
                  },
                  label: (context) => `${context.formattedValue}`,
                },
              },
            },
            interaction: {
              intersect: false,
              mode: "index",
            },
          }}
          height={"100%"}
        />
      </div>
      </Link>
  );
}

export default memo(IndexGraphCard);
