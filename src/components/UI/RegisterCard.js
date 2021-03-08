import React, { useState } from "react";

function RegisterCard({ register }) {
  console.log("RegisterCard", register);

  const [show, setShow] = useState(false);

  const showRegister = () => {
    show ? setShow(false) : setShow(true);
  };

  return (
    <>
      {register && (
        <div className="mt-6">
          <button
            onClick={() => showRegister()}
            className="inline-flex justify-left w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 "
          >
            <svg
              class="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
            &ensp; Day Closed at :&ensp;<span className="font-bold">{register.day}</span>
          </button>
          {show && (
            <table className="w-full mt-1 rounded-md border border-gray-300 p-2">
              <thead>
                <tr>
                  <th className="w-2/6 border border-gray-300">ID</th>
                  <th className="w-2/6 border border-gray-300">Order's Detail</th>
                  <th className="w-1/6 border border-gray-300">Quantity</th>
                  <th className="w-1/6 border border-gray-300">Total</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {register.orders.map((order) => (
                  <tr key={order.id}>
                    <td className="border border-gray-300 p-2 font-bold text-gray-600">
                      {order.id}
                    </td>
                    <td className="border border-gray-300 p-1">
                      {order.list.map((order, i) => (
                        <ul key={i}>{order.name}</ul>
                      ))}
                    </td>
                    <td className="border border-gray-300 p-1">
                      {order.list.map((order, i) => (
                        <ul key={i}>{order.qty}</ul>
                      ))}
                    </td>
                    <td className="border border-gray-300 p-1 font-bold">$ {order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </>
  );
}

export default RegisterCard;
