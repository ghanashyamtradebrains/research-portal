import React, { useState, useEffect, useRef } from "react";
import { message, Modal, Spin } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import PlanSection from "./PlanSection";
import BillingSection from "./BillingSection";
import TermsSection from "./TermsSection";
import PaymentSection from "./PaymentSection";
import styles from "./SubscriptionStyles.module.css";
import { useSelector } from "react-redux";
import { getThemeMode } from "../../redux/reducers/ThemeSlice";
import {
  eSignStatusCheck,
  PostApplyCoupen,
  PostPlanSubScription,
  PostSubmitPlanSubScription,
} from "../../pages/api/fetchClient";
import { authStore } from "../../redux/reducers/authSlice";
import { decryptData } from "../../utilityFn/dataEncryption";
import { useRouter } from "next/router";

const arrayOFPlan = {
  basic: "Life Time Free",
  "3months_plus": "3 Month",
  "6months_plus": "6 Month",
  year_plus: "12 Months",
};

const SubscriptionModal = ({
  isOpen,
  onClose,
  clickedPlan,
  paymentTrigger,
  paymentSummary,
  planData,
  signComplete,
  esignMonitorData,
  afterSignLoader,
}) => {
  const scrollRef = useRef(null);
  const navigate = useRouter();
  const { lightMode } = useSelector(getThemeMode);
  const [activeSection, setActiveSection] = useState(1);
  const [completedSections, setCompletedSections] = useState([
    false,
    false,
    false,
    false,
  ]);
  const UserAuth = useSelector(authStore);
  const [email, setEmail] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingInfo, setBillingInfo] = useState({
    name: "",
    pan: "",
    pan_verified: null,
    dob: "",
    phone: "",
    email: "",
    address: "",
    state: "",
  });

  const [esignData, setEsignData] = useState({
    pdfUrl: "",
    eSignUrl: "",
    isInitiated: false,
    // isCompleted: false,
  });

  const [eSignLoader, setESignLoader] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [panStatus, setPanStatus] = useState(null);

  // Plan Section
  const [code, setCode] = useState("");
  const [couponApplied, setCouponApplied] = useState({
    type: null,
    value: 0,
  });
  const [couponValue, setCouponValue] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [appliedSuccess, setAppliedSuccess] = useState(false);
  const [error, setError] = useState("");
  const [AppliedCoupon, setAppliedCoupon] = useState();
  const [planStatus, setPlanStatus] = useState(null);

  // Declaration Section
  const [checkedList, setCheckedList] = useState([]);
  const handleDeclaration = (list) => {
    setCheckedList(list);
  };

  // Terms and OTP Section
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [otpLoader, setOtpLoader] = useState(false);
  // const [isMobileVerified, setIsMobileVerified] = useState(false);

  // Payment Section

  const PoseSubScription = () => {
    // 1. Get code and coupon value from state or fallback to localStorage
    let finalCode = code;

    if (!finalCode) {
      const stored = JSON.parse(localStorage.getItem("appliedCoupon"));
      if (stored) {
        try {
          finalCode = stored?.code || "";
        } catch (err) {
          console.error("Failed to parse stored coupon:", err);
        }
      }
    }

    const data = {
      plan: clickedPlan?.id || navigate.query.plan,
      coupon_code: finalCode,
      upgrade_discount: couponValue,
      status: "",
      code: "",
    };
    // setLoading(true);
    PostPlanSubScription(data)
      .then((res) => {
        // setLoading(false);
        // setcouponerr("");
        const isPendingUser = localStorage.getItem("esign_pending");
        if (res?.data?.request_url && !isPendingUser) {
          window.location.href = res.data.request_url;
        }
      })

      .catch((err) => {
        console.log(err);
        // setcouponerr(err?.response?.data);
        // setLoading(false);
      });
  };

  const handleTermsSubmit = async () => {
    setOtpLoader(true);

    setTimeout(() => {
      setOtpLoader(false);
    }, 1000);

    setTimeout(() => {
      PoseSubScription();
      onClose();
      message.success("Redirecting to payment page");
    }, 1000);
  };

  // ----------------------

  useEffect(() => {
    const postSubmitPlanSubScription = async (id) => {
      try {
        const res = await PostSubmitPlanSubScription({ plan_id: id });
        setCouponValue(res?.data?.upgrad_discount);
        setFinalAmount(res?.data?.final_amount);
      } catch (err) {
        console.error(err);
      }
    };

    if (selectedPlan?.id && finalAmount === 0) {
      postSubmitPlanSubScription(selectedPlan.id);
    }
  }, [selectedPlan?.id]);

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

  useEffect(() => {
    const statusCheck = async () => {
      const res = await eSignStatusCheck(
        clickedPlan?.id || navigate.query.plan
      );

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

      setPlanStatus(esign_status);

      const newCompletedSections = [...completedSections];

      if (esign_status) {
        setEsignData((prev) => ({
          ...prev,
          eSignUrl: esign_url,
          pdfUrl: file_url,
        }));

        setBillingInfo((prev) => ({
          ...prev,
          pan,
          state,
          email,
          name,
          phone: phone?.replace("+91", ""),
          pan_verified: !pan_verified,
        }));
        newCompletedSections[2] = true;
        setCompletedSections(newCompletedSections);

        setActiveSection(3);
      } else if (pan) {
        setBillingInfo((prev) => ({
          ...prev,
          pan,
          state,
          email,
          name,
          phone: phone.replace("+91", ""),
          pan_verified: !pan_verified,
        }));

        setActiveSection(2);

        setPanStatus(esign_status);

        newCompletedSections[1] = true;
        setCompletedSections(newCompletedSections);
      }
    };

    if (isOpen) {
      statusCheck();
    }
  }, [isOpen]);

  const applyCoupon = async (optionalCode) => {
    const plan_id = clickedPlan?.id;

    try {
      const res = await PostApplyCoupen({
        plan_id,
        CouponValue: optionalCode || code,
      });

      if (res?.data[0] === "no coupons") {
        setError("Coupon not found");
        return false;
      } else {
        localStorage.setItem(
          "appliedCoupon",
          JSON.stringify({
            code: res?.data[0]?.code,
            type: res?.data[0]?.type,
            value: res?.data[0]?.value,
          })
        );

        setCode(res?.data[0]?.code);
        setCouponApplied((prev) => {
          return {
            ...prev,
            type: res?.data[0]?.type,
            value: res?.data[0]?.value,
          };
        });
        // setAppliedCoupon(res?.data[0]?.code);

        setError("");
        setAppliedSuccess(true);
        return true;
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      setError("Something went wrong. Please try again.");
      return false;
    }
  };

  const completeSection = async (e, sectionIndex) => {
    e?.stopPropagation();

    let newCompletedSections = [];
    newCompletedSections = [...completedSections];
    newCompletedSections[sectionIndex] = true;

    if (sectionIndex === 3) {
      handleTermsSubmit();
    } else if (sectionIndex !== 3) {
      setCompletedSections(newCompletedSections);
      setActiveSection(sectionIndex + 1);
    }
  };

  const handleBillingInfoChange = (field, value) => {
    setBillingInfo((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  useEffect(() => {
    if (UserAuth?.userData?.user?.email)
      setBillingInfo({
        ...billingInfo,
        email: UserAuth?.userData?.user?.email,
      });
    setEmail(UserAuth?.userData?.user?.email);
  }, [UserAuth]);

  useEffect(() => {
    if (isOpen && clickedPlan) {
      const { id, name, Price, discount, initial, breakup } = clickedPlan;

      setSelectedPlan({
        id,
        name,
        price: Price,
        originalPrice: initial,
        discount,
        duration: arrayOFPlan[id],
        breakup: {
          ...breakup,
        },
      });
    }
  }, [isOpen, clickedPlan]);

  useEffect(() => {
    if (paymentTrigger && planData) {
      const purchasedPlan = planData?.filter(
        (item) => item.plan_id === paymentSummary.plan
      )[0];

      const {
        plan_id: id,
        plan_amount: price,
        initial_price: originalPrice,
        plan_sname: name,
      } = purchasedPlan || {};

      const duration = purchasedPlan?.benefits?.["Plan Validity"];
      setSelectedPlan({
        name,
        id,
        price,
        originalPrice,
        duration,
        discount: 0,
      });

      return;
    }
  }, [paymentTrigger]);

  useEffect(() => {
    if (signComplete !== null && planData) {
      const purchasedPlan = planData?.filter(
        (item) => item.plan_id === paymentSummary.plan
      )[0];

      const {
        plan_id: id,
        plan_amount: price,
        initial_price: originalPrice,
        plan_sname: name,
      } = purchasedPlan || {};

      const duration = purchasedPlan?.benefits?.["Plan Validity"];

      setSelectedPlan({
        name,
        id,
        price,
        originalPrice,
        duration,
        discount: 0,
      });

      return;
    }
  }, [signComplete]);

  useEffect(() => {
    if (paymentTrigger) {
      setActiveSection(4);
      setCompletedSections([true, true, true, true]);

      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 500);
    } else if (signComplete === true || signComplete === false) {
      setEsignData((prev) => {
        return {
          ...prev,
          pdfUrl: esignMonitorData?.downloadUrl,
          eSignUrl: esignMonitorData?.sign_url,
        };
      });
      setActiveSection(3);
    }
  }, [paymentTrigger, signComplete]);

  return (
    <Modal
      open={isOpen || paymentTrigger}
      onCancel={onClose}
      footer={null}
      width={600}
      centered
      closeIcon={
        <CloseOutlined
          className={`${lightMode ? "text-black" : "text-white"}`}
        />
      }
      maskClosable={false}
    >
      <main
        className={`${styles.main_container} ${styles.scroll}`}
        style={{
          backgroundColor: lightMode ? "#f2f6f8" : "#212639",
        }}
        ref={scrollRef}
      >
        <div>
          <h3 className={styles.modalTitle}>Subscribing to</h3>
          <span className={styles.brandTitle}>{selectedPlan?.name}</span>
        </div>
        {/* <EmailSection
          isActive={activeSection === 0}
          isCompleted={completedSections[0]}
          email={paymentTrigger ? paymentSummary.id : email}
          onEmailChange={setEmail}
          onContinue={(e) => completeSection(e, 0)}
          onClick={() => {
            setActiveSection(0);
          }}  
          lightMode={lightMode}
        /> */}
        <PlanSection
          isActive={activeSection === 1}
          isCompleted={completedSections[1]}
          selectedPlan={selectedPlan}
          clickedPlan={clickedPlan}
          code={code}
          setCode={setCode}
          onPlanSelect={setSelectedPlan}
          onContinue={(e) => completeSection(e, 1)}
          onClick={() => {
            if (!paymentSummary) setActiveSection(1);
          }}
          applyCoupon={applyCoupon}
          appliedSuccess={appliedSuccess}
          error={error}
          setError={setError}
          couponApplied={couponApplied}
          setCouponApplied={setCouponApplied}
          lightMode={lightMode}
        />
        <BillingSection
          isActive={activeSection === 2}
          isCompleted={completedSections[2]}
          billingInfo={billingInfo}
          onBillingInfoChange={handleBillingInfoChange}
          setBillingInfo={setBillingInfo}
          onContinue={(e) => {
            completeSection(e, 2);
          }}
          onClick={() => {
            if (completedSections[1] && !paymentSummary) setActiveSection(2);
          }}
          lightMode={lightMode}
          selectedPlan={clickedPlan}
          panStatus={panStatus}
          esignData={esignData}
          setEsignData={setEsignData}
          setESignLoader={setESignLoader}
          couponApplied={couponApplied}
        />
        {/* <DeclarationSection
          isActive={activeSection === 3}
          isCompleted={completedSections[3]}
          onContinue={(e) => completeSection(e, 3)}
          handleDeclaration={handleDeclaration}
          onClick={() => {
            if (completedSections[2]) setActiveSection(3);
          }}
          lightMode={lightMode}
          checkedList={checkedList}
        /> */}

        <TermsSection
          isActive={activeSection === 3}
          isCompleted={completedSections[3]}
          termsAgreed={termsAgreed}
          otpValue={otpValue}
          onTermsChange={setTermsAgreed}
          onOtpChange={setOtpValue}
          onContinue={(e) => completeSection(e, 3)}
          onClick={() => {
            if (completedSections[2] && !paymentSummary) setActiveSection(3);
          }}
          lightMode={lightMode}
          billingInfo={billingInfo}
          otpLoader={otpLoader}
          selectedPlan={clickedPlan}
          esignData={esignData}
          setEsignData={setEsignData}
          eSignLoader={eSignLoader}
          setESignLoader={setESignLoader}
          signComplete={signComplete}
          afterSignLoader={afterSignLoader}
          couponApplied={couponApplied}
        />

        <PaymentSection
          isActive={activeSection === 4}
          isCompleted={completedSections[4]}
          paymentMethod={paymentMethod}
          onPaymentMethodChange={setPaymentMethod}
          onContinue={(e) => completeSection(e, 4)}
          onClick={() => {
            if (completedSections[3]) setActiveSection(4);
          }}
          lightMode={lightMode}
        />
      </main>
    </Modal>
  );
};

export default SubscriptionModal;
