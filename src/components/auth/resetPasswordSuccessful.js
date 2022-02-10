import React from "react";

import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

import styles from "./resetPasswordSuccessful.module.css";

const ResetPasswordSuccessful = () => {
  const history = useHistory();
  const done = () => {
    history.push("/login");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Password Changed!</h1>
      <div className={styles.content}>
        <div className={styles.text}>
          Your password has been changed successfully.
        </div>
        <Button variant="primary" onClick={done}>
          Done
        </Button>
      </div>
    </div>
  );
};

export default ResetPasswordSuccessful;
