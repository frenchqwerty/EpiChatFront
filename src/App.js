import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Login} from "./Login/Login";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Register} from "./Register/Register";
import {Message} from "./Home/Message";
import {Profile} from "./Profile/Profile";

function App() {
    return (
        <Router>
            <Route exact path="/" component={Message}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/profile" component={Profile}/>
        </Router>
    );
}

export default App;
