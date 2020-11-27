 /** 
* Function that facilitates switching to another meeting.
* @param {String} id: is the id of the meeting being switched into
* @param {String} myData: the array which contains information retrieved from SQL database
*/
function renewAPI(id, myData) {
    insert();
    var newSession = switchToMeeting(id);
    api.dispose();
    options.roomName = newSession;
    var meetingNameToBe = newSession;
    localStorage.setItem("nextMeetingName", meetingNameToBe);
    localStorage.setItem("localName", meetingNameToBe);
    options.userInfo.displayName = localStorage.getItem("displayName");
    api = new JitsiMeetExternalAPI(domain, options);
    removeAllThumbs();
    getParticipants(myData);
    insertMeetingThumb();
    insertAvatars();
}