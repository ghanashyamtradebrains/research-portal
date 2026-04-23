import React, { useState } from "react";
import { useRouter } from "next/router";
import CreateWatchListModel from "./CreateWatchListModel";

function MobileBottomSlider({setWatchList,WatchList, lightMode, watchlists,planLimit,setIsPremiumModel }) {
  const [OpenModel,SetOpenModel] = useState(false)

  const excludeZeroIdItems = (items) => {
    return items.filter(item => item.id !== 0);
  };

  const navigate = useRouter();

  const {query} = navigate;

  return (
    <div
      style={{ height: "55px", zIndex: 500, position: "sticky", bottom: "0" ,paddingLeft:"10px" }}
      className={` ${
        lightMode ? "bg-gray" : "bg-dark-gray"
      } table-shadow   details-top-card w-100 br-5  d-flex align-items-center`}
    >
      <CreateWatchListModel OpenModel={OpenModel} SetOpenModel={SetOpenModel} toggleNavigate={true} lightMode={lightMode}/>

      <div className="overflow-x h-100">
        {watchlists.map((items,i) => (
          <div key={i}
          onClick={() => {
            if (items?.id !== 0) {
              setWatchList({
                name: items?.watchlist_name,
                id: items?.id
              });
              navigate.push(`/watchlist/${items?.id}`);
            } else {
              ""
            }
          }}
            className="d-flex justify-content-center"
            style={{ minWidth: "100px" }}
          >
            <span
              style={{ minHeight: "38px" }}
              className={`${Number(items?.id) === Number(query?.watchlist_id) ? "" : "opacity5"} fs-s-12 fw-600 mr-10 text-align-center d-flex align-items-center pointer`}
            >
              {items.watchlist_name}
            </span>
          </div>
        ))}

        <div className="p-5 align-items-center d-flex justify-centen-center">
          <button
          onClick={() => {
            const filteredWatchlist = excludeZeroIdItems(Object.values(watchlists));
            if (planLimit <= filteredWatchlist.length) {
              setIsPremiumModel(true);
            } else {
              SetOpenModel(true);
            }
          }}
            style={{ minWidth: "150px" }}
            className={`mr-5 fs-s-12 btn-blue-border ${lightMode ? "bg-table-data text-btn-light " : "bg-dark-gray text-btn-dark"} `}
          >
            + Create Watchlist{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MobileBottomSlider;

