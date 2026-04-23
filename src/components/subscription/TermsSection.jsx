import React, { useEffect, useState } from "react";
import { Form, Button, Modal, Spin, message } from "antd";
import {
  CheckCircleFilled,
  CloseOutlined,
  LoadingOutlined,
  RightOutlined,
} from "@ant-design/icons";
import styles from "./SubscriptionStyles.module.css";

import { useRouter } from "next/router";
import {
  esignInitiate,
  eSignMonitorAPI,
  eSignStatusCheck,
  getPlans,
} from "../../pages/api/fetchClient";
import { decryptData } from "../../utilityFn/dataEncryption";
import numWithCommas from "../../utilityFn/numWithCommas";
import { current } from "@reduxjs/toolkit";

function maskPan(pan) {
  if (!pan || pan.length < 4) return "";
  const last4 = pan?.slice(-4);
  return "X".repeat(pan.length - 4) + last4;
}

const getAge = (dob) =>
  dob ? Math.floor((Date.now() - new Date(dob)) / 3.15576e10) : null;

const TermsSection = ({
  isActive,
  isCompleted,
  otpValue,
  onOtpChange,
  onContinue,
  onClick,
  lightMode,
  billingInfo,
  otpLoader,
  selectedPlan,
  esignData,
  setEsignData,
  eSignLoader,
  setESignLoader,
  signComplete,
  afterSignLoader,
  couponApplied,
}) => {
  const [form] = Form.useForm();
  const [termsModalTrigger, setTermsModalTrigger] = useState(false);
  const [eSignStatus, setESignStatus] = useState(null);
  const [eSignStatusCheck2, setEsignStatusCheck2] = useState(null);
  // const [allPlans, setAllPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (router.query.signed === "true") {
      getPlans().then((res) => {
        // setAllPlans(res?.data);

        setCurrentPlan(
          res?.data?.filter((item) => item.plan_id === router.query.plan)[0]
        );
      });
    }
  }, []);

  const { razorpay_payment_link_status } = router.query;

  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (!eSignLoader) return; // Only run countdown when eSignLoader is true

    let timer;
    setCountdown(10); // Reset countdown when eSignLoader becomes true

    timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer); // clear interval once timer hits 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup when eSignLoader changes or component unmounts
  }, [eSignLoader]);

  const statusCheck = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 2000)); // wait for 2s
    const res = await eSignMonitorAPI();

    if (!res?.data?.length) {
      const res = await eSignStatusCheck(
        selectedPlan?.id || currentPlan?.plan_id
      );

      const decryptedResponse = decryptData(
        res?.data?.data,
        process.env.NEXT_PUBLIC_PORTAL_AUTH_KEY
      );

      const parsedObject = convertToJSObject(decryptedResponse);

      setEsignStatusCheck2(parsedObject?.pan);
      return parsedObject?.esign_status;
    }

    const filteredPlan = res?.data?.filter(
      (item) => item.plan_id === (selectedPlan?.id || router.query.plan)
    )[0];

    if (filteredPlan?.status) {
      setESignStatus(filteredPlan?.status);

      setEsignData((prev) => {
        return {
          ...prev,
          pdfUrl: filteredPlan?.downloadUrl || "",
          eSignUrl: filteredPlan?.sign_url || "",
        };
      });

      return filteredPlan?.status;
    }
  };

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

  const checkCurrentStatus = async () => {
    const res = await eSignStatusCheck(selectedPlan?.id || router.query.plan);

    const decryptedResponse = decryptData(
      res?.data?.data,
      process.env.NEXT_PUBLIC_PORTAL_AUTH_KEY
    );

    const parsedObject = convertToJSObject(decryptedResponse);

    setEsignStatusCheck2(parsedObject?.esign_status);

    return parsedObject?.esign_status;
  };

  useEffect(() => {
    checkCurrentStatus();
  }, []);

  useEffect(() => {
    let timeoutId;

    if (
      signComplete === false ||
      (eSignStatus === "completed" && razorpay_payment_link_status !== "paid")
    ) {
      // if (eSignStatusCheck2 === "completed") {
      timeoutId = setTimeout(() => {
        onContinue(null, 3); // pass null as event and 3 as argument
      }, 2000); // 1.5 seconds
      // }
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [signComplete, eSignStatus]);

  useEffect(() => {
    statusCheck();
  }, []);

  const calculateFinalAmount = () => {
    if (selectedPlan?.id) {
      return (
        selectedPlan?.Price -
        (couponApplied
          ? couponApplied?.type === "monetary"
            ? couponApplied?.value
            : Math.round((selectedPlan?.Price * couponApplied?.value) / 100)
          : 0)
      );
    } else if (router.query.signed === "true") {
      const coupon = JSON.parse(localStorage.getItem("appliedCoupon"));

      return (
        currentPlan?.plan_amount -
        (coupon
          ? coupon?.type === "monetary"
            ? coupon?.value
            : Math.round((currentPlan?.plan_amount * coupon?.value) / 100)
          : 0)
      );
    }
  };

  const handleSubmit = async (e) => {
    const status = await checkCurrentStatus();

    setESignStatus(status);

    if (status === null || status === "rejected" || status === "failed") {
      setESignLoader(true);

      try {
        const res = await esignInitiate({
          plan_id: selectedPlan?.id || router.query?.plan,
          final_amount: calculateFinalAmount(),
        });

        setEsignData((prev) => ({
          ...prev,
          pdfUrl: res?.data?.file_url || "",
          eSignUrl: res?.data?.esign_url || "",
        }));
      } catch (err) {
        console.error("Error during eSign initiation:", err);
        message.error("Something went wrong, please try again!");
      } finally {
        setESignLoader(false); // always stop the loader
      }
    } else if (["in-progress", "started"].includes(status)) {
      router.push(`${esignData?.eSignUrl}`);
    }
  };

  return (
    <div
      className={`${lightMode ? styles.panel_light : styles.panel} ${
        isActive ? (lightMode ? styles.active_light : styles.active) : ""
      } ${isCompleted ? styles.completed : ""}`}
      onClick={onClick}
    >
      <Modal
        open={termsModalTrigger}
        onCancel={() => setTermsModalTrigger(false)}
        footer={null}
        closable
        centered
        width={600}
        closeIcon={
          <CloseOutlined
            className={`${lightMode ? "text-black" : "text-white"}`}
          />
        }
        className={`custom-kyc-terms-modal ${
          lightMode ? "kycmodal-close-light" : "kycmodal-close-dark"
        }`}
      >
        <div
          className={
            lightMode ? styles.terms_container_light : styles.terms_container
          }
        >
          <iframe
            src={esignData?.pdfUrl}
            title="PDF Document"
            width="100%"
            height="800px"
            style={{ border: "none" }}
          />
        </div>
      </Modal>

      {!isActive && (
        <span className={lightMode ? styles.title_light : styles.title}>
          Sign Terms of Service
        </span>
      )}

      {isActive ? (
        afterSignLoader ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "10vh", // adjust height as needed
              width: "100%",
            }}
          >
            <Spin size="large" tip="Pending..." />
          </div>
        ) : (
          <div className="flex flex-col gap-10px">
            <span
              className={`${
                lightMode ? "text-black" : "text-white"
              } fs-s-18 fw-500`}
            >
              Sign Terms of Service
            </span>

            <p
              className={`${lightMode ? "text-black" : "text-white"} ${
                styles.hint
              }`}
            >
              To confirm your details & terms of the service
            </p>

            {!eSignLoader ? (
              <>
                <Form
                  layout="vertical"
                  form={form}
                  initialValues={{ otp: otpValue }}
                >
                  <span
                    className={styles.termsBox}
                    onClick={() => setTermsModalTrigger(true)}
                  >
                    <span className={lightMode ? "text-black" : "text-white"}>
                      Read Terms of Service
                    </span>
                    <RightOutlined
                      className={lightMode ? "text-black" : "text-white"}
                    />
                  </span>

                  <Button
                    type="primary"
                    className={styles.continueBtn}
                    style={{ marginBottom: "10px" }}
                    loading={otpLoader}
                    onClick={
                      otpLoader
                        ? null
                        : signComplete === false || eSignStatus === "completed"
                        ? onContinue
                        : handleSubmit
                    }
                  >
                    {otpLoader ? (
                      <span>Submitting...</span>
                    ) : signComplete === false ||
                      eSignStatus === "completed" ? (
                      <span>Redirecting to payment...</span>
                    ) : (
                      <span>Continue to e-sign</span>
                    )}
                  </Button>
                </Form>
              </>
            ) : (
              <div className={styles.mobile_verified}>
                <div className={styles.validation_success}>
                  <LoadingOutlined
                    style={{
                      fontSize: 24,
                      marginRight: 8,
                      color: lightMode ? "black" : "white",
                    }}
                    spin
                  />
                  <span style={{ color: lightMode ? "black" : "white" }}>
                    Generating your terms of service
                  </span>
                  <span
                    className="fs-s-12"
                    style={{ color: lightMode ? "black" : "white" }}
                  >
                    Please wait for {countdown} second
                    {countdown !== 1 ? "s" : ""}...
                  </span>
                </div>
              </div>
            )}

            {!eSignLoader && (
              <span
                className={`text-center ${
                  lightMode ? "text-black" : "text-white"
                } fs-s-12`}
                style={{ opacity: "0.65" }}
              >
                By proceeding, you allow downloads of your KYC documents
              </span>
            )}
          </div>
        )
      ) : (
        isCompleted && (
          <div className={styles.termsInfo}>
            <span>Terms of service agreed</span>
            <CheckCircleFilled className={styles.checkIcon} />
          </div>
        )
      )}
    </div>
  );
};

export default TermsSection;
