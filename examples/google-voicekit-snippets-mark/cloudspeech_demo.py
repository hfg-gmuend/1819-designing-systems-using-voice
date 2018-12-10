#!/usr/bin/env python3
# Copyright 2017 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import os
import sys
import tempfile
import textwrap
import traceback

"""A demo of the Google CloudSpeech recognizer."""
import argparse
import locale
import logging

import pygame


from aiy.board import Board, Led
from aiy.cloudspeech import CloudSpeechClient

# from google.cloud import texttospeech

def get_hints(language_code):
    if language_code.startswith('en_'):
        return ('turn on the light',
                'turn off the light',
                'blink the light',
                'goodbye')
    return None

def locale_language():
    language, _ = locale.getdefaultlocale()
    return 'de'

def synthesize_text(text):
    """Synthesizes speech from the input string of text."""
    from google.cloud import texttospeech
    client = texttospeech.TextToSpeechClient()

    input_text = texttospeech.types.SynthesisInput(text=text)

    # Note: the voice can also be specified by name.
    # Names of voices can be retrieved with client.list_voices().
    voice = texttospeech.types.VoiceSelectionParams(
        language_code='de-DE-Wavenet-A',
        ssml_gender=texttospeech.enums.SsmlVoiceGender.FEMALE)

    audio_config = texttospeech.types.AudioConfig(
        audio_encoding=texttospeech.enums.AudioEncoding.MP3)

    response = client.synthesize_speech(input_text, voice, audio_config)

    # The response's audio_content is binary.
    with open('output.mp3', 'wb') as out:
        out.write(response.audio_content)
        playAudio("output.mp3")
        print('Audio content written to file "output.mp3"')

def playAudio(file):
    print('Play ' + file)
    
    pygame.mixer.music.load(file)
    pygame.mixer.music.play()
    # while pygame.mixer.music.get_busy() == True:
    #    continue

def main():
    pygame.mixer.init()
    
    logging.basicConfig(level=logging.DEBUG)

    parser = argparse.ArgumentParser(description='Assistant service example.')
    parser.add_argument('--language', default=locale_language())
    args = parser.parse_args()

    logging.info('Initializing for language %s...', args.language)
    hints = get_hints(args.language)
    client = CloudSpeechClient()
    with Board() as board:
        while True:
            if hints:
                logging.info('Say something, e.g. %s.' % ', '.join(hints))
            else:
                logging.info('Say something.')
            text = client.recognize(language_code=args.language,
                                    hint_phrases=hints)
            if text is None:
                logging.info('You said nothing.')
                continue

            logging.info('You said: "%s"' % text)
            text = text.lower()
            
            # --------------------------
            
            if 'licht' in text:
                synthesize_text('ok')
                board.led.state = Led.ON
            elif 'mach es wieder aus' in text:
                synthesize_text('Alles klar!')
                board.led.state = Led.OFF
            elif 'voice user interface' in text:
                board.led.state = Led.BLINK_3
            elif 'hast du das gespeichert' in text:
                synthesize_text('selbstverständlich!')
                board.led.state = Led.OFF
                
            
            
            # --------------------------

if __name__ == '__main__':
    main()
