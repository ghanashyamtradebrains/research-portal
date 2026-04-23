import React from "react";

function Stepcard({ lightMode,data}) {
  return (
    <div style={{minHeight:'70px'}} className="flex z-10">
      <div style={{width:'50px',height:'50px',borderRadius:'50%'}} className={`d-flex div-items-center ${
        lightMode ? "card-drop-light-shadow" : "card-drop-dark-shadow"
      }`}>{data.icon}</div>
      <div>
        <h3 className="fs-s-20 fw-700 mb-10">{data.head}</h3>
        {data.content}
      </div>
    </div>
  );
}

export default Stepcard;
