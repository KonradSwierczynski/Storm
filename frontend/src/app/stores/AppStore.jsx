import alt from "../libs/Alt.js";
import AppActions from "../actions/AppActions.jsx";

class AppStore {
    constructor() {
        this.state = {
            "content": "default",
            "add_player": false,
            "show_players": false,
            "show_referees_stats": false,
            "players": "",
            "referees_stats": null
        };
        this.bindActions(AppActions);
    }

    printNew(content) {
        var s = this.state;
        s.content = content;
        this.setState(s);
    }

    getPlayers(players) {
        var s = this.state;
        s.players = players;
        this.setState(s);
    }

    setAddPlayer(bool) {
        var s = this.state;
        s.add_player = bool;
        this.setState(s);
    }


    setShowPlayers(bool) {
        var s = this.state;
        s.show_players = bool;
        this.setState(s);
    }

    loadRefereesStats(referees) {
        var s = this.state;
        s.referees_stats = referees;
        this.setState(s);
    }

    setShowRefereesStats(bool) {
        var s = this.state;
        s.show_referees_stats = bool;
        this.setState(s);
    }
}

export default alt.createStore(AppStore);
