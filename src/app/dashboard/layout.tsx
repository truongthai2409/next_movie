import { Suspense } from "react";
import Loading from "./loading";
import { AuthProvider } from "@/components";

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
    <AuthProvider>
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
    </AuthProvider>
  );
}
