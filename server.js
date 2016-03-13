/**
 * Created by Rahul on 11/2/16.
 */
"use strict";
var http  = require("http")
var express = require("express"),
    app = express(),
    path = require("path"),
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
         socket.on("data",function(data){
             console.log("data")


         })

})




server.listen(3000)


function printData(value,data){
    console.log(value ,isString(data) ? data : JSON.stringify(data))
}