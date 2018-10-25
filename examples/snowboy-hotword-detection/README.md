# Snowboy Hotword Detector
Hotword detector example for [Node.js](https://nodejs.org/) using [Snowboy](https://snowboy.kitt.ai/). Snowboy is an offline neural network driven hotword detection library, with compatibility on macOS and most Linux's.

Example is based on the [node-hotworddetector](https://github.com/RedKenrok/node-hotworddetector) a simplified wrapper around the official [snowboy module](https://github.com/Kitt-AI/snowboy).

## Requirements
Have [Homebrew](https://brew.sh/) installed (think of an app store for terminal/command line apps).

## Setup
1. Install [SoX](http://sox.sourceforge.net/) with Hombrew

```
brew install sox --with-flac
```

You can test whether SoX was installed correctly with e.g. `rec --channels=1 --bits=16 --rate=16000 audio.flac trim 0 5`.

2. Install node modules for the Snowboy example

```
npm install --save
```

## Running
Start the example with 

```
node example.js
```
