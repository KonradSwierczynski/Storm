import React from 'react';
import { withRouter } from 'react-router';
import AppActions from "../actions/AppActions.jsx";
import AppStore from "../stores/AppStore.jsx";
import NewPlayer from "./NewPlayer.jsx";
import AllPlayers from "./AllPlayers.jsx"

import LoginActions from "../actions/LoginActions.jsx";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = AppStore.getState();
    }

    componentDidMount() {
        AppStore.listen(this.onChange);
    }

    componentWillUnmount() {
        AppStore.unlisten(this.onChange);
    }

    onChange = (newState) => {
        this.setState(newState);
    };

    render() {
        return (
            <div>
                <div>Hello {this.state.content}!</div>
                <div id="testButton">
                <button onClick={() => {
                    AppActions.printNew("trololo");
                }}>Click Me</button>
                </div>
                <input type="text" id="textTest" defaultValue="Enter here..."/>
                <button onClick={() => {
                    AppActions.createTable(
                        document.getElementById("textTest").value
                    )
                }}>Try Me</button>
                <button onClick={() => {
                    LoginActions.logout();    
                }}>Logout</button>
                <div>
                    <button onClick={ () => { AppActions.setAddPlayer(true); }}>AddPlayer</button>
                    { this.state.add_player && <NewPlayer /> }
                </div>
                <div>
                    <button onClick={() => {
                        AppActions.getPlayers();
                        AppActions.setShowPlayers(true);
                    }}>Show all players</button>
                    { this.state.show_players && <AllPlayers /> }
                </div>
            </div>
        );
    }
}

export default withRouter(App);
