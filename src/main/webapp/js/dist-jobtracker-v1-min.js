/* 
 * Author: Kyle Uhan
 * Date: 12/15/14
 * Version: 1
 * Compressed from: dependencies.js, event_listeners.js
 * :::TO DO:::
 * Mainly tested in Chrome - adjust details for all modern x-broswers
 *  
 */

//VERSION
function success(e,t,n){var r=getTableName(t);if(r==="clientprofiles"){switch(e){case GET:areaToUpdate(r,n);break;case DELETE:CLIENTS.findAllClients(localStorage.user);break;case POST:HEADER.hideAll();HEADER.show(1);break;case PUT:HEADER.hideAll();HEADER.show(1);CLIENTS.findAllClients(localStorage.user);break;default:alert("non recognized http type")}}else if(r==="users"){switch(e){case GET:LOGIN.isValidUser(n);break;case DELETE:alert("delete account function");break;case POST:alert("added");break;case PUT:break;case"FIND":default:alert("non recognized http type")}}else if(r==="worklogs"){switch(e){case GET:WORKLOG.renderWorkLog(n);break;case DELETE:WORKLOG.getWorkEntries(localStorage.user);alert("Work log deleted");break;case POST:WORKLOG.getWorkEntries(localStorage.user);alert("Work log has been added");break;case PUT:alert("put for worklogs");break;default:alert("non recognized http type")}}}function error(e,t){switch(e){case GET:alert("Error in finding all - "+t);break;case DELETE:alert("Error in deleting- "+t);break;case POST:alert("Error in adding- "+t);break;case PUT:alert("Error in updating- "+t);break;default:alert("non recognized routing num")}}function areaToUpdate(e,t){switch(e){case"clientprofiles":CLIENTS.buildClientList(t);break;case"users":alert("area to update - userAccount");break;default:alert("unknown area to update")}}function getTableName(e){var t="";var n=e.split("/");for(var r=0;r<n.length;r++){if(n[r]===versionNumber){t=n[r+1]}}return t.toLowerCase()}function getPayStyle(){var e;var t;var n=[0,0,0,0];$clientFormPayRateInput.each(function(){if($(this).val()!==""){e=$(this).attr("id")}});switch(e){case"addClientFormPerDayInput":t=$addClientFormPerDayInput.val();n=[t,1,0,0];break;case"addClientFormPerHourInput":t=$addClientFormPerHourInput.val();n=[t,0,1,0];break;case"addClientFormSetAmountInput":t=$addClientFormSetAmountInput.val();n=[t,0,0,1];break;default:}return n}function addClient(){var e=getPayStyle();var t=[0,$addClientFormNAME.val(),$addClientFormContactName.val(),$addClientFormContactNumber.val(),$addClientFormContactEmail.val(),e[0],e[1],e[2],e[3],$addClientFormPaysTravelInput.val(),$addClientFormPaysMileageInput.val(),localStorage.user];REST.method.addRecord(rootURL_clientProfile,t)}function removeClient(){if(LOGIN.checkIfUserIsLoggedIn()){var e=$clientId.val();if(e>-1){var t=confirm("Are you sure you wish to delete?");if(t){REST.method.deleteRecord(rootURL_clientProfile,e)}else{alert("Action aborted")}}}else{alert(ERROR_MSG_LOGIN)}}function updateClient(){if(LOGIN.checkIfUserIsLoggedIn()){var e=$clientId.val();if(e>-1){var t=confirm("Are you sure you wish to update?");if(t){var n=[];$.each(CLIENTS.returnClientList(),function(t,r){if(parseInt(e)===parseInt(r.idClientProfile)){n[0]=e;n[1]=$clientName.val()!==""?$clientName.val():r.clientName;n[2]=$clientContactName.val()!==""&&$clientContactName.val().trim()!=="-------"?$clientContactName.val():r.clientContactName;n[3]=$clientContactPhone.val()!==""&&$clientContactPhone.val().trim()!=="-------"?$clientContactPhone.val():r.clientContactNumber;n[4]=$clientContactEmail.val()!==""&&$clientContactEmail.val().trim()!=="-------"?$clientContactEmail.val():r.clientContactEmail;n[5]=$clientPay.val()!==""?$clientPay.val():r.clientRate;var i=$("#clientPayType option:selected").val();var s=[0,0,0];switch(i){case"Per Day":s[0]=1;break;case"Per Hour":s[1]=1;break;case"Flat Rate":s[2]=1;break}n[6]=s[0];n[7]=s[1];n[8]=s[2];n[9]=r.clientTravelRate;n[10]=r.clientMileageRate;n[11]=localStorage.user}});REST.method.updateRecord(rootURL_clientProfile,e,n)}else{alert("Action aborted")}}}else{alert(ERROR_MSG_LOGIN)}}function renderClientList(e){CLIENTS.saveClientList(e);CLIENTS.clearSelectedClient();CLIENTS.newClientForm.clearClientList();$.each(CLIENTS.returnClientList(),function(e,t){$clientList.append("<li id='client"+e+"'>"+t.clientName+"</li>")});clickList()}function populateSelected(e){addToSelectedAnimation();for(var t=0;t<7;t++){t===3?$("#selectedClient .clientSelectedWrap:nth-child("+(t+1)+")").html(e[t]):$("#selectedClient .clientSelectedWrap:nth-child("+(t+1)+")").val(e[t])}}function selectBg(e){$("#clientList li").removeClass("selectedClient");$(e).removeClass("evenSelected");$(e).addClass("selectedClient")}function clickList(){$("#clientList li").click(function(){selectBg(this);var e=$(this).text();$.each(CLIENTS.returnClientList(),function(t,n){if(e===n.clientName){var r=[];r[0]=n.idClientProfile;r[1]=n.clientName;r[2]=n.clientRate;var i=["<option value='Per Day'>Per Day</option>","<option value='Per Hour'>Per Hour</option>","<option value='Flat Rate'>Flat Rate</option>"];r[3]=i.toString().replace(",","");if(n.clientPerDay){r[3]=i.toString().replace(",","")}if(n.clientPerHour){i=[i[1],i[2],i[0]];r[3]=i.toString().replace(",","")}if(n.clientSetRate){i=[i[2],i[0],i[1]];r[3]=i.toString().replace(",","")}r[4]=n.clientContactName===""||n.clientContactName==="undefined"?" ------- ":n.clientContactName;r[5]=n.clientContactNumber===""||n.clientContactNumber==="undefined"?" ------- ":n.clientContactNumber;r[6]=n.clientContactEmail===""||n.clientContactEmail==="undefined"?" ------- ":n.clientContactEmail;populateSelected(r);return false}})})}function addLoadingImage(){$("#clientList").append("<li>Loading...</li>")}function showAddNewClientForm(){if(LOGIN.checkIfUserIsLoggedIn()){HEADER.hideAll();$addClientFormInput.val("");$addClientForm.show("fast")}else{alert(ERROR_MSG_LOGIN)}}function addToSelectedAnimation(){$(".clientSelectedWrapAnimate").animate({height:"20px"},150,function(){$(".clientSelectedWrapAnimate").animate({height:"30px"},100)})}function clearInput(){$selectedClient_input.val("");$("#clientPayType").empty()}function clearOtherRateValues(){$clientFormPayRateInput.val("")}function hidePayRateInputs(){$clientFormPayRateInput.hide()}function showPayRateSelected(e){$(e).parent().parent().children().children().show("fast")}function hidePayMileageInput(){$mileageInputWrap_span.hide();$addClientFormPaysMileageInput.hide()}function hidePayTravelInput(){$paysTravelInputWrap_span.hide();$addClientFormPaysTravelInput.hide()}function clearClientList(){$clientList.empty()}function hideAllForms(){$form.hide()}function headerMenuSelection(e){HEADER.hideAll();HEADER.show(e)}function showForm(e){$(".form:nth-child("+(e+1)+")").show("fast");if(e===0){WORKLOG.clearWorkLog();if(LOGIN.checkIfUserIsLoggedIn()){workLogAdded=false;WORKLOG.getWorkEntries(localStorage.user)}}else if(e===1){CLIENTS.clearSelectedClient();CLIENTS.newClientForm.clearClientList();if(LOGIN.checkIfUserIsLoggedIn()){CLIENTS.loadingImage();CLIENTS.findAllClients(localStorage.user)}}else if(e===2){LOGIN.selectLogin(null)}}function headerMenuSwitch(){var e="-70px";$expandMenuTab_tabText.hide();if(menuPosition===0){menuPosition++;$header.css("margin-top","0");$header.css("box-shadow","35px 2px 0px 10px rgba(0,0,0,.5)");$expandMenuTab_tabText.text("-").fadeIn("fast")}else{menuPosition--;$header.css("margin-top",e);$header.css("box-shadow","30px 12px 0px 10px rgba(0,0,0,.5)");$expandMenuTab_tabText.text("+").fadeIn("fast")}}function checkForLoggedInUser(){if(LOGIN.checkIfUserIsLoggedIn()){loginUser(localStorage.user)}}function login(e){REST.method.findRecord(rootURL_users,e);showMainLogin($createNewAccount)}function makeNewUser(){var e=[$loginInput_id.val(),$PasswordConfirmInput.val(),1];REST.method.addRecord(rootURL_users,e);setTimeout(function(){login($loginInput_id.val())},500)}function checkForUserLogin(e){var t=typeof e!=="undefined"?true:false;var n=0;if(t){$.each(e,function(e,t){if(isNaN(e)){return false}if(n>0){return false}n++});var r=n<1?true:false;if(r){if(storage){var i=$PasswordInput.val();var s=e.password;var o=e.username;$.ajax({type:GET,url:rootURL_users+"/user/"+i+"/"+o,dataType:"html",success:function(e){if(e===s){localStorage.user=o;loginUser(localStorage.user)}else{alert("password is not correct")}},error:function(e,t,n){alert("server error - please enter login and password"+e.toString()+" "+t.toString()+" "+n.toString())}});localStorage.user=o}}else{userNotFound()}LOGIN.clearInputs()}else{userNotFound()}}function loginUser(e){CLIENTS.clearSelectedClient();CLIENTS.newClientForm.clearClientList();CLIENTS.loadingImage();CLIENTS.findAllClients(e);WORKLOG.getWorkEntries(e);buildHeaderLoginName(e)}function routeLoginForm(e){switch($(e).val()){case"Login":LOGIN.login($loginInput_id.val());break;case"Create New User":LOGIN.addUser();break;case"Send Info":alert("sending info");break;default:alert("unknown - loginform submit click")}}function buildHeaderLoginName(e){if(e==="undefined"){var t=e.indexOf("@");if(t!==-1){e=e.substring(0,t)}$headerOptionThree.text("Login")}else{$headerOptionThree.text(e)}}function userNotFound(){$headerOptionThree.text("Login");localStorage.user="undefined";alert("User Not found")}function showSelectedLoginForm(e){if(e===null){showMainLogin($createNewAccount)}else{var t=$(e).attr("id");switch(t){case"createNewAccount":if(createUserSwitch){showCreateNewUser(e);createUserSwitch=false}else{showMainLogin(e);createUserSwitch=true}break;case"getAccount":showOnlyLoginInput();break;default:showLoginAndPasswordInput()}}}function showOnlyLoginInput(){$loginInputWrapper.hide();$submit.val("Send Info").css("width","70%")}function showMainLogin(e){$(e).text("Create New User");showLoginAndPasswordInput();$submit.val("Login").css("width","80%")}function showLoginAndPasswordInput(){$loginInputWrapper_id.show();$passwordWrapper.show();$confirmPasswordWrapper.hide()}function showCreateNewUser(e){$(e).text("Back to login");$loginInputWrapper_id.show();$passwordWrapper.show();$confirmPasswordWrapper.show();$submit.val("Create New User").css("width","170px")}function validateLogin(){var e=true;$loginInput.each(function(){if($(this).is(":visible")&&$(this).val()===""){e=false;$(this).keyup(function(){$(this).removeClass("loginValidate");switch($(this).attr("id")){case"loginInput":$(this).attr("placeholder",INPUT_LOGIN);break;case"PasswordInput":$(this).attr("placeholder",INPUT_PASS);break;case"PasswordConfirmInput":$(this).attr("placeholder",INPUT_CONFIRM_PASS);break;default:alert("unknown - loginform submit click -- "+$(this).attr("id"))}});$(this).addClass("loginValidate");$(this).attr("placeholder","required")}else{$(this).removeClass("loginValidate")}});return e}function populateWorkLog(e){WORKLOG.clearWorkLog();$.each(e,function(e,t){$("#workLog #wlEntries tr:nth-child(1)").before("<tr>"+"<td>"+"<input type='date' id='wlStartDate"+e+"' class='workLogStartDate dateSelect' value='"+t.worklogStartdate+"'>"+"</td>"+"<td>"+"<input type='date' id='wlEndDate"+e+"' class='workLogEndDate dateSelect' value='"+t.worklogEnddate+"'>"+"</td>"+"<td>"+"<select id='wlClientOption"+e+"' class='wlClientOption'>"+buildClientDropDown(t.worklogClient)+"</select>"+"</td>"+"<td>"+"<div id='wlOptionButton"+e+"' class='wloptionsBtn' title='options'></div>"+"<div id='wlRemoveButton"+e+"' class='wlRemoveBtn' title='remove'></div>"+"<input type='hidden' id='workLogid"+e+"' value='"+t.worklogId+"'/>"+"<input type='hidden' id='workLogHours"+e+"' value='"+t.worklogHours+"'/>"+"<input type='hidden' id='workLogTravel"+e+"' value='"+t.worklogTravel+"'/>"+"<input type='hidden' id='workLogMileage"+e+"' value='"+t.worklogMileage+"'/>"+"</td>"+"</tr>");displayCounter=e+1})}function addWorkLogEntry(){if(LOGIN.checkIfUserIsLoggedIn()){if(!workLogAdded){workLogAdded=true;$("#workLog #wlEntries tr:nth-child(1)").before("<tr>"+"<td>"+"<input type='date' id='wlStartDate"+displayCounter+"' class='workLogStartDate dateSelect'>"+"</td>"+"<td>"+"<input type='date' id='wlEndDate"+displayCounter+"' class='workLogEndDate dateSelect'>"+"</td>"+"<td>"+"<select id='wlClientOption"+displayCounter+"' class='wlClientOption'>"+buildClientDropDown()+"</select>"+"</td>"+"<td>"+"<div id='wlOptionButton"+displayCounter+"' class='wloptionsBtn' title='options'></div>"+"<div id='wlRemoveButton"+displayCounter+"' class='wlRemoveBtn' title='remove'></div>"+"</td>"+"</tr>");displayCounter++}else{alert("please save work log before adding a new one")}}else{alert(ERROR_MSG_LOGIN)}}function buildClientDropDown(e){if(e==="undefined"||typeof e==="undefined"){e=""}var t="<option value='0'>"+e+"</option>";$.each(CLIENTS.returnClientList(),function(e,n){t+="<option value='"+(e+1)+"'>"+n.clientName+"</option>"});return t}function saveWorkLog(){if(LOGIN.checkIfUserIsLoggedIn()){var e=$("#wlStartDate"+(displayCounter-1)).val();var t=$("#wlEndDate"+(displayCounter-1)).val();var n=$("#wlClientOption"+(displayCounter-1)+" option:selected").text();var r=$("#hoursInput").val();var i=findPayType(n);var s=false;if(i==="hour"){if(r===""){s=true}}if(e===""||t===""||n===""||s){alert("please enter all information for work log")}else{if(workLogAdded){workLogAdded=false;var o=[0,0,0,0];$worklogOptionCheckBox.each(function(e){if($(this).is(":checked")){o[e]=1}else{o[e]=0}});var u=[e,t,n,localStorage.user,r,o[0],o[1]];REST.method.addRecord(rootURL_workLog,u)}else{alert("no changes have been made")}}}else{alert(ERROR_MSG_LOGIN)}}function removeWorklog(e){if(e.length>1){e=e.substring(e.length-1,e.length)}e=$("#workLogid"+e).val();if(!workLogAdded){REST.method.deleteRecord(rootURL_workLog,e)}else{workLogAdded=false;WORKLOG.clearWorkLog()}WORKLOG.getWorkEntries(localStorage.user)}function populateSelectedWorkLog(e){selectBg(e)}function clickMenulLogList(){$workLog_tr.click(function(){$workLog_tr.children().removeClass("selectedItem");$(this).children().addClass("selectedItem")})}function showWLOptionsMenu(e){clientSelected=e;hideOptionDetails();resetMenuOptions();$worklogOptionCheckBox.prop("checked",false);$worklogOptionCheckBox.each(function(){if($("#workLogTravel"+clientSelected).val()==="true"){$checkBox1.prop("checked",true)}if($("#workLogMileage"+clientSelected).val()==="true"){$checkBox2.prop("checked",true)}});if(sideMenuSwitch){$optionsMenu.css("width","150px");sideMenuSwitch=false}else{$optionsMenu.css("width","0px");sideMenuSwitch=true}}function showWorkLogExtraOptions(){$workLogExtraOptions.hide();$worklogOptionCheckBox.each(function(){if(isChecked(this)){var e=$(this).attr("id");switch(e){case"checkBox1":$WLDetailsTravel.show("fast");break;case"checkBox2":$WLDetailsMileage.show("fast");break;case"checkBox3":break;case"checkBox4":break}}})}function isChecked(e){return $(e).is(":checked")}function findPayRate(e){var t=0;$.each(CLIENTS.returnClientList(),function(n,r){if(e===r.clientName){t=r.clientRate}});return t}function findPayType(e){var t="";$.each(CLIENTS.returnClientList(),function(n,r){if(e===r.clientName){if(r.clientPerDay){t="day"}if(r.clientPerHour){t="hour"}if(r.clientSetRate){t="flat"}}});return t}function dateDiffInDays(e,t){var n=new Date(e);var r=new Date(t);var i=r-n;return Math.abs(i)/(24*60*60*1e3)}function buildOptionsDetail(e){$WLDetailsClientName.text(e[0]);$WLDetailsStartDate.text(e[1]);$WLDetailsEndDate.text(e[2]);$WLDetailsTimeWorkedAmount.text(e[3]);$WLDetailsPayRateAmount.text(e[4]);$WLDetailsTotalAmount.text(e[5])}function resetMenuOptions(){$optionsMenu.css("width","150px");$optionsMenu_li.css("text-align","center");$optionsMenu_li.css("padding-left","0px")}function showOptionDetails(){$optionsMenuDetails.css("left","30%").css("width","70%")}function hideOptionDetails(){$optionsMenuDetails.css("left","100%").css("width","0%")}function clearWorkLog(){$("#workLog #wlEntries tr").empty();$("#hoursInput").val("")}function convertToJSON(e,t){var n=getTableName(e);var r={};switch(n){case"clientprofiles":r=convertClientToJSON(t);break;case"users":r=convertUserToJSON(t);break;case"authorities":break;case"worklogs":r=convertWorkLogToJSON(t);break;default:alert("unknown table to update")}return r}function convertClientToJSON(e){return JSON.stringify({idClientProfile:e[0],clientName:e[1],clientContactName:e[2],clientContactNumber:e[3],clientContactEmail:e[4],clientRate:e[5],clientPerDay:e[6],clientPerHour:e[7],clientSetRate:e[8],clientTravelRate:e[9],clientMileageRate:e[10],clientTimestamp:new Date,clientUserId:e[11]})}function convertUserToJSON(e){return JSON.stringify({username:e[0],password:e[1],enabled:e[2],userTimestamp:new Date,authoritiesCollection:""})}function convertWorkLogToJSON(e){return JSON.stringify({worklogId:0,worklogStartdate:e[0],worklogEnddate:e[1],worklogClient:e[2],worklogUsername:e[3],worklogHours:e[4],worklogTravel:e[5],worklogMileage:e[6]})}function getTableName(e){var t="";var n=e.split("/");if(n.length>1){for(var r=0;r<n.length;r++){if(n[r]===versionNumber){t=n[r+1];r=n.length}}}else{t=e}return t.toLowerCase()}var versionNumber="v1";var rootURL_clientProfile=rootURL_clientProfile||"http://localhost:8080/JobTracker/api/v1/clientProfiles";var rootURL_authorities=rootURL_authorities||"http://localhost:8080/JobTracker/api/v1/authorities";var rootURL_workLog=rootURL_workLog||"http://localhost:8080/JobTracker/api/v1/worklogs";var rootURL_users=rootURL_users||"http://localhost:8080/JobTracker/api/v1/users";var JOBTRACKER=JOBTRACKER||{};var HEADER=HEADER||{};var WORKLOG=WORKLOG||{};var CLIENTS=CLIENTS||{};var LOGIN=LOGIN||{};var REST=REST||{};var ERROR_MSG_LOGIN="Please login to use this feature.";var GET="GET";var DELETE="DELETE";var POST="POST";var PUT="PUT";var INPUT_LOGIN=" login@email.com";var INPUT_PASS=" password";var INPUT_CONFIRM_PASS=" confirm password";var CONFIRM_DELETE="Are you sure you want to delete this record?";var storage=typeof Storage!=="undefined"?true:false;var $form=$(".form"),$header=$("header"),$expandMenuTab_tabText=$("#expandMenuTab #tabText");var $loginInput=$(".loginInput"),$loginWrapper=$("#loginWrapper"),$createNewAccount=$("#createNewAccount"),$PasswordConfirmInput=$("#PasswordConfirmInput"),$PasswordInput=$("#PasswordInput"),$loginInput_id=$("#loginInput"),$headerOptionThree=$("#headerOptionThree"),$loginInputWrapper=$(".loginInputWrapper"),$loginInputWrapper_id=$("#loginInputWrapper"),$passwordWrapper=$("#passwordWrapper"),$confirmPasswordWrapper=$("#confirmPasswordWrapper"),$submit=$("#submit");var $addClientFormPaysMileageInput=$("#addClientFormPaysMileageInput"),$addClientFormPaysTravelInput=$("#addClientFormPaysTravelInput"),$addClientFormPerDayInput=$("#addClientFormPerDayInput"),$addClientFormPerHourInput=$("#addClientFormPerHourInput"),$addClientFormSetAmountInput=$("#addClientFormSetAmountInput"),$addClientFormNAME=$("#addClientFormNAME"),$addClientFormContactName=$("#addClientFormContactName"),$addClientFormContactNumber=$("#addClientFormContactNumber"),$addClientFormContactEmail=$("#addClientFormContactEmail"),$addClientFormInput=$(".addClientFormInput"),$addClientForm=$("#addClientForm"),$clientPay=$("#clientPay"),$clientContactName=$("#clientContactName"),$clientContactPhone=$("#clientContactPhone"),$clientContactEmail=$("#clientContactEmail");var $clientFormPayRateInput=$(".clientFormPayRateInput"),$clientList=$("#clientList"),$clientName=$("#clientName"),$clientId=$("#clientId");var $mileageInputWrap_span=$("#mileageInputWrap span"),$paysTravelInputWrap_span=$("#paysTravelInputWrap span"),$selectedClient_input=$("#selectedClient input");var $worklogOptionCheckBox=$(".worklogOptionCheckBox"),$WLDetailsClientName=$("#WLDetailsClientName"),$WLDetailsStartDate=$("#WLDetailsStartDate"),$WLDetailsEndDate=$("#WLDetailsEndDate"),$WLDetailsTimeWorkedAmount=$("#WLDetailsTimeWorkedAmount"),$WLDetailsPayRateAmount=$("#WLDetailsPayRateAmount"),$WLDetailsTotalAmount=$("#WLDetailsTotalAmount"),$workLogExtraOptions=$(".workLogExtraOptions"),$optionsMenu=$("#optionsMenu"),$optionsMenu_li=$("#optionsMenu li"),$optionsMenuDetails=$(".optionsMenuDetails"),$optionsMenuDetails_id=$("#optionsMenuDetails"),$WLDetailsTravel=$("#WLDetailsTravel"),$WLDetailsMileage=$("#WLDetailsMileage"),$hoursInput=$("#hoursInput"),$workLog_tr=$("#workLog tr"),$checkBox1=$("#checkBox1"),$checkBox2=$("#checkBox2"),$daysDisplay=$("#daysDisplay");var $expandMenuTab=$("#expandMenuTab"),$headerOption=$(".headerOption");var $addNewClientButton=$("#addNewClientButton"),$updateClientButton=$("#updateClientButton"),$removeClientButton=$("#removeClientButton"),$addClientFormSubmit=$("#addClientFormSubmit"),$addClientFormPaysTravel=$("#addClientFormPaysTravel"),$addClientFormPaysMileage=$("#addClientFormPaysMileage"),$clientFormPayRate=$(".clientFormPayRate");var $wlNewBtn=$("#wlNewBtn"),$workLog=$("#workLog"),$wlSaveBtn=$("#wlSaveBtn");var $loginForm_submit=$("#loginForm #submit"),$getAccount=$("#getAccount");$(function(){HEADER.hideAll();CLIENTS.newClientForm.hideRateInputs();CLIENTS.newClientForm.hideTravel();CLIENTS.newClientForm.hideMileage();LOGIN.isLoggedIn()});$(function(){$expandMenuTab.click(function(){HEADER.animateHeader()});$headerOption.click(function(){HEADER.headerSelection($(this).index())});$addNewClientButton.click(function(){CLIENTS.newClientForm.show()});$updateClientButton.click(function(){CLIENTS.updateClient()});$removeClientButton.click(function(){CLIENTS.removeClient()});$addClientFormSubmit.click(function(){CLIENTS.addClient()});$addClientFormPaysTravel.change(function(){$(this).is(":checked")?CLIENTS.newClientForm.showPayRate(this):CLIENTS.newClientForm.hideTravel()});$addClientFormPaysMileage.change(function(){$(this).is(":checked")?CLIENTS.newClientForm.showPayRate(this):CLIENTS.newClientForm.hideMileage()});$clientFormPayRate.change(function(){CLIENTS.newClientForm.clearRateValues();CLIENTS.newClientForm.hideRateInputs();CLIENTS.newClientForm.showPayRate(this)});$wlNewBtn.click(function(){WORKLOG.addNewWorkLog()});$workLog.on("click",".wloptionsBtn",function(){var e=$(this).attr("id");WORKLOG.options.show(e.charAt(e.length-1))});$workLog.on("click",".wlRemoveBtn",function(){if(confirm(CONFIRM_DELETE)){WORKLOG.removeWorkLog($(this).attr("id"))}});$wlSaveBtn.click(function(){WORKLOG.saveWorkLog()});$loginForm_submit.click(function(){LOGIN.validate(this)});$createNewAccount.click(function(){LOGIN.selectLogin(this)});$getAccount.click(function(){LOGIN.selectLogin(this)})});REST.method={findAll:function(e){$.ajax({type:GET,url:e,dataType:"json",success:function(t){success(GET,e,t)},error:function(e,t,n){error(GET,t)}})},deleteRecord:function(e,t){$.ajax({type:DELETE,url:e+"/"+t,dataType:"json",success:function(){success(DELETE,e,"")},error:function(e,t,n){error(DELETE,t)}})},addRecord:function(e,t){$.ajax({type:POST,contentType:"application/json",url:e,dataType:"json",data:JOBTRACKER.dao.convertToJSON(e,t),success:function(t,n,r){success(POST,e,t)},error:function(e,t,n){error(POST,t)}})},updateRecord:function(e,t,n){$.ajax({type:PUT,contentType:"application/json",url:e+"/"+t,dataType:"json",data:JOBTRACKER.dao.convertToJSON(e,n),success:function(t,n,r){success(PUT,e,t)},error:function(e,t,n){error(PUT,t)}})},findRecord:function(e,t){$.ajax({type:GET,url:e+"/"+t,dataType:"json",success:function(t,n,r){success(GET,e,t)},error:function(e,t,n){error(GET,t)}})}};CLIENTS={saveClientList:function(e){localStorage.setItem("clients",JSON.stringify(e))},returnClientList:function(){return JSON.parse(localStorage.getItem("clients"))},findAllClients:function(e){REST.method.findAll(rootURL_clientProfile+"/clients/"+e)},addClient:function(){addClient()},updateClient:function(){updateClient()},removeClient:function(){removeClient()},selectClient:function(){},clearSelectedClient:function(){clearInput()},buildClientList:function(e){renderClientList(e)},loadingImage:function(){addLoadingImage()},validate:function(){}};CLIENTS.newClientForm={show:function(){showAddNewClientForm()},clearRateValues:function(){clearOtherRateValues()},hideRateInputs:function(){hidePayRateInputs()},showPayRate:function(e){showPayRateSelected(e)},hideMileage:function(){hidePayMileageInput()},hideTravel:function(){hidePayTravelInput()},clearClientList:function(){clearClientList()}};var menuPosition=0;HEADER={hideAll:function(){hideAllForms()},show:function(e){showForm(e)},headerSelection:function(e){headerMenuSelection(e)},animateHeader:function(){headerMenuSwitch()}};var createUserSwitch=true;LOGIN={login:function(e){login(e)},addUser:function(){makeNewUser()},isLoggedIn:function(){checkForLoggedInUser()},checkIfUserIsLoggedIn:function(){return localStorage.user!=="undefined"?true:false},clearInputs:function(){$loginInput.val("")},selectLogin:function(e){showSelectedLoginForm(e)},validate:function(e){if(validateLogin()){routeLoginForm(e)}},isValidUser:function(e){checkForUserLogin(e)}};var displayCounter=0;var workLogAdded=false;WORKLOG={addNewWorkLog:function(){addWorkLogEntry()},saveWorkLog:function(){saveWorkLog()},removeWorkLog:function(e){removeWorklog(e)},getWorkEntries:function(e){REST.method.findAll(rootURL_workLog+"/worklog/"+e)},saveHoursWorked:function(){},renderWorkLog:function(e){populateWorkLog(e)},clearWorkLog:function(){clearWorkLog()},calculateDaysWorked:function(e,t){return dateDiffInDays(e,t)},calculateTotal:function(e,t){return e*t},validateWorkLogSave:function(){validateWorkLogSave()},validate:function(){}};WORKLOG.options={show:function(e){showWLOptionsMenu(e)},hideDetails:function(){hideOptionDetails},showExtraOptions:function(){showWorkLogExtraOptions()}};WORKLOG.display={formatCurrency:function(e){return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}};var sideMenuSwitch=true;var clientSelected;$("#optionsMenu li:nth-child(1)").click(function(){$worklogOptionCheckBox.each(function(){$(this).prop("checked",false)});$optionsMenu.css("width","0px");sideMenuSwitch=true});var sideMenuExpandDetails=true;$("#optionsMenu li:nth-child(9)").click(function(){$workLogExtraOptions.hide();if(sideMenuExpandDetails){$optionsMenu_li.css("text-align","left");$optionsMenu.css("width","400px");WORKLOG.options.showExtraOptions();$worklogOptionCheckBox.change(function(){WORKLOG.options.showExtraOptions()});var e=0;var t=[];t[0]=$("#wlClientOption"+clientSelected+" option:selected").text();t[1]=$("#wlStartDate"+clientSelected).val();t[2]=$("#wlEndDate"+clientSelected).val();var n=findPayRate(t[0]);var r=findPayType(t[0]);switch(r){case"day":t[3]=WORKLOG.calculateDaysWorked(t[2],t[1]);e=t[3];$daysDisplay.text("Days: ");$hoursInput.hide();$("#optionMenuInnerDetails #WLDetailsTimeWorkedAmount").show();break;case"hour":$daysDisplay.text("Hours: ");$hoursInput.show();var i=$("#workLogHours"+clientSelected).val();$hoursInput.val(i);$("#optionMenuInnerDetails #WLDetailsTotalAmount").text();$hoursInput.keyup(function(){$("#optionMenuInnerDetails #WLDetailsTotalAmount").text($(this).val()*n)});$("#optionMenuInnerDetails #WLDetailsTimeWorkedAmount").hide();if(isNaN(i)||i===null){i=0}t[3]=i;e=t[3];break;case"flat":t[3]=WORKLOG.calculateDaysWorked(t[2],t[1]);e=1;$daysDisplay.text("Days: ");$hoursInput.hide();$("#optionMenuInnerDetails #WLDetailsTimeWorkedAmount").show();break}t[4]=WORKLOG.display.formatCurrency(n);t[5]=WORKLOG.display.formatCurrency(WORKLOG.calculateTotal(e,n));buildOptionsDetail(t);showOptionDetails();sideMenuExpandDetails=false}else{hideOptionDetails();resetMenuOptions();sideMenuExpandDetails=true}sideMenuSwitch=true});JOBTRACKER.dao={convertToJSON:function(e,t){return convertToJSON(e,t)},convertToJobTracker:function(e){},convertClientToJSON:function(e){return convertClientToJSON(e)},convertUserToJSON:function(e){convertUserToJSON(e)},convertWorkLogToJSON:function(e){convertWorkLogToJSON(e)}}
