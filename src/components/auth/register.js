import React, { useContext, useState } from "react";
import { AuthManagerContext } from "../../context/authManager";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Axios from "axios";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import styles from "./register.module.css";

const Register = () => {
  const { setTokens, setUser } = useContext(AuthManagerContext);

  const history = useHistory();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [error, setError] = useState();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    Axios.post(process.env.REACT_APP_API_BASE_URL + "/api/user/register", {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      passwordConfirm,
    })
      .then((response) => {
        console.log("response", response);
        setTokens({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        });
        setUser(response.data.user);
        history.push("/");
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
      <h1>Register</h1>
      {error ? <Alert variant="danger">{error}</Alert> : null}
      <Form onSubmit={submit}>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Register;
