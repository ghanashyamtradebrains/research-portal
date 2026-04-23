import { useRouter } from "next/router";
import React from "react";
import { animateScroll } from "react-scroll/modules";

function MobileSlider({ leftsidebar, setValue, lightMode, Value, offset }) {
  const navigate = useRouter();
  return (
    <div
      style={{
        height: "55px",
        zIndex: 500,
        position: "sticky",
        bottom: "0",
        width: "99%",
      }}
      className={` ${
        lightMode ? "bg-gray" : "bg-dark-gray"
      } table-shadow   details-top-card  br-5 p-5 d-flex align-items-center bt-dark-mode`}>
      <div className="overflow-x h-100  ">
        {leftsidebar?.map((items) => (
          <div
            onClick={() => {
              // setValue(items?.label)
              navigate.push(
                `/corporateactions/${items?.label?.replace(" ", "-")?.replace("/", "-")}`
              );
              animateScroll.scrollTo(offset ? offset : 110, 0);
            }}
            className="d-flex justify-content-center"
            style={{ minWidth: "100px" }}>
            <span
              style={{ minHeight: "38px" }}
              className={`${
                items.label === Value ? "" : "opacity5"
              } fs-s-12 fw-500 mr-10 text-align-center d-flex align-items-center Textcapitalize `}>
              {items?.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MobileSlider;
