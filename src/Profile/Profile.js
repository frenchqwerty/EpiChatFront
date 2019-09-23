import React from 'react';
import logo from './images/logo.png';

export class Profile extends React.Component {
    render() {
        return (
          <div className="container-fluid main">
              <img src={logo} className="logo d-block mx-auto" alt="logo"/>
          </div>
        );
    }
}
