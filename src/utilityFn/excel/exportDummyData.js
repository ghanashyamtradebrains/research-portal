let particularsArray = [
  "Sales",
  "Sale Growth %",
  "Other Income",
  "Exceptional Items",
  "Other Normal Income",
  "Total Expenditure",
  "Raw Material Cost",
  "Manufacturing Cost",
  "Employee Cost",
  "Other Cost",
  "Operating Profits",
  "OPM%",
  "Interest",
  "Depreciation",
  "PBT",
  "Tax",
  "Tax Paid %",
  "Net Profit",
  "Net Profit Growth",
  "Net Profit Margin",
  "Net Profit Margin Growth",
  "Profit From Associates",
  "Reported Net Profit",
  "Minority share",
  "Exceptional items AT",
  "Basic EPS (Rs.)",
];

let quarterlyTable = [
  "Net Sales",
  "Sale Growth %",
  "Total Expenditure",
  "Operating Profits",
  "OPM%",
  "Other Income",
  "Exceptional Items",
  "Other Normal Income",
  "Interest",
  "PBT",
  "Tax",
  "Tax Paid %",
  "Net Profit",
  "Net Profit Growth",
  "Net Profit Margin",
  "Net Profit Margin Growth",
  "Profit From Associates",
  "Reported Net Profit",
  "Minority share",
  "Exceptional items AT",
  "Adj EPS in Rs",
];

let BalanceSheet = [
  "Assets",
  "Fixed Assets",
  "Building",
  "Gross Block",
  "Other Fixed Assets",
  "Accumulated Depreciation",
  "Cash Balance with RBI",
  "Balance with bank",
  "Investments",
  "Advances",
  "Other Assets",
  "Liabilities & Equity",
  "Deposits",
  "Borrowings",
  "Long Term Borrowings",
  "Other Borrowings",
  "Other Liabilities",
  "Shareholder's Funds",
  "Share Capital",
  "Preference Capital",
  "Equity Capital",
  "Reserves",
];

let cashflowData = [
  "Cash From Operating Activities",
  "Profit from operations",
  "Receivable",
  "Inventory",
  "Payables",
  "Loans Advances",
  "Other WC Items",
  "Working Capital Changes",
  "Direct Taxes",
  "Exceptional CF Items",
  "Cash From Investing Activities",
  "Fixed Assets Purchased",
  "Fixed Assets Sold",
  "Investments Purchased",
  "Investments Sold",
  "Interest Received",
  "Dividends Received",
  "Acquisition of Companies",
  "Inter Corporate Deposits",
  "Investment in Subsidiaries",
  "Investment in Group Cos",
  "Redemption and Cancellation of Shares",
  "Other Investing Items",
  "Cash From Financial Activities",
  "Proceeds from shares",
  "Proceeds from Borrowings",
  "Repayment of Borrowings",
  "Interest Paid Fin",
  "Dividends Paid",
  "Financial Liabilities",
  "Other Financing Items",
  "Net Cash Flow",
];
const keyMetrics = [
  "Market Cap (Cr)",
  "PE Ratio",
  "Industry P/E",
  "PEG Ratio",
  "ROE",
  "ROCE",
  "ROA",
  "Ebitda Margin",
  "CASA Ratio",
  "Dividend Yield",
  "EPS",
  "Book Value & P/B",
  "Face Value",
  "Outstanding Shares",
  "Net Interest Margin",
  "EV to Sales",
];

function generateTableData(particularsArray) {
  let tableBodyData = [];

  for (let i = 0; i < particularsArray.length; i++) {
    let rowData = {
      2020: NaN,
      2021: NaN,
      2022: NaN,
      2023: NaN,
      PARTICULARS: particularsArray[i],
      key: i + 1,
    };
    tableBodyData.push(rowData);
  }

  return tableBodyData;
}

function generateTableDataKeyMetrics(keyMetrics) {
  let keyMetricsData = [];

  for (let i = 0; i < keyMetrics.length; i++) {
    let rowData = {
      VALUES: NaN,
      PARTICULARS: keyMetrics[i],
      key: i + 1,
    };
    keyMetricsData.push(rowData);
  }

  return keyMetricsData;
}

let tableBodyData = generateTableData(particularsArray);
let tableBodyDataQuarterly = generateTableData(quarterlyTable);
let tableBodyDataBalanceSheet = generateTableData(BalanceSheet);
let tableBodyDataCashflowData = generateTableData(cashflowData);
let tableBodyDataKeyMetics = generateTableDataKeyMetrics(keyMetrics);

export const dataUndefinedProfitAndLoss = {
  YearHeaders: [
    {
      dataIndex: "PARTICULARS",
      key: "2019",
      width: "110px",
      title: { props: { children: "PARTICULARS" } },
    },
    {
      dataIndex: "2020",
      key: "2020",
      width: "110px",
      title: { props: { children: "MAR 24" } },
    },
    {
      dataIndex: "2021",
      key: "2021",
      width: "110px",
      title: { props: { children: "MAR 25" } },
    },
    {
      dataIndex: "2022",
      key: "2022",
      width: "110px",
      title: { props: { children: "MAR 26" } },
    },
    {
      dataIndex: "2023",
      key: "2023",
      width: "110px",
      title: { props: { children: "MAR 27" } },
    },
  ],
  tableBodyData: tableBodyData,
};

export const dataUndefinedQuarterly = {
  YearHeaders: [
    {
      dataIndex: "PARTICULARS",
      key: "2019",
      width: "110px",
      title: { props: { children: "PARTICULARS" } },
    },
    {
      dataIndex: "2020",
      key: "2020",
      width: "110px",
      title: { props: { children: "DEC 21" } },
    },
    {
      dataIndex: "2021",
      key: "2021",
      width: "110px",
      title: { props: { children: "MAR 22" } },
    },
    {
      dataIndex: "2022",
      key: "2022",
      width: "110px",
      title: { props: { children: "JUN 22" } },
    },
    {
      dataIndex: "2023",
      key: "2023",
      width: "110px",
      title: { props: { children: "SEP 22" } },
    },
  ],
  tableBodyData: tableBodyDataQuarterly,
};

export const dataUndefinedBalanceSheet = {
  YearHeaders: [
    {
      dataIndex: "PARTICULARS",
      key: "2019",
      width: "110px",
      title: { props: { children: "PARTICULARS" } },
    },
    {
      dataIndex: "2020",
      key: "2020",
      width: "110px",
      title: { props: { children: "DEC 21" } },
    },
    {
      dataIndex: "2021",
      key: "2021",
      width: "110px",
      title: { props: { children: "MAR 22" } },
    },
    {
      dataIndex: "2022",
      key: "2022",
      width: "110px",
      title: { props: { children: "JUN 22" } },
    },
    {
      dataIndex: "2023",
      key: "2023",
      width: "110px",
      title: { props: { children: "SEP 22" } },
    },
  ],
  tableBodyData: tableBodyDataBalanceSheet,
};

export const dataUndefinedCashflow = {
  YearHeaders: [
    {
      dataIndex: "PARTICULARS",
      key: "2019",
      width: "110px",
      title: { props: { children: "PARTICULARS" } },
    },
    {
      dataIndex: "2020",
      key: "2020",
      width: "110px",
      title: { props: { children: "DEC 21" } },
    },
    {
      dataIndex: "2021",
      key: "2021",
      width: "110px",
      title: { props: { children: "MAR 22" } },
    },
    {
      dataIndex: "2022",
      key: "2022",
      width: "110px",
      title: { props: { children: "JUN 22" } },
    },
    {
      dataIndex: "2023",
      key: "2023",
      width: "110px",
      title: { props: { children: "SEP 22" } },
    },
  ],
  tableBodyData: tableBodyDataCashflowData,
};

export const dataUndefinedKeyMetrics = {
  YearHeaders: [
    {
      dataIndex: "PARTICULARS",
      width: "100px",
      title: { props: { children: "PARTICULARS" } },
    },
    {
      dataIndex: "VALUES",
      width: "50px",
      title: { props: { children: "VALUES" } },
    },
  ],
  tableBodyData: tableBodyDataKeyMetics,
};

const factSheets = {
  factSheet1: [
    "PBDIT Margin",
    "PBT Margin",
    "EBIT Margin",
    "Net Profit Margin",
    "Contribution Profit Margin",
    "Return On Equity (ROE)",
    "Return On Assets (ROA)",
    "Fixed capital to sales ratio",
  ],
  factSheet2: [
    "Earnings Per Share (EPS)",
    "Net Sales Growth",
    "EBITDA Growth",
    "EBIT Growth",
    "Net Profit Growth",
  ],
  factSheet3: [
    "PE Ratio",
    "EV/EBITDA",
    "Market Cap To Sales",
    "Price To Book Value",
    "Dividend Yield",
  ],
  factSheet4: [
    "Cash flow per share",
    "Price To Cashflow",
    "FCF Per Share",
    "Price To Free Cashflow",
    "Free cash Flow Yield",
    "Sales to Cashflow Ratio",
  ],
  factSheet5: [
    "Current Ratio",
    "Quick Ratio",
    "Interest Coverage Ratio",
    "Debt To Equity Ratio",
    "Total Debt To Market Cap",
  ],
  factSheet6: [
    "Receivable Days (DSO)",
    "Inventory Days (DIO)",
    "Payable Days (DPO)",
    "Cash conversion cycle",
  ],
};

function generateYearHeaders() {
  const yearHeaders = [
    {
      dataIndex: "PARTICULARS",
      key: "2019",
      width: "110px",
      title: { props: { children: "PARTICULARS" } },
    },
  ];

  for (let i = 2020; i <= 2023; i++) {
    yearHeaders.push({
      dataIndex: String(i),
      key: String(i),
      width: "110px",
      title: { props: { children: `${i}` } },
    });
  }

  return yearHeaders;
}

function generateTableDataFactSheet(particularsArray) {
  return particularsArray.map((particular, index) => ({
    2020: NaN,
    2021: NaN,
    2022: NaN,
    2023: NaN,
    PARTICULARS: particular,
    key: index + 1,
  }));
}

export function generateFactSheetData(sheetName) {
  const factSheet = factSheets[sheetName];
  const tableBodyData = generateTableDataFactSheet(factSheet);

  return {
    YearHeaders: generateYearHeaders(),
    tableBodyData,
  };
}

export const dataUndefinedFactSheet1 = generateFactSheetData("factSheet1");
export const dataUndefinedFactSheet2 = generateFactSheetData("factSheet2");
export const dataUndefinedFactSheet3 = generateFactSheetData("factSheet3");
export const dataUndefinedFactSheet4 = generateFactSheetData("factSheet4");
export const dataUndefinedFactSheet5 = generateFactSheetData("factSheet5");
export const dataUndefinedFactSheet6 = generateFactSheetData("factSheet6");
