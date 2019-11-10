import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Link, Redirect} from "react-router-dom";
import axios from 'axios';

function FormComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (localStorage.getItem("tokens") !== null)
        return <Redirect to="/"/>;

    function login() {
        axios.post('http://localhost:4000/auth/login', {
            username: email,
            password: password
        }).then(result => {
            if (result.status === 201) {
                localStorage.setItem("tokens", JSON.stringify(result.data));
                return <Redirect to="/"/>;
            } else
                localStorage.removeItem('tokens');
        });
    }

    return (
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)}
                              placeholder="Enter email"/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)}
                              placeholder="Password"/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={login}>
                Submit
            </Button>
            <p className="text-white">You don't have account ? <Link to="/register">Register here !</Link></p>
        </Form>
    );
}

export default FormComponent;
