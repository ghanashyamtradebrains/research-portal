import React from 'react'

function HeaderParagraph({data}) {
  return (
    <div>{data?.map((items)=>
        <div>
    <p className="fs-20-16 fw-500">
      {items?.header}
    </p>
    <p>
    {items?.value}
    </p>
    </div>)}</div>
  )
}

export default HeaderParagraph