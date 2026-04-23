import React, { useState } from "react";
import styles from "./IpoNavbar.module.css";
import { useSelector } from "react-redux";
import { authStore } from "../../../../redux/reducers/authSlice";
import { bannerOffsetCalc } from "../../../../utilityFn/bannerOffsetcalc";


function IpoNavbar({ lightMode }) {
  const UserAuth = useSelector(authStore);
  const [activeTab, setActiveTab] = useState( "Overview");

  const IpoNavbar = [
    {
      id: "overview",
      label: "Overview",
      offset: -300 - bannerOffsetCalc(UserAuth),
    },
    {
      id: "companydetails",
      label: "Company Details",
      offset: -280 - bannerOffsetCalc(UserAuth),
    },
    {
      id: "financialinformation",
      label: "Financial information",
      offset: -300 - bannerOffsetCalc(UserAuth),
    },
  
    {
      id: "reasons",
      label: "Reasons For IPO",
      offset: 430 - bannerOffsetCalc(UserAuth),
    },
    { id: "strength", 
    label: "Strength & Risks", 
    offset: -300 - bannerOffsetCalc(UserAuth) 
    },
    { id: "Peer", 
    label: "Peer Details", 
    offset: -300 - bannerOffsetCalc(UserAuth) 
    },
    { id: "Companyhistory ", 
    offset: 500 - bannerOffsetCalc(UserAuth) 
    },

  ].filter((item) => item !== null);

  const handleTabClick = (label,id, offset) => {
    setActiveTab(label);
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div
      className={
        lightMode ? styles.main_container_light : styles.main_container
      }
    >
      <div className={styles.flex_card}>
        {( IpoNavbar )?.map((item) => (
          <div
            key={item.id}
            onClick={() => handleTabClick(item.label, item.id, item.offset)}
            className={`${styles.nav_item} ${
              activeTab === item.label ? styles.active : ""
            }`}
          >
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IpoNavbar;
