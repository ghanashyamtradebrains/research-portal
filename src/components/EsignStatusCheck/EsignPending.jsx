import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getThemeMode } from "../../redux/reducers/ThemeSlice";
import styles from "./styles.module.css";
import { Button, Form, message, Modal } from "antd";
import {
  CheckCircleFilled,
  CloseOutlined,
  LoadingOutlined,
  RightOutlined,
} from "@ant-design/icons";
import svgSheet7 from "../../assets/svg/svgSheet7";
import {
  esignInitiate,
  eSignMonitorAPI,
  eSignStatusCheck,
} from "../../pages/api/fetchClient";
import { decryptData } from "../../utilityFn/dataEncryption";
import { authStore } from "../../redux/reducers/authSlice";
import { useRouter } from "next/router";

const EsignPending = ({
  billingInfo,
  esignData,
  setEsignData,
  eSignLoader,
  setESignLoader,
}) => {
  const [form] = Form.useForm();
  const { lightMode } = useSelector(getThemeMode);
  const router = useRouter();
  const [termsModalTrigger, setTermsModalTrigger] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const UserAuth = useSelector(authStore);
  const planId = UserAuth?.userData?.user?.plan?.planId;
  const [eSignStatusCheck2, setEsignStatusCheck2] = useState(null);
  const [eSignStatus, setESignStatus] = useState(null);

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
    // }, []);
  }, [eSignLoader]);

  // ************** ESIGN WHOLE PROCESS BELOW ***************

  const statusCheck = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 2000)); // wait for 2s
    const res = await eSignMonitorAPI();

    if (!res?.data?.length) {
      const res = await eSignStatusCheck(
        // selectedPlan?.id || currentPlan?.plan_id
        planId
      );

      const decryptedResponse = decryptData(
        res?.data?.data,
        process.env.NEXT_PUBLIC_PORTAL_AUTH_KEY
      );

      const parsedObject = convertToJSObject(decryptedResponse);

      // setEsignStatusCheck2(parsedObject?.pan);
      return parsedObject?.esign_status;
    }

    const filteredPlan = res?.data?.filter(
      (item) => item.plan_id === (planId || router.query.plan)
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
    const res = await eSignStatusCheck(planId || router.query.plan);

    const decryptedResponse = decryptData(
      res?.data?.data,
      process.env.NEXT_PUBLIC_PORTAL_AUTH_KEY
    );

    const parsedObject = convertToJSObject(decryptedResponse);

    setEsignStatusCheck2(parsedObject?.esign_status);

    return parsedObject;
  };

  const handleSubmit = async (e) => {
    const { esign_status: status, subscriptions } = await checkCurrentStatus();

    setESignStatus(status);

    const currentPlan = subscriptions?.find((item) => item?.plan === planId);

    if (status === null || status === "rejected" || status === "failed") {
      localStorage.setItem("esign_pending", "true");
      setESignLoader(true);

      try {
        const res = await esignInitiate({
          plan_id: currentPlan?.plan,
          final_amount: currentPlan?.amount,
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

  useEffect(() => {
    checkCurrentStatus();
    statusCheck();
  }, []);

  // useEffect(() => {
  //   let timeoutId;

  //   if (
  //     signComplete === false ||
  //     (eSignStatus === "completed" && razorpay_payment_link_status !== "paid")
  //   ) {
  //     // if (eSignStatusCheck2 === "completed") {
  //     timeoutId = setTimeout(() => {
  //       onContinue(null, 3); // pass null as event and 3 as argument
  //     }, 2000); // 1.5 seconds
  //     // }
  //   }

  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, [signComplete, eSignStatus]);

  return (
    <div>
      <div>
        <div
          className={
            lightMode ? styles.sub_container_light : styles.sub_container
          }
        >
          <span>Add Billing Information</span>
        </div>
        <div
          className={
            lightMode ? styles.sub_container_light : styles.sub_container
          }
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
                lightMode
                  ? styles.terms_container_light
                  : styles.terms_container
              }
            >
              {esignData?.pdfUrl ? (
                <iframe
                  src={esignData?.pdfUrl}
                  title="PDF Document"
                  width="100%"
                  height="700px"
                  style={{ border: "none" }}
                />
              ) : (
                <span className={lightMode ? "text-black" : "text-white"}>
                  Something went wrong. Please try again!
                </span>
              )}
            </div>
          </Modal>
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
              <Form layout="vertical" form={form}>
                <span
                  className={styles.termsBox}
                  onClick={() => {
                    if (esignData?.pdfUrl) {
                      setTermsModalTrigger(true);
                    } else {
                      message.error("Please continue with e-sign first");
                    }
                  }}
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
                  // loading={otpLoader}
                  onClick={
                    // otpLoader
                    //   ? null
                    //   : signComplete === false || eSignStatus === "completed"
                    //   ? onContinue
                    // : handleSubmit
                    handleSubmit
                  }
                >
                  {eSignStatusCheck2 === "completed" ? (
                    <span>Confirm and Continue</span>
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
      </div>
    </div>
  );
};

export default EsignPending;
