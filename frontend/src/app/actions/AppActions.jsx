import alt from "../libs/Alt.js";
import $ from 'jquery';

import logoutIfNeeded from "../libs/LogoutIfNeeded.jsx";

class AppActions {

    printNew = (content) => {
        return (dispatch) => {
            $.get("/api/")
                .done((data) => { dispatch(data); })
                .fail(logoutIfNeeded);
        };
    };

    createTable = (tableName) => {
        return (dispatch) => {
            $.post("/api/", {"tableName": tableName}, (data) => {});
        };
    };

    getPlayers = () => {
        return (dispatch) => {
            $.get("/api/allplayers")
                .done((data) => { dispatch(data); })
                .fail(logoutIfNeeded);
        };
    };

    setAddPlayer = (bool) => {
        return (dispatch) => {
            dispatch(bool);
        };
    };

    setShowPlayers = (bool) => {
        return (dispatch) => {
            dispatch(bool);
        }
    }

    newPlayer = (name, surname, dateOfBirth, nationality, playingPosition) => {
        return (dispatch) => {
            $.post("/api/addplayer", 
                {
                    "name": name,
                    "surname": surname,
                    "dateOfBirth": dateOfBirth,
                    "nationality": nationality,
                    "playingPosition": playingPosition
                })
                .done((data) => {})
                .fail((xhr) => { logoutIfNeeded(xhr); });
                
        };
    };

    newReferee = (name, surname, dateOfBirth, nationality, category) => {
        return (dispatch) => {
            $.post("/api/addreferee",
                {
                    "name": name,
                    "surname": surname,
                    "dateOfBirth": dateOfBirth,
                    "nationality": nationality,
                    "category": category
                })
                .done((data) => {})
                .fail(logoutIfNeeded);
        }
    }

    loadRefereesStats = () => {
        return (dispatch) => {
            $.get("/api/stats/referees")
                .done((referees) => {dispatch(referees); })
                .fail(logoutIfNeeded);
        }
    }

    setAddReferee = (bool) => {
        return (dispatch) => {
            dispatch(bool);
        }
    }

    setShowRefereesStats = (bool) => {
        return (dispatch) => {
            dispatch(bool);
        }
    }

    loadClubsStats = () => {
        return (dispatch) => {
            $.get("/api/stats/clubs")
                .done((clubs) => {dispatch(clubs); })
                .fail(logoutIfNeeded);
        };
    }

    setShowClubsStats = (bool) => {
        return (dispatch) => {
            dispatch(bool);
        }
    }

    setShowGetClubInfo = (bool) => {
        return (dispatch) => {
            dispatch(bool);
        }
    }

    setShowAddNewClub = (bool) => {
        return (dispatch) => {
            dispatch(bool);
        }
    }

    setShowMatches = (bool) => {
        return (dispatch) => {
            dispatch(bool);
        }
    }

    loadMatches = () => {
        return (dispatch) => {
            $.get("/api/matches")
                .done((matches) => { dispatch(matches); })
                .fail(logoutIfNeeded);
        };
    }

    setShowAddNewMatch = (bool) => {
        return (dispatch) => {
            dispatch(bool);
        }
    }

    setShowUpdateStats = (bool) => {
        return (dispatch) => {
            dispatch(bool);
        }
    }

    setShowGetLeagueStats = (bool) => {
        return (dispatch) => {
            dispatch(bool);
        }
    }
}


export default alt.createActions(AppActions);
