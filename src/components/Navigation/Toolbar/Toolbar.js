import React from "react";
import "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

export const Toolbar = (props) => {
  return (
    <header className="Toolbar">
      <div>Menu</div>
      <Logo></Logo>
      <NavigationItems></NavigationItems>
    </header>
  );
};

export default Toolbar;
