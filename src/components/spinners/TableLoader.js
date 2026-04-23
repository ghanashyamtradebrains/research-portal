import React from "react";
import { useSelector } from "react-redux";
import { getThemeMode } from "../../redux/reducers/ThemeSlice";

function TableLoader({ financial, isWatchlist }) {
  const { lightMode } = useSelector(getThemeMode);
  return (
    <div style={{ height: financial && "890px" }}>
      <div style={{ width: isWatchlist ? "300px" : "auto", height: "250px" }}>
        <dotlottie-player
          src="https://lottie.host/a7910c62-1df7-4f18-b171-31c77cd3029b/jv7t4FYvuU.json"
          background="transparent"
          speed="1"
          style={{
            direction: "1",
            playMode: "normal",
            alignItem: "center",
            justifyContent: "center",
          }}
          loop
          autoplay
        ></dotlottie-player>
      </div>
    </div>
  );
}

export default TableLoader;
