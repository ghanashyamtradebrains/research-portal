import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PremiumRedirectModal from '../components/PremiumRedirectModal';
import { authStore } from '../redux/reducers/authSlice';
import { setToggleForm } from '../redux/reducers/AuthToggleSlice';

function AuthRouter({ children, afterLogin = false, redirState = "/" }) {
  const location = useRouter()
  const UserAuth = useSelector(authStore);
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(true)
  if (!UserAuth?.userData.access_token && afterLogin === false) {
    // return <Navigate to="/login" state={redirState}  replace />;
    dispatch(setToggleForm("login"))

    return <>
      {children}
      {/* <PremiumRedirectModal modalPlan={redirState} redirec
        tState={`${location.pathname?.substring(1)}${location.search}`} loginRediect={true} visible={visible} setVisible={setVisible} /> */}
    </>
  }
  else if (UserAuth?.userData.access_token && afterLogin) {
    return location.replace('/')
  }

  return children;
}

export default AuthRouter