import React, { useEffect, useState } from "react";
// import { useLocation, useParams } from "react-router-dom";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import cookie from "js-cookie";

import {
  googleTapRedirect,
  postMailChimp,
  postOnetapLogin,
  postReferAPI,
} from "../../pages/api/fetchClient";
import { setAuth } from "../../redux/reducers/authSlice";
import AccountDeactivated from "../../pages/account-deactivated";
import {
  setLoginTime,
  setSessionTime,
} from "../../redux/reducers/loginTimeSlice";
function OneTapSignin() {
  // const location = useLocation();
  const [mailChimp, setmailChimp] = useState(true);
  const [apiLoader, setapiLoader] = useState(false);
  const [apiError, setApiError] = useState();
  const dispatch = useDispatch();
  const navigate = useRouter();
  const loginTime = new Date();
  const urlState =
    navigate?.asPath !== undefined ? `${navigate?.asPath} ` : "/";
  const googleSignUp = () => {
    const url = googleTapRedirect(urlState);
    window.location.href = url;
    sessionStorage.setItem("Mailchimp", mailChimp);
  };

  useEffect(() => {
    sessionStorage.setItem("Mailchimp", mailChimp);
  }, [mailChimp]);
  const onOneTapSignedIn = async (response) => {
    setapiLoader(true);
    const eventRedirect = localStorage.getItem("eventRedirect");
    try {
      await postOnetapLogin({ id_token: response?.credential }).then(
        async (res) => {
          if (res?.data === "") {
            googleSignUp();
          } else if (mailChimp) {
            postMailChimp(res?.data?.user?.email).then((res) => {});
            cookie.set("ptl_access_token", res?.data?.access_token, {
              expires: 2,
              secure: true,
              sameSite: "Lax",
            });
            cookie.set("refresh_token", res?.data?.refresh_token, {
              expires: 180,
              secure: true,
              sameSite: "Lax",
            });
            cookie.set("start_session", loginTime);
            cookie.set("login_time", loginTime, {
              expires: 180,
              path: "/", // always recommended
              secure: false, // should be false for localhost
              sameSite: "Lax", // optional, good default
            });
            dispatch(setAuth(res.data));
            dispatch(setLoginTime(loginTime));
            dispatch(setSessionTime(loginTime));
          }

          if (res.data.user.accountType === "admin") {
            navigate.push("https://admin-portal.tradebrains.in/");
          } else if (eventRedirect) {
            navigate.push(eventRedirect);
          } else if (navigate.asPath !== undefined) {
            if (navigate.asPath === "/portfolio") {
              if (res?.data?.user?.plan?.sname === "Free") {
                navigate.push(navigate.asPath);
              } else {
                navigate.push(navigate.asPath);
              }
            } else {
              navigate.push(navigate.asPath);
            }
          } else {
            navigate.push("/stock-research-report");
          }
          setapiLoader(false);
          // setisLoginPage(false);
          // onCloseHandler("NONE");
        },
      );
    } catch (error) {
      if (error.response.status === 406) {
        navigate.push("/account-deactivated");
      }
    }
  };
  const initializeGSI = () => {
    window.google?.accounts?.id.initialize({
      client_id:
        "1065016260363-bt80d75995gpcisjjq345bmfj8qjq49h.apps.googleusercontent.com",
      cancel_on_tap_outside: false,
      callback: onOneTapSignedIn,
    });
    window.google?.accounts?.id.prompt((notification) => {});
  };

  useEffect(() => {
    const el = document.createElement("script");
    el.setAttribute("src", "https://accounts.google.com/gsi/client");
    el.onload = () => initializeGSI();
    document.querySelector("body").appendChild(el);
  }, []);
  return <div></div>;
}

export default OneTapSignin;
