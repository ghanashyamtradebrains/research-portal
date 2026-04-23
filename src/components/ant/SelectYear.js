import { Select } from "antd";
import React from "react";

function SelectYear({
  lightMode,
  data,
  setselectd,
  defaultSelect,
  width,
  height,
  history,
}) {
  const { Option } = Select;
  const handleChange = (value) => {
    setselectd(value);
  };
  return (
    <div>
      <Select
        className={`${
          lightMode
            ? "br-5 border1px-light-mode"
            : "br-5 antd-Selete-Custom-dark border1px-dark-mode"
        } d-flex justify-content-center align-items-center`}
        defaultValue={defaultSelect}
        dropdownClassName={`${!lightMode && "drop-down-stock invert-text"}`}
        getPopupContainer={(trigger) => trigger.parentNode}
        onChange={handleChange}
        placeholder="Select Option"
        style={{
          width: width,
          height: height,
        }}
      >
        {data?.map((items, i) => (
          <Option key={i} value={history ? items.value : items}>
            {history ? items.label : items}
          </Option>
        ))}
      </Select>
    </div>
  );
}

export default SelectYear;
