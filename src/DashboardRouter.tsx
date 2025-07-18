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
    { id: 'overview', name: 'Overview', count: myTickets.length },
    { id: 'client', name: 'Submit Tickets', count: myTickets.length },
    { id: 'analyst', name: 'Analyst Work', count: open.length + assigned.length },
    { id: 'certifier', name: 'Validation', count: submitted.length },
    { id: 'rewards', name: 'Stake & Rewards', count: 0 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8 relative z-10">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-white to-white/80 bg-clip-text">
                3D Security Operations
              </h1>
              <p className="mt-2 text-white/70 text-lg">Advanced threat detection and response platform</p>
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <div className="mb-8 relative z-10">
          <div className="bg-black/20 backdrop-blur-xl overflow-hidden shadow-2xl rounded-2xl border border-white/20">
            <div className="p-8">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-white/60 truncate uppercase tracking-wider">IOTA Balance</dt>
                    <dd className="text-2xl font-bold text-white">
                      <NativeBalance />
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8 relative z-10">
          <div className="border-b border-white/20">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-purple-400 text-purple-300 bg-purple-500/10'
                      : 'border-transparent text-white/60 hover:text-white/90 hover:border-white/30'
                  } whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm flex items-center rounded-t-xl transition-all duration-300 backdrop-blur-sm`}
                >
                  {tab.name}
                  {tab.count > 0 && (
                    <span className={`${
                      activeTab === tab.id ? 'bg-purple-500/30 text-purple-200 border-purple-400/50' : 'bg-white/10 text-white/70 border-white/20'
                    } ml-2 py-1 px-2.5 rounded-full text-xs font-medium border backdrop-blur-sm`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8 relative z-10">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-black/20 backdrop-blur-xl overflow-hidden shadow-xl rounded-2xl border border-white/20 hover:bg-black/30 transition-all duration-300 group">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-white/60 truncate uppercase tracking-wider">My Tickets</dt>
                        <dd className="text-2xl font-bold text-white">{myTickets.length}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black/20 backdrop-blur-xl overflow-hidden shadow-xl rounded-2xl border border-white/20 hover:bg-black/30 transition-all duration-300 group">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-white/60 truncate uppercase tracking-wider">Open Tickets</dt>
                        <dd className="text-2xl font-bold text-white">{open.length}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black/20 backdrop-blur-xl overflow-hidden shadow-xl rounded-2xl border border-white/20 hover:bg-black/30 transition-all duration-300 group">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-white/60 truncate uppercase tracking-wider">Assigned to Me</dt>
                        <dd className="text-2xl font-bold text-white">{assigned.length}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black/20 backdrop-blur-xl overflow-hidden shadow-xl rounded-2xl border border-white/20 hover:bg-black/30 transition-all duration-300 group">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-white/60 truncate uppercase tracking-wider">Pending Validation</dt>
                        <dd className="text-2xl font-bold text-white">{submitted.length}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'client' && (
            <div className="space-y-6">
              <div className="bg-black/20 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/20">
                <div className="px-8 py-6 border-b border-white/20">
                  <h3 className="text-xl font-bold text-white">Submit New Security Ticket</h3>
                  <p className="mt-2 text-sm text-white/70">Upload evidence and create a new security incident ticket</p>
                </div>
                <div className="p-8">
                  <ClientView onComplete={refresh} />
                </div>
              </div>
              <div className="bg-black/20 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/20">
                <div className="px-8 py-6 border-b border-white/20">
                  <h3 className="text-xl font-bold text-white">My Tickets</h3>
                </div>
                <div className="p-8">
                  <TicketList tickets={myTickets} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analyst' && (
            <div className="bg-black/20 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/20">
              <div className="px-8 py-6 border-b border-white/20">
                <h3 className="text-xl font-bold text-white">Analyst Dashboard</h3>
                <p className="mt-2 text-sm text-white/70">Claim and work on security tickets</p>
              </div>
              <div className="p-8">
                <AnalystSection tickets={[...open, ...assigned]} onComplete={refresh} />
              </div>
            </div>
          )}

          {activeTab === 'certifier' && (
            <div className="bg-black/20 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/20">
              <div className="px-8 py-6 border-b border-white/20">
                <h3 className="text-xl font-bold text-white">Validation Dashboard</h3>
                <p className="mt-2 text-sm text-white/70">Review and validate submitted reports</p>
              </div>
              <div className="p-8">
                <CertifierSection tickets={submitted} onComplete={refresh} />
              </div>
            </div>
          )}

          {activeTab === 'rewards' && (
            <div className="bg-black/20 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/20">
              <div className="px-8 py-6 border-b border-white/20">
                <h3 className="text-xl font-bold text-white">Stake & Rewards</h3>
                <p className="mt-2 text-sm text-white/70">Manage your stakes and claim rewards</p>
              </div>
              <div className="p-8">
                <StakeRewards />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}