"use client";
import Link from "next/link";
import { useState } from "react";
import DialogDesktop, { Dialog } from "./components/DialogDesktop";
import Folder from "./components/Folder";

const projectsDialog: Dialog = {
  id: "projects",
  initialX: 570,
  initialY: 110,
  width: 390,
  height: 250,
  zIndex: 100,
};

export default function Home() {
  const [projectsOpen, setProjectsOpen] = useState(false);
  return (
    <main className="desktop">
      <header className="desktop-menu">
        <Link href="/" className="desktop-brand">
          ✦ katherine
        </Link>
        <span>personal desktop</span>
        <span className="menu-right">make yourself at home ♡</span>
      </header>
      <div className="desktop-workspace">
        <DialogDesktop extraDialogs={projectsOpen ? [projectsDialog] : []} />
        <nav className="desktop-folders" aria-label="Explore my desktop">
          <Link href="/aboutMe">
            <Folder text="about me" />
          </Link>
          <Folder text="projects" onClick={() => setProjectsOpen(true)} />
          <Folder text="recipes" disabled />
          <Folder text="contact me" disabled />
        </nav>
      </div>
      <footer className="desktop-footer">
        <span>✦ katherine’s desktop</span>
        <span>slow down, take a little break</span>
      </footer>
    </main>
  );
}
