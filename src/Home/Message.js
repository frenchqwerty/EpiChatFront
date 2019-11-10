import React from "react";
import "./Message.css";
import logo from "./images/logo.png";
import socketIOClient from "socket.io-client";
import axios from 'axios';
import {Link, Redirect} from "react-router-dom";

export class Message extends React.Component {
    constructor() {
        super();
        this.state = {
            initChat: []
        };
    }

    message = '';
    socket = socketIOClient("http://127.0.0.1:8888/", {reconnection: false});
    email = '';

    componentDidMount() {
        this.socket.on("chat", data => {
            this.setState({initChat: this.state.initChat.concat([JSON.parse(data)])})
        });
        axios.get("http://127.0.0.1:4000/users/me", {
            headers: {
                Authorization: "Bearer " + JSON.parse(localStorage.getItem("tokens")).accessToken
            }
        }).then(res => {
            if (res.status === 200)
                this.email = res.data.email;
        }).catch(e => {
            localStorage.removeItem('tokens');
            return <Redirect to="/"/>;
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

    sendMessage(e) {
        e.preventDefault();
        this.socket.emit('chat', JSON.stringify({
            email: this.email,
            message: this.message
        }));
    };

    render() {
        const initChat = Array.from(this.state.initChat);
        return (
            <div className="container-fluid main">
                <img src={logo} className="d-block mx-auto" alt="logo"/>
                <Link to='/profile'>My profile</Link>
                <div className="messaging">
                    <div className="inbox_msg">
                        <div className="mesgs">
                            <div className="msg_history">
                                {initChat && initChat.map((item, i) => {
                                    return (
                                        <div className="outgoing_msg"
                                             key={i}>
                                            <div className={this.email !== item.email ? "received_withd_msg" : "sent_msg"}>
                                                <p>{item.message}
                                                </p>
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
                                    <form>
                                        <input type="text" className="write_msg" placeholder="Type a message"
                                               onChange={e => {
                                                   this.message = e.target.value
                                               }}/>
                                        <button className="msg_send_btn" type="submit"
                                                onClick={this.sendMessage.bind(this)}>
                                            <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
