import React from "react";
import "./Message.css";
import logo from "./images/logo.png";
import socketIOClient from "socket.io-client";
import axios from 'axios';
import {Redirect} from "react-router-dom";

export class Message extends React.Component {
    constructor() {
        super();
        this.state = {
            response: false,
            endpoint: "http://127.0.0.1:8888",
            initChat: {}
        };
    }

    componentDidMount() {
        const {endpoint} = this.state;
        const socket = socketIOClient(endpoint);
        socket.on("chat", data => {
            this.setState({initChat: this.state.initChat.concat([JSON.parse(data)])})
        });
        axios.get("http://127.0.0.1:4000/chat", {
            headers: {
                Authorization: "Bearer " + JSON.parse(localStorage.getItem("tokens")).accessToken
            }
        }).then(res => {
            if (res.status === 200)
                this.setState({initChat: res.data});
        }).catch(e => {
            localStorage.removeItem('tokens');
            return <Redirect to="/"/>;
        })
    }

    render() {
        const initChat = Array.from(this.state.initChat);
        return (
            <div className="container-fluid main">
                <img src={logo} className="d-block mx-auto" alt="logo"/>
                <div className="messaging">
                    <div className="inbox_msg">
                        <div className="mesgs">
                            <div className="msg_history">
                                {initChat && initChat.map((item, i) => {
                                    return (
                                        <div className="incoming_msg" key={i}>
                                            <div className="incoming_msg_img">
                                                <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/>
                                            </div>
                                            <div className="received_msg">
                                                <div className="received_withd_msg">
                                                    <p>{item.message}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                    );
                                })}
                                {/*
                                <div className="outgoing_msg">
                                    <div className="sent_msg">
                                        <p>Test which is a new approach to have all
                                            solutions</p></div>
                                </div>*/}
                            </div>
                            <div className="type_msg">
                                <div className="input_msg_write">
                                    <input type="text" className="write_msg" placeholder="Type a message"/>
                                    <button className="msg_send_btn" type="button">
                                        <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
