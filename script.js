document.addEventListener("DOMContentLoaded", () => {
    let trackCount = 0;

    // Function to add a new track
    window.addTrack = function() {
        trackCount++;
        const track = document.createElement('div');
        track.className = 'track';
        track.id = `track${trackCount}`;
        track.innerHTML = `
            <span>Track ${trackCount}</span>
            <div class="track-controls">
                <button onclick="adjustPitch(${trackCount})">Pitch</button>
                <button onclick="adjustSpeed(${trackCount})">Speed</button>
                <button onclick="adjustVolume(${trackCount})">Volume</button>
                <button onclick="removeTrack(${trackCount})">Remove</button>
            </div>
        `;
        document.querySelector('.tracks').appendChild(track);
    };

    // Function to remove a track
    window.removeTrack = function(trackId) {
        document.getElementById(`track${trackId}`).remove();
    };

    // Placeholder function for adjusting pitch
    window.adjustPitch = function(trackId) {
        console.log(`Adjusting pitch for track ${trackId}`);
    };

    // Placeholder function for adjusting speed
    window.adjustSpeed = function(trackId) {
        console.log(`Adjusting speed for track ${trackId}`);
    };

    // Placeholder function for adjusting volume
    window.adjustVolume = function(trackId) {
        console.log(`Adjusting volume for track ${trackId}`);
    };

    // Placeholder function for recording voice-over
    window.recordVoiceOver = function() {
        console.log('Recording voice-over');
    };

    // Placeholder functions for menu bar
    window.newProject = function() {
        console.log('New project created');
    };

    window.saveProject = function() {
        console.log('Project saved');
    };

    window.loadProject = function() {
        console.log('Project loaded');
    };

    window.exportProject = function() {
        console.log('Project exported');
    };

    window.settings = function() {
        console.log('Settings opened');
    };
});
