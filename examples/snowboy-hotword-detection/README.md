# Snowboy Hotword Detector
Hotword detector example for [Node.js](https://nodejs.org/) using [Snowboy](https://snowboy.kitt.ai/). Snowboy is an offline neural network driven hotword detection library, with compatibility on macOS and most Linux's.

Example is based on the [node-hotworddetector](https://github.com/RedKenrok/node-hotworddetector) a simplified wrapper around the official [snowboy module](https://github.com/Kitt-AI/snowboy).

## Installation
1. Install the prerequisites  below
2. `npm install --save`

## Prerequisites
This module requires you to install [SoX](http://sox.sourceforge.net/)

### For MacOS
```
brew install sox --with-flac
```

You can test whether SoX was installed correctly with e.g. `rec --channels=1 --bits=16 --rate=16000 audio.flac trim 0 5`.

## Running
Start the example with `node example.js`.
