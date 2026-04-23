import { Pagination } from "antd";
import React from "react";

function CustomPagination({
  showQuickJumper,
  total,
  onChange,
  lightMode,
  onShowSizeChange,
  pageSize,
  current
}) {
  return (
    <div
      className={`${
        lightMode ? "" : "index-page-pagination"
      } w-100 d-flex  justify-content-end mt-10`}
    >
      <Pagination
      current={current}
        showQuickJumper={showQuickJumper}
        defaultCurrent={1}
        size="small"
        total={total}
        onChange={onChange}
        onShowSizeChange={onShowSizeChange}
        pageSize={pageSize??10}
      />
    </div>
  );
}

export default CustomPagination;
