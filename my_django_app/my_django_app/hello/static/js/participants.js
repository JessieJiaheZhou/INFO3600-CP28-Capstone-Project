/** 
    * Function to refresh the concurrent meeting list, along with corresponding parcitipants' displayName and participantID
    * compare all distinct roomNames that stored in SQL database with user's desired concurrent meetings
    * if matched, obtain the corresponding participants' information whom in the meeting
    * store into local arrays
    * @param {String} myData: the array which contains information retrieved from SQL database
    */
function getParticipants(myData) {
    displayNameList = [];
    pidList=[];
    var nameAndPid = myData;
    allDistinctMeetings = nameAndPid[0];
    var standbyMeetings = localStorage.getItem("standbyMeetings");
    avatarInMeeting = [];
    standbyMeetings = JSON.parse(standbyMeetings);
    for (i=0;i< standbyMeetings.length;i++){
        var targetMeetingName = standbyMeetings[i];
        var currentMeetingNames = new Array();
        var currentMeetingPid = new Array();            
        for(j=0; j<allDistinctMeetings.length; j++){
            var compareStandby = targetMeetingName.localeCompare(allDistinctMeetings[j]);
            if(compareStandby==0){
                var compareMain = targetMeetingName.localeCompare(options.roomName);
                if(compareMain==0){
                    break;
                }
                avatarInMeeting.push(i);
                const currentMeeting = nameAndPid[j+1];
                for (k = 0; k < currentMeeting.length; k++) {
                    var currentParticipant = currentMeeting[k].split("+");
                    currentMeetingNames.push(currentParticipant[0]);
                    currentMeetingPid.push(currentParticipant[1]);
                }
                displayNameList.push(currentMeetingNames);
                pidList.push(currentMeetingPid);
                break;
            }
        }
    }
    document.getElementById("meetingList").innerHTML=standbyMeetings;
}