import React, { useEffect, useState } from "react";
import { getThemeMode } from "../../redux/reducers/ThemeSlice";
import { useSelector } from "react-redux";
import { Modal } from "antd";
import ServerSpaceman from "./ServerSpaceman";
import styles from "./serverMaintenancePopUp.module.css";
import { getServerMaintenance } from "../../pages/api/fetchClient";

function ServerMaintenance({ setOpenModelMaintenance, openModelMaintenance }) {
  const { lightMode } = useSelector(getThemeMode);

  return (
    <div>
      <Modal
        className={"server-maintenance-dark"}
        title={null}
        open={openModelMaintenance}
        centered
        wrapClassName={"modelClassPopUp"}
        onCancel={() => {
          setOpenModelMaintenance(false);
        }}
        footer={[]}
      >
        <div>
          <ServerSpaceman />
          <div className={styles.text_container}>
            <p className={styles.heading}>Site Under Maintenance</p>
            <p className={styles.description}>
              This site is currently undergoing maintenance. We apologize for
              the inconvenience caused. We appreciate your patience.
            </p>
            <p className={styles.ending}>Thank you for your patience</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ServerMaintenance;
