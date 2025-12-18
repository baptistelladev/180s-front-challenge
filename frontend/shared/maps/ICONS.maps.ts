import {
  FileText,
  Heart,
  Home,
  LucideIcon,
  Phone,
  Plus,
  Shield,
  Smartphone,
} from "lucide-react";

export const ICONS: Record<string, LucideIcon> = {
  plus: Plus,
  "file-text": FileText,
  shield: Shield,
};

/**
 * @description Ícones para usar quando for se referir a produtos.
 */

export type InsuranceIconKey = keyof typeof INSURANCE_ICONS;

export const INSURANCE_ICONS: Record<string, LucideIcon> = {
  residencial: Home,
  vida: Heart,
  celular: Smartphone,
};
