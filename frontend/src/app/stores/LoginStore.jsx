import alt from "../libs/Alt.js";
import LoginActions from "../actions/LoginActions.jsx";

class LoginStore {
    constructor() {
        this.state = {}
        this.bindActions(LoginActions);
    }

    validateCredentials() {

    }
}

export default alt.createStore(LoginStore);
