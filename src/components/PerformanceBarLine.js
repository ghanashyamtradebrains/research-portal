import React from "react";

function PerformanceBarLine({
  gainerCount = 5,
  LoserCount = 5,
  totalCount = 10,
  lineHeight,
  reverse = false,
  homePage, lightMode,
}) {
  return (
    <div className="d-flex-col-re">
      {homePage ? (
        <>
          <div className="d-flex justify-content-between">
            <p className="fs-12 mb-0">{gainerCount}</p>
            <p className="fs-12 mb-0">{LoserCount}</p>
          </div>
          <div
            style={{
              background: `linear-gradient(90deg,#04A94C 0%,  #B4D74D ${(gainerCount / totalCount) * 100 + "%"
                }, #EF8B2E ${(gainerCount / totalCount) * 100 + "%"
                },#EF0000 100% )`,
              height: lineHeight ? lineHeight : "10px",
            }}
          ></div>
          <div className="d-flex justify-content-between mt-5 mb-5">
            <p className="fs-12 mb-0">Advances</p>
            <p className="fs-12 mb-0">Declines</p>
          </div>
        </>
      ) : (
        <>
          <div className="border-bond w-100 mr-15">
            <div
              style={{ position: "relative", width: "92%" }}
              className=" h-10">

            </div>
            <div className="d-flex justify-content-between fs-s-12">
              <p className="fw-500 mb-0">Losers</p>
              <p className="fw-500 mb-0">Gainers</p>
            </div>
            <div className="d-flex mt-5 justify-content-between ff-lato">
              <p className="mb-0 fs-s-12">
                {LoserCount}
              </p>
              <p className="mb-0 fs-s-12">
                {gainerCount}
              </p>
            </div>

            <div className="dynamic-stockbar "></div>


          </div>
        </>
      )}
    </div>
  );
}

export default PerformanceBarLine;




