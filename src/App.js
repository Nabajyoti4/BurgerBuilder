import React from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/BurgerBuilder/Checkout/Checkout";

class App extends React.Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder></BurgerBuilder>
          <Checkout></Checkout>
        </Layout>
      </div>
    );
  }
}

export default App;
