import axios from "axios";
import { authPost } from "./authClient";
import {
  get,
  post,
  del,
  put,
  patch,
  delWithParams,
  postWithoutRetry,
} from "./MainClient";
import { withoutAuthGet } from "./withoutAuthClient";

//get search results
export const getSearchData = async (input) => {
  const searchResp = await get(
    `company/search/portal/?search=${encodeURIComponent(input)}`,
  ).then((resp) => {
    return resp;
  });
  return searchResp;
};
export const getHighLowData = async (
  input,
  symbol,
  page,
  per_page,
  sortBy,
  sortOrder,
) => {
  const highlowResp = await get(
    `prices/${input}/52Week/?search=${symbol}&page=${page}&per_page=${per_page}&sort_by=${sortBy}&is_ascending=${sortOrder}`,
  ).then((resp) => {
    return resp;
  });
  return highlowResp;
};

// post signup data

export const postSignupData = async (data) => {
  const SignupResp = await authPost(`rest-auth/registration/`, data).then(
    (resp) => {
      return resp;
    },
  );
  return SignupResp;
};
// ..post login data
export const postLoginData = async (data) => {
  const loginResp = await authPost(`rest-auth/login/`, data).then((resp) => {
    return resp;
  });
  return loginResp;
};

export const postRefreshToken = async (data) => {
  const loginResp = await post(`token/refresh/`, data).then((resp) => {
    return resp;
  });
  return loginResp;
};
//post forgot password data
// export const postForgoPassword = async (data) => {
//   const forgotResp = await authPost(`accounts/password/reset/`, data).then(
//     (resp) => {
//       return resp;
//     }
//   );
//   return forgotResp;
// };

export const postForgoPassword = async ({ value }) => {
  const forgotResp = await authPost(`rest-auth/password/reset/`, value).then(
    (resp) => {
      return resp;
    },
  );
  return forgotResp;
};
//post google login

export const postGoogleAuth = async (data) => {
  const googleResp = await authPost(`rest-auth/google/`, data).then((resp) => {
    return resp;
  });
  return googleResp;
};
export const postOnetapLogin = async (data) => {
  const googleResp = await authPost(`onetap/`, data).then((resp) => {
    return resp;
  });
  return googleResp;
};
// getstock basic data
export const getStockGraphData = async (url) => {
  const response = await get(url).then((resp) => {
    return resp;
  });
  return response;
};

//rget key metrics
export const getKeyMetrics = async (url) => {
  const response = await get(url).then((resp) => {
    return resp;
  });
  return response;
};

//delete stock from watchlist
export const delStockFromWatchlist = async (activeTab, data) => {
  const response = await del(`watchlists/${activeTab}/`).then((resp) => {
    return resp;
  });
  return response;
};

export const getBucketdata = async () => {
  const response = await get("/buckets/").then((resp) => {
    return resp;
  });
  return response;
};
export const getBucketdataHeatmap = async () => {
  const response = await get("stockresearch/heat-map-view/").then((resp) => {
    return resp;
  });
  return response;
};
export const getBucketDescHeatmap = async (temp_sector) => {
  const response = await get(
    `buckets/heatmap/description/?bucket_id=${temp_sector}`,
  ).then((resp) => {
    return resp;
  });
  return response;
};
export const getBucketdataHeatmapId = async (id, filter) => {
  const response = await get(
    `/stockresearch/heatmaps/?id=${id}&filter=${filter}`,
  ).then((resp) => {
    return resp;
  });
  return response;
};
export const getAllStocks = async (indexname) => {
  const response = await get(`/company/stock/heatmap/${indexname}/`).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};
export const getAllMonthlyIndices = async (indexname) => {
  const response = await get(`/company/index/heatmap/${indexname}/`).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};
export const getSuperStar = async ({ indexname, filter }) => {
  const response = await get(
    `/prices/superstar/heatmap/${indexname}/?filter=${filter}`,
  ).then((resp) => {
    return resp.data;
  });
  return response;
};
export const getBucketCompany = async (
  name,
  sortBy = "mcap",
  sortHead = false,
) => {
  const response = await get(
    `/buckets/${name}/?by=${sortBy}&ascending=${sortHead}`,
  ).then((resp) => {
    return resp;
  });
  return response;
};
// BalanceSheet
export const getBalanceSheet = async () => {
  const response = await get(`/stock/RELIANCE/standalone/balance-sheet`).then(
    (resp) => {
      return resp.data;
    },
  );
  return response;
};
//renamme watchlist name
export const PatchRenameWatchList = async ({ WatchList, data }) => {
  // const data = {new_name:'One',stocks:['RELIANCE']}
  const response = await patch(`watchlists/${WatchList}/`, data).then(
    (resp) => {
      return resp.data;
    },
  );
  return response;
};
//delete watch list data
export const DeleteWatchlist = async ({ WatchList }) => {
  const data = { stocks: ["BAJAJHLDNG", "RELIANCE"] };
  // fetch('watchlists/sanal12' , {
  // method: 'DELETE',
  //   })
  const response = await del(`watchlists/${WatchList}/`).then((resp) => {
    return resp;
  });
  return response;
};
//Clear watch list data
export const ClearWatchlist = async ({ WatchList, data }) => {
  // fetch('watchlists/sanal12' , {
  // method: 'DELETE',
  //   })
  const response = await delWithParams(`watchlists/${WatchList}/`, data).then(
    (resp) => {
      return resp.data;
    },
  );
  return response;
};
//create watchlist
export const CreateWatchlsit = async (data) => {
  const response = await post(`watchlists/`, data).then((resp) => {
    return resp.data;
  });
  return response;
};
export const getstockRedirectStatus = async (symbol) => {
  if (symbol === undefined) {
    return;
  }
  const response = await get(`stock/${symbol}/company-type/`).then((resp) => {
    return resp.data;
  });
  return response;
};
export const getIndexconstitients = async ({
  indexname,
  page,
  sortBy,
  sortHead,
}) => {
  const response = await get(
    `index/constitients/${indexname}/?page=${
      page.num ?? 1
    }&by=${sortBy}&ascending=${sortHead}&per_page=${page.perPage ?? 25}`,
  ).then((resp) => {
    return resp?.data;
  });
  return response;
};
export const getNewHeatMapData = async ({
  indexname,
  page,
  filter,
  type,
  sortBy,
  sortOrder,
}) => {
  const response = await get(
    `/stocks/heatmap/${indexname}/?page=${page.num ?? 1}&per_page=${
      page.perPage ?? 25
    }&filter=${filter}${type === undefined ? "" : `&type=${type}`}${
      sortBy === undefined ? "" : `&by=${sortBy}`
    }${sortOrder === undefined ? "" : `&ascending=${sortOrder}`}`,
  ).then((resp) => {
    return resp?.data;
  });
  return response;
};
export const IpoHeatmap = async ({ types }) => {
  const response = await get(
    `/ipos/heatmap/newlisting/?year=2024&type=${types}`,
  ).then((resp) => {
    return resp.data;
  });
  return response;
};
export const getNewWorldHeatMapData = async ({
  indexname,
  page,
  type,
  sortBy,
  sortOrder,
}) => {
  const response = await get(
    `/prices/heatmap/${indexname}/?page=${page.num ?? 1}&per_page=${
      page.perPage ?? 25
    }${type === undefined ? "" : `&type=${type}`}${
      sortBy === undefined ? "" : `&by=${sortBy}`
    }${sortOrder === undefined ? "" : `&ascending=${sortOrder}`}`,
  ).then((resp) => {
    return resp.data;
  });
  return response;
};
export const getPortfolioHeatMapData = async ({ portId, filter }) => {
  const response = await get(
    `portfolio/analysis/heatmap/${portId}/?duration=${filter}`,
  ).then((resp) => {
    return resp;
  });
  return response;
};
export const getIndexreturns = async ({ indexname }) => {
  const response = await get(
    `/index-returns/${indexname !== "GIFT-NIFTY" ? indexname : "NIFTY"}/`,
  ).then((resp) => {
    return resp?.data;
  });
  return response;
};
export const getCorpActions = async (url) => {
  const response = await get(url).then((resp) => {
    return resp.data;
  });
  return response;
};

export const Indexperformance = async ({ indexname }) => {
  const response = await get(`/index/${indexname}/performance`).then((resp) => {
    return resp?.data;
  });
  return response;
};
export const getIndexDetails = async ({ indexname }) => {
  const response = await get(`/index/${indexname}/movers/`).then((resp) => {
    return resp?.data;
  });
  return response;
};
export const CompareStocksApi = async (CompanyType, removedEmptyData, year) => {
  let urlStr = "";
  removedEmptyData.forEach((element) => {
    urlStr += `stocks=${element?.replaceAll("&", "%26")}&`;
  });

  const response = await get(
    `company/compare-key-metrics/${CompanyType}/?${urlStr}${year}`,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const GetUpdatedChanges = async (symbol, times) => {
  const response = await get(`stock/${symbol}/change/?${times}`).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};

// stockComapre page returns api
export const GetReturnsComparestocks = async (removedEmptyData) => {
  let urlStr = "";
  removedEmptyData.forEach((element) => {
    urlStr += `stocks=${element?.replaceAll("&", "%26")}&`;
  });

  const response = await get(`/stock/returns/compare/?${urlStr}`).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};

//getting finational graph data
export const getFinational = async (removedEmptyData, CompanyType) => {
  let urlStr = "";
  removedEmptyData.forEach((element) => {
    urlStr += `stocks=${element?.replaceAll("&", "%26")}&`;
  });
  const response = await get(
    `/company/compare-ratio/${CompanyType}/?${urlStr}`,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getNewsSymbolsData = async (id) => {
  const response = await get(`/identify/${id}`).then((resp) => {
    return resp;
  });
  return response;
};

export const getProfitAndLossCompareStocks = async (
  removedEmptyData,
  selectd,
  CompanyType,
) => {
  let urlStr = "";
  removedEmptyData.forEach((element) => {
    urlStr += `stocks=${element?.replaceAll("&", "%26")}&`;
  });

  const response = await get(
    `/company/compare-profit-loss/statements/${CompanyType}/?${urlStr}&${selectd}`,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getBalanceStocksCompareStocks = async (
  removedEmptyData,
  selectd,
  CompanyType,
) => {
  let urlStr = "";
  removedEmptyData.forEach((element) => {
    urlStr += `stocks=${element?.replaceAll("&", "%26")}&`;
  });

  const response = await get(
    `company/compare-balancesheet/${CompanyType}/?${urlStr}${selectd}`,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getCashFlowCompareStocks = async (
  removedEmptyData,
  CompanyType,
  selectd,
) => {
  let urlStr = "";
  removedEmptyData.forEach((element) => {
    urlStr += `stocks=${element?.replaceAll("&", "%26")}&`;
  });

  const response = await get(
    `company/compare-cashflow/${CompanyType}/?${urlStr}${
      selectd === undefined ? "" : `${selectd}`
    }`,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getShareHoldingCompareStocks = async (
  removedEmptyData,
  selectd,
  CompanyType,
) => {
  let urlStr = "";
  removedEmptyData.forEach((element) => {
    urlStr += `stocks=${element?.replaceAll("&", "%26")}&`;
  });

  const response = await get(
    `company/compare-shareholding/${CompanyType}/?${urlStr}${selectd}`,
  ).then((resp) => {
    return resp;
  });
  return response;
};
// stock/shareholding/compare/standalone/?stocks=RELIANCE&stocks=ICICIBANK&stocks=ZOMATO&stocks=TCS&stocks=INDIGO
export const getQuaterlyCompareStocks = async (
  removedEmptyData,
  selectd,
  CompanyType,
) => {
  let urlStr = "";
  removedEmptyData.forEach((element) => {
    urlStr += `stocks=${element?.replaceAll("&", "%26")}&`;
  });

  const response = await get(
    `company/compare-quarterly/statements/${CompanyType}/?${urlStr}${
      selectd === undefined ? "" : `&year=${selectd}`
    }`,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getCompareStocksList = async (removedEmptyData) => {
  let urlStr = "";
  removedEmptyData.forEach((element) => {
    urlStr += `stocks=${element?.replaceAll("&", "%26")}&`;
  });

  const response = await get(
    `company/compare-monthly-returns/graph/?${urlStr}`,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getFactSheetCompareStocks = async (
  removedEmptyData,
  selectd,
  CompanyType,
) => {
  let urlStr = "";
  removedEmptyData.forEach((element) => {
    urlStr += `stocks=${element?.replaceAll("&", "%26")}&`;
  });

  const response = await get(
    `company/compare-factsheet/${CompanyType}/?${urlStr}${selectd}`,
  ).then((resp) => {
    return resp;
  });
  return response;
};

//Update portfolio analysis
export const UpadatePortfolioAnalysis = async ({ updateAndDeleteid, data }) => {
  const response = await put(
    `portfolio/update/${updateAndDeleteid}/`,
    data,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const DeletePortfolioAnalysis = async ({ updateAndDeleteid }) => {
  const response = await del(`portfolio/delete/${updateAndDeleteid}/`).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};

export const AddStockPortfolioAnalysis = async ({ data }) => {
  const response = await post(
    "portfolio/analysis/stock/transaction/",
    data,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getPortfolioHolding = async (
  portfolioid,
  holdSortState,
  sortOrder,
) => {
  // if(portfolioid.portfolioid === undefined ){
  //   return
  // }
  // ?by=${holdSortState?.head}&ascending=${holdSortState?.sortOrder}
  const response = await get(
    `portfolio/list/stocks/${portfolioid}/?by=${holdSortState}&ascending=${sortOrder}&source=web`,
  ).then((resp) => {
    return resp;
  });
  return response;
};
export const getPortfolioResearchRepo = async (portfolioId) => {
  const response = await get(
    `portfolio/analysis/research/report/${portfolioId}/`,
  ).then((resp) => {
    return resp;
  });

  return response;
};

export const getPortfolioSmartScore = async (portfolioId) => {
  const response = await get(
    `/list/stocks-score/${portfolioId}/?source=web`,
  ).then((resp) => {
    return resp;
  });

  return response;
};
// / /list/stock/5/

export const getCMP = async ({ Inputdatais, NewFormatOfDate }) => {
  const response = await withoutAuthGet(
    `/portfolio/mcap/${Inputdatais}/?date=${NewFormatOfDate}`,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const removeStockFromportfolio = async (e) => {
  const response = await del(`portfolio/analysis/delete/stock/${e}/`).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};

export const getStockTransactionPortfolio = async (e) => {
  if (e === undefined) {
    return;
  }
  const response = await get(`portfolio/list/transactions/${e}/`).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};

// remove/stock/4/

export const getEditPertiicullarTrasation = async ({
  perticularTrasationid,
  data,
}) => {
  const response = await put(
    `portfolio/edit/stock/transaction/${perticularTrasationid}/`,
    data,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getPortfolioAnalysisCardData = async ({ portfolioid }) => {
  if (portfolioid === undefined) {
    return;
  }
  // const response = await get(`/portfolio/value/${portfolioid}/`).then(
  const response = await get(`portfolio/stocks/overview/${portfolioid}/`).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};

export const getSizeIndustryAnalysisGraph = async ({ portfolioid }) => {
  if (portfolioid === undefined) {
    return;
  }
  const response = await get(`/industry/analysis/stock/${portfolioid}/`).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};

export const getAllTradeRecordsdata = async (portfolioid, selectd1) => {
  const response = await get(
    `portfolio/analysis/trade-records/${portfolioid}/?duration=${selectd1}`,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getDividentApi = async (portfolioid) => {
  if (portfolioid === undefined) {
    return;
  }
  const response = await get(`/dividend/ratio/${portfolioid}/`).then((resp) => {
    return resp;
  });
  return response;
};

export const getRelizedProfitPortfolio = async (portfolioid, date) => {
  const response = await get(
    `portfolio/analysis/realized-profit-loss/${portfolioid}/?duration=${date}`,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getMultiGraphProfitPortfolio = async (
  portfolioid,
  daysDuration,
) => {
  if (portfolioid === undefined) return;
  const response = await get(
    `portfolio/analysis/graph/${portfolioid}/${`?duration=${daysDuration}`}`,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const googleTapRedirect = (redir_link) => {
  const datastate = `redir_state:${encodeURIComponent(redir_link || "/")}`;

  const scope = encodeURIComponent(
    "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
  );

  const redirectUri = encodeURIComponent(
    `${process.env.NEXT_APP_HOST_URL}onetap/callback/`,
  );

  const googleRes = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${redirectUri}&prompt=consent&response_type=token&client_id=1065016260363-bt80d75995gpcisjjq345bmfj8qjq49h.apps.googleusercontent.com&scope=${scope}&state=${datastate}`;

  return googleRes;
};

export const getPlans = async () => {
  const response = await get(`/payments/plans/`).then((resp) => {
    return resp;
  });
  return response;
};

export const getTrendingStocks = async () => {
  const response = await get(`/index/NIFTY/movers/?limit=8`).then((resp) => {
    return resp;
  });
  return response;
};

export const PostConfirmPassword = async ({ data }) => {
  const response = await authPost("rest-auth/password/confirm/", data).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};
// update userData
export const patchUserData = async (data) => {
  const response = await patch(`/profile/`, data).then((resp) => {
    return resp;
  });
  return response;
};

export const PostSubmitPlanSubScription = async (data) => {
  const response = await post(`/payment/checkout/page/`, data).then((resp) => {
    return resp;
  });
  return response;
};
export const PostPlanSubScription = async (data) => {
  const response = await post("/payments/purchase/", data).then((resp) => {
    return resp;
  });
  return response;
};

export const postEmailActivation = async ({ email, tocken }) => {
  const response = await get(`/confirm-email/${email}/${tocken}`).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};

export const getCouponsList = async ({ plan_id }) => {
  const response = await get(`/coupons/?plan_id=${plan_id}`).then((resp) => {
    return resp;
  });
  return response;
};

export const PostApplyCoupen = async ({ plan_id, CouponValue }) => {
  const response = await get(
    `/coupons/validate/?plan_id=${plan_id}&code=${CouponValue}`,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getAffiliateDashboardCard = async () => {
  const response = await get(`affiliate/dashboard/`).then((resp) => {
    return resp;
  });
  return response;
};

export const getAffiliatesignupdata = async () => {
  const response = await get(`affiliate/signup/`).then((resp) => {
    return resp;
  });
  return response;
};
// affiliate/sales/?amount_min=1000&amount_max=100000&plan=12months
// get affilite sale
export const getAffiliateSales = async (Filter) => {
  const data = Filter.toString();
  const response = await get(
    `affiliate/sales/?${data.replaceAll(",", "&")}`,
  ).then((resp) => {
    // ?${plan !== undefined && plan !== false&&`plan=${plan}`} ${amount !==undefined && `&${amount}`}
    return resp;
  });
  return response;
};
//get affilite payout details
export const getAffiliatePayout = async (Filter) => {
  const data = Filter.toString();
  const response = await get(
    `affiliate/payout/?${data.replaceAll(",", "&")}`,
  ).then((resp) => {
    return resp;
  });
  return response;
};
export const getAffiliatePayoutTotal = async () => {
  const response = await get(`affiliate/payout/total_earnings/`).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};
// affiliate/signup/analysis/?search=Lisa
export const getAffiliateSignup = async () => {
  const response = await get(`affiliate/signup/analysis/`).then((resp) => {
    return resp;
  });
  return response;
};

export const getAffiliateHelpCenter = async () => {
  const response = await get(`faq/?category=affiliate`).then((resp) => {
    return resp;
  });
  return response;
};

export const getAffiliateSugnuptotal = async () => {
  const response = await get(`affiliate/signup/total_signup/`).then((resp) => {
    return resp;
  });
  return response;
};

export const putAffiliateTermm = async (data) => {
  const response = await put(`/affiliate/termsaccept/`, data).then((resp) => {
    return resp;
  });
  return response;
};

// affiliate/signup/total_signup/

export const getAffiliateDashdata = async ({ duration }) => {
  if (duration === undefined) {
    return;
  }
  const response = await get(
    `/affiliate/dashboard/data/?month=${duration}`,
  ).then((resp) => {
    return resp;
  });
  return response;
};
export const getAffiliatePromotion = async () => {
  const response = await get(`/affiliate/promotion/images/ `).then((resp) => {
    return resp;
  });
  return response;
};

export const getDashboardGraph = async ({ value }) => {
  const response = await get(`affiliate/dashboard/graph/?search=${value}`).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};

export const getAdminStages = async (State, Stages) => {
  const response = await get(
    `${Stages}/?${Stages === "stage-one" ? "is_verified" : "status"}=${State}`,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getSearchUserAdmin = async (input, State, Stages, dateString) => {
  const response = await get(`${Stages}/?${
    Stages === "stage-one" ? "is_verified" : "status"
  }=${State}${input === undefined ? "" : `&search=${input}`}${
    dateString[0] === undefined ? "" : `&min_date=${dateString[0]}`
  }${dateString[0] === undefined ? "" : `&max_date=${dateString[1]}`}
       `).then((resp) => {
    return resp;
  });
  return response;
};

export const getCoundofAffiliate = async (Stages) => {
  const response = await get(`${Stages}/count/`).then((resp) => {
    return resp;
  });
  return response;
};
export const getReviewofAffilate = async (id, type) => {
  const response = await get(`${type}/review/${id}/`).then((resp) => {
    return resp;
  });
  return response;
};

export const updateDatailsAdmin = async (commision, type, id, status) => {
  const data = {
    verification: status?.status,
    commision: status?.commision ? status?.commision : commision?.commision,
  };
  const response = await put(`${type}/review/${id}/`, data).then((resp) => {
    return resp;
  });
  return response;
};

export const getAllAffiliateData = async (Page, input, dateString) => {
  const response = await get(
    `/affiliate/admin/overvew/?page=${Page}${
      input !== undefined ? `&search=${input}` : ""
    }  ${dateString !== undefined ? `&max_date=${dateString[1]}` : ""} ${
      dateString !== undefined ? `&min_date=${dateString[0]}` : ""
    }`,
  ).then((resp) => {
    return resp;
  });
  return response;
};
export const getAllAffiliateindividualData = async (id) => {
  const response = await get(
    `affiliate/admin/individual-affiliate/${id}/`,
  ).then((resp) => {
    return resp;
  });
  return response;
};
export const postMailChimp = async (mail) => {
  const response = await post(`mailchimp/add/?email=${mail}`).then((resp) => {
    return resp;
  });
  return response;
};

export const updateCommitinAllaffiliate = async (commision, id) => {
  const data = { commision: commision?.commision };
  const response = await put(`stage-one/review/${id}/`, data).then((resp) => {
    return resp;
  });
  return response;
};

export const getAdminAffiliateSales = async (id, Filter, plan, commi) => {
  const response = await get(
    `affiliate/admin/sales_performance/${id}/?${
      Filter.search !== undefined ? `&search=${Filter.search}` : ""
    } ${
      Filter.mindate !== undefined && Filter.mindate.length > 0
        ? `&min_date=${Filter.mindate}`
        : ""
    } ${
      Filter.maxdate !== undefined && Filter.maxdate.length > 0
        ? `&max_date=${Filter.maxdate}`
        : ""
    } ${
      Filter.planvalue !== undefined && Filter.planvalue.length > 0
        ? `&${plan}=${Filter.planvalue}`
        : ""
    } ${
      Filter.commi !== undefined && Filter.commi > 0
        ? `&${commi}=${Filter.commi}`
        : ""
    }`,
  ).then((resp) => {
    return resp;
  });
  return response;
};
// ?min_earnings=600&max_earnings=700&min_date=2022-10-28&max_date=2022-10-28&search=am

export const getAdminindividualAffiliatePayoutDetails = async () => {
  const response = await get(
    `affiliate/admin/individual-affiliate-payout/1`,
  ).then((resp) => {
    return resp;
  });
  return response;
};
export const getAdminAffiliatePayoutDetails = async () => {
  const response = await get(`affiliate/admin/payout/`).then((resp) => {
    return resp;
  });
  return response;
};

// All Affiliate page sales performace
export const getAllafiliateSalesPerformance = async (id) => {
  const response = await get(
    `affiliate/admin/sales_performance/data/${id}/`,
  ).then((resp) => {
    return resp;
  });
  return response;
};

// affiliate/admin/sales_performance/data/1/?min_earnings=600&max_earnings=700&min_date=2022-10-28&max_date=2022-10-28&plan=6months&search=Maulika
export const getOverallAffiliateSales = async (
  Filter,
  revenue,
  commi,
  earnings,
) => {
  const response = await get(
    `affiliate/admin/overall-sales/?${
      Filter?.search !== undefined && Filter?.search?.length !== 0
        ? `&search=${Filter?.search}`
        : ""
    } ${
      Filter.revenue !== undefined && Filter.revenue.length > 0
        ? `&${revenue}=${Filter.revenue}`
        : ""
    } ${
      Filter.earnings !== undefined && Filter.earnings.length > 0
        ? `&${earnings}=${Filter.earnings}`
        : ""
    } ${
      Filter.commi !== undefined && Filter.commi.length > 0
        ? `&${commi}=${Filter.commi}`
        : ""
    } ${
      Filter.maxdate !== undefined && Filter.maxdate.length > 0
        ? `&max_date=${Filter.maxdate}`
        : ""
    }`,
  ).then((resp) => {
    return resp;
  });
  return response;
};
// affiliate/admin/overall-sales/?search=MS&revenue_generated_min=1500&revenue_generated_max=1500&commision_max=10&commision_min=19&min_earnings=0&max_earnings=800

export const getAdmindashboardmovers = async (date) => {
  const response = await get(
    `signups-dashboard/?${date !== undefined ? `start_date=${date[0]}` : ""}${
      date !== undefined ? `&end_date=${date[1]}` : ""
    }`,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getAdminAffiliateReports = async (date) => {
  const response = await get(
    `affiliate/admin/report/slab/?${date !== undefined ? `date=${date}` : ""}`,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getAdminAffiliateReportsgraph = async (dateString) => {
  const response = await get(
    `affiliate/admin/report/?${
      dateString !== undefined ? `start_date=${dateString[0]}` : ""
    }${dateString !== undefined ? `&end_date=${dateString[1]}` : ""} `,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getAdminaffiliateReportTopAffiliate = async () => {
  const response = await get(`affiliate/admin/top-affiliates/`).then((resp) => {
    return resp;
  });
  return response;
};

export const postAffiliatePromotionimage = async (data) => {
  const response = await post(`affiliate/admin/promotion-images/`, data).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};

export const getAffiliatePromotionimage = async () => {
  const response = await get(`affiliate/admin/promotion-images/`).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};
export const deleAffiliatePromotionImage = async (id) => {
  const data = {
    id: id,
  };
  const response = await delWithParams(
    `affiliate/admin/promotion-images/`,
    data,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const updateaffiliatepayoutstatus = async (id, setSelected) => {
  const data = {
    status: setSelected,
  };
  const response = await put(`affiliate/admin/payout/set/${id}/`, data).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};

export const getPayoutDetailsindividual = async (id, Filter) => {
  const response = await get(
    `affiliate/admin/individual-affiliate-payout/${id}/?${
      Filter?.search !== undefined ? `search=${Filter?.search}` : ""
    }`,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getAdminUserlisttabledata = async (Filter, page) => {
  const response = await get(
    `users-dashboard/?${page !== undefined ? `&page=${page}` : ""}${
      Filter?.search !== undefined && Filter?.search !== ""
        ? `&search=${Filter?.search}`
        : ""
    }`,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getAdminUsrcarddata = async () => {
  const response = await get("users-dashboard/data").then((resp) => {
    return resp;
  });
  return response;
};

export const getAdminusersGraph = async (Filter) => {
  const response = await get(
    `users-dashboard/graph/?${
      Filter?.maxdate !== undefined && Filter?.mindate?.length !== 0
        ? `&end_date=${Filter?.maxdate}`
        : ""
    }${
      Filter?.mindate !== undefined && Filter?.mindate?.length !== 0
        ? `&start_date=${Filter?.mindate}`
        : ""
    }`,
  ).then((resp) => {
    return resp;
  });
  return response;
};
export const getAffiliateQueries = async () => {
  const response = await get(`affiliate/admin/questions/`).then((resp) => {
    return resp;
  });
  return response;
};

export const DeleteAffiliateQueries = async (id) => {
  const data = {
    id: id,
  };
  const response = await delWithParams(`affiliate/admin/questions/`, data).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};

export const CreateAffiliateQueries = async (question, answer) => {
  const data = {
    question: question,
    answer: answer,
  };
  const response = await post(`affiliate/admin/questions/`, data).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};

export const UpdateAffiliateQueries = async (question, answer, id) => {
  const data = {
    question: question,
    answer: answer,
    id: id,
  };
  const response = await put(`affiliate/admin/questions/`, data).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};

export const getAdminAllQueries = async (Filter, earnings, revenue, commi) => {
  const response = await get(
    `affiliate/admin/all-queries/?${
      Filter?.search !== undefined && Filter?.search?.length !== 0
        ? `&search=${Filter?.search}`
        : ""
    } ${
      Filter.revenue !== undefined && Filter.revenue.length > 0
        ? `&${revenue}=${Filter.revenue}`
        : ""
    } ${
      Filter.earnings !== undefined && Filter.earnings.length > 0
        ? `&${earnings}=${Filter.earnings}`
        : ""
    } ${
      Filter.commi !== undefined && Filter.commi.length > 0
        ? `&${commi}=${Filter.commi}`
        : ""
    } ${
      Filter.maxdate !== undefined && Filter.maxdate.length > 0
        ? `&max_date=${Filter.maxdate}`
        : ""
    }`,
  ).then((resp) => {
    return resp;
  });
  return response;
};
export const getAdminQueriesDetails = async (id) => {
  const response = await get(`affiliate/admin/queries/?id=${id}`).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};

export const UpdateAdminQueriesDetails = async (id, Status) => {
  const data = {
    id: id,
    status: Status?.status,
    reply: Status?.reply,
  };
  const response = await put(`affiliate/admin/queries/`, data).then((resp) => {
    return resp;
  });
  return response;
};

export const getAllScreenStocks = async (data, page, perPage) => {
  const response = await post(
    `screener-cmots/?page=${page}&per_page=${perPage}`,
    data.payload,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getAdminprimumnSupport = async (Filter) => {
  const response = await get(
    `/premium-support/dashboard/?${
      Filter?.search ? `search=${Filter?.search}` : ""
    }`,
  ).then((resp) => {
    return resp;
  });
  return response;
};
export const getAdminprimumnSupportDetails = async (id) => {
  const response = await get(`/premium-support/detail/?id=${id}`).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};
export const UpdateAdminprimumnSupportDetails = async (id, status) => {
  const data = {
    id: id,
    status,
    status,
  };
  const response = await put(`/premium-support/detail/`, data).then((resp) => {
    return resp;
  });
  return response;
};

export const getAdminBucketsList = async (Filter) => {
  const response = await get(
    `/bucket-list/?${
      Filter?.search?.length > 0 ? `search=${Filter?.search}` : ""
    }`,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getBucketDetails = async (Filter) => {
  const response = await get(
    `/bucket-list/?${
      Filter?.search?.length > 0 ? `search=${Filter?.search}` : ""
    }`,
  ).then((resp) => {
    return resp;
  });
  return response;
};
export const postAdminBucketDetails = async (data) => {
  const response = await post(`bucket-list/`, data).then((resp) => {
    return resp;
  });
  return response;
};
export const putAdminBucketDetails = async (data) => {
  const response = await put(`bucket-list/`, data).then((resp) => {
    return resp;
  });
  return response;
};
export const DeleteAdminBucketDetails = async (id) => {
  let data = {
    id: id,
  };

  const response = await delWithParams(`bucket-list/`, data).then((resp) => {
    return resp;
  });
  return response;
};

export const checkFingradAccess = async (email) => {
  const response = await axios
    .get(
      `https://joinfingrad.com/api/payments/get-event-coupon/?email=${email}`,
      // `https://learn.tradebrains.in/api/payments/get-event-coupon/?email=${email}`
    )
    .then((resp) => {
      return resp;
    });
  return response;
};

export const getAdminAllaffiliatesignupusers = () => {
  const response = get("affiliate/admin/free-signups/1/").then((resp) => {
    return resp;
  });
  return response;
};
export const getAdminTrasationDetails = (page, Filter) => {
  const response = get(
    `user-transections/dashboard/?page=${page}&${
      Filter?.search?.length !== 0 ? `search=${Filter?.search} ` : ""
    }`,
  ).then((resp) => {
    return resp;
  });
  return response;
};
export const getFundamentalPorfolioAnalysis = (sortState, id) => {
  const response = withoutAuthGet(
    `portfolio/fundamental/${id}/?by=${sortState?.head}&ascending=${sortState?.sortOrder}`,
  ).then((resp) => {
    return resp;
  });
  return response;
};
export const getMonthlyWiseAnalysedData = (id, Selected) => {
  if (id === undefined) {
    return;
  }
  const response = get(`test_port/${id}/?val=${Selected}`).then((resp) => {
    return resp;
  });
  return response;
};

export const getMarketReturns = (
  CurremtValue,
  value1,
  Page,
  sortBy,
  sortOrder,
  perPage,
) => {
  const response = get(
    `indexstas/?exchange=${CurremtValue}&by=${value1}&page=${Page}&sort_by=${sortBy}&ascending=${sortOrder}&per_page=${perPage}`,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const searchMarketStats = (
  CurremtValue,
  value1,
  Page,
  sortBy,
  sortOrder,
  perPage,
  query,
) => {
  const searchParam = query ? `${encodeURIComponent(query)}` : "";
  const response = get(
    `prices/index/market-stats/?exchange=${CurremtValue}&page=${Page}&sort_by=${sortBy}&ascending=${!sortOrder}&per_page=${perPage}&search=${searchParam}`,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getProfitTrackerData = (porfolioid) => {
  const response = get(`portfolio/performance_tracker/${porfolioid}/`).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};

export const getEventTrackerData = (porfolioid, status, Page) => {
  const response = get(
    `event_tracker/${porfolioid}/?status=${status}&page=${Page}`,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getEventTracker = (porfolioid, status, type) => {
  const response = get(
    `portfolio/analysis/corporate/actions/${porfolioid}/?event_type=${status}&is_upcoming=${type}`,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getCorpActionsIndexData = (Value, Page, type, Filtered) => {
  const params = new URLSearchParams();

  if (Value) params.append("event_type", Value);
  if (Page?.page) params.append("page", Page.page);
  if (Page?.perPage) params.append("per_page", Page.perPage);

  if (type) params.append("search", type);

  if (Filtered?.mindate) params.append("min_date", Filtered.mindate);
  if (Filtered?.maxdate) params.append("max_date", Filtered.maxdate);

  return get(`corporateactions/upcomming/?${params.toString()}`);
};

export const getCorpActionsIndexDataFaq = (Value, minDate, maxDate) => {
  const response = get(
    `corporateactions/upcomming/?event_type=${Value}&min_date=${minDate}&max_date=${maxDate}
     `,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const postAddCoupon = async (data) => {
  const response = await post(`coupons/add/`, data).then((resp) => {
    return resp;
  });
  return response;
};
export const getAdminCoupon = (page, perPage) => {
  const response = get(`coupons/list/?page=${page}&per_page=${perPage}`).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};
export const putEditCoupon = async (data, id) => {
  const response = await put(`coupons/edit/${id}/`, data).then((resp) => {
    return resp;
  });
  return response;
};
export const deleteCoupon = async (id) => {
  const response = await del(`coupons/edit/${id}/`).then((resp) => {
    return resp;
  });
  return response;
};
export const getAdminPortfolio = (searchInput) => {
  const response = get(
    `superstar-list/${searchInput ? `?search=${searchInput}` : ""}`,
  ).then((resp) => {
    return resp;
  });
  return response;
};
export const addAdminStar = async (data) => {
  const response = await post(`superstar/add/`, data).then((resp) => {
    return resp;
  });
  return response;
};
export const putStarPortfolio = async (data, id) => {
  const response = await put(`superstar/update/${id}/`, data).then((resp) => {
    return resp;
  });
  return response;
};
export const deleteAdminStarportfolio = async (id) => {
  const response = await del(`superstar/update/${id}/`).then((resp) => {
    return resp;
  });
  return response;
};
//get the watchlist stocks based on the watch list we sent
// export const getWatchliststocks2 = (id, sortBy, sortOrder, duration) => {
//   const response = get(
//     `user-watchlist/?watchlist_id=${id}${sortBy === undefined ? "" : `&by=${sortBy}`}${sortOrder === undefined ? "" : `&ascending=${sortOrder}`}${duration === undefined ? "" : `&duration=${duration}`}&source=web`
//   ).then((resp) => {
//     return resp;
//   });
//   return response;
// };

export const getWatchliststocks = (id, sortBy, sortOrder, duration) => {
  const response = get(
    `watchlist/list/stocks/?watchlist=${id}${
      sortBy === undefined || sortBy === null ? "" : `&by=${sortBy}`
    }${
      sortOrder === undefined || sortOrder === null
        ? ""
        : `&is_ascending=${!sortOrder}`
    }${duration === undefined ? "" : `&duration=${duration}`}&source=web`,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const postStockWatchlist = ({ id, fincodes }) => {
  const data = {
    watchlist: id,
    fincode: fincodes,
  };
  const response = post(`user-watchlist/`, data).then((resp) => {
    return resp;
  });
  return response;
};

export const newPostStockWatchlist = (data) => {
  const response = post(`watchlist/add/stocks/`, data).then((resp) => {
    return resp;
  });
  return response;
};

//RENAME THE WATCHLISE

// export const renamewatchlist = (data1) => {
//   const data = {
//     watchlist: data1?.watchlist,
//     name: data1?.WatchListrename,
//   };
//   const response = put(`watchlist-migrations/`, data).then((resp) => {
//     return resp;
//   });
//   return response;
// };

export const newRenameWatchlist = (data1) => {
  const response = put(`watchlist/edit/name/`, data1).then((resp) => {
    return resp;
  });
  return response;
};

//delete the watchlist with id

export const deletewatchlist = (id) => {
  const data = {
    watchlist: id,
    // "name":data1?.WatchListrename
  };
  const response = delWithParams(`watchlist-migrations/`, data).then((resp) => {
    return resp;
  });
  return response;
};
//clear the watchlist new integration
export const clearthewatchlist = (id) => {
  const data = {
    watchlist: id,
    command: "clear",
  };
  const response = delWithParams(`watchlist-migrations/`, data).then((resp) => {
    return resp;
  });
  return response;
};

export const deletestockfromwatchlist = ({ id, fincode }) => {
  const data = {
    watchlist: id,
    fincode: [fincode],
  };
  const response = delWithParams(`user-watchlist/?watchlist_id=150`, data).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};

export const deleteStockfromWatchlistNew = (data1) => {
  const response = delWithParams(`watchlist/remove/stocks/`, data1).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};

//create new watchlist

export const createwatchlist = ({ watchlist_name }) => {
  const data = {
    name: watchlist_name,
  };
  const response = post(`watchlist-migrations/`, data).then((resp) => {
    return resp;
  });
  return response;
};

export const createwatchlist2 = ({ watchlist_name }) => {
  const data = {
    name: watchlist_name,
  };
  const response = post(`watchlist/create/new/`, data).then((resp) => {
    return resp;
  });
  return response;
};

export const postFeedBack = (Rating, Review, email) => {
  const data = {
    user_email: email,
    review: Review,
    rating: Rating,
  };
  const response = post(`contact/user-testimonial/`, data).then((resp) => {
    return resp;
  });
  return response;
};

export const getFestivalStatus = () => {
  const response = get(`eventf/`).then((resp) => {
    return resp;
  });
  return response;
};
export const getPrecentagePortfolio = ({ portfolioid }) => {
  const response = get(`portfolio/todays-performance/${portfolioid}/`).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};

export const getUserInfo = () => {
  const response = get(`user/info/`).then((resp) => {
    return resp;
  });
  return response;
};
// post form for backtesting
export const postBacktestingApi = (ObjectForm) => {
  const response = post(`portfolio/backtesting/analysis/`, ObjectForm).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};
// post form for backtesting
export const postTableBacktestingApi = (ObjectForm) => {
  const response = post(
    `portfolio/backtesting/growth/returns/`,
    ObjectForm,
  ).then((resp) => {
    return resp;
  });
  return response;
};

// get daily limit for backtesting based on user Token
export const getLimitBackTesing = () => {
  const response = get(
    `/backtest/number/
    `,
  ).then((resp) => {
    return resp;
  });
  return response;
};
//stock details api
export const getStockDetails = (fincode) => {
  const response = get(
    `stock/about/${fincode}/
    `,
  ).then((resp) => {
    return resp;
  });
  return response;
};
//to get the array of stocks full name by passing list of symbols
export const postStockInfo = (stocks) => {
  const data = {
    symbols: typeof stocks === "object" ? stocks : [stocks],
  };
  const response = post(
    `stock/info/list/
    `,
    data,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getblogdata = (symbol) => {
  const response = get(`/stockresearch/live-data/?symbol=${symbol}`).then(
    (resp) => {
      return resp?.data;
    },
  );
  return response;
};

export const getSeoFaq = (url) => {
  const response = get(`seo-faqs/${url}`).then((resp) => {
    return resp?.data;
  });
  return response;
};

export const getPredefineCompareStocks = (url) => {
  const response = get(`stock/footer-links/compare/`).then((resp) => {
    return resp?.data;
  });
  return response;
};

export const fileUploadPortfolio = async (data) => {
  const response = await post(`portfolio/analysis/file-upload/`, data).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};

export const getFairValueCalculator = (symbol) => {
  const response = get(`stock/calculator/dcf/?symbol=${symbol}`).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};

export const calculateData = async (data) => {
  const response = await post(`stock/calculator/dcf/`, data).then((resp) => {
    return resp;
  });
  return response;
};

export const getReportsPremium = async (
  searchInput,
  sortRole,
  date,
  sortState,
  premium,
  mcap,
  sector,
  page,
  perPage,
) => {
  const params = new URLSearchParams();

  if (searchInput) params.append("search", searchInput);
  if (sortRole) params.append("role", sortRole);

  if (mcap) params.append("mcap_size", mcap);
  if (sector) params.append("sector", sector);

  if (sortState.head) {
    params.append("sort_by", sortState.head);
    params.append("isascending", sortState.sortOrder);
  }
  params.append("report_type", premium);
  params.append("page", page);
  params.append("per_page", perPage);

  const response = await get(
    `/research/premium/reports/?${params.toString()}`,
  ).then((resp) => resp);

  return response;
};

export const getReportsFree = async (
  sortRole,
  date,
  sortState,
  page,
  perPage,
  profit,
) => {
  const response = await get(
    `/research/free/reports/?profit_type=${profit}` +
      (sortRole ? `&role=${sortRole}` : "") +
      (sortState.head ? `&sort_by=${sortState.head}` : "") +
      (sortState.head ? `&isascending=${!sortState.sortOrder}` : "") +
      `&page=${page}&per_page=${perPage}`,
  ).then((resp) => resp);

  return response;
};

export const getResearchReportsFree = async (
  sortState,
  page,
  perPage,
  category = "all",
) => {
  let query = `/target-reached/${category}/?`;

  if (sortState.head) {
    query += `sort_by=${sortState.head}`;
    query += `&isascending=${!sortState.sortOrder}`;
  }

  query += `&page=${page}&per_page=${perPage}`;

  const response = await get(query);
  return response;
};

export const getReportsFreeDash = async () => {
  const response = await get(`/research/free/reports/`).then((resp) => {
    return resp;
  });
  return response;
};

export const getReportsPremiumDash = async () => {
  const response = await get(`/research/premium/reports/`).then((resp) => {
    return resp;
  });
  return response;
};

export const getUserQuery = async (searchInput, page, sortState) => {
  const response = await get(
    `/screener/list/user-screener/?${
      searchInput ? `search=${searchInput}&` : ""
    }page=${page}&ascending=${sortState?.sortOrder}`,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const screenerCustomData = async (data) => {
  const response = await post(`/screener/create/custom-screener/`, data).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};

export const deleteScreener = async (id) => {
  const response = await del(`/screener/delete/custom-screener/${id}/`).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};

export const getSlugData = async (slugs) => {
  const response = await get(`/screener/view/custom/${slugs}/`).then((resp) => {
    return resp;
  });
  return response;
};

export const getCreatPass = async () => {
  const response = await get(`/social-email-link/`).then((resp) => {
    return resp;
  });

  return response;
};

export const postCreatPass = async (data) => {
  const response = await post(`/social-email-link/`, data).then((resp) => {
    return resp;
  });
  return response;
};

export const getNewsContent = async (category, slug) => {
  const response = await get(`news/all/${category}/${slug}/`).then((resp) => {
    return resp;
  });
  return response;
};

/***********navbar menu api*************/

export const getAllStockSectorList = async () => {
  const response = await get(`company/sector-list/`).then((resp) => {
    return resp;
  });
  return response;
};
export const getAllStockIndustryList = async () => {
  const response = await get(`company/industries/list`).then((resp) => {
    return resp;
  });
  return response;
};
export const getGainerLoserList = async () => {
  const response = await get(`/index/all`).then((resp) => {
    return resp;
  });
  return response;
};

/***********navbar menu api*************/

/***********ipo api*************/

export const getIpoData = async () => {
  const response = await get(`ipos/ipo-list/ `).then((resp) => {
    return resp;
  });
  return response;
};

export const getIpoList = async (category) => {
  const response = await get(`ipos/ipo-data/${category}/`).then((resp) => {
    return resp;
  });
  return response;
};

export const getIPOContent = async (slug) => {
  const response = await get(`ipos/ipo-detail/${slug}/`).then((resp) => {
    return resp;
  });
  return response;
};

export const getIPOFinancials = async (slug, companyType) => {
  const response = await get(`ipos/financials/${slug}/${companyType}/`).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};

/***********Delete my account*************/

export const deleteMyAccount = async () => {
  const response = await del(`/user/delete/`).then((resp) => {
    return resp;
  });
  return response;
};

/***********Superstar portfolio*************/

export const getSuperStarView = async (perPage, page, search) => {
  const response = await get(
    `prices/superstar/portfolio/star/view/?page_size=${perPage}&page=${page}&search=${search}`,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getTopInvestors = async () => {
  const response = await get(`prices/superstar/top-investors/`).then((resp) => {
    return resp;
  });
  return response;
};

export const getSuperStarBioData = async (slug) => {
  const response = await get(`prices/superstar/bio-data/?slug=${slug}`).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};

export const getSuperStarStockList = async (
  slug,
  quarterly,
  sortBy,
  sortOrder,
) => {
  if (quarterly === null) {
    return;
  }
  const response = await get(
    `prices/superstar/stocklist/${slug}/?quater=${quarterly}&sort_by=${sortBy}&is_ascending=${sortOrder}`,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getSuperStarHolding = async (slug) => {
  const response = await get(`prices/superstar/graph/?slug=${slug}`).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};

export const getSuperStarAnalysis = async (slug, quarterly) => {
  if (quarterly === null) {
    return;
  }
  const response = await get(
    `prices/superstar/diversification/${slug}/?quater=${quarterly}`,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getSuperStarQuaterYear = async (slug) => {
  const response = await get(`prices/superstar/quaterlist/${slug}/`).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};

export const getSuperStarChangePer = async (slug, company) => {
  const response = await get(
    `prices/superstar/holdingchange/${slug}/${company}`,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getExchangeHoliday = async (currentYear) => {
  const response = await get(`company/exchange-holiday/${currentYear}/`).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};

export const comapnyHistory = async (symbol) => {
  const response = await get(`company/history/${symbol}/`).then((resp) => {
    return resp;
  });
  return response;
};

export const getAllStocksName = async (symbol) => {
  const response = await get(`stock/${symbol}/`).then((resp) => {
    return resp;
  });
  return response;
};

export const getHistoricData = async (symbol, type) => {
  const response = await get(
    `prices/historical-prices/${symbol}/?type=${type}`,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getShareHoldingQuarters = async (symbol) => {
  const response = await get(
    `company/top/shareholders/quaters/${symbol}/`,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getShareHoldingData = async (symbol, quaters) => {
  if (!symbol || !quaters) {
    return null;
  }
  const response = await get(
    `company/top/shareholders/${symbol}/${quaters}/`,
  ).then((resp) => {
    return resp;
  });
  return response;
};
// export const getSavedData = async (id) => {
//   const searchResp = await get(`/stock/research/reports/?report_id=${id}`).then(
//     (resp) => {
//       return resp;
//     }
//   );
//   return searchResp;
// };

//stock details new api

export const getGraphDataStockDetails = async (symbol, duration) => {
  const response = await get(
    `company/prices/graph/${symbol}/?duration=${duration}`,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getOverviewDetails = async (symbol) => {
  const response = await get(`/company/short/details/${symbol}/`).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};

export const getNewKeyMeticsTable = async (symbol) => {
  const response = await get(`company/keymetrics/${symbol}/`).then((resp) => {
    return resp;
  });
  return response;
};

export const getCAGR = async (symbol) => {
  const response = await get(`company/cagr/response/${symbol}/`).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};

export const getNewPortalScore = async (symbol) => {
  const response = await get(`company/portal/score/${symbol}/`).then((resp) => {
    return resp;
  });
  return response;
};

export const getTechnicalData = async (symbol) => {
  const response = await get(`company/stock/technicals/${symbol}/`).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};

export const getCorporateAction = async (symbol) => {
  const response = await get(`company/corporate/actions/${symbol}/`).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};

export const getShareHoldingGraph = async (symbol) => {
  const response = await get(`company/stock/shareholding/${symbol}/`).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};

export const getReportData = async (symbol) => {
  const response = await get(
    `company/individual/research/report/${symbol}/`,
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getCompetitorsData = async (symbol) => {
  if (!symbol || typeof symbol !== "string" || symbol.trim() === "") {
    throw new Error("Invalid symbol passed to API call");
  }

  return await get(`company/sector/industry/peers/${symbol}/`);
};

export const getProfileInfo = async (symbol) => {
  const response = await get(`company/profile/info/${symbol}/`).then((resp) => {
    return resp;
  });
  return response;
};

export const getCompanyHistory = async (symbol) => {
  const response = await get(`company/stock/history/${symbol}/`).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};

export const getCompanyManagement = async (symbol) => {
  const response = await get(`company/board/directors/${symbol}/`).then(
    (resp) => {
      return resp;
    },
  );
  return response;
};

export const getInsights = async (symbol) => {
  const response = await get(`company/insights/${symbol}/`).then((resp) => {
    return resp;
  });
  return response;
};

export const getStockSentiData = async (symbol) => {
  const IndexResp = await get(`company/stock/sentinal/${symbol}/`).then(
    (resp) => {
      return resp;
    },
  );
  return IndexResp;
};
export const postCreateStock = async (symbol, opinionData) => {
  const data = {
    opinion: opinionData,
  };
  const response = await post(`company/create/sentinal/${symbol}/`, data);
  return response;
};

export const getIndexData = async (symbol) => {
  const IndexResp = await get(`company/index/sentinal/${symbol}/`).then(
    (resp) => {
      return resp;
    },
  );
  return IndexResp;
};
export const get52GiftData = async () => {
  const IndexGiftResp = await get(`prices/index/giftnifty/52week`).then(
    (resp) => {
      return resp;
    },
  );
  return IndexGiftResp;
};
export const postCreateIndex = async (symbol, opinionData) => {
  const data = {
    opinion: opinionData,
  };
  const response = await post(`company/create/index/sentinal/${symbol}/`, data);
  return response;
};
export const getEventData = async (symbol) => {
  const IndexResp = await get(`company/events/${symbol}/`).then((resp) => {
    return resp;
  });
  return IndexResp;
};

export const getServerMaintenance = async () => {
  const resp = await withoutAuthGet(`check/website/status/`).then((resp) => {
    return resp;
  });
  return resp;
};

export const getCompanyDetails = async (symbol) => {
  const resp = await withoutAuthGet(`company/stock-v2/${symbol}/`).then(
    (resp) => {
      return resp;
    },
  );
  return resp;
};

export const getPortfolioList = async () => {
  const IndexResp = await get(`portfolio/analysis/list/`).then((resp) => {
    return resp;
  });
  return IndexResp;
};

export const addNewPortfolio = async (data) => {
  const IndexResp = await post(`portfolio/analysis/create/`, data).then(
    (resp) => {
      return resp;
    },
  );
  return IndexResp;
};

export const deleteNewPortfolio = async (id) => {
  const IndexResp = await del(`portfolio/analysis/delete/${id}/`).then(
    (resp) => {
      return resp;
    },
  );
  return IndexResp;
};

export const EditPortfolioName = async (id, data) => {
  const IndexResp = await put(`portfolio/analysis/rename/${id}/`, data).then(
    (resp) => {
      return resp;
    },
  );
  return IndexResp;
};

export const getPortfolioHoldingData = async (id, key, ascending) => {
  let url = `portfolio/analysis/list/stocks/${id}/`;

  if (key !== undefined && ascending !== undefined) {
    url += `?sort_by=${key}&is_ascending=${ascending}`;
  }

  const IndexResp = await get(url).then((resp) => {
    return resp;
  });

  return IndexResp;
};

export const getSectorAndSizeAnalysis = async (id) => {
  const IndexResp = await get(`portfolio/analysis/segments/${id}/`).then(
    (resp) => {
      return resp;
    },
  );
  return IndexResp;
};

export const getGraphAndFundamentals = async (id, sortBy, sortOrder) => {
  const IndexResp = await get(
    `portfolio/analysis/weights/fundamentals/${id}/${
      sortBy === undefined ? "" : `?by=${sortBy}`
    }${sortOrder === undefined ? "" : `&is_ascending=${sortOrder}`}`,
  ).then((resp) => {
    return resp;
  });
  return IndexResp;
};

export const getPortfolioOverview = async (id) => {
  const IndexResp = await get(`portfolio/analysis/overview/${id}/`).then(
    (resp) => {
      return resp;
    },
  );
  return IndexResp;
};

export const getCurrentMP = async (symbol, date) => {
  const IndexResp = await get(
    `portfolio/analysis/stock/price/?symbol=${encodeURIComponent(
      symbol,
    )}&date=${date}`,
  ).then((resp) => {
    return resp;
  });
  return IndexResp;
};

export const getGiftHighLOw = async (symbol, date) => {
  const IndexResp = await get(`prices/gift-nifty/todays/high-low/`).then(
    (resp) => {
      return resp;
    },
  );
  return IndexResp;
};

// new portal ai api call >>

export const getAnnualReports = async (symbol) =>
  await get(`company/documents/annual-reports/${symbol}/`);

export const getConcallReports = async (symbol) =>
  await get(`company/documents/concalls-reports/${symbol}/`);

export const getAllCompliance = async (symbol) =>
  await get(`contact/compliance/`);

export const getIpoListNewDash = async () => await get(`research/ipo/list/`);

export const getIpoListNew = async (search, reverse, sort_by) =>
  await get(
    `research/ipo/list/${search === "" ? "" : `?search=${search}`}${
      reverse === undefined
        ? ""
        : `${search === "" ? "?" : "&"}reverse=${reverse}`
    }${sort_by === undefined ? "" : `&sort_by=${sort_by}`}`,
  );

export const getIpoPreviewData = async (report_id) =>
  await get(`research/ipo/preview/?report_id=${report_id}`);

export const existingUserOTP = async (data) =>
  await post(`otp-verification/send-otp/`, data);

export const verifyOTP = async (data) =>
  await post(`otp-verification/verify-otp/`, data);

export const resendOTP = async (data) =>
  await authPost(`otp-verification/resend-otp/`, data);

export const newUserSignUp = async (data) =>
  await authPost(`user-signup/`, data);

export const newUserPassword = async (data) =>
  await post(`set-password/`, data);

export const editPhoneNumber = async (data) =>
  await put(`edit/phone-number/`, data);

export const reverifyUser = async (data) =>
  await authPost(`reverify-user/complete-signup/`, data);

export const getCustomerReview = async () => await get(`users/review/`);

export const getSuperstarGraph = async (slug) => {
  const superstar = await get(
    `prices/superstar-portfolio/graph/?slug=${slug}`,
  ).then((resp) => {
    return resp;
  });
  return superstar;
};

export const panVerification = async (data) => {
  const validation = await post(`v1/status-verify/pan/`, data).then((resp) => {
    return resp;
  });
  return validation;
};

export const esignInitiate = async (data) => {
  const validation = await postWithoutRetry(`v2/initiate-esign/`, data).then(
    (resp) => {
      return resp;
    },
  );
  return validation;
};

export const eSignStatusCheck = async (planId) =>
  await get(`v1/pan-and-esign-status/checker/?plan_id=${planId}`);

export const eSignMonitorAPI = async () => await get(`v1/monitor-esign/`);

export const kycUserUpdate = async (data) => {
  const validation = await put(`v1/update/info/`, data).then((resp) => {
    return resp;
  });
  return validation;
};
// RA Survey (Feedback Form)

export const getSurveyStatus = async () => await get(`ra/questions/list`);
export const submitSurvey = async (data) =>
  await post(`ra/user-survey/response/`, data);
export const submitOptionalSurveyQn = async (data) =>
  await post(`ra/suggestion/response/`, data);
export const checkUserSubmit = async (data) =>
  await get(`ra/check-survey/response/`, data);

export const getIpoList_v2 = async (search, reverse, sort_by, year, month) => {
  const params = new URLSearchParams();

  if (search) params.append("search", search);
  if (reverse !== undefined) params.append("reverse", reverse);
  if (sort_by) params.append("sort_by", sort_by);
  if (year) params.append("year", year);
  if (month) params.append("month", month);

  const queryString = params.toString();

  return await get(
    `research/ipo/list-v2/${queryString ? `?${queryString}` : ""}`,
  );
};

export const fetchLatestPurchaseTime = async () =>
  await get(`txn/pop-up-data/`);

export const fetchTechnicalChart = async (
  search,
  sortState,
  page = 1,
  perPage = 10,
) => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (sortState !== undefined) {
    params.append("sort_by", "publish_date");
    params.append("order", sortState ? "asc" : "desc");
  }

  if (page) params.append("page", page);
  if (perPage) params.append("page_size", perPage);

  const queryString = params.toString();

  return await get(`technical/chart/${queryString ? `?${queryString}` : ""}`);
};

export const fetchSmallcase = async () => await get(`smallcases/`);

export const viewsCounter = async (data) => {
  const validation = await post(`views-counter/`, data).then((resp) => {
    return resp;
  });
  return validation;
};

export const getOtherBanner = async () => {
  const response = await get(`banners/other-banners/`).then((resp) => {
    return resp;
  });
  return response;
};

export const getSalesBanner = async () => {
  const response = await get(`banners/season-sales-banners/`).then((resp) => {
    return resp;
  });
  return response;
};

export const getPageBanner = async () => {
  const response = await get(`banners/page-banners/`).then((resp) => {
    return resp;
  });
  return response;
};
