import 'package:flutter/material.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:rtcexpress/rtcexpress.dart';

// Test values passed with --dart-define (see step 6).
// In a real app, fetch the token from your own backend. Never ship an App Secret.
const appId = String.fromEnvironment('RTC_APP_ID');
const userId = String.fromEnvironment('RTC_USER_ID');
const peerId = String.fromEnvironment('RTC_PEER_ID');
const token = String.fromEnvironment('RTC_TOKEN');
const roomId = 'voice-test';

void main() => runApp(const MaterialApp(home: CallScreen()));

class CallScreen extends StatefulWidget {
  const CallScreen({super.key});

  @override
  State<CallScreen> createState() => _CallScreenState();
}

class _CallScreenState extends State<CallScreen> {
  final rtc = RTCExpress();
  String status = 'Not connected';
  bool joined = false;
  bool incoming = false;
  bool inCall = false;
  bool muted = false;

  @override
  void initState() {
    super.initState();
    rtc.on('roomJoined', (_) => setState(() {
          joined = true;
          status = 'Joined $roomId';
        }));
    rtc.on('callInvite', (_) => setState(() => incoming = true));
    rtc.on('callState', (p) => setState(() {
          final state = p['state'];
          status = state == 'reconnecting' ? 'Reconnecting…' : 'Call $state';
          inCall = ['ringing', 'connecting', 'connected', 'reconnecting'].contains(state);
          if (state != 'ringing') incoming = false;
          if (!inCall) muted = false;
        }));
    // The other person lost their network for a moment.
    rtc.on('peerReconnecting', (p) => setState(() {
          status = p['reconnecting'] == true
              ? '${p['userId']} is reconnecting…'
              : 'Call connected';
        }));
    rtc.on('error', (p) => setState(() => status = 'Error: ${p['message']}'));
  }

  Future<void> connect() async {
    if (!await Permission.microphone.request().isGranted) {
      setState(() => status = 'Allow microphone access to make calls');
      return;
    }
    setState(() => status = 'Connecting...');
    await rtc.init(const RTCInitOptions(
      serverUrl: 'https://api.devsquarelabs.com',
      appId: appId,
      userId: userId,
      token: token,
      mediaMode: 'p2p', // 1:1 calls go directly between the two phones
    ));
    await rtc.joinRoom(roomId);
  }

  @override
  void dispose() {
    rtc.destroy();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Voice call: $userId')),
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(status, textAlign: TextAlign.center),
            const SizedBox(height: 24),
            if (!joined)
              FilledButton(onPressed: connect, child: const Text('Connect and join')),
            if (joined && !inCall)
              FilledButton(onPressed: () => rtc.callUser(peerId), child: Text('Call $peerId')),
            if (incoming) ...[
              FilledButton(onPressed: rtc.acceptCall, child: const Text('Accept')),
              OutlinedButton(onPressed: rtc.rejectCall, child: const Text('Reject')),
            ],
            if (inCall && !incoming) ...[
              OutlinedButton(
                onPressed: () {
                  setState(() => muted = !muted);
                  rtc.muteMicrophone(muted);
                },
                child: Text(muted ? 'Unmute' : 'Mute'),
              ),
              FilledButton(onPressed: rtc.endCall, child: const Text('End call')),
            ],
          ],
        ),
      ),
    );
  }
}
