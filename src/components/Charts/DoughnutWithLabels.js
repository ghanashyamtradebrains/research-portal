import React, { useMemo } from "react";
import DoughnutChart from "./DoughnutChart";
import styles from "./DoughnutWithLabels.module.css";

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
  backTest,
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
    <div className={``}>
      <div style={{ height: backTest ? "300px" : "350px" }} className={`w-100`}>
        <DoughnutChart
          data={data}
          options={options}
          plugins={hoverCenterLabel}
        />
      </div>
      <div
        onClick={removeHover}
        className={`w-100 ff-rubik ${
          backTest ? "" : "d-flex align-item-center justify-content-center"
        }`}
      >
        <div
          style={{
            overflowY: IsOverFlowHidden ? "" : "scroll ",
            maxHeight: labelsheight
              ? labelsheight
              : IsOverFlowHidden
              ? "100%"
              : "150px",
          }}
          className="scroll pointer"
        >
          {data?.labels?.map((holder, i) => {
            return (
              <div
                key={i}
                className={`${backTest ? styles.flex : "flex"}`}
                style={{ color: lightMode ? "black" : "white" }}
                id={`${divID}${i}`}
              >
                {backTest ? (
                  <>
                    <div>
                      <span
                        className="legend-dot"
                        style={{
                          background: data?.datasets[0]?.backgroundColor[i],
                        }}
                      ></span>
                      <span className={styles.font_size} title={holder}>
                        {holder.length > 10
                          ? `${holder.slice(0, 20)}...`
                          : holder}
                      </span>
                    </div>
                    <div className={styles.item}>
                      {dataArray && data?.datasets[0]?.data[i]?.toFixed(2)}
                      {inRuppee ? "" : "%"}
                    </div>
                  </>
                ) : (
                  <>
                    {" "}
                    <span
                      className="legend-dot"
                      style={{
                        background: data?.datasets[0]?.backgroundColor[i],
                      }}
                    ></span>
                    <p className="fs-14-12">
                      {holder} :{" "}
                      {dataArray && data?.datasets[0]?.data[i]?.toFixed(2)}
                      {inRuppee ? "" : "%"}
                    </p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DoughnutWithLabels;
