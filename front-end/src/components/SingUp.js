import '../styles/SingUp.css';
import React, { Component } from "react";

class SignUp extends Component {


    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            age: 0,
            email: '',
            firstName: '',
            lastName: '',
            role: 'GUEST'
        }
        this.sendSignUp = this.sendSignUp.bind(this);
    }

    componentDidMount() {
    }
    validateInputs() {
        //todo
    }
    async sendSignUp(e) {
        e.preventDefault();
        this.validateInputs();
        const restURL = "/rest/users";
        await fetch(restURL, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                age: this.state.age,
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
                role: this.state.role
            })
        }).then(response => {
            if (response.status === 201) {
                window.alert("User registered");
            }
        })
    }

    handleChangePass(value) {
        this.setState({ password: value });
    }
    handleChangeUsername(value) {
        this.setState({ username: value });
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
    handleChangeRole(value) {
        this.setState({ role: value });
    }
    render() {
        return (
            <div className="SignUp">
                <h2>Register</h2>
                <form onSubmit={e => this.sendSignUp(e)}>
                    <div className="firstName">
                        <p>First name : </p>
                        <input type="text" placeholder='First name' value={this.state.firstName} className="firstName-input"
                            onChange={event => this.handleChangeFirstName(event.target.value)} autofocus required />
                    </div>
                    <div className="lastName">
                        <p>Last name : </p>
                        <input type="text" placeholder='Last name' value={this.state.lastName} className="lastName-input"
                            onChange={event => this.handleChangeLastName(event.target.value)} required />
                    </div>
                    <div className="email">
                        <p>Email : </p>
                        <input type="email" placeholder='email@mail.com' className="email-input"
                            onChange={event => this.handleChangeEmail(event.target.value)} required />
                    </div>
                    <div className="age">
                        <p>Age : </p>
                        <input type="number" value={this.state.age} className="age-input"
                            onChange={event => this.handleChangeAge(event.target.value)} required />
                    </div>
                    <div className="username">
                        <p>Username : </p>
                        <input type="text" placeholder='username' value={this.state.username} className="username-input"
                            onChange={event => this.handleChangeUsername(event.target.value)} required />
                    </div>
                    <div className="password">
                        <p>Password : </p>
                        <input type="password" value={this.state.password} className="password-input"
                            onChange={event => this.handleChangePass(event.target.value)} required />
                    </div>
                    <div className="role">
                        Role :
                        <select name="role-select" className="role-select"
                            onChange={event => this.handleChangeRole(event.target.value)}>
                            <option value="GUEST">GUEST</option>
                            <option value="ORGANIZER">ORGANIZER</option>
                            <option value="DRIVER">DRIVER</option>
                        </select>
                    </div>
                    <button type='sumbit' className="SignUp-button">Sing Up</button>
                </form>
            </div>
        )
    }
}

export default SignUp;