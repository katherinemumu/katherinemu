const notes = [
  ["C", "01_C4_261.63Hz.wav"], ["D", "03_D4_293.66Hz.wav"],
  ["E", "05_E4_329.63Hz.wav"], ["F", "06_F4_349.23Hz.wav"],
  ["G", "08_G4_392.00Hz.wav"], ["A", "10_A4_440.00Hz.wav"],
  ["B", "12_B4_493.88Hz.wav"], ["C", "13_C5_523.25Hz.wav"],
];
export default function Piano() {
  return <div className="piano-content"><p className="eyebrow">A LITTLE MUSIC BREAK</p><div className="piano-keys">{notes.map(([note, file], index) =>
    <button type="button" className="piano-key" key={file} aria-label={`Play ${note}${index === 7 ? 5 : 4}`} onClick={() => { new Audio(`/piano/${file}`).play().catch(console.error); }}>{note}</button>
  )}</div><p className="piano-hint">click a key to play a note ♪</p></div>;
}
