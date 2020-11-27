    /** 
    * Function to insert thumbnails of all the concurrent meetings
    * creates affliated components including meeting name, switching and leaving button, and a wrapping container for individual avatars
    * if matched, obtain the corresponding participants' information whom in the meeting and display in the innerHTML element
    * store into local arrays
    */
    function insertMeetingThumb() {
        var standbyMeetings = localStorage.getItem("standbyMeetings");
        standbyMeetings = JSON.parse(standbyMeetings);
        for (i=0;i<standbyMeetings.length;i++) {
            const meeting = document.createElement('div');
            meeting.className = 'idv-concurrent';
            meeting.id = standbyMeetings[i].replaceAll(" ", "");
            var tmpRoomName = standbyMeetings[i];
            var tmpRoomNameId = "roomThumb-" + i;
            var tmpJoinBtnId = "join-room-" + i;
            var tmpLeaveBtnId = "leave-room-" + i;
            var tmpAvatarWrapId = "avatar-wrap--" + tmpRoomName.replaceAll(" ", "_");
            var tmpMeetingName = "meetingName" + i;
            var tmpMeetingPID = "meetingPID" +i;
            var tmpDisplayName = "displayName"+i;
            meeting.innerHTML=`
                <div class="meetingInfoWrap">
                    <p class="onscreen-name" id=${tmpRoomNameId}>${tmpRoomName}</p>
                    <div class="session-btn-container">
                        <form name = ${tmpJoinBtnId} id = ${tmpJoinBtnId} action="" method="POST">
                            {% csrf_token %}
                            <input id = ${tmpMeetingName} type = "hidden" name = ${tmpMeetingName} value = ${tmpRoomName} />
                            <input id = ${tmpMeetingPID} type = "hidden" name = ${tmpMeetingPID} value = "OTHER" />
                            <input id = ${tmpDisplayName} type = "hidden" name = ${tmpDisplayName} value = "default" />
                            <input type="submit" class="join-btn" id=${tmpJoinBtnId} name=${tmpJoinBtnId} onclick="return renewAPI(this.id)" value="Join Meeting">
                            <input type="button" class="leave-btn" id=${tmpLeaveBtnId} onclick="return leaveMeeting(this.id, myData)" value="Leave Meeting">
                        </form> 
                    </div>
                </div>
                <div class="meetingAvatarWrap" id=${tmpAvatarWrapId}></div>`;
                let wrapContainer = document.getElementById('concurrent-wrap');
                    wrapContainer.append(meeting);
                }
            return;
        }
