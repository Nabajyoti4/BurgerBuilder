import Aux from "../Auxiliary";

import "./Layout.css";

import Toolbar from "../../components/Navigation/Toolbar/Toolbar";

const layout = (props) => (
  <Aux>
    <Toolbar></Toolbar>
    <main className="Content">{props.children}</main>
  </Aux>
);

export default layout;
