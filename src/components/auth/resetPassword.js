import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Axios from "axios";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import styles from "./resetPassword.module.css";

const ResetPassword = ({ match }) => {
  const token = match.params.token;
  console.log("token", token);

  const history = useHistory();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    Axios.post(
      process.env.REACT_APP_API_BASE_URL + "/api/user/password-reset",
      {
        confirm_password: confirmPassword,
        token,
        password,
      }
    )
      .then((response) => {
        console.log("response", response);
        history.push("/password-success-reset");
      })
      .catch((error) => {
        if (error.response.data.error) {
          setError(error.response.data.error.message);
        } else if (error.response.data.errors) {
          setError(error.response.data.errors[0].detail);
        } else {
          setError("Unknown Error");
        }

        console.log("Axios Error!", error.response);
      });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Reset Password</h1>
      {error ? <Alert variant="danger">{error}</Alert> : null}
      <Form onSubmit={submit}>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ResetPassword;
