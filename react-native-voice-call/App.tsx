import React, { useEffect, useRef, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import RTCExpress, { useRTCCall, CallScreen, OngoingCallBar } from 'rtcexpress-react-native';
import { APP_ID, ROOM_ID, TOKENS } from './config';

type User = 'alice' | 'bob';

export default function App() {
  const rtc = useRef(new RTCExpress()).current;
  const call = useRTCCall(rtc); // all the call state the screens need
  const [me, setMe] = useState<User | null>(null);
  const [joined, setJoined] = useState(false);
  const [status, setStatus] = useState('Pick a user');
  const peer: User = me === 'alice' ? 'bob' : 'alice';

  useEffect(() => {
    rtc.on('roomJoined', () => {
      setJoined(true);
      setStatus(`Joined ${ROOM_ID}`);
    });
    rtc.on('error', (p) => setStatus(`Error: ${(p as { message: string }).message}`));
    return () => rtc.destroy();
  }, [rtc]);

  async function connect(user: User) {
    setMe(user);
    setStatus('Connecting...');
    try {
      await rtc.init({
        serverUrl: 'https://api.devsquarelabs.com',
        appId: APP_ID,
        userId: user,
        token: TOKENS[user],
        mediaMode: 'p2p', // 1:1 audio goes straight between the two phones
      });
      rtc.joinRoom(ROOM_ID);
    } catch (e) {
      setStatus(`Error: ${(e as Error).message}`);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Green "Ongoing call · Tap to return" bar while a call is minimized */}
      <OngoingCallBar call={call} />

      <SafeAreaView style={styles.screen}>
        <Text style={styles.title}>{me ? `Signed in as ${me}` : 'Voice call demo'}</Text>
        <Text style={styles.status}>{status}</Text>
        {!me && (
          <View style={styles.buttons}>
            <Button title="I am Alice" onPress={() => connect('alice')} />
            <Button title="I am Bob" onPress={() => connect('bob')} />
          </View>
        )}
        {joined && <Button title={`Call ${peer}`} onPress={() => call.startCall(peer)} />}
      </SafeAreaView>

      {/* Full-screen call UI. Renders nothing when there's no call. Keep it last. */}
      <CallScreen controller={call} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '600', textAlign: 'center' },
  status: { marginTop: 12, marginBottom: 24, textAlign: 'center' },
  buttons: { gap: 12 },
});
