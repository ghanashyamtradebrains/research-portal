import React, { useEffect, useMemo, useState } from "react";
import CustomTable from "../../CustomTable";
import numberWithCommas from "../../../utilityFn/numberWithCommas";
import CustomPagination from "../../ant/CustomPagination";
import {
  postOffsetData,
  postScreenerData,
} from "../../../redux/reducers/screenerSlice";
import { useDispatch } from "react-redux";
import SortHeader from "./SortHeader";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { redGreenColorPicker } from "../../../utilityFn/redGreenColor";
import { animateScroll as scroll } from "react-scroll";
import Link from "next/link";
import screenerFormula from "../components/screenerFormula";
import { useRouter } from "next/router";
import commaWihNumber from "../../../utilityFn/commaWithNumber";
function FilterResultTable({
  lightMode,
  screenerStore,
  filterTypeArr,
  postSectorArr,
  postIndustryArr,
  postIndexArr,
  watchlistTickToggle,
  setwatchlistTickToggle,
  watchlistStocks,
  setwatchlistStocks,
  checkedColumns,
  activePage,
  setactivePage,
  setColumnTabledata,
  sortState,
  setsortState,
  paramstype,
  popularformula,
  FilterTriggered,
}) {
  // const [activePage, setactivePage] = useState({});
  // const [sortState, setsortState] = useState({
  //   head: "mcap",
  //   sortOrder: false,
  // });
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = router;
  // activeIndex
  //send api when clicked on header sotr
  // useEffect(() => {
  //   const columnArr = checkedColumns?.map((data) => data.particular);
  //   dispatch(
  //     postScreenerData({
  //       applyFilters: filterTypeArr,
  //       industries: postSectorArr,
  //       indices: postIndexArr,
  //       sortBy: sortState.head,
  //       sortOrder: sortState.sortOrder ? "ASC" : "DESC",
  //       customColumns: columnArr ? columnArr : [],
  //       perPage:activePage.perPage
  //     })
  //   );
  // }, [sortState]);

  useEffect(() => {
    const columnArr = checkedColumns?.map((data) => data.particular);

    if (!paramstype || FilterTriggered) {
      console.log(popularformula, filterTypeArr, "popular");

      dispatch(
        postScreenerData({
          applyFilters: filterTypeArr,
          sectors: postSectorArr,
          industries: postIndustryArr,
          indices: postIndexArr,
          sortBy: sortState.head,
          sortOrder: sortState.sortOrder ? "ASC" : "DESC",
          customColumns: columnArr ? columnArr : [],
          perPage: activePage.perPage,
        })
      );
    } else {
      dispatch(
        postScreenerData({
          applyFilters: filterTypeArr,
          sectors: postSectorArr,
          indices: postIndexArr,
          industries: postIndustryArr,
          sortBy: sortState.head,
          sortOrder: sortState.sortOrder ? "ASC" : "DESC",
          customColumns: columnArr ? columnArr : [],
        })
      );
    }
  }, [sortState]);

  //add header  array when new filter type adding
  const memoHeaders = useMemo(() => {
    const headerProp = {
      style: lightMode
        ? {
            background: "rgba(242, 246, 248, 1)",
            fontSize: "16px",
            borderRight: "1px solid #C9D7DE",
            borderLeft: "1px solid #C9D7DE",
            borderBottom: "none",
          }
        : {
            background: "#3B3F4F",
            borderLeft: "1px solid #545E78",
            borderRight: "1px solid #545E78",
            borderBottom: "none",
            fontSize: "16px",
          },
    };
    //  create unique map of  columns
    const newHeaderArr = [...filterTypeArr, ...checkedColumns]?.map((item) => {
      return {
        title: (
          <SortHeader
            label={item.label}
            header={
              item.particular === "receivable_days+inventory_days+payable_days"
                ? "cash_conversion_cycle"
                : item.particular === "short_term_debt_ttm+long_term_debt_ttm"
                ? "total_debt_ttm"
                : item.particular
            }
            sortState={sortState}
            setsortState={setsortState}
          />
        ),
        dataIndex:
          item.particular === "receivable_days+inventory_days+payable_days"
            ? "cash_conversion_cycle"
            : item.particular === "short_term_debt_ttm+long_term_debt_ttm"
            ? "total_debt_ttm"
            : item.particular.toLowerCase(),
        render: (text, record) => {
          const numberTwoFixed = Number(text?.toFixed(2));
          return {
            props: headerProp,
            children: (
              <>
                {item?.label?.includes("Returns(%)") ? (
                  <span
                    className="ff-lato"
                    style={{
                      fontSize: "14px",
                      fontWeight: "400",
                      color: redGreenColorPicker(text, lightMode),
                    }}
                  >
                    {text > 0 && "+"}
                    {text ? commaWihNumber(numberTwoFixed) : 0}%
                  </span>
                ) : (
                  <span
                    className="ff-lato"
                    style={{
                      fontSize: "14px",
                      fontWeight: "400",
                      color: lightMode ? "black" : "white",
                    }}
                  >
                    {item.symbol === "rs" && "₹"}{" "}
                    {text ? commaWihNumber(numberTwoFixed) : 0}{" "}
                    {item.symbol === "%" && "%"}
                  </span>
                )}
              </>
            ),
          };
        },
        width: "130px",
      };
    });

    const defaultHeader = [
      // column for add stocks to watchlist
      {
        title: (
          <button
            onClick={() => {
              setwatchlistTickToggle(!watchlistTickToggle);
              setwatchlistStocks([]);
            }}
            style={{
              height: "24px",
              width: "20px",
              textAlign: "center",
              lineHeight: "12px",
              border: "1px solid",
              color: lightMode ? "" : "white",
            }}
            className={`br-3 bg-transparent pointer  
        `}
          >
            {watchlistTickToggle ? (
              <CloseOutlined className="fs-12" />
            ) : (
              <PlusOutlined className="fs-12" />
            )}
          </button>
        ),
        dataIndex: "no",
        fixed: "left",
        align: "center",
        width: "55px",
        render: (text, record, index) => {
          return {
            props: headerProp,
            children: (
              <>
                {watchlistTickToggle ? (
                  <div
                    className={`${
                      lightMode ? "checkbox-light" : "checkbox-dark"
                    }`}
                  >
                    <Checkbox
                      checked={watchlistStocks.includes(record.symbol)}
                      name={record.symbol}
                      onChange={(e) => addToWatchlistArr(record, e)}
                      style={{
                        color: lightMode ? "black" : "white",
                        padding: "0px",
                      }}
                      className={`modal-list-item `}
                    ></Checkbox>
                  </div>
                ) : (
                  <div
                    style={{ color: lightMode ? "black" : "white" }}
                    className="d-flex  justify-content-center align-items-center"
                  >
                    <p className="mb-0">{index + 1}</p>
                  </div>
                )}
              </>
            ),
          };
        },
      },
      {
        title: <p className="fw-600 mb-0 fs-s-16">Company</p>,
        dataIndex: "short_name",
        fixed: "left",
        render(text, record) {
          return {
            props: headerProp,
            children: (
              <div
                className="fs-s-14 link-hover-underline ff-poppins"
                style={{ color: lightMode ? "black" : "white" }}
              >
                <div
                  className="overFlow-text pointer"
                  onClick={() =>
                    record?.symbol == 0
                      ? window.open(`/stocks/${record?.scripcode}`, "_blank")
                      : window.open(`/stocks/${record?.symbol}`, "_blank")
                  }
                >
                  {text}
                </div>
              </div>
            ),
          };
        },
        width: "150px",
      },
      {
        title: <p className="fw-600 mb-0 fs-s-16">Industry</p>,
        dataIndex: "industry_name",
        width: "130px",
        render: (text, record) => {
          return {
            props: headerProp,
            children: (
              <span
                className="ff-lato overFlow-text"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: lightMode ? "black" : "white",
                }}
              >
                {text}
              </span>
            ),
          };
        },
      },
      {
        title: (
          <SortHeader
            label="Market Cap (Rs Cr)"
            header="mcap"
            sortState={sortState}
            setsortState={setsortState}
          />
        ),
        // (
        //   <div className=" d-flex align-items-center ">
        //     <p className="fs-s-16 fw-600 mb-0">MCap</p>{" "}
        //     <p className="mb-0 ml-2 fw-600 mt-5 fs-s-12">(Cr)</p>
        //   </div>
        // ),
        dataIndex: "mcap",
        width: "130px",
        render(text, record) {
          // const formatedMcap = (text / 10 ** 7).toFixed(2);
          return {
            props: headerProp,
            children: (
              <span
                className="ff-lato"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: lightMode ? "black" : "white",
                }}
              >
                ₹ {commaWihNumber(text)}
              </span>
            ),
          };
        },
        // sorter: (a, b) => a.MCAP - b.MCAP,
      },
      {
        title: (
          <SortHeader
            label="Current Price (Rs)"
            header="prev_close"
            sortState={sortState}
            setsortState={setsortState}
          />
        ),
        dataIndex: "prev_close",
        width: "130px",
        render: (text, record) => {
          return {
            props: headerProp,
            children: (
              <span
                className="ff-lato"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: lightMode ? "black" : "white",
                }}
              >
                ₹ {commaWihNumber(text)}
              </span>
            ),
          };
        },
      },
      {
        title: (
          <SortHeader
            label="1Yr Returns(%)"
            header="returns_1y"
            sortState={sortState}
            setsortState={setsortState}
          />
        ),
        dataIndex: "returns_1y",
        render: (text, record) => {
          const numberTwoFixed = Number(text?.toFixed(2));
          return {
            props: headerProp,
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
                {text ? commaWihNumber(numberTwoFixed) : 0}%
              </span>
            ),
          };
        },
        width: "130px",
      },
      {
        title: (
          <SortHeader
            label="PE Ratio TTM"
            header="pe"
            sortState={sortState}
            setsortState={setsortState}
          />
        ),
        dataIndex: "pe",
        width: "130px",
        render: (text, record) => {
          const numberTwoFixed = Number(text?.toFixed(2));
          return {
            props: headerProp,
            children: (
              <span
                className="ff-lato"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: lightMode ? "black" : "white",
                }}
              >
                {text ? commaWihNumber(numberTwoFixed) : 0}
              </span>
            ),
          };
        },
      },
      {
        title: (
          <SortHeader
            label="Dividend Yield(%)"
            header="dividend_yield"
            sortState={sortState}
            setsortState={setsortState}
          />
        ),
        dataIndex: "dividend_yield",
        width: "130px",
        render: (text, record) => {
          const numberTwoFixed = Number(text?.toFixed(2));
          return {
            props: headerProp,
            children: (
              <span
                className="ff-lato"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: lightMode ? "black" : "white",
                }}
              >
                {text ? commaWihNumber(numberTwoFixed) : 0} %
              </span>
            ),
          };
        },
      },
    ];
    // remove duplicate columns when user add same filter that already added

    const uniqueDataIndexes = Array.from(
      new Set([...defaultHeader, ...newHeaderArr].map((item) => item.dataIndex))
    ).map((dataIndex) => {
      return [...defaultHeader, ...newHeaderArr].find(
        (a) => a.dataIndex === dataIndex
      );
    });
    setColumnTabledata(uniqueDataIndexes);
    return uniqueDataIndexes;
  }, [
    screenerStore,
    lightMode,
    sortState,
    watchlistTickToggle,
    watchlistStocks,
  ]);
  // change page number and per page
  const onChangePagination = (page, perPage) => {
    const columnArr = checkedColumns?.map((data) => data.particular);
    dispatch(
      postScreenerData({
        applyFilters: filterTypeArr,
        sectors: postSectorArr,
        industries: postIndustryArr,
        indices: postIndexArr,
        sortBy: sortState.head,
        sortOrder: sortState.sortOrder ? "ASC" : "DESC",
        customColumns: columnArr ? columnArr : [],
        page: page,
        perPage: perPage,
      })
    ).then((resp) => {
      if (resp.payload) {
        scroll.scrollTo(130, 0);
      }
    });
  };
  // add to watchlist array
  const addToWatchlistArr = (record, event) => {
    if (event.target.checked) {
      setwatchlistStocks([...watchlistStocks, record.symbol]);
    } else {
      setwatchlistStocks(
        watchlistStocks.filter((item) => item !== event.target.name)
      );
    }
  };

  return (
    <div className="mt-20">
      <p className="fs-s-12 mb-0 text-gray text-align-end">
        *Results are shown in Standalone data
      </p>
      <div
        className={` table-shadow  ${
          lightMode ? "custom-antd-head-light" : "custom-antd-head-dark"
        }`}
      >
        <CustomTable
          sortDirections={["ascend", "descend", "ascend"]}
          columns={memoHeaders}
          data={screenerStore?.filterResponse?.results}
          scrollable={true}
          loading={screenerStore?.responseStatus}
          scrollLimit={1000}
        />
      </div>
      <CustomPagination
        showQuickJumper={true}
        total={screenerStore?.filterResponse.count}
        onChange={(num, pageSize) => {
          onChangePagination(num, pageSize);
          setactivePage({ page: num, perPage: pageSize });
        }}
        lightMode={lightMode}
        pageSize={activePage?.perPage}
        current={activePage?.page}
      />
    </div>
  );
}

export default FilterResultTable;
