import React from "react";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

import styles from "./sendResetPasswordSuccessful.module.css";

const SendResetPasswordSuccessful = ({ email }) => {
  const history = useHistory();

  const done = () => {
    history.push("/login");
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Password Reset Email Sent</h1>
      <div className={styles.content}>
        <div className={styles.text}>
          An email has been sent to your rescue email address <b>{email}</b>.
          Follow the directions in the email to reset your password.
        </div>
        <Button variant="primary" onClick={done}>
          Done
        </Button>
      </div>
    </div>
  );
};

export default SendResetPasswordSuccessful;
