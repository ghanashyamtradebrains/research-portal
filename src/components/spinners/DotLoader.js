import React from "react";
import { useSelector } from "react-redux";
import { getThemeMode } from "../../redux/reducers/ThemeSlice";
import PortalLoaderGif from "../../assets/images/loadergif/portalLoading.gif";
import Image from "next/image";
import MainLayout from "../MainLayout/MainLayout";
import { useRouter } from "next/router";
import styles from "./spinner.module.css";
import portalLoader from "../../../public/Vector.png";
import useWindowWidth from "../../utilityFn/getWindowWidth";

function DotLoader({ loaderData }) {
  const { lightMode } = useSelector(getThemeMode);
  const router = useRouter();
  const windowWidth = useWindowWidth();
  return (
    <MainLayout>
      <div
        className="d-flex justify-content-center"
        style={{
          height: loaderData ? "25vh" : "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: lightMode && "#f2f6f8",
          transform: "translateY(-100px)",
        }}
      >
        <>
          <div>
            <svg
              width={windowWidth < 768 ? "80px" : "120px"}
              height="120px"
              viewBox="0 0 37 37"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* OUTER PART (ANIMATED) */}
              <g
                style={{
                  transformOrigin: "50% 50%",
                  transformBox: "fill-box",
                  animation: "spin 1.6s cubic-bezier(0.6,0.05,0.4,1) infinite",
                  fill: "#4F7CFF",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="37"
                  height="37"
                  viewBox="0 0 37 37"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.75 5.56345C11.8314 4.90513 13.0145 4.36299 14.2994 4.04028C16.1314 3.49814 17.0982 2.94308 17.0982 0.761588L17.0982 -7.47388e-07C13.8669 0.21944 10.8645 1.30373 8.28196 3.05925C3.65119 6.11851 0.432544 11.2431 -8.68014e-07 17.1422L0.750591 17.1422C2.90059 17.1422 3.43491 16.2644 3.98196 14.3023C5.05059 10.5848 7.53137 7.53842 10.75 5.56345Z"
                    fill={!lightMode ? "#fff" : "#292e3f"}
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M31.5137 26.1958C32.1625 25.0986 32.6969 23.8981 33.0149 22.6977C33.5492 20.8389 34.0963 19.8578 36.2463 19.8578L36.9969 19.8578C36.7806 23.1365 35.7119 26.0796 33.9818 28.7C30.8649 33.3986 25.8016 36.5611 19.8859 37L19.8859 36.2384C19.8859 34.0569 20.8528 33.5148 22.6847 32.9597C26.3486 31.9787 29.4655 29.4745 31.5137 26.1958Z"
                    fill={!lightMode ? "#fff" : "#292e3f"}
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.59764 26.1958C4.94882 25.0986 4.4145 23.8981 4.09645 22.6977C3.56213 20.8389 3.01509 19.8578 0.865089 19.8578L-7.49308e-07 19.8578C0.216272 23.1365 1.28491 26.0796 3.01509 28.7C6.13196 33.3986 11.1953 36.5611 17.111 37L17.111 36.2384C17.111 34.0569 16.1441 33.5148 14.3121 32.9597C10.6482 31.9787 7.53137 29.4745 5.59764 26.1958Z"
                    fill={!lightMode ? "#fff" : "#292e3f"}
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M26.25 5.56345C25.1686 4.90513 23.9855 4.36299 22.7006 4.04028C20.8686 3.49814 19.9018 2.94308 19.9018 0.761588L19.9018 -8.69934e-07C23.1331 0.219439 26.1355 1.30373 28.718 3.05925C33.3488 6.11851 36.5675 11.2431 37 17.1422L36.2494 17.1422C34.0994 17.1422 33.5651 16.2644 33.018 14.3023C31.9494 10.5848 29.4686 7.53841 26.25 5.56345Z"
                    fill={!lightMode ? "#fff" : "#292e3f"}
                  />
                </svg>
              </g>

              {/* MIDDLE LOGO (STATIC) */}
              <g
                fill="#4F7CFF"
                style={{
                  transform: "translateY(5.4px) translateX(1.5px) scale(0.90)",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="26"
                  viewBox="4 -3 16 28"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.8439 0C19.9434 0 25.7263 5.81391 25.7263 12.9127C25.7263 16.9965 23.7643 20.6604 20.8212 23.0266V9.03255H16.6777V25.1639C16.1355 25.3802 15.5805 25.482 14.935 25.5965V13.3326H10.7915V25.5965C10.2493 25.4947 9.69429 25.3802 9.04888 25.1639V17.2H4.90533V23.0139C1.96225 20.6477 0.00019336 16.9965 0.00019336 12.9C-0.0385314 5.80119 5.74437 0 12.8439 0Z"
                    fill={!lightMode ? "#fff" : "#292e3f"}
                  />
                </svg>
              </g>
            </svg>
          </div>

          <style>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
        </>
      </div>
    </MainLayout>
  );
}

export default DotLoader;
