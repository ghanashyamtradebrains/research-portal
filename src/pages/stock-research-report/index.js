import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MainLayout from "../../components/MainLayout/MainLayout";
import { getThemeMode } from "../../redux/reducers/ThemeSlice";
import {
  getPageBanner,
  getReportsFree,
  getReportsPremium,
} from "../api/fetchClient";
import Head from "next/head";
import { DatePicker } from "antd";
import BreadCrumb from "../../components/BreadCrumb";
import HeaderSection from "../../components/StockResearchReport/HeaderSection";
import AdditionalInfo from "../../components/StockResearchReport/AdditionalInfo";
import TableSection from "../../components/StockResearchReport/TableSection.jsx";
import useDebounce from "../../utilityFn/debounce";
import AllPageAds from "../../components/AdsComp/AllPageAds";

function StockRecommendation2({}) {
  const { RangePicker } = DatePicker;
  const [data, setData] = useState([]);
  const [updated, setUpdated] = useState("");
  const { lightMode } = useSelector(getThemeMode);

  //premium report
  const [premiumTableData, setPremiumTableData] = useState([]);
  const [portalLoading, setPortalLoading] = useState(false);
  const [pagePortal, setPagePortal] = useState(1);
  const [countPortal, setCountPortal] = useState();
  const [perPagePortal, setPerPagePortal] = useState(15);
  const [premium, setPremium] = useState("");
  const [sortPremiumState, setSortPremiumState] = useState({
    head: null,
    sortOrder: false,
  });
  const [premiumSortRole, setPremiumSortRole] = useState("");

  // Market Cap and Sector filters
  const [mcap, setMcap] = useState(false);
  const [sector, setSector] = useState(false);

  //other reports
  const [tableData, setTableData] = useState([]);
  const [pageLoang, setpageLoang] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [count, setCount] = useState();
  const [sortState, setSortState] = useState({
    head: null,
    sortOrder: false,
  });
  const [sortRole, setSortRole] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchTerm = useDebounce(searchInput, 500);
  const [date, setDate] = useState();
  const [filter, setFilter] = useState("target_achieved");

  const getFreeData = async () => {
    setpageLoang(true);

    const modifiedSortState = {
      ...sortState,
      head: sortState.head === "updown" ? "percentage_change" : sortState.head,
    };

    await getReportsFree(null, null, modifiedSortState, page, perPage, filter)
      .then((resp) => {
        setData(resp);
        console.log("stock_report", resp?.data?.results);
        setTableData(resp?.data?.results);
        setpageLoang(false);
        setCount(resp?.data?.count);
      })
      .catch(() => null);
  };

  const getPremiumData = async () => {
    setPortalLoading(true);
    await getReportsPremium(
      debouncedSearchTerm,
      premiumSortRole,
      date,
      sortPremiumState,
      premium,
      mcap,
      sector,
      pagePortal,
      perPagePortal,
    )
      .then((resp) => {
        setPremiumTableData(resp?.data?.results);
        setPortalLoading(false);
        setCountPortal(resp?.data?.count);
      })
      .catch(() => null);
  };

  useEffect(() => {
    getFreeData();
  }, [sortState, page, perPage, filter]);

  useEffect(() => {
    getPremiumData();
  }, [
    debouncedSearchTerm,
    premiumSortRole,
    date,
    sortPremiumState.head,
    sortPremiumState.sortOrder,
    premium,
    pagePortal,
    perPagePortal,
    mcap,
    sector,
  ]);

  const breadCrumbData = [{ label: "Dashboard", link: `/dashboard` }];

  return (
    <MainLayout>
      <Head>
        <title>{`Stock Research Reports - Stock Recommendations`}</title>
        <meta
          name="og:title"
          content={`Stock Research Reports - Stock Recommendations`}
        />
        <meta
          name="description"
          content={`Stay updated with the latest stock research reports given by research analysts. Get valuable stock recommendations on when to buy, sell, or hold  to enchance your financial investments on Tradebrains portal.`}
        />
        <meta
          name="og:description"
          content={`Stay updated with the latest stock research reports given by research analysts. Get valuable stock recommendations on when to buy, sell, or hold  to enchance your financial investments on Tradebrains portal.`}
        />
        <meta
          name="keywords"
          content={`stock research reports, stock advice, best stock to buy now, best stock to sell now, best stock advice, best stock advisor, broker research Reports, , Share Research Reports,Indian Shares Research Reports, Indian Stocks research reports, stock market recommendations, stock market research reports, Stock research reports today, expert stock research reports, expert advice on stocks, stock market research, stock recommendation, stock recommendation reports, brokerage research repots, equity research reports
          `}
        />
        <link
          rel="canonical"
          href={`https://portal.tradebrains.in/stock-research-report`}
        />
      </Head>
      <div className="ff-poppins p-10 w-100">
        <div className="p-50-00 mt-10">
          <BreadCrumb
            linkData={breadCrumbData}
            current={`Stock Research Report`}
          />

          <HeaderSection lightMode={lightMode} />
          <AllPageAds page="stock-research-report" />

          <TableSection
            lightMode={lightMode}
            tableData={tableData}
            loading={pageLoang}
            page={page}
            setPage={setPage}
            perPage={perPage}
            setPerPage={setPerPage}
            count={count}
            sortState={sortState}
            setSortState={setSortState}
            //
            premiumTableData={premiumTableData}
            portalLoading={portalLoading}
            setPortalLoading={setPortalLoading}
            pagePortal={pagePortal}
            setPagePortal={setPagePortal}
            countPortal={countPortal}
            setCountPortal={setCountPortal}
            perPagePortal={perPagePortal}
            setPerPagePortal={setPerPagePortal}
            sortPremiumState={sortPremiumState}
            setSortPremiumState={setSortPremiumState}
            setSearchInput={setSearchInput}
            searchInput={searchInput}
            setDate={setDate}
            setSortRole={setPremiumSortRole}
            setMcap={setMcap}
            setSector={setSector}
            setFilter={setFilter}
            filter={filter}
          />
        </div>

        <AdditionalInfo lightMode={lightMode} />
      </div>
    </MainLayout>
  );
}

export default StockRecommendation2;
