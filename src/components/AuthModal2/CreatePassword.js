import React, { useState, useEffect, useRef } from "react";
import PortSvgLogo from "../../assets/svg/svgSheet";
import { Checkbox, Form, Input, message } from "antd";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../redux/reducers/authSlice";
import {
  googleTapRedirect,
  newUserPassword,
  postLoginData,
  postMailChimp,
} from "../../pages/api/fetchClient";
import styles from "./AuthModal.module.css";
import svgSheet from "../../assets/svg/svgSheet";
import { authStore } from "../../redux/reducers/authSlice";
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
import Cookies from "js-cookie";
import svgSheet7 from "../../assets/svg/svgSheet7";

const Footer = () => {
  return (
    <div className="fs-s-12 mt-40">
      <p
        className="fw-500 text-align-center"
        style={{
          color: "#fff",
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

const CreatePassword = ({ lightMode }) => {
  const dispatch = useDispatch();
  const UserAuth = useSelector(authStore);
  const { redirect } = useSelector(toggleStore);
  const isPremium = UserAuth?.userData?.user?.is_premium;
  const windowWidth = useWindowWidth();
  const loginTime = new Date();
  const navigate = useRouter();
  const [mailChimp, setmailChimp] = useState(true);
  const [apiLoader, setapiLoader] = useState(false);
  const [apiError, setApiError] = useState();
  const [form] = Form.useForm();

  const onSubmit = async (values) => {
    setapiLoader(true);
    const mobile = Cookies.get("register_mobile");

    const payload = {
      phone: mobile,
      password1: values.password,
      password2: values.confirmPassword,
    };
    // const eventRedirect = localStorage.getItem("eventRedirect");
    try {
      const res = await newUserPassword({
        phone: payload.phone,
        password1: payload.password1,
        password2: payload.password2,
      });

      if (res?.data?.access_token) {
        dispatch(setToggleForm(null));

        // Same as login flow
        // if (mailChimp) {
        //     postMailChimp(values.email).then((res) => { });
        // }
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

        if (!redirect) {
          navigate.push(navigate.asPath);
        } else {
          navigate.push(redirect);
          dispatch(setRedirectUrl(null));
        }
        navigate.push("/stock-research-report");
      } else {
        message.error({
          content: "Something went wrong!",
          className: !lightMode && "darkmodemessge",
        });
      }
    } catch (error) {
      // if (error !== undefined) {
      //     const errorMsg = Object?.values(error?.response?.data);
      //     setApiError(errorMsg[0]);
      //     setapiLoader(false);
      // }
    }

    form.resetFields();
    Cookies.remove("register_mobile");
    setapiLoader(false);
  };

  const span_text = (text, required = false) => (
    <span className={`text-white fw-500`}>
      {text} {required && svgSheet7.red_asterisk}{" "}
    </span>
  );

  return (
    <section
      className={
        lightMode
          ? styles.action_container_create_pass_light
          : styles.action_container_create_pass
      }
    >
      <div className={styles.parent_create_pass}>
        <div className="d-flex flex-col justify-content-between">
          <span className="fs-s-18 fw-700 text-white text-center mb-20 mt-40">
            Create Password
          </span>
          <Form
            form={form}
            name="login"
            onFinish={onSubmit}
            scrollToFirstError
            autoComplete="off"
          >
            {span_text("Password", true)}
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || (value.length >= 8 && value.length <= 16)) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error(
                        "Password should have minimum 8 and maximum 16 characters",
                      ),
                    );
                  },
                }),
              ]}
              autoComplete="off"
            >
              <Input.Password
                type="text"
                className={`auth-form-input  ${
                  lightMode
                    ? `bg-gray input-password-login-light ${styles.input_autofill_light}`
                    : `bg-dark-gray input-password-login-dark ${styles.input_autofill_dark}`
                }`}
                placeholder="Enter Password"
                autoComplete="off"
              />
            </Form.Item>
            {span_text("Confirm Password", true)}
            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error(
                        // "The two passwords that you entered do not match!"
                        "Both passwords should match.",
                      ),
                    );
                  },
                }),
              ]}
              autoComplete="off"
            >
              <Input.Password
                type="text"
                className={`auth-form-input  ${
                  lightMode
                    ? `bg-gray input-password-login-light ${styles.input_autofill_light}`
                    : `bg-dark-gray input-password-login-dark ${styles.input_autofill_dark}`
                }`}
                placeholder="Enter Confirm Password"
                autoComplete="off"
              />
            </Form.Item>

            <p style={{ color: "red" }}>{navigate?.query?.googleerror}</p>

            {apiLoader ? (
              <div
                style={{ margin: apiError ? "0" : "6px 0px" }}
                className="w-100 btn-bg-primary  h-50-42 py-10 br-5 text-white center"
              >
                Submitting....
              </div>
            ) : (
              <button
                type="submit"
                style={{ margin: "6px 0px" }}
                className="w-100 ff-poppins fw-600 btn-bg-primary fw-500 py-10 br-5  h-42 text-white pointer"
              >
                Continue
              </button>
            )}

            {apiError && <div className={styles.api_error}>{apiError}</div>}
          </Form>
        </div>

        <Footer />
      </div>
    </section>
  );
};

export default CreatePassword;
