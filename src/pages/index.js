import Head from "next/head";
import LoginForm from "../components/AuthModal2/LoginForm";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { authStore } from "../redux/reducers/authSlice";
import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();
  const user = useSelector(authStore);

  const isLoggedIn = user?.isAuthenticated;
  const isPremium = user?.userData?.user?.is_premium;

  return (
    <div className={styles.pageWrapper}>
      <Head>
        <title>
          Equity Research Reports and Best Fundamental Analysis Platform
        </title>
      </Head>

      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Trade Brains Portal Research</h1>
      </div>

      {!isLoggedIn && <LoginForm />}

      {isLoggedIn && !isPremium && (
        <div className={styles.upgradeBox}>
          <h2>Upgrade to Premium</h2>
          <p>This feature is only available for Plus users.</p>

          <button
            onClick={() => router.push("/pricing")}
            className={styles.upgradeButton}
          >
            Buy Premium
          </button>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;

  if (req?.cookies?.ptl_access_token) {
    return {
      redirect: {
        permanent: false,
        destination: "/stock-research-report",
      },
    };
  }

  return {
    props: {},
  };
}
