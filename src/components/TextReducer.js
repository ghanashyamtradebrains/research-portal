import React, { useState } from "react";
import { animateScroll as scroll } from "react-scroll";

function TextReducer({data, textLimit,lightMode}) {
  const [showToggle, setshowToggle] = useState(true);
  const toggleShowBtn = () => {
    if (showToggle) setshowToggle(!showToggle);
    else {
      scroll.scrollTo(140,{duration:400,delay:0});
      setshowToggle(!showToggle);
    }
  };
  return (
    <div className="w-100 d-flex flex-col align-items-center">
      
      <div
        className=" fs-16-12 mb-0 my-20"
        dangerouslySetInnerHTML={{
          __html:
            data?.length > textLimit
              ? showToggle
                ? data?.slice(0, textLimit) + "......"
                : data
              : data,
        }}
        style={{color: lightMode ? "black" : "#E6E6E6" , opacity:"0.7"}}
      ></div>
      {data?.length > textLimit && (
        <button
          className={`br-5 ${
            lightMode
              ? "bg-white border2px-light-mode text-black"
              : "bg-dark-gray border2px-dark-mode text-white"
          }  fw-600 p-5 `}
          onClick={toggleShowBtn}
        >
          Show {showToggle ? "More" : "Less"}
        </button>
      )}
    </div>
  );
}

export default TextReducer;
