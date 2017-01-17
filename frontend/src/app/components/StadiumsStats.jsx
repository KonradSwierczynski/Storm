import React from "react";
import { withRouter } from "react-router";

import AppActions from "../actions/AppActions.jsx";

var StadiumItem = React.createClass({
    render() {
        return <td>{this.props.item}</td>;
    }
});

var StadiumRow = React.createClass({
    render() {
        var p = this.props.items;
        var key = this.props.pkey;
        return (
            <tr>
                <StadiumItem key={"sName"+key} item={p[0]}/>
                <StadiumItem key={"sCity"+key} item={p[1]}/>
                <StadiumItem key={"sMatches"+key} item={p[2]}/>
            </tr>
        );
    }
});




class StadiumsStats extends React.Component {
    render() {
        var stats = this.props.stats;
        var rows = [];
        if (stats === undefined || stats === null || stats.length === 0)
            return <span><br />We have currently no info about stadiums :(</span>;
        stats = stats.stats;
        var titleRow = ["Name", "City", "Number of matches"];
        rows.push(<StadiumRow key={"stadiumTitleRow"} items={titleRow} pkey={-1}/>);
        for (var i = 0; i < stats.length; i++)
            rows.push(<StadiumRow key={"s"+i} items={stats[i]} pkey={i}/>);
        return (
            <div>
                <table>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <button onClick={() => {
                    AppActions.setShowStadiumsStats(false);
                }}>Close</button>
            </div>
        );
    }
}

export default withRouter(StadiumsStats);
