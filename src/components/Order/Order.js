import React from "react";
import "./Order.css";

const Order = (props) => {
  const ingredients = [];
  for (let ingredientsName in props.ingredients) {
    ingredients.push({
      name: ingredientsName,
      amount: props.ingredients[ingredientsName],
    });
  }

  const ingredientsOutput = ingredients.map((ig) => {
    return (
      <span key={ig.name}>
        {ig.name} ({ig.amount})
      </span>
    );
  });
  return (
    <div className="Order">
      <p>{ingredientsOutput}</p>
      <p>
        Price : <strong>{props.price}</strong>
      </p>
    </div>
  );
};

export default Order;
