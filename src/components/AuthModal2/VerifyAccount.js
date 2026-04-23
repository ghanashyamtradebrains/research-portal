import React, { useState, useEffect, useRef } from "react";
import PortSvgLogo from "../../assets/svg/svgSheet2";
import {
  Button,
  Checkbox,
  ConfigProvider,
  DatePicker,
  Dropdown,
  Form,
  Input,
  Menu,
  Select,
} from "antd";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { googleTapRedirect } from "../../pages/api/fetchClient";
import styles from "./AuthModal.module.css";
import svgSheet from "../../assets/svg/svgSheet";
import { authStore } from "../../redux/reducers/authSlice";
import Link from "next/link";
import {
  setRedirectUrl,
  setToggleForm,
  toggleStore,
} from "../../redux/reducers/AuthToggleSlice";
import countries from "../../utilityFn/countries";
import svgSheet7 from "../../assets/svg/svgSheet7";

const Footer = ({ lightMode }) => {
  return (
    <div className="fs-s-12 mt-10">
      <p
        className="fw-500 text-align-center"
        style={{
          color: lightMode ? "#000" : "#fff",
        }}
      >
        By signing up, you have read and agreed to our{" "}
        <Link
          className={styles.create_account_link}
          href="https://portal.tradebrains.in/privacy"
        >
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link
          className={styles.create_account_link}
          href="https://portal.tradebrains.in/terms-and-conditions"
        >
          Terms & Conditions.
        </Link>
      </p>
    </div>
  );
};

const VerifyAccount = ({ lightMode }) => {
  const dispatch = useDispatch();
  // const UserAuth = useSelector(authStore);
  const { redirect } = useSelector(toggleStore);
  const navigate = useRouter();
  const [mailChimp, setmailChimp] = useState(true);
  const [apiLoader, setapiLoader] = useState(false);
  const [form] = Form.useForm();
  const [apiError, setApiError] = useState();
  const [viewToggle, setViewToggle] = useState(false);
  // OTP Related
  const [isEditing, setIsEditing] = useState(false);
  const [mobile, setMobile] = useState("9334780316");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const [selectedCountry, setSelectedCountry] = useState({
    name: "India",
    code: "+91",
    flag: "🇮🇳",
  });

  const urlState =
    navigate?.query?.redirect_url !== undefined
      ? `${navigate?.query?.redirect_url} `
      : "/";

  useEffect(() => {
    sessionStorage.setItem("Mailchimp", mailChimp);
  }, [mailChimp]);

  const onSubmit = async (values) => {
    // setapiLoader(true);
    try {
      dispatch(setToggleForm(null));

      if (navigate.asPath.startsWith("/verify-email")) {
        navigate.push("/");
      }

      if (!redirect) {
        navigate.push(navigate.asPath);
      } else {
        navigate.push(redirect);
        dispatch(setRedirectUrl(null));
      }
      setViewToggle(true);
      // setisLoginPage(false);
      // onCloseHandler("NONE");
      // });
    } catch (error) {
      if (error !== undefined) {
        const errorMsg = Object?.values(error?.response?.data);
        setApiError(errorMsg[0]);
        setapiLoader(false);
      }
    }

    // form.resetFields();
  };

  const onSubmitOtp = async (values) => {
    console.log("userval", values);

    // setapiLoader(true);
    try {
      dispatch(setToggleForm(null));

      if (navigate.asPath.startsWith("/verify-email")) {
        navigate.push("/");
      }

      if (!redirect) {
        navigate.push(navigate.asPath);
      } else {
        navigate.push(redirect);
        dispatch(setRedirectUrl(null));
      }
      setViewToggle(true);
      // setisLoginPage(false);
      // onCloseHandler("NONE");
      // });
    } catch (error) {
      if (error !== undefined) {
        const errorMsg = Object?.values(error?.response?.data);
        setApiError(errorMsg[0]);
        setapiLoader(false);
      }
    }

    // form.resetFields();
  };

  const span_text = (text) => (
    <span className={`fw-500 ${lightMode ? "text-black" : "text-white"}`}>
      {text}
    </span>
  );
  const error_text = (text) => <span className={`fs-s-12`}>{text}</span>;

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleChange = (value, index) => {
    // Allow only numbers (remove non-numeric characters)
    const numericValue = value.replace(/\D/g, "");

    if (!numericValue) return; // Prevent empty input from triggering focus shift

    const newOtp = [...otp];
    newOtp[index] = numericValue; // Set the numeric value
    setOtp(newOtp);

    // Move focus to the next box only if a number was entered
    if (numericValue && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    form.validateFields(["otp"]);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault(); // Prevent default backspace behavior
      const newOtp = [...otp];

      if (!newOtp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus(); // Move focus to the previous input
      }

      newOtp[index] = ""; // Clear the current input
      setOtp(newOtp);
    }

    form.validateFields(["otp"]);
  };

  const menu = (
    <div
      style={{
        position: "relative",
      }}
    >
      <Menu
        className="custom-dropdown-menu"
        style={{
          position: "absolute",
          maxHeight: "300px",
          minWidth: "300px",
          background: lightMode ? "white" : "#292e3f",
          overflowY: "auto",
          marginTop: "5px",
        }}
      >
        {countries.map((country) => (
          <Menu.Item
            key={country.name}
            onClick={() => setSelectedCountry(country)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: lightMode ? "black" : "white",
              background: country === selectedCountry && "#4396FD",
            }}
          >
            <div
              className="d-flex justify-content-between mt-5"
              style={{
                height: "30px",
              }}
            >
              <div className="d-flex gap-10px">
                <span>{country.flag}</span>
                <span>{country.name}</span>
                <span> ({country.code})</span>
              </div>
              <span
                style={{
                  display: selectedCountry === country ? "block" : "none",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-square-check"
                >
                  <g transform="scale(0.7) translate(5,5)">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="m9 12 2 2 4-4" />
                  </g>
                </svg>
              </span>
            </div>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );

  const continueButtonStyle = () => {
    return {
      background: "#3B3F4F",
      border: "none",
      color: lightMode ? "black" : "white",
      height: "30px",
    };
  };

  return (
    <section
      className={
        lightMode
          ? styles.action_container_verify_account_light
          : styles.action_container_verify_account
      }
    >
      {viewToggle ? (
        <div className={styles.parent_otp}>
          <span>{PortSvgLogo.PortSvgLogo_small}</span>
          <div>
            <div className="d-flex flex-col mb-40">
              <Form
                form={form}
                name="login"
                onFinish={onSubmitOtp}
                scrollToFirstError
                autoComplete="off"
              >
                <div className="flex justify-content-center">
                  <Form.Item
                    name="mobile"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your mobile number",
                      },
                      // {
                      //     pattern: /^[6-9]\d{9}$/,
                      //     message: "Enter a valid 10-digit mobile number!",
                      // },
                    ]}
                  >
                    {isEditing ? (
                      <div style={{ display: "flex", gap: "20px" }}>
                        <Input
                          type="number"
                          value={mobile}
                          maxLength={10}
                          style={{ height: "40px" }}
                          className={`w-100 ${
                            lightMode
                              ? `bg-gray email-input-login-page-light ${styles.input_autofill_light}`
                              : `bg-dark-gray email-input-login-page DatePicker-Antd-Dark-new ${styles.input_autofill_dark}`
                          } auth-form-input`}
                          onChange={(e) => setMobile(e.target.value)}
                          placeholder="Enter Mobile Number"
                          autoComplete="off"
                        />
                        <Button
                          style={{
                            paddingTop: "7px",
                          }}
                          className="w-30 ff-poppins fw-500 btn-bg-primary fw-500 br-5 h-42 text-white pointer mt-10 fs-s-12"
                          type="primary"
                          onClick={handleSave}
                        >
                          Save
                        </Button>
                      </div>
                    ) : (
                      <div className={styles.num_edit_container}>
                        <span
                          style={{
                            color: lightMode ? "black" : "white",
                          }}
                          className={styles.edit_num}
                        >
                          +91-{mobile || "No number entered"}
                        </span>
                        <span
                          className="flex gap-5px"
                          onClick={() => setViewToggle(false)}
                        >
                          <span className={styles.edit_text}>Edit</span>
                          <div className={styles.edit_pencil}>
                            {svgSheet7.edit_pencil}
                          </div>
                        </span>
                      </div>
                    )}
                  </Form.Item>
                </div>
                <span
                  className={`fw-500 text-center mb-20 ${
                    lightMode ? "text-black" : "text-white"
                  }`}
                >
                  OTP has been sent to the shared number
                </span>
                <div>
                  <Form.Item
                    name="otp"
                    className={`text-align-center ${
                      lightMode ? "light-input-login" : "dark-input-login"
                    }`}
                    rules={[
                      {
                        validator: async (_, value) => {
                          if (!value) return Promise.resolve(); // Skip if empty (handled by 'required')

                          // Call backend to validate OTP
                          try {
                            if (otp.length === 4) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("OTP must be 4 digits")
                            );
                          } catch (error) {
                            return Promise.reject(
                              new Error(
                                "OTP verification failed. Please try again later."
                              )
                            );
                          }
                        },
                      },
                      {
                        required: true,
                        message: "Please Enter the OTP",
                      },
                    ]}
                    autoComplete="off"
                  >
                    <div className={styles.otp_container}>
                      {otp.map((digit, index) => (
                        <Input
                          key={index}
                          value={digit || ""}
                          ref={(el) => (inputRefs.current[index] = el)}
                          maxLength={1}
                          autoComplete="one-time-code"
                          className={`${styles.otp_input_box} ${
                            lightMode
                              ? `bg-gray email-input-login-page-light ${styles.input_autofill_light}`
                              : `bg-dark-gray email-input-login-page DatePicker-Antd-Dark-new ${styles.input_autofill_dark}`
                          } auth-form-input`}
                          onChange={(e) => handleChange(e.target.value, index)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                      ))}
                    </div>
                  </Form.Item>
                </div>

                <p style={{ color: "red" }}>{navigate?.query?.googleerror}</p>
                {apiLoader ? (
                  <div
                    style={{ margin: "6px 0px" }}
                    className="w-100 btn-bg-primary  h-50-42 py-10 br-5 text-white center"
                  >
                    Submitting...
                  </div>
                ) : (
                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="w-30 mt-10 ff-poppins fw-600 btn-bg-primary fw-500 py-10 br-5  h-42 text-white pointer"
                    >
                      Continue
                    </button>
                  </div>
                )}
                {apiError && (
                  <div style={{ color: "#ff4d4f", textAlign: "center" }}>
                    {apiError}
                  </div>
                )}
              </Form>
            </div>
          </div>
          <Footer lightMode={lightMode} />
        </div>
      ) : (
        <div>
          <span>{PortSvgLogo.PortSvgLogo_small}</span>
          <div>
            <div className={styles.verify_account_container}>
              <span className={styles.verify_count_title}>Verify Account</span>
              <Form
                form={form}
                name="login"
                onFinish={onSubmit}
                scrollToFirstError
                autoComplete="off"
              >
                <div className={styles.pan_name_dob}>
                  <div className="flex-1">
                    <span>{span_text("Name as per PAN Card")}</span>
                    <Form.Item
                      name="name"
                      className={`${
                        lightMode ? "light-input-login" : "dark-input-login"
                      }`}
                      rules={[
                        {
                          type: "text",
                          message: "This name is not valid",
                        },
                        {
                          required: true,
                          message: error_text("Please Enter your Name"),
                        },
                      ]}
                      autoComplete="off"
                      preserve="true"
                    >
                      <Input
                        type="text"
                        className={`w-100 ${
                          lightMode
                            ? `bg-gray email-input-login-page-light ${styles.input_autofill_light}`
                            : `bg-dark-gray email-input-login-page DatePicker-Antd-Dark-new ${styles.input_autofill_dark}`
                        } auth-form-input`}
                        placeholder="Enter Full Name"
                        autoComplete="off"
                        onKeyPress={(e) => {
                          if (!/[a-zA-Z\s]/.test(e.key)) {
                            e.preventDefault(); // Block invalid characters
                          }
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="flex-1">
                    <span>{span_text("Date of Birth")}</span>
                    <Form.Item
                      name="dob"
                      className={`custom-date-picker`}
                      rules={[
                        {
                          type: "date",
                          message: "The input is not a valid date",
                        },
                        {
                          required: true,
                          message: error_text("Please Enter Date of Birth!"),
                        },
                      ]}
                      autoComplete="off"
                      preserve="true"
                    >
                      <DatePicker
                        type="text"
                        format="DD-MM-YYYY"
                        name="dob"
                        className={`w-100 ${
                          lightMode
                            ? `bg-gray email-input-login-page-light ${styles.input_autofill_light}`
                            : `bg-dark-gray email-input-login-page DatePicker-Antd-Dark-new ${styles.input_autofill_dark}`
                        } auth-form-input`}
                        placeholder="Enter Date of Birth"
                        autoComplete="datepicker"
                      />
                    </Form.Item>
                  </div>
                </div>

                <div>
                  {span_text("PAN Card No.")}
                  <Form.Item
                    name="pan_number"
                    rules={[
                      {
                        validator: (_, value) => {
                          if (!value) return Promise.resolve(); // Skip validation if empty (handled by 'required')
                          return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)
                            ? Promise.resolve()
                            : Promise.reject(
                                new Error("Enter a valid PAN number")
                              );
                        },
                      },
                      {
                        required: true,
                        message: error_text("Please input your PAN number"),
                      },
                    ]}
                    autoComplete="off"
                    preserve="true"
                    className="custom-error-message"
                    normalize={(value) => value?.toUpperCase()}
                  >
                    <Input
                      type="text"
                      // style={{
                      //     height: "40px", background: "white"
                      // }}
                      className={`w-100 ${
                        lightMode
                          ? `bg-gray email-input-login-page-light ${styles.input_autofill_light}`
                          : `bg-dark-gray email-input-login-page DatePicker-Antd-Dark-new ${styles.input_autofill_dark}`
                      } auth-form-input`}
                      placeholder="Enter PAN number"
                      autoComplete="off"
                    />
                  </Form.Item>
                </div>

                <div>
                  {span_text("Enter Mobile")}
                  <div className="flex align-items-center">
                    <div
                      className={styles.country_code}
                      style={{
                        backgroundColor: lightMode ? "#f2f2f2" : "#3B3F4F",
                        border: lightMode && "1px solid black !important",
                      }}
                    >
                      <Dropdown
                        overlay={menu}
                        trigger={["click"]}
                        placement="bottomCenter"
                        getPopupContainer={(triggerNode) =>
                          triggerNode.parentNode
                        }
                        overlayClassName="custom-country-dropdown"
                      >
                        <div>
                          <Button style={continueButtonStyle()}>
                            {selectedCountry ? (
                              <div
                                style={{
                                  display: "flex",
                                  gap: "2px",
                                  marginLeft: "-8px",
                                }}
                              >
                                <span className={styles.truncated_code}>
                                  {selectedCountry.code}
                                </span>
                              </div>
                            ) : (
                              "Select a country"
                            )}
                          </Button>
                        </div>
                      </Dropdown>
                    </div>
                    <Form.Item
                      name="mobile"
                      className={`text-align-center custom-error-message w-100 ${
                        lightMode ? "light-input-login" : "dark-input-login"
                      }`}
                      rules={[
                        {
                          validator: (_, value) => {
                            if (!value) return Promise.resolve(); // Skip validation if empty (handled by 'required')
                            return /^[6-9]\d{9}$/.test(value)
                              ? Promise.resolve()
                              : Promise.reject(
                                  new Error(
                                    "Enter a valid 10-digit mobile number!"
                                  )
                                );
                          },
                        },
                        {
                          required: true,
                          message: error_text(
                            "Please Enter your Mobile Number"
                          ),
                        },
                      ]}
                      autoComplete="off"
                      preserve
                    >
                      <Input
                        type="number"
                        style={{
                          background: lightMode ? "black" : "white",
                          borderLeft: "none !important",
                        }}
                        className={`w-100 ${
                          lightMode
                            ? `bg-gray email-input-login-page-light ${styles.input_autofill_light}`
                            : `bg-dark-gray email-input-login-page DatePicker-Antd-Dark-new ${styles.input_autofill_dark}`
                        } auth-form-input`}
                        placeholder="Enter Mobile Number"
                        autoComplete="off"
                      />
                    </Form.Item>
                  </div>
                </div>

                <p style={{ color: "red" }}>{navigate?.query?.googleerror}</p>

                <button
                  type="submit"
                  className="w-100 ff-poppins fw-600 btn-bg-primary fw-500 py-10 br-5 h-42 text-white pointer"
                >
                  Continue
                </button>

                {apiError && (
                  <div style={{ color: "#ff4d4f", textAlign: "center" }}>
                    {apiError}
                  </div>
                )}
              </Form>
            </div>
            <Footer lightMode={lightMode} />
          </div>
        </div>
      )}
    </section>
  );
};

export default VerifyAccount;
