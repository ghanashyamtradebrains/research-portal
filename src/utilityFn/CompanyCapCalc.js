function CompanyCapCalc(marketCap) {
  const crToNum = marketCap * 10 ** 7;
  if (crToNum > 843000000000) {
    return <p style={{ color: "#75BDFF", marginBottom: "0px" }}>Large Cap</p>;
  } else if (crToNum > 276000000000 && crToNum < 843000000000) {
    return <p style={{ color: "#FF6600", marginBottom: "0px" }}>Mid Cap</p>;
  } else if (crToNum < 276000000000 && crToNum > 10000000000) {
    return <p style={{ color: "#F9D600", marginBottom: "0px" }}>Small Cap</p>;
  } else if (crToNum < 10000000000) {
    return <p style={{ color: "#FF0000", marginBottom: "0px" }}>Micro Cap</p>;
  }
}

export default CompanyCapCalc;
