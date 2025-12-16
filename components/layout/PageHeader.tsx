import React from "react";
import PageHeaderTitleComp from "../custom/PageHeaderTitle";
import { SidebarTrigger } from "../ui/sidebar";

type Props = React.ComponentProps<typeof PageHeaderTitleComp>;

export default function PageHeaderComp(props: Props) {
  return (
    <header className="w-full border-b h-16 flex items-center px-3 justify-start">
      <SidebarTrigger />

      <PageHeaderTitleComp {...props} />
    </header>
  );
}
