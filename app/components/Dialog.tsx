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
  
  function DialogContents({text}: {text: string}) {
    return (
      <div className="flex w-full h-full bg-white">
        <h1 className="text-black text">{text}</h1>
      </div>
    )
  }
  
  export default function Dialog({text}: {text: string}) {
    return (
      <div className="flex-col dialog flex gap-2 h-100 w-100 border">
        <DialogHeader/>
        <DialogContents text={text}/>
      </div>
    )
  }