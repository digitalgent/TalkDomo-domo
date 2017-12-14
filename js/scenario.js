/**
 *  Define Scenario
 */
var name = "james";
var score = 0;
var transcript = "";
var statelog = "";

// Script Functions come before Script

function respondTime (speech, data)
{
  // TTS
  now = new Date();
  speak("Het is nu " + now.getHours() + " uur en " + now.getMinutes() + " minuten.");

  // Timer
  var tm = setTimeout(function(){ setMood("sleep"); }, 4000)
}

function switchLights (speech, data)
{
  // TTS
  speak("Komt in orde.");

  // API
  apiConnect({action: "lights"});

  // Mood switch
  setMood("passive aggresive")

  // Timer
  var tm = setTimeout(function(){ setMood("sleep"); }, 2000);
}

function switchAlarm (speech, data)
{
  // TTS
  speak("Komt in orde.");

  // API
  apiConnect({action: "alarm"});

  // Mood switch
  setMood("passive aggresive")

  // Timer
  var tm = setTimeout(function(){ setMood("sleep"); }, 2000);
}

function Temp (speech, data)
{
  // TTS
  speak("Het is nu 20 graden.");

  setMood("Happy")

  var tm = setTimeout(function(){ setMood("sleep"); }, 2000);

}

function setName (speech, data)
{

  apiConnect({action: "getName"});

  Naam = new Naam()
  speak("Mijn naam is" + Naam.getName());

  // Mood switch
  setMood("Happy")

  // Timer
  var tm = setTimeout(function(){ setMood("sleep"); }, 2000);
}

function test (speech, data)
{
  // TTS
  speak("Ik kan praten");

  // Timer
  var tm = setTimeout(function(){ setMood("sleep"); }, 2000);
}
// ----------------- Script --------------------------

var scripts = {
  "hoe laat is het": {func: respondTime},
  "lichten aan": {func: switchLights},
  "lichten uit": {func: switchLights},
  "disco": {status: "disco"},
  "alarm aan": {func: switchAlarm},
  "alarm uit": {func: switchAlarm},
  "hoe warm is het": {func: Temp},
  "wat is jouw naam": {func: setName},
  "zeg iets": {func: test}
}



// --------------- Processing Code --------------------

function processScenario (speech, data)
{
  console.log("processing:", data)

  if(data.status) setMood(data.status);

  if(data.func) data.func(speech, data)
}

function setMood (mood)
{
  if (statelog != mood)
  {
    console.log("mood is:", mood);

    apiConnect({status: mood});
    statelog = mood;
  }
}

function apiConnect (data)
{
  console.log("connecting to API", data);
}
