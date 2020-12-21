import React from "react";

import Aux from "../../../hoc/Auxiliary";

const orderSummary = (props) => {
  const ingredientsSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span> :
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>your Order</h3>
      <p>Ingredients :</p>
      <ul>{ingredientsSummary}</ul>
      <p>Continue to checkout?</p>
    </Aux>
  );
};

export default orderSummary;