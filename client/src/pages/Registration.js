import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import Axios from "axios";
import "../App.css";
import {Link, useHistory} from 'react-router-dom'

export default function Registration() {
  const [usernameReg, setUsernameReg] = useState("");
  const usernameRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [passwordReg, setPasswordReg] = useState("");
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  Axios.defaults.withCredentials = true;

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      register()
      history.push('/login')
    } catch {
      // You can't login
      // if the account dosn't exist
      setError("Failed to Register")
    }

    setLoading(false)
  }

  const register = () => {
    Axios.post("http://localhost:3001/register", {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      setMessage(response);
    });
  };

  return (
      <>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Register</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <div className="App">
              <div className="registration">
                <Form onSubmit={handleSubmit}>
                  <Form.Group id={"Username"}>
                  <Form.Label>Username</Form.Label>
                    <Form.Control type="text" ref={usernameRef}
                                  placeholder="Username"
                                  onChange={(e) => {
                                    setUsernameReg(e.target.value);
                                  }} required/>
                  </Form.Group>
                  <Form.Group id={"Password"}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef}
                                  placeholder="Password"
                                  onChange={(e) => {
                                    setPasswordReg(e.target.value);
                                  }} required/>
                  </Form.Group>
                  <Form.Group id={"Password Confirm"}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordConfirmRef}
                                  placeholder="Password Confirm"
                                  required/>
                  </Form.Group>
                  <Button disabled={loading} onClick={register} className="w-100" type="submit">
                    Register
                  </Button>
                </Form>
                <div className="w-100 text-center mt-2">
                  Already have an account? <Link to={"/login"}>Log In</Link>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </>
  );
}
