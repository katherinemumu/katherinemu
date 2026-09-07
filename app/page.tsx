"use client";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import DialogDesktop, { Dialog } from "./components/DialogDesktop";
import Folder from "./components/Folder";
// Engine + bundle loader
import { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { useMemo, useState } from "react";

const projectsDialog: Dialog = {
  id: 'projects',
  initialX: 100,
  initialY: 200,
  width: 400,
  height: 300,
  zIndex: 5, 
}

async function init(engine: Engine): Promise<void> {
  await loadSlim(engine);
}

export default function Home() {
  const options: ISourceOptions = useMemo(() => ({
    background: {
      color: {
        value: "pink", // Clear background color so particles are visible
      },
    },
    fpsLimit: 120,
    particles: {
      paint: {
      fill: {
        color: {
          value: [
            "#f472b6",
            "#ffffff"
          ]
        },
        enable: true
      },
      stroke: {
        color: {
          "value": "#ffffff"
        },
        width: 0
      }
    },
      move: {
        enable: true,
        speed: 3,
      },
      number: {
        density: {
          enable: true,
        },
        value: 100,
      },
      opacity: {
        value: 0.9,
      },
      shape: {
        type: ["circle", "star"]
      },
      size: {
        value: { min: 10, max: 15 }, 
      },
    },
  }), []);

  const [extraDialogs, setExtraDialogs] = useState<Set<Dialog>>(new Set());

  return (
    <ParticlesProvider init={init}>    
      <Particles id="tsparticles" options={options} />
      <div className="main flex min-h-screen w-full font-sans gap-20">
      <DialogDesktop extraDialogs={Array.from(extraDialogs)}/>

      <div className="flex flex-col gap-10 p-4 items-end">
        <a href="/aboutMe">
          <Folder text={"about me"} onClick={() => {}} />
        </a>
        <Folder text={"projects"} onClick={() => setExtraDialogs(prev => new Set(prev).add(projectsDialog))}/>
        <Folder text={"recipes"} onClick={() => {}}/>
        <Folder text={"contact me"} onClick={() => {}}/>
      </div>
    </div>
    </ParticlesProvider>
  );
}