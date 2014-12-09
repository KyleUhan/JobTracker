/* 
 * Author: Kyle Uhan
 * Date: 12/7/14
 * Dependencies
 */

//VERSION
var versionNumber = 'v1';


//URI's
var rootURL_clientProfile = rootURL_clientProfile || "http://localhost:8080/JobTracker/api/v1/clientProfiles";
var rootURL_authorities = rootURL_authorities || "http://localhost:8080/JobTracker/api/v1/authorities";
var rootURL_workLog = rootURL_workLog || "http://localhost:8080/JobTracker/api/v1/worklogs";
var rootURL_users = rootURL_users || "http://localhost:8080/JobTracker/api/v1/users";

//OBJECTS
var JOBTRACKER = JOBTRACKER || {};
var WORKLOG = WORKLOG || {};
var CLIENTS = CLIENTS || {};
var LOGIN = LOGIN || {};
var REST = REST || {};


//CONSTANTS
var ERROR_MSG_LOGIN = "Please login to use this feature.";
var GET = 'GET';
var DELETE = 'DELETE';
var POST = 'POST';
var PUT = 'PUT';

//STORAGE
var storage = (typeof (Storage) !== "undefined") ? true : false;


