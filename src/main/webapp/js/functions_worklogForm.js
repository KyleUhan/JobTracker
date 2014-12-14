/************************************************************
 **********************WORKLOG PAGE***************************
 *************************************************************
 *****Handles Work Log form including side option menu********/
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
    saveHoursWorked: function () {

    },
    renderWorkLog: function (data) {
        populateWorkLog(data);
    },
    clearWorkLog: function () {
        clearWorkLog();
    },
    calculateDaysWorked: function (dateA, dateB) {
        return dateDiffInDays(dateA, dateB);
    },
    calculateTotal: function (num1, num2) {
        return num1 * num2;
    },
    validateWorkLogSave: function () {
        validateWorkLogSave();
    },
    validate: function () {

    }
};

WORKLOG.options = {
    show: function (pos) {
        showWLOptionsMenu(pos);
    },
    hideDetails: function () {
        hideOptionDetails;
    },
    showExtraOptions: function () {
        showWorkLogExtraOptions();
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
                "<input type='hidden' id='workLogHours" + key + "' value='" + val.worklogHours + "'/>" +
                "<input type='hidden' id='workLogTravel" + key + "' value='" + val.worklogTravel + "'/>" +
                "<input type='hidden' id='workLogMileage" + key + "' value='" + val.worklogMileage + "'/>" +
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
        var $hours = $('#hoursInput').val();
        var type = findPayType($client);
        var hoursNeeded = false;
        if (type === "hour") {
            if ($hours === "") {
                hoursNeeded = true;
            }
        }
        if ($startDate === "" || $endDate === "" || $client === "" || hoursNeeded) {
            alert('please enter all information for work log');
        }
        else {
            if (workLogAdded) {
                workLogAdded = false;
                var options = [0, 0, 0, 0];
                $worklogOptionCheckBox.each(function (i) {
                    if ($(this).is(":checked")) {
                        options[i] = 1;
                    } else {
                        options[i] = 0;
                    }
                });
                var wl = [$startDate, $endDate, $client, localStorage.user, $hours, options[0], options[1]];
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
    if (!workLogAdded) {
        REST.method.deleteRecord(rootURL_workLog, id);
    } else {
        workLogAdded = false;
        WORKLOG.clearWorkLog();
    }
    WORKLOG.getWorkEntries(localStorage.user);
}

function populateSelectedWorkLog(e) {
    selectBg(e);
}

function clickMenulLogList() {
    $workLog_tr.click(function () {
        $workLog_tr.children().removeClass('selectedItem');
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
    $worklogOptionCheckBox.prop('checked', false);
    $worklogOptionCheckBox.each(function () {
        if ($('#workLogTravel' + clientSelected).val() === 'true') {
            $checkBox1.prop('checked', true);
        }
        if ($('#workLogMileage' + clientSelected).val() === 'true') {
            $checkBox2.prop('checked', true);
        }
    });
    if (sideMenuSwitch) {
        $optionsMenu.css('width', '150px');
        sideMenuSwitch = false;
    } else {
        $optionsMenu.css('width', '0px');
        sideMenuSwitch = true;
    }
}

//closes options menu
$('#optionsMenu li:nth-child(1)').click(function () {
    $worklogOptionCheckBox.each(function () {
        $(this).prop('checked', false);
    });
    $optionsMenu.css('width', '0px');
    sideMenuSwitch = true;
});

function showWorkLogExtraOptions() {
    $workLogExtraOptions.hide();
    $worklogOptionCheckBox.each(function () {
        if (isChecked(this)) {
            var id = $(this).attr('id');
            switch (id) {
                case "checkBox1":
                    $WLDetailsTravel.show('fast');
                    break;
                case "checkBox2":
                    $WLDetailsMileage.show('fast');
                    break;
                case "checkBox3":
                    break;
                case "checkBox4":
                    break;
            }
        }
    });

}

function isChecked(e) {
    return $(e).is(':checked');
}
//Expands Work Log Options to show more details
var sideMenuExpandDetails = true;
$('#optionsMenu li:nth-child(9)').click(function () {
    $workLogExtraOptions.hide();
    if (sideMenuExpandDetails) {
        $optionsMenu_li.css('text-align', 'left');
        $optionsMenu.css('width', '400px');
        WORKLOG.options.showExtraOptions();
        $worklogOptionCheckBox.change(function () {
            WORKLOG.options.showExtraOptions();
        });
        var timeWorked = 0;
        var workLogDetails = [];
        workLogDetails[0] = $('#wlClientOption' + clientSelected + ' option:selected').text();
        workLogDetails[1] = $('#wlStartDate' + clientSelected).val();
        workLogDetails[2] = $('#wlEndDate' + clientSelected).val();
        var payRate = findPayRate(workLogDetails[0]);
        var type = findPayType(workLogDetails[0]);
        switch (type) {
            case "day":
                workLogDetails[3] = WORKLOG.calculateDaysWorked(workLogDetails[2], workLogDetails[1]);
                timeWorked = workLogDetails[3];
                $daysDisplay.text('Days: ');
                $hoursInput.hide();
                $("#optionMenuInnerDetails #WLDetailsTimeWorkedAmount").show();
                break;
            case "hour":
                $daysDisplay.text('Hours: ');
                $hoursInput.show();
                var $hrs = $('#workLogHours' + clientSelected).val();
                $hoursInput.val($hrs);
                $("#optionMenuInnerDetails #WLDetailsTotalAmount").text();
                $hoursInput.keyup(function () {
                    $("#optionMenuInnerDetails #WLDetailsTotalAmount").text($(this).val() * payRate);
                });
                $("#optionMenuInnerDetails #WLDetailsTimeWorkedAmount").hide();
                if (isNaN($hrs) || $hrs === null) {
                    $hrs = 0;
                }
                workLogDetails[3] = $hrs;
                timeWorked = workLogDetails[3];
                break;
            case "flat":
                workLogDetails[3] = WORKLOG.calculateDaysWorked(workLogDetails[2], workLogDetails[1]);
                timeWorked = 1;
                $daysDisplay.text('Days: ');
                $hoursInput.hide();
                $("#optionMenuInnerDetails #WLDetailsTimeWorkedAmount").show();
                break;
        }
        workLogDetails[4] = WORKLOG.display.formatCurrency(payRate);
        workLogDetails[5] = WORKLOG.display.formatCurrency(WORKLOG.calculateTotal(timeWorked, payRate));
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

function dateDiffInDays(dateA, dateB) {
    var d1 = new Date(dateA);
    var d2 = new Date(dateB);
    var diff = d2 - d1;
    return (Math.abs(diff) / (24 * 60 * 60 * 1000));
}

function buildOptionsDetail(itemArray) {
    $WLDetailsClientName.text(itemArray[0]);
    $WLDetailsStartDate.text(itemArray[1]);
    $WLDetailsEndDate.text(itemArray[2]);
    $WLDetailsTimeWorkedAmount.text(itemArray[3]);
    $WLDetailsPayRateAmount.text(itemArray[4]);
    $WLDetailsTotalAmount.text(itemArray[5]);

}

function resetMenuOptions() {
    $optionsMenu.css('width', '150px');
    $optionsMenu_li.css('text-align', 'center');
    $optionsMenu_li.css('padding-left', '0px');
}

function showOptionDetails() {
    $optionsMenuDetails.css('left', '30%').css('width', '70%');
}
function hideOptionDetails() {
    $optionsMenuDetails.css('left', '100%').css('width', '0%');
}

function clearWorkLog() {
    $('#workLog #wlEntries tr').empty();
    $('#hoursInput').val("");
}