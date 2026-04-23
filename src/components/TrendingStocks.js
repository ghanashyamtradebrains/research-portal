import React, { useEffect, useState } from 'react'
import { getTrendingStocks } from '../pages/api/fetchClient';
import WatchListCard from './watchlist/WatchListCard';



function TrendingStocks({lightMode}) {
  const [TrendingStocks, setTrendingStocks] = useState()
useEffect(() => {
  getTrendingStocks().then((res)=>{
    setTrendingStocks(res.data?.volume_movers)
  })
}, [])
  return (
    <div className="d-flex flex-col mt-30 ">
          <h2 className="fs-s-16 fw-700 mb-20">Trending Stocks</h2>
          <div className="d-flex  flex-wrap justify-content-between w-100 mb-10 Trending-Stocks-watchlist">
            {TrendingStocks?.map((items,i) => (
              
              <WatchListCard lightMode={lightMode} key={i} symbol={items?.symbol} fincode={items?.fincode} items={items?.comp_name}/>
            ))}
          </div>
        </div>
  )
}

export default TrendingStocks