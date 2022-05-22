import '../styles/MyProfile.css';
import React, { Component } from "react";

class MyProfile extends Component {


    async fetchData() {
        const restURL = "/rest/users/current";
        await fetch(restURL, {
            method: "GET",
            credentials: 'include',
            headers: {
                mode: 'no-cors',
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.setState({
                    profileData: data,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    age: data.age,
                    email: data.email,
                    username: data.username
                });
            })
    }

    constructor(props) {
        super(props);
        this.state = {
            profileData: [],
            readOnly: true,
            buttonText: "EDIT",
            firstName: "",
            lastName: "",
            age: "",
            email: "",
            username: ""
        }
        this.enableEdit = this.enableEdit.bind(this);
    }
    enableEdit() {
        if (this.state.readOnly) {
            this.setState({ readOnly: false });
            this.setState({ buttonText: "SAVE" });
        } else {
            this.saveData();
            this.setState({ readOnly: true });
            this.setState({ buttonText: "EDIT" });
        }
    }
    async saveData() {
        const restURL = "/rest/users/" + this.state.profileData.id;
        await fetch(restURL, {
            method: "PUT",
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.profileData.id,
                username: this.state.username,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                age: this.state.age,
                email: this.state.email
            })
        }).then(response => {
            return response.json()
        })
    }

    async Logout() {
        const restURL = "/logout";
        await fetch(restURL, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json()
        })
        window.location.assign("/");
    }

    componentDidMount() {
        this.fetchData();
    }

    handleChangeFirstName(value) {
        this.setState({ firstName: value });
    }
    handleChangeLastName(value) {
        this.setState({ lastName: value });
    }
    handleChangeEmail(value) {
        this.setState({ email: value });
    }
    handleChangeAge(value) {
        this.setState({ age: value });
    }
    handleChangePassword(value) {
        this.setState({ password: value });
    }
    render() {
        return (
            <div className="MyProfile">
                <h2>My Profile</h2>
                <div className="firstName">
                    <p>First name : </p>
                    <input type="text" readOnly={this.state.readOnly} value={this.state.firstName} onChange={event => this.handleChangeFirstName(event.target.value)} className="firstName-input" />
                </div>
                <div className="lastName">
                    <p>Last name : </p>
                    <input type="text" readOnly={this.state.readOnly} value={this.state.lastName} onChange={event => this.handleChangeLastName(event.target.value)} className="lastName-input" />
                </div>
                <div className="email">
                    <p>Email : </p>
                    <input type="text" readOnly={this.state.readOnly} value={this.state.email} onChange={event => this.handleChangeEmail(event.target.value)} className="email-input" />
                </div>
                <div className="username">
                    <p>Username : </p>
                    <input type="text" readOnly value={this.state.username} className="username-input" />
                </div>
                <div className="age">
                    <p>Age : </p>
                    <input type="number" readOnly={this.state.readOnly} value={this.state.age} onChange={event => this.handleChangeAge(event.target.value)} className="age-input" />
                </div>
                <button className="edit" onClick={this.enableEdit}>{this.state.buttonText}</button>
                <button className="logout" onClick={this.Logout}>LOGOUT</button>
            </div>
        )
    }
}

export default MyProfile;