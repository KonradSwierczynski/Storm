import alt from "../libs/Alt.js";
import $ from "jquery";

import logoutIfNeeded from "../libs/LogoutIfNeeded.jsx";

class LeagueActions {

    loadLeagueStats = (leagueName) => {
        return (dispatch) =>  {
            $.get("/api/league/" + leagueName) 
                .done((stats) => dispatch(stats))
                .fail(logoutIfNeeded);
        }
    }
}

export default alt.createActions(LeagueActions);
