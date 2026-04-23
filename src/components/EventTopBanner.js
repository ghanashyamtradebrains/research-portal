import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFestivalStatus, getSalesBanner } from "../pages/api/fetchClient";
import { authStore } from "../redux/reducers/authSlice";
import {
  setRedirectUrl,
  setToggleForm,
} from "../redux/reducers/AuthToggleSlice";

function EventTopBanner() {
  const auth = useSelector(authStore);
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [salesBanner, setSalesBanner] = useState([]);
  const authRedirect = (pathName) => {
    if (auth.userData?.access_token) {
      navigate.push(pathName);
    } else {
      localStorage.setItem("eventRedirect", `/getpremium`);

      dispatch(setToggleForm("login"));
      dispatch(setRedirectUrl("/getpremium"));
      // navigate.push(`/login`, { state: "/getpremium" });
    }
  };
  const [Event, setEvent] = useState();
  useEffect(() => {
    getFestivalStatus().then((res) => {
      setEvent(res?.data);
    });
  }, []);

  const getBanners = async () => {
    try {
      const sales = await getSalesBanner();
      setSalesBanner(sales?.data);
    } catch (err) {
      console.log("Error fetching banners", err);
    }
  };

  useEffect(() => {
    getBanners();
  }, []);

  const today = new Date();

  const activeBanner = salesBanner.find(
    (banner) => new Date(banner?.sale_ends_on) >= today && banner?.is_active,
  );

  const miniBannerText = activeBanner ? activeBanner.mini_banner_text : "";

  return (
    <section className="bg-top-gardient w-100 h-50px flex div-items-center px-15">
      <div className="flex align-items-center text-white">
        <p className="fs-16-12 fw-600 mb-0"> {miniBannerText}</p>
        <div onClick={() => authRedirect("/getpremium")}>
          <button
            style={{ maxWidth: "200px", height: "30px", minWidth: "120px" }}
            className="bg-white  fw-600 text-black fs-14-12 br-5 p-5"
          >
            Claim Your Offer
          </button>
        </div>
      </div>
    </section>
  );
}

export default EventTopBanner;
