import React from "react";
import "./NavigationItem.css";
import { NavLink } from "react-router-dom";

export default function NavigationItem(props) {
  return (
    <li className="NavigationItem">
      <NavLink to={props.link}>{props.children}</NavLink>
    </li>
  );
}
