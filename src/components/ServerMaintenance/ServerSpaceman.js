import React from "react";
import { getThemeMode } from "../../redux/reducers/ThemeSlice";
import { useSelector } from "react-redux";

function ServerSpaceman() {
  const { lightMode } = useSelector(getThemeMode);
  return (
    <div className="w-100">
      <div>
        <div style={{ width: "auto", height: "350px" }}>
          <dotlottie-player
            src="https://lottie.host/51233a13-faef-4a23-8bc7-206e2ce23596/BUgskj7FHh.json"
            background="transparent"
            speed="1"
            style={{
              width: "100%",
              height: "100%",
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
    </div>
  );
}

export default ServerSpaceman;
