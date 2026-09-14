export default function Folder({ text, onClick, disabled = false, icon = "folder" }: { text: string; onClick?: () => void; disabled?: boolean; icon?: "folder" | "text" }) {
  const content = <>{icon === "text" ? <svg className="text-file-icon" viewBox="0 0 40 48" fill="none" aria-hidden="true"><path d="M3 2h23l11 11v33H3V2Z" fill="var(--paper)" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M26 2v11h11" fill="var(--blush)" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M10 22h20M10 28h20M10 34h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg> : <span className="folder-icon" aria-hidden="true" />}<span className="folder-label">{text}</span>{disabled && <span className="folder-soon">coming soon</span>}</>;
  return onClick || disabled
    ? <button type="button" className="desktop-folder" onClick={onClick} disabled={disabled}>{content}</button>
    : <span className="desktop-folder">{content}</span>;
}
