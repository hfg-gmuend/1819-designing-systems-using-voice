## Installing snips.ai on a Raspberry Pi

### Requirements:
- Raspberry Pi
- Micro SD card (formatted with FAT32)
- Microphone
- Speaker or headphones
- Network connection for Raspberry (easiest with cable)
- Monitor, mouse, keyboard for operating the Raspberry Pi


### Getting the Linux system ready on your Raspberry Pi:

1. Start here: [snips.gitbook.io/getting-started/](https://snips.gitbook.io/getting-started/).

2. Download [Raspbian Lite](https://www.raspberrypi.org/downloads/raspbian/). If Raspbian Lite doesn't work somehow, try "Raspbian Stretch with Desktop".

3. Download [Etcher](https://etcher.io/) for flashing the image to the SD card.

4. Flash Raspbian image to SD card with Etcher.

5. Put SD card in Raspberry Pi, plug power and follow the setup instructions.


### Getting Snips.ai up and running

Continue following the [installation steps](https://snips.gitbook.io/getting-started/installation) on the Snips Dev Center.

Problems I found:
- connecting with "sam connect raspberry.local" doesn't work on my system. Use the IP adress instead.
- You must allow SSH connection to the Raspberry. Choose Raspberry-Pi-Konfiguration from Einstellungen. Go to "Schnittstellen" and activate SSH.
- Testing the microphone seems to be broken ("sam test microphone"). Try plugging a microphone and install the snips demo ("sam install demo"). It should work. Hopefully. 


### Creating your own assistants

Follow [snips.gitbook.io/getting-started/install-an-assistant](https://snips.gitbook.io/getting-started/install-an-assistant). 

Problems I found:
- Assistants belong to a language. German assistants didn't give any feedback. But it worked with english. 










