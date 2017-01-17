import React from "react";
import { withRouter } from "react-router";

import AppActions from "../actions/AppActions.jsx";
import AppStore from "../stores/AppStore.jsx";



var PlayerItem = React.createClass({
    render() {
        return <td>{this.props.item}</td>;
    }
});

var PlayerRow = React.createClass({
    render() {
        var p = this.props.items;
        var key = this.props.pkey;
        return (
            <tr>
                <PlayerItem key={"name"+key} item={p[0]}/>
                <PlayerItem key={"surname"+key} item={p[1]}/>
                <PlayerItem key={"goals"+key} item={p[2]}/>
                <PlayerItem key={"reds"+key} item={p[3]}/>
                <PlayerItem key={"yellows"+key} item={p[4]}/>
                <PlayerItem key={"assists"+key} item={p[5]}/>
            </tr>
        );
    }
});

class AllPlayers extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var players = AppStore.getState().players;
        var rows = [];
        var header = null;

        if (players === null || players.length === 0) 
            return( <span><br />There are no players available :(</span> );
        header = <span>Table of all available players:</span>;
        var titleRow = ["Name", "Surname", "Goals", "Reds", "Yellows", "Assists"]
        rows.push(<PlayerRow key={"titleRow"} items={titleRow} pkey={-1} />);
        for (var i = 0; i < players.length; i++) {
            rows.push(<PlayerRow key={"p"+i} items={players[i]} pkey={i} />);
        }
        return (
            <div>
                {header}
                <table>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <button onClick={() => { AppActions.setShowPlayers(false); }}>Close</button>
            </div>
        );
    }
}

export default withRouter(AllPlayers);
