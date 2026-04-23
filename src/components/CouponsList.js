import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getThemeMode } from "../redux/reducers/ThemeSlice";
import { getCouponsList, PostApplyCoupen } from "../pages/api/fetchClient";
import { redGreenColorPicker } from "../utilityFn/redGreenColor";
import NoData from "./home/components/NoData";
function CouponsList({
  setVisible,
  visible,
  setAppliedCoupon,
  plan_id,
  setAppliedSuccess,
  SortedPlan,
  festiveStatus,
  festiveCoupon,
  code,
}) {
  const { lightMode } = useSelector(getThemeMode);
  const [Value, setValue] = useState();
  const [CouponValue, setCouponValue] = useState();
  const [error, seterror] = useState();
  // feestival coupon
  useEffect(() => {
    getCouponsList({ plan_id }).then((res) => {
      setValue(res?.data);
    });
    if (festiveStatus && festiveCoupon && code) {
      PostApplyCoupen({ plan_id, CouponValue: festiveCoupon }).then((res) => {
        if (res?.data[0] === "no coupons") {
          seterror("no coupons");
        } else {
          setAppliedCoupon(res?.data[0]);
        }
      });
    } else if (festiveCoupon === "Workshop100") {
      PostApplyCoupen({ plan_id, CouponValue: festiveCoupon }).then((res) => {
        if (res?.data[0] === "no coupons") {
          seterror("no coupons");
        } else {
          setAppliedCoupon(res?.data[0]);
        }
      });
    }
  }, [plan_id]);

  const applyCoupon = () => {
    PostApplyCoupen({ plan_id, CouponValue }).then((res) => {
      if (res?.data[0] === "no coupons") {
        seterror("no coupons");
      } else {
        setAppliedCoupon(res?.data[0]);
        setVisible(false);
        seterror("");
        setCouponValue("");
        setAppliedSuccess(true);
      }
    });
  };

  return (
    <div>
      {" "}
      <Modal
        centered
        closable={true}
        width="600px"
        bodyStyle={{ padding: "0px", minHeight: "400px", borderRadius: "10px" }}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
        className="relative "
        wrapClassName={` ${
          lightMode ? "filter-modal-light" : "filter-modal-new"
        }  premium-mod`}
      >
        <div
          style={{ marginInline: "10%", paddingTop: "3%" }}
          className=" h-100 d-flex flex-col justify-content-center"
        >
          <p className="fs-36-20 fw-700 ">Apply coupon</p>
          <div className="d-flex ">
            <input
              width={"80%"}
              // value={NewWatchList}
              style={{ width: "100%" }}
              placeholder="Enter Code"
              value={CouponValue}
              onChange={(e) => setCouponValue(e.target.value)}
              type="text"
              className={`w-80 h-45 br-3 p-3  portFolio-Modal-inputFeild ${
                lightMode
                  ? "border1px-light-mode"
                  : "border1px-dark-mode bg-dark-gray"
              }`}
            ></input>
            <button
              style={{ width: "17%" }}
              onClick={() => {
                applyCoupon();
              }}
              className=" ml-5 br-3 p-3 free-tag fw-500 px-10 text-white "
            >
              Apply
            </button>
          </div>
          <p style={{ color: redGreenColorPicker(-1, lightMode) }}>{error}</p>

          {Value?.length === 0 ? (
            <div className="mt-70">
              <NoData errorText={"No Coupons"} />
            </div>
          ) : (
            <div>
              {Value?.map((items) => (
                <>
                  {items.visible !== "No" && (
                    <div
                      className={` ${
                        lightMode
                          ? "card-drop-light-shadow"
                          : "card-drop-dark-shadow"
                      }  br-5 p-12 my-20`}
                    >
                      <div className="d-flex justify-content-between align-items-center bb1px-dark-mode">
                        <div>
                          <p className="gradient-text-blue fw-700 fs-24-16 mb-0">
                            {items?.code}
                          </p>
                          <p className="ff-lato">{items?.description}</p>
                        </div>
                        <p
                          className="mb-0 fw-500 pointer"
                          onClick={() => {
                            setAppliedSuccess(true);
                            setVisible(false);
                            setAppliedCoupon(items);
                          }}
                        >
                          Apply
                        </p>
                      </div>

                      <p className="fw-500 mt-15 ff-lato">
                        {" "}
                        Use Code & get ₹
                        {items?.type === "percentage"
                          ? (
                              (items?.value / 100) *
                              SortedPlan?.plan_amount
                            ).toFixed(2)
                          : items?.value}{" "}
                        on as a first time user
                      </p>
                    </div>
                  )}
                </>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default CouponsList;
