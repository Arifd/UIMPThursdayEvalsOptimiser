//RENAME toggleAnimationOneShot
// apply a class to an element, with error checking and option to hide the element after. 
function applyClass(className, element, hide_after = false)
{
  // find out if element has been passed as a string reference or the Element itself
  if (typeof element === 'string') element = document.getElementById(element);
  if (!(element instanceof Element)) console.log("applyClass: element not an object nor a string (" + element + ": " + typeof element + ")");
  if (element.classList.contains(className))
  {
    element.classList.remove(className);
    void element.offsetWidth; // Trigger reflow before re-adding
    element.classList.add(className);
    // wait for animation to end then remove the element.
    if (hide_after) element.addEventListener('animationend', function() { element.style.display = 'none'; }, {once: true});
  }
  else element.classList.add(className);
  // wait for animation to end then remove the element.
  if (hide_after) element.addEventListener('animationend', function() { element.style.display = 'none'; }, {once: true});
  // Clean up by removing any existing className
  element.addEventListener('animationend', function() { element.classList.remove(className); }, {once: true});
}

// in FF there is a 'bug' that clicking the number input buttons don't focus the number input.
// this function forces the browser to focus when button clicked.
document.onreadystatechange = function() {
  if (document.readyState == "complete") {
    var inputs = document.querySelectorAll('[type="number"]');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].onclick = function() {
        this.focus();
      }
    }
  }
}

// update global variable storing name when first name form field onblur
function learnName() {nameValue = document.getElementById("firstName").value;}

function appendRedundancy()
{
	// determin if passed or failed
	var passOrFailStatus = document.getElementById("formPassOrFail").checked;
	if (passOrFailStatus) document.getElementById("passOrFail").value = "Pass";
	else document.getElementById("passOrFail").value = "Fail";
	
	alert(document.getElementById("firstName").value);
	
	// Process date
	var today = new Date();
	if (today.getDay() == 4) var theFriday = new Date(today.getTime() + (24 * 60 * 60 * 1000));
	else if (today.getDay() == 5) var theFriday = today;
	else if (today.getDay() == 6) var theFriday = new Date(today.getTime() - (24 * 60 * 60 * 1000));
	else var theFriday = new Date(today.getTime() + ((24 * 60 * 60 * 1000) * (5 - today.getDay())));
 	//document.getElementById("formDate").value = d.toDateString();
 	document.getElementById("formMonth").value = theFriday.getMonth()+1;
 	document.getElementById("formDay").value = theFriday.getDate();
 	document.getElementById("formYear").value = theFriday.getFullYear();
	function getWeekNumber(d)
	{
	    // Copy date so don't modify original
	    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
	    // Set to nearest Thursday: current date + 4 - current day number
	    // Make Sunday's day number 7
	    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
	    // Get first day of year
	    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
	    // Calculate full weeks to nearest Thursday
	    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
	    // Return array of year and week number
	    return weekNo;
	}
	// Process ISO week number
	document.getElementById("processedISOWeekNumber").value = getWeekNumber(today);
}

//A helper function
function berlitz2CEFR(berlitz)
{
	if (berlitz < 1.6) { return "A1" }
	else if (berlitz < 3.6) { return "A2" }
	else if (berlitz < 5.6) { return "B1" }
	else if (berlitz < 7.6) { return "B2" }
	else if (berlitz < 9.1) { return "C1" }
	else if (berlitz >= 9.1) {return "C2" }
	else return "ERROR";
}

function adjustSkills()
{ // this is called by the html onblur attribute in order to run every time number input has been adjusted

	// grab the levels no matter what
	var begLvl = parseFloat(document.getElementById("beginningLevel").value);
	var endLvl = parseFloat(document.getElementById("formEndLevel").value);

        //Reset: print out what the CEFR levels are. (Will be recalculated later)
	document.getElementById('beginningLevelLabel').innerHTML = "Working level:";
	document.getElementById('formEndLevelLabel').innerHTML = "Final score:";
  

	// Check if the inputs have valid numbers in them, if not, return from this function early.
	// if one of the inputs is 0.0 or NaN, or Null or undefined, a boolean test will return false.
	inputsNotReady = (...inputs) => inputs.some(i => !Boolean(i));
	if (inputsNotReady(begLvl, endLvl)) return;

	// Since levels can't go down, reject this case and return early
	if (endLvl <= begLvl) { endLvl = null; document.getElementById("formEndLevel").value = endLvl; applyClass("shake","formEndLevel"); return;}
	
        // print out what the CEFR levels are
        document.getElementById('beginningLevelLabel').innerHTML = `Working level: (${berlitz2CEFR(begLvl)})`;
	document.getElementById('formEndLevelLabel').innerHTML = `Final score: (${berlitz2CEFR(endLvl)})`;
	
	// Send what we recieve from the form to UIMP as "Final Score"
	document.getElementById("endLevel").value = endLvl.toString();
	var begCEFRLvl = ""; // A1, A2, B1, B2, C1, C2
	var endCEFRLvl = ""; // A1, A2, B1, B2, C1, C2
	var levelChanged = false;
	// get CEFR Levels
	begCEFRLvl = berlitz2CEFR(begLvl);
	endCEFRLvl = berlitz2CEFR(endLvl);
	document.getElementById("levelAtBeginning").value = begCEFRLvl;
	document.getElementById("levelAtEnd").value = endCEFRLvl;
	// apply "Changed Level"
	if (begCEFRLvl == endCEFRLvl)
	{
		document.getElementById("changedLevel").value = "NO";
		levelChanged = false;
	} 
	else
	{
		document.getElementById("changedLevel").value = "YES";
		levelChanged = true;
		
		// Make all skills buttons 5s (with funky animation) and break out of this function early
                function animateLevelChange(i) {
		let flu = document.getElementById("fluency-"+i); flu.checked = true;
		let pro = document.getElementById("pronunciation-"+i); pro.checked = true;
		let gra = document.getElementById("grammar-"+i); gra.checked = true;
		let voc = document.getElementById("vocabulary-"+i); voc.checked = true;
		let com = document.getElementById("comprehension-"+i); com.checked = true;
                if (++i <= 5) setTimeout(animateLevelChange, 100, i);
                }
                animateLevelChange(1);
		return;
	}
	
	// adjust skills buttons to comply with newly entered level
		var distanceLow = 0.0;
		var distanceHigh = 0.0;
		if (endCEFRLvl == "A1")
		{
			distanceLow = 0.0;
			distanceHigh = 1.5;
		}
		if (endCEFRLvl == "A2")
		{
			distanceLow = 1.6;
			distanceHigh = 3.5;
		}
		if (endCEFRLvl == "B1")
		{
			distanceLow = 3.6;
			distanceHigh = 5.5;
		}
		if (endCEFRLvl == "B2")
		{
			distanceLow = 5.6;
			distanceHigh = 7.5;
		}
		if (endCEFRLvl == "C1")
		{
			distanceLow = 7.6;
			distanceHigh = 9.0;
		}
		if (endCEFRLvl == "C2")
		{
			distanceLow = 9.1;
			distanceHigh = 12.0;
		}
		var range = distanceHigh - distanceLow;
		var stepSize = range / 5.0;
		var score = endLvl - distanceLow;
		var result = Math.floor(score / stepSize) + 1;
		
		// constrain results
		if (result < 2) result = 2;
		if (result > 4) result = 4;
	
		// apply new value to skills
		document.getElementById("fluency-"+result).checked = true;
		document.getElementById("pronunciation-"+result).checked = true;
		document.getElementById("grammar-"+result).checked = true;
		document.getElementById("vocabulary-"+result).checked = true;
		document.getElementById("comprehension-"+result).checked = true;
}

function afterSubmit()
{	
	// clean certain form fields
	document.getElementById("firstName").value = "";
	document.getElementById("lastName").value = "";
	
	document.getElementById("beginningLevel").value = null;
	// document.getElementById("beginningLevel").placeholder = begLvl;
	document.getElementById("formEndLevel").value = null;
	// document.getElementById("formEndLevel").placeholder = parseFloat(document.getElementById("formEndLevel").value);;
	
	// add information of previous form to html
	// (not yet implemented)
}

function popup()
{
	alert("Hello! I am an alert box!");
}
