import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import MainLayout from "../../../components/MainLayout/MainLayout";
import {
  fetchTechnicalChart,
  getIpoList_v2,
  getReportsFree,
  getResearchReportsFree,
} from "../../api/fetchClient";
import ResearchReport from "../../../components/StockResearchReport/Ipo/ResearchReportCard";
import { getThemeMode } from "../../../redux/reducers/ThemeSlice";
import { useSelector } from "react-redux";
import SearchFilter from "../../../components/StockResearchReport/Ipo/SearchFilter";
import { generateMetaDataWithoutAggregate } from "../../../utilityFn/metadataWithoutAgreegate";
import Head from "next/head";
import { authStore } from "../../../redux/reducers/authSlice";
import PremiumPlusReportModal from "../../../components/StockResearchReport/PremiumPlusReportModal";
import Link from "next/link";
import { useRouter } from "next/router";
import useDebounce from "../../../utilityFn/debounce";
import PremiumTrialModal from "../../../components/Popups/PremiumTrialModal";
import useCheckTrialStatus from "../../../hooks/useCheckTrialStatus";
import CustomReportTable from "../../../components/ResearchReports/CustomTable/CustomReportTable";
import Image from "next/image";
import style from "../research-reports.module.css";
import style2 from "./category.module.css";
import styles from "../../../components/StockResearchReport/report.module.css";
import ProfileDescription from "../../../components/ResearchReports/ProfileDescription/ProfileDescription";
import useWindowWidth from "../../../utilityFn/getWindowWidth";
import CustomPagination from "../../../components/ant/CustomPagination";
import { animateScroll } from "react-scroll";
import AllPageAds from "../../../components/AdsComp/AllPageAds";

const categoryMap = {
  "ipo-reports": "IPO reports",
  "seasonal-stock-picks": "Research reports",
  "technicals-reports": "Technicals",
  "monthly-stock-picks": "Monthly Picks",
};

const breadCrumbData = [
  { label: "Dashboard", link: `/dashboard` },
  { label: "Research Reports", link: `/research-reports` },
];

const meta = generateMetaDataWithoutAggregate(
  "Research Reports - Stocks, IPOs & Markets by Trade Brains Portal",
  "Get top-quality research reports on upcoming IPOs, stocks, RBI monetary policy, union budget and many more. Access exclusive insights on fresh IPOs and OFS plus expert recommendations on whether to buy, sell, or hold stocks at Trade Brains Portal.",
  "stock research reports, stock advice, best stock to buy now, best stock to sell now, best stock advice, best stock advisor, broker research Reports, , Share Research Reports,Indian Shares Research Reports, Indian Stocks research reports, stock market recommendations, stock market research reports, Stock research reports today, expert stock research reports, expert advice on stocks, ipo research reports, stock recommendation, stock recommendation reports, brokerage research repots, equity research reports, rbi monetory policy, union budget",
  "https://portal.tradebrains.in/research-reports",
  "https://tradebrains.in/features/wp-content/uploads/2022/07/Portal-Logo-Cover-Image.jpg",
);

const index = () => {
  const { lightMode } = useSelector(getThemeMode);
  const router = useRouter();

  const [researchReports, setResearchReports] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [sortState, setSortState] = useState();
  const [date, setDate] = useState();
  const UserAuth = useSelector(authStore);
  const [isPremiumPlus, setIsPremiumPlus] = useState(false);
  const [year, setYear] = useState("");
  const [yearsAvailable, setYearsAvailable] = useState([]);
  const debouncedSearchTerm = useDebounce(searchInput, 500);
  const checkTrialStatus = useCheckTrialStatus();
  const [desc, setDesc] = useState(null);
  const windowWidth = useWindowWidth();

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

  // Add new states at the top with your other states
  const [page2, setPage2] = useState(1);
  const [perPage2, setPerPage2] = useState(12);
  const [technicalCount, setTechnicalCount] = useState(0); // To store total count
  // New states

  useEffect(() => {
    const getTechnicalData = async () => {
      const response = await fetchTechnicalChart(null, null, page2, perPage2);
      setTechnicalData(response?.data?.results);
      setTechnicalCount(response?.data?.count || 0); // Assuming API returns count
    };
    getTechnicalData();
  }, [page2, perPage2]); // Add dependencies

  const getFreeData = async () => {
    setpageLoang(true);

    const modifiedSortState = {
      ...sortState2,
      head:
        sortState2.head === "updown" ? "percentage_change" : sortState2.head,
    };

    const tempCategory =
      router.query.category === "monthly-stock-picks" ? "monthly" : "research";

    await getResearchReportsFree(modifiedSortState, page, perPage, tempCategory)
      .then((resp) => {
        // setData(resp);

        // const modifiedData = flattenReports(resp?.data?.results);

        setTableData(resp?.data?.results);

        setpageLoang(false);
        setCount(resp?.data?.count);
      })
      .catch(() => null);
  };

  useEffect(() => {
    if (
      router.query.category === "monthly-stock-picks" ||
      router.query.category === "seasonal-stock-picks"
    ) {
      getFreeData();
    }
  }, [sortState2, page, perPage, router]);

  useEffect(() => {
    const plan = UserAuth?.userData?.user?.plan;

    if (plan) {
      const hasPlus = plan?.planId?.includes("_plus");
      const hasSname = ["Whales", "Unlimited"].includes(plan?.sname);
      setIsPremiumPlus(hasPlus || hasSname);
    }
  }, [UserAuth?.userData?.user?.plan]);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchList = async () => {
      if (router.query.category === "technicals-reports") {
        const response = await fetchTechnicalChart(
          debouncedSearchTerm,
          sortState,
        );

        setTechnicalData(response?.data?.results);
      } else {
        const res = await getIpoList_v2(
          debouncedSearchTerm,
          sortState,
          date,
          year,
        );

        setResearchReports(res?.data?.report_data);
        setYearsAvailable(res?.data?.years);
      }
    };

    fetchList();
  }, [debouncedSearchTerm, sortState, date, year]);

  const getTitleAndDescription = () => {
    const category = router?.query?.category;

    if (category === "technicals-reports") {
      return {
        name: "Technical Reports",
        title: "",
        description:
          "Daily chart pattern and price action insights covering trends, momentum signals, and key support and resistance levels, designed to help you better understand price movements.",
      };
    } else if (category === "monthly-stock-picks") {
      return {
        name: "Monthly Stock Picks",
        title: "Handpicked Stock Ideas Every Month Based on Growth & Valuation",
        description:
          "Each month, we identify one stock pick per category – Large Cap, Mid Cap, Small Cap, and Dividend – that stands out based on strong fundamentals, growth potential, and relative valuations. These picks are curated after in-depth analysis by our research team.",
      };
    } else if (category === "seasonal-stock-picks") {
      return {
        name: "Seasonal Stock Picks",
        title: "Theme-Based Investment Ideas for Dynamic Market Conditions",
        description:
          "Get actionable insights with our seasonal and thematic stock reports. Whether it’s the onset of monsoon, geopolitical developments, budget announcements, or interest rate changes – our team curates stocks that are most likely to benefit from such macro triggers.",
      };
    } else if (category === "ipo-reports") {
      return {
        name: "IPO Reports",
        title: "Independent Research on Upcoming IPOs in India",
        description:
          "Our IPO reports provide a comprehensive overview of upcoming public offerings – covering company background, financials, business model, competitive positioning, and valuation analysis. These reports aim to help investors make informed decisions on IPO subscriptions.",
      };
    }

    return { name: "", title: "", description: "" };
  };

  const getCategoryKey = () => {
    const category = router?.query?.category;
    return categoryMap[category] || "";
  };

  const customTableCategory = ["seasonal-stock-picks", "monthly-stock-picks"];

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
          <BreadCrumb
            linkData={breadCrumbData}
            current={getTitleAndDescription().name}
          />
        </div>

        <div className={lightMode ? style.container_light : style.container}>
          {(() => {
            const { name, title, description } = getTitleAndDescription();
            return (
              <>
                <span className={style.card_title}>{name}</span>
                <h3 className="mt-5 fw-500">{title}</h3>
                <p className="mt-10">{description}</p>
              </>
            );
          })()}
          <AllPageAds page="research-reports" />
          <div>
            <span className="fs-s-16 fw-600">Managed By</span>
            <div className={style2.profile_container}>
              {router.query?.category === "monthly-stock-picks" ||
              router.query?.category === "seasonal-stock-picks" ? (
                <div>
                  {windowWidth < 768 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        backgroundColor: lightMode ? "#FFF" : "#131315",
                        borderRadius: "8px",
                        padding: "8px",
                      }}
                    >
                      <div
                        className={
                          lightMode
                            ? style2.profile_card_light
                            : style2.profile_card
                        }
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: "50%",
                            gap: "10px",
                          }}
                        >
                          <Image
                            src={"/images/others/img_anushka.png"}
                            width={160}
                            height={160}
                            alt="profile_img"
                          />
                          <span className="fs-s-16 fw-500 mb-10">
                            Anoushka Roy
                          </span>
                        </div>
                        <div className={style2.profile_details}>
                          <span className={style2.profile_title}>
                            Head of research
                          </span>
                          <div>
                            <span
                              className={
                                lightMode
                                  ? style2.desc_summary_light
                                  : style2.desc_summary
                              }
                            >
                              With 5+ years of experience, she has spearheaded
                              the creation of high-conviction stock picks,
                              seasonal and thematic stocks, and technical
                              analysis. Her strong analytical acumen and
                              data-driven insights have empowered investors to
                              identify high-quality opportunities and make
                              informed, confident investment decisions.
                            </span>
                          </div>
                        </div>
                      </div>
                      <span
                        className={style2.detailed_desc}
                        onClick={() => setDesc(1)}
                      >
                        View more...
                      </span>
                    </div>
                  ) : (
                    <div
                      className={
                        lightMode
                          ? style2.profile_card_light
                          : style2.profile_card
                      }
                    >
                      <Image
                        src={"/images/others/img_anushka.png"}
                        width={110}
                        height={110}
                        alt="profile_img"
                      />
                      <div className={style2.profile_details}>
                        <span className="fs-s-16 fw-500">Anoushka Roy</span>
                        <span className={style2.profile_title}>
                          Head of research
                        </span>
                        <div>
                          <span
                            className={
                              lightMode
                                ? style2.desc_summary_light
                                : style2.desc_summary
                            }
                          >
                            With 5+ years of experience, she has spearheaded the
                            creation of high-conviction stock picks, seasonal
                            and thematic stocks, and technical analysis. Her
                            strong analytical acumen and data-driven insights
                            have empowered investors to identify high-quality
                            opportunities and make informed, confident
                            investment decisions.
                            <span
                              className={style2.detailed_desc}
                              onClick={() => setDesc(1)}
                            >
                              View more...
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {windowWidth < 768 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        backgroundColor: lightMode ? "#FFF" : "#131315",
                        borderRadius: "8px",
                        padding: "8px",
                      }}
                    >
                      <div
                        className={
                          lightMode
                            ? style2.profile_card_light
                            : style2.profile_card
                        }
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: "50%",
                            gap: "10px",
                          }}
                        >
                          <Image
                            src={"/images/others/img_shashi.png"}
                            width={160}
                            height={160}
                            alt="profile_img"
                          />
                          <span className="fs-s-16 fw-500 mb-10">
                            Shashi Kumar
                          </span>
                        </div>
                        <div className={style2.profile_details}>
                          <span className={style2.profile_title}>
                            Research Analyst
                          </span>
                          <div>
                            <span
                              className={
                                lightMode
                                  ? style2.desc_summary_light
                                  : style2.desc_summary
                              }
                            >
                              Expert in delivering data-driven insights for
                              long-term investors through financial statement
                              analysis and valuation techniques in various
                              sectors. He is proficient in preparing detailed
                              equity research reports, technical analysis, and
                              IPO analyses.
                            </span>
                          </div>
                        </div>
                      </div>
                      <span
                        className={style2.detailed_desc}
                        onClick={() => setDesc(2)}
                      >
                        View more...
                      </span>
                    </div>
                  ) : (
                    <div
                      className={
                        lightMode
                          ? style2.profile_card_light
                          : style2.profile_card
                      }
                    >
                      <Image
                        src={"/images/others/img_shashi.png"}
                        width={110}
                        height={110}
                        alt="profile_img"
                      />
                      <div className={style2.profile_details}>
                        <span className="fs-s-16 fw-500">Shashi Kumar</span>
                        <span className={style2.profile_title}>
                          Research Analyst
                        </span>

                        <span
                          className={
                            lightMode
                              ? style2.desc_summary_light
                              : style2.desc_summary
                          }
                        >
                          Expert in delivering data-driven insights for
                          long-term investors through financial statement
                          analysis and valuation techniques in various sectors.
                          He is proficient in preparing detailed equity research
                          reports, technical analysis, and IPO analyses.
                          <span
                            className={style2.detailed_desc}
                            onClick={() => setDesc(2)}
                          >
                            View more...
                          </span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {customTableCategory.includes(router?.query?.category) &&
          tableData?.length > 0 && (
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

        <div className={lightMode ? style.container_light : style.container}>
          <div
            style={{
              height: windowWidth < 768 ? "100px" : "40px",
              // backgroundColor: "#212639",
              padding: "0",
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

          <div className={style.card_grid_container_category}>
            {getCategoryKey() === "Technicals" &&
              technicalData?.map((reports, i) => (
                <ResearchReport
                  key={reports.name || i}
                  reports={reports}
                  lightMode={lightMode}
                  isPremiumPlus={isPremiumPlus}
                  setVisible={setVisible}
                  type={"technicals"}
                />
              ))}
          </div>

          {/* {getCategoryKey() === "Technicals" && (
            <div className={style2.pagination_wrapper}>
              {technicalCount > perPage2 && (
                <div className={style2.pagination_container}>
                  <button
                    onClick={() => setPage2((prev) => Math.max(1, prev - 1))}
                    disabled={page2 === 1}
                    className={`${style2.pagination_btn} ${
                      lightMode
                        ? style2.pagination_btn_light
                        : style2.pagination_btn_dark
                    }`}
                  >
                    Previous
                  </button>
                  <span className={style2.pagination_text}>
                    Page {page2} of {Math.ceil(technicalCount / perPage2)}
                  </span>
                  <button
                    onClick={() => setPage2((prev) => prev + 1)}
                    disabled={page2 >= Math.ceil(technicalCount / perPage2)}
                    className={`${style2.pagination_btn} ${
                      lightMode
                        ? style2.pagination_btn_light
                        : style2.pagination_btn_dark
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )} */}

          {getCategoryKey() === "Technicals" && (
            <div className={style2.pagination_wrapper}>
              <CustomPagination
                current={page2}
                // showQuickJumper={true}
                lightMode={lightMode}
                onChange={(num, perPage) => {
                  setPage2(num);
                  setPerPage2(perPage);
                  animateScroll.scrollTo(110, 0);
                }}
                total={technicalCount}
                pageSize={perPage2}
              />
            </div>
          )}

          <div className={style.card_grid_container_category}>
            {researchReports &&
              getCategoryKey() !== "Technicals" &&
              researchReports[getCategoryKey()]?.map((reports, i) => (
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

        {desc && <ProfileDescription toggle={desc} setToggle={setDesc} />}

        <PremiumTrialModal
          visible={visible}
          setVisible={setVisible}
          isTrialOver={checkTrialStatus()}
        />
      </div>
    </MainLayout>
  );
};

export default index;
