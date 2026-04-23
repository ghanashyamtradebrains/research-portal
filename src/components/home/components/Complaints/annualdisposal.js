import React from "react";
import { useSelector } from "react-redux";
import { getThemeMode } from "../../../../redux/reducers/ThemeSlice";
import MainLayout from "../../../MainLayout/MainLayout";
import CustomTable from "../../../CustomTable";

function AnnualDisposal({ complaints }) {
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
          fontSize: "14px",
          fontWeight: "400",
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
      width: "15px",
      render: (text) => renderCell(text),
    },
    {
      title: <span>Month</span>,
      dataIndex: "receivedfrom",
      width: "20px",
      render: (text) => renderCell(text),
    },
    {
      title: <span>Carried forward from previous month</span>,
      dataIndex: "pendingend",
      width: "30px",
      render: (text) => renderCell(text),
    },
    {
      title: <span>Received</span>,
      dataIndex: "received",
      width: "30px",
      render: (text) => renderCell(text),
    },
    {
      title: <span>Resolved*</span>,
      dataIndex: "received",
      width: "30px",
      render: (text) => renderCell(text),
    },
    {
      title: <span>Pending #</span>,
      dataIndex: "pending",
      width: "30px",
      render: (text) => renderCell(text),
    },
  ];

  return (
    <MainLayout>
      <div className="py-40">
        <div className="d-flex flex-col ff-poppins max-w mx-auto d-flex  px-15  w-100 relative">
          <div>
            <p className="fs-22-18 d-flex fw-500 align-items-center justify-content-start">
               Annual disposal of complaints
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
export default AnnualDisposal;
