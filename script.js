const audioPlayer = document.getElementById("audio-player");
const playPauseBtn = document.getElementById("play-pause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const playlist = document.getElementById("playlist");
const currentSongTitle = document.getElementById("current-song");

let currentTrackIndex = 0;
let isPlaying = false;

// List of songs based on HTML <li> elements
const songs = Array.from(playlist.getElementsByTagName("li"));

// Load the selected track
function loadTrack(index) {
  const song = songs[index];
  audioPlayer.src = song.getAttribute("data-src");
  currentSongTitle.innerText = song.innerText;
}

// Play or pause the track
function togglePlayPause() {
  if (isPlaying) {
    audioPlayer.pause();
    playPauseBtn.innerText = "Play";
  } else {
    audioPlayer.play();
    playPauseBtn.innerText = "Pause";
  }
  isPlaying = !isPlaying;
}

// Play the previous track
function playPrevTrack() {
  currentTrackIndex = currentTrackIndex > 0 ? currentTrackIndex - 1 : songs.length - 1;
  loadTrack(currentTrackIndex);
  audioPlayer.play();
  isPlaying = true;
  playPauseBtn.innerText = "Pause";
}

// Play the next track
function playNextTrack() {
  currentTrackIndex = currentTrackIndex < songs.length - 1 ? currentTrackIndex + 1 : 0;
  loadTrack(currentTrackIndex);
  audioPlayer.play();
  isPlaying = true;
  playPauseBtn.innerText = "Pause";
}

// Event listeners
playPauseBtn.addEventListener("click", togglePlayPause);
prevBtn.addEventListener("click", playPrevTrack);
nextBtn.addEventListener("click", playNextTrack);

// Handle playlist item click
songs.forEach((song, index) => {
  song.addEventListener("click", () => {
    currentTrackIndex = index;
    loadTrack(index);
    audioPlayer.play();
    isPlaying = true;
    playPauseBtn.innerText = "Pause";
  });
});

// Automatically play the next track when the current one ends
audioPlayer.addEventListener("ended", playNextTrack);

// Initial load of the first track
loadTrack(currentTrackIndex);
