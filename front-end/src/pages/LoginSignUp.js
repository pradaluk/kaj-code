
import { Component } from "react";
import SignUp from '../components/SingUp';
import Login from '../components/Login';

class LoginSingUp extends Component {
    render() {
        return (
            <div>
                <Login />
                <SignUp />
            </div>
        )

    }

}

export default LoginSingUp;