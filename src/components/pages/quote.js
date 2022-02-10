import React, { useContext, useEffect, useState } from "react";
import { AuthManagerContext } from "../../context/authManager";
import Axios from "axios";
import moment from "moment";
import { getPrice } from "../../utils/general";

import styles from "./quote.module.css";

const Quote = ({ match }) => {
  const { accessToken } = useContext(AuthManagerContext);
  const [quote, setQuote] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setError(false);
    setLoading(true);
    let DocEntry = match.params.id;
    Axios.post(
      process.env.REACT_APP_API_BASE_URL + "/api/quote",
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
        setQuote(response.data.quote);
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setLoading(false);
      });
  }, [accessToken, match]);

  console.log("quote", quote);

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    return <div>There has been an error</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Quote</h1>
      {quote ? (
        <div className={styles.content}>
          <div>Card Name: {quote.CardName}</div>
          <div>Address: {quote.Address}</div>
          <div>
            {quote.CreateDate
              ? moment(quote.CreateDate).format("Mo MMMM YYYY")
              : null}
          </div>
          <div>Doc Total: {getPrice(quote.DocTotal)}</div>
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

export default Quote;
