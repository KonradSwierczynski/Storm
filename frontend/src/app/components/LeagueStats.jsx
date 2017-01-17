import React from "react";
import { withRouter } from "react-router";


import AppActions from "../actions/AppActions.jsx";
import LeagueActions from "../actions/LeagueActions.jsx";

import LeagueStore from "../stores/LeagueStore.jsx";

var LeagueItem = React.createClass({
    render() {
        return <td>{this.props.item}</td>;
    }
});

var LeagueRow = React.createClass({
    render() {
        var p = this.props.items;
        var key = this.props.pkey;
        return (
            <tr>
                <LeagueItem key={"name"+key} item={p[0]}/>
                <LeagueItem key={"city"+key} item={p[1]}/>
                <LeagueItem key={"budget"+key} item={p[2]}/>
                <LeagueItem key={"goals"+key} item={p[4]}/>
                <LeagueItem key={"reds"+key} item={p[5]}/>
                <LeagueItem key={"yellows"+key} item={p[6]}/>
            </tr>
        );
    }
});



class LeagueStats extends React.Component {
    constructor(props) {
        super(props);
        this.state = LeagueStore.getState();
    }

    componentDidMount() {
        LeagueStore.listen(this.onChange);
    }

    componentWillUnmount() {
        LeagueStore.unlisten(this.onChange);
    }

    onChange = (newState) => {
        this.setState(newState);
    }

    render() {
        var stats = this.state.stats;
        var rows = [];
        var titleRow = ["Club name", "City", "Budget", "League", "Goals", "Reds", "Yellows"];
        rows.push(<LeagueRow key={"leagueTitle"} items={titleRow} pkey={-1} />);
        if (stats !== null)
            for (var i = 0; i < stats.length; i++)
                rows.push(<LeagueRow key={"l"+i} items={stats[i]} pkey={i} />);
        return (
            <div>
                League name: <input type="text" id={"lName"} />
                <button onClick={() => {
                    LeagueActions.loadLeagueStats(
                        document.getElementById('lName').value
                );
                }}>Submit</button>
                <button onClick={() => { 
                    AppActions.setShowGetLeagueStats(false); }}>Close</button>
                { stats !== null && stats.length !== 0 &&
                    (
                        <table>
                            <tbody>
                                {rows}
                            </tbody>
                        </table>
                    )    
                }
                { stats !== null && stats.length === 0 &&
                    (
                        <span><br />We do not have any info about any league with this name</span>
                    )
                }
            </div>
        );
    }
}

export default withRouter(LeagueStats);

