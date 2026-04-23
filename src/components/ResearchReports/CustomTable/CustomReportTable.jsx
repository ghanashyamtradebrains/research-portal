import React, { useEffect, useState } from "react";
import { animateScroll } from "react-scroll";
import { redGreenColorPicker } from "../../../utilityFn/redGreenColor";
import CustomPagination from "../../ant/CustomPagination";
import CustomTable from "../../CustomTable";
import SortHeader from "../../screener/table section/SortHeader";
import MainLayout from "../../MainLayout/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { authStore } from "../../../redux/reducers/authSlice";
import { CaretDownOutlined } from "@ant-design/icons";
import styles from "./CustomReportTable.module.css";
import { setToggleForm } from "../../../redux/reducers/AuthToggleSlice";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import numWithCommas from "../../../utilityFn/numWithCommas";
import { greenColorPicker } from "../../../utilityFn/greenColor";
import svgSheet7 from "../../../assets/svg/svgSheet7";
import { viewsCounter } from "../../../pages/api/fetchClient";

const TableColumnData = {
  PremiumUser: [
    ["Date", "date"],
    ["Company name", "short_name"],
    ["Report name", "report_name"],
    ["CMP", "cmp"],
    ["Target", "target"],
    ["Price @ Reco", "price_at_rec"],
    ["Upside/Downside", "updown"],
    ["Rating", "role"],
    ["PDF/Link", "file"],
  ],
  FreeUser: [
    // ["Date", "date"],
    // ["Company name", "short_name"],
    [`LockedContent`, "name"],
    // ["Rating", "role"],
    // ["PDF/Link", "file"],
  ],
};

const WallOfProfitColumnData = {
  User: [
    ["Date", "date"],
    ["Company name", "company_name"],
    ["Report name", "report_name"],
    ["Price @ Reco", "price_at_reco"],
    ["Target", "target_price"],
    ["Upside/Downside", "upside"],
    ["Profit Booked", "percentage_change"],
    ["Rating", "rating"],
    ["PDF/Link", "file"],
  ],
};

function CustomReportTable({
  lightMode,
  loading,
  sortState,
  setSortState,
  sortPremiumState,
  setSortPremiumState,
  page,
  perPage,
  setPage,
  setPerPage,
  tableData,
  count,
  isWallOfProfit,
  setVisible,
}) {
  const router = useRouter();
  const UserAuth = useSelector(authStore);
  const isPremium = UserAuth?.userData?.user?.plan?.planId?.includes("_plus");
  const dispatch = useDispatch();
  const isLoggedIn = UserAuth?.userData?.access_token;
  const [modifiedTableData, setModifiedTableData] = useState([]);
  // const [paginatedData, setPaginatedData] = useState([]);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (tableData) {
      const tempData = tableData.map((item) => {
        let fieldValue;

        if (
          item?.target_reached !== true &&
          item?.reco_update_type !== "Book Profit"
        ) {
          fieldValue = "difference";
        } else if (
          item?.reco_update_type === "Book Profit" &&
          item?.target_reached !== true
        ) {
          fieldValue = "Book Profits";
        } else if (item?.target_reached) {
          fieldValue = "Target Achieved";
        }

        return {
          ...item,
          updown: fieldValue,
        };
      });

      setModifiedTableData(tempData);
    }
  }, [tableData]);

  // useEffect(() => {
  //   if (tableData && tableData.length > 0) {
  //     const startIndex = (page - 1) * perPage;
  //     const endIndex = startIndex + perPage;

  //     const currentPageData = tableData.slice(startIndex, endIndex);

  //     setPaginatedData(currentPageData);
  //     setCount(tableData.length); // total records for pagination
  //   }
  // }, [tableData, page, perPage]);

  const handleClick = () => {
    if (!isLoggedIn) {
      dispatch(setToggleForm("login"));
      return;
    }

    router.push("/getpremium");
  };

  const widthCalculator = (columnName) => {
    if (isPremium) {
      const columnWidths = {
        Date: "12%",
        "Company name": "20%",
        "Report name": "20%",
        Rating: "7%",
        "Upside/Downside": "5%",
        "PDF/Link": "8%",
      };

      return columnWidths[columnName] || "10%";
    } else {
      const columnWidths = {
        Date: "12%",
        Rating: "7%",
        "Company name": "15%",
        "Report name": "15%",
        LockedContent: "50%",
        "Upside/Downside": "5%",
        "PDF/Link": "8%",
      };

      return columnWidths[columnName] || "10%";
    }
  };

  function* generateColumns(columns) {
    for (const item of columns) {
      yield (
        <span
          key={item}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
          }}
        >
          <span>{item}</span>
          <span>
            <CaretDownOutlined />
          </span>
        </span>
      );
    }
  }

  const columns = [
    "Date",
    "Company Name",
    "CMP",
    "Target",
    "Price @ Reco",
    "Upside/Downside",
    "Rating",
    "PDF/Link",
  ];

  const resultElements = [...generateColumns(columns)];

  const iconData = [{ icon: svgSheet7.link_icon, label: "View", link: "/" }];

  // const handleReportClick = (record) => {
  //   if (!isLoggedIn) {
  //     dispatch(setToggleForm("login"));
  //   } else {
  //     router.push("/getpremium");
  //   }
  // };

  const handleViewReportClick = async (data) => {
    let str = router.asPath.split("/").filter(Boolean).pop(),
      type = null,
      payload = {};

    if (str === "monthly-stock-picks") {
      type = "monthly_stock_picks";
      payload = {
        type,
        name: data?.report_name,
      };
    } else if (str === "seasonal-stock-picks") {
      type = "seasonal_stock_picks";
      payload = {
        type,
        name: data?.report_name,
      };
    } else if (str === "technicals-reports") {
      type = "technical_charts";
      payload = {
        type,
        id: data?.report_id,
      };
    } else {
      alert("inside");
      type = "ipo_reports";
      payload = {
        type,
        name: data?.report_name,
      };
    }

    await viewsCounter(payload);

    if (isLoggedIn) {
      if (UserAuth?.userData?.user?.plan?.planId?.includes("plus")) {
        window.open(data?.file, "_blank");
      } else {
        setVisible(true);
      }
    } else {
      dispatch(setToggleForm("login"));
    }
  };

  const ratingFieldGenerator = (text) => {
    const formattedText = text?.charAt(0).toUpperCase() + text?.slice(1);

    const getColor = () => {
      switch (text?.toLowerCase()) {
        case "buy":
          return lightMode ? "#009633" : "#00FF57";
        case "sell":
          return lightMode ? "#FF0000" : "#F82E2E";
        case "hold":
          return "#E3A52A";
        default:
          return "gray"; // Default color for unknown status
      }
    };

    // Return the JSX element directly
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: getColor(),
          }}
        ></span>
        {formattedText}
      </span>
    );
  };

  const fieldValueGeneratorUpDown = (text, record) => {
    const potentialUpside = Number(record?.target - record?.cmp);
    const difference = Number((potentialUpside / record?.cmp) * 100).toFixed(2);

    // Target Acheived
    const profit = Number(record?.target - record?.price_at_rec);
    const profitBooked = Number((profit / record?.price_at_rec) * 100).toFixed(
      2,
    );
    // Book Profits
    const profitBook_new = Number(
      record?.reco_update_price - record?.price_at_rec,
    );
    const profitBooked_new = Number(
      (profitBook_new / record?.price_at_rec) * 100,
    ).toFixed(2);

    return (
      <span
        className="ff-lato"
        style={{
          color: greenColorPicker(text, lightMode),
        }}
      >
        {/* {text === "Book Profits" && (
          <span className="ff-lato fw-500">
            {Math.abs(bookProfits) > 0 && "+"}
            {Math.abs(bookProfits)}%
          </span>
        )}
        {text === "Target Achieved" && (
          <span className="ff-lato fw-500">
            {Math.abs(targetAchieved) > 0 && "+"}
            {Math.abs(targetAchieved)}%
          </span>
        )}
        {text === "difference" && (
          <span className="ff-lato">
            {upsideDownside > 0 && "+"}
            {upsideDownside}%
          </span>
        )} */}
        {text > 0 ? "+" + text : "-" + text}%
      </span>
    );
  };

  const fieldGeneratorUpDown = () => {
    return (
      <span
        style={{
          color: redGreenColorPicker(1, lightMode),
        }}
      >
        Target Achieved
      </span>
    );
  };

  const generateFieldText = (columnName, text, record) => {
    if (columnName === "LockedContent" && !isWallOfProfit) {
      return (
        <div className="relative">
          <div className={styles.sample_content}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(() => {
              return <div className={styles.rectangle}>Sample</div>;
            })}
          </div>
          <div
            className="flex justify-content-center cursor-pointer"
            onClick={handleClick}
          >
            <span
              style={{
                zIndex: "1",
                cursor: "pointer",
              }}
            >
              {svgSheet7.lock_icon}
            </span>
            <span className={styles.buy_premium}>Buy Premium</span>
          </div>
        </div>
      );
    } else if (columnName === "PDF/Link") {
      return (
        <div>
          {iconData.map((item, index) => (
            <div
              key={index}
              className={styles.icon_style}
              onClick={() => handleViewReportClick(record)}
            >
              <span>{item.icon}</span>
              {isPremium || isWallOfProfit ? (
                // <Link href={record.file} target="_blank">
                <span
                  style={{
                    color: "#6DB8FD",
                    cursor: "pointer",
                  }}
                >
                  {item.label}
                </span>
              ) : (
                // </Link>
                <span
                  // onClick={() => handleViewReportClick(record)}
                  style={{
                    cursor: "pointer",
                    color: "#6DB8FD",
                  }}
                >
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="ff-lato">
        {(() => {
          if (isPremium || isWallOfProfit) {
            switch (columnName) {
              case "Date":
                return dayjs(text).format("DD-MM-YYYY");
              case "Rating":
                return ratingFieldGenerator(text);
              case "Target":
              case "CMP":
              case "Price @ Reco":
                return `₹ ${numWithCommas(text?.toFixed(2))}`;
              case "Upside/Downside":
                return fieldGeneratorUpDown(text, record);
              case "Profit Booked":
                return fieldValueGeneratorUpDown(text, record);
              case "Company name":
                return (
                  <div
                    style={{
                      cursor: "pointer",
                      textDecoration:
                        isHovered &&
                        isHovered == record?.short_name &&
                        record?.symbol &&
                        "underline",
                    }}
                    onMouseEnter={() => setIsHovered(record?.short_name)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={(e) => {
                      if (!record?.short_name) {
                        e.preventDefault(); // Prevent navigation if no record.name
                        e.stopPropagation();
                      }
                      if (record?.symbol) {
                        window.open(`/stocks/${record?.symbol}`, "_blank");
                      } else {
                        window.open(`#`, "_blank");
                      }
                    }}
                  >
                    {text}
                  </div>
                );
              case "Report name":
                return <div>{text}</div>;
            }
          } else {
            switch (columnName) {
              case "Date":
                return dayjs(text).format("DD-MM-YYYY");
              case "Rating":
                return ratingFieldGenerator(text);
              case "Company name":
                return (
                  <span
                    onClick={(e) => {
                      if (!record?.short_name) {
                        e.preventDefault(); // Prevent navigation if no record.name
                        e.stopPropagation();
                      }
                    }}
                    target="_blank"
                  >
                    {text}
                  </span>
                );
            }
          }
        })()}
      </div>
    );
  };

  const columnGen = (array) => {
    const GeneratedColumns =
      array?.length > 0 &&
      array?.map((items, index) => {
        return {
          title:
            items[0] === "LockedContent" ? (
              <span
                className={styles.locked_header}
                onClick={() => dispatch(setToggleForm("login"))}
              >
                {resultElements}
              </span>
            ) : (
              <div
              // className={styles.normal_header}
              >
                {items[0] === "PDF/Link" || items[0] === "Upside/Downside" ? (
                  <p className="fw-600 mb-0 fs-14-12">{items[0]}</p>
                ) : (
                  <SortHeader
                    label={
                      <span style={{}} className="fs-s-14 fw-500 mb-0">
                        {items[0]}
                      </span>
                    }
                    header={items[1]}
                    sortState={isWallOfProfit ? sortState : sortPremiumState}
                    setsortState={
                      isWallOfProfit ? setSortState : setSortPremiumState
                    }
                    index={index}
                  />
                )}
              </div>
            ),
          dataIndex: items[1],
          width: widthCalculator(items[0]),
          render(text, record) {
            const style = {
              color: lightMode ? "#000" : "#fff",
              background: lightMode ? "#f2f6f8" : "#1f1f1f",
              borderBottom: lightMode
                ? "1px solid #C9D7DE"
                : "1px solid #545E78",
            };
            return {
              props: {
                style,
              },
              children: generateFieldText(items[0], text, record),
            };
          },
        };
      });

    return GeneratedColumns;
  };

  return (
    <MainLayout>
      <div className={`mt-10`}>
        <div
          className={`scroll ${
            lightMode
              ? "custom-antd-head-light-table-research-report"
              : "custom-antd-head-dark-table-research-report"
          }`}
        >
          <CustomTable
            columns={columnGen(
              isWallOfProfit
                ? WallOfProfitColumnData["User"]
                : TableColumnData[isPremium ? "PremiumUser" : "FreeUser"],
            )}
            data={modifiedTableData}
            loading={loading}
          />
        </div>
        <CustomPagination
          current={page}
          // showQuickJumper={true}
          lightMode={lightMode}
          onChange={(num, perPage) => {
            setPage(num);
            setPerPage(perPage);
            animateScroll.scrollTo(110, 0);
          }}
          total={count}
          pageSize={perPage}
        />
      </div>
    </MainLayout>
  );
}

export default CustomReportTable;
