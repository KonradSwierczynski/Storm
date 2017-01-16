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
                <table>
                    <tbody>
                        <tr><td>Name: </td><td><input type="text" id="playerName"/></td></tr>
                        <tr><td>Surname: </td><td><input type="text" id="playerSurname"/></td></tr>
                        <tr><td>Birth date: </td><td><input type="text" id="playerDate"/></td></tr>
                        <tr><td>Nationality: </td><td><input type="text" id="playerNationality"/></td></tr>
                        <tr><td>Position: </td><td><input type="text" id="playerPosition"/></td></tr>
                    </tbody>
                </table>
                <button onClick={() => {AppActions.newPlayer(
                    document.getElementById("playerName").value,
                    document.getElementById("playerSurname").value,
                    document.getElementById("playerDate").value,
                    document.getElementById("playerNationality").value,
                    document.getElementById("playerPosition").value
                ); AppActions.setAddPlayer(false); }}>Submit</button>
                <button onClick={() => {AppActions.setAddPlayer(false); }}>Close</button>
            </div>
        );
    }
}

export default withRouter(NewPlayer);
