import { CaretDownOutlined } from "@ant-design/icons";
import React from "react";
import CustomTooltip from "../../ant/CustomTooltip";

function SortHeader({ header, sortState, setsortState, label, index }) {
  return (
    <div
      className="d-flex justify-content-between align-items-center"
    >
      <p className="fw-600 mb-0 fs-14-12">{label}</p>
      <CustomTooltip
        placement="top"
        text={
          sortState.sortOrder && header === sortState.head
            ? "click to sort descending"
            : "click to sort ascending"
        }
      >
        <CaretDownOutlined
          style={{ color: header === sortState.head ? "#6DB8FD" : "inherit" }}
          onClick={() => {
            setsortState((prevState) => {
              return {
                head: header,
                sortOrder:
                  header === prevState.head ? !prevState.sortOrder : false,
              };
            });
          }}
          rotate={
            sortState.sortOrder === false && header === sortState.head ? 180 : 0
          }
        />
      </CustomTooltip>
    </div>
  );
}

export default SortHeader;
