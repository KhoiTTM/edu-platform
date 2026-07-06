import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text, voiceRole } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "ElevenLabs API Key not configured" }, { status: 500 });
    }

    // Lấy Voice ID từ env theo vai trò
    // ELEVENLABS_VOICE_ID_Teadcher_Women (có typo ở env của user)
    const voiceIdWomen = process.env.ELEVENLABS_VOICE_ID_Teadcher_Women || process.env.ELEVENLABS_VOICE_ID_Teacher_Women;
    const voiceIdMen = process.env.ELEVENLABS_VOICE_ID_Teacher_Men;
    const voiceIdGirl = process.env.ELEVENLABS_VOICE_ID_Child_Girl;
    const voiceIdBoy = process.env.ELEVENLABS_VOICE_ID_Child_Boy;

    let voiceId = voiceIdWomen; // Mặc định là giáo viên nữ
    if (voiceRole === "teacher_men") {
      voiceId = voiceIdMen;
    } else if (voiceRole === "child_girl") {
      voiceId = voiceIdGirl;
    } else if (voiceRole === "child_boy") {
      voiceId = voiceIdBoy;
    }

    if (!voiceId) {
      return NextResponse.json({ error: `Voice ID for role ${voiceRole} not configured` }, { status: 500 });
    }

    const model = "eleven_multilingual_v2";
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
        "Accept": "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: model,
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("ElevenLabs API Error:", errText);
      return NextResponse.json({ error: `ElevenLabs Error: ${res.status}` }, { status: res.status });
    }

    const audioBuffer = await res.arrayBuffer();
    return new NextResponse(Buffer.from(audioBuffer), {
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (error: any) {
    console.error("TTS Route Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
