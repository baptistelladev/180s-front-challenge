"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export default function QuotationsLayout({ children }: Props) {
  const { setOpen } = useSidebar();

  useEffect(() => {
    setOpen(true);
  }, []);

  return <section className="policies">{children}</section>;
}
