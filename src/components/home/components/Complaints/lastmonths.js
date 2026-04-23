import React from "react";
import { useSelector } from "react-redux";
import { getThemeMode } from "../../../../redux/reducers/ThemeSlice";
import MainLayout from "../../../MainLayout/MainLayout";
import CustomTable from "../../../CustomTable";

function LastMonthComplaint({ complaints }) {
  const { lightMode } = useSelector(getThemeMode);
  const commonCellStyle = {
    background: lightMode ? "#F2F6F8" : "#3B3F4F",
    borderRight: lightMode ? "1px solid #C9D7DE" : "1px solid #545E78",
    borderLeft: lightMode ? "1px solid #C9D7DE" : "1px solid #545E78",
    borderBottom: "none",
  };

  const renderCell = (text, lightMode) => ({
    props: { style: commonCellStyle },
    children: (
      <span
        className="ff-lato"
        style={{
          fontSize: text === "Grand Total" ? "16px" : "14px",
          fontWeight: text === "Grand Total" ? "600" : "400",
          color: lightMode ? "black" : "white",
        }}
      >
        {text}
      </span>
    ),
  });
  const tableHeaders = [
    {
      title: <span>S.no</span>,
      dataIndex: "sno",
      fixed: "left",
      width: "10px",
      render: (text) => renderCell(text),
    },
    {
      title: <span>Received From </span>,
      dataIndex: "receivedfrom",
      width: "20px",
      render: (text) => renderCell(text),
    },
    {
      title: <span>Pending at the end of last month </span>,
      dataIndex: "pendingend",
      width: "40px",
      render: (text) => renderCell(text),
    },
    {
      title: <span>Received</span>,
      dataIndex: "received",
      width: "20px",
      render: (text) => renderCell(text),
    },
    {
      title: <span>Resolved*</span>,
      dataIndex: "resolved",
      width: "20px",
      render: (text) => renderCell(text),
    },
    {
      title: <span>{`Total Pending `}</span>,
      dataIndex: "pending",
      width: "20px",
      render: (text) => renderCell(text),
    },
    {
      title: <span>{`Pending Complaints > 3months #`}</span>,
      dataIndex: "complaints",
      width: "40px",
      render: (text) => renderCell(text),
    },
    {
      title: <span>Average Resolution Time (in days)</span>,
      dataIndex: "resolution",
      width: "40px",
      render: (text) => renderCell(text),
    },
  ];

  const now = new Date(Date.now());
  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const monthName = lastMonthDate.toLocaleString("default", { month: "long" }); // e.g., "March"
  const year = lastMonthDate.getFullYear(); // e.g., 2025

  return (
    <MainLayout>
      <div className="py-40">
        <div className="d-flex flex-col ff-poppins max-w  d-flex  px-15  w-100 relative">
          <div>
            <p className="fs-22-18 d-flex fw-500 align-items-center justify-content-start">
              Last month ending Complaints ({monthName} {year})
            </p>
          </div>
          <div
            className={`table-shadow mb-20 mt-10 ${
              lightMode ? "custom-antd-head-light" : "custom-antd-head-dark"
            }`}
          >
            <CustomTable
              loading={""}
              columns={tableHeaders}
              data={complaints}
              lightMode={lightMode}
              scrollable={true}
              scrollLimit={700}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
export default LastMonthComplaint;
