import PageHeaderTitleComp from "../custom/PageHeaderTitle";
import { SidebarTrigger } from "../ui/sidebar";

export default function PageHeaderComp() {
  return (
    <header className="w-full border-b h-16 flex items-center px-3 justify-start">
      <SidebarTrigger />

      <PageHeaderTitleComp />
    </header>
  );
}
