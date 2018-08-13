const fs = require('fs');

// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');

// Creates a client
const client = new speech.SpeechClient({keyFilename: `${__dirname}/api-keyfile.json`});

// The name of the audio file to transcribe
const fileName = './audio.flac';

// Reads a local audio file and converts it to base64
const file = fs.readFileSync(fileName);
const audioBytes = file.toString('base64');

const audio = {
  content: audioBytes,
};
const config = {
  encoding: 'FLAC',
  sampleRateHertz: 16000,
  languageCode: 'en-US',
};
const request = {
  audio: audio,
  config: config,
};

// Detects speech in the audio file
client
  .recognize(request)
  .then(data => {
    const response = data[0];
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('');
    console.log(`Transcription:\n${transcription}`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
