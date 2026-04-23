import React from "react";
import { Button, Checkbox, Form } from "antd";
import styles from "./SubscriptionStyles.module.css";
import { CheckCircleFilled } from "@ant-design/icons";
const options = [
  "I am subscribing in my individual capacity only and not on behalf of any entity.",
  "I confirm that no dependent family member or any other person is availing these services under my name.",
  "I agree to abide by the applicable SEBI regulations and the Terms of Service shared with me.",
  "I undertake to promptly update Dailyraven Technologies Pvt Ltd about any change in my personal or financial details.",
];

const DeclarationSection = ({
  isActive,
  isCompleted,
  onContinue,
  onClick,
  lightMode,
}) => {
  const [form] = Form.useForm();

  const checkedList = Form.useWatch("declarations", form) || [];
  const allChecked = checkedList.length === options.length;

  const handleContinue = (e) => {
    form
      .validateFields()
      .then(() => {
        onContinue(e);
      })
      .catch(() => {
        // Scroll to error or show message (optional)
      });
  };

  return (
    <div
      className={`${lightMode ? styles.panel_light : styles.panel} ${
        isActive ? (lightMode ? styles.active_light : styles.active) : ""
      } ${isCompleted ? styles.completed : ""}`}
      onClick={onClick}
    >
      {!isActive && (
        <span className={lightMode ? styles.title_light : styles.title}>
          Declaration Section
        </span>
      )}

      {isActive ? (
        <Form form={form} layout="vertical">
          <span
            className={`${
              lightMode ? "text-black" : "text-white"
            } fs-s-18 fw-500`}
          >
            Declarations
          </span>

          <Form.Item
            name="declarations"
            rules={[
              {
                validator: (_, value) =>
                  value?.length === options.length
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("Please accept all declarations to continue.")
                      ),
              },
            ]}
          >
            <Checkbox.Group className={styles.terms_checkbox}>
              {options.map((text, index) => (
                <div key={index} style={{ marginBottom: 16 }}>
                  <Checkbox
                    value={text}
                    style={{
                      color: lightMode ? "#000" : "#fff",
                      lineHeight: "1.5",
                    }}
                  >
                    <span style={{ whiteSpace: "pre-wrap" }}>{text}</span>
                  </Checkbox>
                </div>
              ))}
            </Checkbox.Group>
          </Form.Item>

          {/* Accept All Button */}
          {!allChecked && (
            <Button
              type="link"
              onClick={() => form.setFieldsValue({ declarations: options })}
              style={{
                padding: 0,
                marginBottom: 16,
                color: lightMode ? "#0072ff" : "#66b0ff",
                fontWeight: 500,
              }}
            >
              Accept All
            </Button>
          )}

          <Button
            block
            disabled={!allChecked}
            className={styles.continue_btn_declare}
            onClick={handleContinue}
          >
            Continue
          </Button>
        </Form>
      ) : (
        isCompleted && (
          <div className={styles.billingInfo}>
            <span>Declarations Accepted</span>
            <CheckCircleFilled className={styles.checkIcon} />
          </div>
        )
      )}
    </div>
  );
};

export default DeclarationSection;
