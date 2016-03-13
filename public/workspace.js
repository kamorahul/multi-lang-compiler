/**
 * Created by Rahul on 13/3/16.
 */


var shareWorkspace = false
function initilizeWorkspace(){
    var userDetails = {}

    userDetails.user = prompt("enter your username")
    var socket = io()
    shareWorkspace  = true;
    socket.emit("add_user",userDetails);
          socket.on("user_added",function(groupId){
              userDetails.group = groupId;
          })


    socket.on("group_joined",function(userId){
        var editorSession = {}
        editorSession.session = editor.getValue()
        editorSession.groupId = userDetails.group;
        alert("workspace shared with user"+ userId)
        socket.emit("share_session",editorSession);

    })
}

function joinGroup(){
    var groupDetails = {}
        if(!shareWorkspace){
            groupDetails.id = prompt("enter the group to join")
            groupDetails.user = prompt("enter the name to display")
            var socket = io();
            socket.emit("join_group",groupDetails);
            socket.on("remote_session",function(session){
                editor.setValue(session.session)


            })

        }
}

