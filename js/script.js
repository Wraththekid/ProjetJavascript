function init() {
    document.getElementById("prev").addEventListener("click", prev);
    document.getElementById("prevTen").addEventListener("click", prevTen);
    document.getElementById("playPause").addEventListener("click", playPause);
    document.getElementById("nextTen").addEventListener("click", nextTen);
    document.getElementById("next").addEventListener("click", next);
    document.getElementById("videoPlayed").addEventListener("timeupdate", update);
    document.getElementById("progression").addEventListener("click", changeTime);
    addAjouter.addEventListener("click", add);
    addButton.addEventListener("click", showAdd);
    addAnnuler.addEventListener("click", hideAdd);

    for(var i=0;i<loadBtn.length;i++)
    {
        loadBtn[i].addEventListener("click", loadEvent);
    }

    for(var i=0;i<deleteBtn.length;i++)
    {
        deleteBtn[i].addEventListener("click", deleteEvent);
    }

    video = document.getElementById("videoPlayed");
    video.addEventListener("click", playPause);
    playPauseIcn = document.getElementById("playPauseIcn");
    console.log(document.getElementById("cadreVideo").offsetWidth);
    collection[0].classList.add("played");

    document.getElementById("progression").style.width = video.offsetWidth+'px';
    update();
}

var addAjouter = document.getElementById("addAjouter");
var addAnnuler = document.getElementById("addAnnuler");
var addButton = document.getElementById("addButton");
var addPanel = document.getElementById("add");
var collection = document.getElementsByClassName("item");
var loadBtn = document.getElementsByClassName("loadBtn");
var deleteBtn = document.getElementsByClassName("deleteBtn");
var videoPlay=false;
var heuresTot, minutesTot, secondesTot, heures, minutes, secondes;
var currentVideo = 0;


window.addEventListener("load", init);
window.addEventListener("resize", function () {
    document.getElementById("progression").style.width = video.offsetWidth+'px';
});

function showAdd() {
    addButton.classList.add("scale-out");
    setTimeout(function () {
        addButton.parentNode.classList.add("hide");
        addPanel.classList.remove("scale-out");
        addPanel.classList.add("scale-in");
    }, 200);
}

function add() {
    var cloned = collection[collection.length-1].parentNode.cloneNode(true);
    var url = document.getElementById("add").firstElementChild.firstElementChild.firstElementChild.firstElementChild.value;
    cloned.firstElementChild.lastElementChild.firstElementChild.id = url;
    cloned.firstElementChild.firstElementChild.firstElementChild.firstElementChild.src = url;
    collection[0].parentNode.parentNode.appendChild(cloned);
    collection = document.getElementsByClassName("item");
    loadBtn = document.getElementsByClassName("loadBtn");
    loadBtn[loadBtn.length-1].addEventListener("click", loadEvent);
    deleteBtn = document.getElementsByClassName("deleteBtn");
    deleteBtn[deleteBtn.length-1].addEventListener("click", deleteEvent);
}

function hideAdd() {
    addPanel.classList.remove("scale-in");
    addPanel.classList.add("scale-out");
    setTimeout(function () {
        addButton.parentNode.classList.remove("hide");
        addButton.classList.remove("scale-out");
        addButton.classList.add("scale-in");
    }, 200);
}

function loadEvent(event) {
    console.log(event.target);
     loadVideo(event.target.parentNode.id);
     for(var i=0;i<loadBtn.length;i++)
     {
        if(loadBtn[i].parentNode.id === event.target.parentNode.id)
        {
            collection[currentVideo].classList.remove("played");
            currentVideo = i;
            collection[currentVideo].classList.add("played");
        }
     }
     console.log(currentVideo);
}

function deleteEvent() {
    for(var i=0;i<collection.length;i++)
    {
        if(loadBtn[i].id === event.target.parentNode.id)
        {
            collection[i].parentNode.remove();
            collection = document.getElementsByClassName("item");
            loadBtn = document.getElementsByClassName("loadBtn");
            deleteBtn = document.getElementsByClassName("deleteBtn");
        }
    }
}

function loadVideo(src) {
    video.firstElementChild.src = src;
    video.load();
    setTimeout(update, 150);
}

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
    if(video.currentTime === 0){
        if(currentVideo > 0)
        {
            collection[currentVideo].classList.remove("played");
            currentVideo--;
            collection[currentVideo].classList.add("played");
        }else
        {
            collection[currentVideo].classList.remove("played");
            currentVideo = collection.length-1;
            collection[currentVideo].classList.add("played");
        }
        loadVideo(loadBtn[currentVideo].parentNode.id);
    }else
    {
        video.currentTime = 0;
        video.pause();
        videoPlay = false;
        playPauseIcn.textContent = "play_arrow";
    }
    console.log(currentVideo);
}

function prevTen() {
    if(video.currentTime > 10)
    {
        video.currentTime = video.currentTime - 10;
    }
}

function nextTen() {
    if(video.currentTime < video.duration - 10)
    {
        video.currentTime = video.currentTime + 10;
    }
}

function next() {
    console.log(collection.length);
    if(collection.length>currentVideo+1)
    {
        collection[currentVideo].classList.remove("played");
        currentVideo++;
        collection[currentVideo].classList.add("played");
    }else
    {
        collection[currentVideo].classList.remove("played");
        currentVideo=0;
        collection[currentVideo].classList.add("played");
    }
    loadVideo(loadBtn[currentVideo].parentNode.id);
    setTimeout(function () {
        video.play();
    }, 1000);
}

function update() {
    progress = document.getElementById("progressionBar");
    progress.style.width = (video.currentTime / video.duration * 100)+'%';
    if(video.currentTime === video.duration)
    {
        setTimeout(function () {
            next();
        }, 2000);
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

