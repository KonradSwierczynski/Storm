import React from "react";
import { withRouter } from "react-router";

import StatsActions from "../actions/StatsActions.jsx";
import AppActions from "../actions/AppActions.jsx";

var InputRow = React.createClass({
    render() {
        return <tr><td>{this.props.name}: </td><td><input type="text" id={this.props.name}/></td></tr>;
    }
});


class UpdateStats extends React.Component {
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
                        <InputRow name="Club name"/>
                        <InputRow name="Match date"/>
                        <InputRow name="Player name"/>
                        <InputRow name="Player surname"/>
                        <InputRow name="Goals"/>
                        <InputRow name="Reds"/>
                        <InputRow name="Yellows"/>
                        <InputRow name="Passes"/>
                        <InputRow name="Assists"/>
                        <InputRow name="Own goals"/>
                    </tbody>
                </table>
                <button onClick={() => {
                    StatsActions.updatePlayerStats(
                        {
                            'cName': this.inputVal("Club name"),
                            'date': this.inputVal("Match date"),
                            'pName': this.inputVal("Player name"),
                            'pSurname': this.inputVal("Player surname"),
                            'goals': this.inputVal("Goals"),
                            "reds": this.inputVal("Reds"),
                            "yellows": this.inputVal("Yellows"),
                            "passes": this.inputVal("Passes"),
                            "assists": this.inputVal("Assists"),
                            "owngoals": this.inputVal("Own goals")
                        }
                    );
                    AppActions.setShowUpdateStats(false);
                }}>Submit</button>
                <button onClick={() => {
                    AppActions.setShowUpdateStats(false);
                }}>Close</button>
            </div>
        );
    }
}

export default withRouter(UpdateStats);
