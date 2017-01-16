import React from 'react';
import { withRouter } from 'react-router';
import AppActions from "../actions/AppActions.jsx";
import AppStore from "../stores/AppStore.jsx";

import NewPlayer from "./NewPlayer.jsx";
import AllPlayers from "./AllPlayers.jsx"
import RefereesStats from "./RefereesStats.jsx";
import ClubsStats from "./ClubsStats.jsx";
import NewReferee from "./NewReferee.jsx";

import LoginActions from "../actions/LoginActions.jsx";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = AppStore.getState();
    }

    componentDidMount() {
        AppStore.listen(this.onChange);
    }

    componentWillUnmount() {
        AppStore.unlisten(this.onChange);
    }

    onChange = (newState) => {
        this.setState(newState);
    };

    render() {
        return (
            <div>
                <div>Hello {this.state.content}!</div>
                <div id="testButton">
                <button onClick={() => {
                    AppActions.printNew("trololo");
                }}>Click Me</button>
                </div>
                <input type="text" id="textTest" defaultValue="Enter here..."/>
                <button onClick={() => {
                    AppActions.createTable(
                        document.getElementById("textTest").value
                    )
                }}>Try Me</button>
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
                </div>
            </div>
        );
    }
}

export default withRouter(App);
