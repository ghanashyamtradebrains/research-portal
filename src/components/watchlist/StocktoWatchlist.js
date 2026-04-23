import { message, Popover } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import PremiumRedirectModal from "../PremiumRedirectModal";
import {
  getWatchListStore,
  WatchListFetch,
} from "../../redux/reducers/watchListSlice";
import CreateWatchListModel from "./CreateWatchListModel";
import { authStore } from "../../redux/reducers/authSlice";
import { postStockWatchlist } from "../../pages/api/fetchClient";
import PremiumTrialModal from "../Popups/PremiumTrialModal";
import useCheckTrialStatus from "../../hooks/useCheckTrialStatus";

function StocktoWatchlist({
  lightMode,
  symbol,
  children,
  setWatchListTrigger,
  isOverlay = true,
}) {
  const watchListStore = useSelector(getWatchListStore);
  const [visible, setVisible] = useState(false);
  if (!watchListStore) {
    return "something went wrong";
  }
  const router = useRouter();
  const [Watchlist, setWatchlist] = useState(
    watchListStore?.watchListData && watchListStore?.watchListData[0]?.id,
  );
  const [OpenModel, SetOpenModel] = useState(false);
  const auth = useSelector(authStore);
  const [visibledata, setvisibledata] = useState(false);
  const dispatch = useDispatch();
  const [PlanName, setPlanName] = useState();
  const hide = () => {
    setVisible(false);
  };

  const checkTrialStatus = useCheckTrialStatus();
  const [IsPremiumModel, setIsPremiumModel] = useState(false);
  const success = () => {
    !auth.userData?.access_token
      ? message.error({
          content: "Login To Add To WatchList",
          className: !lightMode && "darkmodemessge",
        })
      : message.success({
          content: "Added To Watchlist",
          className: !lightMode && "darkmodemessge",
        });
  };
  useEffect(() => {
    setPlanName(auth?.userData?.user?.plan?.planId);
  }, []);
  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
    setWatchListTrigger(newVisible);
  };
  const addStock = async (fincodes) => {
    postStockWatchlist({ id: Watchlist, symbol }).then((resp) => {
      hide();
      dispatch(WatchListFetch());
      // router.replace(`/watchlist/${Watchlist}`);
      success();
    });
  };
  const scrollableRef = useRef(null);

  function getPopupContainer() {
    return scrollableRef.current;
  }
  const loginRediect = () => {
    setvisibledata(true);
  };

  const excludeZeroIdItems = (items) => {
    return items.filter((item) => item.id !== 0);
  };

  return (
    <div>
      <CreateWatchListModel
        OpenModel={OpenModel}
        SetOpenModel={SetOpenModel}
        lightMode={lightMode}
      />

      <Popover
        color={lightMode ? "white" : "#3B3F4F"}
        className="nameis ff-poppins"
        placement="rightTop"
        overlayClassName={"Navtowatchlist"}
        // getPopupContainer={getPopupContainer}
        getPopupContainer={(trigger) => trigger.parentElement}
        content={
          <div className="ff-poppins">
            <div>
              {watchListStore?.watchListData &&
                watchListStore?.watchListData?.map((items, i) => (
                  <div
                    key={i}
                    onClick={() => setWatchListTrigger(true)}
                    className="d-flex  align-items-center mt-5 "
                  >
                    {items?.watchlist_name === "Demo WatchList" ? (
                      ""
                    ) : (
                      <input
                        className={`${
                          lightMode ? "text-dark-gray" : "text-white"
                        }`}
                        onChange={(e) =>
                          e.target.checked && setWatchlist(e.target.value)
                        }
                        checked={Number(Watchlist) === items?.id && true}
                        value={items?.id}
                        type="checkbox"
                      ></input>
                    )}
                    <p
                      className={`ml-5 mb-3 pointer ${
                        lightMode ? "text-dark-gray" : "text-white"
                      }`}
                    >
                      {items?.watchlist_name === "Demo WatchList"
                        ? ""
                        : items?.watchlist_name}
                    </p>
                  </div>
                ))}
            </div>
            <div className="d-flex mt-15">
              <button
                className={`pointer px-20 mr-0  fw-600 text-white br-3 btn-bg-primary text-white mr-5`}
                onClick={() => {
                  addStock(symbol);
                  setWatchListTrigger(false);
                }}
              >
                Done
              </button>
            </div>
          </div>
        }
        title={
          <p
            className={`fs-s-16 fw-700 mb-0 pointer ${
              lightMode ? "text-dark-gray" : "text-white"
            }`}
          >
            Add Stock to
          </p>
        }
        trigger="click"
        open={visible}
        onOpenChange={handleVisibleChange}
      >
        {children}
      </Popover>
      {/* <PremiumRedirectModal
        visible={IsPremiumModel}
        modalPlan="watchlist"
        setVisible={setIsPremiumModel}
      /> */}

      <PremiumTrialModal
        visible={IsPremiumModel}
        setVisible={setIsPremiumModel}
        isTrialOver={checkTrialStatus()}
      />
    </div>
  );
}

export default StocktoWatchlist;
