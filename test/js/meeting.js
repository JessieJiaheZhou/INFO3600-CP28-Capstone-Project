document.body.innerHTML = `
<div id="myForm">
<form class="meeting-info-form" id = "meeting_form" name = "meeting_form"  action="" method="POST">
 {% csrf_token %}
    <div class="form-group">
        <p style="color: rgb(184, 199, 224);position:relative;top:25%;font-family: Arial;font-size: 78%;">
            User Name</p>
        <input type="text" name="userAlias" id="userAlias" value="linds" style="width:90%" maxLength="200" placeholder="Enter Your User Name..." class="form-control" >
    </div>
    <br><br><br><button class="joinmeetingbtn"id="meeting_form" name="meeting_form" value="Join" onclick="saveNewName();return false">Enter</button>
</form>
</div>
</div>

<form id = "leave-conference" name = "leave-conference"  action="" method="POST">
        {% csrf_token %}
        <input id = "meetingPID" type = "hidden" name = "meetingPID" value = default />
        <input type="submit" id="leave-conference" name="leave-conference" onclick="return leaveConference()" value="Leave Conference">
</form>

<p id="meetingList" style="display:none"></p>
<div class="active-meeting-list" id="meeting_list">
<div class="meeting-list-wrap" id="concurrent-wrap">
    </div>
</div>
    `;

var usrName = "init";
        var meetingNameToBe = "TheHogwartsGreatHall"
        let meetingInfo = {
            domain: "stage2.info3600cp28.net",
            meetingName: "TheHogwartsGreatHall",
            userName: localStorage.getItem("displayName")
        };
var my_data = [['Slytherin Dungeon'],['john+10485976','linda+92319283']];
var tester = localStorage.getItem("nextMeetingName");
let domain = meetingInfo.domain;
let options = {
    roomName: tester,
    width: "100%",
    height: '100%',
    parentNode: document.querySelector('#conferenceMeeting'),
    configOverwrite: {
        requireDisplayName: false,
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
    },
    userInfo: {
        displayName: localStorage.getItem('displayName')
    }
}
var mainSessionName = "TheHogwartsGreatHall";
var switchFromRoomName;
var _id = this._id;
var MAX_MEETINGS = 10;
var allDistinctMeetings = new Array();
var displayNameList = new Array();
var pidList = new Array();
var mockresult=new Array();
/** Names of all meetings that automatically set as thumbnail meetings **/
/** General information for the containers and buttosn */
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
var standbyMeetings = ["Slytherin Dungeon"];
const avatarColors = ["rgba(232,105,156,0.2)","rgba(255,198,155,0.2)","rgba(128,128,255,0.2)","rgba(105,232,194,0.2)","rgba(234,255,228,0.2)"];
function reset_all(){
    standbyMeetings = ["Slytherin Dungeon"];
    my_data = [['Slytherin Dungeon'],['john+10485976','linda+92319283']];
    mockresult=[];
}
function setContext(stb, data){
    my_data=data;
    standbyMeetings=stb;

}
function getParticipants() {
    displayNameList = [];
    pidList=[];
        var nameAndPid = my_data;
        allDistinctMeetings = nameAndPid[0];
        for (i=0;i< standbyMeetings.length;i++){
            var targetMeetingName = standbyMeetings[i];
            var current_meeting_names = new Array();
            var current_meeting_pid = new Array();
            
            for(j=0;j<allDistinctMeetings.length;j++){
                var compareStandby = targetMeetingName.localeCompare(allDistinctMeetings[j]);
                if(compareStandby==0){
                    var compareMain = targetMeetingName.localeCompare(options.roomName);
                    if(compareMain==0){
                        break;
                    }
                    const current_meeting = nameAndPid[j+1];
                    for (k = 0; k < current_meeting.length; k++) {
                        var current_participant = current_meeting[k].split("+");
                        current_meeting_names.push(current_participant[0]);
                        current_meeting_pid.push(current_participant[1]);
                    }
                    displayNameList.push(current_meeting_names);
                    pidList.push(current_meeting_pid);
                    break;
                }
            }
        }            

        document.getElementById("meetingList").innerHTML=standbyMeetings;
    }
function getdisplayNameList(){
    return displayNameList;
}
function getpidList(){
    return displayNameList;
}
function JitsiMeetExternalAPIMock(domain, options){
    mockresult=[domain,options];
}
function getMockResult(){
    return mockresult;
}
function renewAPI(id) {
    insert();
    var newSession = switchToMeeting(id);
    // return newSession;
    //api.dispose();
    options.roomName = newSession;
    
    var meetingNameToBe = newSession;
    localStorage.setItem("nextMeetingName", meetingNameToBe);
    localStorage.setItem("localName", meetingNameToBe);
    options.userInfo.displayName = localStorage.getItem("displayName");
    JitsiMeetExternalAPIMock(domain, options);
    var tester = localStorage.getItem("nextMeetingName");
    removeAllThumbs();
    getParticipants();
    insertMeetingThumb();
    insertAvatars();
}

/**
 * Upon requesting to leave a meeting, this function is called 
 * @param {String} _id meeting id (button id)
 */

function leaveThisMeeting(_id) {

    var roomId = _id.replace("leave-room", "roomThumb");
    var leavingMeeting = document.getElementById(roomId).innerHTML;
    var idx = standbyMeetings.indexOf(leavingMeeting);
    renewActiveMeetingList(idx);
    return leavingMeeting;
}

function leaveMeeting(_id){
    
    var leavingRoomName = 'SlytherinDungeon';
    removeAllThumbs();
    removeThumb(leavingRoomName);
    getParticipants();
    insertMeetingThumb();
    insertAvatars();
}

function leaveConference(){
    insert();
    localStorage.removeItem("displayName");
    localStorage.removeItem("nextMeetingName");
    document.getElementById("myForm").style.display = "block";
    document.getElementById('concurrent-wrap').style.display = "none";
    // if(api){
    //     api.dispose();
    // }
}
function getDispalyNameHelper(){
    var b = localStorage.getItem("displayName");
    return b;
}
function leaveConferenceMeetingNameHelper(){
    var b = localStorage.getItem("nextMeetingName");
    return b;
}

function getLocalDisplayName(){
    return "linze";
}

function updateNameTrigger() {
    if (getLocalDisplayName() != null){
        localStorage.setItem("displayName", getLocalDisplayName());
        document.getElementById("displayName").value = localStorage.getItem("displayName");
        options.userInfo.displayName =localStorage.getItem("displayName");
    } 
}

function insertMeetingThumb() {
    for (i=0;i<standbyMeetings.length;i++) {
        
        const meeting = document.createElement('div');
        meeting.className = 'idv-concurrent';
        //replaceALL not working
        meeting.id = "SlytherinDungeon";

        var tmp_roomName = standbyMeetings[i];
        var tmp_roomName_id = "roomThumb-" + i;
        var tmp_joinBtn_id = "join-room-" + i;
        var tmp_leaveBtn_id = "leave-room-" + i;
        //replaceall not working
        var tmp_avatarWrap_id = "avatar-wrap--Slytherin_Dungeon";
        var tmp_meetingName = "meetingName" + i;
        var tmp_meetingPID = "meetingPID" +i;
        var tmp_displayName = "displayName"+i;
        
        meeting.innerHTML=`
        <div class="meetingInfoWrap">
            <p class="onscreen-name" id=${tmp_roomName_id}>${tmp_roomName}</p>
            <div class="session-btn-container">
                <form name = ${tmp_joinBtn_id} id = ${tmp_joinBtn_id} action="" method="POST">
                    {% csrf_token %}
                    <input id = ${tmp_meetingName} type = "hidden" name = ${tmp_meetingName} value = ${tmp_roomName} />
                    <input id = ${tmp_meetingPID} type = "hidden" name = ${tmp_meetingPID} value = "OTHER" />
                    <input id = ${tmp_displayName} type = "hidden" name = ${tmp_displayName} value = "default" />
                    <input type="submit" class="join-btn" id=${tmp_joinBtn_id} name=${tmp_joinBtn_id} onclick="return renewAPI(this.id)" value="Join Meeting">
                    <input type="button" class="leave-btn" id=${tmp_leaveBtn_id} onclick="return leaveMeeting(this.id)" value="Leave Meeting">
                </form> 
            </div>
        </div>
        <div class="meetingAvatarWrap" id=${tmp_avatarWrap_id}></div>`;
        let wrapContainer = document.getElementById('concurrent-wrap');
            wrapContainer.append(meeting);
        }

    return;
}

function insertAvatars() {
    for (j = 0; j < standbyMeetings.length; j++) {
        var tmp_avatarWrap_id = 'avatar-wrap--Slytherin_Dungeon';
        let meetingContainer = document.getElementById(tmp_avatarWrap_id);
        var participantsDisplayName = displayNameList[j];
        if(participantsDisplayName==undefined){return"error"};
        const pid = pidList[j];
        for (i = 0; i < participantsDisplayName.length; i++) {
            const avatar = document.createElement('div');
            avatar.className = 'participant-avatar';
            avatar.id = "participant--" + pid[i]
            var tmp_text_id = "displayName--" + pid[i];
            var tmp_bg_id= "background--"+ pid[i];
            var tmp_text = participantsDisplayName[i];
            var bg_color = "rgba(232,105,156,0.2)";
            // style="transform:${name_position}
            avatar.innerHTML = `
            <div class="avatar-background" id=${tmp_bg_id} style="background-color:${bg_color};">
                <p class="displayName-text" id=${tmp_text_id}">${tmp_text}</p>
            </div>`;
            meetingContainer.append(avatar);
        }
    }
    return 1;
}

function removeAllThumbs(){
    for(i=0;i<standbyMeetings.length;i++){
        //replace all not working
        var tmp_roomName = 'SlytherinDungeon';
        const rm_container = document.getElementById(tmp_roomName);
        rm_container.remove();
    }
}

function removeThumb(str){
    //replaceall not working
    var tmp_roomName = 'SlytherinDungeon';
        const rm_container = document.getElementById(tmp_roomName);
        rm_container.remove();
}

function showPopupForm() {
    document.getElementById("myForm").style.display = "block";
}
function closePopupForm() {
    document.getElementById("myForm").style.display = "none";
}

function saveNewName() {
    localStorage.setItem('displayName', document.getElementById("userAlias").value);
    //api.executeCommand("displayName", localStorage.getItem("displayName"));
    document.getElementById("myForm").style.display = "none";
    document.getElementById('concurrent-wrap').style.display = "block";
}

if (localStorage.getItem("displayName") == "Merlin" || localStorage.getItem("displayName") == null){
    document.getElementById('concurrent-wrap').style.display = "none";
    showPopupForm();
}
else {
    closePopupForm();
}

function insert() {
    document.getElementById("meetingPID").value = localStorage.getItem("meetingPID");
    for(i=0;i<standbyMeetings.length;i++){
        var meetingName_id = "meetingName"+i;
        var displayName_id = "displayName"+i;
        var meetingPID_id = "meetingPID"+i;
        document.getElementById(meetingName_id).value = standbyMeetings[i];
        document.getElementById(displayName_id).value = localStorage.getItem("displayName");
        document.getElementById(meetingPID_id).value = localStorage.getItem("meetingPID");
    }
}

/**
 * Switch to meeting given the meeting id
 * @param {String} _id meeting id
 */
function switchToMeeting(_id) {

    switchToRoomName = "";
    switchFromRoomName = mainSessionName;

    //get index of clicked button for general switching case
    if (_id != -1) {
        clickedButtonID = _id;
        var index = clickedButtonID.replace(rawInfo.rawSwitchButtonID, "");
        index = parseInt(index);
        switchToRoomName = standbyMeetings[index];
        mainSessionName = switchToRoomName;
        standbyMeetings[index] = null;
        //return mainSessionName;
    } else {
        //when join a new meetings
        switchToRoomName = wantToJoin;
        mainSessionName = switchToRoomName;
    }
    //return mainSessionName;
    //change the meeting information in array 
    renewActiveMeetingList(-1);
    return mainSessionName;
}



/**
 * Upon requesting to leave or switch to a meeting, this function is called 
 * @param {int} num indicator of the calling function and corrsponding operation,
 * positive integer if leaving a meeting, -1 if switching between meetings
 */
function renewActiveMeetingList(num) {
    var len = standbyMeetings.length;
    var tmp_array = new Array();
    if (num == -1) {
        //when switching
        tmp_array.push(switchFromRoomName);
    } else {
        standbyMeetings[num] = null;
    }
    for (i = 0; i < len; i++) {
        if (standbyMeetings[i] != null) {
            tmp_array.push(standbyMeetings[i]);
        }
    }
    standbyMeetings = tmp_array;
}
function getstandbyMeetings(){
    return standbyMeetings;
}
/**
 * Retrieve the current API meeting name and renew the standby meeting list
 */
function getRunningMeeting() {
    var meet = document.getElementById("ruuningMeeting").innerHTML;
    mainSessionName = meet;
    var tmp_array = new Array();
    // console.log(standbyMeetings);
    for (i = 0; i < standbyMeetings.length; i++) {
        if (standbyMeetings[i].localeCompare(mainSessionName) != 0) {
            tmp_array.push(standbyMeetings[i]);
        }
    }
    standbyMeetings = tmp_array;
}

function initialization(){
    document.getElementById("ruuningMeeting").innerHTML=options.roomName;         
}

module.exports =  {
    getParticipants,
    renewAPI,
    leaveMeeting,
    leaveConference,
    getParticipants,
    insert,
    showPopupForm,
    closePopupForm,
    saveNewName,
    removeThumb,
    removeAllThumbs,
    insertAvatars,
    insertMeetingThumb,
    switchToMeeting,
    leaveThisMeeting,
    getRunningMeeting,
    renewActiveMeetingList,
    getpidList,
    getdisplayNameList,
    leaveConferenceMeetingNameHelper,
    getDispalyNameHelper,
    updateNameTrigger,
    reset_all,
    getMockResult,
    getstandbyMeetings,
    initialization,
    setContext,
    JitsiMeetExternalAPIMock
}