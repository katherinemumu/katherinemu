import Image from "next/image";

export default function Folder({ text }: { text: string }) {
  return (
    <div className="flex-col justify-center">
      <div>
        <Image
          src="/folder.png"
          alt="folder icon"
          width={100}
          height={100}
          priority
        />
      </div>
      <h3 className="text-black">{text}</h3>
    </div>
  );
}
