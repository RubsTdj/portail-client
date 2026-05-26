import { Sidebar } from "@/components/layout/sidebar";
import { MobileHeader } from "@/components/layout/mobile-header";
import { MobileNav } from "@/components/layout/mobile-nav";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <MobileHeader />
      <main className="flex-1 pt-[72px] pb-24 px-5 sm:px-6 lg:pt-10 lg:pb-10 lg:px-10 xl:px-14 lg:ml-[220px]">
        {children}
      </main>
      <MobileNav />
    </div>
  );
}
