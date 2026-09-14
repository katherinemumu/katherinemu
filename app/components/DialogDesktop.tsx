"use client";
import { useState } from "react";
import DesktopWindow from "./Dialog";
import DuckGame from "./DuckGame";
import Piano from "./Piano";

export type Dialog = {
  id: string;
  initialX: number;
  initialY: number;
  width: number;
  height: number;
  zIndex: number;
  openVersion?: number;
};
const initialDialogs: Dialog[] = [
  {
    id: "intro",
    initialX: 70,
    initialY: 50,
    width: 570,
    height: 410,
    zIndex: 1,
  },
  {
    id: "duck-game",
    initialX: 780,
    initialY: 400,
    width: 350,
    height: 240,
    zIndex: 2,
  },
  {
    id: "piano",
    initialX: 130,
    initialY: 600,
    width: 360,
    height: 220,
    zIndex: 3,
  },
];
const titles: Record<string, string> = {
  intro: "welcome.txt",
  "duck-game": "duck walk",
  piano: "piano",
  projects: "projects",
  aboutMe: "aboutMe.txt",
};

export default function DialogDesktop({
  extraDialogs = [],
  openRequest = null,
}: {
  extraDialogs?: Dialog[];
  openRequest?: { id: string; sequence: number } | null;
}) {
  const [focusOrder, setFocusOrder] = useState(["duck-game", "piano", "intro"]);
  const [closedDialogs, setClosedDialogs] = useState<string[]>([]);
  const [lastOpenRequest, setLastOpenRequest] = useState(openRequest);
  if (lastOpenRequest !== openRequest) {
    setLastOpenRequest(openRequest);
    if (openRequest) {
      setClosedDialogs((previous) => previous.filter((id) => id !== openRequest.id));
      setFocusOrder((previous) => [...previous.filter((id) => id !== openRequest.id), openRequest.id]);
    }
  }
  const currentFocus = focusOrder[focusOrder.length - 1];
  const bringToFront = (id: string) =>
    setFocusOrder((previous) =>
      previous[previous.length - 1] === id
        ? previous
        : [...previous.filter((item) => item !== id), id],
    );
  const closeDialog = (id: string) => {
    setClosedDialogs((previous) => [...previous, id]);
    setFocusOrder((previous) => previous.filter((item) => item !== id));
  };
  return (
    <div className="desktop-windows">
      {[...initialDialogs, ...extraDialogs].map((dialog) => (
        <DesktopWindow
          key={`${dialog.id}-${dialog.openVersion ?? 0}`}
          {...dialog}
          zIndex={100 + Math.max(0, focusOrder.indexOf(dialog.id) + 1)}
          styles={dialog.openVersion ? {
            position: "fixed",
            left: `max(16px, calc((100vw - ${dialog.width}px) / 2))`,
            top: `max(16px, calc((100dvh - ${dialog.height}px) / 2))`,
            width: `min(${dialog.width}px, calc(100vw - 32px))`,
            maxHeight: "calc(100dvh - 32px)",
            overflowY: "auto",
          } : undefined}
          title={titles[dialog.id]}
          active={currentFocus === dialog.id}
          closed={closedDialogs.includes(dialog.id)}
          className={`window-${dialog.id}${dialog.openVersion ? " window-opened" : ""}`}
          onBringToFront={() => bringToFront(dialog.id)}
          onClose={() => closeDialog(dialog.id)}
        >
          {dialog.id === "intro" && (
            <>
              <div className="intro-content">
                <p className="eyebrow">NICE TO MEET YOU!</p>
                <h1>
                  hello!
                  <br />
                  i’m katherine<span>.</span>
                </h1>
                <p>
                  Welcome to my desktop.
                  <br />A few things I’ve made, and things I love.
                </p>
              </div>
              <div className="window-status">
                <span>1 item</span>
                <span>glad you’re here ♡</span>
              </div>
            </>
          )}
          {dialog.id === "aboutMe" && (
            <>
              <div className="intro-content">
                <h1>i’m katherine<span>.</span></h1>
                <p>I’m a Software Engineer at Watershed 💻.</p>
                <p>I currently live in SF 🌁 &amp; I’m from Toronto 🍁.</p>
                <p>When I’m away from my keyboard, I like to eat 🍜, cook 🧑‍🍳, crochet 🧶, and play video games 🎮.</p>
              </div>
              <div className="window-status">
                <span>a little about me</span>
                <span>thanks for stopping by ♡</span>
              </div>
            </>
          )}
          {dialog.id === "duck-game" && (
            <DuckGame isInFocus={currentFocus === dialog.id} />
          )}
          {dialog.id === "piano" && <Piano />}
          {dialog.id === "projects" && (
            <div className="project-content">
              <p className="eyebrow">WORK IN PROGRESS</p>
              <h2>On my workbench</h2>
              <p>
                More projects are coming soon. In the meantime, try the piano or
                take a little game break.
              </p>
            </div>
          )}
        </DesktopWindow>
      ))}
    </div>
  );
}
