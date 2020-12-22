import React from "react";
import "./NavigationItem.css";

export default function NavigationItem(props) {
  const classes = "active";
  return (
    <li className="NavigationItem">
      <a href={props.link} className={props.active ? classes : null}>
        {props.children}
      </a>
    </li>
  );
}
