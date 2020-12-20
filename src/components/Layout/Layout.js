import Aux from "../../hoc/Auxiliary";

import "./Layout.css";

const layout = (props) => (
  <Aux>
    <div>Toolbar, Sidebar, Backdrop</div>
    <main className="Content">{props.children}</main>
  </Aux>
);

export default layout;
