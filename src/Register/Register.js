import React from 'react';
import './Register.css';
import image from './images/flying-cat.gif'
import logo from './images/logo.png'
import Image from "react-bootstrap/Image";
import FormComponent from "./Form";

export class Register extends React.Component {
    render() {
        return (
            <div className="main container-fluid">
                <div className="row">
                    <div className="col-lg-8 d-none d-lg-block img-register-wrapper">
                        <Image src={image} fluid className="img-register"/>
                    </div>
                    <div className="col-lg-4 col-sm-12 vertical-align">
                        <Image src={logo} fluid className="mx-auto d-block"/>
                        <FormComponent />
                    </div>
                </div>
            </div>
        )
    }
}
