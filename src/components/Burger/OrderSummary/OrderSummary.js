import React from "react";

import Aux from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";

class OrderSummary extends React.Component {
  componentDidUpdate() {
    console.log("order");
  }

  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey}</span> :
            {this.props.ingredients[igKey]}
          </li>
        );
      }
    );
    return (
      <Aux>
        <h3>your Order</h3>
        <p>Ingredients :</p>
        <ul>{ingredientsSummary}</ul>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.modalClosed}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinue}>
          Continue
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
