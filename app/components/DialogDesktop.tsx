"use client";
import Link from "next/link";
import { useState } from "react";
import DesktopWindow from "./Dialog";
import DinosaurGame from "./DinosaurGame";
import Piano from "./Piano";

export type Dialog = { id: string; initialX: number; initialY: number; width: number; height: number; zIndex: number };
const initialDialogs: Dialog[] = [
  { id: "intro", initialX: 70, initialY: 50, width: 570, height: 410, zIndex: 1 },
  { id: "game-1", initialX: 580, initialY: 290, width: 350, height: 240, zIndex: 2 },
  { id: "game-2", initialX: 130, initialY: 455, width: 360, height: 220, zIndex: 3 },
];
const titles: Record<string, string> = { intro: "welcome.txt", "game-1": "tiny runner", "game-2": "piano", projects: "projects" };

export default function DialogDesktop({ extraDialogs = [] }: { extraDialogs?: Dialog[] }) {
  const [focusOrder, setFocusOrder] = useState(["intro"]);
  const currentFocus = focusOrder[focusOrder.length - 1];
  const bringToFront = (id: string) => setFocusOrder(previous => previous[previous.length - 1] === id ? previous : [...previous.filter(item => item !== id), id]);
  return <div className="desktop-windows">{[...initialDialogs, ...extraDialogs].map(dialog =>
    <DesktopWindow key={dialog.id} {...dialog} zIndex={10 + Math.max(0, focusOrder.indexOf(dialog.id) + 1)} title={titles[dialog.id]} active={currentFocus === dialog.id} className={`window-${dialog.id}`} onBringToFront={() => bringToFront(dialog.id)}>
      {dialog.id === "intro" && <><div className="intro-content"><p className="eyebrow">A LITTLE CORNER OF THE INTERNET</p><h1>hello!<br />i’m katherine<span>.</span></h1><p>Welcome to my desktop.<br />A few things I’ve made, and things I love.</p><Link className="retro-button" href="/aboutMe">Take a look around ↗</Link></div><div className="window-status"><span>1 item</span><span>glad you’re here ♡</span></div></>}
      {dialog.id === "game-1" && <DinosaurGame isInFocus={currentFocus === dialog.id} />}
      {dialog.id === "game-2" && <Piano />}
      {dialog.id === "projects" && <div className="project-content"><p className="eyebrow">WORK IN PROGRESS</p><h2>On my workbench</h2><p>More projects are coming soon. In the meantime, try the piano or take a little game break.</p></div>}
    </DesktopWindow>
  )}</div>;
}
