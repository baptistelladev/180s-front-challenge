import Link from "next/link";

import { INSURANCE_ICONS, InsuranceIconKey } from "@/shared/maps/ICONS.maps";
import { useNewQuotationStore } from "@/src/stores/products/new-quotation";
import { Product, ProductType } from "@/shared/models/responses";
import { Button } from "@/components/ui/button";

type Props = {
  product: Product;
};

export default function NewQuotationProductCardComp({ product }: Props) {
  /* DATA */
  const Icon = INSURANCE_ICONS[product.productType];

  /* STOREs */
  const { setQuotationSelectedProduct } = useNewQuotationStore();

  return (
    <div className="w-full bg-card text-card-foreground gap-6 rounded-xl border hover:shadow-lg transition-shadow cursor-pointer flex flex-col">
      <div className="px-6 gap-1.5 pt-6 flex-1 flex flex-col">
        <div className="flex items-center w-full gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="h-6 w-6" />
          </div>
          <h4 className="leading-none text-sm">{product.name}</h4>
        </div>
        <p className="text-muted-foreground text-sm">{product.description}</p>
      </div>

      <div className="px-6 pb-6">
        <Button
          onClick={() => setQuotationSelectedProduct(product)}
          className="rounded-md text-xs font-medium transition-all bg-foreground text-primary-foreground h-8 p-0 w-full"
        >
          <Link
            href={`/nova-cotacao/${product.productType}`}
            className="px-4 py-2  w-full"
          >
            Realizar Cotação
          </Link>
        </Button>
      </div>
    </div>
  );
}
