import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getThemeMode } from "../../redux/reducers/ThemeSlice";
import Image from "next/image";
import svgSheet8 from "../../assets/svg/svgSheet8";
import styles from "./MobileNavBar.module.css";
import { authStore } from "../../redux/reducers/authSlice";

function MobileNavBar() {
  const { lightMode } = useSelector(getThemeMode);
  const router = useRouter();
  console.log("now router: ", router.asPath)
  const UserAuth = useSelector(authStore);
  const isLoggedIn = UserAuth?.userData.access_token;
  console.log("mobile navbar: ", isLoggedIn)
  const navItems = [
    {
      id: "home",
      label: "Home",
      svgIcon: svgSheet8.MobileNavBarHome,
      href: "/dashboard",
      matchPaths: ["/dashboard"],
    },
    {
      id: "stock-picks",
      label: "Stock Picks",
      svgIcon: svgSheet8.MobileNavBarStockPicks,
      href: "/stock-research-report",
      matchPaths: ["/stock-research-report"],
    },
    {
      id: "ask-ai",
      label: "Ask AI",
      icon: "/icons/sparklesPortalAi.png",
      special: true,
      href: "/portal-ai/portal-ai-chat",
    },
    {
      id: "reports",
      label: "Reports",
      svgIcon: svgSheet8.MobileNavBarReports,
      href: "/research-reports",
      matchPaths: ["/research-reports"],
    },
    {
      id: "open-app",
      label: "Open app",
      svgIcon: svgSheet8.MobileNavBarDownload,
      href: "http://tosto.re/tradebrainsportal",
      matchPaths: [],
    },
  ];

  const handleNavigation = (href) => {
    if (href.startsWith("http://") || href.startsWith("https://")) {
      window.location.href = href;
    } else {
      router.push(href);
    }
  };

  const isActive = (item) => {
    if (!item.matchPaths || item.matchPaths.length === 0) return false;
    return item.matchPaths.some((path) => router.pathname === path);
  };

  return (
    <div
      className={`${styles.mobileNavBar} ${
        lightMode ? styles.lightMode : styles.darkMode
      } ${router.asPath === "/" && !isLoggedIn ? styles.notLoggedIn : ""}`}
    >
      <div className={styles.navContainer}>
        {navItems.map((item) => {
          if (item.special) {
            return (
              <div key={item.id} className={styles.specialNavItem}>
                <div
                  className={styles.askAiButton}
                  onClick={() => handleNavigation(item.href)}
                >
                  <div className={styles.rotatingBorder}></div>
                  <div className={styles.askAiContent}>
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={20}
                      height={20}
                      className={styles.sparkleIcon}
                    />
                    <span className={styles.askAiText}>{item.label}</span>
                  </div>
                </div>
              </div>
            );
          }

          const active = isActive(item);

          return (
            <div
              key={item.id}
              className={`${styles.navItem} ${active ? styles.active : ""}`}
              onClick={() => handleNavigation(item.href)}
            >
              <div
                className={`${styles.iconWrapper} ${
                  active ? styles.activeIcon : ""
                }`}
              >
                {item.svgIcon}
              </div>
              <span
                className={`${styles.navLabel} ${
                  active ? styles.activeLabel : ""
                }`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MobileNavBar;