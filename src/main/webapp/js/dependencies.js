/* 
 * Author: Kyle Uhan
 * Date: 12/7/14
 * Dependencies
 * 
 * NOTES:
 * -Only 100% accuracy in Chrome - will adjust details for all modern X-broswers 
 * -
 */

//VERSION
var versionNumber = 'v1';

//URI's
var rootURL_clientProfile = rootURL_clientProfile || "http://localhost:8080/JobTracker/api/v1/clientProfiles";
var rootURL_authorities = rootURL_authorities || "http://localhost:8080/JobTracker/api/v1/authorities";
var rootURL_workLog = rootURL_workLog || "http://localhost:8080/JobTracker/api/v1/worklogs";
var rootURL_users = rootURL_users || "http://localhost:8080/JobTracker/api/v1/users";

//OBJECTS
var JOBTRACKER = JOBTRACKER || {};
var HEADER = HEADER || {};
var WORKLOG = WORKLOG || {};
var CLIENTS = CLIENTS || {};
var LOGIN = LOGIN || {};
var REST = REST || {};

//CONSTANTS
var ERROR_MSG_LOGIN = "Please login to use this feature.";
var GET = 'GET';
var DELETE = 'DELETE';
var POST = 'POST';
var PUT = 'PUT';
var INPUT_LOGIN = " login@email.com";
var INPUT_PASS = " password";
var INPUT_CONFIRM_PASS = " confirm password";
var CONFIRM_DELETE = 'Are you sure you want to delete this record?';

//STORAGE
var storage = (typeof (Storage) !== "undefined") ? true : false;

//ELEMENTS - by form//
//
//HEADER FORM - elements
var $form = $('.form'),
        $header = $('header'),
        $expandMenuTab_tabText = $('#expandMenuTab #tabText');
//LOGIN FORM - elements
var $loginInput = $('.loginInput'),
        $loginWrapper = $('#loginWrapper'),
        $createNewAccount = $('#createNewAccount'),
        $PasswordConfirmInput = $('#PasswordConfirmInput'),
        $PasswordInput = $('#PasswordInput'),
        $loginInput_id = $('#loginInput'),
        $headerOptionThree = $('#headerOptionThree'),
        $loginInputWrapper = $('.loginInputWrapper'),
        $loginInputWrapper_id = $('#loginInputWrapper'),
        $passwordWrapper = $('#passwordWrapper'),
        $confirmPasswordWrapper = $('#confirmPasswordWrapper'),
        $submit = $('#submit');
//CLIENTS FORM - elements
var $addClientFormPaysMileageInput = $('#addClientFormPaysMileageInput'),
        $addClientFormPaysTravelInput = $('#addClientFormPaysTravelInput'),
        $addClientFormPerDayInput = $('#addClientFormPerDayInput'),
        $addClientFormPerHourInput = $('#addClientFormPerHourInput'),
        $addClientFormSetAmountInput = $('#addClientFormSetAmountInput'),
        $addClientFormNAME = $('#addClientFormNAME'),
        $addClientFormContactName = $('#addClientFormContactName'),
        $addClientFormContactNumber = $('#addClientFormContactNumber'),
        $addClientFormContactEmail = $('#addClientFormContactEmail'),
        $addClientFormInput = $('.addClientFormInput'),
        $addClientForm = $('#addClientForm');
var $clientFormPayRateInput = $('.clientFormPayRateInput'),
        $clientList = $('#clientList'),
        $clientName = $('#clientName'),
        $clientId = $('#clientId');
var $mileageInputWrap_span = $('#mileageInputWrap span'),
        $paysTravelInputWrap_span = $('#paysTravelInputWrap span'),
        $selectedClient_input = $('#selectedClient input');
//WORK LOG FORM - elements
var $worklogOptionCheckBox = $('.worklogOptionCheckBox'),
        $WLDetailsClientName = $('#WLDetailsClientName'),
        $WLDetailsStartDate = $('#WLDetailsStartDate'),
        $WLDetailsEndDate = $('#WLDetailsEndDate'),
        $WLDetailsTimeWorkedAmount = $('#WLDetailsTimeWorkedAmount'),
        $WLDetailsPayRateAmount = $('#WLDetailsPayRateAmount'),
        $WLDetailsTotalAmount = $('#WLDetailsTotalAmount'),
        $workLogExtraOptions = $('.workLogExtraOptions'),
        $optionsMenu = $('#optionsMenu'),
        $optionsMenu_li = $('#optionsMenu li'),
        $optionsMenuDetails = $('.optionsMenuDetails'),
        $optionsMenuDetails_id = $('#optionsMenuDetails'),
        $WLDetailsTravel = $('#WLDetailsTravel'),
        $WLDetailsMileage = $('#WLDetailsMileage'),
        $hoursInput = $('#hoursInput'),
        $workLog_tr = $('#workLog tr'),
        $checkBox1 = $('#checkBox1'),
        $checkBox2 = $('#checkBox2'),
        $daysDisplay = $('#daysDisplay');
//EVENT LISTENER -elements
var $expandMenuTab = $('#expandMenuTab'),
        $headerOption = $('.headerOption');
var $addNewClientButton = $('#addNewClientButton'),
        $updateClientButton = $('#updateClientButton'),
        $removeClientButton = $('#removeClientButton'),
        $addClientFormSubmit = $('#addClientFormSubmit'),
        $addClientFormPaysTravel = $('#addClientFormPaysTravel'),
        $addClientFormPaysMileage = $('#addClientFormPaysMileage'),
        $clientFormPayRate = $('.clientFormPayRate');
var $wlNewBtn = $('#wlNewBtn'),
        $workLog = $('#workLog'),
        $wlSaveBtn = $('#wlSaveBtn');
var $loginForm_submit = $('#loginForm #submit'),
        $getAccount = $('#getAccount');