/***********************************************************
 **********************HEADER MENU***************************
 ************************************************************
 *Handles Dropdown Header Menu (also overall main functions)*/

//Handles expanding and closing header menu
var menuPosition = 0;

HEADER = {
    hideAll: function () {
        hideAllForms();
    },
    show: function (optionSelected) {
        showForm(optionSelected);
    },
    headerSelection: function (optionSelected) {
        headerMenuSelection(optionSelected);
    },
    animateHeader: function () {
        headerMenuSwitch();
    }
};

function hideAllForms() {
    $form.hide();
}

function headerMenuSelection(optionSelected) {
    HEADER.hideAll();
    HEADER.show(optionSelected);
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
        CLIENTS.clearSelectedClient();
        CLIENTS.newClientForm.clearClientList();
        if (LOGIN.checkIfUserIsLoggedIn()) {
            CLIENTS.loadingImage();
            CLIENTS.findAllClients(localStorage.user)
        }
    } else if (e === 2) {
        LOGIN.selectLogin(null);
    }
}

function headerMenuSwitch() {
    var lowestSlideDownPosition = '-70px';
    $expandMenuTab_tabText.hide();
    if (menuPosition === 0) {
        menuPosition++;
        $header.css('margin-top', '0');
        $header.css('box-shadow', '35px 2px 0px 10px rgba(0,0,0,.5)');
        $expandMenuTab_tabText.text("-").fadeIn('fast');
    } else {
        menuPosition--;
        $header.css('margin-top', lowestSlideDownPosition);
        $header.css('box-shadow', '30px 12px 0px 10px rgba(0,0,0,.5)');
        $expandMenuTab_tabText.text("+").fadeIn('fast');
    }
}