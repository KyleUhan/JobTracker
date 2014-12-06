

var rootURL_clientProfile = rootURL_clientProfile || "http://localhost:8080/JobTracker/api/v1/clientProfiles";
var rootURL_userAccount = rootURL_userAccount || "http://localhost:8080/JobTracker/api/v1/userAccounts";

function renderList(data) {
    alert();
    switch (0) {
        default:
            renderClientList(data);
    }
}

//Work Log Menu
var sideMenuSwitch = true;
function addWLEvents() {


}
var clientSelected;
function showWLOptionsMenu(pos) {
    clientSelected = pos;
    hideOptionDetails();
    resetMenuOptions();
    if (sideMenuSwitch) {
        $('#optionsMenu').css('width', '150px');
        sideMenuSwitch = false;
    } else {
        $('#optionsMenu').css('width', '0px');
        sideMenuSwitch = true;
    }
}
addWLEvents();

//REPLCAE THIS WITH LOOP COUNTER BASED ON WHATS IN THE DB
var quickCounter = 0;
function addWorkLogEntry() {
    $('#workLog #wlEntries tr:nth-child(1)').before(
            "<tr>" +
            "<td>" +
            "<input type='date' id='wlStartDate" + quickCounter + "' class='workLogStartDate dateSelect'>" +
            "</td>" +
            "<td>" +
            "<input type='date' id='wlEndDate" + quickCounter + "' class='workLogEndDate dateSelect'>" +
            "</td>" +
            "<td>" +
            "<select id='wlClientOption" + quickCounter + "' class='wlClientOption'>" +
            buildClientDropDown() +
            "</select>" +
            "</td>" +
            "<td>" +
            "<div id='wlOptionButton" + quickCounter + "' class='wloptionsBtn' title='options'></div>" +
            "<div id='wlRemoveButton" + quickCounter + "' class='wlRemoveBtn' title='remove'></div>" +
            "</td>" +
            "</tr>"
            );
    quickCounter++;
}

//Adds Clients to DropDown list in worklog
function buildClientDropDown() {
    var stringToBuild = "<option value='0'></option>";
      $.each(CLIENTS.returnClientList(), function (key, val){
          stringToBuild += "<option value='" + (key + 1) + "'>" + val.clientName + "</option>";
      });
    return stringToBuild;
}

//closes options menu
$('#optionsMenu li:nth-child(1)').click(function () {
    $('#optionsMenu').css('width', '0px');
    sideMenuSwitch = true;
});

//Expands Work Log Options to show more details
var sideMenuExpandDetails = true;
$('#optionsMenu li:nth-child(9)').click(function () {
    if (sideMenuExpandDetails) {
        $('#optionsMenu li').css('text-align', 'left');
        $('#optionsMenu li').css('padding-left', '20px');
        $('#optionsMenu').css('width', '400px');
        buildOptionsDetail($('#wlClientOption' + clientSelected + ' option:selected').text());
        showOptionDetails();
        sideMenuExpandDetails = false;
    } else {
        hideOptionDetails();
        resetMenuOptions();
        sideMenuExpandDetails = true;
    }
    sideMenuSwitch = true;
});

function buildOptionsDetail(itemArray) {
    $("#optionsMenuDetails").text(itemArray);
}

function resetMenuOptions() {
    $('#optionsMenu').css('width', '150px');
    $('#optionsMenu li').css('text-align', 'center');
    $('#optionsMenu li').css('padding-left', '0px');
}

function showOptionDetails() {
    $('.optionsMenuDetails').css('left', '30%').css('width', '70%');
}
function hideOptionDetails() {
    $('.optionsMenuDetails').css('left', '100%').css('width', '0%');
}

function hidePayRateInputs() {
    $('.clientFormPayRateInput').hide();
}

function hidePayTravelInput() {
    $('#paysTravelInputWrap span').hide();
    $('#addClientFormPaysTravelInput').hide();
}