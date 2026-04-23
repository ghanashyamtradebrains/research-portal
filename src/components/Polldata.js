import { useEffect, useState } from "react";
import { getIndexData, postCreateIndex } from "../pages/api/fetchClient";
import { useDispatch, useSelector } from "react-redux";
import { authStore } from "../redux/reducers/authSlice";
import useWindowWidth from "../utilityFn/getWindowWidth";
import PremiumRedirectModal from "./PremiumRedirectModal";
import { useRouter } from "next/router";
import { setToggleForm } from "../redux/reducers/AuthToggleSlice";
import useCheckTrialStatus from "../hooks/useCheckTrialStatus";

function Polldata({ lightMode, symbol }) {
  const dispatch = useDispatch();
  const [values, setValues] = useState({});
  const [userDatas, setUserDatas] = useState("BUY");
  const [opinionData, setOpinionData] = useState("BUY");
  const [showPopup, setShowPopup] = useState(false);
  const [modalName, setModalName] = useState("");
  const [IsPremiumModel, setIsPremiumModel] = useState(false);
  const [pollOptions, setPollOptions] = useState([
    { label: "Bullish", percentage: 100 },
    { label: "Neutral", percentage: 100 },
    { label: "Bearish", percentage: 100 },
  ]);
  const router = useRouter();
  const checkTrialStatus = useCheckTrialStatus();
  useEffect(() => {
    if (values) {
      setPollOptions([
        {
          label: "Bullish",
          percentage: values.user_choice !== null ? values.buy_ratio : 100,
        },
        {
          label: "Neutral",
          percentage: values.user_choice !== null ? values.hold_ratio : 100,
        },
        {
          label: "Bearish",
          percentage: values.user_choice !== null ? values.sell_ratio : 100,
        },
      ]);
    }
    setShowPercentage(true);
  }, [values]);
  const windowWidth = useWindowWidth();
  const UserAuth = useSelector(authStore);
  const [showPercentage, setShowPercentage] = useState(false);
  const fetchPollData = (data) => {
    const updatedData = [
      { label: "Bullish", percentage: data.buy_ratio },
      { label: "Neutral", percentage: data.hold_ratio },
      { label: "Bearish", percentage: data.sell_ratio },
    ];
    setPollOptions(updatedData);
    setShowPercentage(true);
  };

  const getData = async () => {
    await getIndexData(
      router?.query?.index_name === "GIFT-NIFTY" ? "NIFTY" : symbol
    ).then((res) => {
      setValues(res?.data);
    });
  };
  useEffect(() => {
    getData();
  }, [symbol]);

  const handleOptionClick = async (label) => {
    if (!UserAuth?.userData?.access_token) {
      // (setIsPremiumModel(true),
      dispatch(setToggleForm("login")), setModalName("login");
      // (setIsPremiumModel(true), setModalName("login"))
    } else {
      if (UserAuth?.userData) {
        let opinion;
        switch (label) {
          case "Bullish":
            opinion = "Buy";
            break;
          case "Neutral":
            opinion = "Hold";
            break;
          case "Bearish":
            opinion = "Sell";
            break;
          default:
            console.error("Invalid label provided:", label);
            return;
        }

        setOpinionData(opinion);

        try {
          await postCreateIndex(symbol, opinion);
          const res = await getIndexData(
            router?.query?.index_name === "GIFT-NIFTY" ? "NIFTY" : symbol
          );
          fetchPollData(res?.data);
        } catch (err) {
          console.error("Error in API call:", err);
        }
      } else {
        setUserDatas(false);
      }
    }
  };
  const ShowModal = (val) => {
    switch (val) {
      case "login":
        return (
          // <PremiumRedirectModal
          //   visible={IsPremiumModel}
          //   loginRediect={true}
          //   setVisible={setIsPremiumModel}
          //   modalPlan="/"
          // />

          <PremiumTrialModal
            visible={IsPremiumModel}
            setVisible={setIsPremiumModel}
            isTrialOver={checkTrialStatus()}
          />
        );
    }
  };
  return (
    <>
      {ShowModal(modalName)}
      <div
        className="p-15 br-10"
        style={{
          background: lightMode ? "rgba(242, 246, 248, 1)" : "#212639",
          borderColor: lightMode ? "#C9D7DE" : "#545E78",
          border: lightMode ? "1px solid #C9D7DE" : "1px solid #545E78",
          height: "275px",
        }}
      >
        <div className="d-flex flex-col justify-content-between align-items-start fs-s-14">
          <span className="fw-600 mb-5">Investor Sentiment</span>
          <span className="mt-5">
            What is your view on{" "}
            {router?.query?.index_name === "GIFT-NIFTY" ? "NIFTY 50" : "Index "}{" "}
            share Price?
          </span>
        </div>

        {pollOptions.map((option, index) => (
          <div
            key={index}
            style={{
              margin: option.label !== "Bearish" && "15px 0",
              cursor: "pointer",
              border: "1px solid #ccc",
              borderRadius: "10px",
              overflow: "hidden",
              position: "relative",
              borderColor: `${
                lightMode
                  ? option.label === "Bullish"
                    ? "#009633"
                    : option.label === "Bearish"
                    ? "#f82e2e"
                    : "#ababab"
                  : option.label === "Bullish"
                  ? "#00fe57"
                  : option.label === "Bearish"
                  ? "#f82e2e"
                  : "#ababab"
              }`,
            }}
            onClick={() => handleOptionClick(option.label)}
          >
            <div
              style={{
                width: `${showPercentage ? option.percentage : 100}%`,
                background: `${
                  lightMode
                    ? option.label === "Bullish"
                      ? "#C2E3D1"
                      : option.label === "Bearish"
                      ? "#F3CED0"
                      : "#E0E3E5"
                    : option.label === "Bullish"
                    ? "#284545"
                    : option.label === "Bearish"
                    ? "#403041"
                    : "#3D4051"
                }`,
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                transition: "width 0.3s ease",
                paddingBottom: "-10px",
              }}
            ></div>
            <div
              className={`d-flex align-items-centerz-1 relative`}
              style={{ padding: "12px" }}
            >
              <div className="d-flex justify-content-between mr-10 ml-10 w-100">
                <span
                  style={{
                    color: `${
                      lightMode
                        ? option.label === "Bullish"
                          ? "#009633"
                          : option.label === "Bearish"
                          ? "#f82e2e"
                          : "#343434"
                        : option.label === "Bullish"
                        ? "#00fe57"
                        : option.label === "Bearish"
                        ? "#f82e2e"
                        : "#f8f8f8"
                    }`,
                  }}
                  className="fw-700"
                >
                  {option.label}
                </span>
                {showPercentage && (
                  <span className="ff-lato">{option.percentage}%</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Polldata;
