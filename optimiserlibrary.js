//RENAME toggleAnimationOneShot
// apply a class to an element, with error checking and option to hide the element after. 
function applyClass(className, element, hide_after = false)
{
  // find out if element has been passed as the name or the object
  if (typeof element == 'string') element = document.getElementById(element);
  if (typeof element != ('string' || 'object')) console.log("applyClass: element not an object nor a string");
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

function appendRedundancy()
{
	// determin if passed or failed
	var passOrFailStatus = document.getElementById("formPassOrFail").checked;
	if (passOrFailStatus) document.getElementById("passOrFail").value = "Pass";
	else document.getElementById("passOrFail").value = "Fail";
	
	// Separate Name
	nameValue = document.getElementById("formName").value;
	var splitName = nameValue.split(", ");
	document.getElementById("processedLastName").value = splitName[0];
	document.getElementById("processedFirstName").value = splitName[1];
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
	
	

	// THIS SHOULD BE HANDLED in adjust skills
	/*
	if (levelChanged)
	{
		document.getElementById("fluency").value = 5;
		document.getElementById("pronunciation").value = 5;
		document.getElementById("grammar").value = 5;
		document.getElementById("vocabulary").value = 5;
		document.getElementById("comprehension").value = 5;
	}*/
}

function adjustSkills()
{ // this is called by the html oninput attribute in order to run every time number input has been adjusted
	
	// grab the levels no matter what
	var begLvl = parseFloat(document.getElementById("beginningLevel").value);
	var endLvl = parseFloat(document.getElementById("formEndLevel").value);
	
	// Since level can never go down, always secretly set the value for formEndLevel to be + 0.1 that of beginningLevel
	// (not setting min value because that creates a bug where the arrow keys won't function because arrow up is still below min!)
	if (endLvl < begLvl) document.getElementById("formEndLevel").value = (begLvl + 0.1); 
	
	// if one of the inputs is 0.0 or NaN the user either hasn't entered anything or something has gone wrong, exit and don't do anything!
	if (isNaN(begLvl) || isNaN(endLvl) || (begLvl == 0.0) || (endLvl == 0.0)) return;
	
	console.log(begLvl); console.log(endLvl);
	
	// Send what we recieve from the form to UIMP as "Final Score"
	document.getElementById("endLevel").value = endLvl.toString();
	var begCEFRLvl = ""; // A1, A2, B1, B2, C1, C2
	var endCEFRLvl = ""; // A1, A2, B1, B2, C1, C2
	var levelChanged = false;
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
		
		// Make all skills buttons 5s and break out of this function early
		document.getElementById("fluency-5").checked = true;
		document.getElementById("pronunciation-5").checked = true;
		document.getElementById("grammar-5").checked = true;
		document.getElementById("vocabulary-5").checked = true;
		document.getElementById("comprehension-5").checked = true;
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
		if (result > 5) result = 5;
	
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
	document.getElementById("formName").value = "";
	// document.getElementById("formName").placeholder = nameValue;
	
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
