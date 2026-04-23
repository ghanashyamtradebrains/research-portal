import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, message } from "antd";
import { useRouter } from "next/router";
import { WatchListFetch } from "../../redux/reducers/watchListSlice";
import {
  createwatchlist,
  createwatchlist2,
  CreateWatchlsit,
} from "../../pages/api/fetchClient";

function CreateWatchListModel({
  OpenModel,
  lightMode,
  SetOpenModel,
  setWatchListTrigger,
  toggleNavigate,
}) {
  const [CreateWatchlist, setCreateWatchlist] = useState();
  const [isModalVisible2, setIsModalVisible2] = useState(OpenModel);

  const navigate = useRouter();

  const dispatch = useDispatch();
  const handleOk2 = () => {
    SetOpenModel(false);
    createwatchlist2({ watchlist_name: CreateWatchlist }).then((res) => {
      dispatch(WatchListFetch());
      message.success({
        content: "Watchlist created",
      });
      setCreateWatchlist("");
      {
        toggleNavigate
          ? navigate.replace(`/watchlist/${res?.data?.watchlist_id}`)
          : "";
      }
    });
  };

  const handleCancel2 = () => {
    SetOpenModel(false);
  };
  return (
    <div>
      <Modal
        title={
          <p
            className={`fs-s-18 mb-0 fw-600 ${
              lightMode ? "text-dark" : "text-white"
            }`}
          >
            Create Watchlist
          </p>
        }
        open={OpenModel}
        centered
        wrapClassName={!lightMode && "modelClassname"}
        onOk={handleOk2}
        onCancel={handleCancel2}
        footer={[
          <button
            key="submit"
            type="primary"
            className={` w-150px br-5 btn-bg-primary text-white  fs-s-14 fw-600 h-45 `}
            onClick={() => handleOk2(CreateWatchlist)}
          >
            Create Watchlist
          </button>,
        ]}
      >
        <div className="w-100" onClick={(e) => e.stopPropagation()}>
          <input
            width={"100%"}
            style={{ width: "100%" }}
            onChange={(e) => setCreateWatchlist(e.target.value)}
            value={CreateWatchlist}
            type="text"
            className={`w-100 h-45 br-3 p-5 ${
              lightMode
                ? "border1px-light-mode"
                : "border1px-dark-mode bg-dark-gray text-white"
            }`}
          ></input>
        </div>
      </Modal>
    </div>
  );
}

export default CreateWatchListModel;
