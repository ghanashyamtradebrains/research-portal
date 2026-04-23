import { Cascader } from "antd";
import React, { useMemo } from "react";
import { urlEncode } from "../../../utilityFn/urlEncode";
import { useRouter } from "next/router";

function GainersandlosersSeoDropdown({ lightMode, data, navigate,activeValue ,url,activeDuration}) {
  const dropdownData = useMemo(() => {
    return data?.map((index) => {
      return {
        value: index.symbol,
        label: index.name,
      };
    });
  }, [data]);
  const onChange = (value, selectedOptions) => {
    if (Array.isArray(value)) {
      const encodeStr=urlEncode(value[0])
      navigate.replace(`/${url}/${encodeStr}/${activeDuration}`);
    }
  };

  const filter = (inputValue, path) =>
    path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  return (
    <div>
      <Cascader
        style={{ width: "340px" }}
        value={activeValue}
        className={
          lightMode
            ? "border1px-light-mode"
            : "border1px-dark-mode antd-Selete-Custom-dark  "
        }
        options={dropdownData}
        onChange={onChange}
        placeholder="Select Sector"
        showSearch={{
          filter,
        }}
        onSearch={(value) => console.log(value)}
        dropdownClassName={`${!lightMode && " invert-text dark-ant-cascader "}`}
        allowClear={false}
      />
    </div>
  );
}

export default GainersandlosersSeoDropdown;
