import alt from "../libs/Alt.js";
import AppActions from "../actions/AppActions.jsx";

class AppStore {
    constructor() {
        this.state = {
            'content': "default"
        };
        this.bindActions(AppActions);
    }

    printNew(content) {
        var s = this.state;
        s.content = content;
        this.setState(s);
    }
}

export default alt.createStore(AppStore);
