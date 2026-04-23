import React, { useState, useRef } from "react";
import PortSvgLogo from "../../assets/svg/svgSheet2";
import { Form, Input, message } from "antd";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import styles from "./AuthModal.module.css";
import { redGreenColorPicker } from "../../utilityFn/redGreenColor";
import { resendOTP, reverifyUser } from "../../pages/api/fetchClient";
import Link from "next/link";
import {
  setToggleForm,
  toggleStore,
} from "../../redux/reducers/AuthToggleSlice";
import { otpVerify } from "../../actions/Login.actions";
import Cookies from "js-cookie";
import svgSheet7 from "../../assets/svg/svgSheet7";
import { Turnstile } from "next-turnstile";

const Footer = ({ lightMode }) => {
  return (
    <div className="fs-s-12 mt-10">
      <p
        className="fw-500 text-align-center"
        style={{
          color: lightMode ? "#000" : "#fff",
        }}
      >
        By signing up, you have read and agreed to our
        <Link
          className={styles.create_account_link}
          href={"https://portal.tradebrains.in/privacy"}
        >
          Privacy Policy
        </Link>{" "}
        and
        <Link
          className={styles.create_account_link}
          href={"https://portal.tradebrains.in/terms-and-conditions"}
        >
          Terms & Conditions.
        </Link>
      </p>
    </div>
  );
};

const ForgotPassword = ({ googleLogin, setGoogleLogin, lightMode }) => {
  const { toggleForm } = useSelector(toggleStore);
  const dispatch = useDispatch();

  const [resetMail, setresetMail] = useState(false);
  const navigate = useRouter();
  // const [mailChimp, setmailChimp] = useState(true);
  // const [apiLoader, setapiLoader] = useState(false);
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [apiError, setApiError] = useState();
  // const [isForgetPassword, setisForgetPassword] = useState(false);
  // const [apiError1, setapiError1] = useState({});
  // const [isReferral, setIsReferral] = useState(false);
  const [Loading1, setLoading1] = useState(false);
  const [ForgotValidation, setForgotValidation] = useState();
  const [hasError, setHasError] = useState(false);
  const [viewToggle, setViewToggle] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [isEditing, setIsEditing] = useState(false);
  const [savedMobile, setSavedMobile] = useState("");
  const [apiLoader, setapiLoader] = useState(false);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [wrongOtpCount, setWrongOtpCount] = useState(0);

  const [turnsTileToken, setTurnstileToken] = useState(null);

  const handlePasswordReset = async (value) => {
    setSavedMobile("+91" + value.mobile);
    try {
      const payload = {
        phone: "+91" + value.mobile,
        turnstileToken: turnsTileToken,
      };

      await reverifyUser(payload).then((res) => {
        if (res) {
          setViewToggle(true);
          message.success("OTP sent successfully");
        }
      });
      setApiError("");
      setTurnstileToken(null);
    } catch (error) {
      setApiError(error?.response?.data?.error);
    }
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
          dispatch(setToggleForm("create_password"));
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
      // if (error !== undefined) {
      //     const errorMsg = Object?.values(error?.response?.data);
      //     setApiError(errorMsg[0]);
      // }
      alert("errorMsg");
    }
    setapiLoader(false);
    setResendEnabled(true);
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
        newOtp[index - 1] = "";
        inputRefs.current[index - 1]?.focus(); // Move focus to the previous input
      }

      newOtp[index] = ""; // Clear the current input
      setOtp(newOtp);
    }

    form.validateFields(["otp"]);
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

  // console.log("turnstileToken_forgot", turnsTileToken);

  return (
    <section
      className={
        lightMode ? styles.action_container_light : styles.action_container
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
                  <Form.Item name="mobile">
                    <div className={styles.num_edit_container}>
                      <span
                        style={{
                          color: lightMode ? "black" : "white",
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
                <span
                  className={`fw-500 text-center mb-20 ${
                    lightMode ? "text-black" : "text-white"
                  }`}
                >
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
                      {otp.map((digit, index) => (
                        <Input
                          key={index}
                          value={digit || ""}
                          ref={(el) => (inputRefs.current[index] = el)}
                          maxLength={1}
                          autoComplete="one-time-code"
                          type="tel" // Ensures numeric keypad on mobile
                          inputMode="numeric" // Forces number keypad
                          pattern="[0-9]*" // Helps with numeric input on iOS
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
                  <div
                    style={{
                      color: "#ff4d4f",
                      textAlign: "center",
                      marginTop: "10px",
                    }}
                  >
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
            <div className={styles.parent_reset}>
              <Form
                autoComplete="off"
                form={form}
                name="login"
                onFinish={handlePasswordReset}
                scrollToFirstError
              >
                <div className="mt-60">
                  <span
                    className="fw-500"
                    style={{
                      color: lightMode ? "black" : "white",
                    }}
                  >
                    Enter Your Mobile No.
                  </span>
                  <div className="flex justify-content-between">
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
                        style={{
                          display: "flex",
                          alignItems: "center",
                          textAlign: "center",
                          color: lightMode ? "black" : "white",
                        }}
                      >
                        <span className={styles.truncated_code}>+91</span>
                      </div>
                    </div>
                    <Form.Item
                      name="mobile"
                      className={`w-100 ${
                        lightMode ? "light-input-login" : "dark-input-login"
                      }`}
                      rules={[
                        {
                          validator: (_, value) => {
                            if (!value)
                              return Promise.reject(
                                "Please enter your Mobile Number!"
                              );
                            const mobileRegex = /^[6-9]\d{9}$/; // 10-digit number starting with 6-9

                            if (mobileRegex.test(value)) {
                              return Promise.resolve();
                            }

                            return Promise.reject(
                              "Enter a valid mobile number!"
                            );
                          },
                        },
                      ]}
                      autoComplete="off"
                    >
                      <input
                        type="text"
                        className={`ff-lato ${
                          lightMode
                            ? `bg-gray email-input-login-page-light ${styles.input_autofill_light}`
                            : `bg-dark-gray email-input-login-page ${styles.input_autofill_dark}`
                        } auth-form-input`}
                        placeholder="Mobile"
                        autoComplete="off"
                      />
                    </Form.Item>
                  </div>
                </div>
                <p style={{ color: redGreenColorPicker(-1, lightMode) }}>
                  {ForgotValidation && ForgotValidation}
                </p>

                <div
                  className="flex justify-content-center mb-10"
                  style={{
                    marginTop: "10px",
                  }}
                >
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
                      size: "compact",
                    }}
                  />
                </div>

                {Loading1 ? (
                  <div className="w-100 btn-bg-primary py-10 br-5 text-white center">
                    Sending....
                  </div>
                ) : (
                  !resetMail && (
                    <div>
                      <button
                        type="submit"
                        className="w-100 btn-auth btn-bg-primary fw-500 py-10 br-5 text-white pointer"
                        disabled={!turnsTileToken}
                      >
                        Continue
                      </button>
                    </div>
                  )
                )}
                {apiError && (
                  <div
                    style={{
                      color: "#ff4d4f",
                      textAlign: "center",
                      marginTop: "10px",
                    }}
                  >
                    {apiError}
                  </div>
                )}
              </Form>

              <span
                onClick={() => dispatch(setToggleForm("login"))}
                className={styles.back_login_btn}
              >
                Back to Login
              </span>

              <div className={`fs-s-12 ${!resetMail && "text-center"}`}>
                <button
                  // onClick={googleSignUp}
                  style={{ margin: "6px 0px", background: "transparent" }}
                  className={`flex fs-s-14 ${
                    lightMode
                      ? styles.btn_light
                      : `${styles.btn_dark} text-white`
                  } justify-content-center gap-10px w-100 ff-poppins fw-600 py-10 br-5  h-42  pointer`}
                >
                  {svgSheet7.google_icon}
                  <span>Login with Google</span>
                </button>
                <p
                  className="mt-20 fw-500"
                  style={{
                    color: lightMode ? "#000" : "#fff",
                  }}
                >
                  <div className="flex text-center mb-20">
                    <span>
                      New User?
                      <span
                        className={styles.create_account_link}
                        onClick={() => {
                          dispatch(setToggleForm("register"));
                          setGoogleLogin(false);
                        }}
                      >
                        Create an account
                      </span>
                    </span>
                  </div>
                  <div>
                    By signing up, you have read and agreed to our
                    <Link
                      className={styles.create_account_link}
                      href={"https://portal.tradebrains.in/privacy"}
                    >
                      Privacy Policy
                    </Link>{" "}
                    and
                    <Link
                      className={styles.create_account_link}
                      href={
                        "https://portal.tradebrains.in/terms-and-conditions"
                      }
                    >
                      Terms & Conditions.
                    </Link>
                  </div>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ForgotPassword;
