import alt from "../libs/Alt.js";
import AppActions from "../actions/AppActions.jsx";

class AppStore {
    constructor() {
        this.state = {
            "content": "default",
            "add_player": false,
            "add_referee": false,
            "show_players": false,
            "show_clubs_stats": false,
            "show_club_info": false,
            "show_referees_stats": false,
            "players": null,
            "clubs_stats": null,
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

    setAddReferee(bool) {
        var s = this.state;
        s.add_referee = bool;
        this.setState(s);
    }


    setShowPlayers(bool) {
        var s = this.state;
        s.show_players = bool;
        this.setState(s);
    }

    loadClubsStats(clubs) {
        var s = this.state;
        s.clubs_stats = clubs;
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

    setShowClubsStats(bool) {
        var s = this.state;
        s.show_clubs_stats = bool;
        this.setState(s);
    }

    setShowGetClubInfo(bool) {
        var s = this.state;
        s.show_club_info = bool;
        this.setState(s);
    }
}

export default alt.createStore(AppStore);
