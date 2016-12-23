import alt from "../libs/Alt.js";
import $ from 'jquery';

class TestComponentActions {

    printNew = (content) => {
        return (dispatch) => {
            $.get("/api/", (data) => {
                dispatch(data);
            });
        }    
    };

    createTable = (tableName) => {
        return (dispatch) => {
            $.post("/api/", {"tableName": tableName}, (data) => {
            });
        };
    };
}


export default alt.createActions(TestComponentActions);
