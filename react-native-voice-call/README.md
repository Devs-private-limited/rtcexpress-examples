# React Native voice call (ready-made call screen)

A 1:1 voice call app in about 60 lines, using the SDK's ready-made `CallScreen`: incoming call with Answer / Decline, ringing, call timer, mute, hang up, "Call ended / Declined", "Reconnecting…" on a network drop, and an "Ongoing call" bar when the call is minimized.

Step-by-step write-up: [Voice calling in React Native with a ready-made call screen](https://dev.to/rtcexpress/voice-calling-in-react-native-with-a-ready-made-call-screen-about-60-lines-of-code-2kpj)

## Run it

You need a React Native Android setup (React Native 0.73+, JDK 17, Android Studio), two Android devices (Android 7.0+), and a free [RTCExpress](https://rtc.devsquarelabs.com) project for the App ID. Expo Go isn't supported because the SDK has native code.

1. Create a project and install the SDK:

   ```bash
   npx @react-native-community/cli@latest init VoiceCallDemo
   cd VoiceCallDemo
   npm install rtcexpress-react-native
   ```

2. Copy `App.tsx` from this folder over the generated one, and copy `config.example.ts` to `config.ts`.

3. In the RTCExpress console, open **Token tools** and create two tokens in room `voice-test`, for users `alice` and `bob`. Paste your App ID and both tokens into `config.ts`.

4. Start Metro with `npx react-native start`, then install on both devices:

   ```bash
   npx react-native run-android --deviceId FIRST_DEVICE_ID
   npx react-native run-android --deviceId SECOND_DEVICE_ID
   ```

5. Tap **I am Alice** on one phone and **I am Bob** on the other, then **Call bob**. Bob's phone shows the incoming call screen.

> Test tokens only. Don't commit `config.ts`. In a real app, get tokens from your own backend and never put your App Secret in the app.
