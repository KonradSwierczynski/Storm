import alt from "../libs/Alt.js";
import $ from "jquery";

import logoutIfNeeded from "../libs/LogoutIfNeeded.jsx";


class StadiumsActions {

    loadStadiumsStats = () => {
        return (dispatch) => {
            $.get("/api/stadiums")
                .done((stats) => { dispatch(stats); })
                .fail(logoutIfNeeded);
        }
    }

}

export default alt.createActions(StadiumsActions);
