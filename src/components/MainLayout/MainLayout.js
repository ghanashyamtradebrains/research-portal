import { getThemeMode } from '../../redux/reducers/ThemeSlice';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

function MainLayout({children}) {
  const {lightMode} =useSelector(getThemeMode);

  return (
    <div >
<div style={{ zIndex: 999 }} className="p-fixed w-100">
            </div>
    <div className={`${lightMode ? "bg-white" : "invert-text"}`}>
        {children}
    </div>

    </div>
  )
}

export default MainLayout