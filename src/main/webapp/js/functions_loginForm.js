/******************************************************
 **********************LOGIN PAGE***********************
 ******************************************************/
var rootURL_clientProfile = rootURL_clientProfile || "http://localhost:8080/JobTracker/api/v1/clientProfiles";
var rootURL_users = rootURL_users || "http://localhost:8080/JobTracker/api/v1/users";
var rootURL_authorities = rootURL_authorities || "http://localhost:8080/JobTracker/api/v1/authorities";

var storage = (typeof (Storage) !== "undefined") ? true : false;
var LOGIN = LOGIN || {};
LOGIN = {
    login: function (name) {
        login(name);
    },
    addUser: function () {
        makeNewUser();
    },
    checkIfUserIsLoggedIn: function () {
        return (localStorage.user !== "undefined") ? true : false;
    },
    clearInputs: function () {
        $('.loginInput').val("");
    }
};

function checkForLoggedInUser() {
    if (LOGIN.checkIfUserIsLoggedIn()) {
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
    var dataFound = (typeof data !== "undefined") ? true : false;
    var len = 0;
    if (dataFound) {
        $.each(data, function (key, val) {
            if (isNaN(key)) {
                return false;
            }
            if (len > 0) {
                return false;
            }
            len++;
        });
        LOGIN.clearInputs();
        var userFound = (len < 1) ? true : false;
        if (userFound) {
            if (storage) {
                localStorage.user = data.username;
            }
            loginUser(localStorage.user);
        } else {
            userNotFound();
        }
    } else {
        userNotFound();
    }
}

function loginUser(user) {
    clearInput();
    clearClientList();
    addLoadingImage();
    REST.method.findAll(rootURL_clientProfile + "/clients/" + user);
    WORKLOG.getWorkEntries(user);
    buildHeaderLoginName(user);
}

function routeLoginForm(e) {
    switch ($(e).val()) {
        case "Login":
            LOGIN.login($('#loginInput').val());
            break;
        case "Create New User":
            LOGIN.addUser()
            break;
        case "Send Info":
            alert('sending info');
            break;
        default:
            alert("unknown - loginform submit click");
    }
}
//
//
//var lOGINFORM = {
//    clearInputs: function () {
//        $('.loginInput').val("");
//    }
//};

function buildHeaderLoginName(user) {
    var inx = user.indexOf('@');
    if (inx !== -1) {
        user = user.substring(0, inx);
    }
    if (user === "undefined") {
        $('#headerOptionThree').text("Login");
    } else {
        $('#headerOptionThree').text(user);
    }
}

function userNotFound() {
    $('#headerOptionThree').text("Login");
    localStorage.user = "undefined";
    alert('User Not found');
}