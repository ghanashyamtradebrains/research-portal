import { useSelector } from "react-redux";
import { useState } from "react";
import MainLayout from "../../components/MainLayout/MainLayout";
import Head from "next/head";
import BreadCrumb from "../../components/BreadCrumb";
import { getThemeMode } from "../../redux/reducers/ThemeSlice";
import style from "../research-reports/research-reports.module.css";
// import style2 from "../research-reports/[category]/category.module.css"
import style2 from "./Smallcase.module.css";
import Image from "next/image";
import styles from "../../components/StockResearchReport/report.module.css";
import SmallCaseCards from "../../components/SmallCaseCards/smallCaseCards";
import useWindowWidth from "../../utilityFn/getWindowWidth";
import ProfileDescription from "../../components/ResearchReports/ProfileDescription/ProfileDescription";
import SmallCaseProfileDescription from "../../components/SmallCaseCards/smallCaseProfileDescription/SmallCaseProfileDescription";
import { generateMetaDataWithoutAggregate } from "../../utilityFn/metadataWithoutAgreegate";
import AllPageAds from "../../components/AdsComp/AllPageAds";
function SmallCase() {
  const { lightMode } = useSelector(getThemeMode);
  const breadCrumbData = [{ label: "Dashboard", link: `/dashboard` }];
  const [desc, setDesc] = useState(null);
  const windowWidth = useWindowWidth();
  const [content, setContent] = useState(false);

  const descData = `Trade Brains Portal offers a range of curated smallcases designed to suit different investor profiles and risk appetites. For risk-averse investors, we provide bluechip and stable smallcases focused on consistent returns and strong fundamentals. For aggressive investors, we offer fast-growth smallcases built around high-potential emerging companies. Additionally, we provide balanced smallcases that combine both growth and stability to help mitigate risks. Depending on their goals and preferences, investors can choose the smallcase that best aligns with their investment strategy.`;

  const meta = generateMetaDataWithoutAggregate(
    "Trade Brains Portal Smallcase",
    "Trade Brains Portal offers a range of curated smallcases designed to suit different investor profiles and risk appetites. For risk-averse investors, we provide bluechip and stable smallcases focused on consistent returns and strong fundamentals. For aggressive investors, we offer fast-growth smallcases built around high-potential emerging companies. Additionally, we provide balanced smallcases that combine both growth and stability to help mitigate risks. Depending on their goals and preferences, investors can choose the smallcase that best aligns with their investment strategy.",
    "smallcase",
    `https://portal.tradebrains.in/smallcase`,
    "https://tradebrains.in/features/wp-content/uploads/2022/07/Portal-Logo-Cover-Image.jpg",
  );

  const fullText = `
  Anoushka Roy is the Head of Research and a SEBI-Registered Research Analyst at Trade Brains Portal (Dailyraven Technologies Pvt. Ltd.). 
  With over eight years of experince in the stock market and five years of hands-on experience in heading equity research segment at tradebrains, 
  she has led the development of high-conviction stock picks, seasonal and thematic portfolios, and in-depth IPO reports. 
  Anoushka’s analytical expertise and data-driven approach help investors discover quality opportunities and make confident, well-researched investment decisions.
`;

  const MAX_CHARS = windowWidth < 768 ? 100 : 310;

  const shortText =
    fullText.length > MAX_CHARS
      ? fullText.substring(0, MAX_CHARS) + ".."
      : fullText;

  const shortDesc =
    descData.length > MAX_CHARS
      ? descData.substring(0, MAX_CHARS) + ".."
      : descData;

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
          <BreadCrumb linkData={breadCrumbData} current={"Equity Portfolios"} />
        </div>

        <div className={lightMode ? style.container_light : style.container}>
          <h1 className={style.card_title}>Equity Portfolio Baskets</h1>
          <span className={styles.shortDesc}>{shortDesc}</span>
          {shortDesc.length > MAX_CHARS && (
            <span
              className={style2.detailed_desc}
              onClick={() => {
                setDesc(true);
                setContent(true);
              }}
            >
              view more
            </span>
          )}
          <AllPageAds page="smallcase" />
          <div>
            <p className="fs-s-16 fw-600 mt-10">Managed By</p>
            <div className={style2.profile_container}>
              <div>
                {windowWidth < 768 ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      backgroundColor: lightMode ? "#FFF" : "#292e3f",
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
                          Head of research (8+ years of experience)
                        </span>

                        <div>
                          <span
                            className={
                              lightMode
                                ? style2.desc_summary_light
                                : style2.desc_summary
                            }
                          >
                            {shortText}
                          </span>
                        </div>
                      </div>
                    </div>
                    {fullText.length > MAX_CHARS && (
                      <span
                        className={style2.detailed_desc}
                        onClick={() => {
                          setDesc(true);
                          setContent(false);
                        }}
                      >
                        View more
                      </span>
                    )}
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
                        Head of research(8+ years of experience)
                      </span>
                      <div className={style2.profile_details}>
                        <div>
                          <span
                            className={
                              lightMode
                                ? style2.desc_summary_light
                                : style2.desc_summary
                            }
                          >
                            {shortText}
                          </span>
                          {fullText.length > MAX_CHARS && (
                            <span
                              className={style2.detailed_desc}
                              onClick={() => {
                                setDesc(true);
                                setContent(false);
                              }}
                            >
                              view more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <SmallCaseCards />
      </div>
      {desc && (
        <SmallCaseProfileDescription
          toggle={desc}
          setToggle={setDesc}
          fullText={content}
        />
      )}
    </MainLayout>
  );
}

export default SmallCase;
