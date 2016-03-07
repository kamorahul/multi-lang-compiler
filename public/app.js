
var localStream,localPeerConnection,remotePeerConnection;
var localVideo = document.getElementById("localVideo")
var remoteVideo = document.getElementById("remoteVideo")
var startButton = document.getElementById("start")
var callButton = document.getElementById("call")
var hangupButton  = document.getElementById("hangup")
startButton.disabled = false
callButton.disabled = true
hangupButton.disabled = true
startButton.onclick = start;
callButton.onclick = call;
hangupButton.onclick = hangup;



function gotStream(stream){
    console.log("get stream");
    localVideo.src = URL.createObjectURL(stream);
    localStream  = stream
    localVideo.play();
    callButton.disabled = false;


}
function start(){
    startButton.disabled = true;
    getUserMedia({audio:true,video:true},gotStream,function(err){
        console.log("err >  >>> ",err);

    })

}
function call(){
    callButton.disabled = true;
    hangupButton.disabled = false;
    if(localStream.getVideoTracks().length > 0){
        console.log("Using Audio Device" +localStream.getVideoTracks()[0].label )

    }
    if(localStream.getAudioTracks().length > 0){
        console.log("Using Audio Device" +localStream.getAudioTracks()[0].label )

    }
    var servers = null;
    localPeerConnection = new RTCPeerConnection(servers);
    console.log("creating local peers connection")
    localPeerConnection.onicecandidate  = gotLocalIceCandidate;
    remotePeerConnection = new RTCPeerConnection(servers);
    remotePeerConnection.onicecandidate = gotRemoteIceCandidate;
    remotePeerConnection.onaddstream = gotRemoteStream;

    localPeerConnection.addStream(localStream)
    console.log("added local stream to local Peer connection");
    localPeerConnection.createOffer(gotLocalDescription,function(err){ console.log("error"+err)});

    function gotLocalDescription(description){
        localPeerConnection.setLocalDescription(description);
        console.log("Offer from local Peer connection"+description.sdp);
        remotePeerConnection.setRemoteDescription(description);
        remotePeerConnection.createAnswer(gotRemoteDescription,function(err){console.log(err)})

    }

    function gotRemoteDescription(description){
        remotePeerConnection.setLocalDescription(description)
        console.log("amswer from remote peer connection"+description.sdp);
        localPeerConnection.setRemoteDescription(description)

    }

    function gotLocalIceCandidate(event){
        if(event.candidate){

            remotePeerConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
            console.log("Got Local Ice Candidate",event.candidate.candidate);

        }


    }
    function gotRemoteIceCandidate(event){
        if(event.candidate){

            localPeerConnection.addIceCandidate(new RTCIceCandidate(event.candidate));

            console.log("Got Remote Ice Candidate",event.candidate.candidate);
        }


    }
    function gotRemoteStream(event){
        remoteVideo.src  = URL.createObjectURL(event.stream);
        remoteVideo.play()
        console.log("recieved remote Stream");


    }


}
function hangup() {
console.log("Ending call")
    localPeerConnection.close();
    remotePeerConnection.close();
    localPeerConnection = null;
    remotePeerConnection = null;
    hangupButton.disabled = true;
    callButton.disabled = false;
}