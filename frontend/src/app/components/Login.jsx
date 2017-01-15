import React from 'react';
import LoginStore from "../stores/LoginStore.jsx";
import LoginActions from "../actions/LoginActions.jsx";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = LoginStore.getState();
    };
    
    componentDidMount() {
        LoginStore.listen(this.onChange);
    };

    componentWillUnmount() {
        LoginStore.unlisten(this.onChange);
    };

    onChange = (newState) => {
        this.setState(newState);
    };

    login = () => {
        LoginActions.login(
            document.getElementById("loginField").value,
            document.getElementById("passwordField").value
        )
    }

    render() {
        return (
            <div onKeyDown={(e) => {
                if (e.key == "Enter")
                    this.login();
            }}>
                <input type="text" id="loginField"/>
                <input type="password" id="passwordField" />
                <button onClick={ this.login }>Login</button>
            </div>
        );
    }
}


export default Login;
