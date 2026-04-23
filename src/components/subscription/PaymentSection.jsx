import React, { useEffect } from "react";
import { Button, Radio, Space } from "antd";
import styles from "./SubscriptionStyles.module.css";
import svgSheet7 from "../../assets/svg/svgSheet7";
import { useSelector } from "react-redux";
import { authStore } from "../../redux/reducers/authSlice";
import { useRouter } from "next/router";
import { getFormatDate } from "../../utilityFn/getFormatdate";

const PaymentSection = ({
  isActive,
  isCompleted,
  paymentMethod,
  onPaymentMethodChange,
  onContinue,
  onClick,
  lightMode,
}) => {
  const router = useRouter();
  const { razorpay_payment_link_status } = router.query;
  const { userData } = useSelector(authStore);

  useEffect(() => {
    let timerId;
    if (isActive) {
      setTimeout(() => {
        localStorage.removeItem("appliedCoupon");
        router.push("/dashboard");
      }, 3000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [isActive]);

  return (
    <div
      className={`${lightMode ? styles.panel_light : styles.panel} ${
        isActive ? (lightMode ? styles.active_light : styles.active) : ""
      } ${isCompleted ? styles.completed : ""}`}
      onClick={onClick}
    >
      <span className={lightMode ? styles.title_light : styles.title}>
        Complete Payment
      </span>

      {isActive && (
        <div className={styles.main}>
          <div
            className={
              lightMode
                ? styles.payment_main_container_light
                : styles.payment_main_container
            }
          >
            <div className={styles.lotte_style}>
              <dotlottie-player
                src="https://lottie.host/b003e992-bdeb-4657-8560-53f53ef03782/Dp2dqG4Amm.lottie"
                background="transparent"
                speed="1"
                className={styles.lotte}
                loop
                autoplay
              ></dotlottie-player>
            </div>

            <p className={styles.payment_success_text}>Payment Successful</p>
            <div className={styles.congratulations_party}>
              <span className={styles.party_pop}>{svgSheet7.party_pop}</span>
              <span className={styles.congratulations_text}>
                Congratulations!!
              </span>
            </div>
            <div className={styles.plan_name_container}>
              Your{" "}
              {/* {router.query?.plan === "year_plus" ? "Whales +" : "Eagles +"}{" "} */}
              Plan is Active on Portal. Plan expires on{" "}
              {getFormatDate(userData?.user?.premiumExpiry)}
            </div>

            <div className={styles.return_button}>
              Redirecting to dashboard...
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSection;
