"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import logo from "@/public/180seguros.png";
import { Code, GitBranch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const { setOpen } = useSidebar();

  useEffect(() => {
    setOpen(false);
  }, []);

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
            <Link
              href={"/policies"}
              className="flex items-center gap-2 h-full w-full p-3"
            >
              <Code /> Ver projeto
            </Link>
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
