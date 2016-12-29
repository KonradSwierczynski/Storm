import alt from "../libs/Alt.js";
import $ from 'jquery';

import logoutIfNeeded from "../libs/LogoutIfNeeded.jsx";

class AppActions {

    printNew = (content) => {
        return (dispatch) => {
            $.get("/api/")
                .done((data) => { dispatch(data); })
                .fail((xhr) => { logoutIfNeeded(xhr); });
        };
    };

    createTable = (tableName) => {
        return (dispatch) => {
            $.post("/api/", {"tableName": tableName}, (data) => {});
        };
    };
}


export default alt.createActions(AppActions);
