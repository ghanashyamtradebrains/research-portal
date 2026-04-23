import React, { useState, useEffect, useRef } from "react";
import PortSvgLogo from "../../assets/svg/svgSheet";
import {
  Button,
  Checkbox,
  ConfigProvider,
  DatePicker,
  Dropdown,
  Form,
  Input,
  Menu,
  message,
  Select,
} from "antd";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  existingUserOTP,
  getUserInfo,
  googleTapRedirect,
  resendOTP,
} from "../../pages/api/fetchClient";
import styles from "./AuthModal.module.css";
import svgSheet from "../../assets/svg/svgSheet";
import {
  authStore,
  setAuth,
  updateAccessToken,
} from "../../redux/reducers/authSlice";
import Link from "next/link";
import {
  setRedirectUrl,
  setToggleForm,
  toggleStore,
} from "../../redux/reducers/AuthToggleSlice";
import countries from "../../utilityFn/countries";
import {
  otpResend,
  otpVerify,
  updateMobileNumber,
} from "../../actions/Login.actions";
import { DownOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import {
  setLoginTime,
  setSessionTime,
} from "../../redux/reducers/loginTimeSlice";
import { resetWatchlistArr } from "../../redux/reducers/watchListSlice";
import useWindowWidth from "../../utilityFn/getWindowWidth";
import svgSheet7 from "../../assets/svg/svgSheet7";
import { Turnstile } from "next-turnstile";

const Footer = ({ lightMode, userLogout }) => {
  return (
    <div className="fs-s-12 mt-20">
      <p
        className="fw-500 text-align-center"
        style={{
          color: "#fff",
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
      <span
        onClick={userLogout}
        className="fs-s-14 fw-500 text-center cursor-pointer"
        style={{
          color: "#c2c2c2",
        }}
      >
        Logout
      </span>
    </div>
  );
};

const VerifyMobile = ({ lightMode }) => {
  const dispatch = useDispatch();
  const UserAuth = useSelector(authStore);
  const navigate = useRouter();
  const [mailChimp, setmailChimp] = useState(true);
  const [apiLoader, setapiLoader] = useState(false);
  const [form] = Form.useForm();
  const [apiError, setApiError] = useState();
  const windowWidth = useWindowWidth();
  // OTP Related
  const [isEditing, setIsEditing] = useState(false);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [viewToggle, setViewToggle] = useState(false);
  const [savedMobile, setSavedMobile] = useState("");
  const loginTime = new Date();

  const [resendEnabled, setResendEnabled] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [editMobileCount, setEditMobileCount] = useState(0);
  const [wrongOtpCount, setWrongOtpCount] = useState(0);

  const [selectedCountry, setSelectedCountry] = useState({
    name: "India",
    code: "+91",
    flag: "🇮🇳",
  });

  // Turnstile code
  const [turnsTileToken, setTurnstileToken] = useState(null);

  const urlState =
    navigate?.query?.redirect_url !== undefined
      ? `${navigate?.query?.redirect_url} `
      : "/";

  useEffect(() => {
    sessionStorage.setItem("Mailchimp", mailChimp);
  }, [mailChimp]);

  const onSubmit = async (values) => {
    if (editMobileCount >= 4) {
      message.error({
        content: "Too many update attempts.",
      });
      return;
    }

    // setapiLoader(true);
    try {
      const numWithCode = selectedCountry.code + values.mobile;
      await existingUserOTP({
        phone_number: numWithCode,
        turnstileToken: turnsTileToken,
      })
        .then((res) => {
          setApiError("");
          if (res) {
            setViewToggle(true);
            message.success({
              content: "OTP Sent Successfully",
            });
          } else {
            throw new Error();
          }
          setViewToggle(true);
        })
        .catch((error) => {
          if (error !== undefined) {
            console.error("error_msg", error);
            // const errorMsg = error?.response?.data;
            // const firstKey = Object.keys(errorMsg)[0];
            setApiError("Phone number already verified!");
            // setapiLoader(false);
          }
        });
      // const res = await updateMobileNumber(numWithCode);
      // if (res) {
      // throw new Error();
      // } else {
      //   message.error({
      //     content: "Invalid phone number",
      //   });
      // }
      // setapiLoader(false);
    } catch (error) {
      // if (error !== undefined) {
      //   const errorMsg = error?.response?.data;
      //   const firstKey = Object.keys(errorMsg)[0];
      //   setApiError({ error: errorMsg[firstKey] });
      //   // setapiLoader(false);
      // }
    }
    setSavedMobile(selectedCountry.code + values.mobile);
    setEditMobileCount((prev) => prev + 1);
    // form.resetFields();
  };

  const span_text = (text) => (
    <span className={`fw-500 ${lightMode ? "text-black" : "text-white"}`}>
      {text}
    </span>
  );
  const error_text = (text) => <span>{text}</span>;

  const menu = (
    <div className="relative">
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

  // const label_text = (text) => (
  //   <span
  //     className={`fs-s-14 ${lightMode ? "text-black" : "text-white"} fw-500`}
  //   >
  //     {text}
  //   </span>
  // );

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
        newOtp[index - 1] = "";
        inputRefs.current[index - 1]?.focus(); // Move focus to the previous input
      }

      newOtp[index] = ""; // Clear the current input
      setOtp(newOtp);
    }

    form.validateFields(["otp"]);
  };

  const onSubmitOtp = async () => {
    if (wrongOtpCount >= 4) {
      message.error({
        content: "Max tries exceeded",
      });
      return;
    }

    Cookies.set("register_mobile", savedMobile);
    setapiLoader(true);
    try {
      if (otp.join("").length === 6) {
        const payload = {
          phone_number: savedMobile,
          otp: otp.join(""),
          turnstileToken: turnsTileToken,
        };
        let res = await otpVerify(payload);
        // dispatch(setToggleForm(null));

        form.resetFields();
        setOtp(["", "", "", "", "", ""]);
        if (res?.data?.message === "OTP Verified Successfully") {
          message.success({
            content: "Mobile Verified Successfully",
          });
          dispatch(setToggleForm(null));
          await getUserInfo().then((res) => {
            Cookies.set("start_session", loginTime);
            Cookies.set("login_time", loginTime, {
              expires: 180,
              path: "/", // always recommended
              secure: false, // should be false for localhost
              sameSite: "Lax", // optional, good default
            });
            Cookies.set("ptl_access_token", res?.data?.access_token, {
              expires: 2,
              secure: true,
              sameSite: "Lax",
            });
            Cookies.set("refresh_token", res?.data?.refresh_token, {
              expires: 180,
              secure: true,
              sameSite: "Lax",
            });
            dispatch(setAuth(res?.data));
            dispatch(setLoginTime(loginTime));
            dispatch(setSessionTime(loginTime));
          });
        } else {
          message.error({
            content: "OTP not valid. Please try again!",
          });
          setWrongOtpCount((prev) => prev + 1);
        }
      } else {
        message.error({
          content: "Invalid OTP Format",
        });
      }
    } catch (error) {
      message.error({
        content: "Something went wrong!",
      });
    }
    setapiLoader(false);
    setResendEnabled(true);
  };

  const handleResendOTP = async () => {
    if (btnDisabled) return;

    setResendEnabled(false); // Disable the button
    setTimeout(() => setResendEnabled(true), 90000); // Enable after 1.5 min
    setapiLoader(true);
    try {
      let res = await resendOTP({ phone_number: savedMobile });
    } catch (error) {
      if (error?.response?.status) {
        setResendEnabled(false);
        setBtnDisabled(true);
      }
      setApiError(error?.response?.data?.response);
    }
    setapiLoader(false);
  };

  const userLogout = () => {
    dispatch(setAuth({}));
    dispatch(updateAccessToken());
    dispatch(resetWatchlistArr());
    dispatch(setSessionTime());
    dispatch(setLoginTime());
    dispatch(setToggleForm(null));
    Cookies.remove("ptl_access_token");
    Cookies.remove("login_time");
    Cookies.remove("start_session");
    navigate.push("/");
  };

  // console.log("turnstileToken_verifymobile", turnsTileToken);

  return (
    <section
      className={
        lightMode
          ? styles.action_container_verify_phone_light
          : styles.action_container_verify_phone
      }
    >
      {viewToggle ? (
        <div className={styles.parent_otp}>
          <div>
            <div className="d-flex flex-col">
              <Form
                form={form}
                name="login"
                onFinish={onSubmitOtp}
                scrollToFirstError
                autoComplete="off"
              >
                <div className="flex justify-content-center mt-60">
                  <Form.Item name="mobile">
                    <div className={styles.num_edit_container}>
                      <span
                        style={{
                          color: "white",
                        }}
                        className={styles.edit_num}
                      >
                        {savedMobile || "No number entered"}
                      </span>
                      <span
                        className="flex gap-5px"
                        onClick={() => {
                          setIsEditing(true);
                          setViewToggle(false);
                        }}
                      >
                        <span className={styles.edit_text}>Edit</span>
                        <div className={styles.edit_pencil}>
                          {svgSheet7.edit_pencil}
                        </div>
                      </span>
                    </div>
                    {/* )} */}
                  </Form.Item>
                </div>
                <span className={`fw-500 text-center mb-20 text-white`}>
                  Enter OTP Received on Mobile Number
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
                            if (otp.length === 6) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("OTP must be 6 digits")
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
                      {otp?.map((digit, index) => (
                        <input
                          key={index}
                          value={digit || ""}
                          ref={(el) => (inputRefs.current[index] = el)}
                          maxLength={1}
                          autoComplete="one-time-code"
                          type="tel" // Ensures numeric keypad on mobile
                          inputMode="numeric" // Forces number keypad
                          pattern="[0-9]*" // Helps with numeric input on iOS
                          className={`ff-lato ${styles.otp_input_box} ${
                            lightMode
                              ? `bg-gray email-input-login-page-light ${styles.input_autofill_light}`
                              : `email-input-login-page DatePicker-Antd-Dark-new ${styles.input_autofill_dark}`
                          } auth-form-input`}
                          onChange={(e) => handleChange(e.target.value, index)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                      ))}
                    </div>
                  </Form.Item>
                </div>

                {resendEnabled && (
                  <span
                    className="text-center fw-500 cursor-pointer"
                    style={{
                      color: "#6DB8FD",
                    }}
                    onClick={handleResendOTP}
                  >
                    Resend OTP
                  </span>
                )}

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
                      className="w-60 mt-10 ff-poppins fw-600 btn-bg-primary fw-500 py-10 br-5  h-42 text-white pointer"
                      style={{
                        cursor: btnDisabled && "not-allowed",
                      }}
                      disabled={btnDisabled}
                    >
                      Continue
                    </button>
                  </div>
                )}
                {apiError && (
                  <div className={styles.api_error_verify_mobile}>
                    {apiError}
                  </div>
                )}
              </Form>
            </div>
          </div>
          <Footer lightMode={lightMode} userLogout={userLogout} />
        </div>
      ) : (
        <div className={styles.parent_otp}>
          <div>
            <div className="d-flex flex-col mt-80">
              <Form
                form={form}
                name="login"
                onFinish={onSubmit}
                scrollToFirstError
                autoComplete="off"
              >
                <div className="flex flex-col justify-content-center">
                  <span
                    className="fs-s-16 fw-700 mb-10"
                    style={{
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Update Mobile Number
                  </span>
                  <div className="flex gap-10px w-100">
                    <div
                      className={`${styles.country_code}`}
                      style={{
                        marginTop: "7px",
                        backgroundColor: lightMode ? "#f2f2f2" : "#3B3F4F",
                        border: lightMode
                          ? "1px solid rgb(90, 90, 90)"
                          : "1px solid rgb(39, 39, 39)",
                      }}
                    >
                      <div
                        className="d-flex align-items-center text-center"
                        style={{
                          color: lightMode ? "black" : "white",
                        }}
                      >
                        <span className={styles.truncated_code}>+91</span>
                      </div>
                    </div>
                    <div className="mobile-input-verify-phone">
                      <Form.Item
                        name="mobile"
                        rules={[
                          {
                            required: true,
                            message: error_text(
                              "Please enter your mobile number"
                            ),
                          },
                          {
                            pattern: /^[6-9]\d{9}$/,
                            message: error_text(
                              "Enter a valid 10-digit mobile number!"
                            ),
                          },
                        ]}
                      >
                        <Input
                          type="text"
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
                      </Form.Item>
                    </div>
                  </div>
                </div>

                {resendEnabled && (
                  <span
                    className="text-center fw-500 cursor-pointer"
                    style={{
                      color: "#6DB8FD",
                    }}
                    onClick={handleResendOTP}
                  >
                    Resend OTP
                  </span>
                )}

                {navigate?.query?.googleerror && (
                  <p style={{ color: "red" }}>{navigate?.query?.googleerror}</p>
                )}

                {apiError && <div className={styles.api_error}>{apiError}</div>}

                <div className="flex justify-content-center mb-10">
                  <Turnstile
                    siteKey="0x4AAAAAABvsMMlYZmQzE_Up"
                    // "{process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}"
                    onVerify={(token) => {
                      console.log("Verified token:", token);
                      setTurnstileToken(token);
                    }}
                    onExpire={() => {
                      console.log("Turnstile expired");
                      setTurnstileToken(null);
                    }}
                    onError={(err) => {
                      console.error("Turnstile error:", err);
                      setTurnstileToken(null);
                    }}
                    options={{
                      theme: "dark",
                      size: "normal",
                    }}
                  />
                </div>

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
                      className="w-100 btn-auth mt-10 ff-poppins fw-600 btn-bg-primary fw-500 py-10 br-5  h-42 text-white pointer"
                      disabled={!turnsTileToken}
                    >
                      Continue
                    </button>
                  </div>
                )}
              </Form>
            </div>
          </div>
          <Footer lightMode={lightMode} userLogout={userLogout} />
        </div>
      )}
    </section>
  );
};

export default VerifyMobile;
