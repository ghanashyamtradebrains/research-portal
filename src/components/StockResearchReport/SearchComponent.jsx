import React, { useEffect, useMemo, useState } from "react";
import CustomTooltip from "../ant/CustomTooltip";
import { AutoComplete, Select } from "antd";
import svgSheet from "../../assets/svg/svgSheet";
import styles from "./report.module.css";
import useWindowWidth from "../../utilityFn/getWindowWidth";
import { useSelector } from "react-redux";
import { authStore } from "../../redux/reducers/authSlice";
import { getAllStockSectorList } from "../../pages/api/fetchClient";

const SearchComponent = ({
  setSearchInput,
  setSortState,
  setDate,
  searchInput,
  lightMode,
  setSortRole,
  setMcap,
  setSector,
}) => {
  const windowWidth = useWindowWidth();
  const UserAuth = useSelector(authStore);
  const isPremium = UserAuth?.userData?.user?.is_premium;
  const [isFocused, setIsFocused] = useState(false);

  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const response = await getAllStockSectorList();
        setSectors(response.data);
      } catch (error) {
        console.error("Error fetching sectors:", error);
      }
    };

    fetchSectors();
  }, []);

  const items = (
    <p>
      Investments in securities are subject to market risks. Read all the
      related documents carefully before investing." Receiving registration from
      SEBI and certification from NISM does not assure the performance of the
      intermediary or guarantee returns to investors in any manner.Compliance
      Email:{" "}
      <a
        href="https://portal.tradebrains.in/"
        className="warning-color"
        target="_blank"
      >
        compliance@tradebrains.in
      </a>{" "}
    </p>
  );

  const inputStyle = {
    width: "100%",
    minWidth: windowWidth < 768 ? "100%" : "250px",
    height: "40px",
    backgroundColor: lightMode ? "white" : "#131315",
    borderRadius: "5px",
    padding: "4px 0",
    color: lightMode ? "black" : "white",
  };

  const marketCapOptions = [
    { key: "large_cap", value: "Large Cap", label: "Large Cap" },
    { key: "mid_cap", value: "Mid Cap", label: "Mid Cap" },
    { key: "small_cap", value: "Small Cap", label: "Small Cap" },
    { key: "micro_cap", value: "Micro Cap", label: "Micro Cap" },
  ];

  const handleMcapClick = (label) => {
    setMcap(label);
  };

  const handleSectorClick = (id) => {
    setSector(id);
  };

  return (
    <div
      className={styles.header_section}
      style={{
        backgroundColor: lightMode ? "#F2F6F8" : "#1f1f1f",
      }}
    >
      <div className={styles.input_section}>
        <div className={styles.search_filter}>
          <div className={styles.search_input_box}>
            <AutoComplete
              style={inputStyle}
              className={
                lightMode ? "search" : "search antd-Selete-Custom-dark"
              }
              placeholder="Search by Stock name"
              value={searchInput}
              onChange={(e) => setSearchInput(e)}
              defaultActiveFirstOption={true}
              disabled={
                UserAuth?.userData?.user?.plan?.planId?.includes("_plus")
                  ? false
                  : true
              }
              allowClear
            />
            <div
              className={styles.search_btn}
              style={{
                display: searchInput ? "none" : "block",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-search"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
          </div>
          <Select
            className={`${styles.recent_btn} cross-btn-visible ${
              lightMode ? "search" : "search antd-Selete-Custom-dark "
            }`}
            disabled={
              UserAuth?.userData?.user?.plan?.planId?.includes("_plus")
                ? false
                : true
            }
            style={{
              backgroundColor: lightMode ? "white" : "#131315",
            }}
            dropdownClassName={`${!lightMode && "drop-down-stock invert-text"}`}
            placeholder={
              <div className="d-flex align-items-center">
                <span className="d-flex justify-content-center align-items-center mr-10">
                  {lightMode ? (
                    <span>{svgSheet.sortIconBlack}</span>
                  ) : (
                    <span>{svgSheet.sortIcon}</span>
                  )}
                </span>
                <span className={lightMode ? "text-black" : "text-white"}>
                  Market Cap
                </span>
              </div>
            }
            onChange={handleMcapClick}
            allowClear
          >
            {marketCapOptions.map(({ key, value, label }) => (
              <Select.Option key={key} value={value}>
                <span
                  style={{ color: lightMode ? "black" : "white" }}
                  // onClick={() => handleMcapClick(label)}
                >
                  {label}
                </span>
              </Select.Option>
            ))}
          </Select>
          <Select
            className={`${styles.sector_btn} cross-btn-visible ${
              lightMode ? "search" : "search antd-Selete-Custom-dark "
            }`}
            disabled={
              UserAuth?.userData?.user?.plan?.planId?.includes("_plus")
                ? false
                : true
            }
            style={{
              backgroundColor: lightMode ? "white" : "#131315",
            }}
            dropdownClassName={`${!lightMode && "drop-down-stock invert-text"}`}
            placeholder={
              <div className="d-flex align-items-center">
                {!isFocused && (
                  <span className="d-flex justify-content-center align-items-center mr-10">
                    <span>
                      {lightMode ? svgSheet.sortIconBlack : svgSheet.sortIcon}
                    </span>
                  </span>
                )}

                <span
                  style={{
                    color: isFocused ? "gray" : lightMode ? "black" : "white",
                  }}
                >
                  {isFocused ? "Search Sector..." : "Sector"}
                </span>
              </div>
            }
            showSearch
            optionFilterProp="children"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            filterOption={(input, option) =>
              option.label?.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={handleSectorClick}
            allowClear
          >
            {sectors?.map((item) => {
              return (
                <Select.Option
                  key={item.sect_code}
                  value={item.sect_code}
                  label={item.sect_name}
                  className="text-capitalize"
                >
                  <span style={{ color: lightMode ? "black" : "white" }}>
                    {item.sect_name}
                  </span>
                </Select.Option>
              );
            })}
          </Select>
        </div>
        <div className={styles.search_filter}>
          <Select
            className={`${styles.recent_btn2} ${
              lightMode ? "search" : "search antd-Selete-Custom-dark "
            }`}
            disabled={
              UserAuth?.userData?.user?.plan?.planId?.includes("_plus")
                ? false
                : true
            }
            style={{
              backgroundColor: lightMode ? "white" : "#131315",
            }}
            dropdownClassName={`${!lightMode && "drop-down-stock invert-text"}`}
            placeholder={
              <div className="d-flex align-items-center">
                <span className="d-flex justify-content-center align-items-center mr-10">
                  {lightMode ? (
                    <span>{svgSheet.sortIconBlack}</span>
                  ) : (
                    <span>{svgSheet.sortIcon}</span>
                  )}
                </span>
                <span className={lightMode ? "text-black" : "text-white"}>
                  Recent
                </span>
              </div>
            }
            onSelect={(value, option) => {
              if (value === "newest") {
                setSortState(() => {
                  return {
                    head: "date",
                    sortOrder: false,
                  };
                });
                setDate("date");
              } else if (value === "oldest") {
                setSortState(() => {
                  return {
                    head: "date",
                    sortOrder: true,
                  };
                });
                setDate("date");
              } else if (value === "buy") {
                setSortRole("buy");
              } else if (value === "sell") {
                setSortRole("sell");
              } else if (value === "hold") {
                setSortRole("hold");
              } else if (value === "recent") {
                setSortRole(null);
                setSortState(() => {
                  return {
                    head: null,
                    sortOrder: false,
                  };
                });
              }
            }}
          >
            <Select.Option key="recent" value="recent">
              <span style={{ color: lightMode ? "black" : "white" }}>
                Recent
              </span>
            </Select.Option>
            <Select.Option key="newest" value="newest">
              <span style={{ color: lightMode ? "black" : "white" }}>
                Newest - Oldest
              </span>
            </Select.Option>
            <Select.Option key="oldest" value="oldest">
              <span style={{ color: lightMode ? "black" : "white" }}>
                Oldest - Newest
              </span>
            </Select.Option>
            <Select.Option key="buy" value="buy">
              <span style={{ color: lightMode ? "black" : "white" }}>Buy</span>
            </Select.Option>
            <Select.Option key="sell" value="sell">
              <span style={{ color: lightMode ? "black" : "white" }}>Sell</span>
            </Select.Option>
            <Select.Option key="hold" value="hold">
              <span style={{ color: lightMode ? "black" : "white" }}>Hold</span>
            </Select.Option>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
