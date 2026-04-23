import { message } from "antd";
import React, { useState } from "react";
import CustomInput from "../CustomInput";

function UserDataForm({ lightMode, userData,onSubmit}) {
  const [name, setName] = useState({
    first: userData?.first_name,
    last: userData?.last_name,
  });
  
const patchData=(e)=>{
  e.preventDefault()
  onSubmit(name)
  // message.success('Profile Updated successfully')
}
  return (
    <div>
      <h2 className="fs-22-18 fw-700 lh-20 mb-30">Personal Details</h2>
      <form className="flex flex-col-row align-lg-end mb-30">
        <div>
          <p className="fs-s-12 my-10">First Name</p>
          <CustomInput
            value={name.first}
            onChange={(e) => setName({ ...name, first: e.target.value })}
            placeholder="Enter First Name"
            lightMode={lightMode}
          />
        </div>
        <div>
          <p className="fs-s-12 my-10">Last Name</p>
          <CustomInput
            value={name.last}
            placeholder="Enter Last Name"
            onChange={(e) => setName({ ...name, last: e.target.value })}
            lightMode={lightMode}
          />
        </div>
        <button
          type="submit"
          onClick={patchData}
          style={{ maxWidth: "200px", height: "45px" }}
          className="btn-bg-primary px-5px   fw-600 text-white fs-s-14 br-5"
        >
          Update Name
        </button>
      </form>
      <div>
        <p className="fs-s-12 my-10">Email Id</p>
        <p className="fs-18-14 fw-600 mb-0">{userData?.email}</p>
      </div>
    </div>
  );
}

export default UserDataForm;
