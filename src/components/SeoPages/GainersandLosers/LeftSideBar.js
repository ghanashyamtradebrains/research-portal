import React from "react";
import { urlEncode } from "../../../utilityFn/urlEncode";

function LeftSideBar({ lightMode, data, activeIndex, navigate,activeDuration ,url}) {
  return (
    <div
      className={`w-100  card-shadow detail-left-card ${
        lightMode ? "bg-gray" : "bg-dark-gray"
      }`}
      style={{
        height: "min-content",
        marginBottom: "40px",
      }}
    >
      
      {data?.map((index, i) => {
        const encodeStr=urlEncode(index.symbol)

     
        return (
          <div key={i}
            onClick={() => navigate.replace(`/${url}/${encodeStr}/${activeDuration}`)}
            className={`overFlow-text pointer fs-s-14 fw-500 mb-0 w-100 ${
              lightMode ? "hover-light-blue" : "bg-dark-hover"
            }`}
            style={{
              // overflow:'hidden',
              padding: "10px 16px",
              background:
              index.symbol === activeIndex &&
                (lightMode
                  ? "rgba(211, 232, 251, 0.35)"
                  : "rgba(167, 182, 196, 0.24)"),
            }}
          >
            {index.name}
          </div>
        );
      })}
    </div>
  );
}

export default LeftSideBar;
