import '../styles/Login.css';
import React, { Component } from "react";

class Login extends Component {


    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
        this.sendLogin = this.sendLogin.bind(this);
    }

    componentDidMount() {
    }

    async sendLogin(e) {
        e.preventDefault();
        const restURL = "/login_form?username="
            + this.state.username
            + "&password="
            + this.state.password;
        await fetch(restURL, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            }
        }).then(response => {
            if (response.status !== 202) {
                window.alert("Credentials dont match")
                window.location.reload(false);
            }
            else {
                window.location.assign("/");

            }
        })
    }

    handleChangePass(value) {
        this.setState({ password: value });
    }
    handleChangeUsername(value) {
        this.setState({ username: value });
    }
    render() {
        return (
            <div className="Login">
                <h2>Login</h2>
                <form onSubmit={e => this.sendLogin(e)}>
                    <div className="username">
                        <p>Username : </p>
                        <input type="text" value={this.state.username} className="username-input" onChange={event => this.handleChangeUsername(event.target.value)} />
                    </div>
                    <div className="password">
                        <p>Password : </p>
                        <input type="password" value={this.state.password} className="password-input" onChange={event => this.handleChangePass(event.target.value)} />
                    </div>

                    <button type="submit" className="login-button" >Login</button>
                </form>

            </div>
        )
    }
}

export default Login;