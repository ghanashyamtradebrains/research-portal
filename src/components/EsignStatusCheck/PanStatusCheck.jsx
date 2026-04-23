import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getThemeMode } from "../../redux/reducers/ThemeSlice";
import styles from "./styles.module.css";
import { Button, Form, Input, message, Select, Spin } from "antd";
import svgSheet7 from "../../assets/svg/svgSheet7";
import { decryptData, encryptData } from "../../utilityFn/dataEncryption";
import { statesList } from "../subscription/constants";
import {
  esignInitiate,
  eSignMonitorAPI,
  eSignStatusCheck,
  kycUserUpdate,
  panVerification,
} from "../../pages/api/fetchClient";
import { authStore } from "../../redux/reducers/authSlice";

const convertToJSObject = (str) => {
  const jsonCompatible = str
    .replace(/'/g, '"') // replace single quotes with double quotes
    .replace(/\bFalse\b/g, "false") // convert False to false
    .replace(/\bTrue\b/g, "true") // convert True to true
    .replace(/\bNone\b/g, "null"); // convert None to null

  try {
    return JSON.parse(jsonCompatible);
  } catch (err) {
    console.error("Failed to parse string as JSON:", err.message);
    return null;
  }
};

const PanStatusCheck = ({
  billingInfo,
  setBillingInfo,
  onBillingInfoChange,
  panStatus,
  setActiveSection,
  esignData,
  setEsignData,
  setESignLoader,
  // email,
}) => {
  const [form] = Form.useForm();
  const UserAuth = useSelector(authStore);
  const { lightMode } = useSelector(getThemeMode);
  const [countryCode] = useState("+91");
  const [panFetched, setPanFetched] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [panLoader, setPanLoader] = useState(false);
  const [eSignStatusCheck2, setEsignStatusCheck2] = useState(null);
  const [unknownError, setUnknownError] = useState(null);
  const planId = UserAuth?.userData?.user?.plan?.planId;

  const isBillingInfoValid = () => {
    const isStateValid = !!billingInfo?.state;
    const isNameValid = !!billingInfo?.name;

    if (isStateValid && isNameValid) {
      if (panFetched === true) {
        return true;
      } else if (panFetched === false) {
        return false;
      } else if (panStatus) {
        return true;
      } else if (eSignStatusCheck2) {
        return true;
      } else {
        return false;
      }
    } else if (panFetched === false) {
      return true;
    }

    return false;
  };

  const validatePan = async (value) => {
    setPanLoader(true);

    if (eSignStatusCheck2) {
      // setPanFetched(true);
      setPanLoader(false);
      return;
    }

    const payload = {
      pan: value,
    };

    const encryptedData = encryptData(
      JSON.stringify(payload),
      process.env.NEXT_PUBLIC_PORTAL_AUTH_KEY
    );

    setSubmitLoading(true);
    try {
      const res = await panVerification({
        data: encryptedData,
      });

      const decryptedResponse = decryptData(
        res?.data?.data,
        process.env.NEXT_PUBLIC_PORTAL_AUTH_KEY
      );

      const { is_valid, phone, email, name } = JSON.parse(decryptedResponse);

      setPanFetched(is_valid);

      setBillingInfo((prev) => {
        return {
          ...prev,
          name,
          email,
          phone: phone?.replace("+91", ""),
        };
      });

      setSubmitLoading(false);
      setPanLoader(false);
      return res?.data?.is_valid;
    } catch (error) {
      if (error?.message?.includes("Cannot read properties of undefined")) {
        setUnknownError(true);
        setPanLoader(false);
        setSubmitLoading(false);
      }

      if (error?.response?.status === 406) {
        setPanFetched("pan_exists");
      }

      setPanLoader(false);
      setSubmitLoading(false);

      return false;
    }
  };

  const eSignMonitor = async () => {
    const res = await eSignMonitorAPI();

    if (!res?.data?.length) {
      const res = await eSignStatusCheck(planId);

      const decryptedResponse = decryptData(
        res?.data?.data,
        process.env.NEXT_PUBLIC_PORTAL_AUTH_KEY
      );

      const parsedObject = convertToJSObject(decryptedResponse);

      setEsignStatusCheck2(parsedObject?.pan);
      return parsedObject?.esign_status;
    }

    if (res?.data[0]) {
      const { plan_id, status, sign_url, downloadUrl } = res?.data[0];

      setEsignData((prev) => {
        return {
          ...prev,
          pdfUrl: downloadUrl,
          eSignUrl: sign_url,
        };
      });

      return status;
    }

    return null;
  };

  const statusCheck = async () => {
    const monitorStatus = await eSignMonitor();

    return monitorStatus;
  };

  const statusCheckerAPI = async () => {
    const res = await eSignStatusCheck(planId);

    const decryptedResponse = decryptData(
      res?.data?.data,
      process.env.NEXT_PUBLIC_PORTAL_AUTH_KEY
    );

    const parsedObject = convertToJSObject(decryptedResponse);

    return parsedObject;
  };

  const handleContinue = async (e) => {
    setESignLoader(true);
    // onContinue(e);

    // if (!billingInfo?.state) {
    await kycUserUpdate({
      state: billingInfo?.state,
    });
    // }

    setActiveSection(2);

    try {
      if (esignData?.isInitiated) {
        setESignLoader(false);
        return;
      }

      setEsignData((prev) => {
        return {
          ...prev,
          isInitiated: true,
        };
      });

      // Status check api call

      const status = await statusCheck();
      const checkerAPIResponse = await statusCheckerAPI();

      const currentPlan = checkerAPIResponse?.subscriptions.find(
        (item) => item?.plan === planId
      );

      if (status === null || status === "rejected" || eSignStatusCheck2) {
        const res = await esignInitiate({
          plan_id: currentPlan?.plan,
          final_amount: currentPlan?.amount,
        });
        localStorage.setItem("esign_pending", "true");
        setEsignData((prev) => {
          return {
            ...prev,
            pdfUrl: res?.data?.file_url || "",
            eSignUrl: res?.data?.esign_url || "",
          };
        });
      }
    } catch (error) {
      console.error("Error during eSign initiation:", error);
      message.error("Something went wrong, please try again!");
    } finally {
      setESignLoader(false);
    }
    // setESignLoader(false);
  };

  const handleStatusCheck = async () => {
    const res = await eSignStatusCheck(UserAuth?.userData?.user?.plan?.planId);

    const decryptedResponse = decryptData(
      res?.data?.data,
      process.env.NEXT_PUBLIC_PORTAL_AUTH_KEY
    );

    const parsedObject = convertToJSObject(decryptedResponse);

    const {
      pan,
      pan_verified,
      esign_status,
      esign_url,
      file_url,
      state,
      email,
      name,
      phone,
    } = parsedObject;

    setEsignStatusCheck2(parsedObject?.pan);
  };

  useEffect(() => {
    handleStatusCheck();
  }, []);

  const spanText = (message, marginLeft = 0) => {
    return (
      <span className={styles.ant_error_text} style={{ marginLeft }}>
        {message}
      </span>
    );
  };

  return (
    <div>
      <div>
        <div
          className={
            lightMode ? styles.sub_container_light : styles.sub_container
          }
        >
          <span
            className={`${
              lightMode ? "text-black" : "text-white"
            } fs-s-18 fw-500`}
          >
            Add Billing Information
          </span>
          <p
            className={`${lightMode ? "text-black" : "text-white"} ${
              styles.hint
            }`}
          >
            Details will be used for invoice and KYC
          </p>

          <Form form={form} layout="vertical">
            <Form.Item
              label={
                <span
                  className={`${lightMode ? "text-black" : "text-white"}`}
                  style={{
                    fontSize: "12px",
                  }}
                >
                  Pan Card No. {svgSheet7.red_asterisk}
                </span>
              }
              required={false}
              validateFirst={true}
              name="pan"
              // dependencies={["pan"]}
              // preserve={false}
              style={{ flex: 1 }}
              validateTrigger={["onChange", "onBlur"]}
              onChange={async (e) => {
                const value = e.target.value.toUpperCase();

                if (value.length === 10) {
                  await validatePan(value);
                }
              }}
              rules={[
                {
                  required: true,
                  message: spanText("PAN number is required"),
                  validateTrigger: "onChange",
                },
                // {
                //   pattern: /^[A-Z]{5}[0-9]{4}[A-Z]$/,
                //   message: spanText(
                //     "Enter a valid PAN, onchange (e.g. ABCDE1234F)"
                //   ),
                //   validateTrigger: "onChange",
                // },
                {
                  validator: async (_, value) => {
                    if (
                      !value ||
                      value.length < 10 ||
                      value[3] !== "P" ||
                      !isNaN(Number(value[9]))
                    ) {
                      setUnknownError(false);
                      return Promise.reject(
                        spanText("Enter a valid PAN (e.g. ABCDE1234F)")
                      );
                    }

                    // Only after 4th character is 'P', call validatePan API
                    try {
                      if (panFetched !== true) {
                        await validatePan(value);
                      }
                    } catch (err) {
                      return Promise.reject(spanText("Failed to validate PAN"));
                    }

                    return Promise.resolve();
                  },
                  validateTrigger: "onBlur",
                },
              ]}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <div className={styles.inputWrapper_2}>
                  <Input
                    className={`subscribe-ant-input ${
                      lightMode ? styles.customInput_light : styles.customInput
                    }`}
                    placeholder="Eg: HLDQM1234M"
                    value={billingInfo?.pan} // no need for .toUpperCase() here
                    onChange={(e) => {
                      // form.setFields([
                      //   { name: "pan", errors: [] }, // 🔑 Clears form-level error
                      // ]);
                      onBillingInfoChange("pan", e.target.value.toUpperCase()); // update value in uppercase

                      if (e.target.value.length < 10) {
                        onBillingInfoChange("name", "");
                        onBillingInfoChange("email", "");
                        onBillingInfoChange("phone", "");

                        setPanFetched(null);
                      }
                    }}
                    style={{
                      textTransform: "uppercase", // ensure visual uppercase
                    }}
                    maxLength={10} // limit input to 10 characters
                  />

                  <div className={styles.validateIcon}>
                    {panFetched === false && svgSheet7.brightInvalidIcon}
                    {panFetched === true && svgSheet7.brightValidationIcon}
                    {panLoader && (
                      <div style={{ textAlign: "center" }}>
                        <Spin />
                      </div>
                    )}
                    {unknownError && svgSheet7.brightInvalidIcon}
                  </div>
                </div>
                <div>
                  {panFetched === false && (
                    <span className={styles.pan_hint}>
                      PAN Invalid - Please complete KYC below
                    </span>
                  )}
                  {panFetched === true && (
                    <span className={styles.pan_hint_success}>
                      Pan successfully verified
                    </span>
                  )}
                  {panFetched === "pan_exists" && (
                    <span className={styles.pan_hint}>
                      PAN already linked to another account!
                    </span>
                  )}
                  {unknownError && (
                    <span className={styles.pan_hint}>
                      Failed to validate PAN
                    </span>
                  )}
                </div>
              </div>
            </Form.Item>
            <Form.Item
              label={
                <span
                  style={{
                    fontSize: "12px",
                  }}
                  className={`${lightMode ? "text-black" : "text-white"}`}
                >
                  Name as per pan card {svgSheet7.red_asterisk}
                </span>
              }
              required={false}
              name="name"
              rules={[
                {
                  required: true,
                  message: spanText("Name is required"),
                },
                {
                  pattern: /^[A-Za-z\s]+$/, // Only allows letters and spaces
                  message: spanText(
                    "Name should contain only letters and spaces"
                  ),
                },
                {
                  min: 3,
                  message: spanText("Name should be at least 3 characters"),
                },
              ]}
              validateTrigger="onChange"
            >
              <div className={styles.inputWrapper_2}>
                <Input
                  className={`subscribe-ant-input ${
                    lightMode ? styles.customInput_light : styles.customInput
                  }`}
                  placeholder="Enter your name"
                  value={billingInfo?.name}
                  onChange={(e) => onBillingInfoChange("name", e.target.value)}
                  disabled
                />
                {panFetched && (
                  <div className={styles.lockIcon}>
                    <div>{svgSheet7.lockIcon}</div>
                  </div>
                )}
              </div>
            </Form.Item>

            <div className={styles.phone_dob_group}>
              <Form.Item
                label={
                  <span
                    className={`kyc-phone ${
                      lightMode ? "text-black" : "text-white"
                    }`}
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    Phone No. {svgSheet7.red_asterisk}
                  </span>
                }
                style={{
                  flex: 1,
                }}
                name="phone"
                rules={[
                  {
                    required: true,
                    message: spanText("Phone number is required", 55),
                  },
                  {
                    pattern: /^[0-9]{10}$/, // Ensuring exactly 10 digits
                    message: spanText("Please enter a valid number", 55),
                  },
                ]}
                required={false}
              >
                <div className={styles.phoneInputGroup}>
                  <Input
                    className={`subscribe-ant-input ${styles.countryCode} ${
                      lightMode ? styles.customInput_light : styles.customInput
                    }`}
                    value={countryCode}
                    disabled
                  />
                  <div className={styles.inputWrapper_2}>
                    <Input
                      className={`subscribe-ant-input ${
                        lightMode
                          ? styles.customInput_light
                          : styles.customInput
                      }`}
                      placeholder="Enter phone number"
                      value={billingInfo?.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, ""); // Allow only digits
                        if (value.length <= 10) {
                          onBillingInfoChange("phone", value); // Update the state with digits only
                        }
                      }}
                      maxLength={10}
                      disabled
                    />
                    {panFetched && (
                      <span className={styles.lockIcon}>
                        {svgSheet7.lockIcon}
                      </span>
                    )}
                  </div>
                </div>
              </Form.Item>
            </div>

            <Form.Item
              label={
                <span
                  className={`${lightMode ? "text-black" : "text-white"}`}
                  style={{
                    fontSize: "12px",
                  }}
                >
                  Email Address {svgSheet7.red_asterisk}
                </span>
              }
              name="email"
              rules={[
                {
                  required: true,
                  message: spanText("Name is required"),
                },
                {
                  min: 3,
                  message: spanText("Name should be at least 3 characters"),
                },
              ]}
              required={false}
              validateTrigger="onChange"
            >
              <div className={styles.inputWrapper_2}>
                <Input
                  className={`subscribe-ant-input ${
                    lightMode ? styles.customInput_light : styles.customInput
                  }`}
                  placeholder="Enter your email"
                  value={billingInfo?.email}
                  // value={billingInfo?.email}
                  onChange={(e) => onBillingInfoChange("email", e.target.value)}
                  disabled
                />
                {panFetched && (
                  <span className={styles.lockIcon}>{svgSheet7.lockIcon}</span>
                )}
              </div>
              <div
                className={`fs-s-10 mt-10 ${
                  lightMode ? "text-black" : "text-white"
                }`}
                style={{
                  opacity: "0.65",
                }}
              >
                Invoice will be sent to this email.
              </div>
            </Form.Item>

            <Form.Item
              label={
                <span
                  className={`${lightMode ? "text-black" : "text-white"}`}
                  style={{
                    fontSize: "12px",
                    color: "#D3D3D3",
                  }}
                >
                  State {svgSheet7.red_asterisk}
                </span>
              }
              required={false}
              name="state"
              rules={[
                {
                  required: true,
                  message: spanText("State is required"),
                },
              ]}
              validateTrigger="onChange"
            >
              <div className={styles.inputWrapper_2}>
                <Select
                  className={`custom-ant-select ${
                    lightMode
                      ? `custom-ant-select-light`
                      : `custom-ant-select-dark`
                  }`}
                  placeholder="Select your state"
                  value={billingInfo?.state || undefined}
                  onChange={(value) => onBillingInfoChange("state", value)}
                  dropdownClassName={styles.dropdownMenu}
                  options={statesList}
                  // disabled={!!billingInfo?.pan}
                />
              </div>
            </Form.Item>

            <span
              style={{
                color: "white",
                opacity: 0.6,
              }}
              className="text-center mb-10 fs-s-12"
            >
              By proceeding, you allow downloads of your KYC documents
            </span>

            <Button
              type="primary"
              className={styles.continueBtn}
              disabled={!isBillingInfoValid()}
              style={{
                marginBottom: "10px",
              }}
              loading={submitLoading}
            >
              {submitLoading ? (
                <span>Validating PAN...</span>
              ) : panFetched === true ||
                (panStatus && panFetched !== false) ||
                eSignStatusCheck2 ? (
                <span onClick={handleContinue}>Continue</span>
              ) : panFetched === false ? (
                <span
                  onClick={() => {
                    // Redirect to KRA
                    setPanFetched(null);
                    window.open(
                      "https://digital.camsonline.com/kycmodification",
                      "_blank"
                    );
                  }}
                >
                  Click to Complete your KYC
                </span>
              ) : (
                <span>Continue</span>
              )}
            </Button>
          </Form>
        </div>

        <div
          className={
            lightMode ? styles.sub_container_light : styles.sub_container
          }
        >
          <span>Sign Terms and condition</span>
        </div>
      </div>
    </div>
  );
};

export default PanStatusCheck;
