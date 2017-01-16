import alt from "../libs/Alt.js";
import ClubActions from "../actions/ClubActions.jsx";

class ClubStore {
    constructor() {
        this.state = {
            "info": null
        };
        this.bindActions(ClubActions);
    }

    loadClubInfo (info) {
        var s = this.state;
        s.info = info;
        this.setState(s);
    }

    setInitialState() {
        this.setState({"info": null});
    }
}

export default alt.createStore(ClubStore);
