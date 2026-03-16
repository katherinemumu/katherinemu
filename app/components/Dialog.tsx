'use client';
import { useDraggable } from "../hooks/useDraggable";

function CircleComponent ({color }: {color: string}) {
    return (
      <div className={`circle-${color}`}>
      </div>
    );
  };

function DialogHeader() {
    return (
    <div className="flex gap-2 flex-row justify-content">
    <CircleComponent color="red"/>
    <CircleComponent color="yellow"/>
    <CircleComponent color="green"/>
  </div>
    )
  }
  
  function DialogContents({text, height, width}: {text: string; height?: number, width?: number}) {
    return (
      <div className={`flex bg-white h-full w-full katherine-text text-center`}>
        <h1 className="text-black text">{text}</h1>
      </div>
    )
  }
 
  export default function Dialog({text, height, width, initialX, initialY}: {text: string; height?: number; width?: number; initialX: number, initialY: number }) {
    const {ref, onMouseDown} = useDraggable();
    const h = height ?? 400;
    const w = width ?? 400;

    return (
      <div ref={ref} className={`flex-col dialog flex gap-2 border`} style={{position: 'absolute', left: initialX, top: initialY, height:h, width: w}}>
        <div onMouseDown={onMouseDown}>
          <DialogHeader/>
        </div>
        <DialogContents text={text} height={h} width={w}/>
      </div>
    )
  }