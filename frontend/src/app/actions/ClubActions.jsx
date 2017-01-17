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

    addNewClub = (name, league, fYear, city, budget) => {
        return (dispatch) => {
            $.post("/api/add/club", {
                "name": name,
                "league": league,
                "foundation": fYear,
                "city": city,
                "budget": budget
            })
            .fail(logoutIfNeeded);
        }
    }
}

export default alt.createActions(ClubActions);
