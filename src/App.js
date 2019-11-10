import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {Login} from "./Login/Login";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Register} from "./Register/Register";
import {Message} from "./Home/Message";
import {Profile} from "./Profile/Profile";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import {AuthContext} from "./context/auth";

function App() {
    let isAuth = false;
    if (localStorage.getItem('tokens') !== null)
        isAuth = true;

    return (
        <AuthContext.Provider value={isAuth}>
            <Router>
                <PrivateRoute exact path="/" component={Message}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/profile" component={Profile}/>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
