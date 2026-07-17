"use client";
import { useState } from "react";
import Dialog from "./Dialog";
import DinosaurGame from "./DinosaurGame";
import Piano from "./Piano";

export type Dialog = {
  id: string,
  initialX: number,
  initialY: number,
  width: number,
  height: number,
  zIndex: number,
}

export default function DialogDesktop({extraDialogs}: {extraDialogs?: Array<Dialog>}) {
  const dialogComponents = {
    "game-1": DinosaurGame,
    "game-2": Piano,
    intro: () => (
      <div
        style={{ fontFamily: "monospace", fontSize: "64px", color: "black" }}
      >
        hello! i'm katherine
      </div>
    ),
    "projects": () => (
      <div style={{ fontFamily: "monospace", fontSize: "64px", color: "black" }}>
        hi
      </div>
    )
  };

  const [dialogs, setDialogs] = useState<Array<Dialog>>([
    {
      id: "game-1",
      initialX: 100,
      initialY: 40,
      width: 400,
      height: 400,
      zIndex: 1,
    },
    {
      id: "game-2",
      initialX: 150,
      initialY: 500,
      width: 400,
      height: 400,
      zIndex: 2,
    },
    {
      id: "intro",
      initialX: 400,
      initialY: 150,
      width: 800,
      height: 800,
      zIndex: 3,
    },
  ]);

  const [currentFocus, setCurrentFocus] = useState("intro");

  const [nextZIndex, setNextZIndex] = useState(dialogs.length + 1);

  const bringToFront = (id: string) => {
    setDialogs((prevDialogs) =>
      prevDialogs.map((dialog) =>
        dialog.id === id ? { ...dialog, zIndex: nextZIndex } : dialog,
      ),
    );
    setNextZIndex((prev) => prev + 1);
    setCurrentFocus(id);
  };

  const dialogsToShow: Dialog[] =
  extraDialogs?.length === 0
    ? dialogs
    : [...dialogs, ...(extraDialogs ?? [])];

  return (
    <div>
      {dialogsToShow.map((dialog) => {
        const Component =
          dialogComponents[dialog.id as keyof typeof dialogComponents];
        return (
          <Dialog
            key={dialog.id}
            initialX={dialog.initialX}
            initialY={dialog.initialY}
            width={dialog.width}
            height={dialog.height}
            zIndex={dialog.zIndex}
            onBringToFront={() => bringToFront(dialog.id)}
          >
            <Component isInFocus={currentFocus === dialog.id} />
          </Dialog>
        );
      })}
    </div>
  );
}
