const myFunctions = require('./meeting');
const localStorage = require('./localstorage');
const { insertMeetingThumb } = require('./meeting');
afterEach(() => {
  myFunctions.reset_all();
});

describe("simple check", () => {
  test('getParticipants', () => {
    document.body.innerHTML = `
    <div class="meeting-list-wrap" id="concurrent-wrap">·········
    </div>
    <p id="meetingList" style="display:none"></p>
    `;
    myFunctions.getParticipants();
    expect(myFunctions.getdisplayNameList()[0][0]).toBe("john");
    expect(myFunctions.getdisplayNameList()[0][1]).toBe("linda");
    expect(document.getElementById("meetingList").innerHTML).toBe("Slytherin Dungeon");
  });

  test('leaveThismeeting', () => {
    document.body.innerHTML = `
    <div class="active-meeting-list" id="meeting_list">
    <div class="meeting-list-wrap" id="concurrent-wrap">
        <div class="idv-concurrent" id='SlytherinDungeon'>
            <div class="meetingInfoWrap">
                    <p class="onscreen-name" id='roomThumb-0'>Slytherin Dungeon</p>
                    <div class="session-btn-container">
                        <form name = 'join-room-0' id = 'join-room-0' action="" method="POST">
                            <input id = 'meetingName0' type = "hidden" name = 'meetingName0' value = "Slytherin Dungeon"/>
                            <input id = 'meetingPID0' type = "hidden" name = 'meetingPID0' value = "OTHER" />
                            <input id = 'displayName0' type = "hidden" name = 'displayName0' value = "default" />
                            <input type="submit" class="join-btn" id="join-room-0" name='join-room-0' onclick="return renewAPI(this.id)" value="Join Meeting">
                            <input type="button" class="leave-btn" id='leave-room-0' onclick="return leaveMeeting(this.id)" value="Leave Meeting">
                        </form> 
                    </div>
                </div>
            <div class="meetingAvatarWrap" id='avatar-wrap--Slytherin_Dungeon'></div>
        </div>
    </div>
</div> 
    `;
    expect(myFunctions.leaveThisMeeting("leave-room-0")).toBe("Slytherin Dungeon");
  });
  test('leaveMeeting', () => {
    document.body.innerHTML = `
    <p id="meetingList" style="display:none"></p>
    <div class="active-meeting-list" id="meeting_list">
    <div class="meeting-list-wrap" id="concurrent-wrap">
        <div class="idv-concurrent" id='SlytherinDungeon'>
            <div class="meetingInfoWrap">
                    <p class="onscreen-name" id='roomThumb-0'>Slytherin Dungeon</p>
                    <div class="session-btn-container">
                        <form name = 'join-room-0' id = 'join-room-0' action="" method="POST">
                            <input id = 'meetingName0' type = "hidden" name = 'meetingName0' value = "Slytherin Dungeon"/>
                            <input id = 'meetingPID0' type = "hidden" name = 'meetingPID0' value = "OTHER" />
                            <input id = 'displayName0' type = "hidden" name = 'displayName0' value = "default" />
                            <input type="submit" class="join-btn" id="join-room-0" name='join-room-0' onclick="return renewAPI(this.id)" value="Join Meeting">
                            <input type="button" class="leave-btn" id='leave-room-0' onclick="return leaveMeeting(this.id)" value="Leave Meeting">
                        </form> 
                    </div>
                </div>
            <div class="meetingAvatarWrap" id='avatar-wrap--Slytherin_Dungeon'></div>
        </div>
    </div>
</div> 
    `;
    a=`<div class="meeting-list-wrap" id="concurrent-wrap">·········
    </div>`
    myFunctions.leaveThisMeeting("leave-room-0");
    myFunctions.leaveMeeting("leave-room-0");
    expect(document.getElementById("SlytherinDungeon")).toBe(null);
    expect(document.getElementById("meetingList").innerHTML).toBe("");
  });

  test('leaveConference', () => {
    document.body.innerHTML = `
    <div id="myForm">
    <form class="meeting-info-form" id = "meeting_form" name = "meeting_form"  action="" method="POST">
     {% csrf_token %}
        <div class="form-group">
            <p style="color: rgb(184, 199, 224);position:relative;top:25%;font-family: Arial;font-size: 78%;">
                User Name</p>
            <input type="text" name="userAlias" id="userAlias" value="linda" style="width:90%" maxLength="200" placeholder="Enter Your User Name..." class="form-control" >
        </div>
        <br><br><br><button class="joinmeetingbtn"id="meeting_form" name="meeting_form" value="Join" onclick="saveNewName();return false">Enter</button>
    </form>
</div>
</div>

    <form id = "leave-conference" name = "leave-conference"  action="" method="POST">
            {% csrf_token %}
            <input id = "meetingPID" type = "hidden" name = "meetingPID" value = default />
            <input type="submit" id="leave-conference" name="leave-conference" onclick="return leaveConference()" value="Leave Conference">
</form>

    <p id="meetingList" style="display:none"></p>
    <div class="active-meeting-list" id="meeting_list">
    <div class="meeting-list-wrap" id="concurrent-wrap">
        <div class="idv-concurrent" id='SlytherinDungeon'>
            <div class="meetingInfoWrap">
                    <p class="onscreen-name" id='roomThumb-0'>Slytherin Dungeon</p>
                    <div class="session-btn-container">
                        <form name = 'join-room-0' id = 'join-room-0' action="" method="POST">
                            <input id = 'meetingName0' type = "hidden" name = 'meetingName0' value = "Slytherin Dungeon"/>
                            <input id = 'meetingPID0' type = "hidden" name = 'meetingPID0' value = "OTHER" />
                            <input id = 'displayName0' type = "hidden" name = 'displayName0' value = "default" />
                            <input type="submit" class="join-btn" id="join-room-0" name='join-room-0' onclick="return renewAPI(this.id)" value="Join Meeting">
                            <input type="button" class="leave-btn" id='leave-room-0' onclick="return leaveMeeting(this.id)" value="Leave Meeting">
                        </form> 
                    </div>
                </div>
            <div class="meetingAvatarWrap" id='avatar-wrap--Slytherin_Dungeon'></div>
        </div>
    </div>
</div> 
    `;
    myFunctions.saveNewName();
    myFunctions.leaveConference();
    expect(myFunctions.getDispalyNameHelper()).toBe(undefined);
    expect(myFunctions.leaveConferenceMeetingNameHelper()).toBe(undefined);
  });
  test('retrive name ', () => {
    document.body.innerHTML = `<p id="displayName" style="display:none"></p>
    `
    myFunctions.updateNameTrigger();
    expect(document.getElementById("displayName").value).toBe('linze');
    expect(myFunctions.getDispalyNameHelper()).toBe('linze');
  });
  test('insertAvtar',() =>{
    document.body.innerHTML=`
    <p id="meetingList" style="display:none"></p>
    <div class="meeting-list-wrap" id="concurrent-wrap">·········
    </div>
    <div class="active-meeting-list" id="meeting_list">
    <div class="meetingAvatarWrap" id='avatar-wrap--Slytherin_Dungeon'></div>
    `
    myFunctions.getParticipants();
    myFunctions.insertAvatars();
    var expectout = `
    <p id="meetingList" style="display:none">Slytherin Dungeon</p>
    <div class="meeting-list-wrap" id="concurrent-wrap">·········
    </div>
    <div class="active-meeting-list" id="meeting_list">
    <div class="meetingAvatarWrap" id="avatar-wrap--Slytherin_Dungeon"><div class="participant-avatar" id="participant--10485976">
            <div class="avatar-background" id="background--10485976" style="background-color:rgba(232,105,156,0.2);">
                <p class="displayName-text" id="displayName--10485976&quot;">john</p>
            </div></div><div class="participant-avatar" id="participant--92319283">
            <div class="avatar-background" id="background--92319283" style="background-color:rgba(232,105,156,0.2);">
                <p class="displayName-text" id="displayName--92319283&quot;">linda</p>
            </div></div></div>
    </div>`
    expect(document.body.innerHTML).toBe(expectout);
    // expect(myFunctions.insertAvatars()).toBe("hello");
  });
  test("renewAPI",()=>{
    document.body.innerHTML=`
    <div id="myForm">
    <form class="meeting-info-form" id = "meeting_form" name = "meeting_form"  action="" method="POST">
     {% csrf_token %}
        <div class="form-group">
            <p style="color: rgb(184, 199, 224);position:relative;top:25%;font-family: Arial;font-size: 78%;">
                User Name</p>
            <input type="text" name="userAlias" id="userAlias" value="linda" style="width:90%" maxLength="200" placeholder="Enter Your User Name..." class="form-control" >
        </div>
        <br><br><br><button class="joinmeetingbtn"id="meeting_form" name="meeting_form" value="Join" onclick="saveNewName();return false">Enter</button>
    </form>
</div>
</div>

    <form id = "leave-conference" name = "leave-conference"  action="" method="POST">
            {% csrf_token %}
            <input id = "meetingPID" type = "hidden" name = "meetingPID" value = default />
            <input type="submit" id="leave-conference" name="leave-conference" onclick="return leaveConference()" value="Leave Conference">
</form>

    <p id="meetingList" style="display:none"></p>
    <div class="active-meeting-list" id="meeting_list">
    <div class="meeting-list-wrap" id="concurrent-wrap">
        <div class="idv-concurrent" id='SlytherinDungeon'>
            <div class="meetingInfoWrap">
                    <p class="onscreen-name" id='roomThumb-0'>Slytherin Dungeon</p>
                    <div class="session-btn-container">
                        <form name = 'join-room-0' id = 'join-room-0' action="" method="POST">
                            <input id = 'meetingName0' type = "hidden" name = 'meetingName0' value = "Slytherin Dungeon"/>
                            <input id = 'meetingPID0' type = "hidden" name = 'meetingPID0' value = "OTHER" />
                            <input id = 'displayName0' type = "hidden" name = 'displayName0' value = "default" />
                            <input type="submit" class="join-btn" id="join-room-0" name='join-room-0' onclick="return renewAPI(this.id)" value="Join Meeting">
                            <input type="button" class="leave-btn" id='leave-room-0' onclick="return leaveMeeting(this.id)" value="Leave Meeting">
                        </form> 
                    </div>
                </div>
            <div class="meetingAvatarWrap" id='avatar-wrap--Slytherin_Dungeon'></div>
        </div>
    </div>
</div> 
    `
    myFunctions.renewAPI('join-room-0');
    expect(myFunctions.getMockResult()[1].roomName).toBe('Slytherin Dungeon')
    expect(myFunctions.getMockResult()[1].userInfo.displayName).toBe('linze')
    expect(myFunctions.getMockResult()[0]).toBe('stage2.info3600cp28.net')

  });
  test("runningMeeting",()=>{
    document.body.innerHTML=`
    <div id="myForm">
    <p id="ruuningMeeting" style="display:none"></p>
    <form class="meeting-info-form" id = "meeting_form" name = "meeting_form"  action="" method="POST">
     {% csrf_token %}
        <div class="form-group">
            <p style="color: rgb(184, 199, 224);position:relative;top:25%;font-family: Arial;font-size: 78%;">
                User Name</p>
            <input type="text" name="userAlias" id="userAlias" value="linda" style="width:90%" maxLength="200" placeholder="Enter Your User Name..." class="form-control" >
        </div>
        <br><br><br><button class="joinmeetingbtn"id="meeting_form" name="meeting_form" value="Join" onclick="saveNewName();return false">Enter</button>
    </form>
</div>
</div>

    <form id = "leave-conference" name = "leave-conference"  action="" method="POST">
            {% csrf_token %}
            <input id = "meetingPID" type = "hidden" name = "meetingPID" value = default />
            <input type="submit" id="leave-conference" name="leave-conference" onclick="return leaveConference()" value="Leave Conference">
</form>

    <p id="meetingList" style="display:none"></p>
    <div class="active-meeting-list" id="meeting_list">
    <div class="meeting-list-wrap" id="concurrent-wrap">
        <div class="idv-concurrent" id='SlytherinDungeon'>
            <div class="meetingInfoWrap">
                    <p class="onscreen-name" id='roomThumb-0'>Slytherin Dungeon</p>
                    <div class="session-btn-container">
                        <form name = 'join-room-0' id = 'join-room-0' action="" method="POST">
                            <input id = 'meetingName0' type = "hidden" name = 'meetingName0' value = "Slytherin Dungeon"/>
                            <input id = 'meetingPID0' type = "hidden" name = 'meetingPID0' value = "OTHER" />
                            <input id = 'displayName0' type = "hidden" name = 'displayName0' value = "default" />
                            <input type="submit" class="join-btn" id="join-room-0" name='join-room-0' onclick="return renewAPI(this.id)" value="Join Meeting">
                            <input type="button" class="leave-btn" id='leave-room-0' onclick="return leaveMeeting(this.id)" value="Leave Meeting">
                        </form> 
                    </div>
                </div>
            <div class="meetingAvatarWrap" id='avatar-wrap--Slytherin_Dungeon'></div>
        </div>
    </div>
</div> 
    `
    // myFunctions.initialization();
    // myFunctions.getParticipants();
    // myFunctions.renewAPI('join-room-0');
    myFunctions.getRunningMeeting();
    expect(myFunctions.getstandbyMeetings()[0]).toBe('Slytherin Dungeon');
  });
});
describe("TestJoinMeeting",()=>{
    test("testGetCorrectOnloadName",()=>{
        document.body.innerHTML=`<p id="ruuningMeeting" style="display:none"></p>`
        myFunctions.initialization();
        expect(document.getElementById('ruuningMeeting').innerHTML).toBe('Slytherin Dungeon')
    })

    test("testGetCorrectOnloadUserName",()=>{
        document.body.innerHTML=`
        <div id="myForm">
    <form class="meeting-info-form" id = "meeting_form" name = "meeting_form"  action="" method="POST">
     {% csrf_token %}
        <div class="form-group">
            <p style="color: rgb(184, 199, 224);position:relative;top:25%;font-family: Arial;font-size: 78%;">
                User Name</p>
            <input type="text" name="userAlias" id="userAlias" value="linda" style="width:90%" maxLength="200" placeholder="Enter Your User Name..." class="form-control" >
        </div>
        <br><br><br><button class="joinmeetingbtn"id="meeting_form" name="meeting_form" value="Join" onclick="saveNewName();return false">Enter</button>
    </form>
</div>
</div>
<div class="meeting-list-wrap" id="concurrent-wrap"></div>
<p id="displayName" style="display:none"></p>
`
        myFunctions.saveNewName();
        expect(myFunctions.getDispalyNameHelper()).toBe('linda')
    })
    test("testchangeMeetingList",()=>{
        document.body.innerHTML=`
    <div id="myForm">
    <p id="ruuningMeeting" style="display:none"></p>
    <form class="meeting-info-form" id = "meeting_form" name = "meeting_form"  action="" method="POST">
     {% csrf_token %}
        <div class="form-group">
            <p style="color: rgb(184, 199, 224);position:relative;top:25%;font-family: Arial;font-size: 78%;">
                User Name</p>
            <input type="text" name="userAlias" id="userAlias" value="linda" style="width:90%" maxLength="200" placeholder="Enter Your User Name..." class="form-control" >
        </div>
        <br><br><br><button class="joinmeetingbtn"id="meeting_form" name="meeting_form" value="Join" onclick="saveNewName();return false">Enter</button>
    </form>
</div>
</div>

    <form id = "leave-conference" name = "leave-conference"  action="" method="POST">
            {% csrf_token %}
            <input id = "meetingPID" type = "hidden" name = "meetingPID" value = default />
            <input type="submit" id="leave-conference" name="leave-conference" onclick="return leaveConference()" value="Leave Conference">
</form>

    <p id="meetingList" style="display:none"></p>
    <div class="active-meeting-list" id="meeting_list">
    <div class="meeting-list-wrap" id="concurrent-wrap"></div>
    `
    myFunctions.setContext(['Slytherin Dungeon','Hogwarts'],[['Slytherin Dungeon','Hogwarts'],['john+10485976','linda+92319283'],['linze+92319211']])
    //myFunctions.initialization();
    myFunctions.getParticipants();
    myFunctions.insertMeetingThumb();
    myFunctions.insertAvatars();
    myFunctions.getRunningMeeting();
    expect(myFunctions.getstandbyMeetings()[0]).toBe('Slytherin Dungeon');
    expect(myFunctions.getstandbyMeetings()[1]).toBe('Hogwarts');
    myFunctions.renewAPI('join-room-0');
    myFunctions.getRunningMeeting();
    expect(myFunctions.getstandbyMeetings()[0]).toBe('Hogwarts');
    })
})

describe('testPlanSection1', () =>{
test("testNameUpdate",()=>{
    document.body.innerHTML=`
    <div id="myForm">
<form class="meeting-info-form" id = "meeting_form" name = "meeting_form"  action="" method="POST">
 {% csrf_token %}
    <div class="form-group">
        <p style="color: rgb(184, 199, 224);position:relative;top:25%;font-family: Arial;font-size: 78%;">
            User Name</p>
        <input type="text" name="userAlias" id="userAlias" value="linda" style="width:90%" maxLength="200" placeholder="Enter Your User Name..." class="form-control" >
    </div>
    <br><br><br><button class="joinmeetingbtn"id="meeting_form" name="meeting_form" value="Join" onclick="saveNewName();return false">Enter</button>
</form>
</div>
</div>
<div class="meeting-list-wrap" id="concurrent-wrap"></div>
<p id="displayName" style="display:none"></p>
`
    myFunctions.saveNewName();
    expect(myFunctions.getDispalyNameHelper()).toBe('linda')
    myFunctions.updateNameTrigger();
    expect(myFunctions.getDispalyNameHelper()).toBe('linze')
})
})
describe('testPlanSection2', () =>{
    test('leaveThismeeting', () => {
        document.body.innerHTML = `
        <div class="active-meeting-list" id="meeting_list">
        <div class="meeting-list-wrap" id="concurrent-wrap">
            <div class="idv-concurrent" id='SlytherinDungeon'>
                <div class="meetingInfoWrap">
                        <p class="onscreen-name" id='roomThumb-0'>Slytherin Dungeon</p>
                        <div class="session-btn-container">
                            <form name = 'join-room-0' id = 'join-room-0' action="" method="POST">
                                <input id = 'meetingName0' type = "hidden" name = 'meetingName0' value = "Slytherin Dungeon"/>
                                <input id = 'meetingPID0' type = "hidden" name = 'meetingPID0' value = "OTHER" />
                                <input id = 'displayName0' type = "hidden" name = 'displayName0' value = "default" />
                                <input type="submit" class="join-btn" id="join-room-0" name='join-room-0' onclick="return renewAPI(this.id)" value="Join Meeting">
                                <input type="button" class="leave-btn" id='leave-room-0' onclick="return leaveMeeting(this.id)" value="Leave Meeting">
                            </form> 
                        </div>
                    </div>
                <div class="meetingAvatarWrap" id='avatar-wrap--Slytherin_Dungeon'></div>
            </div>
        </div>
    </div> 
        `;
        expect(myFunctions.leaveThisMeeting("leave-room-0")).toBe("Slytherin Dungeon");
      });
      test('leaveMeeting', () => {
        document.body.innerHTML = `
        <p id="meetingList" style="display:none"></p>
        <div class="active-meeting-list" id="meeting_list">
        <div class="meeting-list-wrap" id="concurrent-wrap">
            <div class="idv-concurrent" id='SlytherinDungeon'>
                <div class="meetingInfoWrap">
                        <p class="onscreen-name" id='roomThumb-0'>Slytherin Dungeon</p>
                        <div class="session-btn-container">
                            <form name = 'join-room-0' id = 'join-room-0' action="" method="POST">
                                <input id = 'meetingName0' type = "hidden" name = 'meetingName0' value = "Slytherin Dungeon"/>
                                <input id = 'meetingPID0' type = "hidden" name = 'meetingPID0' value = "OTHER" />
                                <input id = 'displayName0' type = "hidden" name = 'displayName0' value = "default" />
                                <input type="submit" class="join-btn" id="join-room-0" name='join-room-0' onclick="return renewAPI(this.id)" value="Join Meeting">
                                <input type="button" class="leave-btn" id='leave-room-0' onclick="return leaveMeeting(this.id)" value="Leave Meeting">
                            </form> 
                        </div>
                    </div>
                <div class="meetingAvatarWrap" id='avatar-wrap--Slytherin_Dungeon'></div>
            </div>
        </div>
    </div> 
        `;
        a=`<div class="meeting-list-wrap" id="concurrent-wrap">·········
        </div>`
        myFunctions.leaveThisMeeting("leave-room-0");
        myFunctions.leaveMeeting("leave-room-0");
        expect(document.getElementById("SlytherinDungeon")).toBe(null);
        expect(document.getElementById("meetingList").innerHTML).toBe("");
      });
    
      test('leaveConference', () => {
        document.body.innerHTML = `
        <div id="myForm">
        <form class="meeting-info-form" id = "meeting_form" name = "meeting_form"  action="" method="POST">
         {% csrf_token %}
            <div class="form-group">
                <p style="color: rgb(184, 199, 224);position:relative;top:25%;font-family: Arial;font-size: 78%;">
                    User Name</p>
                <input type="text" name="userAlias" id="userAlias" value="linda" style="width:90%" maxLength="200" placeholder="Enter Your User Name..." class="form-control" >
            </div>
            <br><br><br><button class="joinmeetingbtn"id="meeting_form" name="meeting_form" value="Join" onclick="saveNewName();return false">Enter</button>
        </form>
    </div>
    </div>
    
        <form id = "leave-conference" name = "leave-conference"  action="" method="POST">
                {% csrf_token %}
                <input id = "meetingPID" type = "hidden" name = "meetingPID" value = default />
                <input type="submit" id="leave-conference" name="leave-conference" onclick="return leaveConference()" value="Leave Conference">
    </form>
    
        <p id="meetingList" style="display:none"></p>
        <div class="active-meeting-list" id="meeting_list">
        <div class="meeting-list-wrap" id="concurrent-wrap">
            <div class="idv-concurrent" id='SlytherinDungeon'>
                <div class="meetingInfoWrap">
                        <p class="onscreen-name" id='roomThumb-0'>Slytherin Dungeon</p>
                        <div class="session-btn-container">
                            <form name = 'join-room-0' id = 'join-room-0' action="" method="POST">
                                <input id = 'meetingName0' type = "hidden" name = 'meetingName0' value = "Slytherin Dungeon"/>
                                <input id = 'meetingPID0' type = "hidden" name = 'meetingPID0' value = "OTHER" />
                                <input id = 'displayName0' type = "hidden" name = 'displayName0' value = "default" />
                                <input type="submit" class="join-btn" id="join-room-0" name='join-room-0' onclick="return renewAPI(this.id)" value="Join Meeting">
                                <input type="button" class="leave-btn" id='leave-room-0' onclick="return leaveMeeting(this.id)" value="Leave Meeting">
                            </form> 
                        </div>
                    </div>
                <div class="meetingAvatarWrap" id='avatar-wrap--Slytherin_Dungeon'></div>
            </div>
        </div>
    </div> 
        `;
        myFunctions.saveNewName();
        myFunctions.leaveConference();
        expect(myFunctions.getDispalyNameHelper()).toBe(undefined);
        expect(myFunctions.leaveConferenceMeetingNameHelper()).toBe(undefined);
      });
    })
describe('testPlanSection3', () =>{
    test("testSwitchMeeting",()=>{
        document.body.innerHTML=`
        <div id="myForm">
        <p id="ruuningMeeting" style="display:none"></p>
        <form class="meeting-info-form" id = "meeting_form" name = "meeting_form"  action="" method="POST">
         {% csrf_token %}
            <div class="form-group">
                <p style="color: rgb(184, 199, 224);position:relative;top:25%;font-family: Arial;font-size: 78%;">
                    User Name</p>
                <input type="text" name="userAlias" id="userAlias" value="linda" style="width:90%" maxLength="200" placeholder="Enter Your User Name..." class="form-control" >
            </div>
            <br><br><br><button class="joinmeetingbtn"id="meeting_form" name="meeting_form" value="Join" onclick="saveNewName();return false">Enter</button>
        </form>
    </div>
    </div>
    
        <form id = "leave-conference" name = "leave-conference"  action="" method="POST">
                {% csrf_token %}
                <input id = "meetingPID" type = "hidden" name = "meetingPID" value = default />
                <input type="submit" id="leave-conference" name="leave-conference" onclick="return leaveConference()" value="Leave Conference">
    </form>
    
        <p id="meetingList" style="display:none"></p>
        <div class="active-meeting-list" id="meeting_list">
        <div class="meeting-list-wrap" id="concurrent-wrap"></div>
        `
        myFunctions.setContext(['Slytherin Dungeon','Hogwarts'],[['Slytherin Dungeon','Hogwarts'],['john+10485976','linda+92319283'],['linze+92319211']])
        //myFunctions.initialization();
        myFunctions.getParticipants();
        myFunctions.insertMeetingThumb();
        myFunctions.insertAvatars();
        myFunctions.getRunningMeeting();
        expect(myFunctions.getstandbyMeetings()[0]).toBe('Slytherin Dungeon');
        expect(myFunctions.getstandbyMeetings()[1]).toBe('Hogwarts');
        myFunctions.renewAPI('join-room-0');
        myFunctions.getRunningMeeting();
        expect(myFunctions.getstandbyMeetings()[0]).toBe('Hogwarts');
    })
    test("testSwitchMainMeetingContainer",()=>{
        document.body.innerHTML=`
        <div id="myForm">
        <p id="ruuningMeeting" style="display:none"></p>
        <form class="meeting-info-form" id = "meeting_form" name = "meeting_form"  action="" method="POST">
         {% csrf_token %}
            <div class="form-group">
                <p style="color: rgb(184, 199, 224);position:relative;top:25%;font-family: Arial;font-size: 78%;">
                    User Name</p>
                <input type="text" name="userAlias" id="userAlias" value="linda" style="width:90%" maxLength="200" placeholder="Enter Your User Name..." class="form-control" >
            </div>
            <br><br><br><button class="joinmeetingbtn"id="meeting_form" name="meeting_form" value="Join" onclick="saveNewName();return false">Enter</button>
        </form>
    </div>
    </div>
    
        <form id = "leave-conference" name = "leave-conference"  action="" method="POST">
                {% csrf_token %}
                <input id = "meetingPID" type = "hidden" name = "meetingPID" value = default />
                <input type="submit" id="leave-conference" name="leave-conference" onclick="return leaveConference()" value="Leave Conference">
    </form>
    
        <p id="meetingList" style="display:none"></p>
        <div class="active-meeting-list" id="meeting_list">
        <div class="meeting-list-wrap" id="concurrent-wrap"></div>
        `
        myFunctions.setContext(['Slytherin Dungeon','Hogwarts'],[['Slytherin Dungeon','Hogwarts'],['john+10485976','linda+92319283'],['linze+92319211']])
        //myFunctions.initialization();
        myFunctions.saveNewName();
        myFunctions.getParticipants();
        myFunctions.insertMeetingThumb();
        myFunctions.insertAvatars();
        myFunctions.getRunningMeeting();
        myFunctions.renewAPI('join-room-1');
        myFunctions.getRunningMeeting();
        expect(myFunctions.getMockResult()[1].roomName).toBe('Hogwarts')
        expect(myFunctions.getMockResult()[1].userInfo.displayName).toBe('linda')
        expect(myFunctions.getMockResult()[0]).toBe('stage2.info3600cp28.net')
    })
    test("testSwitchThumb",()=>{
        document.body.innerHTML=`
        <div id="myForm">
        <p id="ruuningMeeting" style="display:none"></p>
        <form class="meeting-info-form" id = "meeting_form" name = "meeting_form"  action="" method="POST">
         {% csrf_token %}
            <div class="form-group">
                <p style="color: rgb(184, 199, 224);position:relative;top:25%;font-family: Arial;font-size: 78%;">
                    User Name</p>
                <input type="text" name="userAlias" id="userAlias" value="linda" style="width:90%" maxLength="200" placeholder="Enter Your User Name..." class="form-control" >
            </div>
            <br><br><br><button class="joinmeetingbtn"id="meeting_form" name="meeting_form" value="Join" onclick="saveNewName();return false">Enter</button>
        </form>
    </div>
    </div>
    
        <form id = "leave-conference" name = "leave-conference"  action="" method="POST">
                {% csrf_token %}
                <input id = "meetingPID" type = "hidden" name = "meetingPID" value = default />
                <input type="submit" id="leave-conference" name="leave-conference" onclick="return leaveConference()" value="Leave Conference">
    </form>
    
        <p id="meetingList" style="display:none"></p>
        <div class="active-meeting-list" id="meeting_list">
        <div class="meeting-list-wrap" id="concurrent-wrap"></div>
        `
        myFunctions.setContext(['Slytherin Dungeon','Hogwarts'],[['Slytherin Dungeon','Hogwarts'],['john+10485976','linda+92319283'],['linze+92319211']])
        //myFunctions.initialization();
        myFunctions.getParticipants();
        myFunctions.insertMeetingThumb();
        myFunctions.insertAvatars();
        myFunctions.getRunningMeeting();
        expect(document.getElementById('meetingName0').value).toBe('Slytherin')
        myFunctions.renewAPI('join-room-0');
        expect(document.getElementById('meetingName0').innerHTML).toBe("")
    })
    })
    describe('testPlanSection4', () =>{
        test('testinsertMeetingThumb',()=>{
            document.body.innerHTML=`
        <div id="myForm">
        <p id="ruuningMeeting" style="display:none"></p>
        <form class="meeting-info-form" id = "meeting_form" name = "meeting_form"  action="" method="POST">
         {% csrf_token %}
            <div class="form-group">
                <p style="color: rgb(184, 199, 224);position:relative;top:25%;font-family: Arial;font-size: 78%;">
                    User Name</p>
                <input type="text" name="userAlias" id="userAlias" value="linda" style="width:90%" maxLength="200" placeholder="Enter Your User Name..." class="form-control" >
            </div>
            <br><br><br><button class="joinmeetingbtn"id="meeting_form" name="meeting_form" value="Join" onclick="saveNewName();return false">Enter</button>
        </form>
    </div>
    </div>
    
        <form id = "leave-conference" name = "leave-conference"  action="" method="POST">
                {% csrf_token %}
                <input id = "meetingPID" type = "hidden" name = "meetingPID" value = default />
                <input type="submit" id="leave-conference" name="leave-conference" onclick="return leaveConference()" value="Leave Conference">
    </form>
    
        <p id="meetingList" style="display:none"></p>
        <div class="active-meeting-list" id="meeting_list">
        <div class="meeting-list-wrap" id="concurrent-wrap"></div>
        `
            myFunctions.getParticipants();
            myFunctions.insertMeetingThumb();
            expect(document.getElementById('meetingName0').value).toBe('Slytherin')
            expect(document.getElementsByClassName('session-btn-container')).not.toBe(undefined)
        });

        test('insertAvtar',() =>{
            document.body.innerHTML=`
            <p id="meetingList" style="display:none"></p>
            <div class="meeting-list-wrap" id="concurrent-wrap">·········
            </div>
            <div class="active-meeting-list" id="meeting_list">
            `
            myFunctions.getParticipants();
            myFunctions.insertMeetingThumb();
            myFunctions.insertAvatars();
            expect(document.getElementById('avatar-wrap--Slytherin_Dungeon')).not.toBe(undefined);
          });
    });
   