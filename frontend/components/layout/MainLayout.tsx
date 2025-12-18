"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { CustomSidebarComp } from "./CustomSidebar";

type Props = {
  children: React.ReactNode;
};

export default function MainLayoutComp({ children }: Props) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider defaultOpen={true}>
        {/* SIDEBAR */}
        <CustomSidebarComp side="left" variant="inset" />

        {/* CONTENT */}
        <SidebarInset>
          <main>{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </QueryClientProvider>
  );
}
