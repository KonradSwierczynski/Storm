import alt from "../libs/Alt.js";
import $ from "jquery";

import logoutIfNeeded from "../libs/LogoutIfNeeded.jsx";


class ClubActions {

    loadClubInfo = (clubName) => {
        return (dispatch) => {
            $.get("/api/club/" + clubName)
                .done((info) => { dispatch(info) })
                .fail(logoutIfNeeded);
        };
    }

    setInitialState = () => {
        return (dispatch) => { dispatch(); }
    }
}

export default alt.createActions(ClubActions);
