import React from "react";
import { useSelector } from "react-redux";
import { getThemeMode } from "../redux/reducers/ThemeSlice";
import bgImgDark from "../assets/images/bg/bg404Dark.png";
import bgImgLight from "../assets/images/bg/bg404Light.png";
import portaLogoDark from "../assets/images/logo/logoWhite.png";
import portallogoWhite from "../assets/images/PortalLogo.png";
import devSpaceman from "../assets/images/devSpaceman.png";
import Image from "next/image";
function UnderDevPage() {
  const { lightMode } = useSelector(getThemeMode);
  return (
    <div className="relative bg-dark-gray" style={{ height: "100vh" }}>
      <Image
        className="absolute w-100 h-100 fit-cover"
        src={lightMode ? bgImgLight : bgImgDark}
        alt="bg"
      />
      <div className="flex flex-col div-items-center h-100">
        <Image
          style={{ width: "150px", height: "50px" }}
          src={portaLogoDark}
          alt="bg"
        />
        <Image src={devSpaceman} alt="bg" />
        <h1 style={{ zIndex: 20 }} className="fs-50-35 fw-700 text-center text-white">
          {/* New Universe Evolving */}
          Under Maintenance
        </h1>
        <h2 style={{ zIndex: 10 }} className="fs-40-28 fw-600 text-white">
          Stay tuned!
        </h2>
      </div>
    </div>
  );
}

export default UnderDevPage;
