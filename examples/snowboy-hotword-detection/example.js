const HotwordDetector = require('node-hotworddetector');

const detectorData = {
  resource: './node_modules/snowboy/resources/common.res'
};
/*
const modelData = [{
  file: './node_modules/snowboy/resources/snowboy.umdl',
  hotwords : 'snowboy'
}];
*/
const modelData = [{
  file: './node_modules/snowboy/resources/hallo.pmdl',
  hotwords : 'henke'
}];


let hotwordDetector = new HotwordDetector(detectorData, modelData, {audioGain: 2}, console);

hotwordDetector.on('error', function(error) {
  console.error('Error: ' + error);
});

hotwordDetector.on('hotword', function(index, hotword, buffer) {
  console.log('Hotword: ' + hotword);
});

hotwordDetector.on('silence', function() {
  console.log('Silence');
});

hotwordDetector.on('sound', function(buffer) {
  console.log('Sound');
});

hotwordDetector.start();

console.log('Active hotwords 🎤 :');
for (model of modelData) {
  console.log(model.hotwords);
}
