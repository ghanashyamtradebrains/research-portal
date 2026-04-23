import "../styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { Router, useRouter } from "next/router";
import { useState, useEffect } from "react";
import store from "../redux/store";
import DotLoader from "../components/spinners/DotLoader";
import Layout from "./Layout";
import { Toaster } from "sonner";

const persistor = persistStore(store);

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  Router.events.on("routeChangeStart", () => setLoading(true));
  Router.events.on("routeChangeComplete", () => setLoading(false));

  useEffect(() => {
    if (router?.query?.refer) {
      sessionStorage.setItem("referID", router?.query?.refer);
    }
  }, [router?.query?.refer]);

  const Content = loading ? <DotLoader /> : <Component {...pageProps} />;

  return (
    <Provider store={store}>
      <PersistGate loading={<DotLoader />} persistor={persistor}>
        <>
          <Toaster richColors position="top-center" />

          {router?.pathname === "/stock-report/[id]" ||
          router?.pathname === "/ipo-report/[id]"
            ? Content
            : <Layout>{Content}</Layout>
          }
        </>
      </PersistGate>
    </Provider>
  );
}
