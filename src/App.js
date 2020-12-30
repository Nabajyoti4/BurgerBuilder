import React from "react";
import Layout from "./hoc/Layout/Layout";
import { Route } from "react-router-dom";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/BurgerBuilder/Checkout/Checkout";
import Orders from "./containers/BurgerBuilder/Orders/Orders";

class App extends React.Component {
  render() {
    return (
      <div>
        <Layout>
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/orders" component={Orders}></Route>
        </Layout>
      </div>
    );
  }
}

export default App;
