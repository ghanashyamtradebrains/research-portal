import { utils, write } from "xlsx";
import { fromDataAsync, RichText } from "xlsx-populate/browser/xlsx-populate";
import { excelWorkbookToBlob } from "./excelWorkbookToBlob";
import {
  dataUndefinedBalanceSheet,
  dataUndefinedCashflow,
  dataUndefinedFactSheet1,
  dataUndefinedFactSheet2,
  dataUndefinedFactSheet3,
  dataUndefinedFactSheet4,
  dataUndefinedFactSheet5,
  dataUndefinedFactSheet6,
  dataUndefinedKeyMetrics,
  dataUndefinedProfitAndLoss,
  dataUndefinedQuarterly,
} from "./exportDummyData";
export const exportToExcel = (
  excelData,
  fileName,
  pageLink = "portal.tradebrains.in",
  notBankStock
) => {
  const {
    PandLtableData,
    metricsTableData,
    quraterlyFinData,
    balanceSheetTable,
    cashFlowTableData,
    shareHoldingData,
    FiveYearDataTable1,
    FiveYearDataTable2,
    FiveYearDataTable3,
    FiveYearDataTable4,
    FiveYearDataTable5,
    FiveYearDataTable6,
  } = excelData;

  const addStyles = (workBookBlob, dataInfo) => {
    return fromDataAsync(workBookBlob).then((workbook) => {
      workbook.sheets().forEach((sheet) => {
        for (let i = 0; i < dataInfo.titleRange.length; i++) {
          sheet.range(dataInfo.titleRange[i]).merged(true).style({
            fontFamily: "poppins",
            bold: true,
            horizontalAlignment: "left",
            verticalAlignment: "left",
            fontSize: 18,
          });
        }
        for (let i = 0; i < dataInfo.tBodyRange.length; i++) {
          sheet.range(dataInfo.tBodyRange[i]).style({
            fontFamily: "poppins",
            horizontalAlignment: "left",
            border: true,
            fontSize: 10.5,
          });
        }
        for (let i = 0; i < dataInfo.headerRange.length; i++) {
          sheet.range(dataInfo.headerRange[i]).style({
            fill: "3B3F4F",
            bold: "true",
            fontColor: "FFFFFF",
            fontSize: 13,
          });
        }
        for (let i = 0; i < dataInfo.subHeadText.length; i++) {
          sheet.cell(dataInfo.subHeadText[i]).style({
            bold: "true",
            fontSize: 12,
          });
        }
        for (let i = 0; i < dataInfo.tableValueType.length; i++) {
          sheet.cell(dataInfo.tableValueType[i]).value("Values in Cr.").style({
            fontFamily: "poppins",
            fontColor: "4A515E",
            horizontalAlignment: "top",
          });
        }
      });

      const cells = workbook.sheet(0).range("B3:C3");
      cells.value(new RichText());
      cells.value("Key Metrics");
      cells.style({ bold: true, fontFamily: "poppins", fontSize: 18 });
      cells.merged(true);

      // add stock name
      const cell = workbook.sheet(0).range("B1:C1");
      cell.value(new RichText());
      cell.value(fileName);
      cell.style({ bold: true, fontFamily: "poppins", fontSize: 15 });
      cell.merged(true);
      // add data type
      const dataTypeCell = workbook.sheet(0).cell("B2");
      dataTypeCell.value(new RichText());
      // dataTypeCell.value(`Figures represented in ${dataType}`);
      dataTypeCell.style({ fontFamily: "poppins", fontSize: 12 });
      // add page link
      const linkCell = workbook.sheet(0).cell("F1");
      linkCell.hyperlink(pageLink);
      linkCell.value(pageLink);
      linkCell.style({ bold: true, fontFamily: "poppins", fontSize: 13 });
      return workbook
        .outputAsync()
        .then((workbookBlob) => URL.createObjectURL(workbookBlob));
    });
  };

  const convertExeclTable = (data) => {
    let headersData = {};
    if (data?.YearHeaders) {
      data.YearHeaders.forEach(({ PARTICULARS, ...item }, i) => {
        headersData[i] = item.title.props.children;
      });
    }
    const bodyData = data?.tableBodyData?.map(({ PARTICULARS, ...item }) => {
      let partData = PARTICULARS;
      delete item["PARTICULARS"];
      delete item["key"];
      delete item["tooltipTextNested"];
      delete item["tooltipText"];

      let finalobj = {};
      Object.entries(item).forEach((ele, i) => {
        finalobj[i + 1] =
          ele[1] &&
          typeof ele[1] === "object" &&
          Object.keys(ele[1]).length !== 0
            ? `${parseFloat(ele[1]?.value).toFixed(2)} ( ${parseFloat(
                ele[1]?.change
              ).toFixed(2)} % )`
            : isNaN(parseFloat(ele[1]))
            ? "-"
            : parseFloat(ele[1]).toFixed(2);
      });
      return { 0: partData, ...finalobj };
    });
    return { headersData, tableBodyData: bodyData };
  };

  const matricTableData = convertExeclTable(
    metricsTableData.tableBodyData === undefined
      ? dataUndefinedKeyMetrics
      : metricsTableData
  );
  const qurterlyTableData = convertExeclTable(
    quraterlyFinData === undefined ? dataUndefinedQuarterly : quraterlyFinData
  );
  const pandLTableData = convertExeclTable(
    PandLtableData === undefined ? dataUndefinedProfitAndLoss : PandLtableData
  );
  const balanceSheetTableData = convertExeclTable(
    balanceSheetTable === undefined
      ? dataUndefinedBalanceSheet
      : balanceSheetTable
  );
  const cashflowTableData = convertExeclTable(
    cashFlowTableData === undefined ? dataUndefinedCashflow : cashFlowTableData
  );
  const holdingTableData = convertExeclTable(shareHoldingData);
  const factSheetTableData1 = convertExeclTable(
    FiveYearDataTable1 === undefined
      ? dataUndefinedFactSheet1
      : FiveYearDataTable1
  );
  const factSheetTableData2 = convertExeclTable(
    FiveYearDataTable2 === undefined
      ? dataUndefinedFactSheet2
      : FiveYearDataTable2
  );
  const factSheetTableData3 = convertExeclTable(
    FiveYearDataTable3 === undefined
      ? dataUndefinedFactSheet3
      : FiveYearDataTable3
  );
  const factSheetTableData4 = convertExeclTable(
    FiveYearDataTable4 === undefined
      ? dataUndefinedFactSheet4
      : FiveYearDataTable4
  );
  const factSheetTableData5 = convertExeclTable(
    FiveYearDataTable5 === undefined
      ? dataUndefinedFactSheet5
      : FiveYearDataTable5
  );
  const factSheetTableData6 = convertExeclTable(
    FiveYearDataTable6 === undefined
      ? dataUndefinedFactSheet6
      : FiveYearDataTable6
  );

  const matricTableHeadersLength = matricTableData?.headersData
    ? Object.keys(matricTableData.headersData).length
    : 0;
  const qurterlyTableHeadersLength = qurterlyTableData?.headersData
    ? Object.keys(qurterlyTableData.headersData).length
    : 0;

  const profitLossHeadersLength = pandLTableData?.headersData
    ? Object.keys(pandLTableData.headersData).length
    : 0;
  const balanceSheetTableDataHeadersLength = balanceSheetTableData?.headersData
    ? Object.keys(balanceSheetTableData.headersData).length
    : 0;
  const cashflowTableDataHeadersLength = cashflowTableData?.headersData
    ? Object.keys(cashflowTableData.headersData).length
    : 0;
  const holdingTableDataHeadersLength = holdingTableData?.headersData
    ? Object.keys(holdingTableData.headersData).length
    : 0;
  const factSheetTableData1HeadersLength = factSheetTableData1?.headersData
    ? Object.keys(factSheetTableData1.headersData).length
    : 0;
  const factSheetTableData2HeadersLength = factSheetTableData2?.headersData
    ? Object.keys(factSheetTableData2.headersData).length
    : 0;
  const factSheetTableData3HeadersLength = factSheetTableData3?.headersData
    ? Object.keys(factSheetTableData3.headersData).length
    : 0;
  const factSheetTableData4HeadersLength = factSheetTableData4?.headersData
    ? Object.keys(factSheetTableData4.headersData).length
    : 0;
  const factSheetTableData5HeadersLength = factSheetTableData5?.headersData
    ? Object.keys(factSheetTableData5.headersData).length
    : 0;
  const factSheetTableData6HeadersLength = factSheetTableData6?.headersData
    ? Object.keys(factSheetTableData6.headersData).length
    : 0;

  const matricTableTableEndCol = String.fromCharCode(
    "B".charCodeAt(0) + matricTableHeadersLength - 1
  );

  const qurterlyTableEndCol = String.fromCharCode(
    "B".charCodeAt(0) + qurterlyTableHeadersLength - 1
  );

  const profitLossTableEndCol = String.fromCharCode(
    "B".charCodeAt(0) + profitLossHeadersLength - 1
  );

  const balanceSheetTableEndCol = String.fromCharCode(
    "B".charCodeAt(0) + balanceSheetTableDataHeadersLength - 1
  );

  const cashFlowTableEndCol = String.fromCharCode(
    "B".charCodeAt(0) + cashflowTableDataHeadersLength - 1
  );

  const holdingTableEndCol = String.fromCharCode(
    "B".charCodeAt(0) + holdingTableDataHeadersLength - 1
  );

  const factSheet1TableEndCol = String.fromCharCode(
    "B".charCodeAt(0) + factSheetTableData1HeadersLength - 1
  );

  const factSheet2TableEndCol = String.fromCharCode(
    "B".charCodeAt(0) + factSheetTableData2HeadersLength - 1
  );

  const factSheet3TableEndCol = String.fromCharCode(
    "B".charCodeAt(0) + factSheetTableData3HeadersLength - 1
  );

  const factSheet4TableEndCol = String.fromCharCode(
    "B".charCodeAt(0) + factSheetTableData4HeadersLength - 1
  );

  const factSheet5TableEndCol = String.fromCharCode(
    "B".charCodeAt(0) + factSheetTableData5HeadersLength - 1
  );

  const factSheet6TableEndCol = String.fromCharCode(
    "B".charCodeAt(0) + factSheetTableData6HeadersLength - 1
  );

  const qurterlyTableEndColText = String.fromCharCode(
    "B".charCodeAt(0) + qurterlyTableHeadersLength - 2
  );

  const profitLossTableEndColText = String.fromCharCode(
    "B".charCodeAt(0) + profitLossHeadersLength - 2
  );

  const balanceSheetTableEndColText = String.fromCharCode(
    "B".charCodeAt(0) + balanceSheetTableDataHeadersLength - 2
  );

  const cashFlowTableEndColText = String.fromCharCode(
    "B".charCodeAt(0) + cashflowTableDataHeadersLength - 2
  );

  const yearColSize = [
    {
      wch: 15,
    },
    {
      wch: 30,
    },
    {
      wch: 15,
    },
    {
      wch: 15,
    },
    {
      wch: 15,
    },
    {
      wch: 15,
    },
    {
      wch: 15,
    },
    {
      wch: 15,
    },
    {
      wch: 15,
    },
    {
      wch: 15,
    },
    {
      wch: 15,
    },
    {
      wch: 15,
    },
  ];

  const wb = utils.book_new();
  // key matrics
  const metricTitle = [{ "": "" }];
  const metricFinalArr = [
    {},
    {},
    ...metricTitle,
    matricTableData.headersData,
    ...matricTableData.tableBodyData,
  ];
  // quarerly table arr
  const quarterTitle = [{}, { 0: "Quarterly Results" }];
  const quarterlyFinalArr = [
    ...quarterTitle,
    qurterlyTableData.headersData,
    ...qurterlyTableData.tableBodyData,
  ];
  // profit and loss arraya
  const pandLTitle = [{}, { 0: "Profit and Loss" }];
  const pandLFinalArr = [
    ...pandLTitle,
    pandLTableData.headersData,
    ...pandLTableData.tableBodyData,
  ];
  // balance sheet array
  const balanceTitle = [{}, { 0: "Balance Sheet" }];
  const balanceFinalArr = [
    ...balanceTitle,
    balanceSheetTableData.headersData,
    ...balanceSheetTableData.tableBodyData,
  ];
  // cashflow array
  const cashflowTitle = [{}, { 0: "Cashflow Statement" }];
  const cashflowFinalArr = [
    ...cashflowTitle,
    cashflowTableData.headersData,
    ...cashflowTableData.tableBodyData,
  ];
  // share holding array
  const holdingTitle = [{}, { 0: "Shareholding Pattern" }];
  const holdingFinalArr = [
    ...holdingTitle,
    holdingTableData.headersData,
    ...holdingTableData.tableBodyData,
  ];
  // 5 year fact sheet tabrl 1
  const factSheetTitle = [
    {},
    {
      0: `5 Year Factsheet :${
        notBankStock === "BANK" || notBankStock === "NBFC"
          ? "Operational Ratios"
          : "Profitability Ratios"
      } `,
    },
  ];
  const factSheetArr = [
    ...factSheetTitle,
    factSheetTableData1.headersData,
    ...factSheetTableData1.tableBodyData,
  ];
  // 5 year fact sheet tabrl 2
  const factSheet2Title = [
    {},
    {
      0: `${
        notBankStock === "BANK" || notBankStock === "NBFC"
          ? "Profitability Ratios"
          : "Growth Ratios"
      } `,
    },
  ];
  const factSheet2Arr = [
    ...factSheet2Title,

    factSheetTableData2.headersData,
    ...factSheetTableData2.tableBodyData,
  ];
  // 5 year fact sheet tabrl 3
  const factSheet3Title = [
    {},
    {
      0: `${
        notBankStock === "BANK" || notBankStock === "NBFC"
          ? "Growth Ratios"
          : "Valuation Ratios"
      } `,
    },
  ];
  const factSheet3Arr = [
    ...factSheet3Title,

    factSheetTableData3.headersData,
    ...factSheetTableData3.tableBodyData,
  ];
  // 5 year fact sheet tabrl 4
  const factSheet4Title = [
    {},
    {
      0: `${
        notBankStock === "BANK" || notBankStock === "NBFC"
          ? "Valuation Ratios"
          : "Cashflow Ratios"
      } `,
    },
  ];
  const factSheet4Arr = [
    ...factSheet4Title,

    factSheetTableData4.headersData,
    ...factSheetTableData4.tableBodyData,
  ];
  // 5 year fact sheet tabrl 5
  const factSheet5Title = [
    {},
    {
      0: `${
        notBankStock === "BANK" || notBankStock === "NBFC"
          ? "Cashflow Ratios"
          : "Debt and Liquidity Ratios"
      } `,
    },
  ];
  const factSheet5Arr = [
    ...factSheet5Title,

    factSheetTableData5.headersData,
    ...factSheetTableData5.tableBodyData,
  ];

  const factSheet6Title = [
    {},
    {
      0: `${
        notBankStock === "BANK" || notBankStock === "NBFC"
          ? "Other Metrics"
          : "Efficiency Ratios"
      } `,
    },
  ];
  const factSheet6Arr = [
    ...factSheet6Title,

    factSheetTableData6.headersData,
    ...factSheetTableData6.tableBodyData,
  ];
  // final array
  const finalArray = [
    ...metricFinalArr,
    ...quarterlyFinalArr,
    ...pandLFinalArr,
    ...balanceFinalArr,
    ...cashflowFinalArr,
    ...holdingFinalArr,
    ...factSheetArr,
    ...factSheet2Arr,
    ...factSheet3Arr,
    ...factSheet4Arr,
    ...factSheet5Arr,
    ...(notBankStock === "NBFC" ? [] : factSheet6Arr),
  ];
  // row height
  const wsRowData = finalArray?.map((item) => {
    return {
      hpx: 30,
    };
  });
  const ws = utils.json_to_sheet(finalArray, { skipHeader: true });
  ws["!cols"] = yearColSize;
  ws["!rows"] = wsRowData;
  utils.book_append_sheet(wb, ws, "Stock Data");
  const wbBlob1 = excelWorkbookToBlob(wb);
  const head = ["B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
  const text =
    notBankStock === "BANK"
      ? [
          "24",
          "32",
          "36",
          "38",
          "52",
          "56",
          "62",
          "67",
          "69",
          "85",
          "96",
          "102",
          "110",
          "120",
          "133",
        ]
      : notBankStock === "NBFC"
      ? [
          "24",
          "26",
          "30",
          "34",
          "36",
          "50",
          "53",
          "59",
          "64",
          "66",
          "82",
          "93",
          "99",
          "107",
          "117",
          "130",
          "138",
        ]
      : notBankStock === "INSURANCE"
      ? [
          "24",
          "27",
          "29",
          "34",
          "36",
          "48",
          "50",
          "53",
          "58",
          "63",
          "65",
          "77",
          "91",
          "99",
          "107",
          "117",
          "130",
          "138",
        ]
      : [
          "24",
          "26",
          "29",
          "30",
          "34",
          "36",
          "48",
          "50",
          "53",
          "58",
          "60",
          "61",
          "63",
          "65",
          "77",
          "91",
          "94",
          "98",
          "102",
          "107",
          "117",
          "130",
          "138",
        ];
  let subHeadText = [];
  head.forEach((h) => {
    text.forEach((t) => {
      subHeadText.push(h + t);
    });
  });

  const dataInfo = {
    titleCell: "B3",
    titleRange: [
      "B3:C3",
      `B${matricTableData.tableBodyData.length + 6}:${qurterlyTableEndColText}${
        matricTableData.tableBodyData.length + 6
      }`,
      `B${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        9
      }:${profitLossTableEndColText}${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        9
      }`,
      `B${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        12
      }:${balanceSheetTableEndColText}${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        12
      }`,
      `B${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        15
      }:${cashFlowTableEndColText}${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        15
      }`,
      `B${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        18
      }:${holdingTableEndCol}${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        18
      }`,
      `B${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        21
      }:${factSheet1TableEndCol}${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        21
      }`,
      `B${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        factSheetTableData1.tableBodyData.length +
        24
      }:${factSheet2TableEndCol}${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        factSheetTableData1.tableBodyData.length +
        24
      }`,
      `B${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        factSheetTableData1.tableBodyData.length +
        factSheetTableData2.tableBodyData.length +
        27
      }:${factSheet3TableEndCol}${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        factSheetTableData1.tableBodyData.length +
        factSheetTableData2.tableBodyData.length +
        27
      }`,
      `B${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        factSheetTableData1.tableBodyData.length +
        factSheetTableData2.tableBodyData.length +
        factSheetTableData3.tableBodyData.length +
        30
      }:${factSheet4TableEndCol}${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        factSheetTableData1.tableBodyData.length +
        factSheetTableData2.tableBodyData.length +
        factSheetTableData3.tableBodyData.length +
        30
      }`,
      `B${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        factSheetTableData1.tableBodyData.length +
        factSheetTableData2.tableBodyData.length +
        factSheetTableData3.tableBodyData.length +
        factSheetTableData4.tableBodyData.length +
        33
      }:${factSheet5TableEndCol}${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        factSheetTableData1.tableBodyData.length +
        factSheetTableData2.tableBodyData.length +
        factSheetTableData3.tableBodyData.length +
        factSheetTableData4.tableBodyData.length +
        33
      }`,
      `B${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        factSheetTableData1.tableBodyData.length +
        factSheetTableData2.tableBodyData.length +
        factSheetTableData3.tableBodyData.length +
        factSheetTableData4.tableBodyData.length +
        factSheetTableData5.tableBodyData.length +
        36
      }:${factSheet6TableEndCol}${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        factSheetTableData1.tableBodyData.length +
        factSheetTableData2.tableBodyData.length +
        factSheetTableData3.tableBodyData.length +
        factSheetTableData4.tableBodyData.length +
        factSheetTableData5.tableBodyData.length +
        36
      }`,
    ],
    tBodyRange: [
      `B4:${matricTableTableEndCol}${matricTableData.tableBodyData.length + 4}`,
      `B${matricTableData.tableBodyData.length + 7}:${qurterlyTableEndCol}${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        7
      }`,
      `B${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        10
      }:${profitLossTableEndCol}${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        10
      }`,
      `B${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        13
      }:${balanceSheetTableEndCol}${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        13
      }`,
      `B${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        16
      }:${cashFlowTableEndCol}${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        16
      }`,
      `B${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        19
      }:${holdingTableEndCol}${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        19
      }`,
      `B${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        22
      }:${factSheet1TableEndCol}${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        factSheetTableData1.tableBodyData.length +
        22
      }`,
      `B${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        factSheetTableData1.tableBodyData.length +
        25
      }:${factSheet2TableEndCol}${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        factSheetTableData1.tableBodyData.length +
        factSheetTableData2.tableBodyData.length +
        25
      }`,
      `B${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        factSheetTableData1.tableBodyData.length +
        factSheetTableData2.tableBodyData.length +
        28
      }:${factSheet3TableEndCol}${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        factSheetTableData1.tableBodyData.length +
        factSheetTableData2.tableBodyData.length +
        factSheetTableData3.tableBodyData.length +
        28
      }`,
      `B${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        factSheetTableData1.tableBodyData.length +
        factSheetTableData2.tableBodyData.length +
        factSheetTableData3.tableBodyData.length +
        31
      }:${factSheet4TableEndCol}${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        factSheetTableData1.tableBodyData.length +
        factSheetTableData2.tableBodyData.length +
        factSheetTableData3.tableBodyData.length +
        factSheetTableData4.tableBodyData.length +
        31
      }`,
      `B${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        factSheetTableData1.tableBodyData.length +
        factSheetTableData2.tableBodyData.length +
        factSheetTableData3.tableBodyData.length +
        factSheetTableData4.tableBodyData.length +
        34
      }:${factSheet5TableEndCol}${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        factSheetTableData1.tableBodyData.length +
        factSheetTableData2.tableBodyData.length +
        factSheetTableData3.tableBodyData.length +
        factSheetTableData4.tableBodyData.length +
        factSheetTableData5.tableBodyData.length +
        34
      }`,
      `B${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        factSheetTableData1.tableBodyData.length +
        factSheetTableData2.tableBodyData.length +
        factSheetTableData3.tableBodyData.length +
        factSheetTableData4.tableBodyData.length +
        factSheetTableData5.tableBodyData.length +
        37
      }:${factSheet6TableEndCol}${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        factSheetTableData1.tableBodyData.length +
        factSheetTableData2.tableBodyData.length +
        factSheetTableData3.tableBodyData.length +
        factSheetTableData4.tableBodyData.length +
        factSheetTableData5.tableBodyData.length +
        factSheetTableData6.tableBodyData.length +
        37
      }`,
    ],
    // tBodyRange: `B4:B${qurterlyTableData.tableBodyData.length+4}`,
    headerRange: [
      "B4:C4",
      `B${matricTableData.tableBodyData.length + 7}:${qurterlyTableEndCol}${
        matricTableData.tableBodyData.length + 7
      }`,
      `B${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        10
      }:${profitLossTableEndCol}${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        10
      }`,
      `B${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        13
      }:${balanceSheetTableEndCol}${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        13
      }`,
      `B${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        16
      }:${cashFlowTableEndCol}${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        16
      }`,
      `B${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        19
      }:${holdingTableEndCol}${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        19
      }`,
      `B${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        22
      }:${factSheet1TableEndCol}${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        22
      }`,
      `B${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        factSheetTableData1.tableBodyData.length +
        25
      }:${factSheet2TableEndCol}${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        factSheetTableData1.tableBodyData.length +
        25
      }`,
      `B${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        factSheetTableData1.tableBodyData.length +
        factSheetTableData2.tableBodyData.length +
        28
      }:${factSheet3TableEndCol}${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        factSheetTableData1.tableBodyData.length +
        factSheetTableData2.tableBodyData.length +
        28
      }`,
      `B${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        factSheetTableData1.tableBodyData.length +
        factSheetTableData2.tableBodyData.length +
        factSheetTableData3.tableBodyData.length +
        31
      }:${factSheet4TableEndCol}${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        factSheetTableData1.tableBodyData.length +
        factSheetTableData2.tableBodyData.length +
        factSheetTableData3.tableBodyData.length +
        31
      }`,
      `B${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        factSheetTableData1.tableBodyData.length +
        factSheetTableData2.tableBodyData.length +
        factSheetTableData3.tableBodyData.length +
        factSheetTableData4.tableBodyData.length +
        34
      }:${factSheet5TableEndCol}${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        factSheetTableData1.tableBodyData.length +
        factSheetTableData2.tableBodyData.length +
        factSheetTableData3.tableBodyData.length +
        factSheetTableData4.tableBodyData.length +
        34
      }`,
      `B${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        factSheetTableData1.tableBodyData.length +
        factSheetTableData2.tableBodyData.length +
        factSheetTableData3.tableBodyData.length +
        factSheetTableData4.tableBodyData.length +
        factSheetTableData5.tableBodyData.length +
        37
      }:${factSheet6TableEndCol}${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        cashflowTableData.tableBodyData.length +
        holdingTableData.tableBodyData.length +
        factSheetTableData1.tableBodyData.length +
        factSheetTableData2.tableBodyData.length +
        factSheetTableData3.tableBodyData.length +
        factSheetTableData4.tableBodyData.length +
        factSheetTableData5.tableBodyData.length +
        37
      }`,
    ],

    subHeadText,
    tableValueType: [
      "D3",
      `${qurterlyTableEndCol}${matricTableData.tableBodyData.length + 6}`,
      `${profitLossTableEndCol}${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        9
      }`,
      `${balanceSheetTableEndCol}${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        pandLTableData.tableBodyData.length +
        12
      }`,
      `${cashFlowTableEndCol}${
        matricTableData.tableBodyData.length +
        qurterlyTableData.tableBodyData.length +
        balanceSheetTableData.tableBodyData.length +
        41
      }`,
    ],
  };
  return addStyles(wbBlob1, dataInfo);
};
