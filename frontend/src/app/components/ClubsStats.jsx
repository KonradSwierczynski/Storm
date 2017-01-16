import React from "react";
import { withRouter } from "react-router";

import AppActions from "../actions/AppActions.jsx";


var ClubItem = React.createClass({
    render() {
        return <td>{this.props.item}</td>;
    }
});

var ClubRow = React.createClass({
    render() {
        var p = this.props.items;
        var key = this.props.pkey;
        return (
            <tr>
                <ClubItem key={"name"+key} item={p[0]}/>
                <ClubItem key={"surname"+key} item={p[1]}/>
                <ClubItem key={"matches"+key} item={p[2]}/>
            </tr>
        );
    }
});


class ClubsStats extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var clubs = this.props.clubs;
        if (clubs === null)
            return null;
        var rows = [];
        var header = null;

        if (clubs.length === 0)
            return ( <span><br />We have no info about any of the clubs :(</span>  );
        else header = <span>Clubs statistics:</span>
        var titleRow = ["Name", "Goals", "Red cards", "Yellow cards"];
        rows.push(<ClubRow key={"clubTitleRow"} items={titleRow} pkey={-1} />);
        for (var i = 0; i < clubs.length; i++)
            rows.push(<ClubRow key={"c"+i} items={clubs[i]} pkey={i} />);
        return (
            <div>
                {header}
                <table>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <button onClick={() => { AppActions.setShowClubsStats(false); }}>Close</button>
            </div>
        );
    }
}

export default withRouter(ClubsStats);
