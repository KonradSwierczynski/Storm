import React from "react";
import { withRouter } from "react-router";

import AppActions from "../actions/AppActions.jsx";
import AppStore from "../stores/AppStore.jsx";

var RefereeItem = React.createClass({
    render() {
        return <td>{this.props.item}</td>;
    }
});

var RefereeRow = React.createClass({
    render() {
        var p = this.props.items;
        var key = this.props.pkey;
        return (
            <tr>
                <RefereeItem key={"name"+key} item={p[0]}/>
                <RefereeItem key={"surname"+key} item={p[1]}/>
                <RefereeItem key={"matches"+key} item={p[2]}/>
            </tr>
        );
    }
});

class RefereesStats extends React.Component {
    constructor(props) { 
        super(props);
    }

    render() {
        var referees = AppStore.getState().referees_stats;
        if (referees === null)
            return null;
        var rows = [];
        var header = null;

        if (referees.length === 0)
            return ( <span><br />We have no info about any of the referees :(</span> );
        else header = <span>Referees statistics:</span>;
        var titleRow = ["Name", "Surname", "No. matches"];
        rows.push(<RefereeRow key={"refTitleRow"} items={titleRow} pkey={-1} />);
        for (var i = 0; i < referees.length; i++)
            rows.push(<RefereeRow key={"r"+i} items={referees[i]} pkey={i} />);
        return (
            <div>
                <table>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <button onClick={() => { AppActions.setShowRefereesStats(false); }}>Close</button>
            </div>
        );
    }
}

export default withRouter(RefereesStats);
