/******************************************************
 **********************MY CLIENTS PAGE******************
 ******************************************************/

CLIENTS = {
    saveClientList: function (data) {
        localStorage.setItem('clients', JSON.stringify(data));
    },
    returnClientList: function () {
        var list = localStorage.getItem("clients");
        return JSON.parse(list);
    },
    findAllClients: function (user) {
        REST.method.findAll(rootURL_clientProfile + "/clients/" + user);
    },
    addClient: function () {
        addClient();
    },
    updateClient: function(){
        updateClient();
    },
    removeClient: function(){
       removeClient(); 
    },
    selectClient: function () {

    },
    buildClientList:function(data){
        renderClientList(data);
    }
};


/* Returns a 4 spot array - the 1st spot is the $$ and then 1 of the three 
 * remaining positions is ticked with a 1, the rest with 0's...see below for 
 * corresponding spot ids
 */
function getPayStyle() {
    var payStyle;
    var rate;
    var rateAndType = [0, 0, 0, 0];
    $('.clientFormPayRateInput').each(function (i) {
        if ($(this).val() !== "") {
            payStyle = $(this).attr('id');
        }
    });
    switch (payStyle) {
        case "addClientFormPerDayInput":
            rate = $('#addClientFormPerDayInput').val();
            rateAndType = [rate, 1, 0, 0];
            break;
        case "addClientFormPerHourInput":
            rate = $('#addClientFormPerHourInput').val();
            rateAndType = [rate, 0, 1, 0];
            break;
        case "addClientFormSetAmountInput":
            rate = $('#addClientFormSetAmountInput').val();
            rateAndType = [rate, 0, 0, 1];
            break;
        default:
    }
    return rateAndType;
}

function addClient() {
    var rateAndType = getPayStyle();
    var clientInfo = [0,
        $('#addClientFormNAME').val(),
        $('#addClientFormContactName').val(),
        $('#addClientFormContactNumber').val(),
        $('#addClientFormContactEmail').val(),
        rateAndType[0],
        rateAndType[1],
        rateAndType[2],
        rateAndType[3],
        $('#addClientFormPaysTravelInput').val(),
        $('#addClientFormPaysMileageInput').val(),
        localStorage.user
    ];
    REST.method.addRecord(rootURL_clientProfile, clientInfo);
}

function removeClient() {
    if (LOGIN.checkIfUserIsLoggedIn()) {
        var id = $('#clientId').val();
        if (id > -1) {
            var remove = confirm("Are you sure you wish to delete?");
            if (remove) {
                REST.method.deleteRecord(rootURL_clientProfile, id);
            } else {
                alert("Action aborted");
            }
        }
    } else {
        alert(ERROR_MSG_LOGIN);
    }
}

function updateClient() {
    if (LOGIN.checkIfUserIsLoggedIn()) {
        var id = $('#clientId').val();
        if (id > -1) {
            var remove = confirm("Are you sure you wish to update?");
            if (remove) {
                var clientInfo = [];
                $.each(CLIENTS.returnClientList(), function(key,val){
                    if(parseInt(id) === parseInt(val.idClientProfile)){
                        clientInfo[0] = id;
                        clientInfo[1] = $('#clientName').val();
                        clientInfo[2] = val.clientContactName;
                        clientInfo[3] = val.clientContactNumber;
                        clientInfo[4] = val.clientContactEmail;
                        clientInfo[5] = val.clientRate;
                        clientInfo[6] = val.clientPerDay;
                        clientInfo[7] = val.clientPerHour;
                        clientInfo[8] = val.clientSetRate;
                        clientInfo[9] = val.clientTravelRate;
                        clientInfo[10] = val.clientMileageRate;
                        clientInfo[11] = localStorage.user;
                    }
                });
                REST.method.updateRecord(rootURL_clientProfile, id, clientInfo);
            } else {
                alert("Action aborted");
            }
        }
    } else {
        alert(ERROR_MSG_LOGIN);
    }
}

function renderClientList(data) {
    CLIENTS.saveClientList(data);
    clearInput();
    clearClientList();
    $.each(CLIENTS.returnClientList(), function (key, val) {
        $('#clientList').append("<li id='client" + key + "'>" + val.clientName + "</li>");
    });
    clickList();
}

//Adds the fields from client profile list to the selected input boxes
function populateSelected(val) {
    addToSelectedAnimation();
    $('#selectedClient input:nth-child(' + 1 + ')').val(val[0]);
    $('#selectedClient input:nth-child(' + 2 + ')').val(val[1]);
    $('#selectedClient input:nth-child(' + 3 + ')').val(val[2]);
    $('#selectedClient input:nth-child(' + 4 + ')').val(val[3]);
}

//Resets the background color of the clients list
function setClientListBg() {
    /*alert('umm')
     for (var i = 1; i < items.length; i += 2) {
     alert(i)
     $('#client' + i).addClass('evenSelected');
     }*/
}

//Select an item from client list
function selectBg(e) {
    // setClientListBg();
    $('#clientList li').removeClass('selectedClient');
    $(e).removeClass('evenSelected');
    $(e).addClass('selectedClient');
}

//Allows for dynamically added items to be assigned click - switch to .on later
function clickList() {
    $('#clientList li').click(function () {
        selectBg(this);
        var clientSelected = $(this).text();
        $.each(CLIENTS.returnClientList(), function (key, val) {
            if (clientSelected === val.clientName) {
                var clientSelectedInfo = [];
                clientSelectedInfo[0] = val.idClientProfile;
                clientSelectedInfo[1] = val.clientName;
                clientSelectedInfo[2] = val.clientRate;
                if(val.clientPerDay){
                     clientSelectedInfo[3] = "Per Day";
                }
                if(val.clientPerHour){
                     clientSelectedInfo[3] = "Per Hour";
                }
                if(val.clientSetRate){
                     clientSelectedInfo[3] = "Flat Rate";
                }
                populateSelected(clientSelectedInfo);
                return false;
            }
        });
    });
}

//Can be replaced with gif or something later to show something while info is loading
function addLoadingImage() {
    $('#clientList').append('<li>Loading...</li>');
}

function showAddNewClientForm() {
    if (LOGIN.checkIfUserIsLoggedIn()) {
        hideAllForms();
        $('.addClientFormInput').val("");
        $('#addClientForm').show('fast');
    } else {
        alert(ERROR_MSG_LOGIN);
    }
}

//adds a little bounce when client is added to selected client area
function addToSelectedAnimation() {
    $('#selectedClient input').animate({
        height: '20px'
    }, 200, function () {
        $('#selectedClient input').animate({
            height: '30px'
        }, 150);
    });
}

//Removes the selected client values from the boxes
function clearInput() {
    $('#selectedClient input').val('');
}