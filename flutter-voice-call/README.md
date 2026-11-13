# Flutter voice call

A 1:1 voice call between two Android phones: call, accept, reject, mute, hang up, and a "Reconnecting…" state when a phone briefly loses its network.

Step-by-step write-up: [Add 1:1 voice calling to a Flutter app in about 10 minutes](https://dev.to/rtcexpress/add-11-voice-calling-to-a-flutter-app-in-about-10-minutes-no-servers-to-run-cjg)

## Run it

You need Flutter 3.19+, two Android devices (Android 7.0+), and a free [RTCExpress](https://rtc.devsquarelabs.com) project for the App ID.

1. Generate the Android project files (your `lib/main.dart` and `pubspec.yaml` are kept):

   ```bash
   cd flutter-voice-call
   flutter create --platforms android .
   flutter pub get
   ```

2. In `android/app/build.gradle.kts` (or `build.gradle`), set `minSdk = 24`.

3. In the RTCExpress console, open **Token tools** and create two tokens in room `voice-test`: one for user `alice`, one for user `bob`.

4. Run Alice on the first device and Bob on the second (`flutter devices` lists the IDs):

   ```bash
   flutter run -d FIRST_DEVICE_ID --dart-define=RTC_APP_ID=YOUR_APP_ID --dart-define=RTC_USER_ID=alice --dart-define=RTC_PEER_ID=bob --dart-define=RTC_TOKEN=ALICE_TOKEN
   flutter run -d SECOND_DEVICE_ID --dart-define=RTC_APP_ID=YOUR_APP_ID --dart-define=RTC_USER_ID=bob --dart-define=RTC_PEER_ID=alice --dart-define=RTC_TOKEN=BOB_TOKEN
   ```

5. Tap **Connect and join** on both, then **Call bob** on Alice's phone and **Accept** on Bob's.

Try turning airplane mode on for 5 seconds during a call: both phones show "Reconnecting…" and the call carries on.

> Test tokens only. In a real app, get tokens from your own backend and never put your App Secret in the app.
