/* 
* Handles REST and routing funcitons/ajax calls
 */

REST.method = {
    findAll: function (rootURL) {
        $.ajax({
            type: GET,
            url: rootURL,
            dataType: "json",
            success: function (data) {
                success(GET, rootURL, data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                error(GET, textStatus);
            }
        });
    },
    deleteRecord: function (rootURL, id) {
        $.ajax({
            type: DELETE,
            url: rootURL + '/' + id,
            dataType: "json",
            success: function () {
                success(DELETE, rootURL, "");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                error(DELETE, textStatus);
            }
        });
    },
    addRecord: function (rootURL, val) {
        $.ajax({
            type: POST,
            contentType: 'application/json',
            url: rootURL,
            dataType: "json",
            data: JOBTRACKER.display.dao.convertToJSON(rootURL, val),
            success: function (data, textStatus, jqXHR) {
                success(POST, rootURL, data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                error(POST, textStatus);
            }
        });
    },
    updateRecord: function (rootURL, id, val) {
        $.ajax({
            type: PUT,
            contentType: 'application/json',
            url: rootURL + '/' + id,
            dataType: "json",
            data: JOBTRACKER.display.dao.convertToJSON(rootURL, val),
            success: function (data, textStatus, jqXHR) {
                success(PUT, rootURL, data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                error(PUT, textStatus);
            }
        });
    },
    findRecord: function (rootURL, id) {
        $.ajax({
            type: GET,
            url: rootURL + '/' + id,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                success(GET, rootURL, data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                error(GET, textStatus);
            }
        });
    }
};

//routing functions
function success(type, url, data) {
    var tableName = getTableName(url);
    if (tableName === "clientprofiles") {
        switch (type) {
            case GET:
                areaToUpdate(tableName, data);
                break;
            case DELETE:
                CLIENTS.findAllClients(localStorage.user);
                break;
            case POST:
                hideAllForms();
                showForm(1);
                break;
            case PUT:
                hideAllForms();
                showForm(1);
                CLIENTS.findAllClients(localStorage.user);
                break;
            default:
                alert('non recognized http type');
        }
    } else if (tableName === "users") {
        switch (type) {
            case GET:
                checkForUserLogin(data);
                break;
            case DELETE:
                alert('delete account function');
                break;
            case POST:
                alert('added');
                break;
            case PUT:
               // REST.method.findAll(url);
                break;
            case "FIND":
            default:
                alert('non recognized http type');
        }
    } else if (tableName === "worklogs") {
        switch (type) {
            case GET:
                WORKLOG.renderWorkLog(data);
                break;
            case DELETE:
                WORKLOG.getWorkEntries(localStorage.user);
                alert('Work log deleted');
                break;
            case POST:
                WORKLOG.getWorkEntries(localStorage.user);
                alert('Work log has been added');
                break;
            case PUT:
                alert('put for worklogs');
                break;
            default:
                alert('non recognized http type');
        }
    }
}

function error(type, textStatus) {
    switch (type) {
        case GET:
            alert('Error in finding all - ' + textStatus);
            break;
        case DELETE:
            alert('Error in deleting- ' + textStatus);
            break;
        case POST:
            alert('Error in adding- ' + textStatus);
            break;
        case PUT:
            alert('Error in updating- ' + textStatus);
            break;
        default:
            alert('non recognized routing num');
    }
}

function areaToUpdate(areaToUpdate, data) {
    switch (areaToUpdate) {
        case 'clientprofiles':
            CLIENTS.buildClientList(data);
            break;
        case 'users':
            alert('area to update - userAccount');
            break;
        default:
            alert('unknown area to update');
    }
}

//Helper functions
function getTableName(url) {
    var tblName = "";
    var urlSections = url.split("/");
    for (var i = 0; i < urlSections.length; i++) {
        if (urlSections[i] === versionNumber) {
            tblName = urlSections[i + 1];
        }
    }
    return tblName.toLowerCase();
}

