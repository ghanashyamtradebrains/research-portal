import { Form, Input } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { getThemeMode } from "../../redux/reducers/ThemeSlice";

function AntFormInput({ label, name,disabled=false, placeholder,className, rules, addonBefore = "",type="text",isUpperCase }) {
  const { lightMode } = useSelector(getThemeMode);

  return (
    <>
      <Form.Item 
        label={label}
        style={{ margin: "0px 0px 10px 0px",display:'block' }}
        name={name}
        className={`${className}    ${lightMode ? "light-input-login" : "dark-input-login"}`}
        rules={rules}
      >
        <Input
        onInput={e =>{
          if(isUpperCase){
            e.target.value = e.target.value.toUpperCase()
          }
          else{
           return e.target.value
          }
          }
        } 
        disabled={disabled}
          addonBefore={addonBefore}
          type={type}
          className={`w-100 h-40px auth-form-input  ${
            lightMode
              ? "bg-gray email-input-login-page-light input-with-beforeFeild "
              : "bg-dark-gray email-input-login-page"
          }`}
          placeholder={placeholder}
        />
      </Form.Item>
    </>
  );
}

export default AntFormInput;
