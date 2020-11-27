/** 
* Function to remove a meeting from the side menu 
* @param {String} _id: the id of the room which is being left 
*/
       
function leaveMeeting(_id){            
    var leavingRoomName = leaveThisMeeting(_id).replaceAll(" ","");
    removeAllThumbs();
    removeThumb(leavingRoomName);
    getParticipants(myData);
    insertMeetingThumb();
    insertAvatars();
}