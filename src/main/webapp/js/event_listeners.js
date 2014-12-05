/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var rootURL_clientProfile = rootURL_clientProfile || "http://localhost:8080/JobTracker/api/v1/clientProfiles";
var rootURL_userAccount = rootURL_userAccount || "http://localhost:8080/JobTracker/api/v1/userAccounts";


$(function () {
    hideAllForms();
    hidePayRateInputs();
    hidePayTravelInput();
    hidePayMileageInput();

    checkForLoggedInUser();
    /******************************************************
     **********************HEADER MENU**********************
     ******************************************************/
    $('#expandMenuTab').click(function () {
        headerMenuSwitch();
    });

    $('.headerOption').click(function () {
        headerMenuSelection($(this).index());
    });


    /******************************************************
     **********************MY CLIENTS PAGE******************
     ******************************************************/
    $('#addNewClientButton').click(function () {
        showAddNewClientForm();
    });

    $('#updateClientButton').click(function () {
        updateClient();
    });

    $('#removeClientButton').click(function () {
        removeClient();
    });

    //ADD CLIENT FORM EVENTS
    $('#addClientFormSubmit').click(function () {
        addClient();
    });

    $('#addClientFormPaysTravel').change(function () {
        if ($(this).is(':checked')) {
            showPayRateSelected(this);
        } else {
            hidePayTravelInput();
        }
    });

    $('#addClientFormPaysMileage').change(function () {
        if ($(this).is(':checked')) {
            showPayRateSelected(this);
        } else {
            hidePayMileageInput();
        }
    });

    //ADD CLIENT FORM RADIO BUTTON PAY RATE
    $('.clientFormPayRate').change(function () {
        clearOtherRateValues();
        hidePayRateInputs();
        showPayRateSelected(this);
    });
    
    function addClientFormRateToAdd(){
        
    }


    /******************************************************
     **********************WORK LOG PAGE********************
     ******************************************************/
    //-Add new Work Log Record
    $('#wlNewBtn').click(function () {
        // clickMenulLogList();
        addWorkLogEntry();
    });

    //-Options button for work log record
    var positionPicked = 0;
    $('#workLog').on('click', '.wloptionsBtn', function () {
        var pos = $(this).attr('id');
        positionPicked = pos.charAt(pos.length - 1);
        showWLOptionsMenu(positionPicked);
    });

    //- Remove worklog item
    $('#workLog').on('click', '.wlRemoveBtn', function () {
        if (confirm('Are you sure you want to delete this record?')) {
            $(this).parent().parent().empty();
        }
    });
    
    $('#wlSaveBtn').click(function(){
        WORKLOG.save()
    });


    /******************************************************
     **********************LOGIN PAGE***********************
     ******************************************************/
    $('#loginForm #submit').click(function () {
        routeLoginForm(this);
    });

    $('#createNewAccount').click(function () {
        showSelectedLoginForm(this);
    });

    $('#getAccount').click(function () {
        showSelectedLoginForm(this);
    });

});
