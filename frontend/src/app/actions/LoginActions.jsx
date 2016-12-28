import alt from "../libs/Alt.js";
import $ from "jquery";

class LoginActions {
    
    validateCredentials = (login, pass) => {
        return (dispatch) => {
            $.post("/api/login", () => {});
        }
    }
}

export default alt.createActions(LoginActions);
