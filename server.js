/**
 * Created by Rahul on 11/2/16.
 */

var http  = require("http")
var express = require("express"),
    app = express(),
    path = require("path"),
    numClients = 0
    compilerRoute = require("./route/compiler");
var server = http.createServer(app);
var twilio = require('twilio')("ACbeca0df7af660826365cb4143950d1a6", "ebc9f4961f4bc3112106c9e35f25a6cf");
app.use('/public',express.static(path.join(__dirname, 'public')));
//editor file to go online
var socketio = require("socket.io");
var io = socketio(server);
app.use('/ace-builds',express.static(path.join(__dirname, 'ace-builds')));
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');
//app.use(function(req,res,next){
//
//
//
//next()
//})

app.use('/compile',compilerRoute);

io.on("connection",function(socket){
    socket.on('join', function(room){
        console.log("reached")
        //var clients = io.sockets.adapter.rooms[room];

        if(numClients == 0){
            socket.join(room);
            numClients++;
        }else if(numClients == 1){
            console.log("reached")
            socket.join(room);
            socket.emit('ready', room);
            socket.broadcast.emit('ready', room);
        }else{
            socket.emit('full', room);
        }
    });
    socket.on('token', function(){
        twilio.tokens.create(function(err, response){
            if(err){
                console.log(err);
            }else{
                socket.emit('token', response);
            }
        });
    });
    socket.on('offer', function(offer){
        socket.broadcast.emit('offer', offer);
    });
    socket.on('candidate', function(candidate){
        socket.broadcast.emit('candidate', candidate);
    });
    socket.on('offer', function(offer){
        socket.broadcast.emit('offer', offer);
    });
    socket.on('answer', function(answer){
        socket.broadcast.emit('answer', answer);
    });


})
//app.listen(3000)
server.listen(3000)