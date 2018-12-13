# DIY VUI setup with Google AIY Kit V1

The [Google AIY Kit](https://www.amazon.de/gp/product/B075SFLWKX/ref=oh_aui_detailpage_o01_s00?ie=UTF8&psc=1) is a RaspberryPi-based DIY set. It allows users to easily build their own Google Home device. 
There are two ways to use your kit: With Google software or using the Gassists open source solution.

##Preparations

### Get the hardware

First you need a SD card (16GB) and a Raspberry Pi 3 Model B. You can purchase the Google AIY Kit here:
[Target](https://intl.target.com/p/google-voice-kit-aiy/-/A-53416295) (US only),
[BuyZero](https://buyzero.de/products/google-aiy-voice-kit?variant=1166773551131) or [Amazon](https://www.amazon.de/gp/product/B075SFLWKX/ref=oh_aui_detailpage_o01_s00?ie=UTF8&psc=1).

Please note: We only worked with the Raspberry Pi 3 Model B. 

### Prepare the Raspberry Pi (3 Model B)

To setup the Raspberry Pi, you'll need the Raspberry Pi Noobs image. We used the one with a graphical interface. You can find all Pi images [here](https://www.raspberrypi.org/downloads/).


To flash the image on the SD card we used [Etcher](https://www.techspot.com/downloads/6931-etcher.html).

To use the SD card as boot medium, you'll need to format it prior to flashing the image. We used [SD Formatter](https://www.sdcard.org/downloads/).

##Setup A – Using Google Software
**Make sure to take the preperation step above before you start! You can't use both setups on the same SD.** 
### Install the Google AIY OS 
You can follow [this guide](https://aiyprojects.withgoogle.com/voice) this guide provided by Google. Mind the model number, the tutorials differ between V1 and V2.

### Enjoy! 
You got yourself a DIY Google Home Assitant. If you used your private Google account you can also embed it into your Google smart home.


##Setup B – Using GassistPi Software
**Make sure to take the preperation step above before you start! You can't use both setups on the same SD.** 

The benefit of *hacking* your Google AIY Kit is that you are then able to integrate third party APIs such as Spotify and many more. 


### Install Gassist Pi

Use the [tutorial](https://github.com/shivasiddharth/GassistPi/) provided by the developer of Gassist. 
There is also a [video version](https://www.youtube.com/watch?v=RxGFEPV5wOg) of the tutorial. 



**Tipp** If you have issues while installing. Consider using 

`sudo apt-get upgrade` 

in the step *Install Audio Config Files > 1. Update OS*.


### Enjoy!
You should now be ready to go. If you want further tutorials check out other [Gassist Projects](https://www.hackster.io/search?i=projects&q=gassist%20pi) on Hackster.
