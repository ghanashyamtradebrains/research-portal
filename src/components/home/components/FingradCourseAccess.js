import Image from "next/image";

import svgSheet from "../../../assets/svg/svgSheet";
import { useSelector } from "react-redux";
import { getThemeMode } from "../../../redux/reducers/ThemeSlice";
import Link from "next/link";
import { Carousel } from "antd";
import useWindowWidth from "../../../utilityFn/getWindowWidth";
import { authStore } from "../../../redux/reducers/authSlice";
import kriteshFingrad from "../../../assets/images/FingradCourse/kriteshFingrad.png";
import ManishCourse from "../../../assets/images/FingradCourse/manishCourse.png";
import svgSheet5 from "../../../assets/svg/svgSheet5";

function FingradCourseAccess() {
  const { lightMode } = useSelector(getThemeMode);
  const windowWidth = useWindowWidth();
  const userData = useSelector(authStore);

  const finGradCourse = [
    {
      image:
        "https://fingrad-staging.s3.amazonaws.com/workshop/8/CA_Manish_Sign.png ",
      title: "Mastering Options Strategies: Bootcamp with CA Manish Singh",
      link: "https://joinfingrad.com/seminar/profitable-options-trading-strategies-mumbai",
    },
    {
      image: ManishCourse,
      title: "Course: Advanced Options Selling Masterclass",
      link: "https://joinfingrad.com/courses-details/64/Advanced-Options-Selling-Masterclass",
    },

    {
      image:
        "https://fingrad-staging.s3.ap-south-1.amazonaws.com/instructor/course/69/trailer/course_thumbnail",
      title: "RSI Trading Masterclass: Learn to Trade with RSI Indicator",
      link: "https://joinfingrad.com/courses-details/69/RSI-Trading-Masterclass-Learn-to-Trade-with-RSI-Indicator",
    },
    {
      image: kriteshFingrad,
      title:
        "Stock Market Investing Masterclass: Learn to Invest in Stocks from Scratch",
      link: "https://joinfingrad.com/courses-details/51/Stock-Market-Investing-Masterclass-Learn-to-Invest-in-Stocks-from-Scratch",
    },
  ];
  return (
    <section>
      <div className="w-100   mb-30 ">
        <h3 className="fs-16-14 fw-700 mb-20 ">Start learning</h3>
        <div className="d-flex justify-content-between">
          {finGradCourse
            ?.slice(0, windowWidth > 1400 ? 4 : windowWidth < 900 ? 2 : 3)
            ?.map((each) => {
              return (
                <a
                  href={each?.link}
                  target="_blank"
                  className={`${
                    lightMode
                      ? "bg-light-mode-grey"
                      : "card-drop-dark-shadow-home-page"
                  }   p-10 dash-fincard-sec-web`}
                >
                  <Image
                    width={350}
                    height={350}
                    src={each?.image}
                    alt={each?.title}
                    priority
                  />
                  <div>
                    <p className="fs-s-16 mt-10 fw-500">{each?.title}</p>
                    <p className="mb-0 underline pointer d-flex align-items-center gap-5px">
                      View Course{" "}
                      {lightMode
                        ? svgSheet5?.northEastblack
                        : svgSheet5?.northEastWhite}
                    </p>
                  </div>
                </a>
              );
            })}
        </div>
        <div className="dash-fincard-carousel-mob">
          <Carousel
            autoplay
            className={`fincard-carousel ${lightMode ? "dots" : ""}`}
          >
            {finGradCourse?.map((each) => {
              return (
                <a
                  href={each?.link}
                  target="_blank"
                  className={`${
                    lightMode ? "bg-gray" : "bg-dark-gray"
                  } p-10 dash-fincard-sec-mob`}
                >
                  <Image
                    width={300}
                    height={300}
                    src={each?.image}
                    alt={each?.title}
                  />
                  <div className="d-flex flex-col justify-content-between ">
                    <p className="fs-s-16 mt-10 fw-600">{each?.title}</p>
                    <p className="mb-0 underline pointer d-flex align-items-center gap-5px">
                      View Course{" "}
                      {lightMode
                        ? svgSheet5?.northEastblack
                        : svgSheet5?.northEastWhite}
                    </p>
                  </div>
                </a>
              );
            })}
          </Carousel>
        </div>

        {/* subscribe to unlimited plan section  */}
        {/* {userData?.userData?.user?.plan?.planId !== "lifetime" && (
          <div
            className={`${
              lightMode ? "card-drop-light-shadow" : "card-drop-dark-shadow"
            }   mt-70 fingrad-subscribe-card`}>
            <div className="text-sec">
              <p
                className={`${
                  lightMode ? "head-white" : "head-black"
                } fs-34-20 fw-700 mb-0`}>
                Subscribe to our unlimited plan
              </p>
              <p
                className={`${
                  windowWidth < 780 ? "w-100" : "w-75"
                } sub-text fs-20-16 mb-0`}>
                and Get access to all FinGrad premium Courses & Webinars
              </p>
            </div>
            <Link href={`/getpremium/summary/lifetime`}>
              <button
                style={{ width: "200px", height: "50px" }}
                className="btn-bg-primary d-flex justify-content-center align-items-center gap-5px justi fw-600 text-white fs-16-14 br-5">
                Get Premium {svgSheet5?.northEastWhite}
              </button>
            </Link>
          </div>
        )} */}
      </div>
    </section>
  );
}
export default FingradCourseAccess;
