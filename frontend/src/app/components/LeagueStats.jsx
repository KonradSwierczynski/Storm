import React from "react";
import { withRouter } from "react-router";


import AppActions from "../actions/AppActions.jsx";
import LeagueActions from "../actions/LeagueActions.jsx";


class LeagueStats extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                League name: <input type="text" id={"lName"} />
                <button onClick={() => {
                    LeagueActions.loadLeagueStats(
                        document.getElementById('lName').value
                );
                    AppActions.setShowGetLeagueStats(false);
                }}>Submit</button>
                <button onClick={() => { 
                    AppActions.setShowGetLeagueStats(false); }}>Close</button>
            </div>
        );
    }
}

export default withRouter(LeagueStats);

