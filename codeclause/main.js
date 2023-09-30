// Select all the elements in the HTML page and assign them to a variable
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let random_btn = document.querySelector(".random-track");
let play_btn = document.querySelector(".play-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".back-track");
let repeat_btn = document.querySelector(".repeat-track");

let seek_slider = document.querySelector(".seek_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement('audio');

// Define the list of tracks that have to be played
let track_list = [
    {
        name: "Ae Dil Hai Mushkil",
        artist: "Arijit Singh",
        image: "images/AeDilHaiMushkil.png",
        path: "songs/AeDilHaiMushkil.mp3"
    },
    {
        name: "Love me like you do",
        artist: "Ellie Goulding",
        image: "images/loveme.png",
        path: "songs/loveme.mp3"
    },
    {
        name: "Chamak Challo",
        artist: "Akon & Iyer",
        image: "images/chamak.png",
        path: "songs/ChamakChallo.mp3"
    },
    {
        name: "Believer",
        artist: "Dan Reynolds",
        image: "images/believer.png",
        path: "songs/Believer.mp3"
    },
    {
        name: "Sanam Re",
        artist: "Arijit Singh",
        image: "images/sanamRe.png",
        path: "songs/SanamRe.mp3",
    },
    {
        name: "Chaleya",
        artist: "Arijit Singh",
        image: "images/chaleya.png",
        path: "songs/chaleya.mp3"
    },
    
];


function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues();
    
    curr_track.src = track_list[track_index].path;          //Load the track
    curr_track.load();
    
    // Updating the details of the track
    track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    
    // Set an interval of 1000 milliseconds for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);
    
    // Move to the next track if the current finishes using the 'ended' event
    curr_track.addEventListener("ended", nextTrack);
}
    
function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function randomTrack(){
    track_index = Math.floor(Math.random() * track_list.length);
    loadTrack(track_index);
    playTrack();
}

function playpauseTrack() {
        // Depending on current state switch between playing and pause state
        if (!isPlaying) playTrack();
        else pauseTrack();
}
        
function playTrack() {
        curr_track.play();                  // Play the loaded track
                isPlaying = true;
        
        // Replace icon with the pause icon
        play_btn.innerHTML = '<i class="fa fa-pause-circle fa-2xl"></i>';
}
        
function pauseTrack() {
        curr_track.pause();                 // Pause the loaded track
        isPlaying = false;
        
        // Replace icon with the play icon
        play_btn.innerHTML = '<i class="fa fa-play-circle fa-2xl"></i>';
}
        
function nextTrack() {
        // Go back to the first track if the current one is the last in the track list
        if (track_index < track_list.length - 1)
            track_index += 1;
        else 
            track_index = 0;
        
        loadTrack(track_index);         // Load and play the new track
        playTrack();
}
        
function backTrack() {
        // Go back to the last track if the current one is the first in the track list
        if (track_index > 0)
            track_index -= 1;
        else 
            track_index = track_list.length - 1;
        
        loadTrack(track_index);          // Load and play the new track
        playTrack();
}

repeat_btn.addEventListener("click",()=>{    //Repeating the song from starting
    curr_track.currentTime=0;
})
        
function seekTo() {
    // Calculating the seek position by the percentage of the seek slider
    seek = curr_track.duration * (seek_slider.value / 100);
    
    // Set the current track position to the calculated seek position
    curr_track.currentTime = seek;
}
    
function seekUpdate() {
    let seekPosition = 0;

    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;
    
        // Calculate the time left and the total duration
        let currMin = Math.floor(curr_track.currentTime / 60);
        let currSec = Math.floor(curr_track.currentTime - currMin * 60);
        let durationMin = Math.floor(curr_track.duration / 60);
        let durationSec = Math.floor(curr_track.duration - durationMin * 60);
    
        // Add a zero to the single digit time values
        if (currSec < 10) { currSec = "0" + currSec; }
        if (durationSec < 10) { durationSec = "0" + durationSec; }
        if (currMin < 10) { currMin = "0" + currMin; }
        if (durationMin < 10) { durationMin = "0" + durationMin; }
    
        // Display the updated duration
        curr_time.textContent = currMin + ":" + currSec;
        total_duration.textContent = durationMin + ":" + durationSec;
    }
}

// Load the first track in the tracklist
loadTrack(track_index);

       