import React from "react";
import "./BuildControls.css";

import BuildControl from "../BuildControls/BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];
const buildControls = (props) => {
  return (
    <div className="BuildControls">
      <p>Price : {props.price}</p>
      {controls.map((ctrl) => {
        return (
          <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            addIngredient={() => props.ingredientAdded(ctrl.type)}
            removed={() => props.ingredientRemove(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
          ></BuildControl>
        );
      })}
      <button
        className="OrderButton"
        disabled={!props.purchaseable}
        onClick={props.ordered}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default buildControls;
