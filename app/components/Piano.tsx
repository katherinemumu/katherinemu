"use client";

function PianoKey({ audioFile, note, blackKeyPosition }: {
  audioFile: string;
  note: string;
  blackKeyPosition?: number;
}) {
  const playAudio = () => {
    // 1. Create a new audio instance
    const audio = new Audio(audioFile);

    // 2. Play the audio file
    audio.play().catch((error) => {
      console.error("Playback failed:", error);
    });
  };

  return (
    <button
      type="button"
      aria-label={note}
      title={note}
      className={blackKeyPosition === undefined ? "piano-key" : "piano-black-key"}
      style={blackKeyPosition === undefined ? undefined : { left: `${blackKeyPosition * 12.5}%` }}
      onPointerDown={(event) => {
        if (event.button === 0) playAudio();
      }}
      onClick={(event) => {
        // Keyboard and assistive technology activation have no pointer click count.
        if (event.detail === 0) playAudio();
      }}
    >
      {blackKeyPosition === undefined ? note[0] : null}
    </button>
  );
}

export default function Piano() {
  return (
    <div className="piano-content">
      <p className="eyebrow">A LITTLE MUSIC BREAK</p>
      <div className="piano-keys" role="group" aria-label="Piano">
      <PianoKey note="C4" audioFile="/piano/01_C4_261.63Hz.wav" />
      <PianoKey note="C sharp / D flat 4" audioFile="/piano/02_Cs4_277.18Hz.wav" blackKeyPosition={1} />
      <PianoKey note="D4" audioFile="/piano/03_D4_293.66Hz.wav" />
      <PianoKey note="D sharp / E flat 4" audioFile="/piano/04_Ds4_311.13Hz.wav" blackKeyPosition={2} />
      <PianoKey note="E4" audioFile="/piano/05_E4_329.63Hz.wav" />
      <PianoKey note="F4" audioFile="/piano/06_F4_349.23Hz.wav" />
      <PianoKey note="F sharp / G flat 4" audioFile="/piano/07_Fs4_369.99Hz.wav" blackKeyPosition={4} />
      <PianoKey note="G4" audioFile="/piano/08_G4_392.00Hz.wav" />
      <PianoKey note="G sharp / A flat 4" audioFile="/piano/09_Gs4_415.30Hz.wav" blackKeyPosition={5} />
      <PianoKey note="A4" audioFile="/piano/10_A4_440.00Hz.wav" />
      <PianoKey note="A sharp / B flat 4" audioFile="/piano/11_As4_466.16Hz.wav" blackKeyPosition={6} />
      <PianoKey note="B4" audioFile="/piano/12_B4_493.88Hz.wav" />
      <PianoKey note="C5" audioFile="/piano/13_C5_523.25Hz.wav" />
      </div>
      <p className="piano-hint">click a key to play a note ♪</p>
    </div>
  );
}
