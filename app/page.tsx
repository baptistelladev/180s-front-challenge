import logo from "@/public/180seguros.png";
import Image from "next/image";

export default function Inicio() {
  return (
    <div className="w-full h-[calc(100vh-16px)] flex items-center justify-center ">
      <div className="grid">
        <Image src={logo} alt="logo" title="logo" width={100} />
      </div>
    </div>
  );
}
