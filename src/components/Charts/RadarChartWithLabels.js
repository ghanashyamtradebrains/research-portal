import React from "react";
import RadarChart from "./RadarChart";
function RadarChartWithLabels({
  isIntsry ,
  shareHoldingAPI,
  lightMode,
  labelArray,
  totalValue,
  dataArray,
  IsOverFlowHidden
}) {
  // let totalValue;
  // let dataObj = {};
  // if (shareHoldingAPI !== null) {
  //   const keys = Object.keys(shareHoldingAPI);
  //   dataObj = shareHoldingAPI[keys.at(-1)];
  //   totalValue =
  //     dataObj.promoters +
  //     dataObj.public +
  //     dataObj.fii +
  //     dataObj.total_dii +
  //     dataObj.others;
  // }

  // }, [totalValue,dataArray])
  const data = {
    // labels: ["Promoters", "Public", "FII", "DII", "Others"],
    labels: labelArray,
    datasets: [
      {
        data: dataArray,
        // [
        //   dataObj?.promoters ?? 0,
        //   dataObj?.public ?? 0,
        //   dataObj?.fii ?? 0,
        //   dataObj?.total_dii ?? 0,
        //   dataObj.others ?? 0,
        // ],
        backgroundColor: [
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
        // backgroundColor:(context)=>{
        // },
        // borderColor: ["#FF9177", "#EB5757", "#5ECBC8", "#438FFF", "#BF81FB"],
        borderWidth: 0,
        hoverOffset: 10,
      },
    ],
  };
  const options = {
    scales: {
      r: {
        grid: {
          color: '#545E78'
        },
        ticks:{
          color:"#545E78",
          backdropColor:lightMode ? "#F2F6F8" :"#292E3F"

        }

      }
    },
    cutout: 90,
    responsive: true,
    maintainAspectRatio: false,
    elements:{
      arc:{
        backgroundColor:(context)=>{
        },
        borderColor:"red"
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
          title: (contextArr) => {
            return "";
          },
          // labelTextColor: (context) => {
          //   // return context.dataset.backgroundColor[context.dataIndex];
            
          // },
          label: (context) => {
            return `${context.label}:${context.formattedValue}%`;
          },
        },
      },
    },
    onHover: function(evt, elements) {
        if(elements.length>0){
            addHover(elements[0].index)
        }else{
            removeHover()
        }
      }  
  };
  //highlight selected legend
  const addHover = (dataIndex) => {
    for (let index = 0; index < data.labels.length; index++) {
      if (index === dataIndex) {
        document.getElementById(`holding${dataIndex}`).style.color = lightMode
          ? "black"
          : "white";
      } else {
        document.getElementById(`holding${index}`).style.color = "gray";
      }
    }
  };
  const removeHover = () => {
    for (let index = 0; index < data?.labels?.length; index++) {
      document.getElementById(`holding${index}`).style.color = lightMode
        ? "black"
        : "white";
    }
  };

  
  // show data in center of doghnut
  // const hoverCenterLabel = [
  //   {
  //     id: "hoverCenterLabel",
  //     afterDraw(chart, args, options) {
  //       const {
  //         ctx,
  //         chartArea: { left, right, top, bottom, width, height },
  //       } = chart;
  //       ctx.save();
  //       if (chart._active.length > 0) {
  //         const textLabel = chart.config.data.labels[chart._active[0].index];
  //         const activeColor =
  //           chart.config.data.datasets[chart._active[0].datasetIndex]
  //             .backgroundColor[chart._active[0].index];
  //         const numLabel =
  //           chart.config.data.datasets[chart._active[0].datasetIndex].data[
  //             chart._active[0].index
  //           ];
  //         ctx.font = "bold 18px poppins";
  //         ctx.fillStyle = activeColor;
  //         ctx.textAlign = "center";
  //         // ctx.fillText(`${textLabel} : ${numLabel}%`,width/2+20,height/2+20)
  //         ctx.fillText(`${textLabel}`, width / 2 + 20, height / 2 + 10);
  //         ctx.fillText(`${numLabel}%`, width / 2 + 20, height / 2 + 30);
  //       }
  //     },
  //   },
  // ];
  return (
    <div className="flex-col-row ">
      <div style={{ height: "350px" }} className="w-100-60">
        <RadarChart
          data={data}
          options={options}
          // plugins={hoverCenterLabel}
        />
      </div>
      <div
        onClick={removeHover}
        className=" w-100-40 ff-rubik d-flex align-items-center justify-content-center"
      >
        <div
          style={{ overflowY:IsOverFlowHidden ? "": "scroll ", maxHeight:IsOverFlowHidden ? "100%" : "350px" }}
          className="scroll pointer"
        >
          {data?.labels?.map((holder, i) => {
            return (
              <div
                key={i}
                className="flex"
                style={{ color: lightMode ? "black" : "white" }}
                id={`holding${i}`}
              >
                <span
                  className="legend-dot"
                  style={{ background: data?.datasets[0]?.backgroundColor[i] }}
                ></span>
                <p className="fs-s-16">
                  {holder} :{" "}
                  {totalValue &&
                    dataArray &&
                    ((data?.datasets[0]?.data[i] ) )?.toFixed(
                      2
                    )}
                  %
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RadarChartWithLabels;
