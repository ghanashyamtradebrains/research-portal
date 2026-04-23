import { AutoComplete } from "antd";
import { Router, useRouter } from "next/router";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchData } from "../../pages/api/fetchClient";
import { AddStock } from "../../redux/reducers/RecenSearchSlice";
import { bannerOffsetCalc } from "../../utilityFn/bannerOffsetcalc";
import CreateWatchListModel from "../watchlist/CreateWatchListModel";
import PremiumRedirectModal from "../PremiumRedirectModal";
import svgSheet from "../../assets/svg/svgSheet";
import { authStore } from "../../redux/reducers/authSlice";
import DotLoader from "../spinners/DotLoader";
import useDebounce from "../../utilityFn/debounce";
import useWindowWidth from "../../utilityFn/getWindowWidth";
import PremiumTrialModal from "../Popups/PremiumTrialModal";
import useCheckTrialStatus from "../../hooks/useCheckTrialStatus";

function SearchComponent({
  lightMode,
  setMobileSearchToggle,
  planData = {},
  dashboard,
  homePage,
  custom,
}) {
  const navigate = useRouter();
  const [inputData, setinputData] = useState("");
  const [apiData, setapiData] = useState([]);
  const [superstar, setSuperstar] = useState([]);
  const [buckets, setBuckets] = useState([]);
  const [index, setIndex] = useState([]);
  const [inputSelected, setinputSelected] = useState("");
  const [open, setopen] = useState(false);
  const [WatchListTrigger, setWatchListTrigger] = useState(false);
  const dispatch = useDispatch();
  const [DropDown, setDropDown] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [loaderData, setLoaderData] = useState(true);
  const [OpenModel, SetOpenModel] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Stock");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [premiumModal, setpremiumModal] = useState(false);
  const [values, setValues] = useState("");
  const [isPremium, setIsPremium] = useState(true);
  const UserAuth = useSelector(authStore);
  const windowWidth = useWindowWidth();
  const checkTrialStatus = useCheckTrialStatus();
  const debouncedSearchTerm = useDebounce(inputSelected, 500);

  const getResults = async (e) => {
    setinputData(e);
    const response =
      (await !WatchListTrigger) &&
      getSearchData(e)
        .then((resp) => {
          setapiData(() => resp?.data?.stock?.filter((item) => item.symbol));
          setBuckets(() => resp?.data?.buckets?.filter((item) => item.name));
          setSuperstar(() =>
            resp?.data?.superstars?.filter((item) => item.slug),
          );
          setIndex(() => resp?.data?.index?.filter((item) => item.Symbol));
        })
        .catch((err) => null);
  };

  useEffect(() => {
    getResults(inputSelected);
  }, [debouncedSearchTerm]);

  const handleSearchBarClick = () => {
    if (!inputSelected && values === "") {
      setShowDropdown(true);
      setClicked(false);
    } else {
      // setShowDropdown(false);
      setShowDropdown(true);
      if (clicked) {
        setShowDropdown(false);
        setValues("");
      }
    }
  };

  useEffect(() => {
    if (values !== "") {
      setShowDropdown(false);
      setValues("");
    }
  }, [values]);
  const handleSearchInputChange = (e) => {
    setinputSelected(e.target.value);
    if (selectedCategory === "All") {
      setShowDropdown(true);
    } else if (selectedCategory === "Stock") {
      setShowDropdown(true);
    } else if (selectedCategory === "Superstars") {
      setShowDropdown(true);
    } else if (selectedCategory === "Buckets") {
      setShowDropdown(true);
    } else if (selectedCategory === "Index") {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleCategoryButtonClick = (category) => {
    setSelectedCategory(category);
    // setClicked(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdownContainer = document.querySelector(".header-search-body");
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !dropdownContainer.contains(event.target)
      ) {
        setShowDropdown(false);
        setValues("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const onBucketClick = (bucketname) => {
    navigate.push(`/buckets/${bucketname}`);
    setMobileSearchToggle("NONE");
  };

  const allItems = [...apiData, ...index, ...superstar, ...buckets];
  let itemsToDisplay;
  const typesSet = new Set(allItems.map((item) => item.type));
  if (typesSet.size === 4) {
    const selectedItems = [];
    const selectedTypes = new Set();
    for (const item of allItems) {
      if (!selectedTypes.has(item.type)) {
        selectedItems.push(item);
        selectedTypes.add(item.type);
      }
      if (selectedItems.length === 4) break;
    }
    itemsToDisplay = selectedItems;
  } else if (typesSet.size === 3) {
    const selectedItems = [];
    const selectedTypes = new Set();
    let stockCount = 0;
    let otherCount = 0;
    for (const item of allItems) {
      if (
        (item.type === "stock" && stockCount < 2) ||
        ((item.type === "index" ||
          item.type === "superstars" ||
          item.type === "buckets") &&
          otherCount < 2)
      ) {
        selectedItems.push(item);
        selectedTypes.add(item.type);
        if (item.type === "stock") {
          stockCount++;
        } else {
          otherCount++;
        }
      }
    }
    for (const item of allItems) {
      if (selectedItems.length === 4) {
        break;
      }
      if (
        (item.type === "index" ||
          item.type === "superstars" ||
          item.type === "buckets") &&
        !selectedTypes.has(item.type)
      ) {
        selectedItems.push(item);
        selectedTypes.add(item.type);
      }
    }

    itemsToDisplay = selectedItems;
  } else if (typesSet.size === 2) {
    const selectedItems = [];
    const selectedTypes = new Set();
    let stockCount = 0;
    let superstarCount = 0;
    for (const item of allItems) {
      if (
        (item.type === "stock" && stockCount < 2) ||
        ((item.type === "index" ||
          item.type === "superstars" ||
          item.type === "buckets") &&
          superstarCount < 2)
      ) {
        selectedItems.push(item);
        selectedTypes.add(item.type);
        if (item.type === "stock") {
          stockCount++;
        } else {
          superstarCount++;
        }
      }
      if (stockCount === 2 && superstarCount === 2) {
        break;
      }
    }
    itemsToDisplay = selectedItems;
  } else {
    itemsToDisplay = allItems.slice(0, 4);
  }

  const [placeholder, setPlaceholder] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const placeholders = [
    "Stocks...",
    "Indices...",
    "Superstars...",
    "Buckets...",
  ];

  useEffect(() => {
    const currentWord = placeholders[wordIndex];
    if (charIndex < currentWord.length) {
      const timeoutId = setTimeout(() => {
        setPlaceholder((prev) => prev + currentWord[charIndex]);
        setCharIndex(charIndex + 1);
      }, 100);
      return () => clearTimeout(timeoutId);
    } else {
      const timeoutId = setTimeout(() => {
        setPlaceholder("");
        setCharIndex(0);
        setWordIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [charIndex, wordIndex, placeholders]);

  return (
    <div className="header-search-body relative">
      {!WatchListTrigger && (
        <CreateWatchListModel
          onClick={() => !WatchListTrigger && setWatchListTrigger(true)}
          OpenModel={OpenModel}
          SetOpenModel={SetOpenModel}
          lightMode={lightMode}
        />
      )}
      <div
        onClick={handleSearchBarClick}
        ref={dropdownRef}
        className={`w-100 ${
          lightMode
            ? homePage
              ? "antd-Selete-Custom-light-new-dashboard d-flex justify-content-center align-items-center"
              : "antd-Selete-Custom-light-new"
            : homePage
              ? "antd-Selete-Custom-black-new-dashboard d-flex justify-content-center align-items-center"
              : navigate.pathname.includes("/portal-ai")
                ? "bg-dark-portal-ai text-white"
                : " antd-Selete-Custom-black-new"
        } nav-Bar-autofix ${
          open
            ? "navbar-search-active"
            : homePage
              ? "flex-col absolute"
              : "flex-col"
        } `}
      >
        {custom ? (
          <>
            <input
              type="text"
              placeholder={
                homePage
                  ? "Search your favourite" + " " + placeholder
                  : "Search" + " " + placeholder
              }
              value={inputSelected}
              onChange={handleSearchInputChange}
              onDropdownVisibleChange={(e) => {
                !WatchListTrigger && setopen(e);
                setShowDropdown(true);
              }}
              className={`${lightMode ? "text-black" : "text-white"}`}
              style={{
                padding: "0.5rem 2.5rem",
                marginLeft: "20px",
                borderRadius: "1rem",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "12%",
                left: "9%",
                margin: "5px 10px 0 0",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-search"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
          </>
        ) : (
          <input
            type="text"
            placeholder={
              homePage
                ? "Search your favourite" + " " + placeholder
                : "Search" + " " + placeholder
            }
            value={inputSelected}
            onChange={handleSearchInputChange}
            onDropdownVisibleChange={(e) => {
              !WatchListTrigger && setopen(e);
              setShowDropdown(true);
            }}
            className={`input-padding-search ${
              lightMode ? "text-black card-shadow" : "text-white"
            } ${
              showDropdown
                ? homePage
                  ? "search-bar-new-click-dashboard"
                  : "search-bar-new-click-dashboard"
                : homePage
                  ? "search-bar-new-dashboard"
                  : "search-bar-new"
            }`}
          />
        )}
        <div
          style={{
            borderRight: showDropdown
              ? lightMode
                ? "0.5px solid #C9D7DE"
                : "0.5px solid #545E78"
              : "",
            borderLeft: showDropdown
              ? lightMode
                ? "0.5px solid #C9D7DE"
                : "0.5px solid #545E78"
              : "",
            borderBottom: showDropdown
              ? lightMode
                ? "0.5px solid #C9D7DE"
                : "0.5px solid #545E78"
              : "",
            borderTop: showDropdown
              ? lightMode
                ? "0.5px solid #C9D7DE"
                : "0.5px solid #545E78"
              : "",
            marginTop: "2px",
            // width: "auto",
          }}
          className={`br-10 ${
            lightMode
              ? "bg-light-mode-grey"
              : navigate.pathname.includes("/portal-ai")
                ? "bg-dark-portal-ai text-white"
                : "bg-dark-black"
          } ${
            bannerOffsetCalc(planData) === 1
              ? "dropdown-new-search-bar"
              : homePage
                ? "dropdown-new-search-bar-w-out-l-dashboard"
                : "dropdown-new-search-bar-w-out-l"
          } `}
        >
          {showDropdown && (
            <div
              className={`d-flex align-items-center justify-content-between br-5 p-5 mt-10 ${
                homePage ? "drop-down-search-list" : "gap-5px"
              }`}
            >
              <button
                style={{
                  color: lightMode ? "black" : "#E6E6E6",
                  backgroundColor: selectedCategory === "All" ? "#6DB8FD" : "",
                }}
                className={`d-flex w-25 fs-12 d-flex align-items-center justify-content-center fw-400 text-btn-dark  border-radius-1px-light-search ${
                  lightMode ? "" : "bg-dark-black"
                }`}
                onClick={() => handleCategoryButtonClick("All")}
              >
                All
              </button>
              <button
                style={{
                  color: lightMode ? "black" : "#E6E6E6",
                  backgroundColor:
                    selectedCategory === "Stock" ? "#6DB8FD" : "",
                }}
                className={`d-flex fs-12 d-flex align-items-center justify-content-center w-25 fw-400 border-radius-1px-light-search text-btn-dark br-5 ${
                  lightMode ? "bg-gray" : "bg-dark-black"
                }`}
                onClick={() => handleCategoryButtonClick("Stock")}
              >
                Stocks
              </button>
              <button
                style={{
                  color: lightMode ? "black" : "#E6E6E6",
                  backgroundColor:
                    selectedCategory === "Index" ? "#6DB8FD" : "",
                }}
                className={`d-flex fs-12  w-25 d-flex align-items-center justify-content-center fw-400 border-radius-1px-light-search text-btn-dark br-5 ${
                  lightMode ? "bg-gray" : "bg-dark-black"
                }`}
                onClick={() => handleCategoryButtonClick("Index")}
              >
                Indices
              </button>
              <button
                style={{
                  color: lightMode ? "black" : "#E6E6E6",
                  backgroundColor:
                    selectedCategory === "Superstars" ? "#6DB8FD" : "",
                }}
                className={`d-flex fs-12  w-25 d-flex align-items-center justify-content-center fw-400 border-radius-1px-light-search text-btn-dark br-5 ${
                  lightMode ? "bg-gray" : "bg-dark-black"
                }`}
                onClick={() => handleCategoryButtonClick("Superstars")}
              >
                Superstars
              </button>
              <button
                style={{
                  color: lightMode ? "black" : "#E6E6E6",
                  backgroundColor:
                    selectedCategory === "Buckets" ? "#6DB8FD" : "",
                }}
                className={`d-flex fs-12  w-25 fw-400 d-flex align-items-center justify-content-center border-radius-1px-light-search text-btn-dark br-5 ${
                  lightMode ? "bg-gray" : "bg-dark-black"
                }`}
                onClick={() => handleCategoryButtonClick("Buckets")}
              >
                Buckets
              </button>
            </div>
          )}
          {showDropdown && selectedCategory === "All" && (
            <div>
              {itemsToDisplay.length <= 0 ? (
                <>
                  <span className=" fs-16-12 fw-400 d-flex justify-content-center align-items-center mt-20">
                    No Results Found
                  </span>
                  <div
                    style={{
                      transform: "scale(0.5) translate(0%, 30%)",
                    }}
                  >
                    <DotLoader loaderData={loaderData} />
                  </div>
                </>
              ) : (
                <>
                  {itemsToDisplay.map((item) => (
                    <React.Fragment key={item.name}>
                      <div
                        className="pointer fs-12 fw-400 d-flex justify-content-between mt-10 pd-5-10"
                        onClick={() => {
                          setMobileSearchToggle("NONE");
                          if (item.type === "stock") {
                            navigate.push(`/stocks/${item.symbol}`);
                          } else if (item.type === "superstars") {
                            navigate.push(`/superstars/${item.slug}`);
                          } else if (item.type === "index") {
                            navigate.push(
                              `/index/[index_name]`,
                              `/index/${item.Symbol}`,
                            );
                          }
                          item.type === "buckets" && onBucketClick(item.name);
                          setShowDropdown(false);
                          setClicked(true);
                          setinputSelected("");
                          setValues(item.type);
                        }}
                      >
                        <span>
                          <span>
                            {item.type === "stock" ? item.company : item.name}
                          </span>
                          <div style={{ color: "#6DB8FD" }}>
                            {item.type === "stock" ? item.symbol : item.Symbol}
                          </div>
                        </span>
                        <span>
                          {item.type.slice(0, 1).toUpperCase() +
                            item.type.slice(1)}
                        </span>
                      </div>
                      <hr
                        style={{
                          borderColor: lightMode ? "#E2E5E7" : "#545E78",
                          opacity: "0.7",
                        }}
                      />
                    </React.Fragment>
                  ))}{" "}
                </>
              )}
            </div>
          )}

          {showDropdown && selectedCategory === "Stock" && (
            <div>
              {apiData.length <= 0 ? (
                <>
                  <span className=" fs-16-12 fw-400 d-flex justify-content-center align-items-center mt-20">
                    No Results Found
                  </span>
                  <div
                    style={{
                      transform: "scale(0.5) translate(0%, 30%)",
                    }}
                  >
                    <DotLoader loaderData={loaderData} />
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  {apiData?.map((item) => (
                    <React.Fragment key={item.symbol}>
                      <div
                        className="pd-5-10 fs-12 fw-400 d-flex justify-content-between pointer mt-10"
                        onClick={() => {
                          navigate.push(`/stocks/${item.symbol}`);
                          setinputSelected("");
                          setClicked(true);
                          setShowDropdown(false);
                          setValues(item);
                          setMobileSearchToggle("NONE");
                        }}
                      >
                        <span>
                          <span>{item.company}</span>
                          <div style={{ color: "#6DB8FD" }}>{item.symbol}</div>
                        </span>
                        <span>
                          {item.type.charAt(0).toUpperCase() +
                            item.type.slice(1)}
                        </span>
                      </div>
                      <hr
                        style={{
                          borderColor: lightMode ? "#E2E5E7" : "#545E78",
                          opacity: "0.7",
                        }}
                      />
                    </React.Fragment>
                  ))}
                </>
              )}
            </div>
          )}

          {showDropdown && selectedCategory === "Superstars" && (
            <div>
              {superstar.length <= 0 ? (
                <>
                  <span className=" fs-16-12 fw-400 d-flex justify-content-center align-items-center mt-20">
                    No Results Found
                  </span>
                  <div
                    style={{
                      transform: "scale(0.5) translate(0%, 30%)",
                    }}
                  >
                    <DotLoader loaderData={loaderData} />
                  </div>
                </>
              ) : (
                <>
                  {superstar.map((item) => (
                    <React.Fragment key={item.slug}>
                      <div
                        className="pd-5-10 fs-12 fw-400 pointer d-flex justify-content-between mt-10"
                        onClick={() => {
                          setShowDropdown(false);
                          setClicked(true);
                          navigate.push(`/superstars/${item.slug}`);
                          setinputSelected("");
                          setValues(item);
                          setMobileSearchToggle("NONE");
                        }}
                      >
                        <span>{item.name}</span>
                        <span>
                          {item.type.charAt(0).toUpperCase() +
                            item.type.slice(1)}
                        </span>
                      </div>
                      <hr
                        style={{
                          borderColor: lightMode ? "#E2E5E7" : "#545E78",
                          opacity: 0.7,
                        }}
                      />
                    </React.Fragment>
                  ))}
                </>
              )}
            </div>
          )}
          {showDropdown && selectedCategory === "Buckets" && (
            <div>
              {buckets.length <= 0 ? (
                <>
                  <span className=" fs-16-12 fw-400 d-flex justify-content-center align-items-center mt-20">
                    No Results Found
                  </span>
                  <div
                    style={{
                      transform: "scale(0.5) translate(0%, 30%)",
                    }}
                  >
                    <DotLoader loaderData={loaderData} />
                  </div>
                </>
              ) : (
                <>
                  {buckets?.map((item) => (
                    <>
                      <div
                        key={item.slug}
                        className="pd-5-10 pointer fs-12 fw-400 d-flex justify-content-between mt-10"
                        onClick={() => {
                          onBucketClick(item.name);
                          setShowDropdown(false);
                          setinputSelected("");
                          setClicked(true);
                          setValues(item);
                          setMobileSearchToggle("NONE");
                        }}
                      >
                        <div className="d-flex justify-content-center align-items-center">
                          <span>{item.name}</span>
                        </div>
                        <span>
                          {item.type.slice(0, 1).toUpperCase() +
                            item.type.slice(1)}
                        </span>
                      </div>
                      <hr
                        style={{
                          borderColor: lightMode ? "#E2E5E7" : "#545E78",
                          opacity: "0.7",
                        }}
                      />
                    </>
                  ))}
                </>
              )}
            </div>
          )}
          {showDropdown && selectedCategory === "Index" && (
            <div>
              {index.length <= 0 ? (
                <>
                  <span className=" fs-16-12 fw-400 d-flex justify-content-center align-items-center mt-20">
                    No Results Found
                  </span>
                  <div
                    style={{
                      transform: "scale(0.5) translate(0%, 30%)",
                    }}
                  >
                    <DotLoader loaderData={loaderData} />
                  </div>
                </>
              ) : (
                <>
                  {index?.map((item) => (
                    <>
                      <div
                        key={item.value}
                        className="pd-5-10 pointer fs-12 fw-400 d-flex justify-content-between mt-10"
                        onClick={() => {
                          navigate.push(
                            `/index/[index_name]`,
                            `/index/${item.Symbol}`,
                          );
                          setShowDropdown(false);
                          setClicked(true);
                          setinputSelected("");
                          setValues(item);
                          setMobileSearchToggle("NONE");
                        }}
                      >
                        <span>
                          <span>{item.name}</span>
                          <div className="" style={{ color: "#6DB8FD" }}>
                            {item.Symbol}
                          </div>
                        </span>
                        <span>
                          {item.type.slice(0, 1).toUpperCase() +
                            item.type.slice(1)}
                        </span>
                      </div>
                      <hr
                        style={{
                          borderColor: lightMode ? "#E2E5E7" : "#545E78",
                          opacity: "0.7",
                        }}
                      />
                    </>
                  ))}{" "}
                </>
              )}
            </div>
          )}
        </div>
      </div>
      {/* <PremiumRedirectModal
        visible={premiumModal}
        setVisible={setpremiumModal}
      /> */}

      <PremiumTrialModal visible={premiumModal} setVisible={setpremiumModal} />
    </div>
  );
}

export default SearchComponent;
