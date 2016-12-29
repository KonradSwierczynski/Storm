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

    render() {
        return (
            <div>
                <input type="text" id="loginField"/>
                <input type="text" id="passwordField"/>
                <button onClick={() => {
                    LoginActions.login(
                        document.getElementById("loginField").value,
                        document.getElementById("passwordField").value
                    )
                }}>Login</button>
            </div>
        );
    }
}


export default Login;
