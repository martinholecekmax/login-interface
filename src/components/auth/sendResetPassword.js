import React, { useState } from "react";
import Axios from "axios";
import { Alert } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SendResetPasswordSuccessful from "./sendResetPasswordSuccessful";

import styles from "./sendResetPassword.module.css";

const SendResetPassword = () => {
  const [error, setError] = useState();
  const [successful, setSuccessful] = useState(true);
  const [email, setEmail] = useState();
  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    Axios.post(
      process.env.REACT_APP_API_BASE_URL + "/api/user/send-reset-email",
      {
        email,
      }
    )
      .then((response) => {
        setSuccessful(true);
        console.log("response", response);
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
      {successful ? (
        <SendResetPasswordSuccessful email={email} />
      ) : (
        <div>
          <h1>Reset Password</h1>
          {error ? <Alert variant="danger">{error}</Alert> : null}
          <Form onSubmit={submit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default SendResetPassword;
