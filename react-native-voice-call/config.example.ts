// Test values from the console's Token tools.
// In a real app, fetch the token from your own backend. Never ship an App Secret.
export const APP_ID = 'YOUR_APP_ID';
export const ROOM_ID = 'voice-test';
export const TOKENS: Record<'alice' | 'bob', string> = {
  alice: 'ALICE_TOKEN',
  bob: 'BOB_TOKEN',
};
