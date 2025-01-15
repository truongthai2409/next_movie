import { Suspense } from "react";
import Loading from "./loading";

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
    <div className="dashboard-layout">
      <Suspense fallback={<Loading />}>
        <aside>
          <nav>Dashboard Sidebar Navigation</nav>
        </aside>
        <main>{children}</main>
        {team}
        {analytic}
      </Suspense>
    </div>
  );
}
