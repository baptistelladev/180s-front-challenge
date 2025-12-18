"use client";

import NewQuotationProductCardComp from "@/components/custom/NewQuotationProductCard";
import PageHeaderComp from "@/components/layout/PageHeader";
import { UseProducts } from "@/hooks/products/use-products";
import React from "react";

export default function NovaCotacaoPage() {
  /**
   * HOOKS
   */
  const { data, isLoading, error } = UseProducts();

  if (isLoading && !data) {
    return <p>caregando</p>;
  }

  return (
    <div className="nova-cotacao-page-wrapper">
      <PageHeaderComp
        icon="plus"
        title="Nova cotação"
        subTitle="Escolha o tipo de seguro que deseja cotar"
      />

      <div className="container mx-auto px-6 py-6 max-w-4xl">
        <div className="text-center mb-6">
          <h1 className="mb-4 text-xl font-medium">Escolha o tipo de seguro</h1>
          <p className="text-muted-foreground font-normal text-sm">
            Selecione o produto que melhor atende às suas necessidades
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* LISTA */}
          {data?.map((product) => (
            <React.Fragment key={product.id}>
              <NewQuotationProductCardComp
                product={
                  product
                } /** TODO: falar com o ui/ux se podemos usar a descrição que já vem do serviço. */
              ></NewQuotationProductCardComp>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
