import React, { useState } from "react";
import ResearchReportTable from "./ResearchReportTable";
import IpoScrollSection from "./IpoScrollSection";
import SearchComponent from "./SearchComponent";
import styles from "./researchReport.module.css";

const TableSection = ({
  lightMode,
  tableData,
  premiumTableData,
  loading,
  page,
  perPage,
  setPage,
  setPerPage,
  count,
  sortState,
  setSortState,
  //
  portalLoading,
  setPortalLoading,
  pagePortal,
  setPagePortal,
  countPortal,
  perPagePortal,
  setPerPagePortal,
  sortPremiumState,
  setSortPremiumState,
  setSearchInput,
  setDate,
  searchInput,
  setSortRole,
  setMcap,
  setSector,
  setFilter,
  filter,
}) => {
  const baseButtonStyle = {
    padding: "8px 16px",
    border: "none",
    cursor: "pointer",
    borderRadius: "16px",
  };

  return (
    <div className="w-100">
      {/* <div className="mt-20">
        <IpoScrollSection lightMode={lightMode} />
      </div> */}

      <div className="wall-of-profit">
        <div className={styles.flex_title_button}>
          <span className="fs-s-18 fw-700">Wall of Profit</span>
          <div className={styles.flex_button}>
            {[
              { label: "Target Reached", value: "target_achieved" },
              { label: "Book Profit", value: "reco_update_type" },
            ].map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                style={{
                  ...baseButtonStyle,
                  // backgroundColor:
                  //   filter === value ? styles.active_button : "#e0e0e0",
                  marginRight: value === "target_achieved" ? "10px" : "0",
                }}
                className={
                  filter === value
                    ? styles.active_button
                    : lightMode
                    ? styles.lightMode_inactive
                    : styles.inactive_button
                }
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <ResearchReportTable
          lightMode={lightMode}
          tableData={tableData}
          page={page}
          perPage={perPage}
          setPage={setPage}
          setPerPage={setPerPage}
          count={count}
          loading={loading}
          sortState={sortState}
          setSortState={setSortState}
          isWallOfProfit={true}
          setFilter={setFilter}
          filter={filter}
        />
      </div>
      <SearchComponent
        setSearchInput={setSearchInput}
        searchInput={searchInput}
        setDate={setDate}
        setSortRole={setSortRole}
        lightMode={lightMode}
        setSortState={setSortPremiumState}
        setMcap={setMcap}
        setSector={setSector}
      />
      <div>
        <ResearchReportTable
          lightMode={lightMode}
          tableData={premiumTableData ? premiumTableData : []}
          setPortalLoading={setPortalLoading}
          page={pagePortal}
          setPage={setPagePortal}
          perPage={perPagePortal}
          setPerPage={setPerPagePortal}
          count={countPortal}
          loading={portalLoading}
          sortPremiumState={sortPremiumState}
          setSortPremiumState={setSortPremiumState}
        />
      </div>
    </div>
  );
};

export default TableSection;
