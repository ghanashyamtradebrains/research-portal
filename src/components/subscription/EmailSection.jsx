import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import styles from "./SubscriptionStyles.module.css";
import { useSelector } from "react-redux";
import { authStore } from "../../redux/reducers/authSlice";

const EmailSection = ({
  isActive,
  isCompleted,
  email,
  onEmailChange,
  onContinue,
  onClick,
  lightMode,
}) => {
  const [form] = Form.useForm();

  const UserAuth = useSelector(authStore);

  const handleContinue = (e) => {
    e.preventDefault();

    const values = form.getFieldsValue();

    const hasErrors = form
      .getFieldsError()
      .some(({ errors }) => errors.length > 0);

    if (values.email && !hasErrors) {
      onEmailChange(values.email);
      onContinue(e);
    }
  };

  const span_text = (text) => <span className="fs-s-12">{text}</span>;

  return (
    <div
      className={`${lightMode ? styles.panel_light : styles.panel} ${
        isActive ? (lightMode ? styles.active_light : styles.active) : ""
      } ${isCompleted ? styles.completed : ""}`}
      onClick={onClick}
    >
      {!isActive && (
        <span className={lightMode ? styles.title_light : styles.title}>
          Add email address
        </span>
      )}

      {isActive && (
        <div>
          <span
            className={`${
              lightMode ? "text-black" : "text-white"
            } fs-s-18 fw-500`}
          >
            Add email address
          </span>
          <p
            className={`${lightMode ? "text-black" : "text-white"} ${
              styles.hint
            }`}
          >
            Subscription details will be sent to your inbox
          </p>

          <Form
            form={form}
            layout="vertical"
            onSubmitCapture={handleContinue}
            initialValues={{
              email: UserAuth?.userData?.user?.email,
            }}
          >
            <Form.Item
              name="email"
              label={
                <span className={`${lightMode ? "text-black" : "text-white"}`}>
                  Email
                </span>
              }
              rules={[
                {
                  required: true,
                  message: span_text("Please enter your Email"),
                },
                { type: "email", message: span_text("Enter a valid Email!") },
              ]}
            >
              <Input
                className={`${
                  lightMode ? styles.customInput_light : styles.customInput
                }`}
                placeholder="something@gmail.com"
              />
            </Form.Item>

            <button className={styles.continueBtn} type="submit">
              <span className="fw-500 text-white">Continue</span>
            </button>
          </Form>
        </div>
      )}
      {isCompleted && (
        <div className={styles.emailInfo}>
          <span>{email}</span>
          <CheckCircleFilled className={styles.checkIcon} />
        </div>
      )}
    </div>
  );
};

export default EmailSection;
