import { useEffect, useRef, useState } from "react";
import svgSheet from "../../../assets/svg/svgSheet";
import { useRouter } from "next/router";
import useWindowWidth from "../../../utilityFn/getWindowWidth";

function IndexCount({ lightMode,index_name }) {
  const [count, setCount] = useState(100);
  const [copied, setCopied] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  const router = useRouter();
  const windowWidth = useWindowWidth();
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const platforms = [
    {
      link: `https://reddit.com/share?url=portal.tradebrains.in${router?.asPath}`,
      color: "#fc471e",
      padding: "12px",
      icon: svgSheet.redditIndex,
    },
    {
      link: `https://twitter.com/share?url=portal.tradebrains.in${router?.asPath}`,
      color: "#000",
      padding: "9px",
      icon: svgSheet.twitterindex,
    },
    {
      link: `https://api.whatsapp.com/send?text=portal.tradebrains.in${router?.asPath}`,
      color: "#50ca5e",
      padding: "6px",
      icon: svgSheet.whatsappindex,
    },
  ];
  const copyToClipboard = () => {
    const link = document.getElementById("shareLink").value;
    navigator.clipboard.writeText(link).then(
      () => {
        setCopied(true);
        setShowPopup(true);
        setTimeout(() => {
          setCopied(false);
        }, 3000);
      },
      (err) => {
        console.error("Failed to copy link: ", err);
      }
    );
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  useEffect(() => {
    const updatedCount = (parseInt(count) + 1);
    setCount(updatedCount);
    localStorage.setItem("visitorCount", updatedCount);
  }, []);
  return (
    <div className="d-flex w-100 align-items-center justify-content-between">
      <div className="d-flex align-items-center gap-5px">
        {lightMode ? svgSheet.lightModeVisibility : svgSheet.visibilityicon}{" "}
        {count > 1000 ? count + "k" : count}
      </div>
      <div className="d-flex align-items-center gap-5px" onClick={togglePopup}>
        <span className="d-flex align-items-center ">
          {lightMode ? svgSheet.shareindexLight : svgSheet.shareindexDark}{" "}
        </span>
        <span className="d-flex align-items-center pointer">Share </span>
        <div
          className={`br-10 ${
            lightMode ? "bg-light-mode-grey" : "bg-dark-black"
          }  dropdown-new-search-bar-w-out-l
           `}>
          {showPopup && (
            <div
              ref={popupRef}
              className={` ${
                lightMode ? "bg-light-mode-grey" : "bg-dark-black"
              }  dropdown-new-search-bar-w-out-l
         `}
              style={{
                position: "absolute",
                top: "15px",
                left: windowWidth <500 ? "-262px":"-300px",
                backgroundColor: "#212639",
                border: "1px solid #212639",
                borderRadius: "4px",
                zIndex: 9999,
              }}>
              <div className=" d-flex-col br-5 p-15 box-shadow-card">
                <div
                  className="d-flex flex-column align-items-center w-100 justify-content-between br-5"
                  style={{ border: "1px solid #545E78" }}>
                  <input
                    type="text"
                    id="shareLink"
                    value={`https://portal.tradebrains.in/index/${index_name}`}
                    style={{
                      padding: "8px",
                      backgroundColor: "#212639",
                      color: "#fff",
                      border: "none",
                      fontSize: "14px",
                    }}
                    className="w-75p"
                  />

                  <button
                    onClick={copyToClipboard}
                    className="w-20p br-15"
                    style={{
                      backgroundColor: "#6DB8FD",
                      padding: copied ? "10px" : "8px",
                    }}>
                    {copied ? "Copied" : svgSheet.contentCopy}
                  </button>
                </div>
                <div className="d-flex flex-column align-items-center w-100 justify-content-between br-5 gap-5px mt-10">
                  {platforms.map((platform, index) => (
                    <a
                      key={index}
                      href={platform.link}
                      className="w-33 d-flex align-items-center justify-content-center br-5"
                      style={{
                        backgroundColor: platform.color,
                        padding: platform.padding,
                      }}>
                      {platform.icon}
                    </a>
                  ))}
                </div>{" "}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default IndexCount;
