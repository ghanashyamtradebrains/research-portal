import React from "react";
import svgSheet from "../../assets/svg/svgSheet3";

function ImgWithUpload({ curentImg, lightMode, onUpload, onLoading }) {
  return (
    <div className="relative" style={{ width: "200px", height: "200px" }}>
      <img
        style={{ opacity: onLoading !== 0 ? 0.2 : 1 }}
        src={curentImg}
        className="w-100 h-100 br-50"
        alt="pro-upload"
      />
      <div
        style={{ width: "60px", height: "60px", bottom: 0, right: 0 }}
        className={`absolute br-50 pointer ${
          lightMode ? "bg-table-data" : "bg-dark-gray"
        }`}
      >
        <label
          style={{ width: "60px", height: "60px" }}
          htmlFor="file"
          className="d-flex div-items-center pointer"
        >
          {svgSheet.cameraIcon}
        </label>
        <input
          onChange={onUpload}
          style={{ opacity: 0, width: "10px" }}
          type="file"
          name="file"
          id="file"
        />
      </div>
    </div>
  );
}

export default ImgWithUpload;
