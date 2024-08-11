// scripts.js

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let audioBuffer, sourceNode, gainNode, pitchNode, delayNode;
let isPlaying = false;
let startTime = 0;
let pauseTime = 0;

// Elements
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const stopButton = document.getElementById('stop');
const volumeSlider = document.getElementById('volume');
const pitchSlider = document.getElementById('pitch');
const echoCheckbox = document.getElementById('echo');

// Load Audio Function
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

    delayNode = audioContext.createDelay();
    delayNode.delayTime.value = echoCheckbox.checked ? 0.3 : 0;

    sourceNode.connect(gainNode);
    gainNode.connect(pitchNode);
    pitchNode.connect(delayNode);
    delayNode.connect(audioContext.destination);

    sourceNode.playbackRate.value = pitchSlider.value;
}

function playAudio() {
    if (audioBuffer) {
        if (isPlaying) return;  // Prevent multiple playbacks
        createAudioGraph();

        startTime = pauseTime ? pauseTime : 0;
        sourceNode.start(0, startTime);
        isPlaying = true;

        sourceNode.onended = () => {
            isPlaying = false;
            pauseTime = 0;  // Reset pauseTime after playback ends
        };
    }
}

function pauseAudio() {
    if (isPlaying) {
        pauseTime = audioContext.currentTime - startTime;
        sourceNode.stop();
        isPlaying = false;
    }
}

function stopAudio() {
    if (isPlaying) {
        sourceNode.stop();
        isPlaying = false;
        pauseTime = 0;  // Reset pauseTime when stopped
    }
}

// Button Event Listeners
playButton.addEventListener('click', playAudio);
pauseButton.addEventListener('click', pauseAudio);
stopButton.addEventListener('click', stopAudio);

volumeSlider.addEventListener('input', () => {
    if (gainNode) gainNode.gain.value = volumeSlider.value;
});

pitchSlider.addEventListener('input', () => {
    if (sourceNode) sourceNode.playbackRate.value = pitchSlider.value;
});

echoCheckbox.addEventListener('change', () => {
    if (delayNode) delayNode.delayTime.value = echoCheckbox.checked ? 0.3 : 0;
});

// Load a demo audio file (Replace with actual file URL)
loadAudio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
