"use client";

import InsurancePolicyCard from "@/components/custom/InsurancePolicyCard/InsurancePolicyCard";
import PageHeaderComp from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { useInsurances } from "@/hooks/products/use-insurances";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ApolicesPage() {
  /**
   * HOOKS
   */
  const { data, isLoading } = useInsurances();

  return (
    <div className="nova-cotacao-page-wrapper">
      <PageHeaderComp
        icon="file-text"
        title="Minhas Apólices"
        subTitle="Gerencie suas apólices de seguro emitidas"
      />

      {/* MOCKADO */}
      {true && (
        <div className="container mx-auto px-6 py-6 max-w-4xl">
          <div className="flex items-start justify-between gap-6">
            <div className="text-left mb-6 flex-1">
              <h1 className="mb-2 text-xl font-medium">Minhas Apólices</h1>
              <p className="text-muted-foreground font-normal text-sm">
                Gerencie suas apólices de seguro
              </p>
            </div>
            <Button className="rounded-md text-xs font-medium transition-all bg-foreground text-primary-foreground h-8 p-0">
              <Link
                href={`/nova-cotacao`}
                className="px-3 py-2 w-full flex items-center"
              >
                <Plus className="mr-3" /> Nova Cotação
              </Link>
            </Button>
            ;
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InsurancePolicyCard />

            <div className="space-y-3 px-6 md:px-0">
              {!isLoading && (
                <p className="text-lg">
                  <span className="italic text-red-700 font-bold">
                    {data?.length} registros
                  </span>
                </p>
              )}

              {isLoading && (
                <div className="w-30 h-7 bg-red-200 animate-pulse"></div>
              )}

              <p className="text-sm">
                Este é o número de apólices obtidas no endpoint "/insurances".
              </p>

              <p className="text-sm">
                Para ter um <span className="italic">loading state</span> e
                algum registro nessa tela eu teria que ter criado form{" "}
                <span className="italic">step-by-step</span> para chegar ao
                final e obter uma apólice, mas infelizmente não tive tempo
                hábil.
              </p>

              <p className="text-sm">
                Optei por pelo menos criar o componente (mockado mesmo) e
                ilustrar como ficaria uma apólice com o status{" "}
                <span className="text-red-700">vencida</span>.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
