import alt from "../libs/Alt.js";
import $ from "jquery";


import logoutIfNeeded from "../libs/LogoutIfNeeded.jsx";

class MatchActions {

    addNewMatch = (match) => {
        return (dispatch) => {
            $.post("/api/matches/add", match)
                .fail(logoutIfNeeded);
        }
    }
}

export default alt.createActions(MatchActions);


