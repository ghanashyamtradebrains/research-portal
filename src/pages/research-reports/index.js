import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import MainLayout from "../../components/MainLayout/MainLayout";
import {
  fetchTechnicalChart,
  getIpoList_v2,
  getResearchReportsFree,
} from "../api/fetchClient";
import ResearchReport from "../../components/StockResearchReport/Ipo/ResearchReportCard";
import { getThemeMode } from "../../redux/reducers/ThemeSlice";
import { useSelector } from "react-redux";
import SearchFilter from "../../components/StockResearchReport/Ipo/SearchFilter";
import { generateMetaDataWithoutAggregate } from "../../utilityFn/metadataWithoutAgreegate";
import Head from "next/head";
import { authStore } from "../../redux/reducers/authSlice";
import Link from "next/link";
import useDebounce from "../../utilityFn/debounce";
import useWindowWidth from "../../utilityFn/getWindowWidth";
import PremiumTrialModal from "../../components/Popups/PremiumTrialModal";
import useCheckTrialStatus from "../../hooks/useCheckTrialStatus";
import CustomReportTable from "../../components/ResearchReports/CustomTable/CustomReportTable";
import styles from "../../components/StockResearchReport/report.module.css";
import style from "./research-reports.module.css";
import Image from "next/image";
import ProfileDescription from "../../components/ResearchReports/ProfileDescription/ProfileDescription";

const index = () => {
  const { lightMode } = useSelector(getThemeMode);
  const [researchReports, setResearchReports] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [sortState, setSortState] = useState();
  const [date, setDate] = useState();
  const UserAuth = useSelector(authStore);
  const [isPremiumPlus, setIsPremiumPlus] = useState(false);
  const [year, setYear] = useState("");
  const [yearsAvailable, setYearsAvailable] = useState([]);
  const debouncedSearchTerm = useDebounce(searchInput, 500);
  const windowWidth = useWindowWidth();
  const checkTrialStatus = useCheckTrialStatus();
  const [desc, setDesc] = useState(null);

  // New states

  const [tableData, setTableData] = useState([]);
  const [pageLoang, setpageLoang] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [count, setCount] = useState();
  const [sortState2, setSortState2] = useState({
    head: null,
    sortOrder: false,
  });

  const [technicalData, setTechnicalData] = useState([]);

  // New states

  const getFreeData = async () => {
    setpageLoang(true);

    const modifiedSortState = {
      ...sortState2,
      head:
        sortState2.head === "updown" ? "percentage_change" : sortState2.head,
    };

    await getResearchReportsFree(modifiedSortState, page, perPage)
      .then((resp) => {
        // setData(resp);

        // const modifiedData = flattenReports(resp?.data?.results);

        setTableData(resp?.data?.results);

        setpageLoang(false);
        setCount(resp?.data?.count);
      })
      .catch(() => {
        setpageLoang(false);
      });
  };

  useEffect(() => {
    const getTechnicalData = async () => {
      const response = await fetchTechnicalChart();
      setTechnicalData(response?.data?.results);
    };
    getTechnicalData();
  }, []);

  useEffect(() => {
    getFreeData();
  }, [sortState2, page, perPage]);

  useEffect(() => {
    const plan = UserAuth?.userData?.user?.plan;

    if (plan) {
      const hasPlus = plan?.planId?.includes("_plus");
      setIsPremiumPlus(hasPlus);
    }
  }, [UserAuth?.userData?.user?.plan]);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchList = async () => {
      const res = await getIpoList_v2(
        debouncedSearchTerm,
        sortState,
        date,
        year
      );

      setResearchReports(res?.data?.report_data);
      setYearsAvailable(res?.data?.years);
    };

    fetchList();
  }, [debouncedSearchTerm, sortState, date, year]);

  const breadCrumbData = [{ label: "Dashboard", link: `/dashboard` }];

  const meta = generateMetaDataWithoutAggregate(
    "Research Reports - Stocks, IPOs & Markets by Trade Brains Portal",
    "Get top-quality research reports on upcoming IPOs, stocks, RBI monetary policy, union budget and many more. Access exclusive insights on fresh IPOs and OFS plus expert recommendations on whether to buy, sell, or hold stocks at Trade Brains Portal.",
    "stock research reports, stock advice, best stock to buy now, best stock to sell now, best stock advice, best stock advisor, broker research Reports, , Share Research Reports,Indian Shares Research Reports, Indian Stocks research reports, stock market recommendations, stock market research reports, Stock research reports today, expert stock research reports, expert advice on stocks, ipo research reports, stock recommendation, stock recommendation reports, brokerage research repots, equity research reports, rbi monetory policy, union budget",
    "https://portal.tradebrains.in/research-reports",
    "https://tradebrains.in/features/wp-content/uploads/2022/07/Portal-Logo-Cover-Image.jpg"
  );

  const getLastIndex = (category) => {
    if (category === "technicals") {
      if (windowWidth > 1500) {
        return 5;
      } else if (windowWidth > 1200) {
        return 4;
      } else if (windowWidth > 1024) {
        return 3;
      } else if (windowWidth > 600) {
        return 2;
      } else {
        return 1;
      }
    } else {
      if (windowWidth > 1200) {
        return 5;
      } else if (windowWidth > 1024) {
        return 4;
      } else if (windowWidth > 600) {
        return 3;
      } else {
        return 2;
      }
    }
  };

  return (
    <MainLayout>
      <Head>
        <meta charSet="utf-8" />

        <title>{meta.title}</title>

        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />

        <meta property="og:title" content={meta.openGraph.title} />
        <meta property="og:description" content={meta.openGraph.description} />
        <meta property="og:site_name" content={meta.openGraph.siteName} />
        <meta name="robots" content={meta.robots} />
        <meta name="author" content={meta.author} />
        <meta name="publisher" content={meta.publisher} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={meta.openGraph.url} />

        <meta name="twitter:card" content={meta.twitter.card} />
        <meta name="twitter:title" content={meta.twitter.title} />
        <meta name="twitter:description" content={meta.twitter.description} />
        {meta.openGraph.images && (
          <meta property="og:image" content={meta.openGraph.images[0].url} />
        )}
        {meta.twitter.images && (
          <meta name="twitter:image" content={meta.twitter.images[0]} />
        )}
        <link rel="canonical" href={meta.openGraph.canonical} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(meta.schemaOrg),
          }}
        />
      </Head>
      <div
        className={`ff-poppins ${
          lightMode
            ? styles.main_report_2_container_light
            : styles.main_report_2_container
        }`}
      >
        <div className={style.bread_container}>
          <BreadCrumb linkData={breadCrumbData} current={`Research Reports`} />
        </div>
        <div className={lightMode ? style.container_light : style.container}>
          <p className={style.title}>Research Report</p>
          <p className={style.description}>
            Latest stock research reports featuring buy, hold, and sell
            recommendations and trading ideas from research analysts of Trade
            Brains Portal to make the best investment choices
          </p>

          <div>
            <span className="fs-s-16 fw-600">Managed By</span>

            {windowWidth < 768 ? (
              <div className={style.profile_container}>
                <div
                  className={
                    lightMode ? style.profile_card_light : style.profile_card
                  }
                >
                  <Image
                    src={"/images/others/img_anushka.png"}
                    width={150}
                    height={170}
                    alt="profile_img"
                    // className="w-100"
                  />
                  <div className={style.profile_details}>
                    <span className="fs-s-16 fw-500 text-align-center">
                      Anoushka Roy
                    </span>
                    <span className={style.profile_title}>
                      Head of research
                    </span>
                    <div
                      className={style.detailed_desc}
                      onClick={() => setDesc(1)}
                    >
                      View more
                    </div>
                  </div>
                </div>
                <div
                  className={
                    lightMode ? style.profile_card_light : style.profile_card
                  }
                >
                  <Image
                    src={"/images/others/img_shashi.png"}
                    width={150}
                    height={170}
                    alt="profile_img"
                    // className="w-100"
                  />

                  <div className={style.profile_details}>
                    <span className="fs-s-16 fw-500 text-align-center">
                      Shashi Kumar
                    </span>
                    <span className={style.profile_title}>
                      Research Analyst
                    </span>
                    <div
                      className={style.detailed_desc}
                      onClick={() => setDesc(2)}
                    >
                      View more
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={style.profile_container}>
                <div
                  className={
                    lightMode ? style.profile_card_light : style.profile_card
                  }
                >
                  <Image
                    src={"/images/others/img_anushka.png"}
                    width={150}
                    height={170}
                    alt="profile_img"
                    // className="w-100"
                  />
                  <div className={style.profile_details}>
                    <span className="fs-s-16 fw-500">Anoushka Roy</span>
                    <span className={style.profile_title}>
                      Head of research
                    </span>
                    <div>
                      <span
                        className={
                          lightMode
                            ? style.desc_summary_light
                            : style.desc_summary
                        }
                      >
                        With 5+ years of experience, she has spearheaded the
                        creation of high-conviction stock picks, seasonal and
                        thematic stocks, and technical analysis. Her strong
                        analytical acumen and data-driven insights have
                        empowered investors to identify high-quality
                        opportunities and make informed, confident investment
                        decisions.
                      </span>
                      <span
                        className={style.detailed_desc}
                        onClick={() => setDesc(1)}
                      >
                        View more...
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className={
                    lightMode ? style.profile_card_light : style.profile_card
                  }
                >
                  <Image
                    src={"/images/others/img_shashi.png"}
                    width={150}
                    height={170}
                    alt="profile_img"
                    // className="w-100"
                  />

                  <div className={style.profile_details}>
                    <span className="fs-s-16 fw-500">Shashi Kumar</span>
                    <span className={style.profile_title}>
                      Research Analyst
                    </span>
                    <div>
                      <span
                        className={
                          lightMode
                            ? style.desc_summary_light
                            : style.desc_summary
                        }
                      >
                        Expert in delivering data-driven insights for long-term
                        investors through financial statement analysis and
                        valuation techniques in various sectors. He is
                        proficient in preparing detailed equity research
                        reports, technical analysis, and IPO analyses.
                      </span>
                      <span
                        className={style.detailed_desc}
                        onClick={() => setDesc(2)}
                      >
                        View more...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Mobile View */}
          </div>
        </div>

        {/* WALL OF PROFIT */}
        {tableData?.length > 0 && (
          <div>
            <span
              className="fs-s-16 fw-600"
              style={{
                marginLeft: "16px",
              }}
            >
              Wall of Profit
            </span>
            <CustomReportTable
              lightMode={lightMode}
              tableData={tableData}
              page={page}
              perPage={perPage}
              setPage={setPage}
              setPerPage={setPerPage}
              count={count}
              // setCount={setCount}
              loading={pageLoang}
              sortState={sortState2}
              setSortState={setSortState2}
              isWallOfProfit={true}
              visible={visible}
              setVisible={setVisible}
              isTrialOver={checkTrialStatus()}
            />
          </div>
        )}

        {/* WALL OF PROFIT */}

        <div>
          <div
            className={lightMode ? style.container_light2 : style.container2}
          >
            <div
              style={{
                height: windowWidth < 768 ? "100px" : "50px",
                borderRadius: "20px",
              }}
            >
              <SearchFilter
                lightMode={lightMode}
                setSearchInput={setSearchInput}
                setSortState={setSortState}
                setDate={setDate}
                searchInput={searchInput}
                setYear={setYear}
                years={yearsAvailable}
              />
            </div>
          </div>

          {researchReports && researchReports["Technicals"]?.length > 0 && (
            <div
              className={lightMode ? style.container_light : style.container}
            >
              <div className="d-flex justify-content-between align-items-center">
                <span className={style.card_title}>Technical Reports</span>

                <Link href="/research-reports/technicals-reports">
                  <span
                    className={
                      lightMode ? style.link_premium_light : style.link_premium
                    }
                  >
                    View All
                  </span>
                </Link>
              </div>
              <h3 className={styles.section_heading}>
                Daily Technical Analysis on Nifty, Bank Nifty & Sensex
              </h3>
              <p className={styles.section_desc}>
                Stay ahead with our daily technical reports covering key market
                indices like Nifty, Bank Nifty, and Sensex. We offer detailed
                chart-based analysis, trend identification, support/resistance
                levels, and momentum indicators to help you understand market
                movements better.
              </p>
              <div className={style.card_grid_container}>
                {technicalData
                  ?.slice(0, getLastIndex("technicals"))
                  ?.map((reports, i) => (
                    <ResearchReport
                      key={reports.name || i}
                      reports={reports}
                      lightMode={lightMode}
                      isPremiumPlus={isPremiumPlus}
                      setVisible={setVisible}
                      type="technicals"
                    />
                  ))}
              </div>
            </div>
          )}

          {researchReports && researchReports["Monthly Picks"]?.length > 0 && (
            <div
              className={lightMode ? style.container_light : style.container}
            >
              <div className="d-flex justify-content-between align-items-center">
                <span className={style.card_title}>Monthly Stock Picks</span>

                <Link href="/research-reports/monthly-stock-picks">
                  <span
                    className={
                      lightMode ? style.link_premium_light : style.link_premium
                    }
                  >
                    View All
                  </span>
                </Link>
              </div>
              <h3 className={styles.section_heading}>
                Handpicked Stock Ideas Every Month Based on Growth & Valuation
              </h3>
              <p className={styles.section_desc}>
                Each month, we identify one stock pick per category – Large Cap,
                Mid Cap, Small Cap, and Dividend – that stands out based on
                strong fundamentals, growth potential, and relative valuations.
                These picks are curated after in-depth analysis by our research
                team.
              </p>
              <div className={style.card_grid_container}>
                {researchReports["Monthly Picks"]
                  ?.slice(0, getLastIndex())
                  ?.map((reports, i) => (
                    <ResearchReport
                      key={reports.name || i}
                      reports={reports}
                      lightMode={lightMode}
                      isPremiumPlus={isPremiumPlus}
                      setVisible={setVisible}
                    />
                  ))}
              </div>
            </div>
          )}

          {researchReports &&
            researchReports["Research reports"]?.length > 0 && (
              <div
                className={lightMode ? style.container_light : style.container}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span className={style.card_title}>Seasonal Stock Picks</span>

                  <Link href="/research-reports/seasonal-stock-picks">
                    <span
                      className={
                        lightMode
                          ? style.link_premium_light
                          : style.link_premium
                      }
                    >
                      View All
                    </span>
                  </Link>
                </div>
                <h3 className={styles.section_heading}>
                  Theme-Based Investment Ideas for Dynamic Market Conditions
                </h3>
                <p className={styles.section_desc}>
                  Get actionable insights with our seasonal and thematic stock
                  reports. Whether it’s the onset of monsoon, geopolitical
                  developments, budget announcements, or interest rate changes –
                  our team curates stocks that are most likely to benefit from
                  such macro triggers.
                </p>
                <div className={style.card_grid_container}>
                  {researchReports["Research reports"]
                    ?.slice(0, getLastIndex())
                    ?.map((reports, i) => (
                      <ResearchReport
                        key={reports.name || i}
                        reports={reports}
                        lightMode={lightMode}
                        isPremiumPlus={isPremiumPlus}
                        setVisible={setVisible}
                      />
                    ))}
                </div>
              </div>
            )}
          {researchReports && researchReports["IPO reports"]?.length > 0 && (
            <div
              className={lightMode ? style.container_light : style.container}
            >
              <div className="d-flex justify-content-between align-items-center">
                <span className={style.card_title}>IPO Reports</span>

                <Link href="/research-reports/ipo-reports">
                  <span
                    className={
                      lightMode ? style.link_premium_light : style.link_premium
                    }
                  >
                    View All
                  </span>
                </Link>
              </div>
              <h3 className={styles.section_heading}>
                Independent Research on Upcoming IPOs in India
              </h3>
              <p className={styles.section_desc}>
                Our IPO reports provide a comprehensive overview of upcoming
                public offerings – covering company background, financials,
                business model, competitive positioning, and valuation analysis.
                These reports aim to help investors make informed decisions on
                IPO subscriptions.
              </p>
              <div className={style.card_grid_container}>
                {researchReports["IPO reports"]
                  ?.slice(0, getLastIndex())
                  ?.map((reports, i) => (
                    <ResearchReport
                      key={reports.name || i}
                      reports={reports}
                      lightMode={lightMode}
                      isPremiumPlus={isPremiumPlus}
                      setVisible={setVisible}
                    />
                  ))}
              </div>
            </div>
          )}

          {desc && <ProfileDescription toggle={desc} setToggle={setDesc} />}

          <PremiumTrialModal
            visible={visible}
            setVisible={setVisible}
            isTrialOver={checkTrialStatus()}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default index;
