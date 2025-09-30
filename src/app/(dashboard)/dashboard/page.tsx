"use client";

import React from "react";
import {
  Users,
  Film,
  Eye,
  Star,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Settings,
} from "lucide-react";
import { WelcomeSection } from "../_components/welcome_section";

const DashboardPage = () => {
  // Mock data
  const stats = [
    {
      title: "Total Users",
      value: "12,543",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Total Movies",
      value: "2,847",
      change: "+8.2%",
      trend: "up",
      icon: Film,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Total Views",
      value: "1.2M",
      change: "+23.1%",
      trend: "up",
      icon: Eye,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Avg Rating",
      value: "4.6",
      change: "+0.3",
      trend: "up",
      icon: Star,
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const recentMovies = [
    {
      title: "Avatar: The Way of Water",
      views: "2.1M",
      rating: 4.8,
      status: "trending",
    },
    {
      title: "Top Gun: Maverick",
      views: "1.8M",
      rating: 4.7,
      status: "popular",
    },
    {
      title: "Black Panther: Wakanda Forever",
      views: "1.5M",
      rating: 4.6,
      status: "new",
    },
    {
      title: "Spider-Man: No Way Home",
      views: "1.3M",
      rating: 4.9,
      status: "classic",
    },
  ];

  const topGenres = [
    { name: "Action", count: 456, percentage: 35 },
    { name: "Drama", count: 342, percentage: 26 },
    { name: "Comedy", count: 298, percentage: 23 },
    { name: "Horror", count: 156, percentage: 12 },
    { name: "Romance", count: 98, percentage: 8 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <WelcomeSection />
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div
                  className={`flex items-center space-x-1 text-sm ${
                    stat.trend === "up" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-slate-400 text-sm">{stat.title}</div>
            </div>
          );
        })}
      </div>

      {/* Charts and Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Movies */}
        <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Recent Movies</h2>
            <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentMovies.map((movie, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Film className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{movie.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-slate-400">
                      <span className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{movie.views}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>{movie.rating}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    movie.status === "trending"
                      ? "bg-red-500/20 text-red-400"
                      : movie.status === "popular"
                        ? "bg-blue-500/20 text-blue-400"
                        : movie.status === "new"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {movie.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Genres */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
          <h2 className="text-xl font-bold text-white mb-6">Top Genres</h2>
          <div className="space-y-4">
            {topGenres.map((genre, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">{genre.name}</span>
                  <span className="text-slate-400 text-sm">
                    {genre.count} movies
                  </span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${genre.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
        <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all group">
            <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-all">
              <Film className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-white font-medium">Add Movie</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all group">
            <div className="p-2 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-all">
              <Users className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-white font-medium">Manage Users</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all group">
            <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-all">
              <BarChart3 className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-white font-medium">View Reports</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all group">
            <div className="p-2 bg-yellow-500/20 rounded-lg group-hover:bg-yellow-500/30 transition-all">
              <Settings className="w-5 h-5 text-yellow-400" />
            </div>
            <span className="text-white font-medium">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
