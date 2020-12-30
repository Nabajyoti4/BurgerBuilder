import React, { Component } from "react";
import Button from "../../../../components/UI/Button/Button";
import "./ContactData.css";
import axios from "../../../../axios-orders";

export default class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      posalCode: "",
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
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
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  };
  render() {
    return (
      <div className="ContactData">
        <h4>Enter your contact data</h4>
        <form>
          <input
            className="Input"
            type="text"
            name="name"
            placeholder="enter your name"
          ></input>
          <input
            className="Input"
            type="email"
            name="email"
            placeholder="enter your mail"
          ></input>
          <input
            className="Input"
            type="text"
            name="street"
            placeholder="enter your street"
          ></input>
          <input
            className="Input"
            type="text"
            name="postal"
            placeholder="enter your Postal"
          ></input>
          <Button btnType="Success" clicked={this.orderHandler}>
            Order
          </Button>
        </form>
      </div>
    );
  }
}
