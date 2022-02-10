import React, { useContext, useState } from "react";
import { AuthManagerContext } from "../../context/authManager";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Axios from "axios";
import { Alert } from "react-bootstrap";

import styles from "./changePassword.module.css";

const ChangePassword = () => {
  const { accessToken } = useContext(AuthManagerContext);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    Axios.post(
      process.env.REACT_APP_API_BASE_URL + "/api/user/password-change",
      {
        confirm_password: confirmPassword,
        new_password: newPassword,
        password,
      },
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    )
      .then((response) => {
        console.log("response", response);
        setSuccess("Password successfully changed.");
        setPassword(null);
        setNewPassword(null);
        setConfirmPassword(null);
      })
      .catch((error) => {
        setSuccess(null);
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
      <h1 className={styles.title}>Change Password</h1>
      {error ? <Alert variant="danger">{error}</Alert> : null}
      {success ? <Alert variant="success">{success}</Alert> : null}
      <Form onSubmit={submit}>
        <Form.Group>
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            value={newPassword || ""}
            placeholder="New Password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            value={confirmPassword || ""}
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

export default ChangePassword;
