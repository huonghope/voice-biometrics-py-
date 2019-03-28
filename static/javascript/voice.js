// hideElement('#progress');
hideElement('#environmentMessage');
hideElement('#vadMessage');
hideElement('#passphraseMessage');
hideElement('#acceptMessage');
hideElement('#rejectMessage');

document.querySelector('#stopRecButton').classList.add('disabled');

var wavesurfer = WaveSurfer.create({
  container     : '#waveform',
  waveColor     : '#01BAB6',
  interact      : false,
  cursorWidth   : 0,
  barGap        : 2,
  barHeight     : 2,
  barWidth      : 0,
  fillParent    : true,
  forceDecode   : true,
  plugins: [
    WaveSurfer.microphone.create()
  ]
});

// Test test

wavesurfer.microphone.on('deviceReady', function(stream) {
    console.log('Device ready!', stream);
});
wavesurfer.microphone.on('deviceError', function(code) {
    console.warn('Device error: ' + code);
});

// start the microphone
wavesurfer.microphone.start();

// pause rendering
//wavesurfer.microphone.pause();

// resume rendering
//wavesurfer.microphone.play();

// stop visualization and disconnect microphone
//wavesurfer.microphone.stopDevice();

// same as stopDevice() but also clears the wavesurfer canvas
//wavesurfer.microphone.stop();

// destroy the plugin
//wavesurfer.microphone.destroy();

// create an audio in
mic = new p5.AudioIn();

// users must manually enable their browser microphone for recording to work properly!
mic.start();

// create a sound recorder
recorder = new p5.SoundRecorder();

// connect the mic to the recorder
recorder.setInput(mic);

// create an empty sound file that we will use to playback the recording
soundFile = new p5.SoundFile();


// One-liner to resume playback when user interacted with the page.
document.querySelector('#startRecButton').addEventListener('click', function() {
  showElement('#environmentMessage');
  document.querySelector('#startRecButton').classList.add('disabled');
  document.querySelector('#stopRecButton').classList.remove('disabled');
  
  startRecording();
});

document.querySelector('#stopRecButton').addEventListener('click', function() {
  document.querySelector('#startRecButton').classList.remove('disabled');
  document.querySelector('#stopRecButton').classList.add('disabled');

  hideElement("#environmentMessage");
  showElement("#vadMessage");
  // showElement('#progress');
  
  stopRecording();  
});

function startRecording() {
  if (mic.enabled) {
      console.log("You have started recording...");
      // // start the microphone
      // wavesurfer.microphone.start();
      // Tell recorder to record to a p5.SoundFile which we will use for playback
      recorder.record(soundFile);
    }
}

function stopRecording() {
  console.log("You have stopped recording...");
  // wavesurfer.microphone.pause();
  recorder.stop(); // stop recorder, and send the result to soundFile

  console.log("Playing the audioifle now...");
  soundFile.play();
  
  var date = new Date();
  var time = date.getTime();

  var file_name = time + '.wav';

  console.log("Saving the audio file now...");
  p5.prototype.saveSound(soundFile, file_name); // save file

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/voice', true);

  // xhr.onload = function(e) {};
  // // Listen to the upload progress.
  // // assuming you have a progress element on your dom
  // var progressBar = document.querySelector('progress');

  // progressBar.value = 0;

  // xhr.upload.onprogress = function(e) {
  //   if (e.lengthComputable) {
  //     progressBar.value = (e.loaded / e.total) * 100;
  //     progressBar.textContent = progressBar.value; // Fallback for unsupported browsers.
  //   }
  // };
 
  xhr.send("C:\\Users\\BedangSen\\Downloads\\" + file_name);
  // hideElement("#progress");
}

function hideElement(elSelector){
  document.querySelector(elSelector).style.display = 'none';
}

function showElement(elSelector){
  document.querySelector(elSelector).style.display = '';
}
