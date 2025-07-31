import React, { useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

const APP_ID = "faf295aa3bc24a7facff0150357d8653"
const CHANNEL_NAME = "shesafe_room"; // Static for now, can be dynamic
const TOKEN = null; // null if using "testing mode" (APP ID only)

function VoiceCall() {
  const clientRef = useRef(null);
  const [joined, setJoined] = useState(false);

  const joinCall = async () => {
    const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    clientRef.current = client;

    const uid = await client.join(APP_ID, CHANNEL_NAME, TOKEN || null);

    const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    await client.publish([localAudioTrack]);

    console.log("🎙️ Joined call, published audio");
    setJoined(true);
  };

  const leaveCall = async () => {
    if (!clientRef.current) return;
    await clientRef.current.leave();
    clientRef.current = null;
    console.log("📴 Left the call");
    setJoined(false);
  };

  return (
    <div className="card">
      <h3>📞 Real-Time Voice Call</h3>
      {!joined ? (
        <button className="btn" onClick={joinCall}>
          ▶️ Join Call
        </button>
      ) : (
        <button className="btn-secondary" onClick={leaveCall}>
          🔚 Leave Call
        </button>
      )}
    </div>
  );
}

export default VoiceCall;
