import { hashHistory } from 'react-router';
import sha1 from 'sha1';
import alt from "../libs/Alt.js";
import $ from 'jquery';

class LoginActions {
    
    login = (username, password) => {
        return (dispatch) => {
            $.post("/api/login", {'username': username, 'password': sha1(password)})
                .done((data) => {
                    localStorage.setItem("loggedIn", true); 
                    hashHistory.push("/");
                })
                .fail((xhr) => { console.log(xhr); });
        }
    };

    checkIfLoggedIn = () => {
        return (dispatch) => {
            $.get("/api/check")
                .done((data) => {
                    if (data === true)
                        localStorage.setItem("loggedIn", true);
                    else
                        localStorage.setItem("loggedIn", undefined);
                });
        }
    }

    logout = () => {
        return (dispatch) => {
            $.post("/api/logout")
                .done(() => { 
                    localStorage.setItem("loggedIn", undefined);
                    hashHistory.push("login");
                });
        }   
    };
}

export default alt.createActions(LoginActions);
