import Link from 'next/link'
import React from 'react'
import svgSheet from '../assets/svg/svgSheet'

function PremiumCard({headerText}) {
  return (
    <div
    className=" d-flex flex-col div-items-center"
    style={{
      zIndex: 10,
      minHeight:'25vh'
    }}
  >
    <div style={{width:"70px",height:'70px'}}>
    {svgSheet.premiumIcon}
    </div>
    <p className="fs-25-20 fw-700 mb-10 text-align-center">{headerText}</p>
    <p className="fs-18-16 fw-500 mb-20 text-align-center">
      See Detailed Analysis & Insights
    </p>
    <Link href={`/getpremium`}>
      <button
        style={{ width: "200px", height: "50px" }}
        className="btn-bg-primary  fw-600 text-white fs-16-14 br-5"
      >
        View Pricing
      </button>
    </Link>
  </div>
  )
}

export default PremiumCard