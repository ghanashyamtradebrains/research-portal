import React, { useEffect, useState, useRef } from "react";
import { Table } from "antd";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../../assets/images/PortalLogo.png";
import commaWihNumber from "../../../utilityFn/commaWithNumber";
import svgSheet from "../../../assets/svg/svgSheet";
import BreadCrumb from "../../../components/BreadCrumb";
import { useSelector } from "react-redux";
import { authStore } from "../../../redux/reducers/authSlice";
import PerformanceGraph from "../../../components/home/components/PerformanceGraph";
import styles from "./report.module.css";
import svgSheet5 from "../../../assets/svg/svgSheet5";
import stockIcon from "../../../assets/images/portalFavICon.png";
import portalIcon from "../../../assets/images/logo/logoWhite.png";

const displayNameMap = {
  promoters: "Promoters",
  share_holding_pledge: "Share Holding Pledge",
  fii: "FII",
  public: "Public",
  total_dii: "Total DII",
};
const breadCrumbData = [
  { label: "Stock Research Report", link: `/stock-research-report` },
];
// Transform the data into table format
const transformData = (data) => {
  if (!data) return { columns: [], rows: [] };
  const navigate = useRouter();
  const columns = [
    {
      title: "PARTICULARS",
      dataIndex: "particular",
      key: "particular",
      width: 150,
    },
  ];

  const rows = Object.keys(displayNameMap).map((item) => ({
    key: item,
    particular: displayNameMap[item],
  }));

  Object.keys(data).forEach((key) => {
    const year = data[key].year.toString().slice(0, 4);
    const month = data[key].year.toString().slice(4, 6);
    const monthYear =
      new Date(year, month - 1)
        .toLocaleString("default", { month: "short" })
        .toUpperCase() +
      " " +
      year.slice(-2);

    columns.push({ title: monthYear, dataIndex: key, key: key });

    rows.forEach((row) => {
      row[key] = data[key][row.key];
    });
  });

  return { columns, rows };
};

const transformDataIndex = (data, p_data) => {
  if (!data) return { columns: [], rows: [] };

  // Initialize columns with the headers for Supreme and Nifty
  const columns = [
    {
      title: "PARTICULARS",
      dataIndex: "particular",
      key: "particular",
      width: 150,
    },
    {
      title: p_data?.symbol,
      dataIndex: "supreme",
      key: "supreme",
      width: 150,
    },
    {
      title:
        p_data?.index_symbol === "NIFTY" ? "NIFTY50" : p_data?.index_symbol,
      dataIndex: "nifty",
      key: "nifty",
      width: 150,
    },
  ];

  // Initialize rows with the years and CAGR
  const rows = Object.keys(data).map((year) => ({
    key: year,
    particular: year === "cagr" ? "3Y CAGR" : year === "2024" ? "YTD" : year,
    supreme: `${data[year]["stock_return"]}%`,
    nifty: `${data[year]["index_return"]}%`,
  }));

  return { columns, rows };
};

function Report({ previewData, errorData }) {
  const router = useRouter();
  const userData = useSelector(authStore);
  const contentRef = useRef();
  const [stockCPM, setStockCPM] = useState();
  const [symbol, setSymbol] = useState();
  const [parsedOverview, setParsedOverview] = useState("");
  const [parsedInvestment_rationals, setParsedInvestment_rationals] =
    useState("");
  const [parsed_risks, setParsedRisks_nd_concerns] = useState("");
  const [parsedOutcome, setParsedOutcome] = useState("");
  const [parsedSummary, setParsedSummary] = useState("");
  const [parsedDisclaimer, setParsedDisclaimer] = useState("");
  const [srcImage, setsrcImage] = useState();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setParsedOverview(parseHTMLTable(previewData?.overview));
      setParsedInvestment_rationals(
        parseHTMLTable(previewData?.investment_rationals),
      );
      setParsedRisks_nd_concerns(
        parseHTMLTable(previewData?.risks_nd_concerns),
      );
      setParsedOutcome(parseHTMLTable(previewData?.outcome_nd_valuation));
      setParsedSummary(parseHTMLTable(previewData?.summary));
      setParsedDisclaimer(parseHTMLTable(previewData?.disclaimer));
    } else {
      setParsedOverview(previewData?.overview || ""); // Fallback for server-side rendering
      setParsedInvestment_rationals(previewData?.investment_rationals || ""); // Fallback for server-side rendering
      setParsedRisks_nd_concerns(previewData?.risks_nd_concerns || ""); // Fallback for server-side rendering
      setParsedOutcome(previewData?.outcome_nd_valuation || ""); // Fallback for server-side rendering
      setParsedSummary(previewData?.summary || ""); // Fallback for server-side rendering
      setParsedDisclaimer(previewData?.disclaimer || ""); // Fallback for server-side rendering
    }
  }, [
    previewData?.overview,
    previewData?.investment_rationals,
    previewData?.risks_nd_concerns,
    previewData?.outcome_nd_valuation,
    previewData?.summary,
    previewData?.disclaimer,
  ]);

  const parseHTMLTable = (html) => {
    const styledHTML = html
      ?.replace(
        /<img /g,
        '<img style="width: 100%; height: 100%; object-fit: cover; margin-top:8px;" ',
      )
      ?.replace(/<p /g, '<p style="font-size: 16px; margin-bottom: -5px;"');
    // ?.replace(/<span>/g, '<p style="font-size: 16px; line-height: 26px;">')
    if (typeof window !== "undefined") {
      const parser = new DOMParser();
      const doc = parser.parseFromString(styledHTML, "text/html");

      const tables = doc.querySelectorAll("table");
      tables.forEach((table) => {
        table.className = "custom-table";
        table.style.width = "100%";
        table.style.borderCollapse = "collapse";

        const rows = table.querySelectorAll("tr");
        rows.forEach((row, rowIndex) => {
          const cells = row.querySelectorAll("td, th");
          cells.forEach((cell, cellIndex) => {
            cell.style.border = "1px solid #ddd";
            cell.style.padding = "8px";
            cell.style.borderRadius = "5px";

            if (rowIndex === 0) {
              cell.style.backgroundColor = "#131311";
              cell.style.fontWeight = "bold";
            }

            if (cellIndex === 0) {
              cell.style.backgroundColor = "#131311";
              cell.style.fontWeight = "bold";
            }
          });
        });
      });

      return doc.body.innerHTML;
    } else {
      return "";
    }
  };
  const { columns, rows } = transformData(previewData?.share_holding);
  const tableData = transformDataIndex(
    previewData?.stock_index_returns,
    previewData,
  );

  useEffect(() => {
    setsrcImage(
      `https://tradebrains-portal-s3.s3.ap-south-1.amazonaws.com/NIFTY50/${previewData.symbol}.png`,
    );
  }, [previewData.symbol]);

  const ratings = [
    {
      title: "Ratings",
      value: "Expected absolute returns over 12 - 18 months",
      key: "1",
    },
    {
      title: "BUY",
      value: "More than 10%",
      key: "2",
    },
    {
      title: "HOLD",
      value: "Between 10% to -10%",
      key: "3",
    },
    {
      title: "SELL",
      value: "Less than -10%",
      key: "4",
    },
    {
      key: "5",
      title: "NOT RATED",
      value:
        "We have forward looking estimates for the stocks, but we refrain from assigning valuation and recommendation",
    },
    {
      key: "6",
      title: "UNDER REVIEW",
      value:
        "We will revisit our recommendation, valuation and estimates on the stock following recent events",
    },
    {
      key: "7",
      title: "NO STANCE",
      value:
        "We do not have any forward-looking estimates, valuation or recommendation for the stock",
    },
  ];

  return (
    <>
      <div
        className=" text-black w-100 pt-30px"
        style={{ background: "#343434" }}
      >
        <div className="ml-10 pt-30 pointer d-flex ">
          <BreadCrumb linkData={breadCrumbData} current={"Reports"} />
        </div>
        <div className={styles.main_container}>
          <div>
            <Image
              src={portalIcon}
              width="180"
              height="58"
              className={styles.stock_image}
              alt="logo"
            />
          </div>
          <div className="">
            <a
              href={previewData?.file}
              target="_blank"
              className="d-flex justify-content-end align-items-center"
            >
              <div
                className=" d-flex align-items-center justify-content-center"
                style={{
                  marginRight: "10px",
                  height: "40px",
                  width: "150px",
                  backgroundColor: "#212223",
                  color: "white",
                  borderRadius: "5px",
                }}
              >
                {svgSheet5?.researchdownload}
                Download PDF
              </div>
            </a>
          </div>
        </div>
        <div
          className="w-100 d-flex justify-content-center align-items-center flex-col "
          ref={contentRef}
        >
          <div
            ref={contentRef}
            className="w-100 mt-10 d-flex justify-content-center flex-col-row p-10"
          >
            <div className={styles.flex_top_container}>
              <div className={styles.top_left_block}>
                <div className={styles.company_header_row}>
                  <div className={styles.company_image}>
                    <Image
                      src={srcImage}
                      onError={(error) => {
                        setsrcImage(stockIcon);
                      }}
                      width="58"
                      height="58"
                      className={styles.stock_image}
                      alt="logo"
                    />
                  </div>
                  <h1 className={styles.company_name}>
                    {previewData?.comp_name}
                  </h1>
                </div>
                <div className={styles.flex_other_properties}>
                  <div className={styles.item_cont}>
                    Sector: {previewData?.sector_name}
                  </div>
                  <div className={styles.item_cont}>
                    Industry: {previewData?.industry_name}
                  </div>
                  <div className={styles.item_cont}>
                    <span>Price@Reco: </span>
                    <span className={styles.price_reco}>
                      ₹ {commaWihNumber(previewData?.price_at_rec)}
                    </span>
                  </div>
                  <div className={styles.item_cont}>
                    <span>Target Price:</span>
                    <span className={styles.target_price}>
                      {" "}
                      ₹ {commaWihNumber(previewData?.target_price)}
                    </span>
                  </div>
                  <div className={styles.item_cont}>
                    <span>Potential Returns :</span>
                    <span className={styles.potential_upside}>
                      {" "}
                      {commaWihNumber(previewData?.potential_upside)} %
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.center_align_buy}>
                <span>
                  {previewData?.recommendation === "Buy" && (
                    <span
                      className={`${"border1px-green bg-dark"}  text-white br-18 d-flex justify-content-center align-items-center fs-s-12 fw-600`}
                      style={{ width: "80px", height: "35px" }}
                    >
                      Buy
                    </span>
                  )}
                </span>
                <span>
                  {previewData?.recommendation === "Sell" && (
                    <span
                      className={`${"border1px-red "} text-white br-18 d-flex justify-content-center align-items-center fs-s-12 fw-500`}
                      style={{ width: "80px", height: "35px" }}
                    >
                      Sell
                    </span>
                  )}
                </span>
                <span>
                  {previewData?.recommendation === "Hold" && (
                    <span
                      className={`${"border1px-orange bg-dark"}  text-white br-18 d-flex justify-content-center align-items-center fs-s-12 fw-600`}
                      style={{ width: "80px", height: "35px" }}
                    >
                      Hold
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="w-100 d-flex flex-col-row justify-content-center gap-15px mt-10">
            <div className={`w-30-100 ${styles.left_container}`}>
              <p className="mb-20 fw-600 fs-18-16 report-heading">Stock Info</p>
              <div className="table-shadow p-10 br-5 bg-dark-black mb-20">
                <div className="d-flex justify-content-between align-items-center mt-10 mb-10 text-white">
                  <span>Symbol</span>
                  <span>{previewData?.symbol}</span>
                </div>
                <hr style={{ border: "1px solid #585656" }} />
                <div className="d-flex justify-content-between align-items-center mt-10 mb-10 text-white">
                  <span>CMP</span>
                  <span className="ff-lato">{previewData?.cmp}</span>
                </div>
                <hr style={{ border: "1px solid #585656" }} />
                {previewData?.financials
                  ?.filter((item) =>
                    ["pe", "mcap", "ev"].includes(item?.column_name),
                  )
                  .map((item) => (
                    <>
                      <div className="d-flex justify-content-between align-items-center mt-10 mb-10 text-white">
                        <span>{item?.display_name}</span>
                        <span className="ff-lato">
                          {item?.display_name !== "P/E Ratio" && "₹"}{" "}
                          {commaWihNumber(item?.value)}
                          {item?.display_name !== "P/E Ratio" && " Cr"}
                        </span>
                      </div>
                      <hr style={{ border: "1px solid #585656" }} />
                    </>
                  ))}
                {previewData?.price_info?.high_52w !== undefined && (
                  <div className="d-flex justify-content-between align-items-center mt-10 mb-10 text-white">
                    <span>52w H/L (Rs)</span>
                    <span className="ff-lato">
                      ₹ {previewData?.price_info?.high_52w} - ₹{" "}
                      {previewData?.price_info?.low_52w}
                    </span>
                  </div>
                )}
              </div>
              <p className="mb-20 fw-600 fs-18-16 report-heading">
                Financial Ratios
              </p>
              <div className="table-shadow p-10 br-5 bg-dark-black mb-20">
                {previewData?.financials
                  ?.filter(
                    (item) =>
                      item?.display_name !== "Enterprise Value" &&
                      item?.display_name !== "P/E Ratio" &&
                      item?.display_name !== "Market CAP",
                  )
                  ?.map((item) => {
                    return (
                      <div
                        key={item?.display_name}
                        className="d-flex justify-content-between align-items-center mt-10 mb-10 text-white"
                      >
                        <span>{item?.display_name} (TTM)</span>
                        <span className="ff-lato">
                          {item?.value === null ? "-" : item?.value?.toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
              </div>
              <p className="mb-20 fw-600 fs-18-16 report-heading">
                Shareholding Pattern
              </p>
              <div className="table-shadow p-10 mb-10 br-5 bg-dark-black mb-20 my-new-table">
                <Table
                  className="custom-table"
                  columns={columns}
                  scrollable={true}
                  dataSource={rows}
                  pagination={false}
                />
              </div>
              <p className="mb-20 fw-600 fs-18-16 report-heading">
                Indexed Stock Performance
              </p>
              <div className="table-shadow py-15 px-25-10 mb-10 br-5 bg-dark-black mb-20">
                <PerformanceGraph
                  graphData={previewData?.stock_index_graph}
                  p_data={previewData}
                />
              </div>
              <div className="table-shadow p-10 mb-10 br-5 bg-dark-black mb-20 my-new-table">
                <Table
                  className="custom-table"
                  columns={tableData?.columns}
                  dataSource={tableData.rows}
                  pagination={false}
                />
              </div>
              <div className="table-shadow p-10 mb-10 br-5 bg-dark-black mb-20 fs-12">
                <p className="fw-700 fs-14-12 mb-10 report-heading">Analyst</p>
                <p className="fw-400 fs-14-12 mb-10 text-white">
                  {previewData?.analyst_name} ({previewData?.analysts_email})
                </p>
                <hr style={{ border: "1px solid #585656" }} />

                {previewData?.co_analysts?.map((item, index) => (
                  <p
                    key={index}
                    className="fw-400 fs-14-12 mt-10 mb-10 text-white"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <div className="w-60-100 py-15 px-25-10 mb-10 br-5 bg-dark-black">
              <h3 className="d-flex align-items-center  fw-600 fs-18-16 report_heading_color">
                {svgSheet5?.triangleIcon} Company Overview
              </h3>
              <div
                className="mt-10 lh-26 text-white"
                dangerouslySetInnerHTML={{
                  __html: parseHTMLTable(previewData?.overview),
                }}
              ></div>

              <h3 className="d-flex align-items-center mt-20 fw-600 fs-18-16 report_heading_color">
                {svgSheet5?.triangleIcon} Investment Rationale
              </h3>
              <p
                className="mt-10 lh-26 text-white"
                dangerouslySetInnerHTML={{
                  __html: parseHTMLTable(previewData?.investment_rationals),
                }}
              ></p>
              <h3 className="d-flex align-items-center mt-20 fw-600 fs-18-16 report_heading_color">
                {svgSheet5?.triangleIcon} Risks and concerns
              </h3>
              <p
                className="mt-10 lh-26 text-white"
                dangerouslySetInnerHTML={{
                  __html: parseHTMLTable(previewData?.risks_nd_concerns),
                }}
              ></p>
              <h3 className="d-flex align-items-center mt-20 fw-600 fs-18-16 report_heading_color">
                {svgSheet5?.triangleIcon} Outlook and Valuation
              </h3>
              <p
                className="mt-10 lh-26 text-white"
                dangerouslySetInnerHTML={{
                  __html: parseHTMLTable(previewData?.outcome_nd_valuation),
                }}
              ></p>
              <h3 className="d-flex align-items-center mt-20 fw-600 fs-18-16 report_heading_color">
                {svgSheet5?.triangleIcon} Summary
              </h3>
              <p
                className="mt-10 lh-26 text-white"
                dangerouslySetInnerHTML={{
                  __html: parseHTMLTable(previewData?.summary),
                }}
              ></p>
            </div>
          </div>
          <div className="w-90 table-shadow py-15 px-25-10 mb-10 br-5 text-white bg-dark-black mt-30 text-align-center mb-20">
            <p className="fw-500 fs-24-16">Dailyraven Technologies Pvt Ltd </p>
            <p className="fs-16-12 mt-10">
              CIN : <span className="fw-600"> U74999BR2018PTC038208</span>
            </p>
            <p className="mt-20 fs-16-12">
              Registered office : H/O Suman Sinha, East Laxmi Nagar, Khemnichak,
              Sampathchak, Patna, Bihar - 800027
            </p>
            <p className="mt-10 fs-16-12">
              Corporate office : No 1212, SBM Fortune, First Floor, 22nd Cross,
              Club Road, Sector - 3, HSR Layout, Bengaluru - 560102
            </p>
            <div className="only-PC-view">
              <div className="mt-10 flex justify-content-center align-items-center">
                <p>
                  <span className="mt-5">{svgSheet?.tvIcon}</span>{" "}
                  <span>portal.tradebrains.in</span>
                </p>
                <p>|</p>
                <p>
                  <span>{svgSheet?.emailIcon}</span>{" "}
                  <span>compliance@tradebrains.in</span>
                </p>
                <p>|</p>
                <p>+91 63666 90683</p>
              </div>
            </div>
            <div className="only-mobile-view">
              <div className="mt-20 text-align-center">
                <p>
                  <span className="mt-5">{svgSheet?.tvIcon}</span>{" "}
                  <span>portal.tradebrains.in</span>
                </p>

                <p>
                  <span>{svgSheet?.emailIcon}</span>{" "}
                  <span>compliance@tradebrains.in</span>
                </p>

                <p>+91 63666 90683</p>
              </div>
            </div>
            <p className="fs-16-12 mt-0">
              <span className="fw-600">Compliance Officer: </span>
              <span>R Venkatesh Prabhu, Email: compliance@tradebrains.in,</span>
              <span className="fw-600"> Tel No: +91 63666 90683</span>
            </p>
          </div>
          <div className="w-90">
            {previewData?.disclaimer !== null ? (
              <div
                className="w-91 py-15  mb-10 br-5 mt-30 mb-20"
                style={{ opacity: "0.4" }}
              >
                <p className="fs-12 mb-20 report-heading">
                  DISCLAIMERS AND DISCLOSURES:
                </p>
                <hr style={{ border: "1px solid #585656" }} />
                <p
                  dangerouslySetInnerHTML={{
                    __html: parseHTMLTable(previewData?.disclaimer),
                  }}
                  className="text-white"
                ></p>
              </div>
            ) : (
              <div
                className="w-91 py-15  mb-10 br-5 mt-30 mb-20"
                style={{ opacity: "0.4" }}
              >
                <p className="fs-12 mt-20 mb-20 report-heading">DISCLOSURES:</p>
                <hr style={{ border: "1px solid #585656" }} />
                {previewData?.disclosure?.map((item, index) => {
                  return (
                    <div>
                      <p className="mt-10 text-white">
                        {index + 1}. {item}
                      </p>
                    </div>
                  );
                })}
                <p className="fs-12 mb-20 report-heading">DISCLAIMERS:</p>
                <hr style={{ border: "1px solid #585656" }} />
                <p
                  dangerouslySetInnerHTML={{
                    __html: previewData?.editable_disclaimer,
                  }}
                  className="text-white"
                ></p>
              </div>
            )}
          </div>
          <div className={styles.rating_container}>
            <div className={styles.container}>
              {ratings?.map((item) => {
                return (
                  <>
                    <div key={item.key} className={styles.rating_item}>
                      <div
                        className={`${
                          item.key === "1"
                            ? styles.rating_header
                            : styles.rating_title
                        }`}
                      >
                        {item.title}
                      </div>
                      <div
                        className={`${
                          item.key === "1"
                            ? styles.rating_header_value
                            : styles.rating_value
                        }`}
                      >
                        {item.value}
                      </div>
                    </div>
                    <hr style={{ border: "1px solid #585656" }} />
                  </>
                );
              })}
              <p className={styles.rating_note}>
                Note : Returns stated in the rating scale are our internal
                benchmark .
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* } */}
    </>
  );
}

export default Report;
export async function getServerSideProps(context) {
  const { req, query } = context;
  let resp;
  let agent;
  if (typeof window !== "undefined") {
    agent = window.navigator.userAgent;
  } else {
    agent = null;
  }
  let error;
  try {
    resp = await fetch(
      `${process.env.NEXT_APP_BASE_URL}stock/research/reports/?report_id=${query?.id}`,
      {
        headers: {
          Authorization: `jwt ${req?.cookies?.ptl_access_token ?? null}`,
          "User-Agent": "PostmanRuntime/7.37.3",
        },
      },
    ).then((resp) => {
      return resp.json();
    });
  } catch (err) {
    return {
      redirect: { destination: `/404`, permanent: false },
    };
  }

  return {
    props: {
      previewData: resp,
    },
  };
}
