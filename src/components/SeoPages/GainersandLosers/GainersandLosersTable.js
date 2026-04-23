import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getThemeMode } from "../../../redux/reducers/ThemeSlice";
import CustomTable from "../../CustomTable";
import numberWithCommas from "../../../utilityFn/numberWithCommas";
import { redGreenColorPicker } from "../../../utilityFn/redGreenColor";
import Link from "next/link";
import SortHeader from "../../screener/table section/SortHeader";

function GainersandLosersTable({
  activeDuration,
  isLoading,
  data,
  sortState,
  setsortState,
}) {
  const { lightMode } = useSelector(getThemeMode);

  const tableContent = [
    {
      title: (
        <SortHeader
          label="Company Name"
          header="comp_name"
          sortState={sortState}
          setsortState={setsortState}
        />
      ),
      dataIndex: "comp_name",
      fixed: "left",
      width: "35px",
      render(text, record) {
        return {
          props: {
            style: {
              background: lightMode ? "#F2F6F8 " : "#3B3F4F",
              borderRight: lightMode
                ? "1px solid #C9D7DE"
                : "1px solid #545E78",
              borderLeft: lightMode ? "1px solid #C9D7DE" : "1px solid #545E78",
              borderBottom: "none",
            },
          },
          children: (
            <div
              className="fs-s-14 link-hover-underline ff-poppins"
              style={{ color: lightMode ? "black" : "white" }}
            >
              <Link href={`/stocks/${record?.symbol}`}>{text}</Link>
            </div>
          ),
        };
      },
    },
    {
      title: (
        <SortHeader
          label="CMP"
          header="curr_price"
          sortState={sortState}
          setsortState={setsortState}
        />
      ),

      dataIndex: "curr_price",
      width: "30px",
      render(text, record) {
        // const formatedCMP = (text / 10 ** 7)?.toFixed(2);
        return {
          props: {
            style: {
              background: lightMode ? "#F2F6F8 " : "#3B3F4F",
              borderRight: lightMode
                ? "1px solid #C9D7DE"
                : "1px solid #545E78",
              borderLeft: lightMode ? "1px solid #C9D7DE" : "1px solid #545E78",
              borderBottom: "none",
            },
          },
          children: (
            <span
              className="ff-lato"
              style={{
                fontSize: "14px",
                fontWeight: "400",
                color: lightMode ? "black" : "white",
              }}
            >
              ₹ {numberWithCommas(text)}
            </span>
          ),
        };
      },
    },
    {
      title: (
        <SortHeader
          label="Prev Close"
          header="prev_close"
          sortState={sortState}
          setsortState={setsortState}
        />
      ),
      dataIndex: "prev_close",
      width: "30px",
      render: (text, record) => {
        return {
          props: {
            style: {
              background: lightMode ? "#F2F6F8 " : "#3B3F4F",
              borderRight: lightMode
                ? "1px solid #C9D7DE"
                : "1px solid #545E78",
              borderLeft: lightMode ? "1px solid #C9D7DE" : "1px solid #545E78",
              borderBottom: "none",
            },
          },
          children: (
            <span
              className="ff-lato"
              style={{
                fontSize: "14px",
                fontWeight: "400",
                color: lightMode ? "black" : "white",
              }}
            >
              ₹ {numberWithCommas(text)}
            </span>
          ),
        };
      },
    },
    {
      title: (
        <SortHeader
          label={`${activeDuration === "5D" ? "5D Chg" : "1M Chg"}`}
          header="change"
          sortState={sortState}
          setsortState={setsortState}
        />
      ),

      dataIndex: "change",
      width: "30px",
      render: (text, record) => {
        return {
          props: {
            style: {
              background: lightMode ? "#F2F6F8 " : "#3B3F4F",
              borderRight: lightMode
                ? "1px solid #C9D7DE"
                : "1px solid #545E78",
              borderLeft: lightMode ? "1px solid #C9D7DE" : "1px solid #545E78",
              borderBottom: "none",
            },
          },
          children: (
            <span
              className="ff-lato"
              style={{
                fontSize: "14px",
                fontWeight: "400",
                color: redGreenColorPicker(text, lightMode),
              }}
            >
              {/* {text > 0 && "+"} */}
              {text}
              {/* {text?.toFixed(2)} % */}
            </span>
          ),
        };
      },
    },
    {
      title: (
        <SortHeader
          label={`${activeDuration === "5D" ? "5D Chg %" : "1M Chg %"}`}
          header="per_change"
          sortState={sortState}
          setsortState={setsortState}
        />
      ),

      dataIndex: "per_change",
      width: "30px",
      render: (text, record) => {
        return {
          props: {
            style: {
              background: lightMode ? "#F2F6F8 " : "#3B3F4F",
              borderRight: lightMode
                ? "1px solid #C9D7DE"
                : "1px solid #545E78",
              borderLeft: lightMode ? "1px solid #C9D7DE" : "1px solid #545E78",
              borderBottom: "none",
            },
          },
          children: (
            <span
              className="ff-lato"
              style={{
                fontSize: "14px",
                fontWeight: "400",
                color: redGreenColorPicker(text, lightMode),
              }}
            >
              {text > 0 && "+"}
              {text?.toFixed(2)} %
            </span>
          ),
        };
      },
    },
  ];

  return (
    <>
      <div
        className={`table-shadow  ${
          lightMode ? "custom-antd-head-light" : "custom-antd-head-dark"
        }`}
      >
        <CustomTable
          loading={isLoading}
          columns={tableContent}
          data={data}
          scrollable={true}
          scrollLimit={700}
          sortState={sortState}
          setsortState={setsortState}
        />
      </div>
    </>
  );
}

export default GainersandLosersTable;
