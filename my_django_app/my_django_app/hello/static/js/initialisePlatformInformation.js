/* store all active meeting names in local storage */
if (localStorage.getItem("standbyMeetings") == null){
    var standbyMeetings = ["Slytherin Dungeon", "Gryffindor Tower", "Hufflepuff Basement", "Ravenclaw Tower", "The Hogwarts Library", "The Arts Classroom", "The Chamber Of Secrets", "The Room Of Requirement", "The Astronomy Room", "The Headmaster Office"];
    standbyMeetings = JSON.stringify(standbyMeetings);
    localStorage.setItem("standbyMeetings", standbyMeetings);
}

/* set the default display name */
if (localStorage.getItem("displayName") == null){
    localStorage.setItem("displayName", "Merlin");
}

 /* set the default participant id */
if(localStorage.getItem("meetingPID") == null) {
    localStorage.setItem("meetingPID", Math.floor((Math.random() * 100000000) + 1));
}

/* Create arrays that store the roomName, corresponding displayName and PID */
var allDistinctMeetings = new Array();
var avatarInMeeting = new Array();
var displayNameList = new Array();
var pidList = new Array();