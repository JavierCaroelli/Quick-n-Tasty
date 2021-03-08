import React from "react";
import { NavLink } from "react-router-dom";

function SideBar() {
  return (
    <div className="md:w-2/5 xl:w-1/5 bg-gray-800">
      <div className="p-3">
        <p className="uppercase text-white text-2xl tracking-wide text-center font-bold">
          Quick & Tasty
        </p>
        <p className="mt-3 text-gray-600 p-3">Admin your restaurant with these:</p>
        <nav className="p-3">
          <NavLink
            exact={true}
            activeClassName="text-yellow-500"
            className="p-2 text-xg rounded-md text-gray-400 block hover:bg-yellow-500 hover:text-gray-900 text-center font-bold"
            to="/menu"
          >
            Menu
          </NavLink>
          <NavLink
            exact={true}
            activeClassName="text-yellow-500"
            className="p-2 text-xg rounded-md text-gray-400 block hover:bg-yellow-500 hover:text-gray-900 text-center font-bold"
            to="/"
          >
            Incomming Orders
          </NavLink>
          <NavLink
            exact={true}
            activeClassName="text-yellow-500"
            className="p-2 text-xg rounded-md text-gray-400 block hover:bg-yellow-500 hover:text-gray-900 text-center font-bold"
            to="/closed"
          >
            Closed Orders
          </NavLink>
          <NavLink
            exact={true}
            activeClassName="text-yellow-500"
            className="p-2 mt-10 text-xg rounded-md text-gray-400 block hover:bg-yellow-500 hover:text-gray-900 text-center font-bold"
            to="/dayorders"
          >
            Older Orders
          </NavLink>
        </nav>
      </div>
    </div>
  );
}

export default SideBar;
