import alt from "../libs/Alt.js";
import TestComponentActions from "../actions/TestComponentActions.jsx";

class TestComponentStore {
    constructor() {
        this.state = {
            'content': "default"
        };
        this.bindActions(TestComponentActions);
    }

    printNew(content) {
        var s = this.state;
        s.content = content;
        this.setState(s);
    }
}

export default alt.createStore(TestComponentStore);
