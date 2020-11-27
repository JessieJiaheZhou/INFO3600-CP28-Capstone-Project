/* Declare pre-defined set of colors for thumbnail avatars */
const avatarColors = ["rgba(232,105,156,0.5)","rgba(255,198,155,0.5)","rgba(128,128,255,0.5)","rgba(105,232,194,0.5)","rgba(234,255,228,0.5)"];

/** 
* Function to insert participants' avatars for the meeting they are in
* creates affliated components including circle background and display name
*/
function insertAvatars() {
    var standbyMeetings = localStorage.getItem("standbyMeetings");
    standbyMeetings = JSON.parse(standbyMeetings);
    var len = avatarInMeeting.length;
    for (j = 0; j < len; j++) {
        var index = avatarInMeeting[j];
        var tmpAvatarWrapId = "avatar-wrap--" + standbyMeetings[index].replaceAll(" ", "_");
        let meetingContainer = document.getElementById(tmpAvatarWrapId);
        const participantsDisplayName = displayNameList[j];
        const pid = pidList[j];
        for (i = 0; i < participantsDisplayName.length; i++) {
            const avatar = document.createElement('div');
            avatar.className = 'participant-avatar';
            avatar.id = "participant--" + pid[i]
            var tmpTextId = "displayName--" + pid[i];
            var tmpBgId= "background--"+ pid[i];
            var tmpText = participantsDisplayName[i];
            var bgColor = getAvatarColor(pid[i]);
            avatar.innerHTML = `
            <div class="avatar-background" id=${tmpBgId} style="background-color:${bgColor};">
                <p class="displayName-text" id=${tmpTextId}">${tmpText}</p>
            </div>`;
            meetingContainer.append(avatar);
        }
    }
    return;
}

/**
* Function to decide the background color for particular user's avatar 
* @param {String} usr: the participantID
* returns array of avatar colours
*/
function getAvatarColor(usr){
    let colorIndex = 0;
    if (usr) {
        let nameHash = 0;
        for (const s of usr) {
            nameHash += s.codePointAt(0);
        }
        colorIndex = nameHash % avatarColors.length;
    }
    return avatarColors[colorIndex];
}