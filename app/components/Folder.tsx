import Image from "next/image";

export default function Folder({ text, onClick }: { text: string, onClick: () => void }) {
  return (
    <div className="flex-col justify-center flex text-center gap-2"
      onClick={onClick}>
      <div>
        <Image
          src="/newFolder.png"
          alt="folder icon"
          width={100}
          height={100}
          priority
        />
      </div>
      <h3 className="text">{text}</h3>
    </div>
  );
}
