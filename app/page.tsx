
import Dialog from "./components/Dialog"
import DialogDesktop from "./components/DialogDesktop";
import Folder from "./components/Folder";

export default function Home() {
  return (
    <div className="main flex min-h-screen w-full font-sans gap-20">
      <DialogDesktop/>

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
