import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getThemeMode } from "../redux/reducers/ThemeSlice";
import bgImgDark from "../assets/images/bg/bg404Dark.png";
import bgImgLight from "../assets/images/bg/bg404Light.png";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import DotLoader from "../components/spinners/DotLoader";

function Error404() {
  const { lightMode } = useSelector(getThemeMode);
  const router = useRouter()
  const sliced = router?.asPath?.split('/') 
const [first, setfirst] = useState(false)
  useEffect(() => {
    if(sliced[1] === 'Index'){
      router.push(`/${sliced[1].toLocaleLowerCase()}/${sliced[2]}`)
    }
    else{
      setfirst(true)
    }
  }, [router])
  
  
  return (
    <>
    <Head>
     {first && <title>Page Not Found</title>}
    </Head>
    {!first ? <DotLoader/>:<div className="relative" style={{ height: "90vh" }}>
      <Image
        className="absolute w-100 h-100 fit-cover"
        src={lightMode ? bgImgLight : bgImgDark}
        alt="bg"
      />
      <div  className="flex flex-col div-items-center h-100">
        <h1 style={{zIndex:20}} className="fs-40-28 fw-700">Looks like you’re lost </h1>
        <h2 style={{fontSize:'12rem',lineHeight:'12rem',zIndex:10}} className=" fw-700">404</h2>
      </div>
    </div>}
    </>
  );
}

export default Error404;

