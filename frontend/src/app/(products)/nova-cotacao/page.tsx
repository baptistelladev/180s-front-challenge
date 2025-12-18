"use client";

import NewQuotationProductCardComp from "@/components/custom/NewQuotationProductCard/NewQuotationProductCard";
import NewQuotationProductCardSkeleton from "@/components/custom/NewQuotationProductCard/NewQuotationProductCardSkeleton";
import PageHeaderComp from "@/components/layout/PageHeader";
import { useProducts } from "@/hooks/products/use-products";
import React from "react";

export default function NovaCotacaoPage() {
  /**
   * HOOKS
   */
  const { data, isLoading } = useProducts();

  return (
    <div className="nova-cotacao-page-wrapper">
      <PageHeaderComp
        icon="plus"
        title="Nova cotação"
        subTitle="Escolha o tipo de seguro que deseja cotar"
      />

      {/* LOADING - SKELETON */}
      {!data && isLoading && (
        <div className="container mx-auto px-6 py-6 max-w-4xl">
          <div className="text-center mb-6">
            <div className="h-7 mb-4 bg-primary/10 animate-pulse rounded-lg w-full max-w-55 mx-auto" />
            <div className="h-5 bg-primary/10 animate-pulse rounded-sm w-full max-w-125 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <React.Fragment key={`item-${index}`}>
                <NewQuotationProductCardSkeleton />
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* HAS RESULTs */}
      {data && !isLoading && (
        <div className="container mx-auto px-6 py-6 max-w-4xl">
          <div className="text-center mb-6">
            <h1 className="mb-4 text-xl font-medium">
              Escolha o tipo de seguro
            </h1>
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
                />
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
