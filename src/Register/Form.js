import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Link, Redirect} from "react-router-dom";
import axios from "axios";

function FormComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');

    if (localStorage.getItem("tokens") !== null)
        return <Redirect to="/"/>;

    function register() {
        if (password === passwordConf) {
            axios.post('http://localhost:4000/auth/register', {
                email: email,
                password: password
            });
            return <Redirect to="/login"/>
        }
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
            <Form.Group controlId="formBasicPasswordConfirmation">
                <Form.Control type="password" value={passwordConf} onChange={e => setPasswordConf(e.target.value)}
                              placeholder="Password"/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={register}>
                Submit
            </Button>
            <p className="text-white">You already have an account ? <Link to="/login">Login here !</Link></p>
        </Form>
    )
}

export default FormComponent;
