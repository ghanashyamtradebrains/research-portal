import React, { useEffect, useState } from "react";
import { Skeleton } from "antd";
import GetNewscardIndex from "./GetNewscardIndex";
import useWindowWidth from "../../../../utilityFn/getWindowWidth";
import { getNewsData, getStockRelatedNews } from "../../../../pages/api/fetchClient";
import StockEndpoints from "../../../../pages/api/endPoints";
function NewsTabIndexDetails({ symbol, lightMode, index }) {
  const [newsdata, setnewsdata] = useState();
  const windowWidth = useWindowWidth();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(33);
  if(!index){
  useEffect(() => {
    const getData = async () => {
      await getStockRelatedNews(StockEndpoints.stockRelatednews(symbol))
        .then(async (resp) => {
          if (resp.data.length > 0) {
            setnewsdata(resp.data);
          } else {
            await getStockRelatedNews(StockEndpoints.stockRelatednews("")).then(
              (resp) => {
                setnewsdata(resp.data);
              }
            );
          }
        })
        .catch((err) => null);
    };
    getData();
  }, [symbol]);
  }
  let category = "session"
  useEffect(() => {
    getNewsData(category, perPage, page).then((res) => {
      setnewsdata(res?.data?.results);
    });
  }, [category]);
    // if (newsdata.length === 0) {
    //   return (
    //     <>
    //       <Skeleton />
    //       <Skeleton />
    //       <Skeleton />
    //     </>
    //   );
    // }
  return (
    <div className="w-100">
      {newsdata?.slice(0, 5)?.map((data, i) => (
    <div className={`${windowWidth < 500 ? "" : "d-flex align-items-center"} justify-content-between`}>
        <div className="w-100-50 mb-10 mr-10" style={{color: lightMode ? "#000" : "#fff", backgroundColor: lightMode ? "#fff" : "#292e3f", borderRadius: "10px"}}>
            <GetNewscardIndex key={i} lightMode={lightMode} index={true} data={data} />
        </div>
        <div className="w-100-50 mb-10" style={{color: lightMode ? "#000" : "#fff", backgroundColor: lightMode ? "#fff" : "#292e3f", borderRadius: "10px"}}>
            {newsdata?.slice(5, 10)[i] && ( 
                <GetNewscardIndex key={i + 5} lightMode={lightMode} index={true} data={newsdata.slice(5, 10)[i]} secondNews={true}/>
            )}
        </div>
    </div>
))}

    </div>
    
  );
}

export default NewsTabIndexDetails;
