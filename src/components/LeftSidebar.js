import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Link as Scroll } from "react-scroll/modules";
import stockIcon from "../assets/images/portalFavICon.png";
import Unknown from "../assets/images/socialmedia/Unkown.png"

function LeftSidebar({
  lightMode,
  sidebarData,
  subHead,
  subData,
  baseURL,
  premiumCheck,
}) {
  return (
    <div
      className={`w-100  card-shadow detail-left-card ${
        lightMode ? "bg-gray" : "bg-dark-gray"
      }`}
      style={{
        height: "min-content",
        marginBottom: "40px",
        paddingBottom: "10px",
      }}
    >
      {sidebarData?.map((data, i) => (
        <Scroll
          key={i}
          activeClass={lightMode ? "desktop-active" : "desktop-active-dark"}
          to={data?.id}
          spy={true}
          smooth={true}
          offset={data.offset}
          duration={500}
          className={`px-20 flex align-items-center ${
            lightMode
              ? "bb1px-light-mode hover-light-blue bt-first-child-light"
              : "bb1px-dark-mode bt-first-child-dark bg-dark-hover"
          }`}
          style={{ minHeight: "45px" }}
        >
          {data.icon}
          <span className=" fs-s-15 fw-500">{data?.label}</span>
        </Scroll>
      ))}
      <p className="px-20 my-15 fs-s-15 fw-500">{subHead}</p>
      {subData?.map((bucket, i) => (
        <Link
          href={
            bucket.isPremium && !premiumCheck
              ? "/getpremium"
              : `${baseURL}/${bucket?.slug}`
          }
          key={i}
          style={{ height: "50px" }}
          className={`${
            lightMode ? "hover-light-blue bb1px-light-mode" : "bg-dark-hover bb1px-dark-mode"
          } p-15 flex align-items-center`}
        >
          <Image
            width="35"
            height="35"
            src={bucket?.image === null ? Unknown : bucket?.image}
            onError={(error) => {
              setsrcImage(Unknown);

            }}
            className="w-35 h-35 br-50"
          />
          <p className="fs-s-15 fw-500 mb-0" >{bucket?.investor_name}</p>
        </Link>
      ))}
    </div>
  );
}

export default LeftSidebar;
