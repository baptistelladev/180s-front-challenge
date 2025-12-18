"use client";

import PageHeaderComp from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { useNewQuotationStore } from "@/src/stores/products/new-quotation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CotarProdutoPage() {
  /* HOOKs */
  const { quotationSelectedProduct, clearQuotationSelectedProduct } =
    useNewQuotationStore();

  return (
    <div className="nova-cotacao-page-wrapper">
      <PageHeaderComp
        icon="plus"
        title={quotationSelectedProduct?.name!}
        subTitle="Complete sua cotação de seguro"
        isMakingQuote={true}
        product={quotationSelectedProduct?.productType}
      />

      <div className="container mx-auto px-6 py-6 max-w-4xl">
        <Button
          onClick={() => clearQuotationSelectedProduct()}
          size={"sm"}
          variant={"ghost"}
          className="text-[12.25px] font-medium hover:bg-primary/10 p-0"
        >
          <Link href={"/nova-cotacao"} className="p-3 flex items-center w-full">
            <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
          </Link>
        </Button>

        <div className="text-center mb-6">
          <h1 className="mb-1.75 text-xl font-medium">
            {quotationSelectedProduct?.name}
          </h1>
          <p className="text-muted-foreground font-normal text-sm">
            Preencha as informações para calcular sua cotação
          </p>
        </div>

        <div className="pt-6">
          <p className="text-sm">
            ...formulário de <b>{quotationSelectedProduct?.name}</b> viria aqui.
          </p>
        </div>
      </div>
    </div>
  );
}
