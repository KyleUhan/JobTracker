var rootURL_workLog = rootURL_workLog || "http://localhost:8080/JobTracker/api/v1/worklogs";
var displayCounter = 0;
var workLogAdded = false;

var WORKLOG = WORKLOG || {};
WORKLOG = {
    addNewWorkLog: function () {
        addWorkLogEntry();
    },
    saveWorkLog: function () {
        saveWorkLog();
    },
    removeWorkLog: function (id) {
        removeWorklog(id);
    },
    getWorkEntries: function (userName) {
        REST.method.findAll(rootURL_workLog + "/worklog/" + userName);
    },
    renderWorkLog: function (data) {
        populateWorkLog(data);
    },
    clearWorkLog:function(){
        $('#workLog #wlEntries tr').empty();
    }
};


function populateWorkLog(data) {
    WORKLOG.clearWorkLog();
    $.each(data, function (key, val) {
        $('#workLog #wlEntries tr:nth-child(1)').before(
                "<tr>" +
                "<td>" +
                "<input type='date' id='wlStartDate" + key + "' class='workLogStartDate dateSelect' value='" + val.worklogStartdate + "'>" +
                "</td>" +
                "<td>" +
                "<input type='date' id='wlEndDate" + key + "' class='workLogEndDate dateSelect' value='" + val.worklogEnddate + "'>" +
                "</td>" +
                "<td>" +
                "<select id='wlClientOption" + key + "' class='wlClientOption'>" +
                buildClientDropDown(val.worklogClient) +
                "</select>" +
                "</td>" +
                "<td>" +
                "<div id='wlOptionButton" + key + "' class='wloptionsBtn' title='options'></div>" +
                "<div id='wlRemoveButton" + key + "' class='wlRemoveBtn' title='remove'></div>" +
                "<input type='hidden' id='workLogid" + key + "' value='" + val.worklogId + "'/>" +
                "</td>" +
                "</tr>"
                );
        displayCounter = key + 1;
    });
}


function addWorkLogEntry() {
    if (LOGIN.checkIfUserIsLoggedIn()) {
        if (!workLogAdded) {
            workLogAdded = true;
            $('#workLog #wlEntries tr:nth-child(1)').before(
                    "<tr>" +
                    "<td>" +
                    "<input type='date' id='wlStartDate" + displayCounter + "' class='workLogStartDate dateSelect'>" +
                    "</td>" +
                    "<td>" +
                    "<input type='date' id='wlEndDate" + displayCounter + "' class='workLogEndDate dateSelect'>" +
                    "</td>" +
                    "<td>" +
                    "<select id='wlClientOption" + displayCounter + "' class='wlClientOption'>" +
                    buildClientDropDown() +
                    "</select>" +
                    "</td>" +
                    "<td>" +
                    "<div id='wlOptionButton" + displayCounter + "' class='wloptionsBtn' title='options'></div>" +
                    "<div id='wlRemoveButton" + displayCounter + "' class='wlRemoveBtn' title='remove'></div>" +
                    "</td>" +
                    "</tr>"
                    );
            displayCounter++;
        } else {
            alert('please save work log before adding a new one');
        }
    } else {
        alert(ERROR_MSG_LOGIN);
    }
}

//Adds Clients to DropDown list in worklog
function buildClientDropDown(selectedClient) {
    if (selectedClient === "undefined" || typeof selectedClient === "undefined") {
        selectedClient = "";
    }
    var stringToBuild = "<option value='0'>" + selectedClient + "</option>";
    $.each(CLIENTS.returnClientList(), function (key, val) {
        stringToBuild += "<option value='" + (key + 1) + "'>" + val.clientName + "</option>";
    });
    return stringToBuild;
}


function saveWorkLog() {
    if (LOGIN.checkIfUserIsLoggedIn()) {
        var $startDate = $('#wlStartDate' + (displayCounter - 1)).val();
        var $endDate = $('#wlEndDate' + (displayCounter - 1)).val();
        var $client = $('#wlClientOption' + (displayCounter - 1) + " option:selected").text();
        if ($startDate === "" || $endDate === "" || $client === "") {
            alert('please enter all information for work log')
        }
        else {
            if (workLogAdded) {
                workLogAdded = false;
                var wl = [$startDate, $endDate, $client, localStorage.user];
                //      alert('sd: ' + $startDate + " -- ed: " + $endDate + " client : " + $client);
                REST.method.addRecord(rootURL_workLog, wl);
            } else {
                alert('no changes have been made')
            }
        }

    } else {
        alert(ERROR_MSG_LOGIN);
    }
}

function removeWorklog(id) {
    if (id.length > 1) {
        id = id.substring(id.length - 1, id.length);
    }
    id = $('#workLogid' + id).val();
    REST.method.deleteRecord(rootURL_workLog, id);
    WORKLOG.getWorkEntries(localStorage.user);
}

function populateSelectedWorkLog(e) {
    selectBg(e);
}

function clickMenulLogList() {
    $('#workLog tr').click(function () {
        $('#workLog tr').children().removeClass('selectedItem');
        $(this).children().addClass('selectedItem');
    });
}

