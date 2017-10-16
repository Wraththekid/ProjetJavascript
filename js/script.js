function playPause()
{
    console.log("test");
    if(videoPlay)
    {
        playPauseIcn.textContent = "play_arrow";
        video.pause();
        videoPlay=false;
    }else
    {
        playPauseIcn.textContent = "pause";
        video.play();
        videoPlay=true;
    }
}

function prev() {
    video.currentTime = 0;
    video.pause();
    videoPlay = false;
    playPauseIcn.textContent = "play_arrow";
}

function prevTen() {
    video.currentTime = video.currentTime - 10;
}

function nextTen() {
    video.currentTime = video.currentTime + 10;
}

function next() {

}

function init() {
    document.getElementById("prev").addEventListener("click", prev);
    document.getElementById("prevTen").addEventListener("click", prevTen);
    document.getElementById("playPause").addEventListener("click", playPause);
    document.getElementById("nextTen").addEventListener("click", nextTen);
    document.getElementById("next").addEventListener("click", next);
    video = document.getElementById("videoPlayed");
    playPauseIcn = document.getElementById("playPauseIcn");
    document.getElementById("progression").style.width = document.getElementById("videoPlayed").offsetWidth+'px';
}
var videoPlay=false;
window.addEventListener("load", init);