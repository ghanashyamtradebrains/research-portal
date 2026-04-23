import React, { useState, useEffect, useRef } from "react";
import PortSvgLogo from "../../assets/svg/svgSheet2";
import { Button, Checkbox, Dropdown, Form, Input, Menu, message } from "antd";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  editPhoneNumber,
  getServerMaintenance,
  googleTapRedirect,
  newUserSignUp,
  postMailChimp,
  postReferAPI,
  postSignupData,
  resendOTP,
  reverifyUser,
} from "../../pages/api/fetchClient";
import styles from "./AuthModal.module.css";
import svgSheet from "../../assets/svg/svgSheet";
import Link from "next/link";
import {
  setToggleForm,
  toggleStore,
} from "../../redux/reducers/AuthToggleSlice";
import useWindowWidth from "../../utilityFn/getWindowWidth";
import countries from "../../utilityFn/countries";
import { otpResend, otpVerify } from "../../actions/Login.actions";
import Cookies from "js-cookie";
import svgSheet7 from "../../assets/svg/svgSheet7";
import { Turnstile } from "next-turnstile";

const Footer = () => {
  return (
    <div className={styles.footer_tnc}>
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
    </div>
  );
};

const RegisterForm = ({ googleLogin, setGoogleLogin, lightMode }) => {
  const { redirect } = useSelector(toggleStore);
  const [resetMail, setresetMail] = useState(false);
  const navigate = useRouter();
  const [mailChimp, setmailChimp] = useState(true);
  const [LoginOrSignup, setLoginOrSignup] = useState("Sign Up");

  const { refer } = navigate.query;
  const [apiLoader, setapiLoader] = useState(false);
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const dispatch = useDispatch();
  const [apiError, setApiError] = useState();
  const [apiError1, setapiError1] = useState({});
  const [isReferral, setIsReferral] = useState(false);
  const windowWidth = useWindowWidth();
  const [hasError, setHasError] = useState(false);
  const [viewToggle, setViewToggle] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [isEditing, setIsEditing] = useState(false);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [wrongOtpCount, setWrongOtpCount] = useState(0);

  const [selectedCountry, setSelectedCountry] = useState({
    name: "India",
    code: "+91",
    flag: "🇮🇳",
  });

  const [savedMobile, setSavedMobile] = useState("");

  // Turnstile Code
  const [turnsTileToken, setTurnstileToken] = useState(null);

  const urlState =
    navigate.query.redirecturl !== undefined
      ? `${navigate.query.redirecturl}`
      : "/";
  const googleSignUp = () => {
    if (maintenanceData === true) {
      setOpenModelMaintenance(true);
    } else {
      const url = googleTapRedirect(urlState);
      window.location.href = url;
      sessionStorage.setItem("Mailchimp", mailChimp);
    }
    dispatch(setToggleForm(null));
  };

  useEffect(() => {
    sessionStorage.setItem("Mailchimp", mailChimp);
  }, [mailChimp]);
  useEffect(() => {
    if (refer !== undefined) {
      sessionStorage.setItem("referID", refer);
    }
  }, [navigate.query]);
  const onEmailClick = () => {
    if (maintenanceData === true) {
      setOpenModelMaintenance(true);
    } else {
      // navigate.query.person = true;

      // navigate.push(navigate);
      setGoogleLogin("register");
    }
  };
  const [maintenanceData, setMaintenanceData] = useState(false);
  const [openModelMaintenance, setOpenModelMaintenance] = useState(false);
  const getData = async () => {
    await getServerMaintenance().then((resp) => {
      setMaintenanceData(resp?.data?.under_maintenance);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const onSubmitSignup = async (values) => {
    const { name, email, mobile } = values;
    const values2 = {
      name,
      email: email?.toLowerCase(),
      phone: "+91" + mobile,
      turnstileToken: turnsTileToken,
    };

    const editPayload = {
      prev_phone: savedMobile,
      phone: "+91" + mobile,
      turnstileToken: turnsTileToken,
    };

    setapiLoader(true);
    try {
      if (isEditing) {
        const res = await editPhoneNumber(editPayload);
        setSavedMobile("+91" + mobile);
        setapiLoader(false);
        message.success("Phone number updated successfully");
        setViewToggle(true);
      } else {
        await newUserSignUp(values2).then(async (resp) => {
          // if(resp)
          // User created and password not set verify number to set password
          if (mailChimp) {
            postMailChimp(values.email?.toLowerCase()).then(() => {});
          }

          const referID = sessionStorage.getItem("referID");

          if (referID) {
            await postReferAPI(referID, values.email?.toLowerCase())
              .then(() => {
                sessionStorage.removeItem("referID");
              })
              .catch(() => null);
          } else if (values.Referral) {
            await postReferAPI(values.Referral, values.email?.toLowerCase())
              .then(() => {})
              .catch(() => null);
          }
          setViewToggle(true);
          setapiError1({ success: resp?.data?.detail });
          setapiLoader(false);
        });
      }

      setTurnstileToken(null);
      // if (redirect) navigate.push(redirect)
    } catch (error) {
      console.error("signup_issue", error?.response?.data);
      const errorMsg = error?.response?.data;
      const firstKey = Object.keys(errorMsg)[0];
      const secondKey = Object.keys(errorMsg)[1];
      setapiError1({ error: errorMsg[firstKey] });

      if (
        errorMsg[firstKey] !=
          "User created and password not set verify number to set password" ||
        errorMsg[secondKey] !=
          "User created and password not set verify number to set password"
      ) {
        setApiError(error?.response?.data?.error);
        setapiLoader(false);
        return;
      }

      await reverifyUser({ phone: "+91" + mobile })
        .then(() => {})
        .catch((error) => {
          setApiError(error?.response?.data?.error);
        });

      setViewToggle(true);
      setapiLoader(false);
    }
    setSavedMobile("+91" + mobile);
    // form1.resetFields();
  };

  const onSubmitOtp = async () => {
    if (wrongOtpCount >= 4) {
      message.error({
        content: "Max tries exceeded",
      });
      return;
    }

    setapiLoader(true);

    Cookies.set("register_mobile", savedMobile);
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

          // Only for register — show survey modal once
          sessionStorage.setItem("surveyModalShown", "false");
          Cookies.set("showModal", true);
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
      console.log(error);
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

  const span_text = (text) => <span className="fs-s-12">{text}</span>;
  const label_text = (text, required) => (
    <span
      className={`fs-s-12 ${lightMode ? "text-black" : "text-white"} fw-500 ${
        styles.required_icon
      }`}
    >
      {text}
      {required && svgSheet7.red_asterisk}
    </span>
  );

  const handleValueChange = () => {
    const errors = form
      .getFieldsError()
      .some(({ errors }) => errors.length > 0);
    setHasError(errors);
    // form.validateFields()
  };

  // const menu = (
  //   <div
  //     style={{
  //       position: "relative",
  //     }}
  //   >
  //     <Menu
  //       className="custom-dropdown-menu"
  //       style={{
  //         position: "absolute",
  //         maxHeight: "300px",
  //         minWidth: "300px",
  //         background: lightMode ? "white" : "#292e3f",
  //         overflowY: "auto",
  //         marginTop: "5px",
  //       }}
  //     >
  //       {countries.map((country) => (
  //         <Menu.Item
  //           key={country.name}
  //           onClick={() => setSelectedCountry(country)}
  //           style={{
  //             display: "flex",
  //             alignItems: "center",
  //             gap: "10px",
  //             color: lightMode ? "black" : "white",
  //             background: country === selectedCountry && "#202E4C",
  //             // background: country === selectedCountry && "#394A73",
  //           }}
  //         >
  //           <div
  //             className="d-flex justify-content-between mt-5"
  //             style={{
  //               height: "30px",
  //             }}
  //           >
  //             <div className="d-flex gap-10px">
  //               <span>{country.flag}</span>
  //               <span>{country.name}</span>
  //               <span> ({country.code})</span>
  //             </div>
  //             <span
  //               style={{
  //                 display: selectedCountry === country ? "block" : "none",
  //               }}
  //             >
  //               <svg
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 width="24"
  //                 height="24"
  //                 viewBox="0 0 24 24"
  //                 fill="none"
  //                 stroke="currentColor"
  //                 stroke-width="2"
  //                 stroke-linecap="round"
  //                 stroke-linejoin="round"
  //                 class="lucide lucide-square-check"
  //               >
  //                 <g transform="scale(0.7) translate(5,5)">
  //                   <rect width="18" height="18" x="3" y="3" rx="2" />
  //                   <path d="m9 12 2 2 4-4" />
  //                 </g>
  //               </svg>
  //             </span>
  //           </div>
  //         </Menu.Item>
  //       ))}
  //     </Menu>
  //   </div>
  // );

  // const handleSave = () => {
  //   setIsEditing(false);
  // };

  // const continueButtonStyle = () => {
  //   return {
  //     background: lightMode ? "#f2f2f2" : "#3B3F4F",
  //     border: "none",
  //     color: lightMode ? "black" : "white",
  //     height: "30px",
  //   };
  // };

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
      // const errorMsg = Object?.values(error?.response?.data);
      setApiError(error?.response?.data?.response);
    }
    setapiLoader(false);
  };

  // console.log("turnstileToken_register", turnsTileToken);

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
                  <button className="w-100 mt-10 ff-poppins fw-600 btn-bg-primary fw-500 py-10 br-5 h-42 text-white pointer">
                    Submitting...
                  </button>
                ) : (
                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="w-100 mt-10 ff-poppins fw-600 btn-bg-primary fw-500 py-10 br-5 h-42 text-white pointer"
                      //   style={{
                      //     cursor: btnDisabled && "not-allowed",
                      //   }}
                      //   disabled={btnDisabled}
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
          <Footer lightMode={lightMode} />
        </div>
      ) : (
        <div className={styles.parent}>
          <span>{PortSvgLogo.PortSvgLogo_small}</span>

          <div className="d-flex flex-col">
            <Form
              form={form1}
              name="register"
              autoComplete="off"
              onFinish={onSubmitSignup}
              onValuesChange={handleValueChange}
              scrollToFirstError
              style={{
                marginTop: hasError ? "12px" : "0px",
              }}
            >
              {label_text("Enter Your Name", "required")}
              <Form.Item
                style={{ marginBottom: "0px", position: "relative" }}
                name="name"
                rules={[
                  {
                    type: "name",
                    message: span_text("Please Enter your Name"),
                  },
                  {
                    required: true,
                    message: span_text("Please Enter your Name"),
                  },
                ]}
                hasFeedback
              >
                <Input
                  type="text"
                  className={`auth-form-input  ${
                    lightMode
                      ? "bg-gray input-password-login-light"
                      : `bg-dark-gray email-input-login-page ${styles.input_password_login_dark}`
                  }`}
                  placeholder="Name"
                  style={{
                    height: "40px",
                  }}
                  disabled={isEditing}
                />
              </Form.Item>
              {label_text("Enter E-mail", "required")}
              <Form.Item
                style={{ margin: "0" }}
                name="email"
                rules={[
                  {
                    type: "email",
                    message: span_text("Please Enter your E-mail!"),
                  },
                  {
                    required: true,
                    message: span_text("Please Enter your E-mail!"),
                  },
                ]}
              >
                <Input
                  type="email"
                  className={`w-100 auth-form-input  ${
                    lightMode
                      ? "bg-gray input-password-login-light"
                      : `bg-dark-gray email-input-login-page ${styles.input_password_login_dark}`
                  }`}
                  placeholder="Email"
                  disabled={isEditing}
                />
              </Form.Item>
              {/*  */}

              <div>
                {label_text("Enter Mobile", "required")}
                <div className="flex">
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
                  <Form.Item
                    style={{ margin: "0", flex: 1 }}
                    name="mobile"
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
                        message: span_text("Please Enter your Mobile"),
                      },
                    ]}
                    className="custom-error-message"
                  >
                    <Input
                      type="number"
                      className={`auth-form-input  ${
                        lightMode
                          ? "bg-gray input-password-login-light"
                          : `bg-dark-gray email-input-login-page ${styles.input_password_login_dark}`
                      }`}
                      placeholder="Mobile"
                      maxLength={10}
                    />
                  </Form.Item>
                </div>
              </div>
              {/*  */}

              {!isReferral && (
                <p
                  onClick={() => setIsReferral(true)}
                  className={`${
                    lightMode ? "text-gray" : "text-white"
                  }  fs-s-12 mb-10 pointer d-flex justify-content-end`}
                >
                  Got Referral Code ?
                </p>
              )}
              {isReferral && (
                <Form.Item
                  style={{ marginBottom: "0px" }}
                  name="Referral"
                  // dependencies={["password"]}
                  hasFeedback
                >
                  <div className={styles.formItemContainer}>
                    <Input
                      type="text"
                      className={`w-100 h-40px auth-form-input  ${
                        lightMode
                          ? "bg-gray input-password-login-light"
                          : `bg-dark-gray-2 ${styles.input_password_login_dark}`
                      }`}
                      placeholder="Referral Code(Optional)"
                    />
                  </div>
                </Form.Item>
              )}
              {apiError1?.success && (
                <div className={styles.api_success}>{apiError1?.success}</div>
              )}
              {apiError1.error && (
                <div className={styles.api_error}>{apiError1.error}</div>
              )}

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

              <button
                type="submit"
                className="w-100 btn-bg-primary btn-auth br-5 mb-10 d-flex align-items-center fw-500 text-white text-center"
                style={{
                  height: "40px",
                }}
                disabled={!turnsTileToken}
              >
                {apiLoader ? "Loading" : "Sign Up"}
              </button>
              <div
                id="buttonDiv"
                onClick={googleSignUp}
                style={{ height: "40px" }}
                className={` d-flex gap-10px pointer mb-10 ${
                  lightMode
                    ? `text-white ${styles.btn_light}`
                    : `${styles.btn_dark}`
                } br-5 d-flex align-items-center justify-content-center h-40`}
              >
                {svgSheet7.google_icon}
                <p className="mb-0 fw-600">Sign Up With Google </p>
              </div>
              <div className="flex gap-10px text-center">
                <span
                  style={{
                    color: lightMode ? "#000" : "#fff",
                  }}
                >
                  Already Registered?
                  <span
                    className={styles.create_account_link}
                    onClick={() => dispatch(setToggleForm("login"))}
                  >
                    Log In
                  </span>
                </span>
              </div>
            </Form>
          </div>
          <div className="fs-s-12">
            <div className="d-flex justify-content-center mb-10">
              <div
                className={`mb-0 ${
                  lightMode ? "text-black" : "text-white checkbox-dark"
                } d-flex gap-0 w-100 justify-content-center align-items-center`}
                style={{
                  marginLeft: windowWidth < 600 && "40px",
                }}
              >
                <Checkbox
                  style={{ color: lightMode ? "black" : "white" }}
                  className={`small-checkbox  mr-5`}
                  value={mailChimp}
                  defaultChecked
                  onChange={(e) => setmailChimp(e.target.checked)}
                >
                  <span className="text-gray mb-0 fs-s-12">
                    I accept to receive marketing & promotional Mails from
                    Portal
                  </span>
                </Checkbox>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      )}
    </section>
  );
};

export default RegisterForm;
