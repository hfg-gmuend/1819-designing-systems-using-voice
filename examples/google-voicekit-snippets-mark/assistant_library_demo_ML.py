import logging
import platform
import subprocess
import sys

from google.assistant.library.event import EventType

from google.cloud import automl_v1beta1
from google.cloud.automl_v1beta1.proto import service_pb2

from aiy.assistant import auth_helpers
from aiy.assistant.library import Assistant
from aiy.board import Board, Led
from aiy.voice import tts


def get_prediction(content, project_id, model_id):
	prediction_client = automl_v1beta1.PredictionServiceClient()

	name = 'projects/{}/locations/us-central1/models/{}'.format(project_id, model_id)
	payload = {'text_snippet': {'content': content, 'mime_type': 'text/plain' }}
	params = {}
	request = prediction_client.predict(name, payload, params)

	accuracy = int(request.payload[0].classification.score * 100)
	answerString = 'I am ' + str(accuracy) + '% sure that was ' + request.payload[0].display_name

	print(answerString)
	return answerString  # waits till request is returned

def process_event(assistant, led, event):
    logging.info(event)

    if event.type == EventType.ON_START_FINISHED:
        led.state = Led.BEACON_DARK  # Ready.
        logging.info('Say "OK, Google" then speak, or press Ctrl+C to quit...')

    elif event.type == EventType.ON_CONVERSATION_TURN_STARTED:
        led.state = Led.ON  # Listening.

    elif event.type == EventType.ON_END_OF_UTTERANCE:
        led.state = Led.PULSE_QUICK  # Thinking.

    elif event.type == EventType.ON_RECOGNIZING_SPEECH_FINISHED:
        assistant.stop_conversation()
        tts.say(get_prediction(event.args['text'], 'testenvironment-223010', 'TCN3813896006391298745'))

    elif (event.type == EventType.ON_CONVERSATION_TURN_FINISHED
          or event.type == EventType.ON_CONVERSATION_TURN_TIMEOUT
          or event.type == EventType.ON_NO_RESPONSE):
        led.state = Led.BEACON_DARK

    elif event.type == EventType.ON_ASSISTANT_ERROR and event.args and event.args['is_fatal']:
        sys.exit(1)


def main():
    logging.basicConfig(level=logging.INFO)

    credentials = auth_helpers.get_assistant_credentials()
    with Board() as board, Assistant(credentials) as assistant:
        for event in assistant.start():
            process_event(assistant, board.led, event)


if __name__ == '__main__':
    main()
