import React from "react";
import dynamic from "next/dynamic";

const ResearchReportTable = dynamic(() => import("./ResearchReportTable"));

const TableSection = ({ lightMode }) => {
  return (
    <div>
      <div
        style={{
          position: "relative",
        }}
      >
        <ResearchReportTable lightMode={lightMode} />
        <h1
          style={{
            position: "absolute",
            top: "50%",
            left: "60%",
          }}
        >
          Overlay Text
        </h1>
      </div>
      <div className="wall_of_profit"></div>
    </div>
  );
};

export default TableSection;
