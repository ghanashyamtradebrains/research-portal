import Cookies from "js-cookie";
import store from "../../redux/store";
import axios from "axios";
import {
  setAuth,
  updateAccessToken,
  resetWatchlistArr,
  setSessionTime,
  setLoginTime,
} from "../../redux/reducers/authSlice";

let agent;

export const getHeader = async () => {
  const storeData = await store?.getState()?.auth;
  if (typeof window !== "undefined") {
    agent = window.navigator.userAgent;
  } else {
    agent = null;
  }

  if (storeData?.userData?.access_token) {
    return {
      headers: {
        Authorization: `jwt ${storeData?.userData?.access_token}`,
        "User-Agent": agent,
      },
    };
  } else {
    return {
      headers: {
        "User-Agent": agent,
      },
    };
  }
};

export const getHeaderPortalAi = async () => {
  const storeData = await store?.getState()?.auth;
  if (typeof window !== "undefined") {
    agent = window.navigator.userAgent;
  } else {
    agent = null;
  }

  if (storeData?.userData?.access_token) {
    return {
      headers: {
        Authorization: `jwt ${storeData?.userData?.access_token}`,
        "User-Agent": agent,
        "ngrok-skip-browser-warning": "true",
      },
    };
  } else {
    return {
      headers: {
        "User-Agent": agent,
        "ngrok-skip-browser-warning": "true",
      },
    };
  }
};

const instance = axios.create({
  baseURL: process.env.NEXT_APP_BASE_URL,
});

const portalAiUrl = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PORTAL_AI_URL,
});

const clearAuthAndCookies = () => {
  console.log("Clearing cookies and resetting auth...");
  store.dispatch(setAuth({}));
  store.dispatch(updateAccessToken());
  store.dispatch(resetWatchlistArr());
  store.dispatch(setSessionTime());
  store.dispatch(setLoginTime());
  Cookies.remove("ptl_access_token", { path: "/" });
  Cookies.remove("refresh_token", { path: "/" });
  Cookies.remove("login_time", { path: "/" });
  Cookies.remove("start_session", { path: "/" });
  Cookies.remove("refresh_token", { path: "/" });
};

// Refresh token logic
const refreshToken = async () => {
  const storeData = store.getState()?.auth;
  try {
    const response = await axios.post(
      `${process.env.NEXT_APP_BASE_URL}token/refresh/`,
      {
        refresh: storeData?.userData?.refresh_token,
      },
    );
    return response?.data?.access;
  } catch (error) {
    clearAuthAndCookies();
    window.location.reload();
    throw new Error("Unable to refresh token");
  }
};

instance.interceptors.request.use((config) => {
  const storeData = store.getState()?.auth;
  if (storeData?.userData?.access_token) {
    config.headers["Authorization"] = `jwt ${storeData.userData.access_token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isTokenInvalid =
      error?.response?.status === 401 ||
      error?.response?.data?.messages?.[0]?.message ===
        "Token is invalid or expired";

    if (isTokenInvalid && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshToken();
        Cookies.set("ptl_access_token", newToken, {
          expires: 2,
          secure: true,
          sameSite: "Lax",
        });
        store.dispatch(updateAccessToken(newToken));
        originalRequest.headers["Authorization"] = `jwt ${newToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        clearAuthAndCookies();
        window.location.reload();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

// Retry logic for API calls
const retryRequest = async (requestFunction, retries = 3, delay = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await requestFunction();
    } catch (error) {
      const status = error?.response?.status;
      const url = error?.config?.url;

      if (status === 401) {
        const hasReloaded = sessionStorage.getItem("reloadTriggered");
        if (!hasReloaded) {
          sessionStorage.setItem("reloadTriggered", "true");
          if (typeof window !== "undefined") {
            window.location.reload();
          }
        }
        throw error;
      } else if (status === 502) {
        if (i === retries - 1) throw error;
        await new Promise((res) => setTimeout(res, delay));
      } else if (status === 500) {
        return null;
      } else {
        throw error;
      }
    }
  }
};

export const post = async (url, data) => {
  return retryRequest(async () => instance.post(url, data, await getHeader()));
};

export const get = (url) => {
  return retryRequest(async () => instance.get(url, await getHeader()));
};

export const portalAiPost = (url, amount) => {
  return retryRequest(async () =>
    portalAiUrl.post(url, amount, await getHeaderPortalAi()),
  );
};

export const portalAiGet = (url) => {
  return retryRequest(async () =>
    portalAiUrl.get(url, await getHeaderPortalAi()),
  );
};

export const portalAiDel = (url) => {
  return retryRequest(async () =>
    portalAiUrl.delete(url, await getHeaderPortalAi()),
  );
};

export const getServer = async (url, head) => {
  const response = await retryRequest(async () =>
    instance.get(url, await head),
  );

  // response may be undefined → force it to null
  if (!response) return null;

  // data may be undefined → convert to null
  return response.data ?? null;
};

export const del = async (url) => {
  return retryRequest(async () => instance.delete(url, await getHeader()));
};

export const delWithParams = async (url, data) => {
  const head = await getHeader();
  return retryRequest(async () =>
    instance.delete(url, { ...head, data: data }),
  );
};

export const put = async (url, data) => {
  return retryRequest(async () => instance.put(url, data, await getHeader()));
};

export const patch = async (url, data) => {
  return retryRequest(async () => instance.patch(url, data, await getHeader()));
};

export const postWithoutRetry = async (url, data) => {
  return instance.post(url, data, await getHeader());
};
