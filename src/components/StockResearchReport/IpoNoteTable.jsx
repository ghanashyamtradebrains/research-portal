import React, { useEffect, useState } from "react";
import { animateScroll } from "react-scroll";
import { redGreenColorPicker } from "../../utilityFn/redGreenColor";
import CustomPagination from "../ant/CustomPagination";
import CustomTable from "../CustomTable";
import SortHeader from "../screener/table section/SortHeader";
import MainLayout from "../MainLayout/MainLayout";
import Link from "next/link";
import svgSheet from "../../assets/svg/svgSheet";
import { useDispatch, useSelector } from "react-redux";
import { authStore } from "../../redux/reducers/authSlice";
import { CaretDownOutlined } from "@ant-design/icons";
import styles from "./report.module.css";
import { setToggleForm } from "../../redux/reducers/AuthToggleSlice";
import { useRouter } from "next/router";
import moment from "moment";
import numWithCommas from "../../utilityFn/numWithCommas";
import svgSheet7 from "../../assets/svg/svgSheet7";

const TableColumnData = {
  PremiumUser: [
    ["Date", "date"],
    ["Company name", "short_name"],
    ["CMP", "cmp"],
    ["Target", "target"],
    ["Price @ Reco", "price_at_rec"],
    ["Upside/Downside", "updown"],
    ["Rating", "role"],
    ["PDF/Link", "file"],
  ],
  FreeUser: [
    ["Date", "date"],
    ["Company name", "short_name"],
    [`LockedContent`, "name"],
    ["Rating", "role"],
    ["PDF/Link", "file"],
  ],
};

function IpoNoteTable({
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
}) {
  const router = useRouter();
  const UserAuth = useSelector(authStore);
  const isPremium = UserAuth?.userData?.user?.is_premium;
  const dispatch = useDispatch();
  const isLoggedIn = UserAuth?.userData?.access_token;
  const [modifiedTableData, setModifiedTableData] = useState([]);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (tableData && tableData.length) {
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

  const columns = ["CMP", "Target", "Price @ Reco", "Upside/Downside"];
  const resultElements = [...generateColumns(columns)];

  const iconData = [{ icon: svgSheet7.link_icon, label: "View", link: "/" }];

  const handleReportClick = () => {
    if (!isLoggedIn) {
      dispatch(setToggleForm("login"));
    } else {
      router.push("/getpremium");
    }
  };

  const ratingFieldGenerator = (text) => {
    const formattedText = text.charAt(0).toUpperCase() + text.slice(1);

    const getColor = () => {
      switch (text.toLowerCase()) {
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

  const fieldGeneratorUpDown = (text, record) => {
    const potentialUpside = Number(record?.target - record?.cmp);
    const difference = Number((potentialUpside / record?.cmp) * 100).toFixed(2);
    return (
      <span
        style={{
          color: redGreenColorPicker(difference, lightMode),
        }}
      >
        {text === "Book Profits" && (
          <span className="fw-500">Book Profits</span>
        )}
        {text === "Target Achieved" && (
          <span className="fw-500">Target Achieved</span>
        )}
        {text === "difference" && (
          <span className="ff-lato">
            {difference > 0 && "+"}
            {difference}%
          </span>
        )}
      </span>
    );
  };

  const fieldValueGeneratorUpDown = (text, record) => {
    const potentialUpside = Number(record?.target - record?.cmp);
    const difference = Number((potentialUpside / record?.cmp) * 100).toFixed(2);

    // Target Acheived
    const profit = Number(record?.target - record?.price_at_rec);
    const profitBooked = Number((profit / record?.price_at_rec) * 100).toFixed(
      2
    );

    // Book Profits
    const profitBook_new = Number(
      record?.reco_update_price - record?.price_at_rec
    );
    const profitBooked_new = Number(
      (profitBook_new / record?.price_at_rec) * 100
    ).toFixed(2);

    return (
      <span
        style={{
          color: redGreenColorPicker(
            text === "Book Profits"
              ? profitBooked
              : text === "Target Achieved"
              ? profitBooked_new
              : text === "difference"
              ? difference
              : 0,
            lightMode
          ),
        }}
      >
        {text === "Book Profits" && (
          <span className="ff-lato fw-500">
            {profitBooked > 0 && "+"}
            {profitBooked}%
          </span>
        )}
        {text === "Target Achieved" && (
          <span className="ff-lato fw-500">
            {profitBooked_new > 0 && "+"}
            {profitBooked_new}%
          </span>
        )}
        {text === "difference" && (
          <span className="ff-lato">
            {difference > 0 && "+"}
            {difference}%
          </span>
        )}
      </span>
    );
  };

  const generateFieldText = (columnName, text, record) => {
    if (columnName === "LockedContent" && !isWallOfProfit) {
      return (
        <div className="relative">
          <div className={styles.sample_content}>
            {[1, 2, 3, 4].map(() => {
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
            <div key={index} className={styles.icon_style}>
              <span>{item.icon}</span>
              {isPremium || isWallOfProfit ? (
                <Link href={record.file} target="_blank">
                  <span style={{ color: "#6DB8FD" }}>{item.label}</span>
                </Link>
              ) : (
                <span
                  onClick={handleReportClick}
                  style={{ color: "#6DB8FD", cursor: "pointer" }}
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
          if (isPremium) {
            switch (columnName) {
              case "Date":
                return moment(text).format("DD-MM-YYYY");
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
                        isHovered == record?.comp_name &&
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
            }
          } else {
            switch (columnName) {
              case "Date":
                return moment(text).format("DD-MM-YYYY");
              case "Rating":
                return ratingFieldGenerator(text);
              case "Company name":
                return (
                  <Link
                    style={{
                      cursor: "pointer",
                      textDecoration:
                        isHovered &&
                        isHovered == record?.short_name &&
                        // record?.symbol &&
                        "underline",
                    }}
                    onMouseEnter={() => setIsHovered(record?.short_name)}
                    onMouseLeave={() => setIsHovered(false)}
                    href={`${
                      record?.symbol ? `/stocks/${record?.symbol}` : `#`
                    }`}
                    onClick={(e) => {
                      if (!record?.short_name) {
                        e.preventDefault(); // Prevent navigation if no record.name
                        e.stopPropagation();
                      }
                    }}
                    target="_blank"
                  >
                    {text}
                  </Link>
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
                {items[0] === "PDF/Link" ? (
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
              background: lightMode ? "#f2f6f8" : "#212639",
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
      <div className={`mt-20 mb-10`}>
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
                : TableColumnData[isPremium ? "PremiumUser" : "FreeUser"]
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

export default IpoNoteTable;
