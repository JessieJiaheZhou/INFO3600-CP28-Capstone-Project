/** 
* function to remove all of the meeting thumbnails
*/
function removeAllThumbs(){
    var standbyMeetings = localStorage.getItem("standbyMeetings");
    standbyMeetings = JSON.parse(standbyMeetings);
    for(i=0;i<standbyMeetings.length;i++){
        var tmpRoomName = standbyMeetings[i].replaceAll(" ","");
        const rmContainer = document.getElementById(tmpRoomName);
        rmContainer.remove();
    }
}

/**
* Upon requesting to leave or switch to a meeting, this function is called 
* @param {String} str: the name of the meeting that require to remove corresponding thumbnail individually */
function removeThumb(str){
    var tmpRoomName = str.replaceAll(" ","");
        const rmContainer = document.getElementById(tmpRoomName);
        rmContainer.remove();
}

/** 
* Updates thumbnails periodically to ensure users have updated view of who is in which meeting 
* **/
function updateThmbnails(myData){  
    removeAllThumbs(); 
    getThumbnailData();   
    getParticipants(myData);  
    insertMeetingThumb();
    insertAvatars();
}