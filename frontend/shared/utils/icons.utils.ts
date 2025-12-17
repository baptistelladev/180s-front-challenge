import { LucideIcon } from "lucide-react";
import { ICONS } from "../maps/ICONS.maps";

type IconName = keyof typeof ICONS;

export function getIconFromMap(icon: IconName): LucideIcon {
  return ICONS[icon];
}
