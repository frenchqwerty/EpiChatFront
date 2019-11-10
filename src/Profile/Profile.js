import React from "react";
import logo from "./images/logo.png";
import "./Profile.css";
import {Link, Redirect} from "react-router-dom";
import axios from "axios";

export class Profile extends React.Component {
    editProfile(e) {
        let body = this.state.profile;
        delete body.email;
        delete body.id;
        axios.patch("http://localhost:4000/users/me", body,
            {
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
    };

    constructor() {
        super();
        this.state = {
            profile: {
                name: "",
                profession: "",
                age: "",
                phone: "",
                email: "",
                id: 0
            }
        }
    }

    componentDidMount() {
        axios.get("http://127.0.0.1:4000/users/me", {
            headers: {
                Authorization: "Bearer " + JSON.parse(localStorage.getItem("tokens")).accessToken
            }
        }).then(res => {
            if (res.status === 200) {
                this.setState({profile: res.data});
            }
        }).catch(e => {
            localStorage.removeItem('tokens');
            return <Redirect to="/"/>;
        });
    }

    render() {
        const profile = this.state.profile;
        return (
            <div>
                <img src={logo} alt="logo" className="mx-auto d-block"/>
                <Link to='/'>Chat</Link>
                <div className="container emp-profile">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
                                    alt=""/>
                                <div className="file btn btn-lg btn-primary">
                                    Change Photo
                                    <input type="file" name="file"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="profile-head">
                                <h5>
                                    {profile && profile.name ? profile.name : "Name not already set"}
                                </h5>
                                <h6>
                                    {profile && profile.profession ? profile.profession : "Profession not already set"}
                                </h6>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home"
                                           role="tab" aria-controls="home" aria-selected="true">About</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <button type="button" className="btn btn-primary" data-toggle="modal"
                                    data-target="#exampleModal">
                                Edit Profile
                            </button>

                            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Edit Profile</h5>
                                            <button type="button" className="close" data-dismiss="modal"
                                                    aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <form>
                                            <div className="modal-body">
                                                <div className="form-group">
                                                    <label>Name</label>
                                                    <input type="text" className="form-control"
                                                           placeholder="Enter name" value={profile && profile.name}
                                                           onChange={(e) => this.setState({
                                                               profile: {
                                                                   name: e.target.value,
                                                                   profession: this.state.profile.profession,
                                                                   age: this.state.profile.age,
                                                                   phone: this.state.profile.phone,
                                                                   id: this.state.profile.id,
                                                                   email: this.state.profile.email
                                                               }
                                                           })}/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Profession</label>
                                                    <input type="text" className="form-control"
                                                           placeholder="Enter profession"
                                                           value={profile && profile.profession}
                                                           onChange={(e) => this.setState({
                                                               profile: {
                                                                   name: this.state.profile.name,
                                                                   profession: e.target.value,
                                                                   age: this.state.profile.age,
                                                                   phone: this.state.profile.phone,
                                                                   id: this.state.profile.id,
                                                                   email: this.state.profile.email
                                                               }
                                                           })}/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Phone</label>
                                                    <input type="text" className="form-control"
                                                           placeholder="Enter phone" value={profile && profile.phone}
                                                           onChange={(e) => this.setState({
                                                               profile: {
                                                                   name: this.state.profile.name,
                                                                   profession: this.state.profile.profession,
                                                                   age: this.state.profile.age,
                                                                   phone: e.target.value,
                                                                   id: this.state.profile.id,
                                                                   email: this.state.profile.email
                                                               }
                                                           })}/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Age</label>
                                                    <input type="text" className="form-control"
                                                           placeholder="Enter phone" value={profile && profile.age}
                                                           onChange={(e) => this.setState({
                                                               profile: {
                                                                   name: this.state.profile.name,
                                                                   profession: this.state.profile.profession,
                                                                   phone: this.state.profile.phone,
                                                                   age: e.target.value,
                                                                   id: this.state.profile.id,
                                                                   email: this.state.profile.email
                                                               }
                                                           })}/>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary"
                                                        data-dismiss="modal">Close
                                                </button>
                                                <button type="submit" onClick={this.editProfile.bind(this)}
                                                        className="btn btn-primary">Save changes
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-8">
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel"
                                     aria-labelledby="home-tab">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>User Id</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{profile && profile.id}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Name</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{profile && profile.name ? profile.name : "Name not already set"}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Email</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{profile && profile.email}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Phone</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{profile && profile.phone ? profile.phone : "Phone not already set"}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Profession</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{profile && profile.profession ? profile.profession : "Profession not already set"}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Age</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{profile && profile.age ? profile.age : "Age not already set"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
