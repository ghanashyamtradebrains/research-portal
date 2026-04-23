import {
  InstagramFilled,
  LinkedinFilled,
  TwitterOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import React, { useState } from "react";
import logoimage from "../assets/images/PortalLogo.png";
import logoWhiteimage from "../assets/images/logo/logoWhite.png";
import playstore from "../assets/images/playstore.png";
import iosImage from "../assets/images/iosDownload.png";
import { useSelector } from "react-redux";
import svgSheet from "../assets/svg/svgSheet2";
import { authStore } from "../redux/reducers/authSlice";
import SebiLogo from "../assets/images/logo/SebiLogo.png";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import dynamic from "next/dynamic";
import svgSheet8 from "../assets/svg/svgSheet8";

// const AllGlossary = dynamic(() => import("./StockGlossary/AllGlossary"), {
//   ssr: false,
//   loading: "Loading",
// });
const AllGlossary = () => null;

const PremiumRedirectModal = dynamic(() => import("./PremiumRedirectModal"), {
  ssr: false,
  loading: "Loading",
});
const PremiumTrialModal = dynamic(() => import("./Popups/PremiumTrialModal"), {
  ssr: false,
  loading: "Loading",
});

function Footer({ lightMode, ComparestockData }) {
  const auth = useSelector(authStore);
  const router = useRouter();
  const [Visible, setVisible] = useState(false);
  const navigate = useRouter();

  const navigateTo = (path) => {
    const allowedPrefixes = [
      "/admin",
      "/stock-research-report",
      "/research-report",
      "/smallcase",
    ];
    if (allowedPrefixes.some((prefix) => path.startsWith(prefix))) {
      navigate.push(path);
    } else {
      window.open(`https://portal.tradebrains.in${path}`, "_blank");
    }
  };

  const navRedirect = (path, state = { state: "/" }) => {
    if (auth.userData?.access_token) {
      navigate.push(path);
    } else {
      navigate.push(path);
    }
  };

  const ListOfDropdownData = [
    {
      name: "Portfolio Analysis",
      disc: "Get visual reports of your portfolio similar to what million dollar investment managers get!",
      Logo: svgSheet.portFolioSvg,
      link: "portfolio",
      redirectState: "/portfolio",
      premium: true,
    },
    {
      name: "Screener",
      disc: "Stock search made easier. This powerful screener helps you saperate glitter from gold.",
      Logo: svgSheet.ScreenerSvg,
      link: "screener",
      redirectState: "/screener",
    },
    {
      name: "Stock compare",
      disc: "Compare stocks side to side and pick the winner!",
      Logo: svgSheet.CompareStocksSvg,
      link: "stockCompare",
      redirectState: "/stockCompare",
    },
    {
      name: "Buckets",
      disc: "Find ready made bucket of stocks across several themes, and sectors. ",
      Logo: svgSheet.BuckectNewSvg,
      link: "buckets",
      redirectState: "/buckets",
    },
    {
      name: "Watchlist",
      disc: "Track your favourite stocks to find the best opportunity.",
      Logo: svgSheet.WatchListNewSvg,
      link: "watchlist",
      redirectState: "/watchlist",
    },
    {
      name: "Superstar Portfolio",
      disc: "Find out what the big names like the Jhunjhunwala's of the investing world are buying.",
      Logo: svgSheet.SuperStarPorNewSvg,
      link: "superstars",
      redirectState: "/superstars",
    },
  ];

  const MarketDropdownData = [
    {
      name: "List of BSE200 Companies",
      link: "/index-list/BSE200-companies-list",
    },
    {
      name: "List of NIFTY500 Companies",
      link: "/index-list/NIFTY500-companies-list",
    },
    {
      name: "List of NIFTY NEXT 50 Companies",
      link: "/index-list/NIFTYJR-companies-list",
    },
    {
      name: "NIFTY Top gainers in 5 Days",
      link: "/top-gainers/NIFTY/5D",
    },
    {
      name: "NIFTY100 Most Active Stocks",
      link: "/most-active-stocks/NIFTY/today",
    },
    {
      name: "NIFTY Top Gainers in 1 Month",
      link: "/top-gainers/NIFTY/1M",
    },
  ];
  return (
    <div
      className={`foooter mt-5  ${
        lightMode
          ? " "
          : router.pathname.includes("/portal-ai")
            ? "bg-dark-portal-ai"
            : "menu-item-name-dark-glossary"
      } shadow-top ff-poppins`}
    >
      <div className="mt-30" style={{ marginBottom: "-10px" }}>
        <AllGlossary
          ComparestockData={ComparestockData}
          lightMode={lightMode}
        />
      </div>
      <div className=" w-100 foooter-sub p-50-0 px-15  d-flex mb-20 flex-wrap d-flex-row justify-content-between">
        <div className=" products-div-footer d-flex d-flex-col mt-10  justify-content-between">
          <Image
            src={lightMode ? logoimage : logoWhiteimage}
            width={100}
            height={40}
            alt="logo"
          />
          <div className="d-flex justify-content-center align-items-center mt-20">
            <Image src={SebiLogo} width={100} height={40} alt="logo" priority />
            <span className="ml-10 fw-500">
              SEBI REGISTERED RESEARCH ANALYST REGISTRATION NUMBER: INH000015729
            </span>
          </div>
          <p className="fw-500 mt-20">
            Disclaimer: "Investments in securities are subject to market risks.
            Read all the related documents carefully before investing."
            Receiving registration from SEBI and certification from NISM does
            not assure the performance of the intermediary or guarantee returns
            to investors in any manner. Compliance/Complaints Email:
            compliance@tradebrains.in
          </p>
          <div className="flex ">
            <a
              target="_blank"
              href="https://play.google.com/store/apps/details?id=com.dailyraven.portal_app&hl=en_IN&gl=US"
            >
              <Image
                src={playstore}
                style={{ marginTop: "7px" }}
                width={150}
                height={44}
                alt="icon"
                priority
              />
            </a>{" "}
            <a
              target="_blank"
              href="https://apps.apple.com/in/app/trade-brains-portal/id1590981027"
            >
              <Image
                src={iosImage}
                width={150}
                height={54}
                alt="icon"
                priority
              />
            </a>
          </div>
        </div>
        <div className="mt-3r">
          <p className="fw-500 fs-s-16 mt-0-120">Features</p>
          {ListOfDropdownData?.map((items, i) => (
            <p
              className="pointer"
              key={i}
              onClick={() => {
                items?.premium
                  ? auth?.userData?.user?.plan?.planId === "basic"
                    ? setVisible(true)
                    : navigateTo(`/${items?.link}`)
                  : navigateTo(`/${items?.link}`);
              }}
            >
              {items?.name}
            </p>
          ))}
        </div>
        <div className="mt-3r">
          <p className="fw-500 fs-s-16">Market</p>
          {MarketDropdownData?.map((items, i) => (
            <p
              key={i}
              className="pointer"
              onClick={() => navigateTo(items?.link)}
            >
              {items?.name}
            </p>
          ))}
        </div>
        <div className="mt-3r">
          <p className="fw-500 fs-s-16">Other Products</p>
          <p>
            <a href="https://joinfingrad.com/" target="_blank">
              Fingrad
            </a>
          </p>
          <p>
            <a href="https://tradebrains.in/" target="_blank">
              Tradebrains
            </a>
          </p>
          <p>
            <a href="https://tradebrains.in/features/news/" target="_blank">
              Tradebrains News
            </a>
          </p>
          <p>
            {" "}
            <Link href="/new-updates">What's New?</Link>
          </p>
        </div>
      </div>
      <div
        className={`${
          lightMode
            ? "bg-gray"
            : router.pathname.includes("/portal-ai")
              ? "bg-dark-portal-ai"
              : "bg-dark-gray"
        }`}
      >
        <div
          className={`d-flex d-flex-row flex-wrap footer-media justify-content-between mt-3 w-100 max-w mx-auto  px-15 `}
        >
          <div className="d-flex fs-s-14 footer-text d-flex-row justify-content-center">
            <p>Follow us on:</p>
            <p>
              <a
                href="https://www.youtube.com/channel/UCzw35O6toJtjqEAAt4LTjKQ"
                target="_blank"
              >
                <YoutubeFilled />
              </a>
            </p>

            <p>
              <a
                href="https://in.linkedin.com/company/trade-brains"
                target="_blank"
              >
                <LinkedinFilled />
              </a>
            </p>
            <p>
              <a
                href="https://instagram.com/portal.tradebrains?igshid=YmMyMTA2M2Y="
                target="_blank"
              >
                <InstagramFilled />
              </a>
            </p>
            <p>
              <a
                href="https://twitter.com/TbPortal?t=AB4kcPk54CUIpf1-DH3AJQ&s=09"
                target="_blank"
              >
                <TwitterOutlined />
              </a>
            </p>
            <p>
              <a href="https://t.me/tradebrainsofficial" target="_blank">
                {svgSheet8?.telegram_small}
              </a>
            </p>
          </div>

          <div className="d-flex fs-s-14 footer-text d-flex-row flex-wrap">
            <p>
              {" "}
              <Link href="/getpremium">Pricing</Link>
            </p>
            <p>
              <Link
                href={
                  auth?.userData?.user?.is_affiliate
                    ? "https://admin.tradebrains.in/"
                    : "/become-affiliate"
                }
              >
                Affiliate
              </Link>
            </p>
            <p>
              {" "}
              <Link href="/contactus">Contact</Link>
            </p>
            <p>
              {" "}
              <Link href="/terms-and-conditions" target="_blank">
                Terms
              </Link>
            </p>
            <p>
              <Link href="/privacy" target="_blank">
                {" "}
                Privacy
              </Link>
            </p>
            <p>
              <Link href="/disclaimer" target="_blank">
                Disclaimer
              </Link>
            </p>
            <p>
              <Link href="/disclosure" target="_blank">
                Disclosure
              </Link>
            </p>
            <p>
              {" "}
              <Link href="/refund-policy" target="_blank">
                Refund Policy
              </Link>
            </p>
            <p>
              {" "}
              <a
                href="/investor-charter"
                // href="https://tradebrains-portal-s3.s3.ap-south-1.amazonaws.com/tradebrains-portal/assets/investor-charter_2.pdf"
                target="_blank"
              >
                Investor Charter
              </a>
            </p>
            <p>
              {" "}
              <a href="/complaints" target="_blank">
                Complaints
              </a>
            </p>
            <p>
              {" "}
              <Link href="/audit-report" rel="noopener noreferrer">
                Audit Reports
              </Link>
            </p>
          </div>
        </div>
      </div>
      <span className="d-flex flex-row justify-content-center pb-50px">
        <span className="fs-12 mt-10 d-flex flex-row display-inline px-20 text-align-center">
          © Copyright 2023 © Dailyraven Technologies Pvt Ltd. Datafeed provided
          by
          <span className="ml-5">
            {" "}
            <a href="https://www.cmots.com/" target="_blank">
              CMOTS Infotech
            </a>
          </span>
        </span>
        {/* <PremiumRedirectModal
          setVisible={setVisible}
          modalPlan={"portFolio"}
          visible={Visible}
        /> */}

        <PremiumTrialModal
          visible={Visible}
          setVisible={setVisible}
          isTrialOver={false}
        />
      </span>
    </div>
  );
}

export default Footer;
