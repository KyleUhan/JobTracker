/******************************************************
 **********************LOGIN PAGE**********************
 ******************************************************
 *******************Handles Login form*****************/
var createUserSwitch = true;
LOGIN = {
    login: function (name) {
        login(name);
    },
    addUser: function () {
        makeNewUser();
    },
    isLoggedIn: function () {
        checkForLoggedInUser();
    },
    checkIfUserIsLoggedIn: function () {
        return (localStorage.user !== "undefined") ? true : false;
    },
    clearInputs: function () {
        $loginInput.val("");
    },
    selectLogin: function (e) {
        showSelectedLoginForm(e);
    },
    validate: function (sender) {
        if (validateLogin()) {
            routeLoginForm(sender);
        }
    },
    isValidUser: function (data) {
        checkForUserLogin(data);
    }
};

function checkForLoggedInUser() {
    if (LOGIN.checkIfUserIsLoggedIn()) {
        loginUser(localStorage.user);
    }
}

function login(name) {
    REST.method.findRecord(rootURL_users, name);
    showMainLogin($createNewAccount);
}

function makeNewUser() {
    var newUser = [$loginInput_id.val(), $PasswordConfirmInput.val(), 1];
    REST.method.addRecord(rootURL_users, newUser);
    setTimeout(function () {
        login($loginInput_id.val());
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
        var userFound = (len < 1) ? true : false;
        if (userFound) {
            if (storage) {
                var localpw = $PasswordInput.val();
                var serverPass = data.password;
                var userName = data.username;
                $.ajax({
                    type: GET,
                    url: rootURL_users + "/user/" + localpw + "/" + userName,
                    dataType: "html",
                    success: function (data) {
                        if (data === serverPass) {
                            localStorage.user = userName;
                            loginUser(localStorage.user);
                        } else {
                            alert('password is not correct');
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert('server error - please enter login and password' + jqXHR.toString() + " " + textStatus.toString() + " " + errorThrown.toString());
                    }
                });
                localStorage.user = userName;
            }
        } else {
            userNotFound();
        }
        LOGIN.clearInputs();
    } else {
        userNotFound();
    }
}

function loginUser(user) {
    CLIENTS.clearSelectedClient();
    CLIENTS.newClientForm.clearClientList();
    CLIENTS.loadingImage();
    CLIENTS.findAllClients(user);
    WORKLOG.getWorkEntries(user);
    buildHeaderLoginName(user);
}

function routeLoginForm(e) {
    switch ($(e).val()) {
        case "Login":
            LOGIN.login($loginInput_id.val());
            break;
        case "Create New User":
            LOGIN.addUser();
            break;
        case "Send Info":
            alert('sending info');
            break;
        default:
            alert("unknown - loginform submit click");
    }
}

function buildHeaderLoginName(user) {
    if (user === "undefined") {
        var inx = user.indexOf('@');
        if (inx !== -1) {
            user = user.substring(0, inx);
        }
        $headerOptionThree.text("Login");
    } else {
        $headerOptionThree.text(user);
    }
}

function userNotFound() {
    $headerOptionThree.text("Login");
    localStorage.user = "undefined";
    alert('User Not found');
}

function showSelectedLoginForm(sender) {
    if (sender === null) {
        showMainLogin($createNewAccount);
    } else {
        var senderName = $(sender).attr('id');
        switch (senderName) {
            case "createNewAccount":
                if (createUserSwitch) {
                    showCreateNewUser(sender);
                    createUserSwitch = false;
                } else {
                    showMainLogin(sender);
                    createUserSwitch = true;
                }
                break;
            case "getAccount":
                showOnlyLoginInput();
                break;
            default:
                showLoginAndPasswordInput();
        }
    }
}

function showOnlyLoginInput() {
    $loginInputWrapper.hide();
    $submit.val("Send Info").css('width', '70%');
}

function showMainLogin(e) {
    $(e).text('Create New User');
    showLoginAndPasswordInput();
    $submit.val("Login").css('width', '80%');
}

function showLoginAndPasswordInput() {
    $loginInputWrapper_id.show();
    $passwordWrapper.show();
    $confirmPasswordWrapper.hide();
}

function showCreateNewUser(e) {
    $(e).text('Back to login');
    $loginInputWrapper_id.show();
    $passwordWrapper.show();
    $confirmPasswordWrapper.show();
    $submit.val("Create New User").css('width', '170px');
}

function validateLogin() {
    var valid = true;
    $loginInput.each(function () {
        if ($(this).is(':visible') && $(this).val() === "") {
            valid = false;
            $(this).keyup(function () {
                $(this).removeClass('loginValidate');
                switch ($(this).attr('id')) {
                    case "loginInput":
                        $(this).attr("placeholder", INPUT_LOGIN);
                        break;
                    case "PasswordInput":
                        $(this).attr("placeholder", INPUT_PASS);
                        break;
                    case "PasswordConfirmInput":
                        $(this).attr("placeholder", INPUT_CONFIRM_PASS);
                        break;
                    default:
                        alert("unknown - loginform submit click -- " + $(this).attr('id'));
                }
            });
            $(this).addClass('loginValidate');
            $(this).attr("placeholder", 'required');
        } else {
            $(this).removeClass('loginValidate');
        }
    });
    return valid;
}
