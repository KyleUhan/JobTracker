var rootURL_workLog = rootURL_workLog || "http://localhost:8080/JobTracker/api/v1/worklogs";

var WORKLOG = WORKLOG || {};
WORKLOG = {
    loadAll: function () {
        alert('loading')
    },
    save: function () {
        buildLog()

    }
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