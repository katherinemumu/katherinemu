// import 1do from '../assets/pianoNotes/1do.mp3';

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
      <PianoKey audioFile="/pianoNotes/1do.mp3" />
      <PianoKey audioFile="/pianoNotes/2re.mp3" />
      <PianoKey audioFile="/pianoNotes/3mi.mp3" />
      <PianoKey audioFile="/pianoNotes/4fa.mp3" />
      <PianoKey audioFile="/pianoNotes/5so.mp3" />
      <PianoKey audioFile="/pianoNotes/6la.mp3" />
      <PianoKey audioFile="/pianoNotes/7ti.mp3" />
      <PianoKey audioFile="/pianoNotes/8do.mp3" />
    </div>
  );
}
