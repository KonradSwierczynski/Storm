import alt from "../libs/Alt.js";
import $ from "jquery";

class LoginActions {
    
    validateCredentials = (username, password) => {
        return (dispatch) => {
            $.post("/api/login", {'username': username, 'password': password})
                .done((data) => { localStorage.setItem("loggedIn", true); })
                .fail((xhr) => { console.log(xhr); });
        }
    };

    logout = () => {
        return (dispatch) => {
            $.post("/api/logout")
                .done(() => { localStorage.setItem("loggedIn", undefined) });
        }   
    };
}

export default alt.createActions(LoginActions);
