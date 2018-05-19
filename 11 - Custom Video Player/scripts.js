const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullscreenButton = player.querySelector(".fullscreen");

let isClicked = false;

function togglePlay(e) {
  let shouldToggle = false;
  if((e.type === "click") || (e.type === "keydown" && e.key === " ")) {
    shouldToggle = true;
  }
  if(video.paused && shouldToggle) {
    video.play();
    return;
  }
  if(!video.paused && shouldToggle) {
    video.pause();
    return;
  }
}

function setToggleButtonText() {
  const buttonText = (video.paused ? '►' : '❚ ❚'); 
  
  toggle.textContent = buttonText;
}

function skipTime() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  if(isClicked) {
    video[this.name] = this.value;
  }
}

function handleVideoProgress() {
  const progress = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = progress + "%";
}

function scrub(scrub_event) {
  if((scrub_event.type === "click") || (scrub_event.type === "mousemove" && isClicked)) {
    const scrubTime = Math.ceil(video.duration * (scrub_event.offsetX / progress.offsetWidth));
    video.currentTime = scrubTime;
  }
}

function toggleFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  }
  if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
  if(element.mozRequestFullscreen) {
    element.mozRequestFullscreen();
  }
  if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

window.addEventListener("keydown", togglePlay);
window.addEventListener("mousedown", () => isClicked = true);
window.addEventListener("mouseup", () => isClicked = false);
video.addEventListener("click", togglePlay);
video.addEventListener("play", setToggleButtonText);
video.addEventListener("pause", setToggleButtonText);
video.addEventListener("timeupdate", handleVideoProgress);
toggle.addEventListener("click", togglePlay);

for(let button of skipButtons) {
  button.addEventListener("click", skipTime);
}

for(let range of ranges) {
  range.addEventListener("change", handleRangeUpdate);
  range.addEventListener("mousemove", handleRangeUpdate);
}

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", scrub);

fullscreenButton.addEventListener("click", () => {
  toggleFullscreen(video);
});
