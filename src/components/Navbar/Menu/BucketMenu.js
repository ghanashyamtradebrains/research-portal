import { useEffect, useMemo, useState } from "react";
import {
  getBucketdata,
  getGainerLoserList,
  getNewsData,
} from "../../../pages/api/fetchClient";
import { useSelector } from "react-redux";
import { getThemeMode } from "../../../redux/reducers/ThemeSlice";
import Link from "next/link";
import svgSheet from "../../../assets/svg/svgSheet";
import { authStore } from "../../../redux/reducers/authSlice";
import PremiumRedirectModal from "../../PremiumRedirectModal";
import { useRouter } from "next/router";
import convertToSnakeCase from "../../../utilityFn/convertToSnakeCase";

export const BucketMenu = ({ mobile, setMobileToggle }) => {
  const { lightMode } = useSelector(getThemeMode);
  const UserAuth = useSelector(authStore);
  const [premiumModal, setpremiumModal] = useState(false);
  const navigate = useRouter();
  const Thematic = [
    {
      title: "Infrastructure India",
      isPremium: true,
    },
    {
      title: "Rural India",
      isPremium: true,
    },
    {
      title: "Housing Finance",
      isPremium: true,
    },
    {
      title: "Digital India",
      isPremium: true,
    },
    {
      title: "Chemical India",
      isPremium: true,
    },
  ];
  const Sectorial = [
    {
      title: "Banking Sector",
      isPremium: true,
    },
    {
      title: "Pharma Sector",
      isPremium: true,
    },
    {
      title: "IT Sector",
      isPremium: true,
    },
    {
      title: "Metals Sector",
      isPremium: true,
    },
    {
      title: "Auto Sector",
      isPremium: true,
    },
  ];
  const Business = [
    {
      title: "Mukesh Ambani Group",
      isPremium: true,
    },
    {
      title: "Tata Group",
      isPremium: true,
    },
    {
      title: "Bajaj Group",
      isPremium: true,
    },
    {
      title: "Adani Group",
      isPremium: true,
    },
    {
      title: "Aditya Birla Group",
      isPremium: true,
    },
  ];

  const onBucketClick = (bucketname) => {
    navigate.push(`/buckets/${convertToSnakeCase(bucketname)}`);
    setMobileToggle("NONE");
  };

  return (
    <div
      onClick={() => setMobileToggle("NONE")}
      className={` ff-poppins bt-navbar mt-4 ${mobile ? "" : "p-20 card-shadow-black"
        } br-t-b-l-r d-flex gap-15px ${lightMode
          ? "bg-white text-black" : (navigate.pathname.includes("/portal-ai")?
            "bg-dark-portal-ai text-white"
            : `${mobile ? "text-white" : "bg-dark-black text-white"}`
          )}`}
    >
      <div className=" w-100">
        {!mobile && (
          <div className="d-flex align-items-center justify-content-between mb-15">
            <p className="mb-0 fs-s-16 fw-600 text-btn-dark">Buckets</p>
            <span className="underline fs-s-12">
              <Link href={`/buckets`} className="underline ">
                View all
              </Link>
            </span>
          </div>
        )}

        <div className={`${mobile ? "d-flex-col" : "d-flex"} gap-10px`}>
          <div className="w-100">
            <p className="opacity5 mb-5 d-flex justify-content-between">
              Thematic{" "}
              {mobile && (
                <span className="underline fs-s-12">
                  <Link
                    onClick={() => setMobileToggle("NONE")}
                    href={`/buckets`}
                    className={`${lightMode ? "text-black" : "text-white"
                      } underline`}
                  >
                    View all
                  </Link>
                </span>
              )}{" "}
            </p>
            {mobile && <p className="opacity5 mb-10 bb-2-gray"></p>}

            {Thematic?.map((each) => {
              return (
                <div className="mb-20">
                  <div
                    className="link-hover-underline fs-s-14  pointer"
                    onClick={() => onBucketClick(each?.title)}
                  >
                    <p className="d-flex gap-5px mb-0">
                      {each?.title}
                      <span className="text-btn-dark fw-600">{">"}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {!mobile && (
            <p className="bl-light-gray-1px  pd-1px opacity5 mb-0"></p>
          )}
          <div className="w-100">
            <p className="opacity5 mb-5">Sectorial</p>
            {mobile && <p className="opacity5 mb-10 bb-2-gray"></p>}
            {Sectorial?.map((each) => {
              return (
                <div className="mb-20">
                  <div
                    className="link-hover-underline fs-s-14  pointer"
                    onClick={() => onBucketClick(each?.title)}
                  >
                    <p className="d-flex gap-5px mb-0">
                      {each?.title}
                      <span className="text-btn-dark fw-600">{">"}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          {!mobile && (
            <p className="bl-light-gray-1px  pd-1px opacity5 mb-0"></p>
          )}
          <div className="w-100">
            <p className="opacity5 mb-5">Business</p>
            {mobile && <p className="opacity5 mb-10 bb-2-gray"></p>}

            {Business?.map((each) => {
              return (
                <div className="mb-20">
                  <div
                    className="link-hover-underline fs-s-14  pointer"
                    onClick={() => onBucketClick(each?.title)}
                  >
                    <p className="d-flex gap-5px mb-0">
                      {each?.title}
                      <span className="text-btn-dark fw-600">{">"}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};