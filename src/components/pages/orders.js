import React, { useContext, useEffect, useState } from "react";
import { AuthManagerContext } from "../../context/authManager";
import Axios from "axios";
import moment from "moment";
import { withRouter } from "react-router-dom";

import styles from "./orders.module.css";

const Orders = ({ history }) => {
  const { accessToken } = useContext(AuthManagerContext);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setError(false);
    setLoading(true);
    Axios.get(process.env.REACT_APP_API_BASE_URL + "/api/orders", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => {
        setOrders(response.data.orders);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setLoading(false);
      });
  }, [accessToken]);

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    return <div>There has been an error</div>;
  }

  console.log("orders", orders);

  const all = orders.map((order, index) => {
    let createDate = moment(order.CreateDate).format("Mo MMMM YYYY");
    return (
      <tr key={index}>
        <td>{order.DocEntry}</td>
        <td>{order.CardName}</td>
        <td>{createDate}</td>
        <td>
          <button
            onClick={() => history.push("/order/" + order.DocEntry)}
            className="btn btn-primary"
          >
            Show
          </button>
        </td>
      </tr>
    );
  });
  return (
    <div className={styles.container}>
      <h1>Orders</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Doc Entry</th>
            <th>Card Name</th>
            <th>Create Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{all}</tbody>
      </table>
    </div>
  );
};

export default withRouter(Orders);
