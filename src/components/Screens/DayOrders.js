import React, { useContext, useState, useEffect } from "react";
import { FireBaseContext } from "../../firebase";
import RegisterCard from "../UI/RegisterCard";

function DayOrders() {
  const { firebase } = useContext(FireBaseContext);

  const [register, setRegister] = useState({});
  console.log(register);

  useEffect(() => {
    const getRegister = async () => {
      try {
        await firebase.db
          .collection("register")
          .get()
          .then((snapshot) => {
            const data = snapshot.docs.map((doc) => {
              return {
                day: doc.day,
                ...doc.data(),
              };
            });
            setRegister(data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getRegister();
  }, []);

  console.log("register", register);

  return (
    <>
      <h1 className="text-3xl font-light mb-4">Last Days Orders</h1>
      {register.length > 0 && register.map((day, i) => <RegisterCard key={i} register={day} />)}
    </>
  );
}

export default DayOrders;
