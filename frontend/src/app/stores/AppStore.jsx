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
            "show_club_add": false,
            "show_referees_stats": false,
            "show_matches": false,
            "show_match_add": false,
            "show_league_stats": false,
            "show_update_stats": false,
            "players": null,
            "clubs_stats": null,
            "referees_stats": null,
            "matches": null
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

    setShowAddNewClub(bool) {
        var s = this.state;
        s.show_club_add = bool;
        this.setState(s);
    }

    setShowMatches(bool) {
        var s = this.state;
        s.show_matches = bool;
        this.setState(s);
    }

    loadMatches(matches) {
        var s = this.state;
        s.matches = matches;
        this.setState(s);
    }

    setShowAddNewMatch(bool) {
        var s = this.state;
        s.show_match_add = bool;
        this.setState(s);
    }

    setShowUpdateStats(bool) {
        var s = this.state;
        s.show_update_stats = bool;
        this.setState(s);
    }

    setShowGetLeagueStats(bool) {
        var s = this.state;
        s.show_league_stats = bool;
        this.setState(s);
    }
}

export default alt.createStore(AppStore);
