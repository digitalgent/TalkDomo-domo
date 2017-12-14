'use strict';
var state, recognizer;

// try and define to get SpeechRecognition
try {
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition || null;
}
catch(err) {
  console.error("Starting Web Speech API Error:", err.message);
  var SpeechRecognition = null;
}

// event handler
function addEventHandler(elem, eventType, handler) {
  if (elem.addEventListener)
      elem.addEventListener (eventType, handler, false);
  else if (elem.attachEvent)
      elem.attachEvent ('on' + eventType, handler);
}



// var langs ={
// "English (United States)": "en-US",
// "Nederlands": "nl-NL"
// };

function startSpeechRecognizer(auto){
  // state used to to start and stop the detection
  state = {
    "listening": false
  };

  // ## Initialize recognizer
  recognizer = new SpeechRecognition();
  //recognizer.continuous = true;
  recognizer.interimResults = true;
  recognizer.maxAlternatives = 1;
  recognizer.lang = "nl-NL";

  // ## recognizer functionality
  recognizer.onstart  = function (){ console.log("started!"); }
  recognizer.onresult = scenario;

  // ## Interactions
  // listen to button click event
  var start = document.querySelector('#button-start');
  var stop = document.querySelector('#button-stop');

  start.onclick = function() {
    try {
      state.listening = true;
      recognizer.start();
      this.className = "";
      stop.className = "button-primary";
    } catch(ex) {
      console.log('Recognition error: ' + ex.message);
    }
  };
  stop.onclick = function () {
    state.listening = false;
    recognizer.stop();
    start.className = "button-primary";
    this.className = "";
  };

  state.listening = true;
  recognizer.start();
}



// ----------------- INIT -------------------------

/**
* Call to initialize SpeechRecognition if supported.
*/
window.addEventListener('load', function() {

  // initialize speechRecognition if supported
  if(SpeechRecognition === null)
    console.log("Something's wrong.")
  else
    startSpeechRecognizer(false);

}, false);

// Include the plugin to speak
var synth = window.speechSynthesis;
var utterance = new SpeechSynthesisUtterance();

// Function to speak
function speak(text) {
  // Create a new utterance for the specified text and add it to the queue.

  // Set the text.
  utterance.text = text;
  // Set the attributes.
  utterance.pitch = 1;
  utterance.rate = 1;

  // Queue utterance
  synth.speak(utterance);
}


function populateVoice() {
  if(typeof speechSynthesis === 'undefined') {
    return;
  }

  var voices = speechSynthesis.getVoices();
  if(voices.length)
  {
    utterance.voice = voices[19];
  }
}

populateVoice();
if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoice;
}


// --------------------- Domo Code -------------------------------

function scenario(event) {

  // Name trigger
  var focus = nameTracker(event);
  // Strip response
  var speech = valuateFinal(event);

  // Request received
  if (focus && speech)
  {
    for (var n in scripts)
    {
      if(speech.includes(n)) processScenario (speech, scripts[n])
    }

    setMood ({status: "focus"})

  // Send out focus
} else if (focus) setMood ("focus")
}

function nameTracker (event) {

  var res = event.results[0][0];
  return res.transcript.toLowerCase().includes(name);
}

function valuateFinal (event) {

  var res = event.results[0][0];
  if(res.confidence > score)
  {
    score = res.confidence;
    transcript = res.transcript.toLowerCase();
  }

  if (event.results[0].isFinal)
  {
    console.log("final", event.results[0][0]);

    score = 0;
    return transcript.toLowerCase();
    // state.listening = true;
    // recognizer.start();
  }
}




/*var color = event.results[0][0].transcript;

console.log(event.results)

if(event.results[0][0].transcript.toLowerCase().includes("james"))
{
  speak("Het is binnen 24 graden")
}

console.log(event.results[0][0].transcript)*/
