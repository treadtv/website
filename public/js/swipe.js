var url = window.location.href;
var api_loc = url.split("/");
console.log(api_loc);
 
 $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://tread-builder.herokuapp.com/api/"+api_loc[api_loc.length-1],
            type: "GET",
            crossDomain: true,
            dataType: "json",
            success: function (response) {
                console.log(response); 
                $(".loader-wrapper").fadeOut("slow");
      $('.tinder').css("visibility", "visible");  
var json = response[0];
var items = json.items; 
console.log(items);
var dupITEMS = items.length;
for(var j = 0; j < items.length; j++) {
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
var x = document.getElementById("myAudio"); 
var y = document.getElementById("beep"); 

var news = document.getElementsByClassName("tinder--cards")[0];
news.getElementsByTagName("p")[0].innerHTML = json.timerName;
var br,br1;
for(var i = 0; i < items.length; i++) {
    var div = document.createElement("div");
    div.className += " tinder--card";

    
    if(items[i].img=='1'){
    var img = document.createElement("img");
    img.src = items[i].excerciseGIF;
    }
    else {
    var img = document.createElement("video");
    
    if(items[i].muted=='1'){
    img.muted=false;
        img.id = 'mute';img.loop=false;}
    else{
        img.muted = true;
        img.loop=true;
    }
    img.playsinline=true;
    img.setAttribute("playsinline","true");
    img.setAttribute("muted","true");
    img.preload = 'auto';
    var source = document.createElement("source");
    
    
    if(items[i].excerciseName!='Rest'){
    source.src = items[i].excerciseGIF;
    source.setAttribute("type","video/mp4");
}
    else {
        source.src ="https://media.giphy.com/media/krP2NRkLqnKEg/giphy.mp4";
        source.setAttribute("type","video/mp4");
    }
    img.appendChild(source);
    }
    var h3 = document.createElement("h3");
    h3.innerHTML = items[i].excerciseName;
     br = document.createElement("br");
    br1 = document.createElement("br");
    var p = document.createElement("div");
    
    
    if(items[i].time){
    p.className +='controlls';
    var span = document.createElement("span");
    span.innerHTML = items[i].time;
    span.className += 'display-remain-time';
    p.append(span);}
    else {
        p.innerHTML = "<br>";
    }
    
    var p1 = document.createElement("p");
    p1.className += 'no-br';
    if(items[i].reps){
    p1.innerHTML = items[i].reps+" reps";}
    else if(items[i].upnext && i+1<items.length){
    if(items[i+1].excerciseName.split(":")[1]){
    p1.innerHTML = "UP NEXT : " + items[i+1].excerciseName.split(":")[1];}
    else {
    p1.innerHTML = "UP NEXT : " + items[i+1].excerciseName;
    }
    p1.style.color = "brown";
        p1.style.fontFamily = "Oswald";
    }
    div.appendChild(img);
    div.appendChild(h3);
    div.appendChild(br1);
    div.appendChild(p);
    div.appendChild(br);
    div.appendChild(p1);
    news.appendChild(div);
}
/*initializing content above*/

var tinderContainer = document.querySelector('.tinder');
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
    console.log(newCards[0].childNodes);
        minute = parseInt(sec / 60, 10);
        second = parseInt(sec % 60, 10);
        minute = minute < 10 ? "0" + minute : minute;
        second = second < 10 ? "0" + second : second;
     var buttons = document.getElementsByClassName('tinder--buttons');
    newCards[0].childNodes[3].src = "/workouts/completed.gif";
    newCards[0].childNodes[7].innerHTML = "Workout Time : "+minute+":"+second ;
    newCards[0].style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)'; 
    newCards[0].classList.remove('removed');
    initCards();
}

pp.onclick = function charge() {
cords = document.querySelectorAll('.tinder--card:not(.removed)'); 
video = cords[0].getElementsByTagName('video')[0];
console.log(video);
var parent = cords[0].parentNode;
    console.log("in here",started,pp1);
// The equivalent of parent.children.indexOf(child)
var index = Array.prototype.indexOf.call(parent.children, cords[0]);
if(started==false){
     timeElapsed = setInterval(totalTime,1000);
    createButtoListener(true,1);
}
if(pp1.classList[1] == "fa-play"){
    console.log("play");
       pp1.classList.remove("fa-play"); 
    pp1.classList.remove("fa-close"); 
       pp1.classList.add("fa-pause");
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
   
    if((video)&&(video.id == 'mute')){
    x.pause();
    y.pause();
    console.log('yolobolo',x);
}
    else {
        console.log('culprit',video,video.id);
        x.play();
    }
}
    else{
        console.log("pause");
       pp1.classList.remove("fa-pause"); 
    pp1.classList.remove("fa-close"); 
       pp1.classList.add("fa-play");
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
    console.log(sec);
}

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
        var video =news[index].getElementsByTagName('video')[0];
        if(seconds<=6){
            y.play();
        }
        if(seconds>=1){
        seconds = seconds - 1;}
        else{
            secondsSpan.textContent = "00:00";
            var closer = createButtoListener(true,1);
            console.log("hmmm is it?");
        }
        minute = parseInt(seconds / 60, 10);
        second = parseInt(seconds % 60, 10);
        minute = minute < 10 ? "0" + minute : minute;
        second = second < 10 ? "0" + second : second;
        secondsSpan.textContent = minute + ":" + second;
}

var tinderContainer = document.querySelector('.tinder');
var allCards = document.querySelectorAll('.tinder--card');
var nope = document.getElementById('nope');
var love = document.getElementById('love');
var where = 0;
var prevRemoved;

function initCards(card, index) {
  var newCards = document.querySelectorAll('.tinder--card:not(.removed)');
       if (newCards.length == 0)
        {
            theEnd();
            return;
        }
  var video = newCards[0].getElementsByTagName('video')[0];
     
if(video){
video.currentTime = 0;
  video.play();
if(video.id == 'mute'){
    x.pause();
    console.log('yolo',x);
}
    else {
        x.play();
    }}

  newCards.forEach(function (card, index) {
    card.style.zIndex = allCards.length - index;
    card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 1 * index + 'px)';
    card.style.opacity = (10 - index) / 10;
  });
  
  tinderContainer.classList.add('loaded');
}

initCards();

allCards.forEach(function (el) {
  var hammertime = new Hammer(el);

  hammertime.on('pan', function (event) {
    el.classList.add('moving');
  });

    
    
  hammertime.on('panright', function (event) {
      where = 1;
    if (event.deltaX === 0) return;
    if (event.center.x === 0 && event.center.y === 0) return;

    tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
    tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);

    var xMulti = event.deltaX * 0.03;
    var yMulti = event.deltaY / 80;
    var rotate = xMulti * yMulti;

    event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
  }); 
    
    
    hammertime.on('panleft', function (event) {
    where = 2;
      console.log("left");
    if (event.deltaX === 0) return;
    if (event.center.x === 0 && event.center.y === 0) return;

    tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
    tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);

    var xMulti = event.deltaX * 0.03;
    var yMulti = event.deltaY / 80;
    var rotate = xMulti * yMulti;

    event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
  });
    
var list;
var cList;
    
    
  hammertime.on('panend', function (event) {
        clearInterval(time);
      console.log(started,where,"tym");
    if(started==false && where==1){
    pp1.classList.remove("fa-play"); 
    pp1.classList.remove("fa-close"); 
    pp1.classList.add("fa-pause");
    x.play(); 
    timeElapsed = setInterval(totalTime,1000);}
      started=true;
      list =  document.querySelectorAll(' .removed');
      prevRemoved = list[list.length-1];
    tinderContainer.classList.remove('tinder_love');
    tinderContainer.classList.remove('tinder_nope');
      
    /*from bottom fns*/
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
      
      
      
    var moveOutWidth = document.body.clientWidth;
    var keep = Math.abs(event.deltaX) < 60 || Math.abs(event.velocityX) < 0.5;
      if(where==1){
      event.target.classList.toggle('removed', !keep);
    if(cards[0].childNodes[0].tagName=='VIDEO'){
    cards[0].childNodes[0].pause();}
        }
      if(where==2){
     event.target.classList.toggle('removed', !keep);
      console.log(event,"pre",prevRemoved);
      prevRemoved.classList.toggle('removed');    
      event.target.classList.toggle('removed');
      console.log(event,"yo",prevRemoved.target);
      }

    if (keep) {
      event.target.style.transform = '';
    } else {
      var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
      var toX = event.deltaX > 0 ? endX : -endX;
      var endY = Math.abs(event.velocityY) * moveOutWidth;
      var toY = event.deltaY > 0 ? endY : -endY;
      var xMulti = event.deltaX * 0.03;
      var yMulti = event.deltaY / 80;
      var rotate = xMulti * yMulti;
      event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
      
    if (where==1) {
        clearInterval(time);
    
        if(last!=1 && card2.childElementCount>5){
        if(card2.childNodes[3].nodeName == 'DIV' && card2.childNodes[3].classList.contains('controlls') ){
         if (card2.childNodes[3].childNodes[0].classList.contains('display-remain-time')){
        console.log(card2.childNodes[3].innerText);
             console.log(document.getElementsByClassName("tinder--card")[index].childNodes);
             console.log(json.items[index-1],index,"passsed");
        seconds = json.items[index-1].time;
        time = setInterval( function() { 
            countdownSeconds(index); }, 1000 );
      }}}
        else {
             console.log(json.items[index1-1],index1,"passsed");
             seconds = json.items[index1-1].time;
            clearInterval(time);
            time = setInterval( function() { 
            countdownSeconds(index1); }, 1000 )
        }
    } else {
        console.log("kooooooo");
        
        if(!time){
        clearInterval(time);
        time=null;
        }
        
        if(cRemoved.childElementCount>5){
        if(cRemoved.childNodes[3].nodeName == 'DIV' && cRemoved.childNodes[3].classList.contains('controlls') ){
         if (cRemoved.childNodes[3].childNodes[0].classList.contains('display-remain-time')){
        console.log('bolo',last); 
        if(last!=1){
        seconds = json.items[index-3].time;
        clearInterval(time);
        time = setInterval( function() {
            countdownSeconds(index-2); }, 1000 );}
        else {
        seconds = json.items[index1-2].time;
        clearInterval(time);
        time = setInterval( function() {
            countdownSeconds(index1-1); }, 1000 );
        }
            
      }}
    }
    }    
        
        
        
      initCards();
    }
  });
});

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
    
        if(last!=1 && card2.childElementCount>5){
        if(card2.childNodes[3].nodeName == 'DIV' && card2.childNodes[3].classList.contains('controlls') ){
         if (card2.childNodes[3].childNodes[0].classList.contains('display-remain-time')){
        console.log(card2.childNodes[3].innerText);
             console.log(document.getElementsByClassName("tinder--card")[index].childNodes);
             console.log(json.items[index-1],index,"passsed");
        seconds = json.items[index-1].time;
        time = setInterval( function() { 
            countdownSeconds(index); }, 1000 );
      }}}
        else {
             console.log(json.items[index1-1],index1,"passsed");
             seconds = json.items[index1-1].time;
            time = setInterval( function() { 
            countdownSeconds(index1); }, 1000 )
        }
    } else {
      card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
        console.log("kooooooo");
        
        if(!time){
        clearInterval(time);
        time=null;
        }
        
        if(cRemoved.childElementCount>5){
        if(cRemoved.childNodes[3].nodeName == 'DIV' && cRemoved.childNodes[3].classList.contains('controlls') ){
         if (cRemoved.childNodes[3].childNodes[0].classList.contains('display-remain-time')){
        console.log('bolo',last); 
        if(last!=1){
        seconds = json.items[index-3].time;
        clearInterval(time);
        time = setInterval( function() {
            countdownSeconds(index-2); }, 1000 );}
        else {
        seconds = json.items[index1-2].time;
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



/*for the keyboard buttons*/
function createButtoListener(love,cwhere) {
        clearInterval(time);
    started = true;
    var cards = document.querySelectorAll('.tinder--card:not(.removed)');
    var moveOutWidth = document.body.clientWidth * 1.5;
      cList =  document.querySelectorAll(' .removed');
      cRemoved = cList[cList.length-1];
    var card = cards[0];
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
    
        if(last!=1 && card2.childElementCount>5){
        if(card2.childNodes[3].nodeName == 'DIV' && card2.childNodes[3].classList.contains('controlls') ){
         if (card2.childNodes[3].childNodes[0].classList.contains('display-remain-time')){
        console.log(card2.childNodes[3].innerText);
             console.log(document.getElementsByClassName("tinder--card")[index].childNodes);
             console.log(json.items[index-1],index,"passsed");
        seconds = json.items[index-1].time;
        time = setInterval( function() { 
            countdownSeconds(index); }, 1000 );
      }}}
        else {
             console.log(json.items[index1-1],index1,"passsed");
             seconds = json.items[index1-1].time;
            time = setInterval( function() { 
            countdownSeconds(index1); }, 1000 );
        }
    } else {
      card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
        console.log("kooooooo");
        if(!time){
        clearInterval(time);
        time=null;
        }
        
        if(cRemoved.childElementCount>5){
        if(cRemoved.childNodes[3].nodeName == 'DIV' && cRemoved.childNodes[3].classList.contains('controlls') ){
         if (cRemoved.childNodes[3].childNodes[0].classList.contains('display-remain-time')){
        console.log('bolo'); 
        if(last!=1){
        seconds = json.items[index-3].time;
        
        clearInterval(time);
        time = setInterval( function() {
            countdownSeconds(index-2); }, 1000 );}
        else {
        seconds = json.items[index1-2].time;
        clearInterval(time);
        time = setInterval( function() {
            countdownSeconds(index1-1); }, 1000 );
        }
            
      }}
    }
    }
    initCards();
}

/*space and left right for laptop*/
document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 38 :        
            console.log("mind yo psace");
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
                console.log(pp1.classList);
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
