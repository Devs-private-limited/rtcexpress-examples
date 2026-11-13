import { RTCExpress } from 'rtcexpress';
const el = id => document.getElementById(id);
let rtc, joined = false, incoming = false, busy = false, muted = false;
const status = text => { el('status').textContent = text; };
function controls() {
  el('call').disabled = !joined || busy;
  el('accept').hidden = el('reject').hidden = !incoming;
  el('end').disabled = !busy;
  el('mute').disabled = !busy || incoming;
}
function reset() { joined=false;incoming=false;busy=false;muted=false;controls();el('mute').textContent='Mute';el('connect').disabled=false;el('disconnect').disabled=true; }
function explain(error) { if (/not included.*free|upgrade.*plan/i.test(error?.message || '')) return 'This call type is not included in your plan. 1:1 voice works on Free; group voice needs Starter and video needs Pro. See https://rtc.devsquarelabs.com/pricing. A new token will not change your plan.'; return error?.name === 'NotAllowedError' ? 'Microphone permission was blocked. Allow it in site settings and retry.' : error.message || 'Action failed'; }
el('connect-form').onsubmit = async event => {
  event.preventDefault(); el('connect').disabled=true;
  rtc?.destroy(); rtc=new RTCExpress();
  rtc.on('roomJoined',()=>{joined=true;controls();status('Joined. Connect the other user, then press Call.');});
  rtc.on('callInvite',({fromUserId})=>{incoming=true;busy=true;controls();status('Incoming call from '+fromUserId);});
  rtc.on('callState',({state})=>{busy=!['ended','rejected'].includes(state);if(state!=='ringing')incoming=false;if(!busy){muted=false;el('mute').textContent='Mute';}controls();status('Call '+state);});
  rtc.on('error',({message})=>status(explain({message})));
  rtc.on('disconnected',()=>{reset();status('Disconnected. Connect again to rejoin.');});
  try {
    await rtc.init({serverUrl:'https://api.devsquarelabs.com',appId:el('app-id').value.trim(),userId:el('user-id').value.trim(),token:el('token').value.trim(),mediaMode:'p2p',autoReconnect:false});
    el('token').value=''; el('disconnect').disabled=false;
    rtc.joinRoom(el('room-id').value.trim());
    status('Waiting for the server to confirm room membership...');
  } catch(error) {rtc.destroy();reset();status(explain(error));}
};
el('call').onclick=async()=>{const peer=el('peer').value.trim();if(!peer||peer===el('user-id').value.trim()){status('Enter the other user ID.');return;}incoming=false;try{await rtc.callUser(peer,{callType:'voice'});}catch(error){status(explain(error));}};
el('accept').onclick=async()=>{incoming=false;controls();try{await rtc.acceptCall();}catch(error){rtc.endCall();status(explain(error));}};
el('reject').onclick=()=>rtc.rejectCall();
el('end').onclick=()=>rtc.endCall();
el('mute').onclick=()=>{muted=!muted;rtc.muteMicrophone(muted);el('mute').textContent=muted?'Unmute':'Mute';};
el('disconnect').onclick=()=>{rtc?.destroy();reset();status('Disconnected');};
window.addEventListener('pagehide',()=>rtc?.destroy());
