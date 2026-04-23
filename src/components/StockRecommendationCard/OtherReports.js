import React, { useRef } from "react";
import styles from "./report.module.css";
// import diwali from "../../assets/images/festivalBanner/Research_report_diwali.png";
import Image from "next/image";
import Link from "next/link";
function OtherReports({ lightMode }) {
  const festivalPicks = [
    {
      image: "",
      link: "",
    },
  ];

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -800,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 800,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className={`${
        lightMode ? styles.main_container_light : styles.main_container
      }`}
    >
      <p className={styles.title}>Other Reports</p>
      <div className={styles.relative}>
        {festivalPicks.length >= 6 && (
          <button
            onClick={scrollLeft}
            className={`${styles.scrollButton} ${styles.left}`}
          >
            {"<"}
          </button>
        )}
        <div
          ref={scrollRef}
          className={`${styles.card_main} ${styles.scrollDash}`}
        >
          {festivalPicks?.map((item) => {
            return (
              <div
                className={`${styles.overflow_md_scroll_dash} ${styles.card}`}
              >
                <Link href={item?.link} target="_blank">
                  <Image src={item?.image} width={250} height={250} />
                </Link>
              </div>
            );
          })}
        </div>
        {festivalPicks.length >= 6 && (
          <button
            onClick={scrollRight}
            className={`${styles.scrollButton} ${styles.right}`}
          >
            {">"}
          </button>
        )}
      </div>
    </div>
  );
}

export default OtherReports;
