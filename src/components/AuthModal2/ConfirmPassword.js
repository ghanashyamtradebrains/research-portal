import ResetPassWord from "../Authentications/ResetPassWord";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getThemeMode } from "../../redux/reducers/ThemeSlice";
import PortSvgLogo from "../../assets/svg/svgSheet2";
import { Form, Input } from "antd";
import React, { useState } from "react";
import { PostConfirmPassword } from "../../pages/api/fetchClient";
import { redGreenColorPicker } from "../../utilityFn/redGreenColor";
import { message as message2 } from "antd";
import styles from "./AuthModal.module.css";
import { setToggleForm } from "../../redux/reducers/AuthToggleSlice";

const Footer = ({ lightMode }) => {
  return (
    <div className="fs-s-12 mt-20">
      <p
        className="fw-500"
        style={{
          color: lightMode ? "#000" : "#fff",
        }}
      >
        By signing up, you have read and agreed to our Privacy Policy and Terms
        & Conditions.
      </p>
    </div>
  );
};

const ConfirmPassword = ({ lightMode }) => {
  const dispatch = useDispatch();

  // const { lightMode } = useSelector(getThemeMode);
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setloading] = useState(false);
  const location = useRouter();
  const [message, setmessage] = useState();
  const { token, uid } = router.query;

  const onSubmit = (values, e) => {
    setloading(true);
    const data = { ...values, uid: uid, token: token };
    PostConfirmPassword({ data })
      .then((res) => {
        setloading(false);
        dispatch(setToggleForm(null));
        message2.success({
          content: "Password Updated Successfully",
          className: !lightMode && "darkmodemessge",
        });
        location.push("/");
      })
      .catch((res) => {
        setloading(false);
        dispatch(setToggleForm(null));
        setmessage(res?.response?.data?.token[0]);
      });
  };

  return (
    <section
      className={
        lightMode ? styles.action_container_light : styles.action_container
      }
    >
      <div className={styles.parent}>
        <span>{PortSvgLogo.PortSvgLogo_small}</span>
        <div>
          <Form
            autoComplete="off"
            form={form}
            name="login"
            onFinish={onSubmit}
            scrollToFirstError
          >
            <p
              className={`fs-s-24 mb-0 mt-40 fw-700 ${
                lightMode ? " " : "text-white"
              }`}
            >
              Confirm Password
            </p>

            <Form.Item
              style={{ marginBottom: "0px" }}
              name="new_password1"
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
                        "Password should have minimum 8 and maximum 16 characters"
                      )
                    );
                  },
                }),
              ]}
              hasFeedback
              className="mt-10"
            >
              <Input.Password
                type="text"
                className={`w-100 h-40px auth-form-input  ${
                  lightMode
                    ? "bg-gray input-password-login-light"
                    : "bg-dark-gray input-password-login-dark"
                }`}
                placeholder="Enter Password"
              />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "0px", marginTop: "7px" }}
              name="new_password2"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("new_password1") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              {/* <div className='w-100 relative d-flex align-items-center '> */}
              <Input.Password
                type="text"
                className={`w-100 h-40px auth-form-input  ${
                  lightMode
                    ? "bg-gray input-password-login-light"
                    : "bg-dark-gray input-password-login-dark"
                }`}
                placeholder="Confirm Password"
              />
            </Form.Item>

            {/* {apiError && (
                            <div style={{ color: "#ff4d4f", textAlign: "center" }}>
                                {apiError}
                            </div>
                        )} */}
            {loading ? (
              <div
                style={{ margin: "6px 0px" }}
                className="w-100 btn-bg-primary  h-50-42 py-10 br-5 text-white center"
              >
                Sending....
              </div>
            ) : (
              <div>
                <p
                  style={{ color: redGreenColorPicker(-21, lightMode) }}
                  className="mb-0 mt-10 text-inherit text-align-center"
                >
                  {message}
                </p>
                <button
                  type="submit"
                  className="w-100 btn-bg-primary mt-20 fw-500 py-10 br-5  h-42 text-white pointer"
                >
                  Set Password
                </button>
              </div>
            )}
          </Form>
          <Footer lightMode={lightMode} />
        </div>
      </div>
    </section>
  );
};

export default ConfirmPassword;
