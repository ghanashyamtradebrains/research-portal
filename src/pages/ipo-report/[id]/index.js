import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import styles from "../index.module.css";
import svgSheet from "../../../assets/svg/svgSheet";
import portalWebLogo from "../../../assets/images/PortalLogo.png";
import { useRouter } from "next/router";
import commaWihNumber from "../../../utilityFn/commaWithNumber";
import { authStore } from "../../../redux/reducers/authSlice";
import { getIpoPreviewData } from "../../api/fetchClient";
import BreadCrumb from "../../../components/BreadCrumb";
import svgSheet5 from "../../../assets/svg/svgSheet5";
import portalIcon from "../../../assets/images/logo/logoWhite.png";

function Preview({ previewData }) {
  const router = useRouter();
  const id = router.query?.report_id;
  const contentRef = useRef();

  const parseHTMLTable = (html) => {
    if (typeof window === "undefined") return "";

    const styledHTML = html
      ?.replace(
        /<img /g,
        '<img style="width: 100%; height: 100%; object-fit: cover; margin-top:8px;" ',
      )
      ?.replace(/<p /g, '<p style="font-size: 16px; margin-bottom: -5px;"')
      ?.replace(/<ol>/g, '<ol style="margin-left: 20px;">')
      ?.replace(/<ul>/g, '<ul style="margin-left: 20px;">');
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

  const offerForSale = previewData?.offer_for_sale;

  const ipo_keys = [
    {
      label: "Minimum Investment ",
      value: previewData?.min_investment,
      unit: "₹",
      borderBottom: true,
    },
    {
      label: "Price Range",
      value: previewData?.price_range,
      unit: "₹",
      borderBottom: true,
    },
    {
      label: "Open Date",
      value: previewData?.open_date,
      unit: "",
      borderBottom: true,
    },
    {
      label: "Close Date",
      value: previewData?.close_date,
      unit: "",
      borderBottom: true,
    },
    {
      label: "Lot Size",
      value: previewData?.lot_size,
      unit: "",
      borderBottom: true,
    },
    {
      label: "Issue Size",
      value: previewData?.issue_size,
      unit: "₹",
      units: "Cr",
      borderBottom: true,
    },
    {
      label: "Face Value",
      value: previewData?.face_value,
      unit: "₹",
      units: "per share",
      borderBottom: true,
    },
    {
      label: "Fresh Issue",
      value: previewData?.fresh_issue,
      unit: "₹",
      units: "Cr",
      // If offer_for_sale = 0 → borderBottom false, otherwise true
      borderBottom: offerForSale !== 0,
    },
    {
      label: "Offer For Sale",
      value: offerForSale,
      unit: "₹",
      units: "Cr",
      borderBottom: false,
    },
  ];

  const data = [
    {
      type: "Promoters & Promoters Group",
      preIssue: previewData?.promoter_group_pre_issue,
      postIssue: previewData?.promoter_group_post_issue,
    },
    {
      type: "Publics",
      preIssue: previewData?.public_pre_issue,
      postIssue: previewData?.public_post_issue,
    },
    {
      type: "Total",
      preIssue: previewData?.total_pre_issue,
      postIssue: previewData?.total_post_issue,
    },
  ];

  const breadCrumbData = [
    { label: "Stock Research Report", link: "/stock-research-report" },
  ];

  return (
    <div
      className="bg-color-white text-black w-100"
      style={{ background: "#343434" }}
    >
      <div className={styles.breadcrumb}>
        <BreadCrumb linkData={breadCrumbData} current={`Ipo Report`} />
      </div>
      <div className={styles.main_container2}>
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
      <div className={styles.main_container} ref={contentRef}>
        <div className={styles.logo_heading_container}>
          <div className={styles.company_name}>{previewData?.name}</div>
          <div className={styles.publish_date}>
            {" "}
            {previewData?.publish_date}
          </div>
          <div>
            <p>
              {previewData?.recommendation === "Subscribe" && (
                <span className={styles.subscribe_btn}>Subscribe</span>
              )}
            </p>
            <p>
              {previewData?.recommendation === "Avoid" && (
                <span className={styles.notsub_btn}>Avoid</span>
              )}
            </p>
            <p>
              {(previewData?.recommendation === "Not Rated" ||
                previewData?.recommendation === "Neutral" ||
                previewData?.recommendation === "No Stance") && (
                <span className={styles.neutral_btn}>
                  {previewData?.recommendation === "Not Rated" && "Not Rated"}
                  {previewData?.recommendation === "Neutral" && "Neutral"}
                  {previewData?.recommendation === "No Stance" && "No Stance"}
                </span>
              )}
            </p>
          </div>
        </div>

        <div className={styles.content_container}>
          <div className={styles.left_container}>
            <p className="mb-10 report-heading fw-600 fs-18-14">
              Key IPO Details
            </p>
            <div className="table-shadow p-10 mb-10 br-5 bg-dark-black mb-20 fs-12">
              {ipo_keys.map((item) => {
                return (
                  <>
                    {item?.value === 0 ? (
                      ""
                    ) : (
                      <>
                        <div className={styles.label_value_flex}>
                          <p>{item?.label}</p>
                          <p className="ff-lato">
                            {item?.unit} {commaWihNumber(item?.value)}{" "}
                            {item?.units}
                          </p>
                        </div>
                        {item.borderBottom === true && (
                          <hr style={{ border: "1px solid #585656" }} />
                        )}
                      </>
                    )}
                  </>
                );
              })}
            </div>
            <p className="mb-10 report-heading fw-600 fs-18-14">
              Objective of IPO
            </p>
            <div className="table-shadow mb-10 br-5 bg-dark-black p-10 fs-12">
              <p
                className={styles.objective_text}
                dangerouslySetInnerHTML={{
                  __html:
                    parseHTMLTable(previewData?.objective) ||
                    "<p>No data available</p>",
                }}
              ></p>
            </div>
            {previewData?.total_post_issue === 0 ? (
              ""
            ) : (
              <p className="mb-10 report-heading fw-600 fs-18-14">
                Shareholding
              </p>
            )}
            {previewData?.total_post_issue === 0 ? (
              ""
            ) : (
              <div className="table-shadow mb-10 br-5 bg-dark-black mb-20 fs-12">
                <div className={styles.tableContainer}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Share Holding</th>
                        <th>Pre Issue</th>
                        <th>Post Issue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row, index) => (
                        <tr key={index}>
                          <td>{row.type}</td>
                          <td>{row.preIssue} %</td>
                          <td>{row.postIssue} %</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <p className="mb-10 report-heading fw-600 fs-18-14">
              Other Information- BRLM, Registrar
            </p>
            <div className="table-shadow p-10 mb-10 br-5 bg-dark-black mb-20 fs-12">
              <p
                className={styles.objective_text}
                dangerouslySetInnerHTML={{
                  __html:
                    parseHTMLTable(previewData?.other_info) ||
                    "<p>No data available</p>",
                }}
              ></p>
            </div>
            <div className="table-shadow p-10 mb-10 br-5 bg-dark-black mb-20 fs-12">
              <p className="fw-700 fs-14-12 mb-10">Analyst</p>
              <p className="fw-400 fs-14-12 mb-10">
                {previewData?.analysts} ({previewData?.analysts_email})
              </p>
              <hr style={{ border: "1px solid #585656" }} />
              {/* <p className="fw-700 fs-14-12 mt-10">Co-analyst</p> */}
              {previewData?.co_analysts?.map((item) => {
                return (
                  <div>
                    <p className="fw-400 fs-14-12 mt-10 mb-10">{item}</p>
                    <hr style={{ border: "1px solid #585656" }} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.right_container}>
            <span className="d-flex align-items-center report-heading fs-s-16 fw-600">
              {svgSheet5?.triangleIcon} About Company
            </span>
            <div
              className="text-white lh-26"
              dangerouslySetInnerHTML={{
                __html:
                  parseHTMLTable(previewData?.about_company) ||
                  "<p>No data available</p>",
              }}
            ></div>
            <span className="d-flex align-items-center report-heading fs-s-16 fw-600 mt-20">
              {svgSheet5?.triangleIcon} Industry Overview
            </span>
            <div
              className="mt-20 text-white lh-26"
              dangerouslySetInnerHTML={{
                __html:
                  parseHTMLTable(previewData?.industry_overview) ||
                  "<p>No data available</p>",
              }}
            ></div>

            <span className="d-flex align-items-center report-heading fs-s-16 fw-600 mt-20">
              {svgSheet5?.triangleIcon} Financial Statements
            </span>
            <p
              className="mt-20 text-white lh-26"
              dangerouslySetInnerHTML={{
                __html:
                  parseHTMLTable(previewData?.financial_statements) ||
                  "<p>No data available</p>",
              }}
            ></p>
            <span className="d-flex align-items-center report-heading fs-s-16 fw-600 mt-20">
              {svgSheet5?.triangleIcon} Risks and concerns
            </span>
            <p
              className="mt-20 text-white lh-26"
              dangerouslySetInnerHTML={{
                __html:
                  parseHTMLTable(previewData?.risk_and_concerns) ||
                  "<p>No data available</p>",
              }}
            ></p>
            <span className="d-flex align-items-center report-heading fs-s-16 fw-600 mt-20">
              {svgSheet5?.triangleIcon} Peer Comparison
            </span>
            <p
              className="mt-20 text-white lh-26"
              dangerouslySetInnerHTML={{
                __html:
                  parseHTMLTable(previewData?.peer_comparision) ||
                  "<p>No data available</p>",
              }}
            ></p>
            <span className="d-flex align-items-center report-heading fs-s-16 fw-600 mt-20">
              {svgSheet5?.triangleIcon} Summary
            </span>
            <p
              className="mt-20 text-white lh-26"
              dangerouslySetInnerHTML={{
                __html:
                  parseHTMLTable(previewData?.summary) ||
                  "<p>No data available</p>",
              }}
            ></p>
          </div>
        </div>
        <div className={styles.footer_container}>
          <p className="fw-500 fs-24-16">Dailyraven Technologies Pvt Ltd </p>
          <p className="fs-16-12 mt-20">
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
          <div className={styles.footer_flex}>
            <p>
              <span className="mt-5">{svgSheet?.tvIcon}</span>{" "}
              <span>portal.tradebrains.in</span>
            </p>
            <p className={styles.margin_left_right}>|</p>
            <p>
              <span>{svgSheet?.emailIcon}</span>{" "}
              <span>compliance@tradebrains.in</span>
            </p>
            <p className={styles.margin_left_right}>|</p>
            <p>+91 63666 90683</p>
          </div>
          <p className="fs-16-12 mt-20">
            <span className="fw-600">Compliance Officer: </span>
            <span>R Venkatesh Prabhu, Email: compliance@tradebrains.in,</span>
            <span className="fw-600"> Tel No: +91 63666 90683</span>
          </p>
        </div>

        <div
          // className="w-91 py-15  mb-10 br-5 mt-30 mb-20"
          className={styles.info_text}
          style={{ opacity: "0.4" }}
        >
          <p className="fs-12 mt-20 mb-20">DISCLOSURES:</p>
          <hr style={{ border: "1px solid #585656" }} />
          {previewData?.disclosure?.map((item, index) => {
            return (
              <div>
                <p className="mt-10">
                  {index + 1}. {item}
                </p>
              </div>
            );
          })}
          <p className="fs-12 mb-20 mt-20">DISCLAIMERS:</p>
          <hr style={{ border: "1px solid #585656" }} />
          <p
            dangerouslySetInnerHTML={{
              __html: parseHTMLTable(previewData?.disclaimer),
            }}
          ></p>
        </div>
      </div>
    </div>
  );
}

export default Preview;

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
      `${process.env.NEXT_APP_BASE_URL}research/ipo/preview/?report_id=${query?.id}`,
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
