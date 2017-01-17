import alt from "../libs/Alt.js";
import LeagueActions from "../actions/LeagueActions.jsx";


class LeagueStore {
    constructor() {
        this.state = {
            'stats': null;
        }
        this.bindActions(LeagueActions);
    }

    loadLeagueStats(stats) {
        var s = this.state;
        v.stats = stats;
        this.setState(s);
    }
}

export default alt.createStore(LeagueStore);
