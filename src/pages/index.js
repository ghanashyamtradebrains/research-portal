import Head from "next/head";
import { Inter } from "@next/font/google";
import OneTapSignin from "../components/Authentications/OneTapSignin";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // useEffect(() => {
  //   if (!router.query.confirm_password) {
  //     const timeout = setTimeout(() => {
  //       dispatch(setToggleForm(null));
  //       // dispatch(setToggleForm("create_password"));
  //     }, 0);
  //     return () => {
  //       clearTimeout(timeout);
  //     };
  //   }
  // }, [dispatch]);

  return (
    <div className="invert-text">
      <Head>
        <title>
          Equity Research Reports and Best Fundamental Analysis Platform
        </title>
        <meta
          name="og:title"
          content="Equity Research Reports and Best Fundamental Analysis Platform
"
        />
        <meta
          name="description"
          content="Get the latest equity research reports prepared by SEBI registered Research Analysts at Trade Brains Portal. Explore the various fundamental analysis tools to carefully pick your preferred stocks to make informed investment decisions. "
        />
        <meta
          name="og:description"
          content="Get the latest equity research reports prepared by SEBI registered Research Analysts at Trade Brains Portal. Explore the various fundamental analysis tools to carefully pick your preferred stocks to make informed investment decisions. "
        />
        <meta
          name="keywords"
          content="equity research reports, stock research reports, fundamental analysis platform, stock analysis, stock research, fundamental analysis, top stock research, stock market, stock market today, stock market updates, best stock analysis website, stock analysis website, stock research website, best fundamental analysis, fundamental analysis website, stock news,  Stock market reports, stock market tools, analysis tools, stock analysis tools, portfolio analysis, stock research reports, stock market website, best stock market website"
        />
        <meta
          property="og:image"
          content="https://tradebrains.in/features/wp-content/uploads/2022/07/Portal-Logo-Cover-Image.jpg"
        />
        {/* FOR twitter link preview */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Equity Research Reports and Best Fundamental Analysis Platform"
        />
        <meta
          name="twitter:description"
          content="Get the latest equity research reports prepared by SEBI registered Research Analysts at Trade Brains Portal. Explore the various fundamental analysis tools to carefully pick your preferred stocks to make informed investment decisions."
        />
        <meta
          name="twitter:image"
          content="https://tradebrains.in/features/wp-content/uploads/2022/07/Portal-Logo-Cover-Image.jpg"
        />
        <link rel="canonical" href={`https://portal.tradebrains.in/`} />
      </Head>

      <div className="ff-poppins    w-100">
        <OneTapSignin />
        {/* <div>
          <StockRecommendationHome lightMode={lightMode} />
        </div> */}
        <div>HII</div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req, query } = context;

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
