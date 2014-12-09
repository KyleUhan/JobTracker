/* 
 * EVENT LISTENERS
 */
$(function () {
    /*Move these to a load js file*/
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
        CLIENTS.updateClient();
    });

    $('#removeClientButton').click(function () {
        CLIENTS.removeClient();
    });

    //ADD CLIENT FORM EVENTS
    $('#addClientFormSubmit').click(function () {
        CLIENTS.addClient();
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

    /******************************************************
     **********************WORK LOG PAGE********************
     ******************************************************/
    //-Add new Work Log Record
    $('#wlNewBtn').click(function () {
        WORKLOG.addNewWorkLog();
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
            WORKLOG.removeWorkLog($(this).attr('id'));
          //  $(this).parent().parent().empty();
        }
    });
    
    $('#wlSaveBtn').click(function(){
        WORKLOG.saveWorkLog();
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
