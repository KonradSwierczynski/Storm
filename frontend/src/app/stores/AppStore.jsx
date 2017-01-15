import alt from "../libs/Alt.js";
import AppActions from "../actions/AppActions.jsx";

class AppStore {
    constructor() {
        this.state = {
            "content": "default",
            "add_player": false,
            "show_players": false,
            "players": ""
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
        console.log(s.players);
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
}

export default alt.createStore(AppStore);
