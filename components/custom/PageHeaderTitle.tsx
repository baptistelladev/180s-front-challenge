import { ICONS } from "@/shared/maps/ICONS.maps";
import { getIconFromMap } from "@/shared/utils/icons.utils";

type IconName = keyof typeof ICONS;

type Props = {
  icon: IconName;
  title: string;
  subTitle: string;
};

export default function PageHeaderTitleComp({ icon, title, subTitle }: Props) {
  const Icon = getIconFromMap(icon);

  return (
    <div className="flex items-center gap-3 flex-1">
      <div className="p-1.5 bg-muted rounded-md">
        <Icon className="size-5" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h1 className="text-base font-medium">{title}</h1>
        </div>
        <p className="text-xs text-muted-foreground">{subTitle}</p>
      </div>
    </div>
  );
}
