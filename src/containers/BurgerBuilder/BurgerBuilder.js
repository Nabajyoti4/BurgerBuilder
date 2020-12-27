import React from "react";
import Aux from "../../hoc/Auxiliary";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};
class BurgerBuilder extends React.Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
  };

  /**
   *
   */
  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ purchaseable: sum > 0 });
  }

  /**
   * add ingredient
   * @param {type} type
   */
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };

    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  /**
   * remove ingredient
   * @param {type} type
   */
  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };

    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  /**
   * set purachse to ture
   */
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  /**
   * handle modal close and open
   */
  modalCloseHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Naba",
        address: {
          street: "jail road",
          zipcode: "785001",
          country: "India",
        },
        email: "zoro@gmail.com",
      },
      deliveryMethod: "fastest",
    };

    axios
      .post("/orders.json", order)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const disableInfo = {
      ...this.state.ingredients,
    };

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.modalCloseHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            modalClosed={this.modalCloseHandler}
            purchaseContinue={this.purchaseContinueHandler}
          ></OrderSummary>
        </Modal>
        <Burger ingredients={this.state.ingredients}></Burger>
        <BuildControls
          price={this.state.totalPrice}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemove={this.removeIngredientHandler}
          purchaseable={this.state.purchaseable}
          disabled={disableInfo}
          ordered={this.purchaseHandler}
        ></BuildControls>
      </Aux>
    );
  }
}

export default BurgerBuilder;
