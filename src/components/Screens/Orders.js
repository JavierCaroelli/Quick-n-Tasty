import React, { useState, useEffect, useContext } from "react";
import { FireBaseContext } from "../../firebase";
import OrderCard from "../UI/OrderCard";

function Orders() {
  // Firebase Context
  const { firebase } = useContext(FireBaseContext);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = () => {
      firebase.db.collection("orders").where("complete", "==", false).onSnapshot(handleSnapshot);
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

  return (
    <>
      <h1 className="text-3xl font-light mb-4">InComming Orders</h1>

      <div className="sm:flex sm:flex-wrap -mx-3">
        {orders && orders.map((order) => <OrderCard key={order.id} order={order} />)}
      </div>
    </>
  );
}

export default Orders;
