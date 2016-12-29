import LoginActions from "../actions/LoginActions.jsx";
import { Router, Route, Link, hashHistory } from 'react-router';

export default function logoutIfNeeded(xhr) {
    if (xhr.status === 403) {
        localStorage.setItem("loggedIn", undefined);
        hashHistory.push("login");
    }
}
