import React, { useEffect, useState } from "react";
import svgSheet from "../assets/svg/svgSheet";
function TopStrip() {
  return (
    <section className="bg-top-gardient w-100 h-60px flex div-items-center px-15">
      <div className="flex align-items-center text-white">
        <p className="fs-16-12 fw-600 mb-0 flex align-items-center justify-content-center">
          <span>{svgSheet?.cautionIcon}</span>
          <span style={{ marginLeft: "-10px" }}>
            {" "}
            Routine annual maintenance going on, we regret the inconvenience
            caused.
          </span>
        </p>
      </div>
    </section>
  );
}

export default TopStrip;
