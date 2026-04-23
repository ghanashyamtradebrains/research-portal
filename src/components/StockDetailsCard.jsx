import React, { useMemo } from "react";
import { getGradient } from "./Charts/getGradients";
import BarChart from "./Charts/BarChart";
import CustomTooltip from "./ant/CustomTooltip";
import svgSheet from "../assets/svg/svgSheet";
import ChartDataLabels from "chartjs-plugin-datalabels";
import numberWithCommas from "../utilityFn/numberWithCommas";
function StockDetailsCard({
  title,
  data,
  respKey,
  bottomTitle,
  lightMode,
  unit,
  tooltipText,
}) {
  const memoData = useMemo(() => {
    if (data === null) return;
    let YearHeaders, ratioData, positiveRatio, threeYrAvg;

    if (data && typeof data === "object") {
      YearHeaders = Object.keys(data).map((key, i) => {
        const newStr = key.substring(0, key.length - 2);
        return newStr;
      });

      ratioData = Object.values(data).map((value, i) => {
        return value[respKey];
      });

      positiveRatio = Object.values(data).map((value) =>
        Math.abs(value[respKey])
      );

      threeYrAvg = (
        (ratioData?.at(-1) ??
          0 + ratioData?.at(-2) ??
          0 + ratioData?.at(-3) ??
          0) / 3
      )?.toFixed(2);
    } else {
      console.error("data is null, undefined, or not an object.");
      // Handle this case appropriately, e.g., set default values or return early
    }

    return { YearHeaders, ratioData, positiveRatio, threeYrAvg };
  }, [data, title]);

  const gradientColors = [
    [
      { xValue: 0, color: "#E0C0FF" },
      { xValue: 1, color: "#A986FF" },
    ],
    [
      { xValue: 0, color: "#FFACB0" },
      { xValue: 1, color: "#FF3F7A" },
    ],
  ];

  const graphData = {
    //Bring in data
    labels: memoData?.YearHeaders,
    datasets: [
      {
        type: "bar",
        fill: "origin", // 0: fill to 'origin'
        fill: "+2",
        label: {
          display: false,
        },
        data: memoData?.positiveRatio,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          } else if (
            memoData?.ratioData &&
            memoData?.ratioData[context.index] > 0
          ) {
            return getGradient(ctx, chartArea, gradientColors[0]);
          } else {
            return getGradient(ctx, chartArea, gradientColors[1]);
          }
        },
        borderWidth: 0,
        barPercentage: memoData?.ratioData?.length < 2 ? 0.1 : 0.6,
        borderSkipped: false,
        borderRadius: 2,
        datalabels: {
          color: lightMode ? "black" : "white",
          anchor: "end",
          align: "top",
          offset: 2,
          formatter: function (value, index) {
            return (
              (memoData?.ratioData[index.dataIndex] < 0 ? "-" : "") +
              numberWithCommas(value)
            );
          },
        },
      },
    ],
  };

  const progressBar = [
    {
      id: "progressBar",
      beforeDatasetsDraw(chart, args, pluginsOptions) {
        const {
          ctx,
          data,
          chartArea: { top, bottom, left, right, width, height },
          scales: { x, y },
        } = chart;
        ctx.save();
        data.datasets[0].data.forEach((datapoint, index) => {
          const singleBarWidth =
            (width / x.ticks.length) * data.datasets[0].barPercentage * 0.8;
          ctx.beginPath();
          ctx.fillStyle = lightMode ? "#D6E5FF" : "rgb(214, 229, 255,.16)";
          // if (datapoint !== 0) {
          if (datapoint > 0) {
            ctx.fillRect(
              x.getPixelForValue(index) - singleBarWidth / 2,
              0,
              singleBarWidth,
              height
            );
          } else {
            ctx.fillRect(
              x.getPixelForValue(index) - singleBarWidth / 2,
              0,
              singleBarWidth,
              height
            );
          }
          // }
        });
      },
    },
  ];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    tension: 0.3,
    layout: {
      padding: {
        top: 20,
      },
    },
    scales: {
      y: {
        display: false,
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          display: false,
        },
        // stacked:true
      },
      x: {
        display: true,

        grid: {
          display: false,
          drawBorder: false,
        },
        gridLines: {
          zeroLineColor: "transparent",
          drawBorder: false,
        },
        ticks: {
          color: lightMode ? "#3B3F4F" : "#ffff",
          font: {
            size: 14,
          },
          padding: 5,
          innerWidth: 10,
        },
        // stacked:true
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
        enabled: false,
        backgroundColor: lightMode ? "rgba(0, 0, 0, 0.8)" : "#ffff",
        bodyFont: {
          size: 16,
          weight: 600,
        },
        displayColors: false,
        callbacks: {
          title: () => "",
          label: (context) =>
            `${memoData?.ratioData[context.dataIndex] < 0 ? "-" : ""}${
              context.formattedValue
            }${unit ? unit : ""}`,
          labelTextColor: (context) => {
            if (memoData?.ratioData[context.dataIndex] > 0) {
              return "#A986FF";
            } else {
              return "#FF3F7A";
            }
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  return (
    <div
      className={`StockDetailsCard-div ${lightMode ? "" : "bg-dark-gray"}`}
      style={{ minWidth: "260px", width: "25%" }}
    >
      <div>
        <div className="flex mb-10 justify-content-center align-items-center">
          <p className="mb-0 d-flex justify-content-center fw-600 fs-s-16">
            {title}
          </p>
          {tooltipText && (
            <CustomTooltip
              text={
                <>
                  <p className="mb-10 fw-500">{tooltipText}</p>
                </>
              }
            >
              {svgSheet.infoTooltop}
            </CustomTooltip>
          )}
        </div>
        <div>
          <div className="text-center mt-10 fs-s-14 d-flex">
            <p className="mb-10 fw-500">
              Avg {bottomTitle ? bottomTitle : title}
              <span className="fs-s-12 fw-400"> (3 Yrs)</span> :{" "}
              {memoData?.threeYrAvg ?? 0}
              {unit}
            </p>
          </div>
        </div>
        <div style={{ height: "250px" }}>
          <BarChart
            type="bar"
            id="ratoGraphs"
            data={graphData}
            options={options}
            plugins={[progressBar, ChartDataLabels]}
          />
        </div>
      </div>
    </div>
  );
}

export default StockDetailsCard;
