import React from 'react'
import { User, Settings, LogOut, Bell, Shield, Crown } from 'lucide-react'

export default function TeamSlot() {
  // Mock user data
  const user = {
    name: "Admin User",
    email: "admin@moviedash.com",
    avatar: "/api/placeholder/40/40",
    role: "Administrator",
    status: "online"
  }

  const teamMembers = [
    { name: "John Doe", role: "Moderator", status: "online", avatar: "/api/placeholder/32/32" },
    { name: "Jane Smith", role: "Editor", status: "away", avatar: "/api/placeholder/32/32" },
    { name: "Mike Johnson", role: "Viewer", status: "offline", avatar: "/api/placeholder/32/32" }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      case 'offline': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Administrator': return <Crown className="w-3 h-3 text-yellow-400" />
      case 'Moderator': return <Shield className="w-3 h-3 text-blue-400" />
      case 'Editor': return <User className="w-3 h-3 text-green-400" />
      default: return <User className="w-3 h-3 text-gray-400" />
    }
  }

  return (
    <div className="space-y-4">
      {/* Current User */}
      <div className="bg-slate-700/30 rounded-lg p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(user.status)} rounded-full border-2 border-slate-800`}></div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium truncate">{user.name}</h3>
            <div className="flex items-center space-x-1">
              {getRoleIcon(user.role)}
              <span className="text-slate-400 text-xs truncate">{user.role}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <button className="w-full flex items-center space-x-2 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-600/50 rounded-lg transition-all text-sm">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center space-x-2 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-600/50 rounded-lg transition-all text-sm">
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
          </button>
          <button className="w-full flex items-center space-x-2 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all text-sm">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Team Members */}
      <div>
        <h3 className="text-slate-300 text-sm font-medium mb-3 px-2">Team Members</h3>
        <div className="space-y-2">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-700/30 transition-all">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${getStatusColor(member.status)} rounded-full border border-slate-800`}></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-medium truncate">{member.name}</div>
                <div className="flex items-center space-x-1">
                  {getRoleIcon(member.role)}
                  <span className="text-slate-400 text-xs truncate">{member.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-slate-700/30 rounded-lg p-4">
        <h3 className="text-slate-300 text-sm font-medium mb-3">Team Stats</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Active Members</span>
            <span className="text-white font-medium">2/4</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Online Now</span>
            <span className="text-green-400 font-medium">2</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Tasks Today</span>
            <span className="text-white font-medium">12</span>
          </div>
        </div>
      </div>
    </div>
  )
}