const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const toggleAudioBtn = document.getElementById('toggleAudioBtn');
const toggleVideoBtn = document.getElementById('toggleVideoBtn');
const toggleScreenShareBtn = document.getElementById('toggleScreenShareBtn');
const toggleFullScreenBtn = document.getElementById('toggleFullScreenBtn');

let isAudioMuted = false;
let isVideoPaused = false;
let isScreenSharing = false;

// Function to toggle audio on/off
function toggleAudio() {
  isAudioMuted = !isAudioMuted;
  localVideo.muted = isAudioMuted;
}

toggleAudioBtn.addEventListener('click', toggleAudio);

// Function to toggle video on/off
function toggleVideo() {
  isVideoPaused = !isVideoPaused;
  localVideo.srcObject.getVideoTracks().forEach(track => {
    track.enabled = !isVideoPaused;
  });
}

toggleVideoBtn.addEventListener('click', toggleVideo);

// Function to toggle screen sharing on/off
async function toggleScreenShare() {
  try {
    if (isScreenSharing) {
      // Stop sharing screen
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localVideo.srcObject = stream;

      // Stop sharing the screen track
      const screenTrack = localVideo.srcObject.getVideoTracks().find(track => track.label === 'screen');
      screenTrack.stop();
      isScreenSharing = false;
      toggleScreenShareBtn.textContent = 'Share Screen';
    } else {
      // Share screen
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      localVideo.srcObject = screenStream;

      // Replace the video track with the screen track to the localPeerConnection
      const videoTrack = localVideo.srcObject.getVideoTracks()[0];
      localPeerConnection.getSenders().find(sender => sender.track.kind === 'video').replaceTrack(videoTrack);

      isScreenSharing = true;
      toggleScreenShareBtn.textContent = 'Stop Sharing';
    }
  } catch (err) {
    console.error("Error accessing screen sharing:", err);
  }
}

toggleScreenShareBtn.addEventListener('click', toggleScreenShare);

// Function to toggle full screen for video element
function toggleFullScreen() {
  if (localVideo.requestFullscreen) {
    localVideo.requestFullscreen();
  } else if (localVideo.mozRequestFullScreen) { /* Firefox */
    localVideo.mozRequestFullScreen();
  } else if (localVideo.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    localVideo.webkitRequestFullscreen();
  } else if (localVideo.msRequestFullscreen) { /* IE/Edge */
    localVideo.msRequestFullscreen();
  }
}

toggleFullScreenBtn.addEventListener('click', toggleFullScreen);

// Call the setupLocalStream function to start accessing the user's media devices
setupLocalStream();

// Call the createPeerConnection function to create the peer connection and start the call
createPeerConnection();
