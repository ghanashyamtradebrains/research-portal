import { Modal } from "antd";
import PromoWidget from "./PromoWidget";
import styles from "./AuthModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getThemeMode } from "../../redux/reducers/ThemeSlice";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { useCallback, useEffect, useMemo, useState } from "react";
import ForgotPassword from "./ForgotPassword";
import ConfirmPassword from "./ConfirmPassword";
import {
  setToggleForm,
  toggleStore,
} from "../../redux/reducers/AuthToggleSlice";
import VerifyAccount from "./VerifyAccount";
import { authStore } from "../../redux/reducers/authSlice";
import Cookies from "js-cookie";
import VerifyMobile from "./VerifyMobile";
import CreatePassword from "./CreatePassword";

const AuthModal2 = ({ lightMode }) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 768
  );
  const { toggleForm } = useSelector(toggleStore);
  const UserAuth = useSelector(authStore);
  const dispatch = useDispatch();
  const [googleLogin, setGoogleLogin] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // dispatch(setToggleForm("verify_phone"));

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [toggleForm]);

  const getFormWidth = () => {
    if (windowWidth < 450 && toggleForm === "verify_phone") return "100%";
    if (
      windowWidth < 768 &&
      (toggleForm === "verify_phone" || toggleForm === "create_password")
    )
      return "75%";
    if (windowWidth < 768) return "90%";

    if (toggleForm === "verify_phone" || toggleForm === "create_password") {
      if (windowWidth < 1200) {
        return "40%";
      }
      return "30%";
    }

    if (windowWidth < 1200)
      return toggleForm === "verify_account" || toggleForm === "create_password"
        ? "50%"
        : "90%";
    return toggleForm === "verify_account" || toggleForm === "create_password"
      ? "30%"
      : "70%";
  };

  const isClosable = () => {
    return toggleForm === "create_password" || toggleForm === "verify_phone"
      ? false
      : true;
  };

  const handleCancel = () => {
    toggleForm !== "create_password" &&
      toggleForm !== "verify_phone" &&
      dispatch(setToggleForm(null));
    setGoogleLogin(false);
  };

  const handleOk = () => {
    dispatch(setToggleForm(null));
    setGoogleLogin(false);
  };

  return (
    <div>
      <Modal
        open={toggleForm !== null}
        width={getFormWidth()}
        footer={null}
        centered
        className={`${lightMode ? "modal-close-light" : "modal-close-dark"}`}
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}
        closable={isClosable()}
        destroyOnClose={false}
      >
        <main
          className={
            toggleForm === "verify_phone"
              ? styles.main_container_verify_mobile
              : toggleForm === "create_password"
              ? styles.main_container_create_password
              : styles.main_container
          }
          style={{ color: lightMode ? "#000" : "#fff" }}
        >
          {toggleForm === "login" && (
            <LoginForm
              lightMode={lightMode}
              googleLogin={googleLogin}
              setGoogleLogin={setGoogleLogin}
            />
          )}
          {toggleForm === "register" && (
            <RegisterForm
              lightMode={lightMode}
              googleLogin={googleLogin}
              setGoogleLogin={setGoogleLogin}
            />
          )}
          {toggleForm === "forgot" && (
            <ForgotPassword
              lightMode={lightMode}
              googleLogin={googleLogin}
              setGoogleLogin={setGoogleLogin}
            />
          )}
          {toggleForm === "confirm" && (
            <ConfirmPassword lightMode={lightMode} />
          )}

          {toggleForm === "create_password" && (
            <CreatePassword lightMode={lightMode} />
          )}
          {/* {toggleForm === "verify_account" && (
            <VerifyAccount lightMode={lightMode} />
          )} */}
          {toggleForm === "verify_phone" && (
            <VerifyMobile lightMode={lightMode} />
          )}
          {toggleForm !== "verify_phone" &&
            toggleForm !== "create_password" && (
              <PromoWidget lightMode={lightMode} />
            )}
        </main>
      </Modal>
    </div>
  );
};

export default AuthModal2;
