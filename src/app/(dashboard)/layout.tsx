import { Suspense } from "react";
import { LoadingVideo } from "@/components";

export default function DashboardLayout({
  children,
  team,
  analytic,
}: {
  children: React.ReactNode;
  team: React.ReactNode;
  analytic: React.ReactNode;
}) {
  return (
    <>
      <div className="dashboard-layout">
        <Suspense fallback={<LoadingVideo />}>
          <aside>
            <nav>Dashboard Sidebar Navigation</nav>
            {team}
          </aside>
          <main>{children}</main>
          {analytic}
        </Suspense>
      </div>
    </>
  );
}
