import React, { useContext, useRef } from "react";
import { FireBaseContext } from "../../firebase";

function DishCard({ dish }) {
  const { id, exist, name, price, description, category, imgURL } = dish;

  // Exist ref
  const stockRef = useRef(exist);

  // Firebase Context to change the DB
  const { firebase } = useContext(FireBaseContext);

  // Update Stock in Firebase
  const updateStock = () => {
    const inStock = stockRef.current.value === "true";

    try {
      firebase.db.collection("products").doc(id).update({ exist: inStock });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full px-3 mb-4">
      <div className="p-5 shadow-md bg-white">
        <div className="lg:flex">
          <div className="lg:w-5/12 xl:3/12">
            <img className="w-80" src={imgURL} alt="img dish" />
          </div>
          <div className="lg:w-7/12 xl:9/12 pl-5">
            <p className="font-bold text-2xl text-yellow-600 mb-4">{name}</p>
            <p className="text-gray-600 mb-4">
              Price: <span className="text-gray-700 font-bold">${price}</span>
            </p>
            <p className="text-gray-600 mb-4">
              Category: <span className="text-gray-700 font-bold">{category.toUpperCase()}</span>
            </p>
            <p className="text-gray-600 mb-4">{description}</p>
            <label className="block mt-12 sm:w-2/4">
              <span className="block text-gray-800 mb-2">In Stock</span>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus-outline-none focus:shadow-outline font-bold"
                value={exist}
                ref={stockRef}
                onChange={() => updateStock()}
              >
                <option value="true">Available</option>
                <option value="false">Not Available</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DishCard;
