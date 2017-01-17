import React from 'react';
import { withRouter } from 'react-router';
import AppActions from "../actions/AppActions.jsx";
import AppStore from "../stores/AppStore.jsx";

import NewPlayer from "./NewPlayer.jsx";
import AllPlayers from "./AllPlayers.jsx"
import RefereesStats from "./RefereesStats.jsx";
import ClubsStats from "./ClubsStats.jsx";
import ClubAddEntry from "./ClubAddEntry.jsx";
import NewReferee from "./NewReferee.jsx";
import SingleClubInfo from "./SingleClubInfo.jsx";

import MatchesList from "./MatchesList.jsx";
import MatchAddEntry from "./MatchAddEntry.jsx";
import UpdateStats from "./UpdateStats.jsx";

import LeagueStats from "./LeagueStats.jsx";

import StadiumsStats from "./StadiumsStats.jsx";
import StadiumsActions from "../actions/StadiumsActions.jsx";
import StadiumsStore from "../stores/StadiumsStore.jsx";

import LoginActions from "../actions/LoginActions.jsx";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = AppStore.getState();
    }

    componentDidMount() {
        AppStore.listen(this.onChange);
        StadiumsStore.listen(this.stadiumChange);
    }

    componentWillUnmount() {
        AppStore.unlisten(this.onChange);
        StadiumsStore.unlisten(this.stadiumChange);
    }

    onChange = (newState) => {
        this.setState(newState);
    };

    stadiumChange = (newStadiums) => {
        var s = this.state;
        s.stadiums = newStadiums;
        this.setState(s);
    }

    render() {
        return (
            <div>
                <button onClick={() => {
                    LoginActions.logout();    
                }}>Logout</button>
                <h2>Players</h2>
                <div>
                    <button onClick={ () => { AppActions.setAddPlayer(true); }}>Add Player</button>
                    { this.state.add_player && <NewPlayer /> }
                </div>
                <div>
                    <button onClick={() => {
                        AppActions.getPlayers();
                        AppActions.setShowPlayers(true);
                    }}>Show all players</button>
                    { this.state.show_players && <AllPlayers /> }
                </div>

                <h2>Referees</h2>
                <div>
                    <button onClick={() => { AppActions.setAddReferee(true); }}>Add Referee</button>
                    { this.state.add_referee && <NewReferee /> }
                </div>
                <div>
                    <button onClick={() => {
                        AppActions.loadRefereesStats();
                        AppActions.setShowRefereesStats(true);
                    }}>Show referees stats</button>
                    { this.state.show_referees_stats && <RefereesStats /> }
                </div>

                <h2>Clubs</h2>
                <div>
                    <button onClick={() => {
                        AppActions.loadClubsStats();
                        AppActions.setShowClubsStats(true);
                    }}>Show clubs stats</button>
                    { this.state.show_clubs_stats && <ClubsStats clubs={this.state.clubs_stats} /> }
                </div>
                <div>
                    <button onClick={() => {
                        AppActions.setShowGetClubInfo(true);
                    }}>Show single club info</button>
                    { this.state.show_club_info && <SingleClubInfo /> }
                </div>
                <div>
                    <button onClick={() => {
                        AppActions.setShowAddNewClub(true);
                    }}>Add new club</button>
                    { this.state.show_club_add && <ClubAddEntry /> }
                </div>
                { /* ************************* MATCHES ************************** */ }
                <h2>Matches</h2>
                <div>
                    <button onClick={() => {
                        AppActions.loadMatches();
                        AppActions.setShowMatches(true);
                    }}>Show matches</button>
                    { this.state.show_matches && <MatchesList matches={this.state.matches}/> }
                </div>
                <div>
                    <button onClick={() => {
                        AppActions.setShowAddNewMatch(true);
                    }}>Add new match</button>
                    { this.state.show_match_add && <MatchAddEntry /> }
                </div>
                <div>
                    <button onClick={() => {
                        AppActions.setShowUpdateStats(true);
                    }}>Update players stats</button>
                    { this.state.show_update_stats && <UpdateStats /> }
                </div>

                { /* ************************** LEAGUES *************************** */ }
                <h2>Leagues</h2>
                <div>
                    <button onClick={() => {
                        AppActions.setShowGetLeagueStats(true);
                    }}>Show league stats</button>
                    { this.state.show_league_stats && <LeagueStats /> }
                </div>

                { /* ********************** STADIUMS *****************************/ }
                <h2>Stadiums</h2>
                <div>
                    <button onClick={() => {
                        StadiumsActions.loadStadiumsStats();
                        AppActions.setShowStadiumsStats(true);
                    }}>Show stadiums stats</button>
                    { this.state.show_stadiums_stats && <StadiumsStats stats={this.state.stadiums} /> }
                </div>
            </div>
        );
    }
}

export default withRouter(App);
