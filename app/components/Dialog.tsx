"use client";
import { useDraggable } from "../hooks/useDraggable";

function CircleComponent({ color }: { color: string }) {
  return <div className={`circle-${color}`}></div>;
}

function DialogHeader() {
  return (
    <div className="flex gap-2 flex-row justify-content">
      <CircleComponent color="red" />
      <CircleComponent color="yellow" />
      <CircleComponent color="green" />
    </div>
  );
}

function DialogContents({
  children,
  height,
  width,
}: {
  children: React.ReactNode;
  height?: number;
  width?: number;
}) {
  return (
    <div
      className="flex bg-white h-full w-full justify-center items-center overflow-hidden"
      style={{ height, maxWidth: width }}
    >
      <div className="max-w-full px-4 text-center break-words">{children}</div>
    </div>
  );
}

export default function Dialog({
  children,
  height,
  width,
  initialX,
  initialY,
  zIndex,
  styles,
  onBringToFront,
}: {
  children: React.ReactNode;
  height?: number;
  width?: number;
  initialX: number;
  initialY: number;
  zIndex: number;
  styles?: React.CSSProperties;
  onBringToFront: () => void;
}) {
  const { ref, onMouseDown } = useDraggable();
  const h = height ?? 400;
  const w = width ?? 400;

  return (
    <div
      ref={ref}
      className={`flex-col dialog flex gap-2 border`}
      style={{
        position: "absolute",
        left: initialX,
        top: initialY,
        height: h,
        width: w,
        zIndex,
        ...styles,
      }}
      onMouseDown={onBringToFront}
    >
      <div
        onMouseDown={(e) => {
          onBringToFront();
          onMouseDown(e);
        }}
      >
        <DialogHeader />
      </div>
      <DialogContents height={h} width={w}>
        {children}
      </DialogContents>
    </div>
  );
}
