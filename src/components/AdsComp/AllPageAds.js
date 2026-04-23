import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authStore } from "../../redux/reducers/authSlice";
import { getThemeMode } from "../../redux/reducers/ThemeSlice";
import { useRouter } from "next/router";
import {
  setRedirectUrl,
  setToggleForm,
} from "../../redux/reducers/AuthToggleSlice";
import PremiumTrialModal from "../Popups/PremiumTrialModal";
import useCheckTrialStatus from "../../hooks/useCheckTrialStatus";
import { getPageBanner } from "../../pages/api/fetchClient";
import Image from "next/image";
import styles from "./ads.module.css";

function AllPageAds({ page }) {
  const { lightMode } = useSelector(getThemeMode);
  const auth = useSelector(authStore);
  const dispatch = useDispatch();
  const router = useRouter();
  const checkTrialStatus = useCheckTrialStatus();

  const [visible, setVisible] = useState(false);
  const [banner, setBanner] = useState([]);

  const authRedirect = (pathName) => {
    if (auth.userData?.access_token) {
      localStorage.setItem("redirectFlag", "true");
      router.push(pathName);
    } else {
      localStorage.setItem("eventRedirect", `/getpremium`);
      dispatch(setToggleForm("login"));
      dispatch(setRedirectUrl("/getpremium"));
    }
  };

  const getBanner = async () => {
    try {
      const resp = await getPageBanner();
      setBanner(resp?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBanner();
  }, []);
  const filteredBanners = useMemo(() => {
    if (!banner?.length) return [];

    // ✅ Step 1: only active banners
    const activeBanners = banner.filter((item) => item.is_active === true);

    // ✅ Step 2: find page specific banner
    const matched = activeBanners.filter((item) => item.page === page);

    // ✅ Step 3: fallback to "all" page banner
    const allPage = activeBanners.filter((item) => item.page === "all");

    // ✅ Step 4: return priority
    return matched.length > 0 ? matched : allPage;
  }, [banner, page]);

  return (
    <>
      {auth?.userData?.user?.plan?.planId?.includes("_plus") ? (
        ""
      ) : (
        <div>
          {filteredBanners.length > 0 &&
            filteredBanners.map((item, index) => (
              <div
                key={item.id}
                className="d-flex justify-content-center align-items-center mt-20 mb-20 cursor-pointer"
                onClick={() => authRedirect(item.redirect_url)}
              >
                <div className={`only-PC-view ${styles.card}`}>
                  <Image
                    src={item?.banner_url}
                    alt="banner"
                    fill
                    style={{
                      borderRadius: "18px",
                    }}
                    priority={index === 0}
                  />
                </div>
                <div className={`only-mobile-view ${styles.card}`}>
                  <Image
                    src={item?.banner_url_mobile}
                    alt="banner"
                    fill
                    style={{
                      borderRadius: "18px",
                    }}
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}

          <PremiumTrialModal
            visible={visible}
            setVisible={setVisible}
            isTrialOver={checkTrialStatus()}
          />
        </div>
      )}
    </>
  );
}

export default AllPageAds;
