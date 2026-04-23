import React from "react";
import { useSelector } from "react-redux";
import { getThemeMode } from "../../redux/reducers/ThemeSlice";

function NoDataAnima({ text }) {
  const { lightMode } = useSelector(getThemeMode);
  return (
    <div className="w-100">
      <div
        style={{ paddingTop: text ? "150px" : "20px", paddingBottom: "40px" }}
      >
        <div>
          <div style={{ width: "auto", height: "140px" }}>
            <dotlottie-player
              src="https://lottie.host/86b2d799-1b5c-466a-9320-fb5b763c219b/amvKMZHtJ4.json"
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
            <p
              className={`fs-14 pt-10 fw-500 text-align-center mb-20 ${
                lightMode ? "text-dark-gray" : "clr-text-too-light-gray "
              } `}
            >
              {text ? text : "No Research Report"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoDataAnima;
