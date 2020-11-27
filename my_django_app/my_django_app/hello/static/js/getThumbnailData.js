/**
* Function to send POST request to the test function of "getAllMeetingParticipants" on views.py
* in order to display thumbnails
*/
function getThumbnailData(){
    $.ajax({
        url: "{% url 'my_ajax_request' %}",
        dataType: 'json',
        type: 'POST',
        success: function(data) {
            if (data.is_valid) {
               myData = data.response;
            } 
        }
    });            
}