import { Suspense } from "react";
import { LoadingVideo } from "@/components";
import {
  Home,
  BarChart3,
  Users,
  Settings,
  Film,
  Star,
  TrendingUp,
  Bell,
  Search,
} from "lucide-react";

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
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 h-screen overflow-y-auto dashboard-scrollbar bg-slate-800/50 backdrop-blur-lg border-r border-slate-700/50 flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-slate-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Film className="w-5 h-5 `text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">MovieDash</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <a
              href="/dashboard"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-purple-600/20 text-purple-300 border border-purple-500/30 transition-all hover:bg-purple-600/30"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700/50 transition-all"
            >
              <BarChart3 className="w-5 h-5" />
              <span>Analytics</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700/50 transition-all"
            >
              <Film className="w-5 h-5" />
              <span>Movies</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700/50 transition-all"
            >
              <Users className="w-5 h-5" />
              <span>Users</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700/50 transition-all"
            >
              <Star className="w-5 h-5" />
              <span>Reviews</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700/50 transition-all"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </a>
          </nav>

          {/* Team Section */}
          <div className="p-4 border-t border-slate-700/50">{team}</div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-slate-800/30 backdrop-blur-lg border-b border-slate-700/50 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold text-white">Dashboard</h2>
                <div className="flex items-center space-x-2 text-sm text-slate-400">
                  <TrendingUp className="w-4 h-4" />
                  <span>Last updated: {new Date().toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-slate-700/50 border border-slate-600/50 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                </div>
                <button className="p-2 text-slate-400 hover:text-white transition-colors">
                  <Bell className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-auto p-6 dashboard-scrollbar">
            <Suspense fallback={<LoadingVideo />}>
              <div className="space-y-6">
                {children}
                {analytic}
              </div>
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}
