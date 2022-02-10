import React, { useContext, useEffect, useState } from "react";
import { AuthManagerContext } from "../../context/authManager";
import Axios from "axios";
import moment from "moment";
import { getPrice } from "../../utils/general";

import styles from "./order.module.css";

const Order = ({ match }) => {
  const { accessToken } = useContext(AuthManagerContext);
  const [order, setOrder] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setError(false);
    setLoading(true);
    let DocEntry = match.params.id;
    Axios.post(
      process.env.REACT_APP_API_BASE_URL + "/api/order",
      {
        DocEntry,
      },
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    )
      .then((response) => {
        console.log("response", response);
        setOrder(response.data.order);
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setLoading(false);
      });
  }, [accessToken, match]);

  console.log("order", order);

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    return <div>There has been an error</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Order</h1>
      {order ? (
        <div className={styles.content}>
          <div>Card Name: {order.CardName}</div>
          <div>Address: {order.Address}</div>
          <div>
            {order.CreateDate
              ? moment(order.CreateDate).format("Mo MMMM YYYY")
              : null}
          </div>
          <div>Doc Total: {getPrice(order.DocTotal)}</div>
        </div>
      ) : null}
      <hr />
      {products
        ? products.map((product, index) => {
            return (
              <div key={index}>
                <h4>Product</h4>
                {product.ItemCode ? (
                  <div>Item Code: {product.ItemCode}</div>
                ) : null}
                <div>Description: {product.Dscription}</div>
                <div>Price: {getPrice(product.Price)}</div>
                <hr />
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Order;
