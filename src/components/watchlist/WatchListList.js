import { MoreOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import Link from "next/link";

function WatchListList({
  key,
  items,
  showModal,
  setWatchList,
  showModal1,
  toTriggerPopup,
  showModal3,
  WatchList,
  lightMode,
  watchListStore,
  setOpenModelMaintenance,
  maintenanceData,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { query } = router;
  const [visible, setVisible] = useState(toTriggerPopup);
  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  const onClickFunction = () => {
    if (items?.id !== 0) {
      router.push(`/watchlist/${items?.id}`);
    } else {
      ("");
    }
  };

  return (
    <div
      key={key}
      onClick={onClickFunction}
      className={` ${lightMode ? "bb1px-light-mode" : "bb1px-dark-mode"
        }    pointer d-flex  justify-content-between p-10 align-items-center justify-content-center ${Number(items?.id) === 0 ? "desktop-active-dark" : ""
        } ${Number(query?.watchlist_id) === Number(items?.id)
          ? lightMode
            ? "desktop-active"
            : "desktop-active-dark"
          : lightMode
            ? "bg-gray"
            : "bg-dark-gray"
        }`}
    >
      <p className="mb-0"> {items?.watchlist_name}</p>
      {items?.id === 0 ? (
        ""
      ) : (
        <Popover
          key={key}
          color={lightMode ? "white" : "#3B3F4F"}
          className="nameis"
          placement="right"
          overlayClassName={"Navtowatchlist"}
          content={
            <div className="">
              <div className={`${lightMode ? "text-dark-gray" : "text-white"}`}>
                <div className="d-flex  align-items-center mt-5 ">
                  <p
                    onClick={(e) => {
                      e.stopPropagation();
                      setWatchList({
                        name: items?.watchlist_name,
                        id: items?.id,
                      });
                      showModal();
                      setVisible(false);
                    }}
                    className="ml-5 fs-s-12 fw-600 mb-3 pointer"
                  >
                    Rename
                  </p>
                </div>
                <div className="d-flex  align-items-center mt-5">
                  <p
                    onClick={(e) => {
                      e.stopPropagation();
                      setWatchList({
                        name: items?.watchlist_name,
                        id: items?.id,
                      });
                      showModal1();
                      setVisible(false);
                    }}
                    className="ml-5 fs-s-12 fw-600 mb-3  pointer"
                  >
                    Clear watchlist
                  </p>
                </div>
                {/* {Object.keys(watchListStore?.watchListData)?.length !== 0 && ( */}
                <div className="d-flex align-items-center mt-5">
                  <p
                    onClick={(e) => {
                      e.stopPropagation();
                      setWatchList({
                        name: items?.watchlist_name,
                        id: items?.id,
                      });
                      showModal3();
                      setVisible(false);
                    }}
                    className="ml-5 fs-s-12  fw-600 mb-3 pointer"
                  >
                    Delete
                  </p>
                </div>
                {/* )} */}
              </div>
            </div>
          }
          trigger="click"
          open={visible}
          onOpenChange={handleVisibleChange}
        >
          <div
            className="mb-0"
            onClick={(e) => {
              maintenanceData === true
                ? setOpenModelMaintenance(true)
                : Number(query?.watchlist_id) === Number(items?.id)
                  ? e.stopPropagation()
                  : "";
            }}
          >
            <MoreOutlined />
          </div>
        </Popover>
      )}
    </div>
  );
}

export default WatchListList;
