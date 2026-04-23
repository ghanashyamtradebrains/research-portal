import { CaretDownOutlined } from "@ant-design/icons";
import React from "react";
import numberWithCommas from "../utilityFn/numberWithCommas";

function PriceHighLowSlider({ high, low, close, todaytHL = false }) {
  const firstValue = high - low;
  const secondValue = close - low;
  const percentage = (secondValue / firstValue) * 100;

  return (
    <div
      style={{ position: "relative", margin: "20px 0px 30px 0px" }}
      className="border-bond  w-100"
    >
      <div
        style={{ position: "relative", width: "90%" }}
        className="mt-10  h-25 "
      >
        <div
          style={{
            position: "absolute",
            left:
              percentage > 100
                ? 93 + "%"
                : percentage > 0
                ? percentage + "%"
                : 0 + "%",
            // left:40,
            bottom: "-4px",
          }}
          className="d-flex flex-col mb-3"
        >
          <p className="fs-16-13 mb-0 ff-lato">₹{numberWithCommas(close)}</p>
          <CaretDownOutlined color="clr-green" />
        </div>
      </div>
      <div className="dynamic-stockbar "></div>
      <div className="d-flex mt-5 justify-content-between ">
        <p className="mb-0 ff-lato">₹{numberWithCommas(low)}</p>
        <p className="mb-0 ff-lato">₹{numberWithCommas(high)}</p>
      </div>
      <div className="d-flex justify-content-between  mt-5 fs-14-12 ff-lato">
        <p className="fw-500 mb-0">{todaytHL ? "Today’s Low" : "52W Low"}</p>
        <p className="fw-500 mb-0">{todaytHL ? "Today’s High" : "52W High"}</p>
      </div>
    </div>
  );
}

export default PriceHighLowSlider;
