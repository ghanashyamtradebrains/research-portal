import React, { useEffect, useState } from "react";
import { Drawer } from "antd";
import SearchComponent from "./SearchComponent";
import { useDispatch, useSelector } from "react-redux";
import { authStore } from "../../redux/reducers/authSlice";
import { bannerOffsetCalc } from "../../utilityFn/bannerOffsetcalc";
import { useRouter } from "next/router";

function MobileSearch({
  mobileSearchToggle,
  setMobileSearchToggle,
  inputData,
  lightMode,
  searchResultDiv,
  setMobileSearchDrop,
}) {
  const [mobSearchInput, setmobSearchInput] = useState("");
  const UserAuth = useSelector(authStore);
  useEffect(() => {
    setmobSearchInput(inputData);
  }, [inputData]);
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <>
      <Drawer
        style={{
          top:
            mobileSearchToggle === "SEARCH"
              ? `${
                  bannerOffsetCalc(UserAuth) === 1
                    ? "105"
                    : 165 + bannerOffsetCalc(UserAuth)
                }px`
              : "115px",
        }}
        rootStyle={{
          top:
            mobileSearchToggle === "SEARCH"
              ? `${
                  bannerOffsetCalc(UserAuth) === 1
                    ? "105"
                    : router.pathname === "/"
                      ? 80
                      : 155 + bannerOffsetCalc(UserAuth)
                }px`
              : "115px",
        }}
        drawerStyle={{
          background: lightMode ? "white" : "#292E3F",
          color: lightMode ? "black" : "white",
        }}
        className="ff-poppins "
        headerStyle={{ marginInline: "16px", padding: "0px" }}
        bodyStyle={{ margin: "18px 24px 16px 24px", padding: "0px" }}
        placement={"top"}
        closable={false}
        onClose={() => {
          setMobileSearchToggle("NONE");
          setMobileSearchDrop(false);
        }}
        open={mobileSearchToggle === "SEARCH" ? true : false}
        afterOpenChange={(openorclose) => console.log("isopen", openorclose)}
        key="tools"
        height="auto"
        zIndex={500}
      >
        <SearchComponent
          planData={UserAuth}
          lightMode={lightMode}
          setMobileSearchToggle={setMobileSearchToggle}
        />
      </Drawer>
      {mobSearchInput && (
        <div
          className={`mob-result-body w-100  absolute ${
            lightMode ? "bg-white" : "bg-dark-gray "
          }  px-15 b-whitesmoke`}
          style={{ top: "177px" }}
        >
          {searchResultDiv}
        </div>
      )}
    </>
  );
}

export default MobileSearch;
