import alt from "../libs/Alt.js";

import StadiumsActions from "../actions/StadiumsActions.jsx";


class StadiumsStore {
    constructor() {
        this.state = {
            "stats": null
        }
        this.bindActions(StadiumsActions);
    }

    loadStadiumsStats (stats) {
        var s = this.state;
        s.stats = stats;
        this.setState(s);
    } 
}

export default alt.createStore(StadiumsStore);
