import { Product, ProductType } from "@/shared/models/responses";
import { create } from "zustand";

interface newQuotationStore {
  quotationSelectedProduct: Product | null | undefined;
  setQuotationSelectedProduct: (type: Product | null | undefined) => void;
  clearQuotationSelectedProduct: () => void;
}

export const useNewQuotationStore = create<newQuotationStore>((set) => ({
  quotationSelectedProduct: null,
  setQuotationSelectedProduct: (type) =>
    set({ quotationSelectedProduct: type }),
  clearQuotationSelectedProduct: () => set({ quotationSelectedProduct: null }),
}));
