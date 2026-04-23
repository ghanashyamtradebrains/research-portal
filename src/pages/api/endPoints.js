const StockEndpoints = {
  marketMovers: (symbol) => `index/${symbol}/movers/`,
  alllMarketMovers: (symbol, mover, page, perPage, sortBy, sortOrder) =>
    `index/${symbol}/movers/${mover}?page=${page}&per_page=${perPage}&by=${sortBy}&ascending=${sortOrder}`,
  // stock details page
  priceChange: (type, symbol) =>
    `${type}/${symbol}/prices?days=1&type=INTRADAY&limit=1`,
  profitAndLossCmots: (symbol, standOrConso) =>
    `company/profit-and-loss/statement/${symbol}/${standOrConso}/`,
  balanceSheetCmots: (symbol, standOrConso) =>
    `company/balance/sheet/${symbol}/${standOrConso}/`,
  cashFlowCmots: (symbol, standOrConso) =>
    `company/cash-flow/results/${symbol}/${standOrConso}/`,
  quarterlyStatementCmots: (symbol, standOrConso) =>
    `company/quarterly-results/statement/${symbol}/${standOrConso}/`,
  newHalfYearlyStatementCmots: (symbol, standOrConso) =>
    `company/half-yearly/statement/${symbol}/${standOrConso}/`,
  halfYearlyStatementCmots: (symbol, standOrConso) =>
    `company/half-yearly/results/${symbol}/${standOrConso}/`,
  shareHoldingCmots: (symbol) => `company/detailed/shareholding/${symbol}/`,
  allShareHolding: (symbol) => `stock/share_holdings/${symbol}/`,
  finRatioCmots: (symbol, standOrConso) =>
    `company/ratios/factsheet/dividends/${symbol}/${standOrConso}/`,
  basicStockDetails: (symbol) => `company/stock/${symbol}/`,
  stockGraphData: (type, symbol, duration, limit) =>
    `${type}/${symbol}/prices?${duration}&type=${
      duration === "days=1" ? "INTRADAY" : "EOD"
    }${limit ? limit : ""}`,
  stockGraphGiftData: (duration) =>
    `/prices/gift-nifty/graph?duration=${duration}`,
  stockAddress: (symbol) => `address/${symbol}/`,
  stockReturns: (symbol) => `stock-returns/${symbol}`,
  stockAnnouncement: (symbol) => `stock/annoucements/${symbol}/`,
  stockActionsCmots: (symbol) => `corporateactions/stockdetails/${symbol}/`,
  stockActionsCmotsAll: (symbol, category, perPage) =>
    `corporateactions/stockdetails/${symbol}/${category}?per_page=${perPage}`,
  pivotAPI: (symbol, index, sortBy) =>
    `${index ? "piviot-index" : "piviot"}/table/${symbol}/?sort_by=${sortBy}`,
  pivotGiftAPI: () => `prices/gift-nifty/technicals`,

  // news api
  stockRelatednews: (symbol) => `search?search=${symbol}`,
  categoryNews: (perpage, page, categoryId) =>
    `posts?per_page=9&&page=1&&categories=30423&&categories=41&&categories=50`,
  categoryNewsData: (category, perPage, page) =>
    `news/all/${category}/?per_page=${perPage}&page=${page}${
      category === "all-news" ? "&source=web" : ""
    }`,
  stockRelatedDateApi: (postId) => `posts/${postId}`,

  userWatchlist: "watchlist/list/",
  addStockToWatchlist: (listname) => `watchlists/${listname}/`,
  deleteOrClearWatchlist: () => `watchlist/delete/clear/`,
  getFilterTypes: "screener-cmots/filters/",
  getIndexconstitients: (listname) => `index/constitients/BANKNIFTY/?page=1`,

  starDetails: (name, sortBy, sortOrder, quarterly) =>
    `superstars_port/stocks/v2/${name}/?by=${sortBy}&ascending=${sortOrder}&quater=${quarterly}`,
  starTableDrop: (portId, finCode) =>
    `superstars_port/stocks/last_four/${portId}/${finCode}/`,
  starDescdata: (name) => `superstars_port/details/${name}/`,
  starPortfolioGraph: (slug) => `prices/superstar/graph/?slug=${slug}`,
  starSectorGraph: (name) => `superstars_port/industry-analysis/${name}/`,
  getIndexList: "index/all",
  // all stocks
  AllSecotrs: `stock/industry/all`,
  profitAndLossCompareStocks: () => `stock/prof/compare/standalone/?`,

  sectorStocks: (sector, page, perPage, sortBy, sortOrder, daysDuration) =>
    `company/sector-data/${sector}/?page=${page}&per_page=${perPage}&by=${sortBy}&ascending=${sortOrder}${
      daysDuration !== "1d" ? `&duration=${daysDuration}` : ""
    }`,
  otherStocks: (sector, page, perPage, sortBy, sortOrder, daysDuration) =>
    `prices/heatmap/${sector}/?page=${page}&per_page=${perPage}&by=${sortBy}&ascending=${sortOrder}${
      daysDuration !== "1d" ? `&duration=${daysDuration}` : ""
    }`,
  institutionalInvest: (sector, page, perPage) =>
    `prices/investments/${sector}/?page=${page}&per_page=${perPage}`,
  EquityInvest: (sector, page, perPage) =>
    `prices/investments/returns/${sector}/?page=${page}&per_page=${perPage}`,
  sectorStocksIndustries: (
    sector,
    page,
    perPage,
    sortBy,
    sortOrder,
    daysDuration
  ) =>
    `stock/industry/${sector}/stocks?page=${page}&per_page=${perPage}&by=${sortBy}&ascending=${sortOrder}${
      daysDuration !== "1d" ? `&duration=${daysDuration}` : ""
    }`,

  industryStocks: (industry, page, perPage, sortBy, sortOrder, daysDuration) =>
    `company/industry/stocks/list/${industry}/?page=${page}&per_page=${perPage}&by=${sortBy}&ascending=${sortOrder}${
      daysDuration !== "1d" ? `&duration=${daysDuration}` : ""
    }`,
  getPortfolioAnaltsis: `portfolio/list/`,
  postPortfolioAnalysis: `portfolio/create/new/`,
  getstockArrCmp: `stock/batch-prices/`,
  trendingIndices: `index/trending/`,
  // payment
  paymentCallback: (token) => `payments/checkout/callback/${token}`,
  // faq
  getFaq: (query) => `faq/${query}`,
  // contact us
  postFeedback: "contactus/",
  // affiliate
  postAffiliate: `affiliate/signup/`,
  affiliateQuery: `affiliate/query/add/`,
  //afiliate
  referAffiliate: (referId, email) =>
    `affiliate/user/add/?affiliate=${referId}&email=${email}`,
  postAffiliateBankAPI: `affiliate/bankdetails/`,
  excelCounter: `users/downloads/`,
  stockIncludedIn: (fincode) => `included-ins/?fincode=${fincode}`,
  stockEvents: (symbol) => `stock/events/${symbol}/`,
  stockGlossaryList: `stocks/glossary/`,
  portalScore: (symbol, companyType) => `stock/score/${symbol}/${companyType}/`,
  portalScoreNew: (symbol) => `company/portal/score/${symbol}/`,
  creditRating: (symbol) => `company/credit-rating/${symbol}/`,
  auditReport: (symbol) => `company/auditors/report/${symbol}/`,
  directorReport: (symbol) => `company/director/report/${symbol}/`,
  chairmanReport: (symbol) => `company/chairman/report/${symbol}/`,
  fundamentals_ai: (symbol, selected) =>
    `portal-ai/fundamentals/${symbol}/?tag=${selected}`,
  portal_ai_response: 'api/v1/conversations/chat/stream',
};

export default StockEndpoints;