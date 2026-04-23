import React, { useEffect, useState } from "react";
import { AutoComplete, Select } from "antd";
import svgSheet from "../../../assets/svg/svgSheet";
import styles from "./report-card.module.css";
import useWindowWidth from "../../../utilityFn/getWindowWidth";
import { useSelector } from "react-redux";
import { authStore } from "../../../redux/reducers/authSlice";
import { CalendarOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const SearchFilter = ({
  setSearchInput,
  setSortState,
  setDate,
  searchInput,
  lightMode,
  setSortRole,
  setYear,
  years,
}) => {
  // const windowWidth = useWindowWidth();
  const UserAuth = useSelector(authStore);
  const router = useRouter();
  let type = router.query.category;
  const [windowWidth, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);
    updateWidth(); // set initial width

    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const inputStyle = {
    width:
      windowWidth < 600
        ? `${windowWidth - 40}px`
        : windowWidth < 768
          ? "220px"
          : windowWidth < 1024
            ? "250px"
            : "280px", // for screens wider than 768px
    height: "40px",
    backgroundColor: lightMode ? "white" : "#131315",
    borderRadius: "5px",
    padding: "4px 0",
  };

  const isDark = !lightMode;
  const isDisabled =
    !UserAuth?.userData?.user?.plan?.planId?.includes("_plus") &&
    !["Whales", "Unlimited"].includes(UserAuth?.userData?.user?.plan?.sname) &&
    router?.query?.category !== "technicals-reports";

  const commonSelectProps = {
    className: `${styles.recent_btn} ${
      lightMode ? "search" : "search antd-Selete-Custom-dark"
    }`,
    disabled: isDisabled,
    style: {
      backgroundColor: lightMode ? "white" : "#131315",
    },
    dropdownClassName: isDark ? "drop-down-stock invert-text" : "",
  };

  const handleSortSelect = (value) => {
    const sortMap = {
      newest: { sort: false, date: "date" },
      oldest: { sort: true, date: "date" },
      AtoZ: { sort: false, date: "name" },
      ZtoA: { sort: true, date: "name" },
    };
    const selected = sortMap[value];
    if (selected) {
      setSortState(selected.sort);
      setDate(selected.date);
    }
  };

  return (
    <div className={styles.input_section}>
      <div
        style={{
          position: "relative",
        }}
        className="flex justify-content-end"
      >
        <AutoComplete
          style={inputStyle}
          className={lightMode ? "search" : "search antd-Selete-Custom-dark "}
          placeholder="Search by Stock name"
          value={searchInput}
          onChange={(e) => setSearchInput(e)}
          defaultActiveFirstOption={true}
        />
        <div className={styles.search_btn}>
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          width: windowWidth < 600 && "100%",
        }}
      >
        {type !== "technicals-reports" && (
          <Select
            {...commonSelectProps}
            placeholder={
              <div className="d-flex gap-10px align-items-center">
                <CalendarOutlined />
                <span className={lightMode ? "text-black" : "text-white"}>
                  2025
                </span>
              </div>
            }
            style={{
              backgroundColor: lightMode ? "white" : "#131315",
              width: windowWidth < 600 ? windowWidth / 2 - 24 : "120px",
            }}
            onSelect={(value) => setYear(value)}
            defaultValue={2025}
          >
            {years?.map((year) => (
              <Select.Option key={year} value={year}>
                <span style={{ color: lightMode ? "black" : "white" }}>
                  {year}
                </span>
              </Select.Option>
            ))}
          </Select>
        )}

        <Select
          {...commonSelectProps}
          placeholder={
            <div className="d-flex align-items-center">
              <span className="d-flex justify-content-center align-items-center mr-10">
                {lightMode ? svgSheet.sortIconBlack : svgSheet.sortIcon}
              </span>
              <span className={lightMode ? "text-black" : "text-white"}>
                Newest - Oldest
              </span>
            </div>
          }
          style={{
            backgroundColor: lightMode ? "white" : "#131315",
            width: windowWidth < 600 ? windowWidth / 2 - 24 : "200px",
          }}
          onSelect={handleSortSelect}
        >
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
          {type !== "technicals-reports" && (
            <Select.Option key="AtoZ" value="AtoZ">
              <span style={{ color: lightMode ? "black" : "white" }}>
                A to Z
              </span>
            </Select.Option>
          )}
          {type !== "technicals-reports" && (
            <Select.Option key="ZtoA" value="ZtoA">
              <span style={{ color: lightMode ? "black" : "white" }}>
                Z to A
              </span>
            </Select.Option>
          )}
        </Select>
      </div>
    </div>
  );
};

export default SearchFilter;
