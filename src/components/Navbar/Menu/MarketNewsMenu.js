import { useEffect, useState } from "react";
import {
  getGainerLoserList,
  getNewsData,
} from "../../../pages/api/fetchClient";
import { useSelector } from "react-redux";
import { getThemeMode } from "../../../redux/reducers/ThemeSlice";
import Link from "next/link";
import { useRouter } from "next/router";

export const MarketNewsMenu = () => {
  const { lightMode } = useSelector(getThemeMode);
  const [gainerLoserList, setGainerLoserList] = useState([]);

  const [hotPursuit, setHotPursuit] = useState([]);
  const [foreiMarket, setForeiMarket] = useState([]);
  const [forexNews, setForexNews] = useState([]);
  const router = useRouter();
  const marketNewCatArr = [
    {
      title: "Hot Pursuit",
      link: "hot-pursuit",
    },
    {
      title: "Foreign Markets ",
      link: "foreign-markets",
    },
    {
      title: "Forex News",
      link: "forex-news",
    },
    {
      title: "Bullion",
      link: "Bullion",
    },
    {
      title: "Corporate News",
      link: "corporate-news",
    },
    {
      title: "Economy News",
      link: "economy-news",
    },
    {
      title: "Corporate Results",
      link: "corporate-results",
    },
    {
      title: "Stock Alert",
      link: "stock-alert",
    },
    {
      title: "Pre-Session",
      link: "pre-session",
    },
    {
      title: "Mid-Session",
      link: "mid-session",
    },
    {
      title: "End-Session",
      link: "end-session",
    },
    {
      title: "Quick Review",
      link: "quick-review",
    },
    {
      title: "Derivatives News",
      link: "derivatives-news",
    },
    {
      title: "IPO News",
      link: "ipo-news",
    },
    // {
    //   title: "Political News",
    //   category: "political-news",
    // },
  ];
  return (
    <div
      className={` ff-poppins bt-navbar mt-4 p-20 br-t-b-l-r card-shadow-black d-flex gap-15px ${lightMode ? "bg-white text-black" : (router.pathname.includes("/portal-ai") ?
        "bg-dark-portal-ai text-white" : "bg-dark-black text-white"
      )}`}
    >
      <div className=" w-100">
        <div className="d-flex align-items-center justify-content-between mb-15">
          <p className="mb-0 fs-s-16 fw-600 text-btn-dark">Market News</p>
          <span className="underline fs-s-12">
            <Link href={`/news`} className="underline ">
              View all
            </Link>
          </span>
        </div>

        <div className="d-flex gap-10px">
          <div className="w-100">
            {marketNewCatArr?.slice(0, 4)?.map((each) => {
              return (
                <div className="mb-20">
                  <Link
                    className="link-hover-underline fs-s-14 "
                    href={`/news/${each?.link}`}
                  >
                    {each?.title}{" "}
                    <span className="text-btn-dark fw-600">{">"}</span>
                  </Link>
                </div>
              );
            })}
          </div>

          <p className="bl-light-gray-1px  pd-1px opacity5 mb-0"></p>
          <div className="w-100">
            {marketNewCatArr?.slice(4, 8)?.map((each) => {
              return (
                <div className="mb-20">
                  <Link
                    className="link-hover-underline fs-s-14 "
                    href={`/news/${each?.link}`}
                  >
                    {each?.title}{" "}
                    <span className="text-btn-dark fw-600">{">"}</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};