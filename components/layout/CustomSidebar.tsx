import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Shield } from "lucide-react";

export function CustomSidebarComp({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="p-2">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-3 flex-1">
          <div className="p-1.5 bg-foreground rounded-md">
            <Shield className="text-background size-5" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-medium">180 Seguros</h1>
            </div>

            <p className="text-xs text-muted-foreground">Portal do Vendedor</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>

      <SidebarFooter className="border-t">
        <div className="text-xs text-muted-foreground px-2 py-2">
          <div className="flex justify-between items-center mb-1">
            <span>Versão 1.0.0</span>
            <span className="text-green-600">●</span>
          </div>
          <p>Suporte: 0800-123-456</p>
          <p className="text-[10px] mt-1 opacity-75">
            Atualizado hoje às 14:30
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
