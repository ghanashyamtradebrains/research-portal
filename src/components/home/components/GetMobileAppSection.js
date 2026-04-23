import Image from "next/image";
import React from "react";
import getAppDark from "../../../assets/images/bg/mobileImage.webp";
import useWindowWidth from "../../../utilityFn/getWindowWidth";
import playstore from "../../../assets/images/playstore.png";
import iosImage from "../../../assets/images/iosDownload.png";
import svgSheet from "../../../assets/svg/svgSheet";
import svgSheet6 from "../../../assets/svg/svgSheet6";
import svgSheet8 from "../../../assets/svg/svgSheet8";

function GetMobileAppSection({ lightMode }) {
  const windowWidth = useWindowWidth();
  return (
    <section
      style={{ marginBottom: "-28px" }}
      className={`flex flex-col-row align-items-center mt-40 px-15 w-100 ${
        lightMode ? "bg-light-mode-grey" : "card-drop-dark-shadow-home-page"
      }`}
    >
      <div className="w-100-50 p-50-0">
        <h3 className="fs-40-28 fw-700 mb-10 mt-10 text-md-center ">
          Get Total Control <br />
          By Downloading Our App
        </h3>
        <p className="fs-16-14 mt-10 text-md-center">
          Browse through the financial and stock data of your favourite <br />{" "}
          Indian publically listed companies on BSE and NSE!
        </p>
        <div className="w-70-100 flex justify-content-between">
          <div>
            <h3 className="fs-30-20 fw-700 lh-40">300K +</h3>
            <p className="fs-16-14 text-gray">Downloads</p>
          </div>
          <div>
            <h3 className="fs-30-20 fw-700 lh-40">4.5 +</h3>
            <p className="fs-16-14 text-gray">App Rating</p>
          </div>
          <div>
            <h3 className="fs-30-20 fw-700 lh-40">400K +</h3>
            <p className="fs-16-14 text-gray">Registered Users</p>
          </div>
        </div>
        <div className="only-PC-view">
          <div>Download Now</div>
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
              />
            </a>{" "}
            <a
              target="_blank"
              href="https://apps.apple.com/in/app/trade-brains-portal/id1590981027"
            >
              <Image src={iosImage} width={150} height={60} alt="icon" />
            </a>
          </div>
          <div>
            <div className="mt-30">
              <div>Follow us on:</div>
              <div className="d-flex w-40-100 mt-10 justify-content-between">
                <p>
                  <a
                    href="https://www.youtube.com/channel/UCzw35O6toJtjqEAAt4LTjKQ"
                    target="_blank"
                  >
                    {svgSheet6?.youtubeIcon}
                  </a>
                </p>
                <p>
                  <a
                    href="https://in.linkedin.com/company/trade-brains"
                    target="_blank"
                  >
                    {svgSheet6?.linkedInIcon}
                  </a>
                </p>
                <p>
                  <a
                    href="https://instagram.com/portal.tradebrains?igshid=YmMyMTA2M2Y="
                    target="_blank"
                  >
                    {svgSheet6?.instagramIcon}
                  </a>
                </p>
                <p>
                  <a
                    href="https://twitter.com/TbPortal?t=AB4kcPk54CUIpf1-DH3AJQ&s=09"
                    target="_blank"
                  >
                    {svgSheet6?.twitterIcon}
                  </a>
                </p>
                <p>
                  <a href="https://t.me/tradebrainsofficial" target="_blank">
                    {svgSheet8?.telegram_large}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-100-50 ">
        <a href="https://bit.ly/tradebrainsportal" target="_blank">
          <Image
            style={{ height: windowWidth < 600 ? "auto" : "480px" }}
            className="mx-auto"
            src={getAppDark}
            alt="img"
            priority
          />
        </a>
        <div className="only-mobile-view">
          <div>Download Now</div>
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
                height={60}
                alt="icon"
                priority
              />
            </a>
          </div>
          <div>
            <div className="mt-10">
              <div>Follow us on:</div>
              <div className="d-flex w-20-100 mt-10 justify-content-between">
                <p>
                  <a
                    href="https://www.youtube.com/channel/UCzw35O6toJtjqEAAt4LTjKQ"
                    target="_blank"
                  >
                    {svgSheet6?.youtubeIcon}
                  </a>
                </p>
                <p>
                  <a
                    href="https://in.linkedin.com/company/trade-brains"
                    target="_blank"
                  >
                    {svgSheet6?.linkedInIcon}
                  </a>
                </p>
                <p>
                  <a
                    href="https://instagram.com/portal.tradebrains?igshid=YmMyMTA2M2Y="
                    target="_blank"
                  >
                    {svgSheet6?.instagramIcon}
                  </a>
                </p>
                <p>
                  <a
                    href="https://twitter.com/TbPortal?t=AB4kcPk54CUIpf1-DH3AJQ&s=09"
                    target="_blank"
                  >
                    {svgSheet6?.twitterIcon}
                  </a>
                </p>
                <p>
                  <a href="https://t.me/tradebrainsofficial" target="_blank">
                    {svgSheet8?.telegram_large}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GetMobileAppSection;
