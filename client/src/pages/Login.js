import React, { useRef,useEffect, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap"
import Axios from "axios";
import "../App.css";

import {Link, useHistory} from "react-router-dom";

export let array = [];

export default function Login() {
    const usernameRef = useRef()
    const passwordRef = useRef()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const history = useHistory()

    localStorage.setItem('name', username);

    Axios.defaults.withCredentials = true;

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            login()
        } catch {
            // You can't login
            // if the account dosn't exist
            setError("Failed to log in")
        }

        setLoading(false)
    }

    const login = () => {
        try {
            setMessage("")
            setLoading(true)
            Axios.post("http://localhost:3001/login", {
                username: username,
                password: password,
            }).then((response) => {
                if (response.data.message) {
                    setError(response.data.message);
                } else {
                    setMessage(response.data[0].username);
                    if (username.length !== 0) {
                        history.push('/chat')
                    }
                }
            });
        } catch {
            setError("Failed to log in")
        }
        setLoading(false)
    };

    const set_result = () => {
        try {
            setMessage("")
            setLoading(true)
            Axios.get("http://localhost:3001/login").then((response) => {
                if (response.data.loggedIn === true) {
                    setError(response.data.user[0].username);
                }
            });
        } catch {
            setError("Failed")
        }
        setLoading(false)
    }

    useEffect(() => {
        set_result()
    }, []);

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <div className="App">
                        <div className="login">
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id={"Username"}>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" ref={usernameRef}
                                                  placeholder="Username"
                                                  onChange={(e) => {
                                                      setUsername(e.target.value);
                                                  }}
                                                  required/>
                                </Form.Group>
                                <Form.Group id={"Password"}>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef}
                                                  placeholder="Password"
                                                  onChange={(e) => {
                                                      setPassword(e.target.value);
                                                  }} required/>
                                </Form.Group>
                                <Button disabled={loading} className="w-100" type="submit">
                                    Log In
                                </Button>
                            </Form>
                            <div className="w-100 text-center mt-2">
                                Need an account ? <Link to={"/register"}>Sign Up</Link>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}
