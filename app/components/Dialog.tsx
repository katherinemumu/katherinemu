"use client";
import { useDraggable } from "../hooks/useDraggable";

export default function Dialog({ children, height = 400, width = 400, initialX, initialY, zIndex, styles, onBringToFront, onClose, title = "window", active = false, closed = false, className = "" }: {
  children: React.ReactNode; height?: number; width?: number; initialX: number; initialY: number; zIndex: number; styles?: React.CSSProperties; onBringToFront: () => void; onClose?: () => void; title?: string; active?: boolean; closed?: boolean; className?: string;
}) {
  const { ref, onPointerDown } = useDraggable();
  return (
    <section ref={ref} aria-label={title} aria-hidden={closed || undefined} inert={closed} className={`dialog ${active ? "dialog-active" : ""} ${className}`}
      style={{ left: initialX, top: initialY, height, width, zIndex, ...styles, ...(closed ? { visibility: "hidden" as const, pointerEvents: "none" as const } : {}) }}
      onPointerDown={onBringToFront} onFocus={onBringToFront}>
      <div className="dialog-header" onPointerDown={onPointerDown}>
        <span className="window-decoration" aria-hidden="true">✦</span><span>{title}</span>{onClose ? (
          <button type="button" className="dialog-close" aria-label={`Close ${title}`}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => { event.stopPropagation(); onClose(); }}>
            <span aria-hidden="true">×</span>
          </button>
        ) : <span className="window-decoration" aria-hidden="true">◇</span>}
      </div>
      <div className="dialog-body">{children}</div>
    </section>
  );
}
