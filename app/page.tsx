"use client";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import DialogDesktop from "./components/DialogDesktop";
import Folder from "./components/Folder";
// Engine + bundle loader
import { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { useMemo } from "react";

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

  return (
    <ParticlesProvider init={init}>    
      <Particles id="tsparticles" options={options} />
      <div className="main flex min-h-screen w-full font-sans gap-20">
      <DialogDesktop />

      <div className="flex flex-col gap-10 p-4 items-end">
        <a href="/aboutMe">
          <Folder text={"about me"} />
        </a>
        <Folder text={"projects"} />
        <Folder text={"recipes"} />
        <Folder text={"contact me"} />
      </div>
    </div>
    </ParticlesProvider>
  );
}
