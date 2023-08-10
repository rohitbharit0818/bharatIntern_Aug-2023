const startButton = document.getElementById('start-button');
const toggleCameraButton = document.getElementById('toggle-camera');
const toggleMicButton = document.getElementById('toggle-mic');
const endButton = document.getElementById('end-button');
const videoContainer = document.getElementById('video-container');

let localStream;
let peerConnections = [];

startButton.addEventListener('click', startVideoCall);
toggleCameraButton.addEventListener('click', toggleCamera);
toggleMicButton.addEventListener('click', toggleMicrophone);
endButton.addEventListener('click', endVideoCall);

async function startVideoCall() {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        
        // Display local video
        const localVideo = createVideoElement(localStream, 'local');
        videoContainer.appendChild(localVideo);

        // Code to establish a signaling server connection and set up peer connections
        // This involves creating an offer, sending it to the remote peer, receiving answer, etc.

    } catch (error) {
        console.error('Error accessing media devices:', error);
    }
}

function createVideoElement(stream, id) {
    const videoElement = document.createElement('video');
    videoElement.id = id + '-video';
    videoElement.srcObject = stream;
    videoElement.autoplay = true;
    videoElement.muted = true; // Mute local video
    return videoElement;
}

function toggleCamera() {
    if (localStream) {
        const videoTrack = localStream.getVideoTracks()[0];
        videoTrack.enabled = !videoTrack.enabled;
    }
}

function toggleMicrophone() {
    if (localStream) {
        const audioTrack = localStream.getAudioTracks()[0];
        audioTrack.enabled = !audioTrack.enabled;
    }
}

function endVideoCall() {
    // Close all peer connections
    peerConnections.forEach(connection => {
        connection.close();
    });

    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
    }

    // Remove video elements
    document.querySelectorAll('video').forEach(videoElement => {
        videoElement.remove();
    });
}
