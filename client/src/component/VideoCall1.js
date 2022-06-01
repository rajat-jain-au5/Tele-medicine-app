import React, { useEffect, useState, useRef } from 'react';
import './VideoCall.css';
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
// const Container = styled.div`
//   height: 100vh;
//   width: 100%;
//   display: flex;
//   flex-direction: column;
// `;
// const Row = styled.div`
//   display: flex;
//   width: 100%;
// `;
const Video = styled.video`
// border: 1px solid blue;
// width: 70%;
// height: 70%;
`;
function VideoCall(props) {
  // console.log(props)
  const [yourID, setYourID] = useState("");
  const [users, setUsers] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();
 
  useEffect(() => {
    socket.current = io.connect("http://localhost:3010/");
   
   
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      setStream(stream);
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    })
    
  // socket.current.on("yourID", (id) => {
      // console.log(id)
    var data = {
      pId: props.match.params.id2,
      userId: props.match.params.id1
    }
    socket.current.emit('storeClientInfo', data);
    console.log("======================================="+props.match.params.id1)
    setYourID(props.match.params.id1);
    // })
    // setYourID(props.match.params.id1)
     
    // })
    socket.current.on("allUsers", (users) => {
      console.log(users)
      setUsers(users);
    })
    socket.current.on("hey", (data) => {
      console.log(data)
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    })
  }, []);
  function callPeer(id) {
    // console.log(id)
    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: {
        iceServers: [
          {
            urls: "stun:numb.viagenie.ca",
            username: "sultan1640@gmail.com",
            credential: "98376683"
          },
          {
            urls: "turn:numb.viagenie.ca",
            username: "sultan1640@gmail.com",
            credential: "98376683"
          }
        ]
      },
      stream: stream,
    });
    peer.on("signal", data => {
      console.log(data)
      socket.current.emit("callUser", { userToCall: id, signalData: data, from: yourID })
      console.log(data)
    })
    peer.on("stream", stream => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });
    socket.current.on("callAccepted", signal => {
      setCallAccepted(true);
      peer.signal(signal);
    })
  }
  function acceptCall() {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", data => {
      socket.current.emit("acceptCall", { signal: data, to: caller })
    })
    peer.on("stream", stream => {
      partnerVideo.current.srcObject = stream;
    });
    peer.signal(callerSignal);
    setReceivingCall(false);
  }
  let UserVideo;
  if (stream) {
    UserVideo = (
      <Video className="video1" playsInline muted ref={userVideo} autoPlay />
    );
  }
  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = (
      <Video className="partnervideo" playsInline ref={partnerVideo} autoPlay />
    );
  }
  let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <div className="acceptbtn">
        <h3>{caller} is calling you</h3>
        <button className="btn btn-success center" onClick={acceptCall}>Accept</button>
      </div>
    )
  }
  let mic_switch = true;
  let video_switch = true;
  function toggleVideo() {
    if (stream != null && stream.getVideoTracks().length > 0) {
      video_switch = !video_switch;
      stream.getVideoTracks()[0].enabled = video_switch;
    }
  }
  function toggleMic() {
    if (stream != null && stream.getAudioTracks().length > 0) {
      mic_switch = !mic_switch;
      stream.getAudioTracks()[0].enabled = video_switch;
    }
  }
  function rejectCall() {
    socket.current.emit('end', { from: yourID, to: caller });
    setUsers({})
  }
  return (
    <div className="container-fluid bg-dark">
      <div className="daily">
        {UserVideo}
      </div>
      <div className="daily-videos-wrapper">
        {PartnerVideo}
      </div>
      <div className="acceptbtn">
        {!callAccepted 
        &&
        //  Object.keys(users).map(key => {
          // console.log("==========================="+key,yourID)
          // if (key === yourID) {
            // return null;
          // }
          // return (
           
          <button onClick={() => callPeer(users)}>Call {users}</button>
          // );
        // })
        }
        
      </div>{
        callAccepted && <div className="allbtn">
          <button
            type="button"
            className="btn-action fa fa-video-camera"
            onClick={toggleVideo}
          />
          <button
            type="button"
            className="btn-action fa fa-microphone"
            onClick={toggleMic}
          />
          <button
            type="button"
            className="btn-action  fa fa-phone " data-fa-transform="rotate-360"
            style={{ backgroundColor: "red" }}
            onClick={rejectCall}
          />
        </div>
      }
      <div>
        {!callAccepted && incomingCall}
      </div>
    </div>
  );
}
export default VideoCall;