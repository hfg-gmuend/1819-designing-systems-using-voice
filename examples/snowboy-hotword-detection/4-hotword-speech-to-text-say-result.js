// based on https://github.com/RedKenrok/node-hotworddetector/issues/2, by Ron Dekker @RedKenrok

const AudioRecorder = require('node-audiorecorder');
const HotwordDetector = require('node-hotworddetector');
const googleSpeech = require('@google-cloud/speech');
const say = require('say');


const recorderOptions = {};
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

// options Google-Cloud Speech API
const speech = new googleSpeech.SpeechClient({
	keyFilename: `${__dirname}/api-keyfile.json`
});
const speechRequest = {
	config: {
		encoding: 'LINEAR16',
		sampleRateHertz: 16000,
		languageCode: 'en-GB'
	},
	interimResults: false
};

let hotwordDetector = new HotwordDetector(detectorData, modelData, recorderData, console);

hotwordDetector.on('error', function(error) {
	throw error;
});

hotwordDetector.on('hotword', function(index, hotword, buffer) {
	console.log('🎤 Say something! Start recording');

	// record audio
	let audioRecorder = new AudioRecorder(recorderOptions)
	audioRecorder.start();
	audioRecorder.stream().on('error', function() {
		throw error;
	});
	audioRecorder.on('close', function(exitCode) {
		console.log('✅ Audio stream closed');
		audioRecorder.stop();
		// re-start detection, after audio stream has been closed
		hotwordDetector.start();
	});

	// start Google-Cloud Speech API web stream
	let stream = speech.streamingRecognize(speechRequest)
		.on('error', console.error)
		.on('data', function(data) {
			console.log(`📝 Transcript: ${data.results[0].alternatives[0].transcript}`);
			say.stop(); // stop the text being spoken
			say.speak(data.results[0].alternatives[0].transcript, 'Alex', 1.0);
		});
	// start streaming audio to web stream.
	audioRecorder.stream().pipe(stream);
});

// start detection
hotwordDetector.start();
console.log('Listening to the hotwords 🔥:');
for (model of modelData) {
  console.log(model.hotwords);
}
