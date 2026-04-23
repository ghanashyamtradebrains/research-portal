import React from 'react'

function PremiumContactCard({lightMode,data}) {
  return (
    <div style={{minHeight:'230px'}} className={`p-20 d-flex flex-col justify-content-center ${ lightMode
        ? "bg-gray card-drop-light-shadow"
        : "card-drop-dark-shadow"
    }`}>
        <p className='mb-0'>{data.icon}</p>
        <p className='my-10 fw-500'>{data.desc}</p>
        <a href={`${data.contactType}:${data.contact}`} className='my-10 text-blue-grad fw-700 fs-18-16 underline'>{data.contact}</a>
        <p className='mb-0 fs-s-12'>*{data.contactInfo}</p>
    </div>
  )
}

export default PremiumContactCard