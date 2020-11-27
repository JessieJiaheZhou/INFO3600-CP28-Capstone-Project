from django.db import models

# creates the required model for holding meeting data in the database
class MeetingUser(models.Model):    
      
    meetingName = models.CharField(max_length=30)    
    meetingPID =  models.CharField(max_length=8, primary_key = True)    
    displayName = models.CharField(max_length=30)    
   
