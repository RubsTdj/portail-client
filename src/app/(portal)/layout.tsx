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
      <main className="flex-1 pt-14 pb-20 px-4 lg:pt-0 lg:pb-0 lg:px-8 lg:ml-[220px]">
        {children}
      </main>
      <MobileNav />
    </div>
  );
}
