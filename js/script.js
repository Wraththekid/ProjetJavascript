function init() {
    document.getElementById("prev").addEventListener("click", prev);
    document.getElementById("prevTen").addEventListener("click", prevTen);
    document.getElementById("playPause").addEventListener("click", playPause);
    document.getElementById("nextTen").addEventListener("click", nextTen);
    document.getElementById("next").addEventListener("click", next);
    document.getElementById("videoPlayed").addEventListener("timeupdate", update);
    document.getElementById("progression").addEventListener("click", changeTime);

    video = document.getElementById("videoPlayed");
    playPauseIcn = document.getElementById("playPauseIcn");
    console.log(document.getElementById("cadreVideo").offsetWidth);

    document.getElementById("progression").style.width = video.offsetWidth+'px';
    update();
}
var videoPlay=false;
var heuresTot, minutesTot, secondesTot, heures, minutes, secondes;
window.addEventListener("load", init);
window.addEventListener("resize", function () {
    document.getElementById("progression").style.width = video.offsetWidth+'px';
});

function playPause()
{
    if(videoPlay)
    {
        playPauseIcn.textContent = "play_arrow";
        video.pause();
        videoPlay=false;
    }else
    {
        if(video.currentTime === video.duration)
        {
            video.currentTime=0;
        }
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

function update() {
    progress = document.getElementById("progressionBar");
    progress.style.width = (video.currentTime / video.duration * 100)+'%';
    if(video.currentTime === video.duration)
    {
        videoPlay = false;
        playPauseIcn.textContent = "play_arrow";
    }
    heuresTot = Math.floor(video.duration / 3600);
    minutesTot = Math.floor((video.duration % 3600) / 60);
    secondesTot = Math.floor((video.duration - heuresTot*3600 - minutesTot*60));

    heures = Math.floor(video.currentTime / 3600);
    minutes = Math.floor((video.currentTime % 3600) / 60);
    secondes = Math.floor((video.currentTime - heures*3600 - minutes*60));

    if(heuresTot===0){
        document.getElementsByClassName("time")[0].textContent = showTime(minutes) + ':' + showTime(secondes) + '/' + showTime(minutesTot) + ':' + showTime(secondesTot);
    }else{
        document.getElementsByClassName("time")[0].textContent = showTime(heures) + ':' + showTime(minutes) + ':' + showTime(secondes) + '/' + showTime(heuresTot) + ':' + showTime(minutesTot) + ':' + showTime(secondesTot);
    }
}

function showTime(number) {
    if(number<10)
    {
        return '0'+number;
    }
    return number;
}

function changeTime(event) {
    var x = event.pageX;
    var baseX = getPosition(video);
    video.currentTime = (x-baseX)/video.offsetWidth*video.duration;
}

function getPosition(element){
    var left = 0;

    do {
        left += element.offsetLeft;
    } while (element = element.offsetParent);

    return left;
}

