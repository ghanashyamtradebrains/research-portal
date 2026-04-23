import React from "react";
import { useSelector } from "react-redux";
import { getThemeMode } from "../redux/reducers/ThemeSlice";
import bgImgDark from "../assets/images/bg/bg404Dark.png";
import bgImgLight from "../assets/images/bg/bg404Light.png";
import Image from "next/image";
import Head from "next/head";

function Error500() {
  const { lightMode } = useSelector(getThemeMode);
  return (
    <>
    <Head>
      <title>Internal Server Error</title>
    </Head>
    <div className="relative" style={{ height: "90vh" }}>
      <Image
        className="absolute w-100 h-100 fit-cover"
        src={lightMode ? bgImgLight : bgImgDark}
        alt="bg"
      />
      <div  className="flex flex-col div-items-center h-100">
      <h2 style={{fontSize:'12rem',lineHeight:'12rem',zIndex:10}} className=" fw-700">500</h2>
        <h1 style={{zIndex:20}} className="fs-40-28 fw-700">Internal Server Error  </h1>
      </div>
    </div>
    </>
  );
}

export default Error500;
