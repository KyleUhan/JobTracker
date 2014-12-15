/* 
 * EVENT LISTENERS
 */
$(function () {     
    /******************************************************
     **********************HEADER MENU**********************
     ******************************************************/
    $expandMenuTab.click(function () {
        HEADER.animateHeader();
    });

    $headerOption.click(function () {
        HEADER.headerSelection($(this).index());
    });
    /******************************************************
     **********************MY CLIENTS PAGE******************
     ******************************************************/
    $addNewClientButton.click(function () {
        CLIENTS.newClientForm.show();
    });

    $updateClientButton.click(function () {
        CLIENTS.updateClient();
    });

    $removeClientButton.click(function () {
        CLIENTS.removeClient();
    });

    //ADD CLIENT FORM EVENTS
    $addClientFormSubmit.click(function () {
        CLIENTS.addClient();
    });

    $addClientFormPaysTravel.change(function () {
        ($(this).is(':checked')) ? CLIENTS.newClientForm.showPayRate(this) : CLIENTS.newClientForm.hideTravel();
    });

    $addClientFormPaysMileage.change(function () {
        ($(this).is(':checked')) ? CLIENTS.newClientForm.showPayRate(this) : CLIENTS.newClientForm.hideMileage();
    });

    //ADD CLIENT FORM RADIO BUTTON PAY RATE
    $clientFormPayRate.change(function () {
        CLIENTS.newClientForm.clearRateValues();
        CLIENTS.newClientForm.hideRateInputs();
        CLIENTS.newClientForm.showPayRate(this);
    });
    /******************************************************
     **********************WORK LOG PAGE********************
     ******************************************************/
    //-Add new Work Log Record
    $wlNewBtn.click(function () {
        WORKLOG.addNewWorkLog();
    });

    //-Options button for work log record
    $workLog.on('click', '.wloptionsBtn', function () {
        var pos = $(this).attr('id');
        WORKLOG.options.show((pos.charAt(pos.length - 1)));
    });

    //- Remove worklog item
    $workLog.on('click', '.wlRemoveBtn', function () {
        if (confirm(CONFIRM_DELETE)) {
            WORKLOG.removeWorkLog($(this).attr('id'));
        }
    });

    $wlSaveBtn.click(function () {
        WORKLOG.saveWorkLog();
    });
    /******************************************************
     **********************LOGIN PAGE***********************
     ******************************************************/
    $loginForm_submit.click(function () {
        LOGIN.validate(this);
    });

    $createNewAccount.click(function () {
        LOGIN.selectLogin(this);
    });

    $getAccount.click(function () {
        LOGIN.selectLogin(this);
    });
});
