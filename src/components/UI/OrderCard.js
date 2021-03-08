import React, { useState, useContext } from "react";
import { FireBaseContext } from "../../firebase";

function OrderCard({ order }) {
  const [awaitTime, setAwaitTime] = useState(0);
  // Firebase Context
  const { firebase } = useContext(FireBaseContext);

  // Set await time in Firebase
  const defineTime = (id) => {
    try {
      firebase.db.collection("orders").doc(id).update({ deliverTime: awaitTime });
    } catch (error) {
      console.log(error);
    }
  };

  // Set an Order as Complete
  const completeOrder = (id) => {
    try {
      firebase.db.collection("orders").doc(id).update({ complete: true, closed: false });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sm:w-1/3 lg:w-1/4 px-2 mb-4">
      <div className="p-3 shadow-md bg-white">
        <h1 className="text-yellow-600 text-lg font-bold">{order.id}</h1>
        {order.order.map((dish) => (
          <>
            <p className="text-gray-600">
              {dish.qty} {dish.name}
            </p>
          </>
        ))}
        <p className="text-gray-700 font-bold">Total: ${order.total}</p>
        {order.deliverTime === 0 && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Await Time:</label>
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min="1"
              max="20"
              placeholder="20"
              value={awaitTime}
              onChange={(e) => setAwaitTime(parseInt(e.target.value))}
            ></input>
            <button
              onClick={() => defineTime(order.id)}
              type="submit"
              className="bg-gray-800 hover:bg-gray-900 rounded-md w-full mt-5 p-2 text-white uppercase font-bold"
            >
              Definir Tiempo
            </button>
          </div>
        )}
        {order.deliverTime > 0 && (
          <p className="text-gray-700">
            Await Time: <span className="font-bold">{order.deliverTime} Min.</span>
          </p>
        )}
        {!order.complete && order.deliverTime !== 0 && (
          <button
            type="button"
            className="bg-blue-800 hover:bg-blue-700 rounded-md w-full mt-5 p-2 text-white uppercase font-bold"
            onClick={() => completeOrder(order.id)}
          >
            Mark as Completed
          </button>
        )}
      </div>
    </div>
  );
}

export default OrderCard;
