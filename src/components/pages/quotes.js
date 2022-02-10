import React, { useContext, useEffect, useState } from "react";
import { AuthManagerContext } from "../../context/authManager";
import Axios from "axios";
import moment from "moment";
import { withRouter } from "react-router-dom";

import styles from "./quotes.module.css";

const Quotes = ({ history }) => {
  const { accessToken } = useContext(AuthManagerContext);
  const [quotes, setQuotes] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setError(false);
    setLoading(true);
    Axios.get(process.env.REACT_APP_API_BASE_URL + "/api/quotes", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => {
        setQuotes(response.data.quotes);
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

  console.log("quotes", quotes);

  const all = quotes.map((quote, index) => {
    let createDate = moment(quote.CreateDate).format("Mo MMMM YYYY");
    return (
      <tr key={index}>
        <td>{quote.DocEntry}</td>
        <td>{quote.CardName}</td>
        <td>{createDate}</td>
        <td>
          <button
            onClick={() => history.push("/quote/" + quote.DocEntry)}
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
      <h1>Quote</h1>
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

export default withRouter(Quotes);
