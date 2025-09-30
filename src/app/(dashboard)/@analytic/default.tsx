import React from 'react'
import { TrendingUp, TrendingDown, Eye, Star, Calendar } from 'lucide-react'

const AnalyticsPage = () => {
  // Dữ liệu mẫu
  const weeklyData = [
    { day: 'Mon', views: 2400, users: 1800 },
    { day: 'Tue', views: 3200, users: 2200 },
    { day: 'Wed', views: 2800, users: 1900 },
    { day: 'Thu', views: 4100, users: 2800 },
    { day: 'Fri', views: 5200, users: 3500 },
    { day: 'Sat', views: 6800, users: 4200 },
    { day: 'Sun', views: 7200, users: 4800 }
  ]

  const topMovies = [
    { title: 'Avatar: The Way of Water', views: 125000, rating: 4.8, trend: 'up' },
    { title: 'Top Gun: Maverick', views: 98000, rating: 4.7, trend: 'up' },
    { title: 'Black Panther 2', views: 87000, rating: 4.6, trend: 'down' },
    { title: 'Spider-Man: No Way Home', views: 76000, rating: 4.9, trend: 'up' }
  ]

  const maxViews = Math.max(...weeklyData.map(d => d.views))
  const maxUsers = Math.max(...weeklyData.map(d => d.users))

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Performance Overview</h2>
          <div className="flex items-center space-x-2 text-sm text-slate-400">
            <Calendar className="w-4 h-4" />
            <span>Last 7 days</span>
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="mb-6">
          <div className="flex items-end justify-between h-48 bg-slate-700/30 rounded-lg p-4">
            {weeklyData.map((data, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div className="flex flex-col items-center space-y-1">
                  <div 
                    className="w-8 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t transition-all duration-500 hover:from-purple-400 hover:to-pink-400"
                    style={{ height: `${(data.views / maxViews) * 120}px` }}
                    title={`${data.day}: ${data.views.toLocaleString()} views`}
                  ></div>
                  <div 
                    className="w-6 bg-gradient-to-t from-blue-500 to-cyan-500 rounded-t transition-all duration-500 hover:from-blue-400 hover:to-cyan-400"
                    style={{ height: `${(data.users / maxUsers) * 80}px` }}
                    title={`${data.day}: ${data.users.toLocaleString()} users`}
                  ></div>
                </div>
                <span className="text-xs text-slate-400">{data.day}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
              <span className="text-slate-300">Views</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded"></div>
              <span className="text-slate-300">Users</span>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-700/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">Total Views</span>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white">31.2K</div>
            <div className="text-green-400 text-sm">+18.5% from last week</div>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">Active Users</span>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white">21.8K</div>
            <div className="text-green-400 text-sm">+12.3% from last week</div>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">Avg. Rating</span>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white">4.7</div>
            <div className="text-green-400 text-sm">+0.2 from last week</div>
          </div>
        </div>
      </div>

      {/* Top Movies Analytics */}
      <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
        <h2 className="text-xl font-bold text-white mb-6">Top Performing Movies</h2>
        <div className="space-y-4">
          {topMovies.map((movie, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-medium text-white">{movie.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-slate-400">
                    <span className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{movie.views.toLocaleString()}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>{movie.rating}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                movie.trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                {movie.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{movie.trend === 'up' ? '+5.2%' : '-2.1%'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-lg font-bold text-white mb-4">User Engagement</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Average Session Duration</span>
              <span className="text-white font-medium">24m 32s</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Pages per Session</span>
              <span className="text-white font-medium">3.8</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Bounce Rate</span>
              <span className="text-white font-medium">28.5%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Return Visitors</span>
              <span className="text-white font-medium">67.2%</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-lg font-bold text-white mb-4">Content Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Movies Added This Week</span>
              <span className="text-white font-medium">23</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Reviews Submitted</span>
              <span className="text-white font-medium">1,247</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Favorites Added</span>
              <span className="text-white font-medium">3,891</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Watchlist Items</span>
              <span className="text-white font-medium">8,234</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage
