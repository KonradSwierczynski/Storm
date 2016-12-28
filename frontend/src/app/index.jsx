import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, hashHistory } from 'react-router';

import TestComponent from "./components/TestComponent.jsx";
import Login from "./components/Login.jsx";

class NotFound extends React.Component {
    render() {
        return (
            <div>
                <p1>HTTP 404: Not Found</p1>
            </div> 
        );
    }
}

render ((
    <Router history={hashHistory}>
        <Route path="/" component={TestComponent}/>
        <Route path="login" component={Login}/>
        <Route path="*" component={NotFound}/>
    </Router>
), document.getElementById('root'))
