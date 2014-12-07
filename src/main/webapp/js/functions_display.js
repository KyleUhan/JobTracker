/* 
 * Functions related to Display - Broken up per page/form
 */

/**DEPENDENCIES**/
var rootURL_clientProfile = rootURL_clientProfile || "http://localhost:8080/JobTracker/api/v1/clientProfiles";
var createUserSwitch = true;

/******************************************************
 **********************HEADER MENU**********************
 ******************************************************/

//Handles expanding and closing header menu
var menuPosition = 0;
function headerMenuSwitch() {
    var lowestSlideDownPosition = '-70px';
    $('#expandMenuTab #tabText').hide();
    if (menuPosition === 0) {
        menuPosition++;
        $('header').css('margin-top', '0');
        $('header').css('box-shadow', '35px 2px 0px 10px rgba(0,0,0,.5)');
        $('#expandMenuTab #tabText').text("-").fadeIn('fast');
    } else {
        menuPosition--;
        $('header').css('margin-top', lowestSlideDownPosition);
        $('header').css('box-shadow', '30px 12px 0px 10px rgba(0,0,0,.5)');
        $('#expandMenuTab #tabText').text("+").fadeIn('fast');
    }
}

//Shows the form associated with a menu option
function showForm(e) {
    $('.form:nth-child(' + (e + 1) + ')').show('fast');
    if (e === 0) {
        WORKLOG.getWorkEntries(localStorage.user);
        // clickMenulLogList();
    } else if (e === 1) {
        clearInput();
        clearClientList();
        addLoadingImage();
        REST.method.findAll(rootURL_clientProfile + "/clients/" + localStorage.user);
    } else if (e === 2) {
        showSelectedLoginForm(null);
    }
}

//Routes which form to show
function headerMenuSelection(optionSelected) {
    hideAllForms();
    showForm(optionSelected);
}

/******************************************************
 **********************WORK LOG PAGE********************
 ******************************************************/
function populateSelectedWorkLog(e) {
    selectBg(e);
}

function clickMenulLogList() {
    $('#workLog tr').click(function () {
        $('#workLog tr').children().removeClass('selectedItem');
        $(this).children().addClass('selectedItem');
    });
}


/******************************************************
 **********************MY CLIENTS PAGE******************
 ******************************************************/

//Can be replaced with gif or something later to show something while info is loading
function addLoadingImage() {
    $('#clientList').append('<li>Loading...</li>');
}

function showAddNewClientForm() {
    if (LOGIN.checkIfUserIsLoggedIn()) {
        hideAllForms();
        $('.addClientFormInput').val("");
        $('#addClientForm').show('fast');
    } else {
        alert('please log in to add client');
    }
}

//Adds the fields from client profile list to the selected input boxes
function populateSelected(e) {
    addToSelectedAnimation();
    var pos = $(e).index();
    localStorage.clientId = items[pos].idClientProfile;
    localStorage.clientName = items[pos].clientName;
    localStorage.clientContactName = items[pos].clientContactName;
    localStorage.clientContactNumber = items[pos].clientContactNumber;
    localStorage.clientContactEmail = items[pos].clientContactEmail;
    localStorage.clientRate = items[pos].clientRate;
    $('#selectedClient input:nth-child(' + 1 + ')').val(localStorage.clientId);
    $('#selectedClient input:nth-child(' + 2 + ')').val(localStorage.clientName);
    $('#selectedClient input:nth-child(' + 3 + ')').val(localStorage.clientRate);
    selectBg(e);
}

//Resets the background color of the clients list
function setClientListBg() {
    for (var i = 1; i < items.length; i += 2) {
        $('#client' + i).addClass('evenSelected');
    }
}

//Select an item from client list
function selectBg(e) {
    setClientListBg();
    $('#clientList li').removeClass('selectedClient');
    $(e).removeClass('evenSelected');
    $(e).addClass('selectedClient');
}

//Allows for dynamically added items to be assigned click - switch to .on later
function clickList() {
    $('#clientList li').click(function () {
        populateSelected(this);
    });
}

//adds a little bounce when client is added to selected client area
function addToSelectedAnimation() {
    $('#selectedClient input').animate({
        height: '20px'
    }, 200, function () {
        $('#selectedClient input').animate({
            height: '30px'
        }, 150);
    });
}

//Removes the selected client values from the boxes
function clearInput() {
    $('#selectedClient input').val('');
}

//Clears out all of the clients currently in the list
function clearClientList() {
    $('#clientList').empty();
}

function hidePayRateInputs() {
    $('.clientFormPayRateInput').hide();
}

function hidePayTravelInput() {
    $('#paysTravelInputWrap span').hide();
    $('#addClientFormPaysTravelInput').hide();
}

function hidePayMileageInput() {
    $('#mileageInputWrap span').hide();
    $('#addClientFormPaysMileageInput').hide();
}

function showPayRateSelected(e) {
    $(e).parent().parent().children().children().show('fast');
}

function clearOtherRateValues() {
    $('.clientFormPayRateInput').val("");
}

/******************************************************
 **********************LOGIN PAGE***********************
 ******************************************************/

//hideCreateNewUser();


function showSelectedLoginForm(sender) {
    if (sender === null) {
        showMainLogin($('#createNewAccount'));

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
    $('.loginInputWrapper').hide();
    $('#submit').val("Send Info").css('width', '70%');
}

function showMainLogin(e) {
    $(e).text('Create New User');
    showLoginAndPasswordInput();
    $('#submit').val("Login").css('width', '80%');
}

function showLoginAndPasswordInput() {
    $('#loginInputWrapper').show();
    $('#passwordWrapper').show();
    $('#confirmPasswordWrapper').hide();
}

function showCreateNewUser(e) {
    $(e).text('Back to login');
    $('#loginInputWrapper').show();
    $('#passwordWrapper').show();
    $('#confirmPasswordWrapper').show();
    $('#submit').val("Create New User").css('width', '170px');
}
/******************************************************
 **********************MAIN AREA/GENERAL****************
 ******************************************************/

function hideAllForms() {
    $('.form').hide();
}