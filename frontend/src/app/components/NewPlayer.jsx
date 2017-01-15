import React from "react";
import { withRouter, hashHistory } from "react-router";
import AppActions from "../actions/AppActions.jsx";

class NewPlayer extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                Name: <input type="text" id="playerName"/>
                <br />Surname: <input type="text" id="playerSurname"/>
                <br />Birth date: <input type="text" id="playerDate"/>
                <br />Nationality: <input type="text" id="playerNationality"/>
                <br />Position: <input type="text" id="playerPosition"/>
                <br /><button onClick={() => {AppActions.newPlayer(
                    document.getElementById("playerName").value,
                    document.getElementById("playerSurname").value,
                    document.getElementById("playerDate").value,
                    document.getElementById("playerNationality").value,
                    document.getElementById("playerPosition").value
                ); AppActions.setAddPlayer(false); }}>Submit</button>
            </div>
        );
    }
}

export default withRouter(NewPlayer);
