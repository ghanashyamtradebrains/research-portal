import React, { useEffect, useRef, useState } from "react";
import { Button, Drawer, Modal, Radio, Space } from "antd";
import { CheckCircleFilled, CloseOutlined } from "@ant-design/icons";
import styles from "./SubscriptionStyles.module.css";
import svgSheet from "../../assets/svg/svgSheet";
import svgSheet7 from "../../assets/svg/svgSheet7";
import useWindowWidth from "../../utilityFn/getWindowWidth";
import numberWithCommas from "../../utilityFn/numberWithCommas";
import numWithCommas from "../../utilityFn/numWithCommas";
import { getCouponsList } from "../../pages/api/fetchClient";
import NoData from "../home/components/NoData";

const shortPlan = {
  "3months_plus": "/ 3 M",
  "6months_plus": "/ 6 M",
  year_plus: "/ 12 M",
};

const PlanSection = ({
  isActive,
  isCompleted,
  selectedPlan,
  clickedPlan,
  onPlanSelect,
  code,
  setCode,
  onContinue,
  onClick,
  lightMode,
  applyCoupon,
  appliedSuccess,
  error,
  setError,
  couponApplied,
  setCouponApplied,
}) => {
  const inputRef = useRef(null);
  const [couponModal, setCouponModal] = useState(false);
  const [couponApplied2, setCouponApplied2] = useState(false);
  const windowWidth = useWindowWidth();
  const [couponList, setCouponList] = useState([]);
  // Drawer

  const [open, setOpen] = useState(false);

  useEffect(() => {
    getCouponsList({ plan_id: clickedPlan?.id }).then((res) => {
      setCouponList([...res?.data]);
    });
  }, [open]);

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (couponModal) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100); // slight delay to ensure modal is rendered
    }
  }, [couponModal]);

  const handleContinue = async (code) => {
    const isSuccess = await applyCoupon(code);

    if (isSuccess) {
      setCouponModal(false);
      setCouponApplied2(true);
      setError("");
    }

    // onEmailChange(values.email);
    // onContinue(e);
  };

  const handleCancel = () => {
    setCouponModal(false);
    setCode("");
    setError("");
    setCouponApplied({
      type: null,
      value: 0,
    });
  };

  return (
    <div
      className={`${lightMode ? styles.panel_light : styles.panel} ${
        isActive ? (lightMode ? styles.active_light : styles.active) : ""
      } ${isCompleted ? styles.completed : ""}`}
      onClick={onClick}
    >
      <Modal
        open={couponModal}
        onCancel={handleCancel}
        footer={null}
        width={400}
        centered
        closeIcon={
          <CloseOutlined
            className={`${lightMode ? "text-black" : "text-white"}`}
          />
        }
        maskClosable={true}
      >
        <main
          className={`${styles.main_container} ${styles.scroll}`}
          style={{
            backgroundColor: lightMode ? "#f2f6f8" : "#212639",
          }}
        >
          <div className="flex flex-col gap-5px">
            <h3
              className={
                lightMode ? styles.coupon_title_light : styles.coupon_title
              }
            >
              Apply Coupon
            </h3>
            <div style={{ display: "flex", width: "100%" }}>
              <input
                ref={inputRef}
                type="text"
                value={code}
                className={`${
                  lightMode ? styles.customInput_light : styles.customInput
                }`}
                placeholder="Enter Coupon"
                onChange={(e) => {
                  setCode(e.target.value);
                }}
                maxLength={20}
                autoFocus
                style={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  marginBottom: 0,
                  flex: 1,
                }}
              />
              <Button
                style={{
                  backgroundColor: "#6DB8FD", // Sky blue
                  color: lightMode ? "#000" : "#fff",
                  border: "none",
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  height: "40px",
                }}
                onClick={() => handleContinue(code)}
              >
                Apply
              </Button>
            </div>
            {error && (
              <span
                style={{
                  color: "#FA8072",
                  fontSize: "12px",
                }}
              >
                {error}
              </span>
            )}{" "}
            <div
              className={
                lightMode ? styles.couponList_light : styles.couponList
              }
            >
              {couponList?.length === 0 ? (
                <div className="mt-70">
                  <NoData errorText={"No Coupons"} />
                </div>
              ) : (
                <div>
                  {couponList?.map((items) => (
                    <>
                      {items?.visible !== "No" && (
                        <div
                          className={` ${
                            lightMode
                              ? "card-drop-light-shadow"
                              : "card-drop-dark-shadow"
                          }  br-5 p-12 my-20`}
                        >
                          <div className="d-flex justify-content-between align-items-center bb1px-dark-mode">
                            <div>
                              <p className="gradient-text-blue fw-600 mb-0">
                                {items?.code}
                              </p>
                              <p className="ff-lato">{items?.description}</p>
                            </div>
                            <p
                              className=" fw-500 pointer"
                              onClick={() => {
                                // setCode(items?.code);
                                handleContinue(items?.code);
                              }}
                            >
                              Apply
                            </p>
                          </div>

                          {/* <p className="fw-500 mt-15 ff-lato">
                            {" "}
                            Use Code & get ₹
                            {items?.type === "percentage"
                              ? (
                                  (items?.value / 100) *
                                  SortedPlan?.plan_amount
                                ).toFixed(2)
                              : items?.value}{" "}
                            on as a first time user
                          </p> */}
                        </div>
                      )}
                    </>
                  ))}
                </div>
              )}
              {/* {Array.from({ length: 3 }).map((_, index) => (
                <div className={styles.main_coupon_container}>
                  <div
                    className={
                      lightMode ? styles.couponRow_light : styles.couponRow
                    }
                    onClick={() => {
                      setCouponModal(false);
                      setCouponApplied2(true);
                      setError("");
                    }}
                  >
                    <span className={styles.couponCode}>EID25OFF</span>
                    <span className={styles.couponDiscount}>25% off</span>
                  </div>
                  <hr
                    className={styles.divider}
                    style={{
                      display: index === 2 ? "none" : "block",
                    }}
                  />
                </div>
              ))} */}
            </div>
          </div>
        </main>
      </Modal>

      <Drawer
        placement={"bottom"}
        closable={true}
        onClose={onClose}
        open={open}
        key={"bottom"}
        getContainer={false}
        headerStyle={{ display: "none" }}
        bodyStyle={{
          padding: "0px",
          margin: "0px",
        }}
      >
        <div
          className={
            lightMode ? styles.summaryWrapper_light : styles.summaryWrapper
          }
        >
          <div className={styles.summaryHeader}>
            <span className={styles.drawerHeader}>Total Payment Summary</span>
            <span onClick={() => onClose()}>{svgSheet.cancelIcon}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Plan value</span>
            <span className="ff-lato">
              ₹ {numWithCommas(selectedPlan?.originalPrice)}
            </span>
          </div>

          <div
            className={lightMode ? styles.detailsBox_light : styles.detailsBox}
          >
            <div className={styles.summaryRow}>
              <span className={styles.label}>GST</span>
              <span className={styles.amount}>
                ₹ {numWithCommas(selectedPlan?.breakup?.gst)}
              </span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.label}>Price before GST</span>
              <span className={styles.amount}>
                ₹ {numWithCommas(selectedPlan?.breakup?.price_before_gst)}
              </span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.label}>Platform tools</span>
              <span className={styles.amount}>
                ₹ {numWithCommas(selectedPlan?.breakup?.other_tools)}
              </span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.label}>Research Fees</span>
              <span className={styles.amount}>
                ₹ {numberWithCommas(selectedPlan?.breakup?.ra_price)}
              </span>
            </div>
          </div>

          <div className={styles.summaryRow}>
            <span className={styles.discountLabel}>Discount Value</span>
            <span
              className={lightMode ? styles.discount_light : styles.discount}
            >
              - ₹
              {numWithCommas(selectedPlan?.originalPrice - selectedPlan?.price)}
            </span>
          </div>

          <div className={styles.summaryRow}>
            <span className={styles.discountLabel}>Coupon Value</span>
            <span
              className={lightMode ? styles.discount_light : styles.discount}
            >
              ₹{" "}
              {numWithCommas(
                couponApplied
                  ? couponApplied.type === "monetary"
                    ? couponApplied?.value
                    : Math.round(
                        (selectedPlan?.price * couponApplied?.value) / 100
                      )
                  : 0
              )}
            </span>
          </div>

          <div className={styles.finalRow}>
            <div className={styles.finalNoteContainer}>
              <span className={styles.finalNote}>Amount Payable</span>
              <span className={styles.finalNote_info}>
                * Inclusive of all taxes
              </span>
            </div>
            <span className={styles.finalAmount}>
              ₹{" "}
              {numWithCommas(
                selectedPlan?.price -
                  (couponApplied
                    ? couponApplied.type === "monetary"
                      ? selectedPlan?.price - couponApplied.value
                      : Math.round(
                          (selectedPlan?.price * couponApplied.value) / 100
                        )
                    : 0)
              )}
            </span>
          </div>
        </div>
      </Drawer>

      {isCompleted && !isActive ? (
        <>
          {selectedPlan && (
            <div className={styles.planInfo}>
              <span className={`${lightMode ? "text-black" : "text-white"}`}>
                Selected Plan
              </span>
              <span className={styles.planNameInfo}>{selectedPlan?.name}</span>
              <span className={styles.planPriceInfo}>
                ₹
                {numWithCommas(
                  selectedPlan?.price -
                    (couponApplied
                      ? couponApplied.type === "monetary"
                        ? couponApplied.value
                        : Math.round(
                            (selectedPlan?.price * couponApplied.value) / 100
                          )
                      : 0)
                )}{" "}
                /{" "}
                {windowWidth > 600
                  ? selectedPlan?.duration
                  : selectedPlan?.duration?.replace(/\s*months?/i, "M")}
              </span>
              <CheckCircleFilled className={styles.checkIcon} />
            </div>
          )}
        </>
      ) : (
        <>
          {!isActive && (
            <span className={lightMode ? styles.title_light : styles.title}>
              Select Plan
            </span>
          )}

          {isActive && (
            <div>
              <span
                className={`${
                  lightMode ? "text-black" : "text-white"
                } fs-s-18 fw-500`}
              >
                Selected Plan
              </span>
              <div className={styles.planCard}>
                <div className={styles.plan_summary}>
                  <span className={styles.planName}>{selectedPlan?.name}</span>
                  <div
                    className={styles.discountRow}
                    style={{
                      display:
                        selectedPlan?.id === "trial_plus" ? "none" : "block",
                    }}
                  >
                    <span
                      className={
                        lightMode
                          ? styles.originalPrice_light
                          : styles.originalPrice
                      }
                    >
                      ₹{numWithCommas(selectedPlan?.originalPrice)}
                    </span>
                    <span
                      className={
                        lightMode ? styles.discount_light : styles.discount
                      }
                    >
                      {numWithCommas(selectedPlan?.discount)} % OFF
                    </span>
                  </div>
                  <div
                    className={lightMode ? styles.price_light : styles.price}
                    style={{
                      marginTop: selectedPlan?.id === "trial_plus" && "5px",
                    }}
                  >
                    ₹{numWithCommas(selectedPlan?.price)}{" "}
                    {shortPlan[selectedPlan?.id]}
                  </div>
                </div>

                <span
                  className={styles.payment_summary}
                  onClick={() => setOpen(true)}
                >
                  Payment Summary
                </span>

                <div className={styles.info_container}>
                  <div className={styles.amountRow}>
                    <div className={styles.amountLabel}>
                      <span
                        style={{
                          marginTop: "5px",
                        }}
                      >
                        {svgSheet.receiptIcon}
                      </span>
                      <span
                        className={`${lightMode ? "text-black" : "text-white"}`}
                        style={{
                          display: "flex",
                          gap: "5px",
                        }}
                      >
                        {lightMode
                          ? svgSheet7.receiptIcon_light
                          : svgSheet7.receiptIcon}{" "}
                        Amount to pay
                      </span>
                    </div>
                    <span
                      className={`${
                        lightMode ? "text-black" : "text-white"
                      } fw-600 ff-lato`}
                    >
                      ₹{" "}
                      {numWithCommas(
                        selectedPlan?.price -
                          (couponApplied
                            ? couponApplied.type === "monetary"
                              ? couponApplied?.value
                              : Math.round(
                                  (selectedPlan?.price * couponApplied?.value) /
                                    100
                                )
                            : 0)
                      )}
                    </span>
                  </div>

                  <div className={styles.divider_dashed}></div>

                  {couponApplied2 ? (
                    <div
                      className={styles.couponRow_3}
                      onClick={() => setCouponModal(true)}
                    >
                      <div className={styles.apply_coupon}>
                        <span className="mt-5">{svgSheet.discountCoupon}</span>
                        <span
                          className={`${styles.icon_styles} ${
                            lightMode ? "text-black" : "text-white"
                          }`}
                        >
                          {svgSheet7.discountIconBlue} Coupon Applied{" "}
                          {/* <span className="ff-lato">{code}</span> */}
                        </span>
                      </div>
                      <div className="d-flex gap-10px">
                        <span
                          style={{
                            color: "#6DB8FD",
                          }}
                          className="ff-lato"
                        >
                          {code}
                        </span>
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            localStorage.removeItem("appliedCoupon");
                            setCouponApplied2(false);
                            setCouponApplied({
                              type: "",
                              value: 0,
                            });
                          }}
                        >
                          {svgSheet.cancelIcon}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={styles.couponRow_2}
                      onClick={() => setCouponModal(true)}
                    >
                      <div className={styles.apply_coupon}>
                        <span className="mt-5">{svgSheet.discountCoupon}</span>
                        <span
                          className={`${styles.icon_styles} ${
                            lightMode ? "text-black" : "text-white"
                          }`}
                        >
                          {svgSheet7.discountIconBlue} Apply Coupon
                        </span>
                      </div>
                      {lightMode
                        ? svgSheet7.rightArrow_light
                        : svgSheet7.rightArrow}
                    </div>
                  )}
                </div>
              </div>

              <Button
                type="primary"
                className={styles.continueBtn}
                onClick={(e) => onContinue(e)}
              >
                Continue
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PlanSection;
