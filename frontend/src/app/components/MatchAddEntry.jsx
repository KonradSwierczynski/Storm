import React from "react";
import { withRouter } from "react-router";

import MatchActions from "../actions/MatchActions.jsx";
import AppActions from "../actions/AppActions.jsx";

var InputRow = React.createClass({
    render() {
        return <tr><td>{this.props.name}: </td><td><input type="text" id={this.props.name}/></td></tr>;
    }
});

class MatchAddEntry extends React.Component {
    constructor(props) {
        super(props);
    }

    inputVal = (name) => {
        return document.getElementById(name).value;
    }

    render() {
        return (
            <div>
                <table>
                    <tbody>
                        <InputRow name="First club name"/>
                        <InputRow name="Second club name"/>
                        <InputRow name="Season year"/>
                        <InputRow name="Round"/>
                        <InputRow name="Referee name"/>
                        <InputRow name="Referee surname"/>
                        <InputRow name="Stadium name"/>
                        <InputRow name="Date"/>
                    </tbody>
                </table>
                <button onClick={() => {
                    MatchActions.addNewMatch(
                        {
                            'club1': this.inputVal("First club name"),
                            'club2': this.inputVal("Second club name"),
                            'seasonYear': this.inputVal("Season year"),
                            'round': this.inputVal("Round"),
                            'refereeName': this.inputVal("Referee name"),
                            'refereeSurname': this.inputVal("Referee surname"),
                            'stadium': this.inputVal("Stadium name"),
                            'date': this.inputVal("Date")
                        }
                    );
                    AppActions.setShowAddNewMatch(false);
                }}>Submit</button>
                <button onClick={() => { 
                    AppActions.setShowAddNewMatch(false) }}>Close</button>
            </div>
        );
    }
}

export default withRouter(MatchAddEntry);
