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

const aboutMeDialog: Dialog = {
  id: "aboutMe",
  initialX: 0,
  initialY: 0,
  width: 570,
  height: 410,
  zIndex: 100,
};

export default function Home() {
  const [openedDialogs, setOpenedDialogs] = useState<Dialog[]>([]);
  const [openRequest, setOpenRequest] = useState<{ id: string; sequence: number } | null>(null);
  const openDialog = (dialog: Dialog) => {
    setOpenedDialogs((previous) => {
      const existing = previous.find((item) => item.id === dialog.id);
      return [...previous.filter((item) => item.id !== dialog.id), { ...dialog, openVersion: (existing?.openVersion ?? 0) + 1 }];
    });
    setOpenRequest((previous) => ({ id: dialog.id, sequence: (previous?.sequence ?? 0) + 1 }));
  };
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
        <DialogDesktop extraDialogs={openedDialogs} openRequest={openRequest} />
        <nav className="desktop-folders" aria-label="Explore my desktop">
          <Folder text="aboutMe.txt" icon="text" onClick={() => openDialog(aboutMeDialog)} />
          <Folder text="projects" onClick={() => openDialog(projectsDialog)} />
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
