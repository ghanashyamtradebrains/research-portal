import React, { memo, useEffect, useMemo, useState } from "react";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import AreaChart from "./Charts/AreaChart";
import TimeLineButtonsDash from "./dashboard/marketWatch.js/TopGainerLoserDash/TimeLineButtonsDash";
import { convertTograph } from "../utilityFn/convertDataToChart";
import { redGreenColorPicker } from "../utilityFn/redGreenColor";
import numberWithCommas from "../utilityFn/numberWithCommas";
import { getGradient } from "./Charts/getGradients";
import { getStockGraphData } from "../pages/api/fetchClient";
import StockEndpoints from "../pages/api/endPoints";
import { getFormatDate } from "../utilityFn/getFormatdate";
import TableLoader from "./spinners/TableLoader";
import { useRouter } from "next/router";
import { convertTographClose } from "../utilityFn/convertDataToChartNew";
import NoData from "./home/components/NoData";
function IndexGraphContainer({
  type,
  symbol,
  lightMode,
  height = "250px",
  Stockdata,
}) {
  const router = useRouter();
  const [graphData, setgraphData] = useState([]);
  const [graphDiffData, setGraphDiffData] = useState([]);
  const [graphDuration, setgraphDuration] = useState(
    router?.query?.index_name !== "GIFT-NIFTY" ? "days=1" : "1D"
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      if (!symbol) return;
      if (graphDuration) {
        const response = await getStockGraphData(
          router?.query?.index_name !== "GIFT-NIFTY"
            ? StockEndpoints.stockGraphData(type, symbol, graphDuration)
            : StockEndpoints.stockGraphGiftData(graphDuration)
        )
          .then((resp) => {
            setIsLoading(false);
            setgraphData(resp?.data);
            setGraphDiffData(resp?.data);
          })
          .catch((err) => null);
      }
    };
    getData();
  }, [graphDuration, symbol]);

  const chartPoints = useMemo(() => {
    if (!graphData) return;

    return router?.query?.index_name !== "GIFT-NIFTY"
      ? convertTograph(graphData, graphDuration)
      : convertTographClose(graphData, graphDuration);
  }, [graphData, graphDuration]);

  // const chartVolume = useMemo(() => {
  //   if (!graphData) {
  //     console.log("Returning early as graphData is not available");
  //     return;
  //   }

  //   const graphPointsArray = graphData?.map((item, i) => item.volume).reverse();
  //   return graphPointsArray;
  // }, [graphData, graphDuration]);

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
  let delayBetweenPoints = 1;
  var started = {};

  const memoData = useMemo(() => {
    if (!graphData) return;

    return {
      labels: chartPoints?.labelArray,
      datasets: [
        {
          fill: true,
          name: "₹",
          backgroundColor: "transparent",
          backgroundColor: (context) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) {
              return null;
            } else if (chartPoints?.stockTrend)
              return getGradient(ctx, chartArea, gradientColors[0]);
            else return getGradient(ctx, chartArea, gradientColors[1]);
          },
          label: {
            display: false,
          },
          data: chartPoints?.graphPointsArray,

          borderColor: chartPoints?.stockTrend ? ["#008580"] : ["#BC3754"],
          borderWidth: 2,
          animation: (context) => {
            var delay = 0;
            var index = context.dataIndex;
            var chart = context.chart;
            if (!started[index]) {
              delay = index * delayBetweenPoints;
              started[index] = true;
            }
            var { x, y } =
              index > 0
                ? chart
                    .getDatasetMeta(0)
                    .data[index - 1].getProps(["x", "y"], true)
                : { x: 0, y: chart.scales.y.getPixelForValue(100) };

            return {
              x: {
                easing: "linear",
                duration: delayBetweenPoints,
                from: x,
                delay,
              },
              y: {
                easing: "linear",
                duration: delayBetweenPoints * 500,
                from: y,
                delay,
              },
              skip: {
                type: "boolean",
                duration: delayBetweenPoints,
                from: true,
                to: false,
                delay: delay,
              },
            };
          },
        },
      ],
    };
  }, [graphData, graphDuration]);

  const memoOptions = useMemo(() => {
    if (!graphData) return;

    return {
      responsive: true,
      maintainAspectRatio: false,
      tension: 0.3,
      scales: {
        y: {
          grid: {
            display: false,
            borderColor: lightMode ? "#A3A8B0" : "#545E78",
          },
          ticks: {
            display: false,
            color: lightMode ? "#3B3F4F" : "#ffff",
            font: {
              size: 14,
            },
          },
        },
        x: {
          grid: {
            display: false,
            borderColor: lightMode ? "#A3A8B0" : "#545E78",
          },
          ticks: {
            display: false,
            color: lightMode ? "#3B3F4F" : "#ffff",
            font: {
              size: 14,
            },
            autoSkip: true,
            maxTicksLimit: 6,
            min: chartPoints?.labelArray[1],
            max: chartPoints?.labelArray[6],
            maxRotation: 0,
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
          display: false,
        },
        tooltip: {
          titleAlign: "start",
          yAlign: "center",
          backgroundColor: lightMode ? "rgba(0, 0, 0, 0.8)" : "#ffff",
          bodyFont: {
            size: 14,
            weight: 600,
          },
          titleColor: (context) => {
            return lightMode ? "#ffff" : "rgba(0, 0, 0, 0.8)";
          },
          displayColors: false,
          callbacks: {
            title: (context) => {
              return graphDuration === "days=1"
                ? context[0]?.label
                : getFormatDate(
                    graphData?.at(-context[0]?.dataIndex - 1)?.date
                  );
            },
            label: (context) => {
              return `${type === "index" ? "" : context.dataset.name} ${
                context.formattedValue
              }`;
            },
            labelTextColor: (context) => {
              if (context.dataset.name === "₹") {
                if (lightMode) {
                  if (chartPoints?.stockTrend) return "#00FF57";
                  else return "#F82E2E";
                } else {
                  if (chartPoints?.stockTrend) return "#009633";
                  else return "#FF0000";
                }
              } else {
                return "#438FFF";
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
  }, [graphData, graphDuration, lightMode]);

  var timeLineData = [
    { label: "1D", value: "days=1" },
    { label: "1M", value: "months=1" },
    { label: "3M", value: "months=3" },
    { label: "6M", value: "months=6" },
    { label: "1Y", value: "years=1" },
    { label: "5Y", value: "years=5" },
    { label: "Max", value: "years=12" },
  ];

  if (router?.query?.index_name === "GIFT-NIFTY") {
    timeLineData = [
      { label: "1D", value: "1D" },
      { label: "1M", value: "1M" },
    ];
  }
  const priceData = useMemo(() => {
    if (!graphDiffData || graphDiffData.length === 0) {
      return { dayDiff: 0, dayPercentDiff: 0, diff: 0, percentDiff: 0 };
    }

    const firstClose = graphDiffData[0]?.close;
    const firstPrevClose = graphDiffData[0]?.prev_close;
    const lastClose = graphDiffData[graphDiffData.length - 1]?.close;

    const dayDiff = firstClose - firstPrevClose;
    const dayPercentDiff = (dayDiff / firstPrevClose) * 100;

    const diff = firstClose - lastClose;
    const percentDiff = (diff / lastClose) * 100;

    return {
      dayDiff,
      dayPercentDiff,
      diff,
      percentDiff,
    };
  }, [graphDiffData]);

  const {
    dayDiff: priceDayDiff,
    dayPercentDiff: priceDayPrecentDiff,
    diff: priceDiff,
    percentDiff: pricePrecentDiff,
  } = priceData;

  const isOneDay = graphDuration === "days=1";
  const diff = isOneDay ? priceDayDiff : priceDiff;
  const isPositive = diff > 0;

  return (
    <div className="">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div
          className="d-flex align-items-center fs-24-16 mt-5"
          style={{ marginBottom: "-5x" }}
        >
          {isPositive ? (
            <CaretUpOutlined
              style={{
                color: lightMode ? "#009633" : "#00FF57",
              }}
            />
          ) : (
            <CaretDownOutlined
              style={{
                color: redGreenColorPicker(diff, lightMode),
              }}
            />
          )}
          <p className="fs-18-16  m-0 ml-10 mr-10 d-flex align-items-end ff-lato fw-600">
            {numberWithCommas(
              Stockdata && Stockdata[0] && Stockdata[0]["close"]
            )}
          </p>
          <div
            style={{
              color: redGreenColorPicker(
                graphDuration === "days=1" ? priceDayDiff : priceDiff,
                lightMode
              ),
              marginBottom: "5px",
              visibility: isNaN(priceDiff) ? "hidden" : "",
            }}
          >
            {router?.query?.index_name === "GIFT-NIFTY" ? (
              <small className="fs-18-16 ff-lato">
                <small className="mr-2">
                  {graphDuration === "1D"
                    ? priceDayDiff > 0
                      ? "+"
                      : ""
                    : priceDiff > 0
                    ? "+"
                    : ""}{" "}
                  {graphDuration === "1D"
                    ? priceDayDiff?.toFixed(2)
                    : priceDiff?.toFixed(2)}
                </small>{" "}
                ({" "}
                {graphDuration === "1D"
                  ? priceDayDiff > 0
                    ? "+"
                    : ""
                  : priceDiff > 0
                  ? "+"
                  : ""}
                {graphDuration === "1D"
                  ? priceDayPrecentDiff?.toFixed(2)
                  : pricePrecentDiff?.toFixed(2)}
                %)
              </small>
            ) : (
              <small className="fs-18-16 ff-lato">
                <small className="mr-2">
                  {graphDuration === "days=1"
                    ? priceDayDiff > 0
                      ? "+"
                      : ""
                    : priceDiff > 0
                    ? "+"
                    : ""}{" "}
                  {graphDuration === "days=1"
                    ? priceDayDiff?.toFixed(2)
                    : priceDiff?.toFixed(2)}
                </small>{" "}
                ({" "}
                {graphDuration === "days=1"
                  ? priceDayDiff > 0
                    ? "+"
                    : ""
                  : priceDiff > 0
                  ? "+"
                  : ""}
                {graphDuration === "days=1"
                  ? priceDayPrecentDiff?.toFixed(2)
                  : pricePrecentDiff?.toFixed(2)}
                %)
              </small>
            )}
            <small
              className="fs-18-16 ff-lato ml-5"
              style={{
                color: redGreenColorPicker(
                  graphDuration === "days=1" ? priceDayDiff : priceDiff,
                  lightMode
                ),
              }}
            >
              {router?.query?.index_name !== "GIFT-NIFTY"
                ? graphDuration === "days=1"
                  ? "1 D"
                  : graphDuration === "months=1"
                  ? "1 M"
                  : graphDuration === "months=3"
                  ? "3 M"
                  : graphDuration === "months=6"
                  ? "6 M"
                  : graphDuration === "years=1"
                  ? "1 Y"
                  : graphDuration === "years=5"
                  ? "5 Y"
                  : "All"
                : graphDuration === "1D"
                ? "1 D"
                : graphDuration === "1M"
                ? "1 M"
                : graphDuration === "3M"
                ? "3 M"
                : graphDuration === "6M"
                ? "6 M"
                : graphDuration === "1Y"
                ? "1 Y"
                : graphDuration === "5Y"
                ? "5 Y"
                : "All"}
            </small>
          </div>
        </div>
      </div>
      {isLoading ? (
        <TableLoader />
      ) : (
        <div style={{ height: height }}>
          {graphData && graphData.length > 0 ? (
            <AreaChart
              height={300}
              widht={500}
              dataPoints={memoData}
              options={memoOptions}
            />
          ) : (
            <NoData />
          )}
        </div>
      )}

      <div className="">
        <TimeLineButtonsDash
          data={timeLineData}
          value={graphDuration}
          setValue={setgraphDuration}
          lightMode={lightMode}
          index={true}
          gift={true}
        />
      </div>
    </div>
  );
}

export default memo(IndexGraphContainer);
