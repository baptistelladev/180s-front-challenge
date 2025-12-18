"use client";

import { ICONS } from "@/shared/maps/ICONS.maps";
import { ProductType } from "@/shared/models/responses";
import { getIconFromMap } from "@/shared/utils/icons.utils";

type IconName = keyof typeof ICONS;

type Props = {
  icon: IconName;
  title: string;
  subTitle: string;
  product?: ProductType | null;
  isMakingQuote?: boolean;
};

export default function PageHeaderTitleComp({
  icon,
  title,
  subTitle,
  product,
  isMakingQuote,
}: Props) {
  const Icon = getIconFromMap(icon);

  return (
    <div className="flex items-center gap-3 flex-1">
      <div className="p-1.5 bg-primary/10 rounded-md">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          {isMakingQuote && <span className="-mr-1">Cotação -</span>}
          <h1 className="text-sm font-medium">{title}</h1>
          {isMakingQuote && product && (
            <span className="flex items-center justify-center rounded-md px-2 py-0.5 font-medium whitespace-nowrap bg-primary/10 text-[10.5px]">
              {product}
            </span>
          )}
        </div>
        <p className="text-[10.5px] text-muted-foreground">{subTitle}</p>
      </div>
    </div>
  );
}
