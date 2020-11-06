import React, { useContext, useEffect, useState } from "react";
import { AuthManagerContext } from "../../context/authManager";
import Axios from "axios";

import styles from "./orders.module.css";

const Orders = () => {
  const { accessToken } = useContext(AuthManagerContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    Axios.get(process.env.REACT_APP_API_BASE_URL + "/api/orders", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [accessToken]);

  const all = orders.map((order, index) => {
    return (
      <div key={index}>
        {order.name} - {order.age}
      </div>
    );
  });
  return (
    <div className={styles.container}>
      <div>Orders</div>
      <div>{all}</div>
    </div>
  );
};

export default Orders;
