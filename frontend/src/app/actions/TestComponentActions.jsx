import alt from "../libs/Alt.js";
import $ from 'jquery';

class TestComponentActions {

    printNew = (content) => {
        return (dispatch) => {
            $.get("/api", (data) => {
                dispatch(data)
            });
        }    
    };
}


export default alt.createActions(TestComponentActions);
