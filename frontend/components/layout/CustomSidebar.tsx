"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Plus, Shield } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function CustomSidebarComp({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  // MENU
  const menu: any[] = [
    {
      value: "nova-cotacao",
      text: "Nova cotação",
      icon: "plus",
      route: "/quotations",
    },
    {
      value: "minhas-apolices",
      text: "Minhas apólices",
      icon: "file-text",
      route: "/policies",
    },
  ];

  // HOOKS
  const pathname = usePathname();

  return (
    <Sidebar {...props} className="p-2">
      {/* HEADER */}
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-3 flex-1">
          <div className="p-1.5 bg-foreground rounded-md">
            <Shield className="text-background h-5 w-5" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-medium">180 Seguros</h1>
            </div>

            <p className="text-xs text-muted-foreground">Portal do Vendedor</p>
          </div>
        </div>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            {/* ITEMS */}
            <SidebarMenu>
              {menu.map((option) => (
                <SidebarMenuItem key={option.value}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === option.route}
                    className={`${pathname === option.route && "font-bold"} `}
                  >
                    <Link href={option.route}>
                      <Plus></Plus>
                      <span>
                        {option.text}
                        {pathname === option.route}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER */}
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
