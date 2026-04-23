import React from "react";
import svgSheet8 from "../../assets/svg/svgSheet8";
import { useSelector } from "react-redux";
import { getThemeMode } from "../../redux/reducers/ThemeSlice";
import styles from "./styles.module.css";
import { Button } from "antd";
import svgSheet7 from "../../assets/svg/svgSheet7";
import { useRouter } from "next/router";

const EsignCompleted = ({ setIsModalOpen }) => {
  const { lightMode } = useSelector(getThemeMode);
  const router = useRouter();

  return (
    <div>
      <div className={lightMode ? "text-black" : "text-white"}>
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

          {/* Terms Signed Successfully */}

          <div
            className={
              lightMode ? styles.terms_success_light : styles.terms_success
            }
          >
            <span>
              {" "}
              {lightMode
                ? svgSheet7.largeValidationIcon_light
                : svgSheet7.largeValidationIcon}
            </span>
            <span>Terms and conditions was signed Successfully</span>
          </div>

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
              //   : handleSubmit

              () => {
                setIsModalOpen(false);
                router.push("/stock-research-report");
              }
            }
          >
            <span>Confirm and Continue</span>
          </Button>

          {/* {!eSignLoader && ( */}
          <span
            className={`text-center ${
              lightMode ? "text-black" : "text-white"
            } fs-s-12`}
            style={{ opacity: "0.65" }}
          >
            By proceeding, you allow downloads of your KYC documents
          </span>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default EsignCompleted;
