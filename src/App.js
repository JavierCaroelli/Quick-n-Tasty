import "./App.css";
import { Route } from "react-router-dom";
import Menu from "./components/Screens/Menu";
import NewDish from "./components/Screens/NewDish";
import Orders from "./components/Screens/Orders";
import DayOrders from "./components/Screens/DayOrders";
import OrdersClosed from "./components/Screens/OrdersClosed";

function App() {
  return (
    <div>
      <Route exact={true} path="/" component={Menu} />
      <Route path="/orders" component={Orders} />
      <Route path="/newdish" component={NewDish} />
      <Route path="/closed" component={OrdersClosed} />
      <Route path="/dayorders" component={DayOrders} />
    </div>
  );
}

export default App;
