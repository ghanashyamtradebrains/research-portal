import { Dropdown, Menu } from "antd";
import React from "react";


function CustomDropdown({children,menuItems,activeTrigger,lightMode,menuOnclick}) {
    const menu = (
        <Menu  theme={lightMode?'light':'dark'} onClick={menuOnclick}  rootClassName={lightMode?'bg-white':'bg-dark-gray '} 
          items={menuItems}
        />
      );

  return (
    <div>
      <Dropdown overlay={menu} trigger={[activeTrigger]} placement="bottomRight" overlayClassName={lightMode?"dropdown-child-light":'dropdown-child-dark'}>
       {children}
      </Dropdown>
    </div>
  );
}

export default CustomDropdown;
