import LoginActions from "../actions/LoginActions.jsx";

export default function logoutIfNeeded(xhr) {
    if (xhr.status === 403) {
        localStorage.setItem("loggedIn", undefined);
    }
}
