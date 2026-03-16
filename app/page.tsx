
import Dialog from "./components/Dialog"
import Folder from "./components/Folder";

export default function Home() {
  return (
    <div className="main flex min-h-screen w-full font-sans gap-20">
     <div>
      <Dialog text={"a game"} initialX={100} initialY={40}/>
      <Dialog text={"another game"} initialX={150} initialY={500}/>
       <div className="flex font-mono text-7xl pt-20 katherine-text">
          <Dialog text={"hello! i'm katherine"} initialX={400} initialY={150} height={800} width={800}/>
        </div>
     </div>

      <div className="flex flex-col gap-10 p-4 items-end">
        <a href="/aboutMe">
          <Folder text={'about me'}/>
        </a>
        <Folder text={'projects'}/>
        <Folder text={'recipes'}/>
        <Folder text={'contact me'}/>
      </div>
    </div>
  );
}
