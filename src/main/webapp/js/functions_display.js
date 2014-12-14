
//HEADER MENU////////////////////////////////////////////////////////////////////////////////////////////////////////

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
        WORKLOG.clearWorkLog();
        if (LOGIN.checkIfUserIsLoggedIn()) {
            workLogAdded = false;
            WORKLOG.getWorkEntries(localStorage.user);
        }
    } else if (e === 1) {
        clearInput();
        clearClientList();
        if (LOGIN.checkIfUserIsLoggedIn()) {
            addLoadingImage();
            CLIENTS.findAllClients(localStorage.user)
        }
    } else if (e === 2) {
        showSelectedLoginForm(null);
    }
}

//Routes which form to show
function headerMenuSelection(optionSelected) {
    hideAllForms();
    showForm(optionSelected);
}

//MY CLIENTS PAGE////////////////////////////////////////////////////////////////////////////////////////////////////////

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

//MAIN AREA/GENERAL////////////////////////////////////////////////////////////////////////////////////////////////////////
function hideAllForms() {
    $('.form').hide();
}