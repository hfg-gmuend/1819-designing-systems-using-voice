// based on https://github.com/RedKenrok/node-hotworddetector/issues/2, by Ron Dekker @RedKenrok

const fs = require('fs');

const AudioRecorder = require('node-audiorecorder');
const HotwordDetector = require('node-hotworddetector');


const detectorData = {
	resource: './node_modules/snowboy/resources/common.res'
};
const modelData = [{
	file: './node_modules/snowboy/resources/snowboy.umdl',
	hotwords : 'snowboy'
}];
const recorderData = {
	audioGain: 2
};

// hotword detector
let hotwordDetector = new HotwordDetector(detectorData, modelData, recorderData, console);

hotwordDetector.on('error', function(error) {
	throw error;
});

hotwordDetector.on('hotword', function(index, hotword, buffer) {
	console.log('🎤 Say something! Start recording');

	// record audio
	const recorderOptions = {};
	let audioRecorder = new AudioRecorder(recorderOptions);
	
	audioRecorder.start();
	audioRecorder.stream().on('error', function() {
		throw error;
	});
	audioRecorder.stream().on('end', function() {
		console.log('Audio recording ended');
	});
	audioRecorder.on('close', function(exitCode) {
		console.log('✅ Audio stream closed');
		audioRecorder.stop();
		// re-start detection, after .wav file has been written
		hotwordDetector.start();
	});

	const fileStream = fs.createWriteStream(`${new Date().getTime()}.wav`, { encoding: 'binary' });
	audioRecorder.stream().pipe(fileStream);
});

// start detection
hotwordDetector.start();
console.log('Listening to the hotwords 🔥:');
for (model of modelData) {
  console.log(model.hotwords);
}
