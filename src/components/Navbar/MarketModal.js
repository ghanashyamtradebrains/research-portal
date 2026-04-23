import { Modal } from "antd";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { authStore } from "../../redux/reducers/authSlice";
import useWindowWidth from "../../utilityFn/getWindowWidth";

function MarketModal({ lightMode, setvisible, visible, change }) {
  const [iconVisible, setIconVisible] = useState(false);
  const auth = useSelector(authStore);

  const deadline = "Sep, 13, 2024 17:00:00 GMT+0530";

  const windowWidth = useWindowWidth();
  const [duration, setDuration] = useState({
    Days: 0,
    Hours: 0,
    Minutes: 0,
    Seconds: 0,
  });

  const getTimeUntil = () => {
    const time = Date.parse(deadline) - Date.parse(new Date());
    if (time < 0) {
      setDuration({
        Days: 0,
        Hours: 0,
        Minutes: 0,
        Seconds: 0,
      });
    } else {
      setDuration({
        Days: Math.floor(time / (1000 * 60 * 60 * 24)),
        Hours: Math.floor((time / (1000 * 60 * 60)) % 24),
        Minutes: Math.floor((time / 1000 / 60) % 60),
        Seconds: Math.floor((time / 1000) % 60),
      });
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => getTimeUntil(deadline), 1000);
    return () => clearInterval(intervalId);
  }, [deadline]);

  const router = useRouter();
  const prevRouteRef = useRef(router?.route);

  useEffect(() => {
    prevRouteRef.current = router?.route;
  }, [router?.route]);

  const prevRoute = prevRouteRef.current;
  if (prevRoute !== router?.route) {
    setvisible(true);
  }

  useEffect(() => {
    setIconVisible(false);
    setTimeout(() => {
      setIconVisible(true);
    }, 15000);
  }, []);

  const authRedirect = (pathName) => {
    if (auth.userData?.access_token) {
      router.push(pathName);
    } else {
      localStorage.setItem("eventRedirect", `/getpremium`);
      router.push(`/login`, { state: "/getpremium" });
    }
  };

  return (
    <>
      {duration.Days !== 0 ||
      duration.Hours !== 0 ||
      duration.Minutes !== 0 ||
      duration.Seconds !== 0
        ? iconVisible && (
            <div>
              <Modal
                centered
                width={windowWidth < 600 ? "360px" : "540px"}
                bodyStyle={{
                  minHeight: windowWidth < 600 ? "320px" : "500px",
                  borderRadius: "10px",
                }}
                open={iconVisible}
                footer={null}
                onCancel={() => setIconVisible(false)}
                className="relative p-20 market-cancel-icon"
                wrapClassName="filter-modal feedback-mod"
              >
                <div
                  className={`br-10 pb-10 ${
                    windowWidth < 600
                      ? "market-image-bg-mob"
                      : "market-image-bg"
                  }`}
                  onClick={() => {
                    authRedirect("/getpremium");
                    setIconVisible(false);
                  }}
                ></div>
              </Modal>
            </div>
          )
        : null}
    </>
  );
}

export default MarketModal;
