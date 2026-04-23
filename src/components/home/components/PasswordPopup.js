import React, { useEffect, useState } from "react";
import { message } from "antd";
import svgSheet from "../../../assets/svg/svgSheet";
import { Form, Input, Modal } from "antd";
import { useSelector } from "react-redux";
import { getThemeMode } from "../../../redux/reducers/ThemeSlice";
import { getCreatPass, postCreatPass } from "../../../pages/api/fetchClient";
import svgSheet5 from "../../../assets/svg/svgSheet5";

function PasswordPopup() {
  const { lightMode } = useSelector(getThemeMode);

  const [openModel, setOpenModel] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [apiResp, setApiResp] = useState("");

  const getResult = async () => {
    await getCreatPass().then((resp) => {
      setApiResp(resp?.data.Update_password);
    });
  };

  const postCreatePasswordData = async () => {
    const data = new FormData();
    data.append("password", password);
    await postCreatPass(data).then((resp) => {});
  };

  useEffect(() => {
    getResult();
  }, []);

  const success = () => {
    message.success({
      content: "Password saved",
      className: !lightMode && "darkmodemessge",
    });
  };

  const handleContinueClick = () => {
    if (password.length < 8 && password.length > 16) {
      setPasswordError("Passwords must be 8 - 16 characters long.");
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("The two passwords you entered do not match.");
    } else {
      setPasswordError("");
      setConfirmPasswordError("");
      postCreatePasswordData();
      setOpenModel(false);
      success();
    }
  };

  function check() {
    if (apiResp === true) {
      setOpenModel(true);
    } else {
      setOpenModel(false);
    }
  }

  useEffect(() => {
    check();
    const intervalId = setInterval(() => {
      check();
    }, 300000);

    return () => {
      clearInterval(intervalId);
    };
  }, [apiResp]);

  return (
    <div>
      <Modal
        className={lightMode ? "custom-modal-bg-light" : "custom-modal-bg"}
        title={
          <p
            className={`fs-s-24 mb-0 fw-600 d-flex justify-content-center ${
              lightMode ? "text-black" : "text-white"
            }`}
          >
            Create Password
          </p>
        }
        open={openModel}
        centered
        wrapClassName={lightMode ? "modelClassPopUpLight" : "modelClassPopUp"}
        onCancel={() => {
          setOpenModel(false);
        }}
        footer={[
          <div className="d-flex justify-content-center align-items-center">
            <button
              key="submit"
              type="primary"
              className={`w-70-100 br-5 fs-s-16 pointer fw-500 btn-bg-primary text-white d-flex justify-content-center align-items-center ${
                lightMode ? "  h-45" : "h-45 "
              }`}
              onClick={() => handleContinueClick()}
            >
              Continue
            </button>
          </div>,
        ]}
      >
        <div className="w-100 d-flex flex-col align-items-center">
          <input
            value={password}
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
              if (e.target.value.length < 8) {
                setPasswordError("Password should have at least 8 characters");
              } else if (e.target.value.length > 16) {
                setPasswordError("Password should have at most 16 characters");
              } else {
                setPasswordError("");
              }
            }}
            type="password"
            className={`w-70-100 br-3 p-3 h-40px  mt-40 ${
              lightMode
                ? "border1px-light-mode text-black"
                : "border1px-dark-mode bg-dark-gray text-white"
            }`}
          ></input>
          <div className="d-flex justify-content-start align-items-end-start">
            {passwordError && (
              <span style={{ color: "#FC5252", marginRight: "20px" }}>
                {passwordError}
              </span>
            )}
          </div>

          <input
            value={confirmPassword}
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            className={`w-70-100 mt-20 br-3 p-3 h-40px  ${
              lightMode
                ? "border1px-light-mode text-black"
                : "border1px-dark-mode bg-dark-gray text-white"
            }`}
          ></input>
          {confirmPasswordError && (
            <span style={{ color: "#FC5252" }}>{confirmPasswordError}</span>
          )}
          <div className="mt-30 p-15p" style={{}}>
            <p className="d-flex align-items-center">
              <span>{svgSheet5.disclaimerIconRed}</span>{" "}
              <span
                style={{
                  marginBottom: "5px",
                  marginLeft: "5px",
                  color: "#FC5252",
                }}
              >
                Disclaimer
              </span>
            </p>
            <p className={lightMode ? "text-black" : "text-white"}>
              Enhance your accessibility seamlessly across platforms both mobile
              app and web by setting a password for streamlined access!
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PasswordPopup;
