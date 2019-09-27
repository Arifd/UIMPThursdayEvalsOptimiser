 function hasClass( target, className )
 { // a helper function to test if a target contains a specific class property
    return new RegExp('(\\s|^)' + className + '(\\s|$)').test(target.className);
}

function clamp(val, min, max) {
// a helper function to clamp values
    return val > max ? max : val < min ? min : val;
}

function sendForm() {

manageButton("sending");
// put here backend code to send data

// manageButton("success") - when google confirms all good (status: 200)
    setTimeout(function(){
        // manageButton( "success"; )
    },2300);

// manageButton("error") - when google returns an error code
    setTimeout(function(){
        manageButton("success");
    },2300);
    
// display your error/confirmation messages, ask what to do then go idle.
// manageButton("idle");

}

 function manageButton(command) {
 
 // target submit button
 var submitButton = document.getElementById("submitButton");
 
 // since we are now undergoing some kind of command,
 // disable the button from being clicked again, until otherwise applicable
 submitButton.onclick = "";
 
 // setup a static/(global) variable flag that will be applied when the animation timing is right
 submitButtonFlag = command;
 
 // maybe remember previous state of button in orer to go back to it when finished?
 // var submitButtonPreviousState = submitButton.className;
 
 // create a pair of transition functions to psuedo blend.
 function transitionOn() {
  let elem = document.getElementById("psuedo-transition-layer");
  elem.style.opacity = 0;
  elem.style.width = "100%";
  elem.style.height = "100%";
  elem.style.borderRadius = "4px";
  elem.style.backgroundColor = "#ffffff";
  elem.style.opacity = 1;
  /*
  let full = 35;
  let opac = 0;
  let id1 = setInterval(frame1, 50);
  function frame1() {
	if (opac < full) {
	opac += 40;
    elem.style.opacity = clamp(opac/full,0,1);
    }
    if (opac >= full) clearInterval(id1);
  }
  */
}
function transitionOff() {
  let elem = document.getElementById("psuedo-transition-layer");
  let full = 35;
  let opac = full;
  let id2 = setInterval(frame2, 50);
  // this method is buggy because it spawns a thread, repeated spawns don't override old ones
  // so if you make a rapid change then you have two animations occuring at the same time
  function frame2() {
	if (opac > 0) {
	opac -= 6;
    elem.style.opacity = clamp(opac/full,0,1);
    }
    if (opac <= 0) clearInterval(id2);
  }
}
 
 // create functions for the different states
 function setIdle()
 {
 submitButton.style.pointerEvents = "auto";
 if (hasClass(submitButton,'active')) { submitButton.classList.remove('active'); }
 if (!hasClass(submitButton,'blue')){
 transitionOn();
 submitButton.className = "progress-btn button blue";
 transitionOff();
 }
 document.getElementById("submitButtonText").innerHTML = "Send";
 // make the button clickable again
 // submitButton.setAttribute('onclick','sendForm()');
 submitButton.onclick = function(){ sendForm(); };

 }
 
 function setSuccess()
 {
 submitButton.style.pointerEvents = "none";
  submitButton.classList.remove('active');
  if (!hasClass(submitButton,'green')){
  transitionOn();
 submitButton.className = "progress-btn button green";
 transitionOff();
 }
 document.getElementById("submitButtonText").innerHTML = "Sent";
 }
 
 function setError()
 {
 submitButton.style.pointerEvents = "none";
  submitButton.classList.remove('active');
  if (!hasClass(submitButton,'red')){
  transitionOn();
 submitButton.className = "progress-btn button red";
 transitionOff();
 }
 document.getElementById("submitButtonText").innerHTML = "Error";
 }
 
 function setSending()
 {
 submitButton.style.pointerEvents = "none";
  if (!hasClass(submitButton,'active')) {
  submitButton.classList.add('active');
  document.getElementById("submitButtonText").innerHTML = "Sending...";
 }
 }
  
 ///////// Manage commands/button states /////////
 function manageStates() {
 if (submitButtonFlag == "idle") {setIdle();}
 else if (submitButtonFlag == "sending") {setSending();}
 else if (submitButtonFlag == "error") {setError();}
 else if (submitButtonFlag == "success") {setSuccess();}
 }
 
manageStates();
///////////
// Disabled the below because I can't have the button change asynchronously
// otherwise it will look out of sync with the other GUI events
// occuring to indicate success or faliure
//////////
/*
// if not active, just jump straight, but if active, use an eventlistener
if (!hasClass(submitButton,'active')) { manageStates(); }

// Create a listener that will change button status when animation ready

else submitButton.addEventListener('animationiteration', function() {manageStates();},{once:true});
*/
}
