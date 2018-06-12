# Raspberry Pi Audio/Video monitoring server

## Short description
This is a node.js process which controls the Raspberry Pi set up as a audio/video server.

Currently it like a proof of concept but it is stable and it does the job. 

I spent couple of evenings testing numerous of libraries for streaming, and current default setup is something that works in an acceptable way as a baby monitor.

## How to use it
It's just a controller which makes sure audio and video streaming process is always alive. In order to use it just read the code, prepare the config and you're good to go.

You can use it with a default config `npm run makeConfig` and it would work if the [default dependencies](#default-setup) are in place

There is a default config prepared. If you want to clone the environment in which this script is built, please follow 
In further releases this piece of software would also have some fancy features like reacting on a button push, LED controls and sending snapshot to a dropbox account.

## Default setup
### Hardware
With a lot of help of [redditors](https://www.reddit.com/r/raspberry_pi/comments/8o3dld/noob_asks_raspberry_pi_as_an_electronic_nanny/) the default setup is:
- Raspberry Pi Zero W - cheap option, not much power consumption, just enough performance and connectivity which would make this project extendible
- Google AYI Voice Kit - also cheap and complete option for sound. The Google Voice Hat includes a microphone, speaker, and a nice LED button. What is also good there are open source git repos ([independent](https://github.com/shivasiddharth/GassistPi) and [maintained by Google](https://github.com/google/aiyprojects-raspbian)) where one can find out how to operate the hardware with a custom way (non-python way). It also has a nice box where everything including a camera can be put together.
- RaspberryPiCam - official one, I chose NoIR version. As long as it's operated by raspicam app, it doesn't matter which one you'd get for a default setup.

### Audio
The biggest issue is that with pure Raspbian the audio capture with Google Voice Hat doesn't work at all. It does operate but no audio is captured, just w white noise.

In order to fix the issue those scripts should be executed first:
- https://github.com/google/aiyprojects-raspbian/blob/voicekit/scripts/install-deps.sh (just in case)
- https://github.com/google/aiyprojects-raspbian/blob/voicekit/scripts/configure-driver.sh
- https://github.com/google/aiyprojects-raspbian/blob/voicekit/scripts/install-alsa-config.sh
- https://github.com/google/aiyprojects-raspbian/blob/voicekit/scripts/install-services.sh (this *will not* setup Google Assistant service)

When above is executed, the hardware is ready to be used by streaming software.

For audio streaming this thing relies on icecast2/darkice as default. I have tested most popular ways of streaming audio on raspberry. Surprisingly streaming audio with a reasonable delay is much more difficult to achieve than I would expect. Icecast2 with darkice as a audio grabber seems to be a balanced option. It does work out of the box, it does stream to mp3 and the delay I currently have is ~6s. I aim to get as low as 2s, but this is good enough.

This manual will not cover how to install icecast2 with darkice. Everything is [available here](http://stream2ip.takkat.de/setup-icecast-in-5-steps/).

The important part which is not covered is the darkice config which would for for Google Voice Hat. You can find this file in this repo (`/docs/.darkice-s2ip.cfg`), but the most important part is this one:

```
[input]
device          = plug:micboost   # Very important config entry, it must be this one for GVH, if hd:0,0 is provided, only white noise is send to a stream
sampleRate      = 16000    # This looks like correct sample rate for this device.
bitsPerSample   = 16        # As above.
```

### Video
As with audio, I tested a few video streaming options and most of them had huge lag of ~10 to ~15 seconds which is far below expectations. Since this is a CCTV / Baby monitoring there's no need to stream with HD resolution and high FPS. Timing and format support is the king.

Therefore, MJPEG is the format which is a chosen as a default driver for the video streaming. It's easy to use since the format is quite primitive (just quick slides of jpeg images basically). It seem to work everywhere (even in the [iOS9 app](https://github.com/sznowicki/raspberrypi-av-monitor-ios-client)!) and delay is almost none (~300ms).

 The default setup uses [mjpg-streamer](https://github.com/jacksonliam/mjpg-streamer) app. There is not much to do with the installation which is pretty simple. It's just needed to follow the manual on the website.
 
## Monitoring Client
 
Since Raspberry is streaming audio and video in separate streams and handy formats almost anything can be a client. A browser might be a good option. 

### Streams urls (default setup)
- Video: http://[RPI-HOSTNAME].local:8080/?action=stream
- Audio: http://[RPI-HOSTNAME].local:8081/audio.mp3

### iOS app
For my personal use, I prepared an iOS app, which listens to both streams, shows the video, plays the audio and keeps the iPad awake.
You can try it out if you wish, just checkout [this repo](https://github.com/sznowicki/raspberrypi-av-monitor-ios-client) and compile the app. It supports iOS 9 so it can be used as a recycle method for old iPad Mini.

The app expects the Raspberry Pi url is `rpis.local` 

## Contributing / maintenance
I'm open for any pull requests. If you think you can contribute to this software, I'd be glad to merge your ideas.
For maintenance - please keep in mind this is a hobby project. I do not guarantee it will meet your expectations.

Additionally I expect whoever uses it, has some programming experience. If you have any trouble though, feel free to ask for help by creating an issue.