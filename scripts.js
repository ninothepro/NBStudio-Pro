// scripts.js

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let audioBuffer, sourceNode, gainNode, pitchNode, echoNode;
let isPlaying = false;

// Elements
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const stopButton = document.getElementById('stop');
const volumeSlider = document.getElementById('volume');
const pitchSlider = document.getElementById('pitch');
const echoCheckbox = document.getElementById('echo');
const cropButton = document.getElementById('crop');
const recordButton = document.getElementById('record');

async function loadAudio(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
}

function createAudioGraph() {
    if (sourceNode) sourceNode.disconnect();

    sourceNode = audioContext.createBufferSource();
    sourceNode.buffer = audioBuffer;

    gainNode = audioContext.createGain();
    gainNode.gain.value = volumeSlider.value;

    pitchNode = audioContext.createBiquadFilter();
    pitchNode.type = 'allpass';

    echoNode = audioContext.createDelay();
    echoNode.delayTime.value = echoCheckbox.checked ? 0.5 : 0;

    sourceNode.connect(gainNode);
    gainNode.connect(pitchNode);
    pitchNode.connect(echoNode);
    echoNode.connect(audioContext.destination);

    sourceNode.playbackRate.value = pitchSlider.value;
}

playButton.addEventListener('click', () => {
    if (!isPlaying) {
        createAudioGraph();
        sourceNode.start(0);
        isPlaying = true;
    }
});

pauseButton.addEventListener('click', () => {
    if (audioContext.state === 'running') {
        audioContext.suspend();
    } else {
        audioContext.resume();
    }
});

stopButton.addEventListener('click', () => {
    if (isPlaying) {
        sourceNode.stop(0);
        isPlaying = false;
    }
});

volumeSlider.addEventListener('input', () => {
    if (gainNode) gainNode.gain.value = volumeSlider.value;
});

pitchSlider.addEventListener('input', () => {
    if (sourceNode) sourceNode.playbackRate.value = pitchSlider.value;
});

echoCheckbox.addEventListener('change', () => {
    if (echoNode) echoNode.delayTime.value = echoCheckbox.checked ? 0.5 : 0;
});

// Dummy implementation for crop and record (actual implementations need more work)
cropButton.addEventListener('click', () => {
    alert('Crop functionality is not yet implemented.');
});

recordButton.addEventListener('click', () => {
    alert('Record functionality is not yet implemented.');
});

// Load a demo audio file (You can replace this with your own)
loadAudio('path_to_your_audio_file.mp3');
