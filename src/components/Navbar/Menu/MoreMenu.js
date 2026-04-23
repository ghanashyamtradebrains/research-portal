import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getThemeMode } from "../../../redux/reducers/ThemeSlice";
import Link from "next/link";
import { getAllStockSectorList } from "../../../pages/api/fetchClient";
import { authStore } from "../../../redux/reducers/authSlice";
import svgSheet from "../../../assets/svg/svgSheet";
import { useRouter } from "next/router";

export const MoreMenu = ({ setMobileToggle }) => {
  const { lightMode } = useSelector(getThemeMode);
  const auth = useSelector(authStore);
  const router = useRouter();
  const listArr =
    auth?.userData?.user?.plan?.sname === "Free" || !auth?.userData.access_token
      ? [
          {
            name: "Index returns ",
            link: "/marketstats/All-Indices",
          },
          {
            name: "Calculators",
            link: "/calculator",
          },
          {
            name: "Buckets",
            link: "/buckets",
          },
          {
            name: "Portfolio Backtesting",
            link: "/portfolio-backtesting",
          },
          {
            name: "Stock Exchange Holiday list",
            link: "/stock-exchange-holiday-list",
          },
          {
            name: "FII/DII Investments",
            link: "/fii-investments",
          },
          {
            name: "Pricing",
            link: "/getpremium",
          },
        ]
      : [
          {
            name: "Index returns ",
            link: "/marketstats/All-Indices",
          },
          {
            name: "Calculators",
            link: "/calculator",
          },
          {
            name: "Buckets",
            link: "/buckets",
          },
          {
            name: "Portfolio Backtesting",
            link: "/portfolio-backtesting",
          },
          {
            name: "Stock Exchange Holiday list",
            link: "/stock-exchange-holiday-list",
          },
          {
            name: "FII/DII Investments",
            link: "/fii-investments",
          },
          {
            name: "Pricing",
            link: "/getpremium",
          },
        ];
  return (
    <div
      className={` ff-poppins bt-navbar mt-4 p-20 br-t-b-l-r card-shadow-black ${
        lightMode
          ? "bg-white text-black"
          : router.pathname.includes("/portal-ai")
          ? "bg-dark-portal-ai text-white"
          : "bg-dark-black text-white"
      }`}
    >
      {/* <div className="d-flex align-items-center justify-content-between mb-15">
        <p className="mb-0 fs-s-16 fw-600">Sectors</p>
        <span className="underline fs-s-12">
          <Link href={`/stock/industry/All Stocks`} className="underline ">
            View all
          </Link>
        </span>
      </div> */}
      {listArr?.map((each) => {
        return (
          <div className="mb-10">
            <Link
              onClick={() => setMobileToggle("NONE")}
              className="link-hover-underline  fs-s-14 "
              href={each?.link}
            >
              <span className="">
                {each?.name === "Pricing" ? (
                  <span className="text-grad-secondary d-flex justify-content-start">
                    {svgSheet?.premiumIconSmallPricing} Pricing
                    {"  >"}
                  </span>
                ) : (
                  <span className="text-btn-dark">{each?.name}</span>
                )}
              </span>{" "}
              <span className="text-btn-dark fw-600">
                {each?.name === "Pricing" ? "" : ">"}
              </span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};