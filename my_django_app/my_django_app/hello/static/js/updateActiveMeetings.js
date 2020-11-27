// _id: the id of the meeting the user is currently in
var _id = this._id;
// the maximum number of meetings a user can see (including the one they are in)
var MAX_MEETINGS = 10;

/** General information for the containers and buttons */
const rawInfo = {
    rawSwitchButtonID: "join-room-",
    rawLeaveButtonID: "leave-room-",
    rawstandbyMeetingsID: "screen-name-",
    rawMeetingListContainerID: "mContainer-",
    domain: "stage2.info3600cp28.net"
}

/** 
 * Global variables to store and pass button id and roomnames
 */
var clickedButtonID = "";
var switchToRoomName = "";
var switchFromRoomName = "";
var wantToJoin = "";

/**
 * Switch to meeting given the meeting id
 * @param {String} _id: meeting id
 * returns current meeting id
 */
function switchToMeeting(_id) {

    switchToRoomName = "";
    switchFromRoomName = mainSessionName;

    var standbyMeetings = localStorage.getItem("standbyMeetings");
    standbyMeetings = JSON.parse(standbyMeetings);

    // get index of clicked button for general switching case
    if (_id != -1) {
        clickedButtonID = _id;
        var index = clickedButtonID.replace(rawInfo.rawSwitchButtonID, "");
        index = parseInt(index);
        switchToRoomName = standbyMeetings[index];
        mainSessionName = switchToRoomName;
        standbyMeetings[index] = null;

        var tempArray = [];

        for (i = 0; i < standbyMeetings.length; i++) {
            if (standbyMeetings[i] != null) {
                tempArray.push(standbyMeetings[i]);
            }
        }
        standbyMeetings = JSON.stringify(tempArray);

        localStorage.removeItem("standbyMeetings");
        localStorage.setItem("standbyMeetings", standbyMeetings);

    } else {
        // when join a new meetings
        switchToRoomName = wantToJoin;
        mainSessionName = switchToRoomName;
    }

    // change the meeting information in array 
    renewActiveMeetingList(-1);

    return mainSessionName;
}


/**
 * Upon requesting to leave a meeting, this function is called 
 * @param {String} _id: meeting id (button id)
 * returns id of the meeting being left
 */
function leaveThisMeeting(_id) {

    var roomId = _id.replace("leave-room", "roomThumb");
    var leavingMeeting = document.getElementById(roomId).innerHTML;
    var standbyMeetings = localStorage.getItem("standbyMeetings");
    standbyMeetings = JSON.parse(standbyMeetings);

    var idx = standbyMeetings.indexOf(leavingMeeting);
    renewActiveMeetingList(idx);
    return leavingMeeting;
}

/**
 * Upon requesting to leave or switch to a meeting, this function is called 
 * @param {int} num: indicator of the calling function and corrsponding operation,
 * positive integer if leaving a meeting, -1 if switching between meetings
 */
function renewActiveMeetingList(num) {
    var standbyMeetings = localStorage.getItem("standbyMeetings");
    standbyMeetings = JSON.parse(standbyMeetings);
    var tempArray = [];

    if (num == -1 && switchFromRoomName != "") {
        //when switching
        tempArray.push(switchFromRoomName);

    } else {
        standbyMeetings[num] = null;
    }

    for (i = 0; i < standbyMeetings.length; i++) {
        if (standbyMeetings[i] != null) {
            tempArray.push(standbyMeetings[i]);
        }
    }

    standbyMeetings = JSON.stringify(tempArray);
    localStorage.setItem("standbyMeetings", standbyMeetings);
}

/**
 * Retrieve the current API meeting name and renew the standby meeting list
 */
function getRunningMeeting() {
    var meet = document.getElementById("ruuningMeeting").innerHTML;
    mainSessionName = meet;
    var tempArray = new Array();
    var standbyMeetings = localStorage.getItem("standbyMeetings");
    standbyMeetings = JSON.parse(standbyMeetings);
    for (i = 0; i < standbyMeetings.length; i++) {
        if (standbyMeetings[i].localeCompare(mainSessionName) != 0) {
            tempArray.push(standbyMeetings[i]);
        }
    }
    standbyMeetings = tempArray;
    standbyMeetings = JSON.stringify(standbyMeetings);
    localStorage.setItem("standbyMeetings", standbyMeetings);
}