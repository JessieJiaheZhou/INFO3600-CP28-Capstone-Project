var meetingName = localStorage.getItem("nextMeetingName");
let domain = "stage2.info3600cp28.net";
/* set meeting information */
let options = {
    roomName: meetingName,
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
/* Initialise api */
let api = new JitsiMeetExternalAPI(domain, options);
document.getElementById("ruuningMeeting").innerHTML=options.roomName;
var displayNameChanged = api.addEventListener('displayNameChange', function(params) {
    if (api.getLocalDisplayName() != null){
        localStorage.setItem("displayName", api.getLocalDisplayName());
        document.getElementById("displayName").value = localStorage.getItem("displayName");
        options.userInfo.displayName =localStorage.getItem("displayName");
        } 
});