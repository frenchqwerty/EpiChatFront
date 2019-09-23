import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

export default class FormComponent extends React.Component {
    render() {
        return (
            <Form>
                <Form.Group controlId="formBasicName">
                    <Form.Control type="text" placeholder="Enter name" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicPasswordConfirmation">
                    <Form.Control type="password" placeholder="Password confirmation" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <p className="text-white">You already have an account ? <Link to="/login">Login here !</Link></p>
            </Form>
        )
    }
}
