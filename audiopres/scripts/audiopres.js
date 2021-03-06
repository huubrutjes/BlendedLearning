var loadedScripts = 0;
var totalNrOfScripts = 3;

function InitScripts() {
     
    loadScript('settings.js', scriptComplete);

    loadScript('https://code.createjs.com/createjs-2015.11.26.min.js', scriptComplete);
    loadScript('https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js', scriptComplete);
   
}

function loadScript( url, callback ) {
  var script = document.createElement( "script" )
  script.type = "text/javascript";
  if(script.readyState) {  //IE
    script.onreadystatechange = function() {
      if ( script.readyState === "loaded" || script.readyState === "complete" ) {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  //Others
    script.onload = function() {
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName( "head" )[0].appendChild( script );
}

function scriptComplete() {
    loadedScripts++;
    console.log(loadedScripts);
    if(loadedScripts==totalNrOfScripts) {
        Init();
    }
}

var slides = [];
var currentSlide = 1;
var nextBtn;
var prevBtn;
var sounds = [];
var nrLoadedSounds = 0;
var speech = false;
var autoplay = false;
var omittedSlides = [];
var nrOfSlides = 0;




function Init() {

    nrOfSlides = settings.NROFSLIDES - omittedSlides.length;

    //load slide filenames
    slideSrc = [];
    for(var i=1;i<settings.NROFSLIDES+1;i++){
        if(!include(omittedSlides,i)){
            slideSrc.push("./slides/slide-" + Pad(i) + "." + settings.IMGTYPE);
        }

    }

    //create all the elements

    //container for everything
    container = document.createElement("div");
    container.className = "container";
    container.style.width = settings.WIDTH +"px";
    container.style.height = 1.1*settings.HEIGHT + "px";
    document.body.appendChild(container);

    //OBJECT FOR SLIDES
    slideFrame = document.createElement('object');
    slideFrame.className = "slides";
    container.appendChild(slideFrame);
    slideFrame.style.width = settings.WIDTH + "px";
    slideFrame.style.height = settings.HEIGHT + "px";

    //title text
    titleDiv = document.createElement("div");
    titleDiv.innerHTML = settings.TITLE;
    titleDiv.className = "title";
    container.appendChild(titleDiv);

    //create DIV for controls
    controlDiv = document.createElement('div');
    controlDiv.className = "control";
    container.appendChild(controlDiv);
    controlDiv.style.width = settings.WIDTH + "px";
    controlDiv.style.height = settings.HEIGHT/10 + "px";
    controlDiv.style.top = settings.HEIGHT +"px";

    //Create NEXT button
    nextBtn = document.createElement('button');
    var t = document.createTextNode(">");
    nextBtn.appendChild(t);
    nextBtn.className = "navDisabled";
    nextBtn.style.float = "right";
    controlDiv.appendChild(nextBtn);

    //Create PREVIOUS button
    prevBtn = document.createElement('button');
    var t = document.createTextNode("<");
    prevBtn.appendChild(t);
    prevBtn.className = "navDisabled";
    prevBtn.style.float = "left";    
    controlDiv.appendChild(prevBtn);

    //Create Stop/Play
    pauseBtn = document.createElement("button");
    var t = document.createTextNode("P");
    pauseBtn.appendChild(t);
    pauseBtn.className = "navDisabled";
    pauseBtn.style.float = "left";
    controlDiv.appendChild(pauseBtn);

    //create autoplay button
    autoPlayButton = document.createElement("button");
    var t = document.createTextNode("A");
    autoPlayButton.appendChild(t);
    autoPlayButton.className = "navDisabled";
    autoPlayButton.style.float = "left";
    controlDiv.appendChild(autoPlayButton);

    //create container for timeline
    timeline = document.createElement('div');
    timeline.className = "timeline";
    controlDiv.appendChild(timeline);

    //create start button
    startBtn = document.createElement("button");
    startBtn.className = "start";
    var t = document.createTextNode("START");
    startBtn.appendChild(t);
    container.appendChild(startBtn);
    startBtn.onclick = function(){
        speech = true;
        container.removeChild(startBtn);
        container.removeChild(startNoSoundBtn);
        container.removeChild(titleDiv);
        Start();
    }

    //create startbutton for no sound play
    startNoSoundBtn = document.createElement("button");
    startNoSoundBtn.className = "start";
    var t = document.createTextNode("without sound");
    startNoSoundBtn.appendChild(t);
    startNoSoundBtn.style.height = "10%";
    startNoSoundBtn.style.fontSize = "200%";
    startNoSoundBtn.style.marginTop = "2%";
    container.appendChild(startNoSoundBtn);
    startNoSoundBtn.onclick = function(){
        speech = false;
        container.removeChild(startBtn);
        container.removeChild(startNoSoundBtn);
        container.removeChild(titleDiv);
        Start();
    }
}

function include(arr,obj) {
    return (arr.indexOf(obj) != -1);
}

function Start() {
    
    var slideNr=1;
    if(speech){
        sounds=[];
        for(var i=1;i<settings.NROFSLIDES+1;i++){
            if(!include(omittedSlides,i)){
            sounds.push({src:"slide-"+Pad(i)+".mp3", id: "slide"+Pad(slideNr)})
                slideNr++;
            }
        }
        createjs.Sound.on("fileload", loadSound);
        audio = createjs.Sound.createInstance("myID");
        createjs.Sound.registerSounds(sounds, "./audio/");
    }

        timelineSlides = [];
    prevBtn.onclick = function() {
        ChangeSlide(-1);
    }
            nextBtn.onclick = function() {
        ChangeSlide(1);
    }

    if(!speech){
        for(var i=1;i<settings.NROFSLIDES+1;i++){
            if(!include(omittedSlides,i)){
                CreateSlideButton(slideNr-1);
                slideNr++;
            }
        }
    document.onkeydown = KeyPressed;
    ChangeSlide(0);
}        
}

function Pad(nr) {
return ('00'+nr).substr(-2);
}

function loadSound(event){
var i=event.id.slice(-2) - 1;
CreateSlideButton(i);

nrLoadedSounds++;
if(nrLoadedSounds==nrOfSlides) {
    pauseBtn.className = "navEnabled";
    autoPlayButton.className = "navEnabled";
    pauseBtn.onclick = Pause;
    autoPlayButton.onclick = function(){
        autoplay = !autoplay;
        if(autoplay){
            autoPlayButton.style.color = "red";
        } else {
            autoPlayButton.style.color = "black";
        }
    }
    ChangeSlide(0);
    document.onkeydown = KeyPressed;
    createjs.Ticker.addEventListener("tick", AdvancePlayhead);
}
}

function CreateSlideButton(i){
timelineSlides[i]= document.createElement("button");
timelineSlides[i].className = "timelineSlide";
var t = document.createTextNode(i+1);
timelineSlides[i].appendChild(t);
timelineSlides[i].style.width = settings.WIDTH*0.6/nrOfSlides +"px";
timelineSlides[i].style.left = i*settings.WIDTH*0.6/nrOfSlides+settings.WIDTH*0.3 +"px";
timelineSlides[i].onclick = function(){
    currentSlide = i+1;
    ChangeSlide(0);
}
timeline.appendChild(timelineSlides[i]);
}

function ChangeSlide(dn) {

for(var i in timelineSlides){
    timelineSlides[i].style.color = "black";
}
if(dn==1 && currentSlide<nrOfSlides) {
    currentSlide++;
}
else if(dn==-1 && currentSlide>1) {
    currentSlide--;
}
timelineSlides[currentSlide-1].style.color = "white";

if(currentSlide==1) {
    prevBtn.className = "navDisabled";
} else {
    prevBtn.className = "navEnabled";
}

if(currentSlide==nrOfSlides) {
    nextBtn.className = "navDisabled";
} else {
    nextBtn.className = "navEnabled";
}


slideFrame.setAttribute("data", slideSrc[currentSlide-1]);
var clone = slideFrame.cloneNode(true);
container.removeChild(slideFrame);
slideFrame = clone;
container.appendChild(slideFrame);


if(speech){
    audio.stop(); 
    audio.removeAllEventListeners();
    audio = createjs.Sound.play("slide" + Pad(currentSlide));
}

if(audio.paused){
            pauseBtn.style.color = "red";
        } else {
            pauseBtn.style.color = "black";
        }
}

function AdvancePlayhead(){
if(!audio.paused){
    var t = 100*audio.getPosition()/audio.getDuration();
    if(t!=0) {
        timelineSlides[currentSlide-1].style.background = "linear-gradient(90deg, orange "+t+"%, lightsteelblue "+t+"%)";
    } else {
        timelineSlides[currentSlide-1].style.background = "orange";
        if(autoplay&&currentSlide<nrOfSlides){
            ChangeSlide(1);
        }
    }
}
}

function KeyPressed(e) {
e = e || window.event;

if (e.keyCode == '38') {
    // up arrow
}
else if (e.keyCode == '40') {
    // down arrow
}
else if (e.keyCode == '37') {
    // left arrow
    ChangeSlide(-1);
}
else if (e.keyCode == '39') {
    // right arrow
    ChangeSlide(1);
}

else if (e.keyCode == '32') {
    // space bar
    Pause();
}
} 

function Pause(){
        audio.paused = !audio.paused;
        if(audio.paused){
            pauseBtn.style.color = "red";
        } else {
            pauseBtn.style.color = "black";
        }
    }

function handleInteraction(event) {
    event.target.alpha = (event.type == "mouseover") ? 1 : 0.5;
}