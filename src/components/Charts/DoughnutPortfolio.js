import React, { useMemo } from "react";
import DoughnutChart from "./DoughnutChart";

function DoughnutWithLabels({
  isIndustry = false,
  shareHoldingAPI,
  lightMode,
  inRuppee,
  labelArray,
  totalValue,
  dataArray,
  divID,
  IsOverFlowHidden,
  labelsheight,
  defaultcol = false,
}) {
  const data = {
    labels: labelArray,
    datasets: [
      {
        data: dataArray,
        backgroundColor: [
          "#6DB8FD",
          "#1774FF",
          "#FF9177",
          "#EB5757",
          "#5ECBC8",
          "#438FFF",
          "#BF81FB",
          "#4A95DA",
          "#FABAF0",
          "#F5AF6D",
          "#EFE055",
          "#D0A073",
          "#C9D64A",
          "#BF81FB",
          "#BF6093",
          "#A93373",
          "#9FE77D",
          "#9BC59A",
          "#97C2E9",
          "#965EC2",
          "#817FC1",
          "#5FCD79",
          "#6744F3",
          "#4747EE",
          "#438FFF",
          "#4E6BD0",
          "#00C2FF",
          "#104BE3",
        ],
        borderWidth: 0,
        hoverOffset: 10,
      },
    ],
  };
  const options = {
    layout: { padding: isIndustry ? 20 : 20 },
    cutout: isIndustry ? 100 : 90,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };
  //highlight selected legend
  const addHover = (dataIndex) => {
    for (let index = 0; index < data.labels.length; index++) {
      if (index === dataIndex) {
        document.getElementById(`${divID}${dataIndex}`).style.color = lightMode
          ? "black"
          : "white";
      } else {
        document.getElementById(`${divID}${index}`).style.color = "gray";
      }
    }
  };
  const removeHover = () => {
    for (let index = 0; index < data?.labels?.length; index++) {
      document.getElementById(`${divID}${index}`).style.color = lightMode
        ? "black"
        : "white";
    }
  };
  // show data in center of doghnut
  const hoverCenterLabel = [
    {
      id: "hoverCenterLabel",
      afterDraw(chart, args, options) {
        const {
          ctx,
          chartArea: { left, right, top, bottom, width, height },
        } = chart;
        ctx.save();
        if (chart._active.length > 0) {
          const textLabel = chart.config.data.labels[chart._active[0].index];
          const activeColor =
            chart.config.data.datasets[chart._active[0].datasetIndex]
              .backgroundColor[chart._active[0].index];
          const numLabel =
            chart.config.data.datasets[chart._active[0].datasetIndex].data[
              chart._active[0].index
            ];
          ctx.font = isIndustry ? "bold 14px poppins" : "bold 18px poppins";
          ctx.fillStyle = activeColor;
          ctx.textAlign = "center";
          ctx.Padding = "30px";
          ctx.fillText(
            `${
              textLabel.length > 10
                ? textLabel.substring(0, 20) + "..."
                : textLabel
            }`,
            width / 2 + 20,
            height / 2 + 10
          );
          ctx.fillText(
            `${numLabel.toFixed(2)}${inRuppee ? "" : "%"}`,
            width / 2 + 20,
            height / 2 + 30
          );
        }
      },
    },
  ];
  return (
    <div className={`d-flex flex-col-row`}>
      <div style={{ height: "300px" }} className={`w-65per-100`}>
        <DoughnutChart
          data={data}
          options={options}
          plugins={hoverCenterLabel}
        />
      </div>
      <div
        onClick={removeHover}
        className={`w-100 ff-rubik d-flex align-items-center justify-content-center`}
      >
        <div
          style={{
            overflowY: IsOverFlowHidden ? "" : "scroll ",
            maxHeight: labelsheight
              ? labelsheight
              : IsOverFlowHidden
              ? "100%"
              : "220px",
          }}
          className="scroll"
        >
          {data?.labels?.map((holder, i) => {
            return (
              <div
                key={i}
                className="d-flex gap-5px"
                style={{ color: lightMode ? "black" : "white" }}
                id={`${divID}${i}`}
              >
                <div
                  className="legend-dot w-15p"
                  style={{ background: data?.datasets[0]?.backgroundColor[i] }}
                ></div>
                <p className="fs-s-12 w-85">
                  {holder} :{" "}
                  {totalValue &&
                    dataArray &&
                    data?.datasets[0]?.data[i]?.toFixed(2)}
                  {inRuppee ? "" : "%"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DoughnutWithLabels;
