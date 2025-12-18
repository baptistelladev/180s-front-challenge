import { Metadata } from "next";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Apólices | 180seguros",
  description: "Gerencie suas apólices de seguro emitidas",
};

export default async function ApolicesLayout({ children }: Props) {
  return <section className="apolices-layout">{children}</section>;
}
