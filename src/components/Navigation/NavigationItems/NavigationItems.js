import React from "react";
import "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => {
  return (
    <ul className="NavigationItems">
      <NavigationItem link="/" active>
        Burger builder
      </NavigationItem>
      <NavigationItem link="/checkout">checkout</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
