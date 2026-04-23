import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getScreenerStore } from "../../../redux/reducers/screenerSlice";
import FilterResultTable from "./FilterResultTable";
import Movetowatchlist from "../../Movetowatchlist";
import AddColumnModal from "../components/AddColumnModal";
import svgSheet from "../../../assets/svg/svgSheet";
import svgSheet2 from "../../../assets/svg/svgSheet2";
import CustomDropdown from "../../ant/CustomDropdown";
import { screenerExcel } from "../components/ScreenerExcel";
import { getFormatDate } from "../../../utilityFn/getFormatdate";
import { authStore } from "../../../redux/reducers/authSlice";
import PremiumRedirectModal from "../../PremiumRedirectModal";
import {
  excelCouterAPI,
  getAllScreenStocks,
} from "../../../pages/api/fetchClient";
import PopularScreenButtons from "../components/PopularScreenButtons";
import PremiumTrialModal from "../../Popups/PremiumTrialModal";
import checkTrialStatus from "../../../utilityFn/checkTrialStatus";
import useCheckTrialStatus from "../../../hooks/useCheckTrialStatus";

function RightSectionIndex({
  lightMode,
  filterTypeArr,
  postSectorArr,
  postIndexArr,
  columnsArr,
  setcolumnsArr,
  activePage,
  setactivePage,
  setpremiumModal,
  paramstype,
  popularformula,
  FilterTriggered,
  postIndustryArr,
}) {
  const { userData } = useSelector(authStore);
  const screenerStore = useSelector(getScreenerStore);
  const [watchlistTickToggle, setwatchlistTickToggle] = useState(false);
  const [watchlistStocks, setwatchlistStocks] = useState([]);
  const [toggleColumnModal, settoggleColumnModal] = useState(false);
  const [columnTabledata, setColumnTabledata] = useState([]);
  const [excelLimitModal, setexcelLimitModal] = useState(false);
  const [sortState, setsortState] = useState({
    head: "mcap",
    sortOrder: false,
  });
  // create appiled filter arr
  const defaultChecked = useMemo(() => {
    const particularArr = filterTypeArr?.map((data) => data.particular);
    return particularArr;
  }, [filterTypeArr]);
  const checkTrialStatus = useCheckTrialStatus();
  // export excel function
  const onExportExcel = async () => {
    if (userData?.user?.is_premium) {
      await excelCouterAPI({ file: "Stock-screener" }).then(async (resp) => {
        // if (resp.data.count_expired === false) {
        // get table headers
        const newArr = [...columnTabledata];
        newArr.shift();
        // get all stocks without pagination
        const postData = filterTypeArr?.map((item) => {
          let valueArr = [item.firstValue, item.secondValue];
          return {
            values: valueArr,
            particular: item.particular,
            operator: item.operator,
          };
        });
        const defaultColumns = [
          "mcap",
          "pe",
          "returns_1y",
          "prev_close",
          "dividend_yield",
        ];
        const coulumnData = filterTypeArr?.map(({ particular }) => particular);
        const columnParticularArr = columnsArr?.map((data) => data.particular);
        const data = {
          payload: {
            allFilters: postData,
            selectedColumns: [
              ...new Set([
                ...defaultColumns,
                ...coulumnData,
                ...columnParticularArr,
              ]),
            ],
            offset: 0,
            // sortBy: "mcap",
            // sortOrder: "DESC",
            sortBy: sortState.head,
            sortOrder: sortState.sortOrder ? "ASC" : "DESC",
            sectors: postSectorArr.map((sector) => parseInt(sector, 10)),
            indices: postIndexArr,
            industries: postIndustryArr,
          },
          page: 1,
          perPage: screenerStore?.filterResponse?.count,
        };
        await getAllScreenStocks(
          data,
          1,
          screenerStore?.filterResponse?.count
        ).then((resp) => {
          screenerExcel(newArr, resp.data).then((url) => {
            const downloadAnchorNode = document.createElement("a");
            downloadAnchorNode.setAttribute("href", url);
            downloadAnchorNode.setAttribute(
              "download",
              `screener-data-${getFormatDate(new Date())}.xlsx`
            );
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
          });
        });
        // } else {
        //   setexcelLimitModal(true);
        // }
      });
    } else {
      setexcelLimitModal(true);
    }
  };
  // right side dropdown items
  const menuItems = [
    {
      label: (
        <p className="mb-0" onClick={() => settoggleColumnModal(true)}>
          Add Columns
        </p>
      ),
      key: "0",
    },
    {
      label: (
        <p className="mb-0" onClick={onExportExcel}>
          Export Excel
        </p>
      ),
      key: "1",
    },
  ];

  return (
    <>
      <div>
        <div className="d-flex flex-col-row justify-content-between">
          <div className="display-md">
            <div className="d-flex justify-content-between">
              <p className="fs-18-16 mb-0 fw-500 lh-18 d-flex align-items-start">
                Search Results - {screenerStore?.filterResponse?.count}
              </p>
              <div className="flex align-items-center">
                <CustomDropdown
                  menuItems={menuItems}
                  activeTrigger="click"
                  lightMode={lightMode}
                >
                  <div
                    onClick={(e) => e.preventDefault()}
                    className="pointer"
                    // onClick={() => settoggleColumnModal(true)}
                  >
                    {svgSheet2.settingsIcon}
                  </div>
                </CustomDropdown>
              </div>
            </div>
          </div>
          <p className="fs-18-16 mb-0 fw-500 lh-18 d-flex align-items-start display-lg">
            Search Results - {screenerStore?.filterResponse?.count}
          </p>

          <div className="flex flex-col-row-reverse">
            <PopularScreenButtons lightMode={lightMode} />

            <div className="flex align-items-center">
              {watchlistTickToggle && (
                <div className="flex align-items-center">
                  <p className="mb-0 fs-14-12 ">
                    {watchlistStocks?.length} Selected
                  </p>
                  <Movetowatchlist
                    lightMode={lightMode}
                    symbol={watchlistStocks}
                    setwatchlistTickToggle={setwatchlistTickToggle}
                  >
                    <button className="  btn-bg-primary text-white br-3 fw-500  p-5 fs-14-12">
                      + Add to Watchlist
                    </button>
                  </Movetowatchlist>
                </div>
              )}
            </div>

            <div className="flex align-items-center display-lg">
              <CustomDropdown
                menuItems={menuItems}
                activeTrigger="click"
                lightMode={lightMode}
              >
                <div
                  onClick={(e) => e.preventDefault()}
                  className="pointer"
                  // onClick={() => settoggleColumnModal(true)}
                >
                  {svgSheet2.settingsIcon}
                </div>
              </CustomDropdown>
            </div>
          </div>
        </div>
        <FilterResultTable
          filterTypeArr={filterTypeArr}
          checkedColumns={columnsArr}
          lightMode={lightMode}
          screenerStore={screenerStore}
          postSectorArr={postSectorArr}
          postIndexArr={postIndexArr}
          postIndustryArr={postIndustryArr}
          watchlistTickToggle={watchlistTickToggle}
          setwatchlistTickToggle={setwatchlistTickToggle}
          watchlistStocks={watchlistStocks}
          setwatchlistStocks={setwatchlistStocks}
          activePage={activePage}
          setactivePage={setactivePage}
          setColumnTabledata={setColumnTabledata}
          sortState={sortState}
          setsortState={setsortState}
          paramstype={paramstype}
          popularformula={popularformula}
          FilterTriggered={FilterTriggered}
        />
      </div>
      {/* add custom columns to filtered table  */}
      <AddColumnModal
        toggleModal={toggleColumnModal}
        settoggleModal={settoggleColumnModal}
        screenerStore={screenerStore}
        lightMode={lightMode}
        filterTypeArr={filterTypeArr}
        defaultChecked={[
          ...defaultChecked,
          "pe",
          "returns_1y",
          "prev_close",
          "dividend_yield",
        ]}
        postIndustryArr={postIndustryArr}
        postSectorArr={postSectorArr}
        postIndexArr={postIndexArr}
        columnsArr={columnsArr}
        setcolumnsArr={setcolumnsArr}
      />
      {/* <PremiumRedirectModal
        visible={excelLimitModal}
        setVisible={setexcelLimitModal}
        modalPlan="excel"
      /> */}

      <PremiumTrialModal
        visible={excelLimitModal}
        setVisible={setexcelLimitModal}
        isTrialOver={checkTrialStatus()}
      />
    </>
  );
}

export default RightSectionIndex;
