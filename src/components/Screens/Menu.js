import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FireBaseContext } from "../../firebase";
import DishCard from "../UI/DishCard";

function Menu() {
  const [dishes, setDishes] = useState([]);

  const { firebase } = useContext(FireBaseContext);

  useEffect(() => {
    const getDish = async () => {
      await firebase.db.collection("products").onSnapshot(handleSnapshot);
    };
    getDish();
  }, []);

  function handleSnapshot(snapshot) {
    const cloud = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setDishes(cloud);
  }

  return (
    <div>
      <h1 className="text-3xl font-light mb-4">Menu</h1>
      <Link
        to="/newdish"
        className="rounded-md  bg-blue-800 hover:bg-blue-700 inline-block mb-2 py-2 px-5 text-white uppercase font-bold shadow-sm"
      >
        Add new Dish
      </Link>
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </div>
  );
}

export default Menu;
