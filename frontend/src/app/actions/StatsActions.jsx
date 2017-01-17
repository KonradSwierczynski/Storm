import alt from "../libs/Alt.js";
import $ from "jquery";

import logoutIfNeeded from "../libs/LogoutIfNeeded.jsx";

class StatsActions {
    
    updatePlayerStats = (stats) => {
        return (dispatch) => {
            $.post("/api/stats/player", stats)
                .fail(logoutIfNeeded);
        }
    }
}

export default alt.createActions(StatsActions);
