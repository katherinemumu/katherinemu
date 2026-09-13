export default function Folder({ text, onClick, disabled = false }: { text: string; onClick?: () => void; disabled?: boolean }) {
  const content = <><span className="folder-icon" aria-hidden="true" /><span className="folder-label">{text}</span>{disabled && <span className="folder-soon">coming soon</span>}</>;
  return onClick || disabled
    ? <button type="button" className="desktop-folder" onClick={onClick} disabled={disabled}>{content}</button>
    : <span className="desktop-folder">{content}</span>;
}
