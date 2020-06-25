var url = window.location.href;
var def = url.split("/")[4];
console.log(url,def);
$.ajax({
  url: "https://cors-anywhere.herokuapp.com/https://boiling-depths-05067.herokuapp.com/submit/workout/"+def,
  type: "GET",
  crossDomain: true,
  dataType: "json",
  success: function (response) {
      console.log(response); 
      $(".loader-wrapper").fadeOut("slow");
$('.tinder').css("visibility", "visible");
var items = response.data.items;
var json = response.data;
var title = document.getElementById('title');
title.innerHTML = json.timerName;
var noEx = document.getElementById('noEx');
noEx.innerHTML = items.length + " exercises";
var desc = document.getElementById('desc');
if(json.timerDescription){
desc.innerHTML = json.timerDescription;}

for(var j = 0; j < items.length; j++) 
{
console.log(items[j],j);
if(items[j].reps=="0"){
delete items[j].reps;
}
if(items[j].time=="0"){
delete items[j].time;
}
if(items[j].rest!='0'){
var time = items[j].rest.toString();
var item =  {
"excerciseName": "Rest",
"time":time,
"calories" :"1",
"upnext" : "1",
"rest" : "0"
};
items.splice(j+1,0,item);
}
}
console.log("to be passed",items);

var x = document.getElementById("myAudio"); 
var y = document.getElementById("beep"); 

var news = document.getElementsByClassName("tinder--cards")[0];                                                                               
var player = [];
var br,br1;
for(var i = 0; i < items.length; i++) {
var div = document.createElement("div");
div.className += " tinder--card";
if(items[i].img=='1'){
var img = document.createElement("img");
img.src = items[i].videoId;
}
else {
var img = document.createElement("div"); 
img.id = "ytplayer" + i;
img.classList += "video";
img.innerHTML = "Loading...";
img.style="font-size:2em;font-weight:bold";
img.width = "200";
img.height = "250"; 
if(items[i].excerciseName!='Rest'){
img.src = items[i].videoId;
}
else {
img.style.display="none";
img.innerHTML="<br><br>";
      
}
}
if(items[i].excerciseName!='Rest'){
var h3 = document.createElement("h3");
h3.innerHTML = items[i].excerciseName;}
else{
  var h3 = document.createElement("h1");
  h3.style.fontSize = "3em";
  h3.style.marginTop = "10vh";
h3.innerHTML = items[i].excerciseName;
h3.style.color="#4DD599";
}
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
span.innerHTML = items[i].reps+" reps";
p.append(span);}
var p2 = document.createElement("p"); 
if(items[i].upnext && i+1<items.length){
// console.log("enters",items[i].upnext,items[i+1].excerciseName.split(":"));
if(items[i+1].excerciseName.split(":")[1]){
  // console.log(": in next");
p2.innerHTML += "UP NEXT : " + items[i+1].excerciseName.split(":")[1];}
else {
p2.innerHTML += "UP NEXT : " + items[i+1].excerciseName;
// console.log("no :",p2);
}
p2.style.color = "brown";
p2.style.width="100%";
p2.style.backgroundColor = "#f0f8ff";
p2.style.paddingTop ="0.8em";
p2.style.paddingBottom ="0.8em";
}
var p3 = document.createElement("p");
p3.classList += "status";
div.appendChild(h3);
div.appendChild(img);
div.appendChild(br1);
div.appendChild(p);
div.appendChild(br);
div.appendChild(p2);
div.appendChild(p3);
// console.log("append",div);
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
      videoId: items[i].videoId,
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
    var i = 2;                  //  set your counter to 1
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
newCards[0].childNodes[13].innerHTML = "";
newCards[0].childNodes[3].innerHTML = "Workout Complete!" + "<br><br>"+json.timerName;
newCards[0].childNodes[7].innerHTML = "Workout Time : "+minute+":"+second ;
newCards[0].style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)'; 
newCards[0].classList.remove('removed');
initCards();
}
var play = 1;
pp.onclick = function charge() {

//  console.log("video is playing", videoisPlaying);
cords = document.querySelectorAll('.tinder--card:not(.removed)'); 
var status = cords[0].querySelectorAll('.status')[0];
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
  
 status.innerHTML = "";
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
 status.innerHTML = "<h3>Paused</h3>";
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
cards[0].querySelectorAll('.cards').innerHTML = "";
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

   if(last!=1 && card2.childElementCount>6){
   if(card2.childNodes[3].nodeName == 'DIV' && card2.childNodes[3].classList.contains('controlls') ){
    if (card2.childNodes[3].childNodes[0].classList.contains('display-remain-time')){

   //      console.log(document.getElementsByClassName("tinder--card")[index].childNodes);
   //      console.log(json.items[index-1],index,"passsed");
   seconds = json.items[index-1].time;
      if(player[index-2]){
    player[index-2].pauseVideo();}
   time = setInterval( function() { 
       countdownSeconds(index); }, 1000 );
 }}}
   else {
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
   
   if(cRemoved.childElementCount>6){
   if(cRemoved.childNodes[3].nodeName == 'DIV' && cRemoved.childNodes[3].classList.contains('controlls') ){
    if (cRemoved.childNodes[3].childNodes[0].classList.contains('display-remain-time')){ 
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
    player[index1-2].pauseVideo();
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

},
error: function (xhr, status) {
    alert("error");
}
});
