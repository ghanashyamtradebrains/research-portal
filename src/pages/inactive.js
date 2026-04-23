import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getThemeMode } from "../redux/reducers/ThemeSlice";
import bgImgDark from "../assets/images/bg/bg404Dark.png";
import bgImgLight from "../assets/images/bg/bg404Light.png";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import DotLoader from "../components/spinners/DotLoader";

function InActive() {
  const { lightMode } = useSelector(getThemeMode);
  const router = useRouter();
  const sliced = router?.asPath?.split("/");
  const [first, setfirst] = useState(false);
  useEffect(() => {
    if (sliced[1] === "Index") {
      router.push(`/${sliced[1].toLocaleLowerCase()}/${sliced[2]}`);
    } else {
      setfirst(true);
    }
  }, [router]);

  return (
    <>
      <Head>{first && <title>InActive Stock </title>}</Head>
      {!first ? (
        <DotLoader />
      ) : (
        <div className="relative p-5" style={{ height: "90vh" }}>
          <Image
            className="absolute w-100 h-100 fit-cover"
            src={lightMode ? bgImgLight : bgImgDark}
            alt="bg"
          />
          <div className="flex flex-col div-items-center h-100 text-align-center">
            <h1 style={{ zIndex: 20 }} className="fs-40-28 fw-700">
              The Stock you are looking for is delisted or inactive.
            </h1>
          </div>
        </div>
      )}
    </>
  );
}

export default InActive;
