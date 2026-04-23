import { Select } from "antd";
import { useRouter } from "next/router";
import React from "react";

function SelectOptions({
  lightMode,
  data,
  setselectd,
  defaultSelect,
  width,
  portfolio,
  share,
  newPortfolio,
  selected,
  payment,
}) {
  const router = useRouter();
  const { Option } = Select;
  const handleChange = (value) => {
    setselectd(value);
    if (payment) {
      router.push(`/getpremium/summary/${value}`);
    }
  };
  return (
    <div>
      <Select
        value={
          portfolio
            ? data?.find((item) => item.id === selected)?.name
            : undefined
        }
        className={
          lightMode
            ? "br-5 border1px-light-mode"
            : "br-5 antd-Selete-Custom-dark border1px-dark-mode"
        }
        // defaultValue={defaultSelect}
        dropdownClassName={`${!lightMode && "drop-down-stock invert-text"}`}
        getPopupContainer={(trigger) => trigger.parentNode}
        onChange={handleChange}
        placeholder={
          portfolio
            ? data[0]?.name
            : share
            ? data && data[0]?.label
            : payment
            ? "Choose Plan"
            : "Select Option"
        }
        style={{
          width: width,
        }}
      >
        {data?.map((items, i) => (
          <Option key={i} value={portfolio ? items?.id : items.value}>
            {portfolio ? items?.name : items.label}
          </Option>
        ))}
      </Select>
    </div>
  );
}

export default SelectOptions;
