"use client";

import { Button } from "@/components/ui/button";
import logo from "@/public/180seguros.png";
import { FileImage, GitBranch } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-[calc(100vh-16px)] flex items-center justify-center flex-col gap-6 px-6">
      <Image src={logo} alt="logo" title="logo" width={100} />

      <div className="flex flex-col items-center justify-center text-center max-w-sm gap-6">
        <p className="text-xs text-muted-foreground text-left">
          Este desafio técnico foi desenvolvido por{" "}
          <a
            className="text-foreground font-bold underline hover:opacity-50 transition-opacity transition-200"
            href="https://www.linkedin.com/in/felipebaptistellavieira/"
            title="Felipe Baptistella"
          >
            Felipe Baptistella
          </a>
          , candidato a vaga de Desenvolvedor Front-end na 180s Seguros.
        </p>

        <div className="w-full flex justify-center items-center gap-3 p-0">
          <Button
            variant={"default"}
            className="text-xs font-normal p-0 bg-foreground"
          >
            <a
              href="https://www.figma.com/make/R01ErFVQWYlsGyRye3SKvL/Sistema-de-Cota%C3%A7%C3%A3o-de-Seguros-180"
              className="flex items-center gap-2 h-full w-full p-3"
            >
              <FileImage /> Ver protótipo
            </a>
          </Button>
          <Button variant={"outline"} className="text-xs font-normal p-0">
            <a
              href="https://github.com/baptistelladev/180s-front-challenge"
              className="flex items-center gap-2 h-full w-full p-3"
            >
              <GitBranch /> Ver documentação
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
