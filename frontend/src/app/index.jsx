import React from "react";
import { render } from "react-dom";
import { Router, Route, Link, hashHistory } from "react-router";

import App from "./components/App.jsx";
import NewPlayer from "./components/NewPlayer.jsx";
import Login from "./components/Login.jsx";
import LoginActions from "./actions/LoginActions.jsx";

class NotFound extends React.Component {
    render() {
        return (
            <div>
                <p1>HTTP 404: Not Found</p1>
            </div> 
        );
    }
}

function requireAuth(nextState, replace) {
    LoginActions.checkIfLoggedIn();
}

render ((
    <Router history={hashHistory}>
        <Route path="/" component={App} onEnter={requireAuth}/>
        <Route path="login" component={Login}/>
        <Route path="newplayer" component={NewPlayer}/>
        <Route path="*" component={NotFound}/>
    </Router>
), document.getElementById("root"))
