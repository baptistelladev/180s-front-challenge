import { Metadata } from "next";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Nova cotação | Escolha um produto da 180seguros",
  description: "Produtos para sua nova cotação na 180seguros",
};

export default async function NovaCotacaoLayout({ children }: Props) {
  return <section className="nova-cotacao-layout">{children}</section>;
}
