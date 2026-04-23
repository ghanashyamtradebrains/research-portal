import React, { useCallback } from "react";

function TimeLineButtons({ data, value, setValue, lightMode }) {
  const btnClolor = useCallback(
    (item) => {
      if (lightMode) {
        if (value === item) {
          // return { color: "white", backgorund: "#3B3F4F" };
          return {
            color: "white",
            backgorund:
              "linear-gradient(90.15deg, #6DB8FD 0.17%, #1774FF 104.9%)",
          };
        } else {
          // return { color: "black", backgorund: "#C9D7DE" };
          return { color: "black", backgorund: "#F2F6F8" };
        }
      } else {
        if (value === item) {
          return {
            color: "white",
            backgorund:
              "linear-gradient(90.15deg, #6DB8FD 0.17%, #1774FF 104.9%)",
          };
        } else {
          return { color: "white", backgorund: "#3B3F4F" };
        }
      }
    },
    [value, lightMode]
  );
  return (
    <div className="pointer">
      {data?.map((item, i) => {
        const { color, backgorund } = btnClolor(item.value);
        return (
          <span
            key={i}
            onClick={() => setValue(item.value)}
            style={{
              marginRight: "10px",
              color: color,
              marginTop: "5px",
              transition: "background .5s",
              background: backgorund,
              paddingTop: "5px",
              paddingBottom: "5px",
            }}
            className={`px-10px br-3 `} 
          >
            {item?.label}
          </span>
        );
      })}
    </div>
  );
}

export default TimeLineButtons;
