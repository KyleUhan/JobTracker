/******************************************************
 **********************MY CLIENTS PAGE******************
 ******************************************************/
var rootURL_clientProfile = rootURL_clientProfile || "http://localhost:8080/JobTracker/api/v1/clientProfiles";
var rootURL_userAccount = rootURL_userAccount || "http://localhost:8080/JobTracker/api/v1/userAccounts";

var CLIENTS = CLIENTS || {};

CLIENTS = {
    saveClientList: function (data) {
        localStorage.setItem('clients', JSON.stringify(data));
    },
    returnClientList: function () {
        var list = localStorage.getItem("clients");
        return JSON.parse(list)
    }
}

function getPayStyle() {
    var payStyle;
    var rate;
    var rateAndType = [0, 0, 0, 0];
    $('.clientFormPayRateInput').each(function (i) {
        if ($(this).val() !== "") {
            payStyle = $(this).attr('id');
        }
    });
    switch (payStyle) {
        case "addClientFormPerDayInput":
            rate = $('#addClientFormPerDayInput').val();
            rateAndType = [rate, 1, 0, 0];
            break;
        case "addClientFormPerHourInput":
            rate = $('#addClientFormPerHourInput').val();
            rateAndType = [rate, 0, 1, 0];
            break;
        case "addClientFormSetAmountInput":
            rate = $('#addClientFormSetAmountInput').val();
            rateAndType = [rate, 0, 0, 1];
            break;
        default:
    }

    return rateAndType;
}

function addClient() {
    var rateAndType = getPayStyle();
    var clientInfo = [0,
        $('#addClientFormNAME').val(),
        $('#addClientFormContactName').val(),
        $('#addClientFormContactNumber').val(),
        $('#addClientFormContactEmail').val(),
        rateAndType[0],
        rateAndType[1],
        rateAndType[2],
        rateAndType[3],
        $('#addClientFormPaysTravelInput').val(),
        $('#addClientFormPaysMileageInput').val(),
        localStorage.user
    ];
    REST.method.addRecord(rootURL_clientProfile, clientInfo);
}

function removeClient() {
    var id = $('#clientId').val();
    if (id > -1) {
        var remove = confirm("Are you sure you wish to delete?");
        if (remove) {
            REST.method.deleteRecord(rootURL_clientProfile, id);
        } else {
            alert("Action aborted");
        }
    }
}

function updateClient() {
    var id = $('#clientId').val();
    if (id > -1) {
        var remove = confirm("Are you sure you wish to update?");
        if (remove) {
            var clientInfo = [id, $('#clientName').val()];
            REST.method.updateRecord(rootURL_clientProfile, id, clientInfo);
        } else {
            alert("Action aborted");
        }
    }
}

function renderClientList(data) {
    CLIENTS.saveClientList(data)
    items = [];
    itemNames = [];
    clearInput();
    clearClientList();
    $.each(CLIENTS.returnClientList(), function (key, val) {
        $('#clientList').append("<li id='client" + key + "'>" + val.clientName + "</li>");
        items.push(val);
        itemNames.push(val.clientName);
    });
    setClientListBg();
    clickList();
}




