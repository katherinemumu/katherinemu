"use client";

import { useState } from "react";

const projects = [
  {
    id: "desktop",
    name: "my desktop",
    symbol: "⌘",
    type: "Personal website",
    eyebrow: "KATHERINE’S DESKTOP",
    heading: "a cute lil place to learn more about me",
    caption: "made with a little pink ♡",
    description: "a place to learn about me and the things I love",
  },
  {
    id: "bookshelf",
    name: "bookshelf",
    symbol: "▤",
    type: "Book tracking app",
    eyebrow: "BOOKSHELF",
    heading: "a little room that grows with every book",
    caption: "read a little, decorate a little ♡",
    description: "a book tracking app where you decorate a room as you read more",
  },
  {
    id: "closet",
    name: "my closet",
    symbol: "♧",
    type: "Closet tracking app",
    eyebrow: "MY CLOSET",
    heading: "a little inspiration for getting dressed",
    caption: "more possibilities in your own closet ♡",
    description: "a closet tracking app that helps you come up with outfits and analyze your outfits",
  },
] as const;

export default function Projects() {
  const [selectedId, setSelectedId] = useState<string>("desktop");
  const selected = projects.find((project) => project.id === selectedId) ?? projects[0];

  return (
    <div className="projects-browser">
      <nav className="projects-files" aria-label="Project files">
        <p className="projects-label">FILES</p>
        {projects.map((project) => (
          <button key={project.id} type="button" className="projects-file" aria-pressed={selected.id === project.id} aria-controls="project-preview" onClick={() => setSelectedId(project.id)}>
            <span className="projects-file-icon" aria-hidden="true">{project.symbol}</span>
            <span>{project.name}</span>
          </button>
        ))}
        <p className="projects-file-count">{projects.length} projects</p>
      </nav>
      <section id="project-preview" className="projects-preview" aria-label={`${selected.name} preview`} aria-live="polite">
        <div className={`projects-canvas projects-canvas-${selected.id}`}>
          <div className="projects-desktop-cover">
            <p className="eyebrow">{selected.eyebrow}</p>
            <h2>{selected.heading}</h2>
            <p>{selected.caption}</p>
          </div>
        </div>
        <div className="projects-details">
          <div className="projects-detail-heading"><h2>{selected.name}</h2><span>{selected.type}</span></div>
          <p>{selected.description}</p>
        </div>
      </section>
    </div>
  );
}
