/******************************************************
 **********************LOGIN PAGE***********************
 ******************************************************/
var rootURL_clientProfile = rootURL_clientProfile || "http://localhost:8080/JobTracker/api/v1/clientProfiles";
var rootURL_users = rootURL_users || "http://localhost:8080/JobTracker/api/v1/users";
var rootURL_authorities = rootURL_authorities || "http://localhost:8080/JobTracker/api/v1/authorities";

var storage = (typeof (Storage) !== "undefined") ? true : false;

function checkForLoggedInUser() {
    if (localStorage.user !== "undefined") {
        loginUser(localStorage.user);
    }
}

function login(name) {
    REST.method.findRecord(rootURL_users, name);
    showMainLogin($('#createNewAccount'));
}

function makeNewUser() {
    var newUser = [$('#loginInput').val(), $('#PasswordConfirmInput').val(), 1];
    REST.method.addRecord(rootURL_users, newUser);
    setTimeout(function () {
        login($('#loginInput').val());
    }, 500);
}

function checkForUserLogin(data) {
    lOGINFORM.clearInputs();
    var userFound = (data) ? true : false;
    if (userFound) {
        if (storage) {
            localStorage.user = data.username;
        }
        loginUser(localStorage.user);
    } else {
        userNotFound();
    }
}

function loginUser(user) {
    buildHeaderLoginName(user);
}

function routeLoginForm(e) {
    switch ($(e).val()) {
        case "Login":
            login($('#loginInput').val());
            break;
        case "Create New User":
            makeNewUser();
            break;
        case "Send Info":
            alert('sending info');
            break;
        default:
            alert("unknown - loginform submit click");
    }
}


var lOGINFORM = {
    clearInputs: function () {
        $('.loginInput').val("");
    }
};

