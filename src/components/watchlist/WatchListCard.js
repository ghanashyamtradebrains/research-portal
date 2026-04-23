import { CaretUpOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import svgSheet2 from "../../assets/svg/svgSheet2";
import Movetowatchlist from "../../components/Movetowatchlist";
import { getStockLTP } from "../../pages/api/fetchClient";
import {
  addToWatchlistWithData,
  getWatchListStore,
  WatchListFetch,
} from "../../redux/reducers/watchListSlice";
import { redGreenColorPicker } from "../../utilityFn/redGreenColor";
import CreateWatchListModel from "./CreateWatchListModel";
function WatchListCard({ lightMode, items, symbol, isOverlay, fincode }) {
  const [visible, setVisible] = useState(false);
  const [changedPrice, SetChangedPrice] = useState();
  const hide = () => {
    setVisible(false);
  };
  const [OpenModel, SetOpenModel] = useState(false);
  const dispatch = useDispatch();
  const addStock = async (symbol) => {
    dispatch(
      addToWatchlistWithData({ listName: Watchlist, stock: [symbol] })
    ).then((resp) => {
      hide();
      dispatch(WatchListFetch());
    });
  };
  const watchListStore = useSelector(getWatchListStore);
  useEffect(() => {
    if (symbol !== undefined) {
      getStockLTP("stock", symbol).then((res) => {
        SetChangedPrice(res?.data[0]);
      });
    }
  }, [symbol]);
  // const [Watchlist, setWatchlist] = useState(
  //   Object.keys(watchListStore?.watchListData)[0]
  // );
  const [WatchListTrigger, setWatchListTrigger] = useState(false);
  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  return (
    <div
      // style={{marginInline:'5px'}}
      className={`br-3 p-15 recent-search-card d-flex w-100 flex-col justify-content-between  ${
        lightMode ? "border2px-light-mode" : "border2px-dark-mode"
      }`}
    >
      <CreateWatchListModel
        OpenModel={OpenModel}
        SetOpenModel={SetOpenModel}
        lightMode={lightMode}
      />
      <div className={`d-flex justify-content-between `}>
        <Link href={`/stocks/${symbol}`} className="fs-s-16 fw-500">
          {items}
        </Link>{" "}
        <div className="popup-div">
          <Movetowatchlist
            lightMode={lightMode}
            setWatchListTrigger={setWatchListTrigger}
            symbol={symbol}
            isOverlay={isOverlay}
          >
            <div className="pointer square-18-14">
              {svgSheet2.SaveForLaterFilled}
            </div>
          </Movetowatchlist>
        </div>
      </div>
      <div className="d-flex mr-10 ff-lato">
        <p className="mr-30 fs-s-16 mb-0 ff-lato">₹ {changedPrice?.close}</p>{" "}
        <div
          style={{
            color: redGreenColorPicker(changedPrice?.percent, lightMode),
          }}
          className="d-flex text-red align-items-center fs-s-14 w0"
        >
          <CaretUpOutlined rotate={changedPrice?.percent < 0 && 180} />
          <div className="d-flex">
            ({changedPrice?.percent > 0 && "+"}
            {changedPrice?.change})<p></p>
            <p className="mb-0">
              {changedPrice?.percent > 0 && "+"}
              {changedPrice?.percent}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WatchListCard;
