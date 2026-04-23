import React, { useState, useEffect, useRef } from "react";
import PortSvgLogo from "../../assets/svg/svgSheet2";
import { Checkbox, Form, Input } from "antd";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../redux/reducers/authSlice";
import {
  googleTapRedirect,
  postLoginData,
  postMailChimp,
} from "../../pages/api/fetchClient";
import styles from "./AuthModal.module.css";
import svgSheet from "../../assets/svg/svgSheet";
import { authStore } from "../../redux/reducers/authSlice";
import cookie from "js-cookie";
import {
  setLoginTime,
  setSessionTime,
} from "../../redux/reducers/loginTimeSlice";
import Link from "next/link";
import {
  setRedirectUrl,
  setToggleForm,
  toggleStore,
} from "../../redux/reducers/AuthToggleSlice";
import useWindowWidth from "../../utilityFn/getWindowWidth";
import svgSheet7 from "../../assets/svg/svgSheet7";
import Cookies from "js-cookie";
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

const LoginForm = ({ googleLogin, setGoogleLogin, lightMode }) => {
  const dispatch = useDispatch();
  const UserAuth = useSelector(authStore);
  const { redirect } = useSelector(toggleStore);
  const isPremium = UserAuth?.userData?.user?.is_premium;
  const windowWidth = useWindowWidth();
  const loginTime = new Date();
  const navigate = useRouter();
  const [mailChimp, setmailChimp] = useState(true);
  const [apiLoader, setapiLoader] = useState(false);
  const [form] = Form.useForm();
  const [apiError, setApiError] = useState();
  const [viewToggle, setViewToggle] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [savedMobile, setSavedMobile] = useState("");
  const [inputType, setInputType] = useState(true);

  // Turnstile Code

  // const [turnsTileToken, setTurnstileToken] = useState(null);

  const urlState =
    navigate?.asPath !== undefined ? `${navigate?.asPath} ` : "/";
  const googleSignUp = () => {
    const url = googleTapRedirect(urlState);
    window.location.href = url;
    sessionStorage.setItem("Mailchimp", mailChimp);
    dispatch(setToggleForm(null));

    let loginCount = Number(Cookies.get("loginCount") || 1);

    // Reset session modal state
    sessionStorage.setItem("surveyModalShown", "false");

    // Show modal only if (loginCount - 1) % 4 === 0 => show on 1, 5, 9, etc.
    if ((loginCount - 1) % 4 === 0) {
      Cookies.set("showModal", true);
    } else {
      Cookies.set("showModal", false);
    }

    // Increment and store loginCount
    Cookies.set("loginCount", loginCount + 1);
  };

  useEffect(() => {
    sessionStorage.setItem("Mailchimp", mailChimp);
  }, [mailChimp]);

  // const onEmailClick = () => {
  //     setGoogleLogin("login");
  // };

  const payloadGenerator = (values) => {
    if (!/^\d/.test(values.email)) {
      return {
        email: values.email,
        password: values.password,
        // turnstileToken: turnsTileToken,
      };
    }

    return {
      phone: "+91" + values.email,
      password: values.password,
      // turnstileToken: turnsTileToken,
    };
  };

  const isProd = window.location.protocol === "https:";

  const onSubmit = async (values) => {
    setapiLoader(true);
    const eventRedirect = localStorage.getItem("eventRedirect");
    try {
      await postLoginData(payloadGenerator(values)).then((resp) => {
        if (mailChimp) {
          postMailChimp(values.email).then((res) => {});
        }
        Cookies.set("start_session", loginTime);
        Cookies.set("login_time", loginTime, {
          expires: 180,
          path: "/", // always recommended
          secure: false, // should be false for localhost
          sameSite: "Lax", // optional, good default
        });
        Cookies.set("ptl_access_token", resp?.data?.access_token, {
          expires: 2,
          secure: isProd,
          sameSite: "Lax",
        });
        Cookies.set("refresh_token", resp?.data?.refresh_token, {
          expires: 180,
          secure: isProd,
          sameSite: "Lax",
        });
        dispatch(setAuth(resp?.data));
        dispatch(setLoginTime(loginTime));
        dispatch(setSessionTime(loginTime));
        setGoogleLogin(false);

        // *********** Redirect logic ******

        setapiLoader(false);

        if (navigate.asPath.startsWith("/verify-email")) {
          navigate.push("/");
        }

        if (!redirect) {
          navigate.push(navigate.asPath);
        } else {
          navigate.push(redirect);
          dispatch(setRedirectUrl(null));
        }
        // setisLoginPage(false);
        // onCloseHandler("NONE");
        setViewToggle(true);
        dispatch(setToggleForm(null));

        let loginCount = Number(Cookies.get("loginCount") || 1);

        // Reset session modal state
        sessionStorage.setItem("surveyModalShown", "false");

        // Show modal only if (loginCount - 1) % 4 === 0 => show on 1, 5, 9, etc.
        if ((loginCount - 1) % 4 === 0) {
          Cookies.set("showModal", true);
        } else {
          Cookies.set("showModal", false);
        }

        // Increment and store loginCount
        Cookies.set("loginCount", loginCount + 1);
      });
    } catch (error) {
      if (error !== undefined) {
        const errorMsg = Object?.values(error?.response?.data);
        setApiError(errorMsg[0]);
        setapiLoader(false);
      }
    }

    form.resetFields();
  };

  const span_text = (text) => (
    <span className={`${lightMode ? "text-black" : "text-white"} fw-500`}>
      {text}
    </span>
  );

  //   const handleCheckbox = (e) => {
  //     setInputType(!e.target.checked);
  //   };

  // console.log("turnstileToken_login", turnsTileToken);

  return (
    <section
      className={
        lightMode ? styles.action_container_light : styles.action_container
      }
    >
      <div className={styles.parent}>
        <span>{PortSvgLogo.PortSvgLogo_small}</span>
        <div>
          <div className="d-flex flex-col justify-content-between">
            <span className="fs-s-18 fw-700 text-center mb-10">Login</span>
            <Form
              form={form}
              name="login"
              onFinish={onSubmit}
              scrollToFirstError
              autoComplete="off"
            >
              <div className={styles.required_icon}>
                {span_text("Enter Your Email / Mobile No.")}
                {svgSheet7.red_asterisk}
              </div>

              <Form.Item
                name="email"
                className={lightMode ? "light-input-login" : "dark-input-login"}
                rules={[
                  {
                    validator: (_, value) => {
                      if (!value)
                        return Promise.reject(
                          "Please enter your Email or Mobile Number!"
                        );
                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      const mobileRegex = /^[6-9]\d{9}$/;
                      return emailRegex.test(value) || mobileRegex.test(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            "Enter a valid Email or 10-digit Mobile Number!"
                          );
                    },
                  },
                ]}
                autoComplete="off"
              >
                {inputType ? (
                  <Input
                    type="text"
                    className={`${
                      lightMode
                        ? `bg-gray email-input-login-page-light ${styles.input_autofill_light}`
                        : `bg-dark-gray email-input-login-page ${styles.input_autofill_dark}`
                    } auth-form-input`}
                    placeholder="Email"
                    autoComplete="off"
                  />
                ) : (
                  <div className="flex align-items-center" style={{ gap: 3 }}>
                    <span
                      className="ff-lato fw-500"
                      style={{
                        backgroundColor: lightMode ? "#E8F0FE" : "#3B3F4F",
                        padding: "9px",
                        borderRadius: "5px 0 0 5px",
                        color: lightMode ? "black" : "white",
                      }}
                    >
                      +91
                    </span>
                    <Input
                      type="number"
                      className={`${
                        lightMode
                          ? `bg-gray email-input-login-page-light ${styles.input_autofill_light}`
                          : `bg-dark-gray email-input-login-page ${styles.input_autofill_dark}`
                      } auth-form-input-mobile border-none outline-none`}
                      placeholder="Mobile"
                      autoComplete="off"
                      style={{ borderRadius: "5px 5px 5px 0 !important" }}
                    />
                  </div>
                )}
              </Form.Item>

              <div className={styles.required_icon}>
                {span_text("Enter your Password")}
                {svgSheet7.red_asterisk}
              </div>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
                autoComplete="off"
              >
                <Input.Password
                  type="text"
                  className={`auth-form-input ${
                    lightMode
                      ? `bg-gray input-password-login-light ${styles.input_autofill_light}`
                      : `bg-dark-gray input-password-login-dark ${styles.input_autofill_dark}`
                  }`}
                  placeholder="Enter Password"
                  autoComplete="off"
                />
              </Form.Item>

              <p style={{ color: "red" }}>{navigate?.query?.googleerror}</p>

              {/* <div className="flex justify-content-center mb-10">
                <Turnstile
                  siteKey="0x4AAAAAABvsMMlYZmQzE_Up"
                  // "{process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}"
                  onVerify={(token) => {
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
              </div> */}

              {apiLoader ? (
                <div
                  style={{ margin: apiError ? "0" : "6px 0px" }}
                  className="w-100 btn-bg-primary h-50-42 py-10 br-5 text-white center"
                >
                  Submitting....
                </div>
              ) : (
                <button
                  type="submit"
                  style={{ margin: "6px 0px" }}
                  className="w-100 ff-poppins btn-auth fw-600 btn-bg-primary fw-500 py-10 br-5 h-42 text-white pointer"
                  // disabled={!turnsTileToken}
                >
                  Continue
                </button>
              )}

              {apiError && <div className={styles.api_error}>{apiError}</div>}

              <div className="d-flex justify-content-center mt-10">
                <span
                  className={`ff-poppins ${styles.forgot_password_text}`}
                  style={{ color: lightMode ? "black" : "white" }}
                  onClick={() => dispatch(setToggleForm("forgot"))}
                >
                  Forgot Password?
                </span>
              </div>

              <button
                onClick={googleSignUp}
                className={`flex ${
                  lightMode ? styles.btn_light : `${styles.btn_dark} text-white`
                } justify-content-center gap-10px w-100 ff-poppins fw-600 py-10 br-5 h-42 pointer ${
                  styles.login_with_google
                }`}
              >
                {svgSheet7.google_icon}
                <span>Login with Google</span>
              </button>
            </Form>
          </div>

          <div>
            <div className="flex text-center mb-10">
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

            <div
              className={`text-center ${
                lightMode ? "text-black" : "text-white checkbox-dark"
              } d-flex gap-0 w-100 justify-content-center align-items-center`}
            >
              <Checkbox
                style={{ color: lightMode ? "black" : "white" }}
                value={mailChimp}
                defaultChecked
                onChange={(e) => setmailChimp(e.target.checked)}
              >
                <span className="text-gray fs-s-12 mb-10 fw-500">
                  I accept to receive marketing & promotional Mails from Portal
                </span>
              </Checkbox>
            </div>
          </div>

          <Footer lightMode={lightMode} />
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
