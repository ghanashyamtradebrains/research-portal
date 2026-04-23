import React, { useState } from "react";
import Link from "next/link";
import SortHeader from "./screener/table section/SortHeader";
import CustomTable from "./CustomTable";
import commaWithNumber from "../utilityFn/commaWithNumber";
import { redGreenColorPicker } from "../utilityFn/redGreenColor";
import useWindowWidth from "../utilityFn/getWindowWidth";
import TableLoader from "./spinners/TableLoader";

function TrendingTable({
  lightMode,
  trendingdata = {},
  highdata = [],
  lowdata = [],
  isLoading,
}) {
  const [sortState, setsortState] = useState({
    head: "change",
    sortOrder: false,
  });
  const windowWidth = useWindowWidth();
  const renderCell = (text, lightMode = true, extraStyle = {}) => ({
    props: {
      style: {
        background: extraStyle.background
          ? extraStyle.background
          : lightMode
          ? "#F2F6F8"
          : "#292e3F",
        // borderRight: `1px solid ${lightMode ? "#C9D7DE" : "#545E78"}`,
        borderBottom: "none",
        ...extraStyle,
      },
    },
    children: (
      <span
        className={`ff-lato fs-14-12 d-flex justify-content-start align-items-center`}
        style={{
          fontSize: "14px",
          fontWeight: "400",
          color: extraStyle.color
            ? extraStyle.color
            : lightMode
            ? "black"
            : "white",
        }}
      >
        {text}
      </span>
    ),
  });

  const getTableHeaders = (type, sortState, setsortState, lightMode) => {
    const commonHeaders = [
      {
        title: (
          <span className="fs-s-14 d-flex align-items-center justify-content-start fw-400">
            Company Name
          </span>
        ),
        dataIndex: "comp_name",
        fixed: "left",
        width: windowWidth < 600 ? "100px" : "70px",
        render: (text, record) => {
          const name = record?.comp_name || record?.name;
          return {
            props: {
              style: {
                background: lightMode ? "#ffff" : "#212639",
                color: lightMode ? "black" : "white",
                borderLeft: lightMode
                  ? "1px solid #C9D7DE"
                  : "1px solid #545E78",
                borderRight: lightMode
                  ? "1px solid #C9D7DE"
                  : "1px solid #545E78",
                borderBottom: "none",
              },
            },
            children: (
              <div
                className="pointer"
                onClick={() =>
                  window.open(`/stocks/${record?.symbol}`, "_blank")
                }
              >
                {name}
              </div>
            ),
          };
        },
      },
      {
        title: (
          <span className="fs-s-14 d-flex align-items-center justify-content-start fw-400">
            CMP
          </span>
        ),
        dataIndex: "close",
        width: windowWidth < 600 ? "100px" : "70px",
        render: (text, record) => {
          const value = record?.close || record?.cmp;
          return {
            props: {
              style: {
                background: lightMode ? "#F2F6F8 " : "#292e3F",
                // borderRight: lightMode
                //   ? "1px solid #C9D7DE"
                //   : "1px solid #545E78",
                // borderLeft: lightMode
                //   ? "1px solid #C9D7DE"
                //   : "1px solid #545E78",
                borderBottom: "none",
              },
            },
            children: (
              <div
                style={{ gap: "5px" }}
                className="d-flex align-items-center justify-content-start fs-14-12"
              >
                <span
                  className="ff-lato"
                  style={{
                    fontWeight: "400",
                    color: lightMode ? "black" : "white",
                  }}
                >
                  ₹ {commaWithNumber(value)}
                </span>
                <span
                  className="ff-lato fs-12-10"
                  style={{
                    fontWeight: "400",
                    color: redGreenColorPicker(
                      record?.percent || record?.change,
                      lightMode
                    ),
                  }}
                >
                  ( {(record.percent || record?.change)?.toFixed(2)} %)
                </span>
              </div>
            ),
          };
        },
      },
    ];

    // Define headers specific to each type of table
    const specificHeaders = {
      "52 Week High": [
        {
          title: (
            <span className="fs-s-14 d-flex align-items-center justify-content-start fw-400">
              Today's High
            </span>
          ),
          dataIndex: "high_52week",
          width: "70px",
          render: (text) => renderCell("₹" + commaWithNumber(text), lightMode),
        },
      ],
      "52 Week Low": [
        {
          title: (
            <span className="fs-s-14 d-flex align-items-center justify-content-start fw-400">
              Today's Low
            </span>
          ),
          dataIndex: "low_52week",
          width: "70px",
          render: (text) => renderCell("₹" + commaWithNumber(text), lightMode),
        },
      ],
      "Most Traded Stocks": [
        {
          title: (
            <span className="fs-s-14 d-flex align-items-center justify-content-start fw-400">
              Volume
            </span>
          ),
          dataIndex: "volume",
          width: "70px",
          render: (text) => renderCell(commaWithNumber(text), lightMode),
        },
      ],
      "Top Gainers": [
        {
          title: (
            <span className="fs-s-14 d-flex align-items-center justify-content-start fw-400">
              Volume
            </span>
          ),
          dataIndex: "volume",
          width: "70px",
          render: (text) => renderCell(commaWithNumber(text), lightMode),
        },
      ],
      "Top Losers": [
        {
          title: (
            <span className="fs-s-14 d-flex align-items-center justify-content-start fw-400">
              Volume
            </span>
          ),
          dataIndex: "volume",
          width: "70px",
          render: (text) => renderCell(commaWithNumber(text), lightMode),
        },
      ],
    };

    const commonHeaders2 = [
      {
        title: <p className="fs-s-14 fw-600 fw-400 mb-0">Key Metrics</p>,
        dataIndex: "per_stake",
        width: "40px",
        children: [
          {
            title: (
              <span className="fs-s-14 d-flex align-items-center justify-content-start fw-400">
                MCAP (Cr)
              </span>
            ),
            dataIndex: "mcap",
            width: "50px",
            render: (text) =>
              renderCell(text ? "₹" + commaWithNumber(text) : "NA", lightMode),
          },
          {
            title: (
              <span className="fs-s-14 d-flex align-items-center justify-content-start fw-400">
                PE (TTM)
              </span>
            ),
            dataIndex: "pe",
            width: "50px",
            render: (text) =>
              renderCell(text ? text?.toFixed(2) : "NA", lightMode),
          },
          {
            title: (
              <span className="fs-s-14 d-flex align-items-center justify-content-start fw-400">
                ROE (TTM)
              </span>
            ),
            dataIndex: "roe_ttm",
            width: "50px",
            render: (text) =>
              renderCell(text ? text?.toFixed(2) + "%" : "NA", lightMode),
          },
          {
            title: (
              <span className="fs-s-14 d-flex align-items-center justify-content-start fw-400">
                ROCE (TTM)
              </span>
            ),
            dataIndex: "roce_ttm",
            width: "50px",
            render: (text) =>
              renderCell(text ? text?.toFixed(2) + "%" : "NA", lightMode),
          },
        ],
      },
    ];

    return [
      ...commonHeaders,
      ...(specificHeaders[type] || []),
      ...commonHeaders2,
    ];
  };

  const tableConfigs = [
    { title: "Top Gainers", data: trendingdata.gainers || [] },
    { title: "Top Losers", data: trendingdata.losers || [] },
    { title: "Most Traded Stocks", data: trendingdata.volume_movers || [] },
    { title: "52 Week High", data: highdata?.slice(0, 5) || [] },
    { title: "52 Week Low", data: lowdata?.slice(0, 5) || [] },
  ];

  return (
    <>
      {tableConfigs.map((config) => (
        <div
          key={config.title}
          style={{
            paddingTop: config.title !== "Most Traded Stocks" && "20px",
          }}
          className={` ${
            lightMode ? "custom-antd-head-light" : "custom-antd-head-dark"
          }`}
        >
          <div className="d-flex justify-content-between align-items-center p-10">
            <h2 className="fs-s-16 d-flex justify-content-start align-items-center fw-700 ">
              {config.title}
            </h2>
            {config.title !== "Most Traded Stocks" && (
              <Link
                href={`${
                  config.title === "52 Week High"
                    ? "/marketstats/52week-high"
                    : config.title === "52 Week Low"
                    ? "/marketstats/52week-low"
                    : config.title === "Top Gainers"
                    ? "/marketstats/gainers/NIFTY"
                    : "/marketstats/losers/NIFTY"
                }`}
                className="underline"
                target="_blank"
              >
                View All
              </Link>
            )}
          </div>
          {isLoading ? (
            <TableLoader />
          ) : (
            <div
              style={{
                borderRight: `1px solid ${lightMode ? "#C9D7DE" : "#545E78"}`,
                borderStartEndRadius: "10px ",
                borderBottom: `1px solid ${lightMode ? "#C9D7DE" : "#545E78"}`,
              }}
            >
              <div className="trending-table-to-remove">
                <CustomTable
                  // loading={isLoading}
                  columns={getTableHeaders(
                    config.title,
                    sortState,
                    setsortState,
                    lightMode
                  )}
                  data={config.data}
                  scrollable={true}
                  scrollLimit={700}
                />
              </div>{" "}
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default TrendingTable;
