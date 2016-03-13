/**
 * Created by Rahul on 11/2/16.
 */
"use strict";
var http  = require("http")
var express = require("express"),
    app = express(),
    path = require("path"),
    groupId = 0,
    usersData = {},
    compilerRoute = require("./route/compiler");
var server = http.createServer(app);
app.use('/public',express.static(path.join(__dirname, 'public')));



//editor file to go online
var socketio = require("socket.io");
var io = socketio(server);





app.use('/ace-builds',express.static(path.join(__dirname, 'ace-builds')));
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');
app.use('/compile',compilerRoute);



io.on("connection",function(socket){
         socket.on("add_user",function(user){
             printJson("user",user)
             usersData[groupId] =  {socket:socket,admin:user}
             socket.join(groupId);
             socket.emit("user_added",groupId++);
         })
    socket.on("share_session",function(session){
        usersData[session.groupId]["client"]["socket"].emit("remote_session",session)


    })
    socket.on("join_group",function(details){
        usersData[details.id]["client"] = {socket:socket,user:details.user};
        socket.join(groupId);
        socket.emit("group_joined",details.user);
        console.log(JSON.stringify(details));
        usersData[details.id].socket.emit("group_joined",details.user);
    })

})




server.listen(3000)


function printData(value,data){
    console.log(value ,data )
}

function printJson(value,data){


    console.log(value ,JSON.stringify(data))

}
