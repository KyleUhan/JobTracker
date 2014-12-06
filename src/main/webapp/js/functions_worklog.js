var rootURL_workLog = rootURL_workLog || "http://localhost:8080/JobTracker/api/v1/worklogs";

var WORKLOG = WORKLOG || {};
WORKLOG = {
    loadAll: function () {
        alert('loading')
    },
    save: function () {
        buildLog();
    },
    getWorkEntries: function (userName) {
        REST.method.findAll(rootURL_workLog + "/worklog/" + userName);
    },
    renderWorkLog: function (data) {
        populateWorkLog(data)
    }
}

function populateWorkLog(data) {
    $('#workLog #wlEntries tr').empty()
    $.each(data, function (key, val) { 
        $('#workLog #wlEntries tr:nth-child(1)').before(
                "<tr>" +
                "<td>" +
                "<input type='date' id='wlStartDate" + key + "' class='workLogStartDate dateSelect' value='"+val.worklogStartdate+"'>" +
                "</td>" +
                "<td>" +
                "<input type='date' id='wlEndDate" + key + "' class='workLogEndDate dateSelect' value='"+val.worklogEnddate+"'>" +
                "</td>" +
                "<td>" +
                "<select id='wlClientOption" + key + "' class='wlClientOption'>" +
                buildClientDropDown(val.worklogClient) +
                "</select>" +
                "</td>" +
                "<td>" +
                "<div id='wlOptionButton" + key + "' class='wloptionsBtn' title='options'></div>" +
                "<div id='wlRemoveButton" + key + "' class='wlRemoveBtn' title='remove'></div>" +
                "</td>" +
                "</tr>"
         );
    })
}

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
function buildClientDropDown(selectedClient) {
    var stringToBuild = "<option value='0'>"+selectedClient+"</option>";
    $.each(CLIENTS.returnClientList(), function (key, val) {
        stringToBuild += "<option value='" + (key + 1) + "'>" + val.clientName + "</option>";
    });
    return stringToBuild;
}











function buildLog() {
    var wlItem = [];
    $('#wlEntries tr').each(function (index, element) {
        var startDate = $(element).children().children().val();
        var endDate = $(this).children().children().val();
        var client = $(this).children().children().val();
        client = itemArray[parseInt(client)];
        wlItem[0] = startDate;
        wlItem[1] = endDate;
        wlItem[2] = client;
        alert(wlItem)
    });

}

