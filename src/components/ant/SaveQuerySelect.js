import { Select } from "antd";
import React from "react";
import svgSheet from "../../assets/svg/svgSheet";
import svgSheet5 from "../../assets/svg/svgSheet5";

function SaveQuerySelect({
  lightMode,
  data,
  setselectd,
  defaultSelect,
  width,
  onClick,
  SaveQuery,
}) {
  const { Option } = Select;
  const handleChange = (value) => {
    setselectd(value);
  };
  return (
    <div>
      <Select
        // className={
        //   lightMode
        //     ? "br-5 border1px-light-mode"
        //     : "br-5 antd-Selete-Custom-dark  btn-bg-primary text-white"
        // }
        className={"btn-bg-primary br-3 fw-600  fs-16-14"}
        // style={{backgroundColor:"red"}}
        defaultValue={defaultSelect}
        dropdownClassName={`${!lightMode && "drop-down-stock invert-text"}`}
        getPopupContainer={(trigger) => trigger.parentNode}
        onChange={handleChange}
        onClick={onClick}
        placeholder={
          <div className="d-flex justify-content-evenly align-items-center">
            <span className="d-flex justify-content-center align-items-center">
              {svgSheet5.saveIcon}
            </span>
            <span className={lightMode ? "text-black" : "text-white"}>
              Save Query
            </span>
          </div>
        }
        style={{
          width: width,
        }}
      >
        {data.map((items, i) => (
          <Option key={i} value={items.value}>
            {items.label}{" "}
          </Option>
        ))}
      </Select>
    </div>
  );
}

export default SaveQuerySelect;
