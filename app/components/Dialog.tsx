"use client";
import { useDraggable } from "../hooks/useDraggable";

export default function Dialog({ children, height = 400, width = 400, initialX, initialY, zIndex, styles, onBringToFront, title = "window", active = false, className = "" }: {
  children: React.ReactNode; height?: number; width?: number; initialX: number; initialY: number; zIndex: number; styles?: React.CSSProperties; onBringToFront: () => void; title?: string; active?: boolean; className?: string;
}) {
  const { ref, onMouseDown } = useDraggable();
  return (
    <section ref={ref} aria-label={title} className={`dialog ${active ? "dialog-active" : ""} ${className}`}
      style={{ left: initialX, top: initialY, height, width, zIndex, ...styles }}
      onMouseDown={onBringToFront} onFocus={onBringToFront}>
      <div className="dialog-header" onMouseDown={onMouseDown}>
        <span className="window-decoration" aria-hidden="true">✦</span><span>{title}</span><span className="window-decoration" aria-hidden="true">◇</span>
      </div>
      <div className="dialog-body">{children}</div>
    </section>
  );
}
