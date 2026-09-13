"use client";
import Link from "next/link";
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
};

export default function DialogDesktop({
  extraDialogs = [],
}: {
  extraDialogs?: Dialog[];
}) {
  const [focusOrder, setFocusOrder] = useState(["intro"]);
  const currentFocus = focusOrder[focusOrder.length - 1];
  const bringToFront = (id: string) =>
    setFocusOrder((previous) =>
      previous[previous.length - 1] === id
        ? previous
        : [...previous.filter((item) => item !== id), id],
    );
  return (
    <div className="desktop-windows">
      {[...initialDialogs, ...extraDialogs].map((dialog) => (
        <DesktopWindow
          key={dialog.id}
          {...dialog}
          zIndex={10 + Math.max(0, focusOrder.indexOf(dialog.id) + 1)}
          title={titles[dialog.id]}
          active={currentFocus === dialog.id}
          className={`window-${dialog.id}`}
          onBringToFront={() => bringToFront(dialog.id)}
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
