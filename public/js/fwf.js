
var json = {"items": [
    
 
  {
"exerciseName": "Circuit 1: Alternate Forward Lunges",
"exerciseGif":  "Fyc5QqXEEQE",
"time":"12",
"calories" :"1",
      "upnext" : "1"
},
{
"exerciseName": "Rest",
"exerciseGif":  "dZgVxmf6jkA",  
"time":"15",
"calories" :"1",
"upnext" : "1"
},
{
"exerciseName": "Circuit 1: Burpees",
"exerciseGif":  "dZgVxmf6jkA", 
"reps":"45",
"calories" :"1"
},
{
"exerciseName": "Rest",
"exerciseGif": "dZgVxmf6jkA",
"time":"15",
"calories" :"1",
"upnext" : "1"
},
{
"exerciseName": "Circuit 1: Butt Kicks",
"exerciseGif":  "dtvAxibgYQ",
"time":"45",
"calories" :"1"
},
{
"exerciseName": "Rest",
"exerciseGif": "dtvAxibgYQ",
"time":"15",
"calories" :"1",
"upnext" : "1"
} ,
{
"exerciseName": "Circuit 1: Jumping Jacks",
"exerciseGif":  "iSSAk4XCsRA",
"time":"45",
"calories" :"1"
},
{
"exerciseName": "Rest",
"exerciseGif": "iSSAk4XCsRA",
"time":"15",
"calories" :"1",
"upnext" : "1"
} ,       {
"exerciseName": "Circuit 2: Mountain Climbers",
"exerciseGif":  "De3Gl-nC7IQ",
"time":"45",
"calories" :"1",
      "upnext" : "1"
},
{
"exerciseName": "Rest",
"exerciseGif": "De3Gl-nC7IQ",
"time":"15",
"calories" :"1",
"upnext" : "1"
},
{
"exerciseName": "Circuit 2: Squats",
"exerciseGif":  "UXJrBgI2RxA",
"time":"45",
"calories" :"1"
}
]};

var x = document.getElementById("myAudio"); 
var y = document.getElementById("beep"); 

var news = document.getElementsByClassName("tinder--cards")[0];
var items = json.items;
var player = [];
var br,br1;
for(var i = 0; i < items.length; i++) {
var div = document.createElement("div");
div.className += " tinder--card";
if(items[i].img=='1'){
var img = document.createElement("img");
img.src = items[i].exerciseGif;
}
else {
var img = document.createElement("div"); 
img.id = "ytplayer" + i;
img.classList += "video";
img.innerHTML = "Loading...";
img.style="font-size:2em;font-weight:bold";
if(items[i].muted=='1'){
img.muted=false;
img.id = 'mute';
img.loop=false;
}
else{
   img.muted = true;
   img.loop=true;
}
img.width = "200";
img.height = "250"; 
img.src = items[i].exerciseGif;
if(items[i].exerciseName!='Rest'){
img.src = items[i].exerciseGif;
}
else {
   img.src ="https://media.giphy.com/media/krP2NRkLqnKEg/giphy.mp4";
      }
}
var h3 = document.createElement("h3");
h3.innerHTML = items[i].exerciseName;
br = document.createElement("br");
br1 = document.createElement("br");

if(items[i].time){
var p = document.createElement("div");
p.className +='controlls';
var span = document.createElement("span");
span.innerHTML = items[i].time;
span.className += 'display-remain-time';
p.append(span);}
else 
{var p = document.createElement("div");
p.className +='controlls';
var span = document.createElement("span");
}
if(items[i].reps){
span.innerHTML = items[i].reps+" reps";
p.append(span);}

var p2 = document.createElement("p"); 
if(items[i].upnext && i+1<items.length){
// console.log(items[i].upnext,items[i+1].exerciseName.split(":"));
if(items[i+1].exerciseName.split(":")[1]){
p2.innerHTML += "<br>UP NEXT : " + items[i+1].exerciseName.split(":")[1];}
else {
p2.innerHTML += "<br>UP NEXT : " + items[i+1].exerciseName;
}
p2.style.color = "brown";
   p2.style.fontFamily = "Oswald";
}
div.appendChild(h3);
div.appendChild(img);
div.appendChild(br1);
div.appendChild(p);
div.appendChild(br);
div.appendChild(p);
news.appendChild(div);
}
/*initializing content above*/
/*youtube iframe api*/
function onPlayerReady(event) {
}
var videoisPlaying = 0;


function loadVideo(i) {
  console.log("player",i,"is loaded");
   window.YT.ready(function() {
    player[i] = new window.YT.Player("ytplayer"+i, {
      height: "250",
      width: "340",
      enablejsapi : "1",
      playerVars: {
        'controls': 1,           
        'showinfo': 0,
        'rel': 0},
      videoId: items[i].exerciseGif,
      events: {
        onReady : function(e) {
          console.log("Video Ready");
          e.target.pauseVideo();
        },
        onStateChange : function(e) {
          var pp1 = document.getElementById('pp1');
          if (e.data === YT.PlayerState.ENDED) {
            console.log("video has ended");
          }
           if(e.data === YT.PlayerState.PLAYING){
            console.log("video is playing");
            videoisPlaying = 1;
           }
          else{
            console.log("video is paused");
            videoisPlaying = 0;
          }

          
          if (pp1.classList[1] == "fa-pause" && e.data === YT.PlayerState.PLAYING) {
            pp.click();
            console.log("video is playing, timer is playing -> Timer should be paused");
            } 
            if (pp1.classList[1] == "fa-play" && e.data === YT.PlayerState.PAUSED) {
              //pp.click();
              console.log("video is paused, timer is paused -> Timer should continue");
              } 
          
          // if (pp1.classList[1] == "fa-play") 
          // {if( e.data === YT.PlayerState.PAUSED) {
          //   console.log("video is paused then timer is paused");
          //   pp.click();
          // }

          // }
        
            // clearInterval(time);
            // cords = document.querySelectorAll('.tinder--card:not(.removed)'); 
            // var parent = cords[0].parentNode;
            // // The equivalent of parent.children.indexOf(child)
            // var index = Array.prototype.indexOf.call(parent.children, cords[0]);
            // time = setInterval( function() { 
            // //   countdownSeconds(index); }, 1000 ); 
          
        }
          
      }
    });
  });
}

function seek(sec,i){
  if(player[i]){
      time += sec;
      player[i].seekTo(time, true);
  }
}

$(document).ready(function() {
  $.getScript("https://www.youtube.com/iframe_api", function() {
    loadVideo(0);
    loadVideo(1);
    loadVideo(2);
    var i = 3;                  //  set your counter to 1
    var length = items.length;

function myLoop() {         //  create a loop function
  setTimeout(function() {   //  call a 3s setTimeout when the loop is called
    console.log('hello');   //  your code here
    loadVideo(i);
    i++;                    //  increment the counter
    if (i < length) {           //  if the counter < 10, call the loop function
      myLoop(i);             //  ..  again which will trigger another 
    }                       //  ..  setTimeout()
  }, 6000)
}

myLoop();  

  });
});

var tinderContainer = document.querySelector('.tinder');
var allCards = document.querySelectorAll('.tinder--card');
var co = document.querySelectorAll('.removed');
var pp = document.getElementById('pp');
var pp1 = document.getElementById('pp1');
var cords;
var started = false;
var timeElapsed;


function theEnd(){

var moveOutWidth = document.body.clientWidth * 1.5;
var newCards = document.querySelectorAll('.tinder--card');
clearInterval(time);
clearInterval(timeElapsed);
   minute = parseInt(sec / 60, 10);
   second = parseInt(sec % 60, 10);
   minute = minute < 10 ? "0" + minute : minute;
   second = second < 10 ? "0" + second : second;
var buttons = document.getElementsByClassName('tinder--buttons');
newCards[0].childNodes[3].src = "workouts//completed.jpg";
newCards[0].childNodes[7].innerHTML = "Workout Time : "+minute+":"+second ;
newCards[0].style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)'; 
newCards[0].classList.remove('removed');
initCards();
}
var play = 1;
pp.onclick = function charge() {

//  console.log("video is playing", videoisPlaying);
cords = document.querySelectorAll('.tinder--card:not(.removed)'); 
var parent = cords[0].parentNode;
// The equivalent of parent.children.indexOf(child)
var index = Array.prototype.indexOf.call(parent.children, cords[0]);
if(started==false){
timeElapsed = setInterval(totalTime,1000);
love.click();
}
if(play!=1)
//timer is played
{
if(videoisPlaying==1){
console.log("video should be paused");
player[index-1].pauseVideo();
}

// player[index-1].playVideo();//index is always one behind the playe index

  pp1.classList.remove("fa-play"); 
pp1.classList.remove("fa-close"); 
  pp1.classList.add("fa-pause");
  play = 1;
clearInterval(timeElapsed);
clearInterval(time);
if(cords[0].childNodes[0].tagName=='VIDEO'){
cords[0].childNodes[0].play();}
timeElapsed = setInterval(totalTime,1000);
if(index==0){
   index++;
}
time = setInterval( function() { 
       countdownSeconds(index); }, 1000 );

}
//timer is paused
else{
 
if(videoisPlaying==1){
console.log("nothing should be done");
}

 
// player[index-1].pauseVideo();//index is always one behind the player index
  pp1.classList.remove("fa-pause"); 
pp1.classList.remove("fa-close"); 
  pp1.classList.add("fa-play");
  play = 0;
clearInterval(time);
clearInterval(timeElapsed);
if(cords[0].childNodes[0].tagName=='VIDEO'){
cords[0].childNodes[0].pause();}
x.pause();
y.pause();  
}
}
var sec = 0;
function totalTime(){
sec = sec +1;
// console.log(sec);
}

//buttons to be clicked
var nope = document.getElementById('nope');
var love = document.getElementById('love');

/*adding countdown timer*/
function countdownSeconds(index) {
   var news = document.getElementsByClassName("tinder--card");
var cards = document.querySelectorAll('.tinder--card:not(.removed)');
   if (cards.length == 0)
   {
       theEnd();
       return;
   }
   var secondsSpan = news[index].getElementsByClassName('display-remain-time')[0];
   
   var video = news[index].getElementsByClassName('video')[0];
   if(seconds<=6){
       y.play();
   }
   
  if(video.innerHTML!="Loading..."){
  if(seconds>=1){
  seconds = seconds - 1;}
  else{
      secondsSpan.textContent = "00:00";
      console.log(index,"countdown over");
      love.click();
  }}
  
   minute = parseInt(seconds / 60, 10);
   second = parseInt(seconds % 60, 10);
   minute = minute < 10 ? "0" + minute : minute;
   second = second < 10 ? "0" + second : second;
   secondsSpan.textContent = minute + ":" + second;
}

var tinderContainer = document.querySelector('.tinder');
var allCards = document.querySelectorAll('.tinder--card');

var where = 0;
var prevRemoved;

function initCards(card, index) {
var newCards = document.querySelectorAll('.tinder--card:not(.removed)');

  if (newCards.length == 0)
   {
       theEnd();
       return;
   }
newCards.forEach(function (card, index) {
// console.log("going to load video",player[0]);
card.style.zIndex = allCards.length - index;
card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 1 * index + 'px)';
card.style.opacity = (10 - index) / 10;
});

tinderContainer.classList.add('loaded');
}

initCards();

var cRemoved;        

function createButtonListener(love,cwhere) {
   clearInterval(time);
return function (event) {
if(started== false){
pp1.classList.remove("fa-play"); 
pp1.classList.add("fa-pause");
x.play(); 
timeElapsed = setInterval(totalTime,1000);}
if (started!=false && pp1.classList.contains("fa-play")){
pp1.classList.remove("fa-play"); 
pp1.classList.add("fa-pause");
}
started = true;
var cards = document.querySelectorAll('.tinder--card:not(.removed)');
var moveOutWidth = document.body.clientWidth * 1.5;


 cList =  document.querySelectorAll(' .removed');
 cRemoved = cList[cList.length-1];
var card = cards[0];
 //problems due to the last variable
if(cards.length>1){
var card2 = cards[1];
   var parent = card2.parentNode;
// The equivalent of parent.children.indexOf(child)
var index = Array.prototype.indexOf.call(parent.children, card2);
last = 0;
}
else {
   parent = card.parentNode;
// The equivalent of parent.children.indexOf(child)
   index1 = Array.prototype.indexOf.call(parent.children, parent.lastChild);
   last = 1;
}

      if (!cards.length){
 card = cRemoved;
          pp1.classList.remove("fa-play");
          pp1.classList.add("fa-close");
}
if (cwhere==1){
card.classList.add('removed');
if(cards[0].childNodes[0].tagName=='VIDEO'){
cards[0].childNodes[0].pause();}}
if (cwhere==2){
// console.log("yooh",cRemoved.childNodes);
cRemoved.classList.toggle('removed');

}
if (love) {
 card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)'; 
   clearInterval(time);

   if(last!=1 && card2.childElementCount>4){
   if(card2.childNodes[4].nodeName == 'DIV' && card2.childNodes[4].classList.contains('controlls') ){
    if (card2.childNodes[4].childNodes[0].classList.contains('display-remain-time')){
   // console.log(card2.childNodes[4].innerText);
   //      console.log(document.getElementsByClassName("tinder--card")[index].childNodes);
   //      console.log(json.items[index-1],index,"passsed");
   seconds = json.items[index-1].time;
   // player[index-1].playVideo();
   time = setInterval( function() { 
       countdownSeconds(index); }, 1000 );
 }}}
   else {
     // player[index-2].pauseVideo();
     // player[index-1].playVideo();

       //  console.log(json.items[index1-1],index1,"passsed");
        seconds = json.items[index1-1].time;
       time = setInterval( function() { 
       countdownSeconds(index1); }, 1000 )
   }
} else {
 card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
   // console.log("kooooooo");
   
   if(!time){
   clearInterval(time);
   time=null;
   }
   
   if(cRemoved.childElementCount>4){
   if(cRemoved.childNodes[4].nodeName == 'DIV' && cRemoved.childNodes[3].classList.contains('controlls') ){
    if (cRemoved.childNodes[4].childNodes[0].classList.contains('display-remain-time')){ 
   if(last!=1){
   seconds = json.items[index-3].time;
   clearInterval(time);
   // console.log("hey thre delilah:")
   // seek(0,index-3);
   // player[index-3].playVideo();
   time = setInterval( function() {
       countdownSeconds(index-2); }, 1000 );}
   else {
   seconds = json.items[index1-2].time;
   // seek(0,index1-3);
   // seek(0,index1-2);
   // player[index1-2].pauseVideo();
   // player[index1-3].playVideo();
   clearInterval(time);
   time = setInterval( function() {
       countdownSeconds(index1-1); }, 1000 );
   }
       
 }}
}
}
initCards();

event.preventDefault();
};
}

var nopeListener = createButtonListener(false,2);
var loveListener = createButtonListener(true,1);
var time, last;   
nope.addEventListener('click', nopeListener);
love.addEventListener('click', loveListener);


/*space and left right for laptop*/
document.onkeydown = function(e) {
switch (e.keyCode) {
   case 38 :        
       document.getElementById('pp').click();
       break;
   case 37:
       if(started==true){
createButtoListener(false,2);}
       break;
   case 39:    
       if(started== false){
  pp1.classList.remove("fa-play"); 
pp1.classList.remove("fa-close"); 
  pp1.classList.add("fa-pause");
x.play();           
timeElapsed = setInterval(totalTime,1000);
}
createButtoListener(true,1);
       break;

}
};
document.onkeyup = function(e) {
switch (e.keyCode) {
   case 32 : 
       document.getElementById('pp').click();
       break;
}
};

function checkKey(e) {

e = e || window.event;

if (e.keyCode == '38') {
   // up arrow
}
else if (e.keyCode == '40') {
   // down arrow
}
else if (e.keyCode == '37') {
var coListener = createButtonListener(false,2);
}
else if (e.keyCode == '39') {
var boListener = createButtonListener(true,1);
}

}