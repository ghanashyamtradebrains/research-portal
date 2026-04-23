import React from "react";
import { Drawer } from "antd";
import svgSheet from "../../assets/svg/svgSheet";
import svgSheet3 from "../../assets/svg/svgSheet3";
import { useSelector } from "react-redux";
import { authStore } from "../../redux/reducers/authSlice";
import { useRouter } from "next/router";
import Image from "next/image";
import { bannerOffsetCalc } from "../../utilityFn/bannerOffsetcalc";

function ProductToggleCard({
  productsToggle,
  setproductsToggle,
  lightMode,
  authStatus,
}) {
  const navigate = useRouter();
  const UserAuth = useSelector(authStore);

  const MarketDropdownData = [
    {
      name: "All Stocks",
      disc: "Every Indian stock methodically sorted by sector.",
      Logo: svgSheet3.AllStocks,
      link: "stock/industry/Agro%20Chemicals",
    },
    {
      name: "Top Gainers",
      disc: "Top Gainers across Sensex, Nifty and every other Indian Index at one glance!",
      Logo: svgSheet3.TopGainersNewSvg,
      link: "marketstats/gainers",
    },
    {
      name: "Top Losers",
      disc: "Top Losers across Sensex,  Nifty and every other Indian Index at one glance!",
      Logo: svgSheet3.TopLosers,
      link: "marketstats/losers ",
    },
    {
      name: "Market News",
      disc: "Stay updated with the latest news in the business world",
      Logo: svgSheet3.MarketNewsSvg,
      link: "news",
    },
    {
      name: "Stock Heatmaps",
      disc: "Get bird eye view of how the market is performing",
      Logo: svgSheet3.heatMapMenu,
      link: "index/NIFTY/heatmap",
    },
    {
      name: "Index Returns ",
      disc: "A straightforward and uncomplicated scan of the performance of all Indian indices.",
      Logo: svgSheet3.MarketReturns,
      link: "marketstats",
    },
    {
      name: "Corporate Actions",
      disc: "Keep track of all Dividends, Bonuses, Splits & other corporate actions affecting your stocks.",
      Logo: svgSheet3.corporateActionMenu,
      link: "corporateactions",
    },
    {
      name: "Sector Heatmaps",
      disc: "Get bird eye view of how each sector is performing",
      Logo: svgSheet3.heatMapMenu,
      link: "stock/industry/Bank%20-%20Private/heatmap",
    },
  ];

  return (
    <Drawer
      style={{
        top:
          productsToggle === "Products"
            ? `${
                bannerOffsetCalc(UserAuth) === 1
                  ? "70"
                  : 100 + bannerOffsetCalc(UserAuth)
              }px`
            : "0px",
      }}
      rootStyle={{
        top:
          productsToggle === "Products"
            ? `${
                bannerOffsetCalc(UserAuth) === 1
                  ? "70"
                  : 100 + bannerOffsetCalc(UserAuth)
              }px`
            : "0px",
      }}
      drawerStyle={{
        background: lightMode ? "white" : "#292E3F",
        color: lightMode ? "black" : "white",
      }}
      headerStyle={{ marginInline: "16px", padding: "0px" }}
      bodyStyle={{ margin: "16px 0px 0px 0px", padding: "0px" }}
      contentWrapperStyle={{ width: "99%" }}
      placement={"top"}
      closable={false}
      onClose={() => setproductsToggle("NONE")}
      open={productsToggle === "Products" ? true : false}
      key="tools"
      height="auto"
      zIndex={500}
    >
      <div className="">
        <div className="flex ff-poppins ff-poppins max-w mx-auto h-100  px-15 relative">
          <div
            style={{ width: "70%" }}
            className="w-70 bbr-blue d-flex flex-wrap"
          >
            <div className="d-flex flex-wrap my-50  justify-content-start">
              {MarketDropdownData.map((items, i) => (
                <div
                  key={i}
                  style={{ width: "31%" }}
                  onClick={() => navigate.push(`/${items?.link}`)}
                  className={` h-100px mt-10 flex p-10 ${
                    lightMode ? "hover-light-blue" : "bg-dark-nav-hover"
                  } pointer`}
                >
                  <p> {items.Logo}</p>
                  <div>
                    <p className="fw-700 fs-s-14 line-h-18">{items?.name}</p>
                    <p className="fs-s-12 line-h-18 pr-8">{items.disc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Knowledge Center  */}
          <div className="w-30 d-flex-col ">
            <div className="mb-10 mt-75 m-auto">
              <a
                className="m-auto"
                href="https://joinfingrad.com/learnmap/trading?refer=ban0009"
                target="_blank"
              >
                <Image
                  src={
                    "https://tradebrains-portal-s3.s3.ap-south-1.amazonaws.com/Gif/67%25_offer_gif.gif"
                  }
                  width={300}
                  height={300}
                />
              </a>
            </div>
          </div>
        </div>
        <div
          style={{ height: "50px" }}
          className={` d-flex align-items-center justify-content-around ${
            lightMode ? "bg-gray " : "bluedark-gradient"
          } `}
        >
          {!authStatus && (
            <div className="d-flex align-items-center">
              <p className="fw-700 fs-s-16  mb-0">Ready to get started ?</p>
              <p
                className={`mb-0 ml-10 fw-700 ${
                  lightMode ? "" : "text-btn-dark"
                }`}
              >
                Sign up for free
              </p>
            </div>
          )}
          <div>
            <p
              onClick={() => navigate.push("/getpremium")}
              className="fw-700 fs-s-16  mb-0 underline pointer"
            >
              View Pricing
            </p>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default ProductToggleCard;
