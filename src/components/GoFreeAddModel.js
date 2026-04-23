import React from "react";
import { Modal } from "antd";
import bgImgDark from "../assets/images/bg/premiumBg.png";
import spaceMainImg from "../assets/images/premiumSpaceman.png";
import svgSheet from "../assets/svg/svgSheet";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { getThemeMode } from "../redux/reducers/ThemeSlice";
import Image from "next/image";
import { authStore } from "../redux/reducers/authSlice";

function GoFreeAddModel({ visible, setVisible }) {
  const { lightMode } = useSelector(getThemeMode);
  const navigate = useRouter();
  const UserAuth = useSelector(authStore);

  return (
    <Modal
      centered
      // closable={true}
      width="800px"
      bodyStyle={{ minHeight: "400px", borderRadius: "10px" }}
      visible={visible}
      footer={null}
      onCancel={() => {
        setVisible(false);
      }}
      className="relative  p-20 "
      wrapClassName={"filter-modal premium-mod"}
    >
      <Image
        className="absolute w-100 h-100 fit-cover pb-10 "
        src={bgImgDark}
        alt="bg"
      />
      <div
        style={{ marginInline: "7%", paddingTop: "3%" }}
        className=" h-100 d-flex flex-col align-items-center justify-content-center"
      >
        <div className="wh-100-120">
          {!UserAuth?.userData?.user?.plan?.planId?.includes("_plus")
            ? svgSheet?.premiumPlusWeb
            : svgSheet?.premiumIcon}
        </div>
        {!UserAuth?.userData?.user?.plan?.planId?.includes("_plus") ? (
          <h1 className="fs-22-18 fw-500 text-align-center">
            Go Ad-Free Upgrade to premium+ and enjoy an ad-free experience.
          </h1>
        ) : (
          <h1 className="fs-22-18 fw-500 text-align-center">
            Go Ad-Free Upgrade to premium and enjoy an ad-free experience.
          </h1>
        )}
        <div className="w-100 d-flex align-items-center justify-content-center">
          <button
            onClick={() => {
              setVisible(false);
              navigate.push("/getpremium");
            }}
            style={{ width: "90%", zIndex: 100 }}
            className={`h-45  text-white mt-10p-15p br-3 fw-600 fs-22-18 ${
              !UserAuth?.userData?.user?.plan?.planId?.includes("_plus")
                ? "free-tag text-white"
                : "btn-bg-primary"
            }`}
          >
            {!UserAuth?.userData?.user?.plan?.planId?.includes("_plus")
              ? "Get Premium +"
              : "Get Premium"}
          </button>
        </div>
      </div>
      <Image
        // style={{ top: -130, right: 20,width:'120px',height:'120px' }}
        className=" modal-spaceman"
        src={spaceMainImg}
        alt="img"
      />
    </Modal>
  );
}

export default GoFreeAddModel;
