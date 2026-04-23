import Link from "next/link";
import React from "react";
import svgSheet from "../../../assets/svg/svgSheet";
import { useRouter } from "next/router";
import { authStore } from "../../../redux/reducers/authSlice";
import { useSelector } from "react-redux";
function ViewPlanSection({ lightMode }) {
  const router = useRouter();
  const auth = useSelector(authStore);
  return (
    <>
      {auth?.userData?.user?.plan?.planId?.includes("plus") ? (
        ""
      ) : (
        <div className={`${router.asPath === "/" ? "p-50-0 px-15 " : ""}  `}>
          <div
            className={`table-shadow p-15 br-5 mt-40 home-border-1px ${
              lightMode
                ? "card-drop-dark-shadow-home-page-light"
                : "card-drop-dark-shadow-home-page"
            }`}
          >
            <div className="d-flex flex-col-row w-100">
              <div className="w-100">
                <div className="fs-36-20 fw-600 d-flex justify-content-start-center align-items-center">
                  <span
                    className="only-PC-view"
                    style={{
                      width: "80px",
                      height: "70px",
                      marginLeft: "-25px",
                    }}
                  >
                    {svgSheet?.premiumIconPLuss}
                  </span>
                  <span
                    className="only-mobile-view"
                    style={{ width: "35px", height: "35px", marginTop: "5px" }}
                  >
                    {svgSheet?.premiumPLusMobile}
                  </span>
                  <span className="text-grad-secondary fs-35-32 only-PC-view">
                    Subscribe to our Unlimited + Plan
                  </span>
                  <span className="text-grad-secondary fs-40-28 only-mobile-view">
                    Get Started Now
                  </span>
                </div>
                <span className="fs-16-14 w-100 only-PC-view">
                  Access our premium features for insightful and detailed
                  analysis of your favourite stocks to create your dream
                  portfolio
                </span>
                <span className="fs-16-14 w-100 d-flex text-align-center only-mobile-view mt-5">
                  Access our premium features for insightful and detailed
                  analysis of your favourite stocks to create your dream
                  portfolio
                </span>
              </div>
              <div className="d-flex align-items-center">
                <Link href={`/getpremium`} className="w-100">
                  <button className="view-pricing-button fw-600 text-white fs-16-14 mb-0-15">
                    View Our Plans
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ViewPlanSection;
