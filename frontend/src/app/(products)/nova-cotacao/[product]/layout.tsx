import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nova cotação | Escolha um produto da 180seguros",
  description: "Produtos para sua nova cotação na 180seguros",
};

export default function CotarProdutoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
