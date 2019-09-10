function pluginBlank()
{
	document.getElementById("theForm").action = "";

	document.getElementById("processedLastName").name = "";
	document.getElementById("processedFirstName").name = "";

	document.getElementById("location").name = "";
	// you need to manually fill in the location field here
	document.getElementById("location").value = "";

	document.getElementById("formMonth").name = "";
	document.getElementById("formDay").name = "";
	document.getElementById("formYear").name = "";

	document.getElementById("passOrFail").name = "";

	document.getElementById("processedISOWeekNumber").name = "";

	document.getElementById("group").name = "";

	document.getElementById("teachersNames").name = "";

	// CEFR Level at Beginning
	document.getElementById("levelAtBeginning").name = "";
	// CEFR Level at End
	document.getElementById("levelAtEnd").name = "";
	// final score
	document.getElementById("endLevel").name = "";

	document.getElementById("changedLevel").name = "";

	document.getElementById("fluency").name = "";
	document.getElementById("pronunciation").name = "";
	document.getElementById("grammar").name = "";
	document.getElementById("vocabulary").name = "";
	document.getElementById("comprehension").name = "";

	document.getElementById("formHomework").name = "";
	document.getElementById("formParticipation").name = "";

	document.getElementById("comment").name = "";
}

function pluginDummyForm()
{
	document.getElementById("theForm").action = "https://docs.google.com/forms/d/e/1FAIpQLSeBzokJL941yd1cK6EpZZAfNr_4UjUTi-irPZdsHYHK0ksAug/formResponse";

	document.getElementById("processedLastName").name = "entry.1492703236";
	document.getElementById("processedFirstName").name = "entry.691428241";

	// document.getElementById("location").name = "entry.2016812996";
	// you need to manually fill in the location field here
	//document.getElementById("location").value = "DummyForm";

	document.getElementById("formMonth").name = "entry.610744709_month";
	document.getElementById("formDay").name = "entry.610744709_day";
	document.getElementById("formYear").name = "entry.610744709_year";

	document.getElementById("passOrFail").name = "entry.1586687761";

	document.getElementById("processedISOWeekNumber").name = "entry.2070190421";

	document.getElementById("group").name = "entry.7297452";

	document.getElementById("teachersNames").name = "entry.1453395066";

	// CEFR Level at Beginning
	document.getElementById("levelAtBeginning").name = "entry.1977718501";
	// CEFR Level at End
	document.getElementById("levelAtEnd").name = "entry.1619190485";
	// final score
	document.getElementById("endLevel").name = "entry.1815583882";

	document.getElementById("changedLevel").name = "entry.502099535";

	document.getElementById("fluency").name = "entry.1839803024";
	document.getElementById("pronunciation").name = "entry.498561152";
	document.getElementById("grammar").name = "entry.1379348697";
	document.getElementById("vocabulary").name = "entry.835827768";
	document.getElementById("comprehension").name = "entry.1952347568";

	document.getElementById("formHomework").name = "entry.2054164790";
	document.getElementById("formParticipation").name = "entry.230056582";

	document.getElementById("comment").name = "entry.1141405581";
}
