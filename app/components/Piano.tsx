function PianoKey({ audioFile }: { audioFile: string }) {
  const playAudio = () => {
    // 1. Create a new audio instance
    const audio = new Audio(audioFile);

    // 2. Play the audio file
    audio.play().catch((error) => {
      console.error("Playback failed:", error);
    });
  };

  return (
    <div
      className="border border-black w-10 h-40"
      onMouseDown={playAudio}
    ></div>
  );
}

export default function Piano() {
  return (
    <div className="flex items-center">
      <PianoKey audioFile="piano/01_C4_261.63Hz.wav" />
      <PianoKey audioFile="piano/03_D4_293.66Hz.wav" />
      <PianoKey audioFile="piano/05_E4_329.63Hz.wav" />
      <PianoKey audioFile="piano/06_F4_349.23Hz.wav" />
      <PianoKey audioFile="piano/08_G4_392.00Hz.wav" />
      <PianoKey audioFile="piano/10_A4_440.00Hz.wav" />
      <PianoKey audioFile="piano/12_B4_493.88Hz.wav" />
      <PianoKey audioFile="piano/13_C5_523.25Hz.wav" />
    </div>
  );
}
