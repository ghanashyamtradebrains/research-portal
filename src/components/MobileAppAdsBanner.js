import Image from "next/image";
import phoneImg from "../assets/images/iPhone 14 Pro Max.png";
import { Rate } from "antd";
import Cookies from "js-cookie";
function MobileAppAdsBanner({ lightMode }) {
  const onMobileAppAdClick = () => {
    Cookies.set("ptl_mobile_app_banner", true, {
      expires: 999,
    });
  };
  return (
    <div
      className={`only-mobile-view ${
        lightMode ? "text-dark bg-white" : "text-white bg-dark-gray"
      }  p-10 pb-0 card-shadow-black`}>
      <div className="d-flex align-items-center gap-5px">
        <div>
          <Image src={phoneImg} />
        </div>
        <div className="d-flex gap-10px align-items-center">
          <div>
            <p className="mb-0 fs-s-10 fw-400">
              Get detailed analysis and market news on Trade Brains Portal App
            </p>
            <div className="d-flex align-items-center gap-5px">
              <Rate
                allowHalf
                disabled
                style={{ color: "#E3A51A" }}
                defaultValue={4.5}
                value={4.5}
                className="mobileapp_rating"
              />
              <p className="mb-0 fs-s-10">
                <span className="fw-600">4.6</span> Rating
              </p>
            </div>
          </div>
          <div>
            <a
              onClick={onMobileAppAdClick}
              href="https://bit.ly/tradebrainsportal"
              target="_blank">
              <button
                style={{ width: "76px", height: "35px" }}
                className="btn-bg-primary text-white fs-s-10 fw-600 br-5">
                Open In App
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MobileAppAdsBanner;
