from django.shortcuts import render
from .models import MeetingUser
from django.contrib import messages
import json 
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

"""called every time a user joins a meeting or leaves a meeting in order to update the database
- @param {POST request} request: a POST request from form submission
- returns html request
"""
def insertRecord(request):

    # creates person upon POST request being made 
    if request.method == 'POST':
        # removes user from database
        if request.POST.get("leave-conference"):
            MeetingUser.objects.filter(meetingPID=request.POST.get('meetingPID')).delete()
        """ 
        - each of the following statements is associated to a room
        - filter removes user from current room in database
        - create inserts the user into the database """
        if request.POST.get("join-room-0"):
            MeetingUser.objects.filter(meetingPID=request.POST.get('meetingPID0')).delete()
            MeetingUser.objects.create(meetingName = request.POST.get('meetingName0'), meetingPID = request.POST.get('meetingPID0'), displayName = request.POST.get('displayName0'))

        if request.POST.get("join-room-1"):
            MeetingUser.objects.filter(meetingPID=request.POST.get('meetingPID1')).delete()
            MeetingUser.objects.create(meetingName = request.POST.get('meetingName1'), meetingPID = request.POST.get('meetingPID1'), displayName = request.POST.get('displayName1'))


        if request.POST.get("join-room-2"):
            MeetingUser.objects.filter(meetingPID=request.POST.get('meetingPID2')).delete()
            MeetingUser.objects.create(meetingName = request.POST.get('meetingName2'), meetingPID = request.POST.get('meetingPID2'), displayName = request.POST.get('displayName2'))


        if request.POST.get("join-room-3"):
            MeetingUser.objects.filter(meetingPID=request.POST.get('meetingPID3')).delete()
            MeetingUser.objects.create(meetingName = request.POST.get('meetingName3'), meetingPID = request.POST.get('meetingPID3'), displayName = request.POST.get('displayName3'))


        if request.POST.get("join-room-4"):
            MeetingUser.objects.filter(meetingPID=request.POST.get('meetingPID4')).delete()
            MeetingUser.objects.create(meetingName = request.POST.get('meetingName4'), meetingPID = request.POST.get('meetingPID4'), displayName = request.POST.get('displayName4'))

        
        if request.POST.get("join-room-5"):
            MeetingUser.objects.filter(meetingPID=request.POST.get('meetingPID5')).delete()
            MeetingUser.objects.create(meetingName = request.POST.get('meetingName5'), meetingPID = request.POST.get('meetingPID5'), displayName = request.POST.get('displayName5'))

        
        if request.POST.get("join-room-6"):
            MeetingUser.objects.filter(meetingPID=request.POST.get('meetingPID6')).delete()
            MeetingUser.objects.create(meetingName = request.POST.get('meetingName6'), meetingPID = request.POST.get('meetingPID6'), displayName = request.POST.get('displayName6'))

        
        if request.POST.get("join-room-7"):
            MeetingUser.objects.filter(meetingPID=request.POST.get('meetingPID7')).delete()
            MeetingUser.objects.create(meetingName = request.POST.get('meetingName7'), meetingPID = request.POST.get('meetingPID7'), displayName = request.POST.get('displayName7'))


        if request.POST.get("join-room-8"):
            MeetingUser.objects.filter(meetingPID=request.POST.get('meetingPID8')).delete()
            MeetingUser.objects.create(meetingName = request.POST.get('meetingName8'), meetingPID = request.POST.get('meetingPID8'), displayName = request.POST.get('displayName8'))
    

        if request.POST.get("join-room-9"):
            MeetingUser.objects.filter(meetingPID=request.POST.get('meetingPID9')).delete()
            MeetingUser.objects.create(meetingName = request.POST.get('meetingName9'), meetingPID = request.POST.get('meetingPID9'), displayName = request.POST.get('displayName9'))
  
    key = 'meetingName'
    query_results = MeetingUser.objects.all()
    meetings = MeetingUser.objects.values('meetingName').distinct().values_list('meetingName', flat=True)
    rooms = len(meetings)+1
    meetingList = []
    names = [[] for i in range(rooms)]
    # getting the different roomName
    for meeting in meetings:
        meetingList.append(meeting)
    rooms = len(meetingList)
    names = [[] for i in range(rooms)]
    for i in range(rooms):
        tmp_meetingName = meetingList[i]
        for name in query_results:
            if (name.meetingName == tmp_meetingName):
                tmp_name = name.displayName
                tmp_pid = name.meetingPID
                returnString = tmp_name+"+"+tmp_pid
                names[i].append(returnString)
    names.insert(0,meetingList)
    json_format = json.dumps(names)

    return render(request, 'hello/singlemeeting.html', {'data': json_format})

"""
This function allows access to the database and provides data for the thumbnails showing which user is in which room 
@param {POST request} request: a POST request from AJAX code
returns: JSON response
"""
@csrf_exempt
def getAllMeetingParticipants(request):
    data = {
        'is_valid': False,}
    if request.is_ajax():
        data.update(is_valid=True)
        key = 'meetingName'
        query_results = MeetingUser.objects.all()
        meetings = MeetingUser.objects.values('meetingName').distinct().values_list('meetingName', flat=True)
        rooms = len(meetings)+1
        meetingList = []
        names = [[] for i in range(rooms)]
        # getting the different roomName
        for meeting in meetings:
            meetingList.append(meeting)
        rooms = len(meetingList)
        names = [[] for i in range(rooms)]
        for i in range(rooms):
            tmp_meetingName = meetingList[i]
            for name in query_results:
                if (name.meetingName == tmp_meetingName):
                    tmp_name = name.displayName
                    tmp_pid = name.meetingPID
                    returnString = tmp_name+"+"+tmp_pid
                    names[i].append(returnString)
        names.insert(0,meetingList)

        json_format = json.dumps(names)

        data.update(response = names)

    return JsonResponse(data)