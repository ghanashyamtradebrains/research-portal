import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getThemeMode } from "../redux/reducers/ThemeSlice";
import bgImgDark from "../assets/images/bg/bg404Dark.png";
import bgImgLight from "../assets/images/bg/bg404Light.png";
import spaceMainImg from "../assets/images/premiumSpaceman.png";
import Image from "next/image";

function AccountDeactivated() {
  const { lightMode } = useSelector(getThemeMode);

  return (
    <>
      <div className="max-w mx-auto  px-15  w-100">
        <div className="relative" style={{ height: "90vh" }}>
          <Image
            className="absolute w-100 h-100 fit-cover"
            src={lightMode ? bgImgLight : bgImgDark}
            alt="bg"
          />
          <div className="flex-col align-items-center justify-content-center w-100">
            <div className="flex justify-content-center align-items-center p-30">
              <Image
                // style={{ top: -130, right: 20,width:'120px',height:'120px' }}
                className=""
                src={spaceMainImg}
                alt="img"
              />
            </div>
            <div className="flex justify-content-center align-items-center w-100">
              <p className="fs-30-20 fw-600 text-align-center" >
                Your account has been Deactivated. Please contact{" "}
                <span className="warning-color">support@tradebrains.in</span> to
                re-activate your account.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default AccountDeactivated;
