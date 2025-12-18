import { Button } from "@/components/ui/button";
import { Calendar, Shield } from "lucide-react";

export default function InsurancePolicyCard() {
  return (
    <div className="w-full flex flex-col gap-7 border rounded-xl p-5 border-l-4 border-l-primary/20 transition-all duration-200 hover:shadow-lg">
      <div className="card-header flex flex-col">
        <div className="flex items-center justify-between gap-2">
          <div className="flex  flex-1 items-center text-sm">
            <Shield className="h-[17.5px]" /> Seguro de Vida
          </div>
          <span
            data-slot="badge"
            className="flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium  bg-red-50 text-red-700 text-[10.5px]"
          >
            Vencida
          </span>
        </div>

        <div className="flex items-center  text-[12.25px] text-muted-foreground">
          <Calendar className="h-3.5" /> Emitida em 10/02/2024
        </div>
      </div>

      <div className="card-content flex flex-col gap-3">
        <div className="w-full bg-muted/50 rounded-lg p-[10.5px] flex flex-col gap-2">
          <p className="w-full flex justify-between gap-6 items-center">
            <span className="text-xs text-muted-foreground flex-1">
              N da Apólice
            </span>
            <span className="text-xs text-foreground font-medium text-right">
              P0L2LDALDLA
            </span>
          </p>
          <p className="w-full flex justify-between items-center gap-6">
            <span className="text-xs text-muted-foreground flex-1">
              Segurado
            </span>
            <span className="text-xs text-foreground font-medium text-right">
              Ana Paula Ferreira
            </span>
          </p>
        </div>

        <div className="w-full bg-green-50 rounded-lg p-[10.5px]">
          <p className="w-full flex justify-between gap-6 items-center">
            <span className="text-green-800 text-xs flex-1">Valor mensal</span>
            <span className="text-green-700 font-bold text-sm text-right ">
              R$ 230.00
            </span>
          </p>
        </div>
      </div>

      <div className="card-footer flex flex-col w-full">
        <div className="w-full text-center text-[10px] mb-5">
          <p className="text-muted-foreground text-[10.5px]">Vigência</p>
          <p className="text-xs text-foreground font-medium">
            08/11/2023 até 08/11/2024
          </p>
        </div>

        <Button
          variant={"outline"}
          className="rounded-md text-xs font-medium transition-all text-foreground h-8 p-0 shadow-none border-px"
        >
          Ver Detalhes
        </Button>
      </div>
    </div>
  );
}
