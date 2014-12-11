
var displayCounter = 0;
var workLogAdded = false;

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
    clearWorkLog: function () {
        $('#workLog #wlEntries tr').empty();
    },
    calculateDaysWorked: function (dateA, dateB) {
        return dateDiffInDays(dateA, dateB);
    },
    calculateTotal: function (num1, num2) {
        return num1 * num2;
    }
};

WORKLOG.display = {
    formatCurrency: function (num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
            alert('please enter all information for work log');
        }
        else {
            if (workLogAdded) {
                workLogAdded = false;
                var wl = [$startDate, $endDate, $client, localStorage.user];
                REST.method.addRecord(rootURL_workLog, wl);
            } else {
                alert('no changes have been made');
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

//Work Log Menu
var sideMenuSwitch = true;
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
        var workLogDetails = [];
        workLogDetails[0] = $('#wlClientOption' + clientSelected + ' option:selected').text();
        workLogDetails[1] = $('#wlStartDate' + clientSelected).val();
        workLogDetails[2] = $('#wlEndDate' + clientSelected).val();
        var payRate = findPayRate(workLogDetails[0]);
        var type = findPayType(workLogDetails[0]);
        switch (type) {
            case "day":
                workLogDetails[3] = WORKLOG.calculateDaysWorked(workLogDetails[2], workLogDetails[1]);
                 $('#daysDisplay').text('Days: ');
                 $('#hoursInput').hide();
                 $('#saveHoursButton').hide();
                break;
            case "hour":
                workLogDetails[3] = "";
                 $('#daysDisplay').text('Hours: ');
                 $('#hoursInput').show();
                 $('#saveHoursButton').show();
                 $('#hoursInput').keyup(function(){
                     $("#optionMenuInnerDetails #WLDetailsTotalAmount").text($(this).val()*payRate);
                 });
                break;
            case "flat":
                workLogDetails[3] = WORKLOG.calculateDaysWorked(workLogDetails[2], workLogDetails[1]);
                 $('#daysDisplay').text('Days: ');
                 $('#hoursInput').hide();
                 $('##saveHoursButton').hide();
                break;
        }
       
        
        workLogDetails[4] = WORKLOG.display.formatCurrency(payRate);
        workLogDetails[5] = WORKLOG.display.formatCurrency(WORKLOG.calculateTotal(workLogDetails[3], payRate));
        buildOptionsDetail(workLogDetails);
        showOptionDetails();
        sideMenuExpandDetails = false;

    } else {
        hideOptionDetails();
        resetMenuOptions();
        sideMenuExpandDetails = true;
    }
    sideMenuSwitch = true;
});

function findPayRate(clientName) {
    var payrate = 0;
    $.each(CLIENTS.returnClientList(), function (key, val) {
        if (clientName === val.clientName) {
            payrate = val.clientRate;
        }
    });
    return payrate;
}

function findPayType(clientName) {
    var payType = "";
    $.each(CLIENTS.returnClientList(), function (key, val) {
        if (clientName === val.clientName) {
            if (val.clientPerDay) {
                payType = "day";      
            }
            if (val.clientPerHour) {
                payType = "hour";
            }
            if (val.clientSetRate) {
                payType = "flat";
            }
        }
    });
    return payType;
}

//dateA and dateB are javascript Date objects
function dateDiffInDays(dateA, dateB) {
    var d1 = new Date(dateA);
    var d2 = new Date(dateB);
    var diff = d2 - d1;
    return (Math.abs(diff) / (24 * 60 * 60 * 1000))
}

function buildOptionsDetail(itemArray) {
    $("#optionMenuInnerDetails #WLDetailsClientName").text(itemArray[0]);
    $("#optionMenuInnerDetails #WLDetailsStartDate").text(itemArray[1]);
    $("#optionMenuInnerDetails #WLDetailsEndDate").text(itemArray[2]);
    $("#optionMenuInnerDetails #WLDetailsTimeWorkedAmount").text(itemArray[3]);
    $("#optionMenuInnerDetails #WLDetailsPayRateAmount").text(itemArray[4]);
    $("#optionMenuInnerDetails #WLDetailsTotalAmount").text(itemArray[5]);

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