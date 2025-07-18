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
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Security Operations Dashboard</h1>
          <p className="mt-2 text-gray-400">Manage your security tickets and operations</p>
        </div>

        {/* Balance Card */}
        <div className="mb-8">
          <div className="bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-700">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-400 truncate">IOTA Balance</dt>
                    <dd className="text-lg font-medium text-white">
                      <NativeBalance />
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                  } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  {tab.name}
                  {tab.count > 0 && (
                    <span className={`${
                      activeTab === tab.id ? 'bg-blue-900 text-blue-400' : 'bg-gray-700 text-gray-300'
                    } ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-700">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-400 truncate">My Tickets</dt>
                        <dd className="text-lg font-medium text-white">{myTickets.length}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-700">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-400 truncate">Open Tickets</dt>
                        <dd className="text-lg font-medium text-white">{open.length}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-700">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-400 truncate">Assigned to Me</dt>
                        <dd className="text-lg font-medium text-white">{assigned.length}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-700">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-400 truncate">Pending Validation</dt>
                        <dd className="text-lg font-medium text-white">{submitted.length}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'client' && (
            <div className="space-y-6">
              <div className="bg-gray-800 shadow rounded-lg border border-gray-700">
                <div className="px-6 py-4 border-b border-gray-700">
                  <h3 className="text-lg font-medium text-white">Submit New Security Ticket</h3>
                  <p className="mt-1 text-sm text-gray-400">Upload evidence and create a new security incident ticket</p>
                </div>
                <div className="p-6">
                  <ClientView onComplete={refresh} />
                </div>
              </div>
              <div className="bg-gray-800 shadow rounded-lg border border-gray-700">
                <div className="px-6 py-4 border-b border-gray-700">
                  <h3 className="text-lg font-medium text-white">My Tickets</h3>
                </div>
                <div className="p-6">
                  <TicketList tickets={myTickets} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analyst' && (
            <div className="bg-gray-800 shadow rounded-lg border border-gray-700">
              <div className="px-6 py-4 border-b border-gray-700">
                <h3 className="text-lg font-medium text-white">Analyst Dashboard</h3>
                <p className="mt-1 text-sm text-gray-400">Claim and work on security tickets</p>
              </div>
              <div className="p-6">
                <AnalystSection tickets={[...open, ...assigned]} onComplete={refresh} />
              </div>
            </div>
          )}

          {activeTab === 'certifier' && (
            <div className="bg-gray-800 shadow rounded-lg border border-gray-700">
              <div className="px-6 py-4 border-b border-gray-700">
                <h3 className="text-lg font-medium text-white">Validation Dashboard</h3>
                <p className="mt-1 text-sm text-gray-400">Review and validate submitted reports</p>
              </div>
              <div className="p-6">
                <CertifierSection tickets={submitted} onComplete={refresh} />
              </div>
            </div>
          )}

          {activeTab === 'rewards' && (
            <div className="bg-gray-800 shadow rounded-lg border border-gray-700">
              <div className="px-6 py-4 border-b border-gray-700">
                <h3 className="text-lg font-medium text-white">Stake & Rewards</h3>
                <p className="mt-1 text-sm text-gray-400">Manage your stakes and claim rewards</p>
              </div>
              <div className="p-6">
                <StakeRewards />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}