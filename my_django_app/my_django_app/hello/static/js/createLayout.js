/**
* Ensures that when the user has not put in a display name, the conference and sidebar are not
* displayed and the correct nav bar is visible
*/
if (localStorage.getItem("displayName") == "Merlin" || localStorage.getItem("displayName") == null){
    document.getElementById('concurrent-wrap').style.display = "none";
    document.getElementById('conferenceMeeting').style.display = "none";
    document.getElementById('navbar-prejoin').style.display = "block";
    document.getElementById('navbar-postjoin').style.display = "none";
    showPopupForm();
    }
    else {
        closePopupForm();
    }

/**
* Function to insert in correct values (meeting name, participant display name, participant id) 
* to join meeting forms (values to be submitted to database)
*/
function insert() {
    document.getElementById("meetingPID").value = localStorage.getItem("meetingPID");
    var standbyMeetings = localStorage.getItem("standbyMeetings");
    standbyMeetings = JSON.parse(standbyMeetings);
    for(i=0;i<standbyMeetings.length;i++){
        var meetingNameId = "meetingName"+i;
        var displayNameId = "displayName"+i;
        var meetingPidId = "meetingPID"+i;
        document.getElementById(meetingNameId).value = standbyMeetings[i];
        document.getElementById(displayNameId).value = localStorage.getItem("displayName");
        document.getElementById(meetingPidId).value = localStorage.getItem("meetingPID");
    }
}