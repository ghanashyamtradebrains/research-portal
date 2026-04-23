import { Menu, Popover } from "antd";

import { getThemeMode } from "../../redux/reducers/ThemeSlice";
import { useSelector } from "react-redux";

import Link from "next/link";
import { CaretDownOutlined } from "@ant-design/icons";

import { AllStockMenu } from "./Menu/AllStockMenu";
import { TopGainLossMenu } from "./Menu/TopgainLossMenu";
import { MarketNewsMenu } from "./Menu/MarketNewsMenu";
import { HeatmapMenu } from "./Menu/HeatmapMenu";
import { CorporateMenu } from "./Menu/CorporateMenu";
import { SuperstarMenu } from "./Menu/SuperstarMenu";
import { BucketMenu } from "./Menu/BucketMenu";
import { MoreMenu } from "./Menu/MoreMenu";
import { useState } from "react";
import { IPOMenu } from "./Menu/IPOMenu";
import styles from "./navbar.module.css";

export const NavBarmenu = ({ setMobileToggle }) => {
  const { lightMode } = useSelector(getThemeMode);

  return (
    <div
      className={`h-45 px-15 gap-15px p-50-0 d-flex align-items-center w-100 relative ${styles.only_PC_view}  `}
    >
      <ul className="flex justify-content-between ff-poppins fw-500 list-style-none w-100">
        <li
          className={`${
            lightMode ? " menu-item-name-light" : " menu-item-name-dark"
          } d-flex align-items-center h-45 px-15`}
        >
          <Popover
            placement="bottom"
            content={
              <AllStockMenu
                sector={true}
                industry={true}
                setMobileToggle={setMobileToggle}
              />
            }
            title=""
            overlayStyle={{ width: "550px" }}
            overlayClassName="menu-items-overlay-wrap all-stock-menu"
            className={`pointer link-hover-color-underline    `}
            trigger="hover"
          >
            <Link href={"/stock/sector/banks"} className={styles.font_size}>
              All Stocks
            </Link>
          </Popover>
        </li>
        <li
          className={`${
            lightMode ? " menu-item-name-light" : " menu-item-name-dark"
          } d-flex align-items-center h-45 px-15`}
        >
          <Popover
            placement="bottom"
            content={
              <TopGainLossMenu
                gainer={true}
                loser={true}
                other={true}
                setMobileToggle={setMobileToggle}
              />
            }
            title=""
            overlayStyle={{ width: "650px" }}
            overlayClassName="menu-items-overlay-wrap all-stock-menu"
            className={`pointer link-hover-color-underline    `}
            trigger="hover"
          >
            {/* <Link href={"/marketstats/gainers/NIFTY"}>Top Gainers /</Link>
            <Link href={"/marketstats/losers/NIFTY"}>Losers</Link> */}
            <Link
              href={"/marketstats/trending-stocks"}
              className={styles.font_size}
            >
              Trending Stocks
            </Link>
          </Popover>
        </li>
        <li
          className={`${
            lightMode ? " menu-item-name-light" : " menu-item-name-dark"
          } d-flex align-items-center h-45 px-15`}
        >
          <Popover
            placement="bottom"
            content={<MarketNewsMenu setMobileToggle={setMobileToggle} />}
            title=""
            overlayStyle={{ width: "370px" }}
            overlayClassName="menu-items-overlay-wrap"
            className={`pointer link-hover-color-underline    `}
            trigger="hover"
          >
            <Link href={"/news"} className={styles.font_size}>
              Market News
            </Link>
          </Popover>
        </li>
        <li
          className={`${
            lightMode ? " menu-item-name-light" : " menu-item-name-dark"
          } d-flex align-items-center h-45 px-15`}
        >
          <Popover
            placement="bottom"
            content={
              <HeatmapMenu
                sector={true}
                buckets={true}
                other={true}
                industry={true}
                index={true}
                setMobileToggle={setMobileToggle}
              />
            }
            title=""
            overlayStyle={{ width: "1080px" }}
            overlayClassName="menu-items-overlay-wrap"
            className={`pointer link-hover-color-underline    `}
            trigger="hover"
          >
            <Link href={"/index/NIFTY/heatmap"} className={styles.font_size}>
              Heat Map
            </Link>
          </Popover>
        </li>
        <li
          className={`${
            lightMode ? " menu-item-name-light" : " menu-item-name-dark"
          } d-flex align-items-center h-45 px-15`}
        >
          <Popover
            placement="bottom"
            content={<CorporateMenu setMobileToggle={setMobileToggle} />}
            title=""
            overlayStyle={{ width: "380px" }}
            overlayClassName="menu-items-overlay-wrap"
            className={`pointer link-hover-color-underline`}
            trigger="hover"
          >
            <Link
              href={"/corporateactions/Dividends"}
              className={styles.font_size}
            >
              Corporate Actions
            </Link>
          </Popover>
        </li>
        <li
          className={`${
            lightMode ? " menu-item-name-light" : " menu-item-name-dark"
          } d-flex align-items-center h-45 px-15`}
        >
          <Popover
            placement="bottom"
            content={<SuperstarMenu setMobileToggle={setMobileToggle} />}
            title=""
            overlayStyle={{ width: "300px" }}
            overlayClassName="menu-items-overlay-wrap"
            className={`pointer link-hover-color-underline    `}
            trigger="hover"
          >
            <Link href={"/superstars"} className={styles.font_size}>
              Superstar Portfolio
            </Link>
          </Popover>
        </li>
        <li
          className={`${
            lightMode ? " menu-item-name-light" : " menu-item-name-dark"
          } d-flex align-items-center h-45 px-15`}
        >
          {/* <Popover
            placement="bottom"
            content={<BucketMenu setMobileToggle={setMobileToggle} />}
            title=""
            overlayStyle={{ width: "650px" }}
            overlayClassName="menu-items-overlay-wrap"
            className={`pointer link-hover-color-underline`}
            trigger="hover"
          > */}
          <Link href={"/watchlist"} className={styles.font_size}>
            Watchlist
          </Link>
          {/* </Popover> */}
        </li>
        <li
          className={`${
            lightMode ? " menu-item-name-light" : " menu-item-name-dark"
          } d-flex align-items-center h-45 px-15`}
        >
          <Popover
            placement="bottom"
            content={<IPOMenu setMobileToggle={setMobileToggle} />}
            title=""
            overlayStyle={{ width: "380px" }}
            overlayClassName="menu-items-overlay-wrap"
            className={`pointer link-hover-color-underline`}
            trigger="hover"
          >
            <Link href={"/ipo"} className={styles.font_size}>
              IPOs
            </Link>
          </Popover>
        </li>
        <li
          className={`${
            lightMode ? " menu-item-name-light" : " menu-item-name-dark"
          } d-flex align-items-center h-45 px-15`}
        >
          <Popover
            placement="bottom"
            content={<MoreMenu setMobileToggle={setMobileToggle} />}
            title=""
            overlayStyle={{ width: "250px" }}
            overlayClassName="menu-items-overlay-wrap more-menu"
            className={`pointer link-hover-color-underline`}
            trigger="hover"
          >
            <span className={styles.font_size}>
              More &nbsp; <CaretDownOutlined color="clr-green" />
            </span>
          </Popover>
        </li>
      </ul>
    </div>
  );
};
