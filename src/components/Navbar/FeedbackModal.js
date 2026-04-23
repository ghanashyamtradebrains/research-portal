import { Modal } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import svgSheet from "../../assets/svg/svgSheet";
import { postFeedBack } from "../../pages/api/fetchClient";
import { authStore } from "../../redux/reducers/authSlice";
import svgSheet5 from "../../assets/svg/svgSheet5";

function FeedbackModal({ setFeedbackDate, lightMode, setvisible, visible }) {
  const [Status, setStatus] = useState(false);
  const [loader, setLoader] = useState(false);
  const UserAuth = useSelector(authStore);
  const [Review, setReview] = useState();

  const feedbackvalues = {
    1: ["Unhappy", svgSheet5.feedbackemoji1],
    2: ["Bad", svgSheet5.feedbackemoji2],
    3: ["Satisfactory", svgSheet5.feedbackemoji3],
    4: ["Good", svgSheet5.feedbackemoji4],
    5: ["Excellent", svgSheet5.feedbackemoji5],
  };

  const [Rating, setRating] = useState();
  const [Error, setError] = useState();
  const currentDate = new Date();

  const date = dayjs(currentDate);
  const date1 = new Date("2023-03-20");
  const postFeedback = () => {
    if (!Review) {
      setError("Kindly provide the feedback");
    } else {
      setLoader(true);
      postFeedBack(Rating, Review, UserAuth?.userData?.user?.email).then(
        (res) => {
          localStorage.setItem("FeedbackTime", currentDate);
          setStatus(true);
          setFeedbackDate(false);
          setLoader(false);
        }
      );
    }
  };

  return (
    <Modal
      centered
      width="500px"
      bodyStyle={{ minHeight: "464px", borderRadius: "10px" }}
      open={visible}
      footer={null}
      onCancel={() => setvisible(false)}
      className="relative  p-20  "
      wrapClassName={"filter-modal feedback-mod "}
    >
      <div className="absolute br-10 d-flex align-items-center justify-content-center feedback-img-bg w-100 h-100 fit-cover pb-10 " />
      {Status ? (
        <div
          style={{ marginInline: "5%", paddingTop: "5%" }}
          className=" h-100  d-flex flex-col align-items-start justify-content-center"
        >
          <p
            style={{ margin: "34% 0px 6px 35px" }}
            className="fs-s-24 z-10  fw-700"
          >
            {svgSheet5.SuccessFullSvgLove}
          </p>
          <p style={{ marginLeft: "38px" }} className="fs-s-24 z-10  fw-700">
            Thank you
            <br />
            for your Feedback!
          </p>
        </div>
      ) : (
        <div
          style={{ marginInline: "5%", paddingTop: "5%" }}
          className=" h-100  d-flex flex-col align-items-center justify-content-center"
        >
          <p className="fs-24-16 z-10 fw-700">We would love your Feedback!</p>
          <p className="fs-s-14 z-10 fw-500">Share your experience with us</p>
          <div className="z-10 gap-20-0 mt-30 d-flex">
            {Object.values(feedbackvalues).map((items, i) => (
              <div
                style={{ width: "65px" }}
                onClick={() => setRating(i + 1)}
                className={`d-flex flex-col feedback-emo   justify-content-center align-items-center ${
                  Rating === i + 1 && "highlighted"
                }`}
                key={i}
              >
                <p className={" wh-45-30 z-10 "}>{items[1]}</p>
                <span className="fs-14-12">{items[0]}</span>
              </div>
            ))}
          </div>
          <textarea
            onChange={(e) => setReview(e.target.value)}
            className="z-10 mt-20 border-none bg-transparent p-10 w-100 br-5 placeholder-white"
            style={{
              color: "white",
              height: "120px",
              backgroundColor: "rgba(124, 185, 243, 0.5)",
            }}
            placeholder="Type Here "
          ></textarea>
          <div className="d-flex w-100 justify-content-start">
            {!Review && (
              <span className="z-10 fw-600 fs-s-12 mt-5 text-black">
                {Error}
              </span>
            )}
          </div>
          <div className="z-10 w-100 d-flex justify-content-end">
            {loader ? (
              ""
            ) : (
              <button
                onClick={() => postFeedback()}
                style={{
                  margin: "2% 0",
                  zIndex: 100,
                  backgroundColor: "#F2F6F8",
                }}
                className="h-45  p-10 text-black br-5 fw-600 fs-16-14"
              >
                Submit Feedback
              </button>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}

export default FeedbackModal;
