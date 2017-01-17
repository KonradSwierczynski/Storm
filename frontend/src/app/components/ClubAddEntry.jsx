import React from "react";
import { withRouter } from "react-router";

import AppActions from "../actions/AppActions.jsx";
import ClubActions from "../actions/ClubActions.jsx";

var InputRow = React.createClass({
    render() {
        return <tr><td>{this.props.name}: </td><td><input type="text" id={"clubInput"+this.props.name}/></td></tr>;
    }
});

class ClubAddEntry extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <table>
                    <tbody>
                        <InputRow name="Name"/>
                        <InputRow name="League"/>
                        <InputRow name="Foundation year"/>
                        <InputRow name="City"/>
                        <InputRow name="Budget"/>
                    </tbody>
                </table>
                <button onClick={() => {ClubActions.addNewClub(
                    document.getElementById("clubInputName").value,
                    document.getElementById("clubInputLeague").value,
                    document.getElementById("clubInputFoundation year").value,
                    document.getElementById("clubInputCity").value,
                    document.getElementById("clubInputBudget").value
                ); }}>Submit</button>
                <button onClick={() => {AppActions.setShowAddNewClub(false); }}>Close</button>
            </div>
        );
    }

}

export default withRouter(ClubAddEntry);
