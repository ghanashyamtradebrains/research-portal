import React from "react";
import { useSelector } from "react-redux";
import { getThemeMode } from "../redux/reducers/ThemeSlice";

function CustomInput({placeholder,onChange,value}) {
    const { lightMode } = useSelector(getThemeMode);
  return (
    <input
      style={{width:"100%"}}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      type="text"
      className={` h-45 br-3 p-3  ${
        lightMode ? "border1px-light-mode text-black" 
                  : "border1px-dark-mode bg-dark-gray text-white"
      }`}
    />
  );
}

export default CustomInput;
