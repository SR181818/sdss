import React, { useState } from 'react'
import { useCurrentAccount } from '@iota/dapp-kit'
import { useSocService } from './lib/useSocService'
import ClientView from './components/TicketForm'
import TicketList from './components/TicketList'
import AnalystSection from './components/AnalystSection'
import CertifierSection from './components/CertifierSection'
import NativeBalance from './components/NativeBalance'
import StakeRewards from './components/StakeRewards'

export default function DashboardRouter() {
  const account = useCurrentAccount()!.address
  const { tickets, refresh } = useSocService()
  const [activeTab, setActiveTab] = useState('overview')

  const myTickets = tickets.filter(t => t.client === account)
  const open = tickets.filter(t => t.status === 0)
  const assigned = tickets.filter(t => t.analyst === account)
  const submitted = tickets.filter(t => t.status === 2 && t.client === account)

  const tabs = [
    { id: 'overview', name: 'Command Center', icon: '🎯', count: myTickets.length },
    { id: 'client', name: 'Create Mission', icon: '🚀', count: myTickets.length },
    { id: 'analyst', name: 'Analysis Lab', icon: '🔬', count: open.length + assigned.length },
    { id: 'certifier', name: 'Validation Hub', icon: '✨', count: submitted.length },
    { id: 'rewards', name: 'Rewards Vault', icon: '💎', count: 0 }
  ]

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        {/* Animated mesh gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-pink-900/20 via-transparent to-blue-900/20"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-pink-400 rounded-full animate-bounce opacity-30" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-50" style={{animationDelay: '2s'}}></div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Main Interface */}
      <div className="relative z-10 min-h-screen">
        {/* Top Navigation */}
        <nav className="border-b border-gray-800/50 backdrop-blur-xl bg-gray-900/20">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-black text-lg">N</span>
                </div>
                <div>
                  <h1 className="text-2xl font-black text-white">NEXUS</h1>
                  <p className="text-xs text-gray-400 -mt-1">Security Operations</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl px-6 py-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Balance</p>
                      <div className="text-white font-bold">
                        <NativeBalance />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm font-medium">Online</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex space-x-2 mb-8 bg-gray-900/30 backdrop-blur-xl border border-gray-700/30 rounded-3xl p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                } flex-1 flex items-center justify-center space-x-3 py-4 px-6 rounded-2xl font-bold transition-all duration-300 hover:transform hover:scale-105`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span>{tab.name}</span>
                {tab.count > 0 && (
                  <span className="bg-white/20 text-xs px-2 py-1 rounded-full font-medium">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <div className="relative bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 hover:border-cyan-500/50 transition-all duration-500">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-3xl font-black text-white">{myTickets.length}</span>
                      </div>
                      <h3 className="text-white font-bold mb-1">Active Missions</h3>
                      <p className="text-gray-400 text-sm">Your security operations</p>
                    </div>
                  </div>

                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <div className="relative bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 hover:border-green-500/50 transition-all duration-500">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-3xl font-black text-white">{open.length}</span>
                      </div>
                      <h3 className="text-white font-bold mb-1">Open Threats</h3>
                      <p className="text-gray-400 text-sm">Awaiting analysis</p>
                    </div>
                  </div>

                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <div className="relative bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 hover:border-purple-500/50 transition-all duration-500">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-3xl font-black text-white">{assigned.length}</span>
                      </div>
                      <h3 className="text-white font-bold mb-1">In Progress</h3>
                      <p className="text-gray-400 text-sm">Under investigation</p>
                    </div>
                  </div>

                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <div className="relative bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 hover:border-yellow-500/50 transition-all duration-500">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-3xl font-black text-white">{submitted.length}</span>
                      </div>
                      <h3 className="text-white font-bold mb-1">Validation Queue</h3>
                      <p className="text-gray-400 text-sm">Awaiting approval</p>
                    </div>
                  </div>
                </div>

                {/* Activity Feed */}
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
                  <h2 className="text-2xl font-black text-white mb-6 flex items-center">
                    <span className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                    Mission Control
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-gray-800/30 rounded-2xl border border-gray-700/30">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">System initialized successfully</p>
                        <p className="text-gray-400 text-sm">All security modules are online and operational</p>
                      </div>
                      <span className="text-xs text-gray-500">2 min ago</span>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-gray-800/30 rounded-2xl border border-gray-700/30">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">Threat analysis completed</p>
                        <p className="text-gray-400 text-sm">Advanced AI scan detected no immediate threats</p>
                      </div>
                      <span className="text-xs text-gray-500">5 min ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'client' && (
              <div className="space-y-8">
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 p-8 border-b border-gray-700/50">
                    <h2 className="text-3xl font-black text-white mb-2 flex items-center">
                      <span className="text-4xl mr-3">🚀</span>
                      Create New Mission
                    </h2>
                    <p className="text-gray-300">Deploy a new security operation and upload threat intelligence</p>
                  </div>
                  <div className="p-8">
                    <ClientView onComplete={refresh} />
                  </div>
                </div>
                
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl overflow-hidden">
                  <div className="p-8 border-b border-gray-700/50">
                    <h2 className="text-2xl font-black text-white flex items-center">
                      <span className="text-2xl mr-3">📊</span>
                      Mission History
                    </h2>
                  </div>
                  <div className="p-8">
                    <TicketList tickets={myTickets} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analyst' && (
              <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 p-8 border-b border-gray-700/50">
                  <h2 className="text-3xl font-black text-white mb-2 flex items-center">
                    <span className="text-4xl mr-3">🔬</span>
                    Analysis Laboratory
                  </h2>
                  <p className="text-gray-300">Advanced threat analysis and investigation workspace</p>
                </div>
                <div className="p-8">
                  <AnalystSection tickets={[...open, ...assigned]} onComplete={refresh} />
                </div>
              </div>
            )}

            {activeTab === 'certifier' && (
              <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl overflow-hidden">
                <div className="bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-teal-500/20 p-8 border-b border-gray-700/50">
                  <h2 className="text-3xl font-black text-white mb-2 flex items-center">
                    <span className="text-4xl mr-3">✨</span>
                    Validation Hub
                  </h2>
                  <p className="text-gray-300">Review and certify security analysis reports</p>
                </div>
                <div className="p-8">
                  <CertifierSection tickets={submitted} onComplete={refresh} />
                </div>
              </div>
            )}

            {activeTab === 'rewards' && (
              <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl overflow-hidden">
                <div className="bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 p-8 border-b border-gray-700/50">
                  <h2 className="text-3xl font-black text-white mb-2 flex items-center">
                    <span className="text-4xl mr-3">💎</span>
                    Rewards Vault
                  </h2>
                  <p className="text-gray-300">Manage stakes and claim your security operation rewards</p>
                </div>
                <div className="p-8">
                  <StakeRewards />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}