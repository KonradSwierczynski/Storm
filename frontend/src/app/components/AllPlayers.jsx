import React from "react";
import { withRouter } from "react-router";

import AppStore from "../stores/AppStore.jsx";


class AllPlayers extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var players = AppStore.getState().players;
        console.log("PLAYERS: ", players); 
        var indents = [];
        if (players.length === 0)
            indents.push(<span className='indent' key={-1}>There are no players available<br /></span>)
        else
            indents.push(<span className='indent' key={-1}>All available players are:<br /></span>)
        for (var i = 0; i < players.length; i++) {
            indents.push(<span className='indent' key={i}>{players[i].name}, {players[i].surname}, {players[i].nationality}, {players[i].playingPosition}, {players[i].dateOfBirth}<br /></span>)
        }
        return (
            <div>
                {indents}
            </div>
        );
    }
}

export default withRouter(AllPlayers);
