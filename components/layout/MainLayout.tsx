import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { CustomSidebarComp } from "./CustomSidebar";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <SidebarProvider defaultOpen={false}>
      {/* SIDEBAR */}
      <CustomSidebarComp side="left" variant="inset" />

      {/* CONTENT */}
      <SidebarInset>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
