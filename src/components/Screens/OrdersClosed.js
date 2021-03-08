import React, { useState, useEffect, useContext } from "react";
import { FireBaseContext } from "../../firebase";
import { NavLink } from "react-router-dom";

function OrdersClosed() {
  // Firebae Context
  const { firebase } = useContext(FireBaseContext);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = () => {
      firebase.db.collection("orders").where("closed", "==", false).onSnapshot(handleSnapshot);
    };
    getOrders();
  }, []);

  function handleSnapshot(snapshot) {
    const orders = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setOrders(orders);
  }

  // Get Total Day's Earnings
  const sumTotal = () => {
    let newTotal = 0;
    newTotal = orders
      .filter((i) => i.closed === false)
      .reduce((newTotal, order) => newTotal + order.total, 0);
    return newTotal;
  };

  // Save Register
  const saveRegister = () => {
    let register = orders.map((order) => ({
      id: order.id,
      list: order.order.map((dish) => ({ name: dish.name, qty: dish.qty, price: dish.price })),
      total: order.total,
    }));

    const now = String(new Date()).split(" ");
    const date = `${now[0]} - ${now[2]}/${now[1]}/${now[3]} - ${now[4]} `;

    const registerObj = { day: date, orders: register };

    try {
      closeOrder();
      firebase.db.collection("register").add(registerObj);
    } catch (error) {
      console.log(error);
    }
  };

  // Close Orders
  const closeOrder = () => {
    try {
      orders.map(
        async (i) => await firebase.db.collection("orders").doc(i.id).update({ closed: true })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-light mb-4">Closed Orders</h1>

      {orders.length > 0 && (
        <NavLink
          exact={true}
          onClick={() => saveRegister()}
          activeClassName="text-yellow-500"
          className="bg-blue-800 hover:bg-blue-700 rounded-md inline-block mb-2 p-2 text-center text-white uppercase mt-5 font-bold w-1/4"
          to="/dayorders"
        >
          Save Register
        </NavLink>
      )}

      {orders.length > 0 && (
        <>
          <div className="mt-5">
            El total incorporado en el día es :{" "}
            <span className="font-bold text-lg">$ {sumTotal()}</span>
          </div>

          <table className="table-fixed w-full mt-5 border-collapse border border-gray-600 p-3  shadow-sm">
            <thead>
              <tr>
                <th className="w-2/6 border border-gray-600">ID</th>
                <th className="w-2/6 border border-gray-600">Order</th>
                <th className="w-1/6 border border-gray-600">Quantity</th>
                <th className="w-1/6 border border-gray-600">Total</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {orders &&
                orders.map(
                  (order) =>
                    !order.closed && (
                      <tr key={order.id}>
                        <td className="border border-gray-600 p-3 font-bold text-yellow-600">
                          {order.id}
                        </td>
                        <td className="border border-gray-600 p-3">
                          {order.order.map((order, i) => (
                            <ul key={i}>{order.name}</ul>
                          ))}
                        </td>
                        <td className="border border-gray-600 p-3">
                          {order.order.map((order, i) => (
                            <ul key={i}>{order.qty}</ul>
                          ))}
                        </td>
                        <td className="border border-gray-600 p-3 font-bold">{order.total}</td>
                      </tr>
                    )
                )}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export default OrdersClosed;
