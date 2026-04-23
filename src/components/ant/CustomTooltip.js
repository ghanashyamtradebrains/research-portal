import { Tooltip } from 'antd'
import React from 'react'

function CustomTooltip({text,children,placement="top"}) {
  return (
    <Tooltip overlayInnerStyle={{fontSize:'12px'}} overlayStyle={{padding:'8px 10px'}}  placement={placement} title={text}>{children}</Tooltip>
  )
}

export default CustomTooltip