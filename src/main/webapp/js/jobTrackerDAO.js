/* 
 * DAO
 */



JOBTRACKER.display = {
}

JOBTRACKER.display.dao = {
    //Convert to JSON using built in routing function (url)
    convertToJSON: function (routingName, data) {
        return convertToJSON(routingName, data);
    },
    convertToJobTracker: function (data) {

    },
    convertClientToJSON: function (data) {
        return convertClientToJSON(data);
    },
    convertUserToJSON: function (data) {
        convertUserToJSON(data);
    },
    convertWorkLogToJSON: function (data) {
        convertWorkLogToJSON(data);
    }

};

//Helper functions
function getTableName(url) {
    var tblName = "";
    var urlSections = url.split("/");
    if (urlSections.length > 1) {
        for (var i = 0; i < urlSections.length; i++) {
            if (urlSections[i] === versionNumber) {
                tblName = urlSections[i + 1];
            }
        }
    }else{
        tblName = url;
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


