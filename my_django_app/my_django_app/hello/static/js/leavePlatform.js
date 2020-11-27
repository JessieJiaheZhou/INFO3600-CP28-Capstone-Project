/** 
* Function gets called when leaving the whole conference by clicking on the button on the nav bar
*/
function leaveConference(){
    insert();
    localStorage.removeItem("displayName");
    localStorage.removeItem("nextMeetingName");
    document.getElementById('concurrent-wrap').style.display = "none";
    if(api){
        api.dispose();
    }
    var standbyMeetings = ["Slytherin Dungeon", "Gryffindor Tower", "Hufflepuff Basement", "Ravenclaw Tower", "The Hogwarts Library", "The Arts Classroom", "The Chamber Of Secrets", "The Room Of Requirement", "The Astronomy Room", "The Headmaster Office"];
    standbyMeetings = JSON.stringify(standbyMeetings);
    localStorage.setItem("standbyMeetings", standbyMeetings);
}