import React from "react";
import Aux from "../../hoc/Auxiliary";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};
class BurgerBuilder extends React.Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then((response) => {
        console.log(response);
        this.setState({ ingredients: response.data });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: true });
      });
  }

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

  /**
   * store order detail in database
   */
  purchaseContinueHandler = () => {
    this.setState({ loading: true });
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
        this.setState({ loading: false, purchasing: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false, purchasing: false });
      });
  };

  render() {
    const disableInfo = {
      ...this.state.ingredients,
    };

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ? (
      <p>ingredient cant be loaded</p>
    ) : (
      <Spinner></Spinner>
    );

    if (this.state.ingredients) {
      burger = (
        <Aux>
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
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          modalClosed={this.modalCloseHandler}
          purchaseContinue={this.purchaseContinueHandler}
        ></OrderSummary>
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner></Spinner>;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.modalCloseHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
