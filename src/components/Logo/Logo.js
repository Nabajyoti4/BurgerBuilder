import React from "react";

import burgerLogo from "../../assests/images/logo.png";
import "./Logo.css";

const logo = (props) => {
  return (
    <div className="Logo">
      <img src={burgerLogo} alt="MyBurger"></img>
    </div>
  );
};

export default logo;
