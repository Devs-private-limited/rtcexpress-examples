# RTCExpress voice starter

Requires Node.js 22 and an RTCExpress project. 1:1 voice calls work on every plan, including Free (a one-time trial of 2,000 voice minutes).

Run `npm install`, then `npm run dev`. Open the localhost URL printed in two browser tabs. Keep this development server local.

In the customer console, open Token tools. Generate separate short-lived room-scoped user tokens for alice and bob in room voice-test. Put each user and matching token into a different tab, using the same App ID and room. Enter bob as the peer in the alice tab and alice in the bob tab. Connect both, wait for Joined, then call and accept. Allow microphone access and use headphones.

The SDK handles remote audio. Tokens stay in memory; never enter an App Secret. For production, replace manual token entry with an authenticated backend that verifies room access and requests tokens server-side. Host on HTTPS. This starter is not a production authentication system.

The SDK comes from npm: [`rtcexpress`](https://www.npmjs.com/package/rtcexpress). To add it to your own app, run `npm install rtcexpress`.

Use the live demo for a phone/laptop test: https://api.devsquarelabs.com/demo/

Validation distinguishes fixture signaling and synthetic browser audio from physical device tests. Test actual audio, TURN/network conditions, denied permissions and reconnects in your own project before launch.
