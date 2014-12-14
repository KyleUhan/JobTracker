/******************************************************
 *******************ON LOAD OPERATIONS*****************
 ******************************************************
 **********HANDLES FUNCTIONS TO CALL ON LOAD***********/

$(function () {
    HEADER.hideAll();
    CLIENTS.newClientForm.hideRateInputs();
    CLIENTS.newClientForm.hideTravel();
    CLIENTS.newClientForm.hideMileage();
    LOGIN.isLoggedIn();
});