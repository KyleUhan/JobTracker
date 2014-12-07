/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var versionNumber = 'v1';
var rootURL_clientProfile = rootURL_clientProfile || "http://localhost:8080/JobTracker/api/v1/clientProfiles";
var rootURL_users = rootURL_users || "http://localhost:8080/JobTracker/api/v1/users";
var rootURL_authorities = rootURL_authorities || "http://localhost:8080/JobTracker/api/v1/authorities";
var GET = 'GET';
var DELETE = 'DELETE';
var POST = 'POST';
var PUT = 'PUT';

var LOGIN = LOGIN || {};
var REST = REST || {};
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
            data: convertToJSON(rootURL, val),
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
            dataType: "html",
            data: convertToJSON(rootURL, val),
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
    //alert(tableName + " - " + type)
    if (tableName === "clientprofiles") {
        switch (type) {
            case GET:
                areaToUpdate(tableName, data);
                break;
            case DELETE:
                REST.method.findAll(url);
                break;
            case POST:
                hideAllForms();
                showForm(1);
                break;
            case PUT:
                REST.method.findAll(url);
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
                REST.method.findAll(url);
                break;
            case "FIND":
            default:
                alert('non recognized http type');
        }
    } else if (tableName === "worklogs") {
        switch (type) {
            case GET:
                WORKLOG.renderWorkLog(data)
                break;
            case DELETE:
                alert('delete for worklogs');
                break;
            case POST:
                alert('added for worklogs');
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
            renderClientList(data);
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

//ROUTING FOR JSON CONVERSION
function convertToJSON(url, val) {
    var tableToUpdate = getTableName(url);
    var jsonInfo = {};
    switch (tableToUpdate) {
        case 'clientprofiles':
            jsonInfo = convertClientToJSON(val);
            break;
        case 'users':
            jsonInfo = convertUserToJSON(val);
            break;
        case 'authorities':
            jsonInfo = convertUserAuthoritesToJSON(val);
            break;
        case 'worklogs':
            jsonInfo = convertWorkLogToJSON(val);
            break;
        default:
            alert('unknown table to update');
    }
    return jsonInfo;
}
function convertClientToJSON(val) {
    return JSON.stringify({
        "idClientProfile": val[0],
        "clientName": val[1],
        "clientContactName": val[2],
        "clientContactNumber": val[3],
        "clientContactEmail": val[4],
        "clientRate": val[5],
        "clientPerDay": val[6],
        "clientPerHour": val[7],
        "clientSetRate": val[8],
        "clientTravelRate": val[9],
        "clientMileageRate": val[10],
        "clientTimestamp": new Date(),
        "clientUserId": val[11]
    });
}

function convertUserToJSON(val) {
    return JSON.stringify({
        "username": val[0],
        "password": val[1],
        "enabled": val[2],
        "userTimestamp": new Date(),
        "authoritiesCollection": ""
    });
}

function convertWorkLogToJSON(val) {
    return JSON.stringify({
        "worklogId": 0,
        "worklogStartdate": val[0],
        "worklogEnddate": val[1],
        "worklogClient": val[2],
        "worklogUsername": val[3]
    });
}

/*function convertUserAuthoritesToJSON(val) {
 var test = {};
 test = JSON.stringify({
 "authority": val[0],
 "authoritiesId": val[1],
 "username": val[2]
 });
 return test;
 }*/