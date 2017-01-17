import React from "react";
import { withRouter } from "react-router";

import AppActions from "../actions/AppActions.jsx";

import ClubActions from "../actions/ClubActions.jsx";
import ClubStore from "../stores/ClubStore.jsx";

var InfoItem = React.createClass({
    render() {
        return <td>{this.props.item}</td>
    }
});

var InfoRow = React.createClass({
    render() {
        var item = this.props.item;
        var items = [];
        for (var i = 0; i < item.length; i++)
            items.push(<InfoItem key={"cl"+i} item={item[i]}/>)
        return (
            <tr>{items}</tr>
        );
    }
});


class SingleClubInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = ClubStore.getState();
    }

    setInitialState() {
        ClubActions.setInitialState();
    }

    componentDidMount() {
        ClubStore.listen(this.onChange);
    }

    componentWillUnmount() {
        ClubStore.unlisten(this.onChange);
    }

    onChange = (newState) => {
        this.setState(newState);
    }

    render() {
        return (
            <div>
                Club name: <input type="text" id="clubInfoName"/>
                <button onClick={() => { ClubActions.loadClubInfo(
                    document.getElementById("clubInfoName").value
                ); }}>Submit</button>
                <button onClick={() => { AppActions.setShowGetClubInfo(false); this.setInitialState()}}>Close</button>
                { this.state.info !== null && this.state.info.length !== 0 && 
                    (
                        <div>
                            <table>
                                <tbody>
                                    <InfoRow item={["Name", "City", "Budget", "Goals", "Red cards", "Yellow cards"]} />
                                    <InfoRow item={this.state.info.info}/>
                                </tbody>
                            </table>
                            { this.state.info.players.length !== 0 ? (
                                <div>
                                    <span><br />Players in this club are</span>
                                    <table>
                                        <tbody>
                                            { this.state.info.players.map((player, index) => {
                                                return <tr key={"cp"+index}><td>{player[0]}</td><td>{player[1]}</td></tr>;
                                            })}                                     
                                        </tbody>
                                    </table>
                                </div>
                            ) : 
                            (
                                <span><br />There are no players in this club</span>
                            )}
                        </div>
                    )
                }
                { this.state.info !== null && this.state.info.length === 0 &&
                    (
                        <span><br />We do not have any info about any club with this name</span>
                    )
                }
            </div>
        );
    }
}

export default withRouter(SingleClubInfo);
