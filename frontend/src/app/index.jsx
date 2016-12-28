import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import TestComponent from "./components/TestComponent.jsx";

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
    <Router history={browserHistory}>
        <Route path="/" component={TestComponent}>
            <Route path="*" component={NotFound}/>
        </Route>
    </Router>
), document.getElementById('root'))
