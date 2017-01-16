import React from "react";
import { withRouter } from "react-router";

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
                <PlayerItem key={"name"+key} item={p.name}/>
                <PlayerItem key={"surname"+key} item={p.surname}/>
                <PlayerItem key={"nationality"+key} item={p.nationality}/>
                <PlayerItem key={"playingPosition"+key} item={p.playingPosition}/>
                <PlayerItem key={"dateOfBirth"+key} item={p.dateOfBirth}/>
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

        if (players.length === 0) 
            return( <span><br />There are no players available :(</span> );
        else header = <span>Table of all available players:</span>;
        var titleRow = {
            "name": "Name",
            "surname": "Surname",
            "nationality": "Nationality",
            "playingPosition": "Position",
            "dateOfBirth": "Birth date"
        }
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
            </div>
        );
    }
}

export default withRouter(AllPlayers);
