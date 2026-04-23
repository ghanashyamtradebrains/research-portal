import React, { useEffect, useState } from "react";
import PanStatusCheck from "./PanStatusCheck";
import EsignPending from "./EsignPending";
import EsignCompleted from "./EsignCompleted";
import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getThemeMode } from "../../redux/reducers/ThemeSlice";
import { useRouter } from "next/router";
import { decryptData } from "../../utilityFn/dataEncryption";
import { eSignStatusCheck } from "../../pages/api/fetchClient";
import {
  authStore,
  setAuth,
  updateAccessToken,
} from "../../redux/reducers/authSlice";
import { resetWatchlistArr } from "../../redux/reducers/watchListSlice";
import {
  setLoginTime,
  setSessionTime,
} from "../../redux/reducers/loginTimeSlice";
import { setToggleForm } from "../../redux/reducers/AuthToggleSlice";
import Cookies from "js-cookie";

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

const StatusCheckModal = ({
  isModalOpen,
  setIsModalOpen,
  onClose,
  esignCheck,
  termsSigned,
}) => {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const { lightMode } = useSelector(getThemeMode);
  const [activeSection, setActiveSection] = useState(1);
  const [panStatus, setPanStatus] = useState(null);
  const UserAuth = useSelector(authStore);
  const [eSignLoader, setESignLoader] = useState(false);
  const planId = UserAuth?.userData?.user?.plan?.planId;
  // const [email, setEmail] = useState("");
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
  });

  useEffect(() => {
    const statusCheck = async () => {
      const res = await eSignStatusCheck(planId);

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

      // setPlanStatus(esign_status);

      if (
        esign_status === "completed" &&
        navigate.asPath === "/dashboard?signed=true"
      ) {
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
      }
    };

    if (isModalOpen) {
      statusCheck();
    }
  }, [isModalOpen]);

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
    // setEmail(UserAuth?.userData?.user?.email);
  }, [UserAuth]);

  const userLogout = () => {
    setIsModalOpen(false);

    dispatch(setAuth({}));
    dispatch(updateAccessToken());
    dispatch(resetWatchlistArr());
    dispatch(setSessionTime());
    dispatch(setLoginTime());
    dispatch(setToggleForm(null));
    Cookies.remove("ptl_access_token");
    Cookies.remove("login_time");
    Cookies.remove("start_session");
    navigate.push("/");
  };

  return (
    <div>
      <Modal
        open={isModalOpen}
        // onCancel={onClose}
        footer={null}
        width={600}
        centered
        closable={false}
        // maskClosable={false}
      >
        <main
          className={`${styles.main_container} ${styles.scroll}`}
          style={{
            backgroundColor: lightMode ? "#f2f6f8" : "#212639",
          }}
        >
          <div className={lightMode ? "text-black" : "text-white"}>
            <span
              className="text-center text-red"
              style={{
                color: "#F82E2E",
                fontWeight: "500",
                fontSize: "18px",
              }}
            >
              To Continue Using RA Services
            </span>
            <span
              className="text-center"
              style={{
                width: "500px",
                margin: "10px auto",
              }}
            >
              Please complete the mandatory KYC process as required by SEBI
              regulations.
            </span>
          </div>
          {activeSection === 1 && (
            <PanStatusCheck
              billingInfo={billingInfo}
              setBillingInfo={setBillingInfo}
              panStatus={panStatus}
              onBillingInfoChange={handleBillingInfoChange}
              setActiveSection={setActiveSection}
              esignData={esignData}
              setEsignData={setEsignData}
              setESignLoader={setESignLoader}
              // email={email}
            />
          )}
          {activeSection === 2 && !termsSigned && (
            <EsignPending
              billingInfo={billingInfo}
              esignData={esignData}
              setEsignData={setEsignData}
              eSignLoader={eSignLoader}
              setESignLoader={setESignLoader}
            />
          )}
          {(activeSection === 3 || termsSigned) && (
            <EsignCompleted setIsModalOpen={setIsModalOpen} />
          )}
          <span
            onClick={userLogout}
            className="fs-s-14 fw-500 text-center cursor-pointer"
            style={{
              color: lightMode ? "#3b3f4f" : "#c2c2c2",
            }}
          >
            Logout
          </span>
        </main>
      </Modal>
    </div>
  );
};

export default StatusCheckModal;
