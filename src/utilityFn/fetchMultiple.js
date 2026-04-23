// lib/fetchMultiple.js

import store from "../redux/store";

export async function fetchMultiple(urls) {
  let agent;

  const storeData = await store?.getState()?.auth;
  if (typeof window !== "undefined") {
    agent = window.navigator.userAgent;
  } else {
    agent = null;
  }

  const fetches = urls.map(async (url, index) => {
    try {
      const headers = {
        "User-Agent": agent,
      };

      if (storeData?.userData?.access_token) {
        headers["Authorization"] = `jwt ${storeData.userData.access_token}`;
      }

      const res = await fetch(`${process.env.NEXT_APP_BASE_URL}${url}`, {
        method: "GET",
        headers,
        cache: "no-store",
      });

      if (!res.ok) {
        if (index === 0) throw new Error(`Critical fetch failed: ${url}`);
        return null;
      }

      return await res.json();
    } catch (error) {
      if (index === 0) {
        throw error;
      } else {
        console.warn(`Non-critical fetch failed: ${url}`, error.message);
        return null;
      }
    }
  });

  return await Promise.all(fetches);
}
