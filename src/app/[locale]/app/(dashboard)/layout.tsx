import DashboardFooter from "@/components/shared/footer";
import DashboardSidebar from "@/components/shared/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full">
      <DashboardSidebar />
      <div className="h-full w-full overflow-x-hidden overflow-y-scroll">
        <div id="start" />
        <main className="px-4 py-[40px] md:px-[60px]">{children}</main>
        <DashboardFooter />
      </div>
    </div>
  );
}
