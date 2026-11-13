# RTCExpress examples

Small, working apps that add **1:1 voice calling** to Web, Flutter and React Native with [RTCExpress](https://rtc.devsquarelabs.com). Signaling, TURN relays and media servers are hosted, so there's nothing to run except the app itself.

| Example | Platform | What it shows | Tutorial |
|---|---|---|---|
| [`web-voice-call`](web-voice-call) | Browser (JavaScript) | Call between two browser tabs or a phone and a laptop | [dev.to](https://dev.to/rtcexpress) |
| [`flutter-voice-call`](flutter-voice-call) | Flutter (Android) | Call, accept, reject, mute, hang up, reconnect on network drop | [dev.to](https://dev.to/rtcexpress/add-11-voice-calling-to-a-flutter-app-in-about-10-minutes-no-servers-to-run-cjg) |
| [`react-native-voice-call`](react-native-voice-call) | React Native (Android) | The ready-made `CallScreen`: incoming call, timer, mute, "Reconnecting…", minimized-call bar | [dev.to](https://dev.to/rtcexpress/voice-calling-in-react-native-with-a-ready-made-call-screen-about-60-lines-of-code-2kpj) |

## Before you start

1. Create a free project at [rtc.devsquarelabs.com](https://rtc.devsquarelabs.com) (no credit card). The Free plan includes 1:1 voice calls with a one-time trial of 2,000 voice minutes.
2. In the console, open **Token tools** and create two test tokens in the same room, for users `alice` and `bob`.
3. Follow the README in the example folder.

Each example uses short-lived **test tokens** so you can try it quickly. In a real app, your backend signs the user in and requests tokens from `POST https://api.devsquarelabs.com/v1/token`. Never put your App Secret in a web or mobile app.

## SDKs

- Web: [`rtcexpress`](https://www.npmjs.com/package/rtcexpress) on npm
- React Native: [`rtcexpress-react-native`](https://www.npmjs.com/package/rtcexpress-react-native) on npm
- Flutter: [`rtcexpress`](https://pub.dev/packages/rtcexpress) on pub.dev
- Android (Kotlin): `com.devsquarelabs:rtcexpress-android` on Maven Central
- Server: `rtcexpress-server` on npm (Node.js) and PyPI (Python)

Docs: [rtc.devsquarelabs.com/docs](https://rtc.devsquarelabs.com/docs)

## License

MIT. Copy anything here into your own app.
