import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Login} from "./Login/Login";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Register} from "./Register/Register";

function App() {
    return (
        <Router>
            <div>
                <Route exact path="/" component={Login}/>
                <Route path="/register" component={Register}/>
            </div>
        </Router>
    );
}

export default App;
