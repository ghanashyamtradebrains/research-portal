import { Form, Input } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { PostConfirmPassword } from "../../pages/api/fetchClient";
import { redGreenColorPicker } from "../../utilityFn/redGreenColor";
import { useDispatch } from "react-redux";
import { setToggleForm } from "../../redux/reducers/AuthToggleSlice";

function ResetPassWord({ lightMode, apiError, apiLoader }) {
  const [form] = Form.useForm();
  const [loading, setloading] = useState(false);
  const location = useRouter();
  const [message, setmessage] = useState();
  const utldata =
    "confirm_password?uid=1kvy&token=bcs5gg-8458b10e9e984105c26c40bb2692d4e8";
  // const splited = location?.search && location?.search?.split("&");
  // const uid = splited[0]?.split("=")[1];
  // const userToken = splited[1]?.split("=")[1];
  const router = useRouter()
  const { token, uid } = router.query;
  const dispatch = useDispatch();

  const onSubmit = (values, e) => {
    setloading(true);
    const data = { ...values, uid: uid, token: token };
    PostConfirmPassword({ data })
      .then((res) => {
        setloading(false);
        dispatch(setToggleForm("login"));
        // location.push("/login");
      })
      .catch((res) => {
        setloading(false);
        setmessage(res?.response?.data?.token[0]);
      });
  };
  return (
    <div>
      <Head>
        <title>Trade Brains Portal -Financial Data & Stock Quotes</title>
        <meta
          name="og:title"
          content="Trade Brains Portal -Financial Data & Stock Quotes"
        />
        <meta
          name='og:description'
          content='Best Indian Stock Market App for Stock research and fundamental analysis. Track stock movements, get financial statements, stock screener, portfolio analysis and more'
        />
        <meta
          property="og:image"
          content="https://tradebrains.in/features/wp-content/uploads/2022/07/Portal-Logo-Cover-Image.jpg"
        />
      </Head>
      <Form
        autoComplete="off"
        //   className="w-60-80"
        form={form}
        name="login"
        onFinish={onSubmit}
        scrollToFirstError
      >
        <p className={`fs-36-20 mb-0 fw-700 ${lightMode ? " " : "text-white"}`}>
          Set New Password
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
        >
          {/* <div className='w-100 relative d-flex align-items-center '> */}
          <Input.Password
            type="text"
            className={`w-100 h-40px auth-form-input  ${lightMode
              ? "bg-gray input-password-login-light"
              : "bg-dark-gray input-password-login-dark"
              }`}
            placeholder="Enter Password"
          />
          {/* <span style={{right:'10px'}}  className='ff-rubik absolute text-skyblue fw-500 pointer'>Show</span> */}
          {/* </div> */}
        </Form.Item>
        <Form.Item
          style={{ marginBottom: "0px", marginTop: "7px" }}
          name="new_password2"
          dependencies={["password"]}
          hasFeedback
          className={`w-100 ${lightMode
            ? "bg-gray email-input-login-page-light light-input-login"
            : "bg-dark-gray email-input-login-page"
            } `}
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
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          {/* <div className='w-100 relative d-flex align-items-center '> */}
          <Input.Password
            type="text"
            className={`w-100 h-40px auth-form-input  ${lightMode
              ? "bg-gray input-password-login-light"
              : "bg-dark-gray input-password-login-dark"
              }`}
            placeholder="Confirm Password"
          />
          {/* <span style={{right:'10px'}}  className='ff-rubik absolute text-skyblue fw-500 pointer'>Show</span>
  </div> */}
        </Form.Item>

        {apiError && (
          <div style={{ color: "#ff4d4f", textAlign: "center" }}>
            {apiError}
          </div>
        )}
        {loading ? (
          <div
            style={{ margin: "6px 0px" }}
            className="w-100 btn-bg-primary  h-50-42 py-10 br-5 text-white center"
          >
            Senting....
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
              style={{ margin: "6px 0px" }}
              className="w-100 btn-bg-primary fw-500 py-10 br-5  h-42 text-white pointer"
            >
              Set Password
            </button>
          </div>
        )}
      </Form>
    </div>
  );
}

export default ResetPassWord;