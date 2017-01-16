import React from "react";
import { withRouter } from "react-router";
import AppActions from "../actions/AppActions.jsx";


class NewReferee extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <table>
                    <tbody>
                        <tr><td>Name: </td><td><input type="text" id="refereeName"/></td></tr>
                        <tr><td>Surname: </td><td><input type="text" id="refereeSurname"/></td></tr>
                        <tr><td>Birth date: </td><td><input type="text" id="refereeDate"/></td></tr>
                        <tr><td>Nationality: </td><td><input type="text" id="refereeNationality"/></td></tr>
                        <tr><td>Category: </td><td><input type="text" id="refereeCategory"/></td></tr>
                    </tbody>
                </table>
                <button onClick={() =>{AppActions.newReferee(
                    document.getElementById("refereeName").value,
                    document.getElementById("refereeSurname").value,
                    document.getElementById("refereeDate").value,
                    document.getElementById("refereeNationality").value,
                    document.getElementById("refereeCategory").value,
                ); AppActions.setAddReferee(false); }}>Submit</button>
                <button onClick={() => {AppActions.setAddReferee(false); }}>Close</button>
            </div>
        );
    }
}

export default withRouter(NewReferee);
