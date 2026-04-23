import { authStore } from "../../redux/reducers/authSlice";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

function DiscoundCoupon({ lightMode }) {
  const auth = useSelector(authStore);
  const navigate = useRouter();
  const authRedirect = (pathName) => {
    if (auth.userData?.access_token) {
      navigate(pathName);
    } else {
      navigate(`/login`, { state: "/getpremium/summary/year/" });
    }
  };
  var cpnBtn = document.getElementById("cpnBtn");
  var cpnCode = document.getElementById("cpnCode");

  const CopyText = () => {
    navigator.clipboard.writeText(cpnCode?.innerHTML);
    cpnBtn.innerHTML = "COPIED";
    setTimeout(function () {
      cpnBtn.innerHTML = "COPY CODE";
    }, 3000);
  };
  return (
    <div className="container">
      <div className="coupon-card">
        <p className='fw-700 fs-s-18 mb-0'>Introductory Offer</p>
        <p className='fs-s-12 mb-0 mt-5' >20% flat off on all new users <br/> getting Elite Subscription on Fingrad</p>
        <div className="coupon-row">
            <span id="cpnCode" className='fs-s-12'>TBPORTAL20</span>
            <span id="cpnBtn" onClick={(e)=>{e.stopPropagation(); CopyText();  }} className='fs-s-12'>Copy Code</span>
        </div>
        <p className='mb-0 fs-s-12'>Valid Till: 30th Jun, 2023</p>
        <div className={` ${ lightMode ? "bg-white" : "bg-dark-black"} circle1  `}></div>
        <div className={` ${ lightMode ? "bg-white" : "bg-dark-black"}  circle2 `}></div>
    </div>
      {/* <div className="festive-coupon-card">
        <p className="fw-700 fs-s-18 mb-0">Diwali Festive Offer</p>
        <p className="fs-s-12 mb-0 mt-5">
          Get Free Anuual Subscription to 60+
          <br /> stock Market Courses & Webinars
          <br /> (worth Rs.1,999)
        </p>
        <div
          className="pointer"
          onClick={() => authRedirect("/getpremium/summary/year/")}
        >
          <button
            style={{ maxWidth: "180px", height: "40px", minWidth: "100px" }}
            className="btn-bg-secondary my-10 fw-500 text-white fs-14-10 br-5 p-5"
          >
            Claim Your Offer
          </button>
        </div>
        <p className="mb-0 fs-s-10" style={{ opacity: 0.7 }}>
          *Available with FinGrad’s 1 Yr Whales Plan
        </p>
        <p className="mb-0 fs-s-10" style={{ opacity: 0.7 }}>
          Valid Till 26 Oct,2022
        </p>
        <div
          className={` ${lightMode ? "bg-white" : "bg-dark-black"} circle1  `}
        ></div>
        <div
          className={` ${lightMode ? "bg-white" : "bg-dark-black"}  circle2 `}
        ></div>
      </div> */}
    </div>
  );
}

export default DiscoundCoupon;
