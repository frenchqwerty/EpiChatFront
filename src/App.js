import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Login} from "./Login/Login";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Register} from "./Register/Register";
import Message from "./Home/Message";

function App() {
    return (
        <Router>
            <Route exact path="/" component={Message}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
        </Router>
    );
}

export default App;
