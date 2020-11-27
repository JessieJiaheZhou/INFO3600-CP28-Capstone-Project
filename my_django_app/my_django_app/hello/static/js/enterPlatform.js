/**
* Function to save given participant's displayName to local storage and api meeting
* This will also update the visibility of the form, side bar, conference and which
* navbar is displayed
*/
function saveNewName() {
    localStorage.setItem('displayName', document.getElementById("userAlias").value);
    api.executeCommand("displayName", localStorage.getItem("displayName"));
    document.getElementById("displayNameForm").style.display = "none";
    document.getElementById('concurrent-wrap').style.display = "block";
    document.getElementById('conferenceMeeting').style.display = "inline-block";
    document.getElementById('navbar-prejoin').style.display = "none";
    document.getElementById('navbar-postjoin').style.display = "block";
}

/**
* Functions to control the visibility of the form that collects user display name
*/
function showPopupForm() {
    document.getElementById("displayNameForm").style.display = "block";
}

/**
* This function also determines which nav bar is shown depending on if 
* the user is the conference or not
*/
function closePopupForm() {
    document.getElementById("displayNameForm").style.display = "none";
    document.getElementById('navbar-prejoin').style.display = "none";
    document.getElementById('navbar-postjoin').style.display = "block";
}