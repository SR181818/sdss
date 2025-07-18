import React from 'react'
import { ConnectButton, useCurrentAccount } from '@iota/dapp-kit'
import DashboardRouter from './DashboardRouter'

export default function App() {
  const account = useCurrentAccount()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {account ? (
        <DashboardRouter />
      ) : (
        <LandingPage />
      )}
    </div>
  )
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-7xl h-[800px] overflow-hidden border border-white/10 relative">
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
          
          {/* Window Controls */}
          <div className="flex items-center justify-between bg-black/30 backdrop-blur-sm px-6 py-4 border-b border-white/10 relative z-10">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg"></div>
              <span className="ml-6 text-white/90 text-sm font-medium">3D Art Studio</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 text-white/80 text-sm border border-white/20">
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search 3D Assets
              </div>
              <div className="flex space-x-1">
                <div className="w-4 h-4 bg-white/20 rounded backdrop-blur-sm"></div>
                <div className="w-4 h-4 bg-white/20 rounded backdrop-blur-sm"></div>
                <div className="w-4 h-4 bg-white/20 rounded backdrop-blur-sm"></div>
              </div>
            </div>
          </div>

          <div className="flex h-full relative z-10">
            {/* Sidebar */}
            <div className="w-72 bg-black/20 backdrop-blur-sm p-6 space-y-3 border-r border-white/10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div>
                  <span className="text-white font-bold text-lg">3D Studio</span>
                  <p className="text-white/60 text-xs">Security Operations</p>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-white/10 backdrop-blur-sm">
                  <svg className="w-5 h-5 text-purple-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <span className="font-medium">Gallery</span>
                </div>
                
                <div className="flex items-center space-x-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white cursor-pointer transition-all duration-300 hover:backdrop-blur-sm">
                  <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-lg"></div>
                  <span>Security Tickets</span>
                </div>
                
                <div className="flex items-center space-x-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white cursor-pointer transition-all duration-300 hover:backdrop-blur-sm">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg"></div>
                  <span>3D Models</span>
                </div>
                
                <div className="flex items-center space-x-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white cursor-pointer transition-all duration-300 hover:backdrop-blur-sm">
                  <div className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full shadow-lg"></div>
                  <span>Animations</span>
                </div>
                
                <div className="flex items-center space-x-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white cursor-pointer transition-all duration-300 hover:backdrop-blur-sm">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg"></div>
                  <span>Textures</span>
                </div>
                
                <div className="flex items-center space-x-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white cursor-pointer transition-all duration-300 hover:backdrop-blur-sm">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full shadow-lg"></div>
                  <span>Materials</span>
                </div>
                
                <div className="flex items-center space-x-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white cursor-pointer transition-all duration-300 hover:backdrop-blur-sm">
                  <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg"></div>
                  <span>Environments</span>
                </div>
              </div>

              {/* Bottom Audio Player */}
              <div className="absolute bottom-6 left-6 right-80">
                <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-4 flex items-center space-x-3 border border-white/10">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-white text-sm font-medium">3D AMBIENT</div>
                    <div className="w-full bg-white/20 rounded-full h-1.5 mt-1">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full w-1/3 shadow-sm"></div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-white/60 hover:text-white transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button className="text-white/60 hover:text-white transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.824L4.5 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.5l3.883-3.824zM15 8a2 2 0 012 2v0a2 2 0 01-2 2" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-y-auto">
              {/* Hero Card */}
              <div className="bg-gradient-to-br from-purple-600/80 via-pink-600/80 to-blue-600/80 backdrop-blur-xl rounded-3xl p-8 mb-8 relative overflow-hidden border border-white/20 shadow-2xl">
                {/* Floating 3D elements */}
                <div className="absolute top-4 right-8 w-16 h-16 bg-white/10 rounded-2xl rotate-12 backdrop-blur-sm border border-white/20"></div>
                <div className="absolute bottom-6 right-16 w-12 h-12 bg-white/10 rounded-xl -rotate-12 backdrop-blur-sm border border-white/20"></div>
                <div className="absolute top-1/2 right-4 w-8 h-8 bg-white/10 rounded-lg rotate-45 backdrop-blur-sm border border-white/20"></div>
                
                <div className="relative z-10">
                  <h1 className="text-white text-4xl font-bold mb-3 bg-gradient-to-r from-white to-white/80 bg-clip-text">
                    Create Stunning 3D Art
                  </h1>
                  <p className="text-white/90 mb-6 text-lg">Professional security operations platform</p>
                  <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30 font-medium shadow-lg hover:shadow-xl hover:scale-105">
                    Start Creating
                  </button>
                </div>
              </div>

              {/* Featured Community */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-white text-xl font-bold">Featured 3D Collections</h2>
                  <button className="text-white/60 text-sm hover:text-white transition-colors font-medium">View All</button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-purple-600/60 to-pink-600/60 backdrop-blur-xl rounded-2xl p-6 relative overflow-hidden border border-white/20 hover:scale-105 transition-all duration-300 cursor-pointer group shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>
                    <div className="relative z-10">
                      <div className="w-10 h-10 bg-white/20 rounded-xl mb-4 flex items-center justify-center backdrop-blur-sm border border-white/30">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <h3 className="text-white font-bold mb-2 text-lg group-hover:text-purple-200 transition-colors">Security Analytics</h3>
                      <p className="text-white/80 text-sm">Advanced threat detection and analysis</p>
                    </div>
                    <div className="absolute right-0 bottom-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mb-12 group-hover:bg-white/10 transition-colors"></div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-600/60 to-cyan-600/60 backdrop-blur-xl rounded-2xl p-6 relative overflow-hidden border border-white/20 hover:scale-105 transition-all duration-300 cursor-pointer group shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>
                    <div className="relative z-10">
                      <div className="w-10 h-10 bg-white/20 rounded-xl mb-4 flex items-center justify-center backdrop-blur-sm border border-white/30">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h3 className="text-white font-bold mb-2 text-lg group-hover:text-blue-200 transition-colors">Incident Response</h3>
                      <p className="text-white/80 text-sm">Real-time security incident management</p>
                    </div>
                    <div className="absolute right-0 bottom-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mb-12 group-hover:bg-white/10 transition-colors"></div>
                  </div>
                </div>
              </div>

              {/* Popular Right Now */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-white text-xl font-bold">Active Operations</h2>
                  <button className="text-white/60 text-sm hover:text-white transition-colors font-medium">View All</button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-black/30 transition-all duration-300 cursor-pointer group shadow-lg">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl mb-4 flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-white font-bold mb-2 group-hover:text-blue-300 transition-colors">Threat Analysis</h3>
                    <p className="text-white/70 text-sm">Advanced security threat modeling</p>
                  </div>
                  
                  <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-black/30 transition-all duration-300 cursor-pointer group shadow-lg">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-4 flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="text-white font-bold mb-2 group-hover:text-purple-300 transition-colors">Secure Validation</h3>
                    <p className="text-white/70 text-sm">Blockchain-based security verification</p>
                  </div>
                </div>
              </div>

              {/* Recent Add */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-white text-xl font-bold">Latest Updates</h2>
                  <button className="text-white/60 text-sm hover:text-white transition-colors font-medium">View All</button>
                </div>
                
                <div className="bg-gradient-to-r from-purple-600/60 to-pink-600/60 backdrop-blur-xl rounded-2xl h-28 relative overflow-hidden border border-white/20 shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
                  <div className="relative z-10 p-6 flex items-center">
                    <div className="text-white">
                      <h3 className="font-bold text-lg mb-1">Enhanced Security Operations</h3>
                      <p className="text-white/80 text-sm">Next-generation threat detection and response platform</p>
                    </div>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute top-2 right-4 w-6 h-6 bg-white/10 rounded-lg rotate-12 backdrop-blur-sm"></div>
                  <div className="absolute bottom-2 right-8 w-4 h-4 bg-white/10 rounded rotate-45 backdrop-blur-sm"></div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-80 bg-black/20 backdrop-blur-sm p-6 border-l border-white/10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">SJ</span>
                </div>
                <div>
                  <div className="text-white font-bold">Sophia Jackson</div>
                  <div className="text-white/60 text-sm">Security Analyst</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Team Members</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-md flex items-center justify-center">
                      <span className="text-white text-xs font-bold">AG</span>
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">Anna Graham</div>
                      <div className="text-green-400 text-xs flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                        Online
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl shadow-md flex items-center justify-center">
                      <span className="text-white text-xs font-bold">MM</span>
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">Marvin McKinney</div>
                      <div className="text-yellow-400 text-xs flex items-center">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-1"></div>
                        Away
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-md flex items-center justify-center">
                      <span className="text-white text-xs font-bold">DR</span>
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">Darlene Robertson</div>
                      <div className="text-red-400 text-xs flex items-center">
                        <div className="w-2 h-2 bg-red-400 rounded-full mr-1"></div>
                        Busy
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-md flex items-center justify-center">
                      <span className="text-white text-xs font-bold">JC</span>
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">Jane Cooper</div>
                      <div className="text-green-400 text-xs flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                        Online
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 flex items-center space-x-3 border border-white/10 hover:bg-black/30 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white text-sm font-medium">Security Hub</span>
                </div>
                
                <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 flex items-center space-x-3 border border-white/10 hover:bg-black/30 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <span className="text-white text-sm font-medium">Operations Center</span>
                </div>
              </div>

              {/* Connect Wallet Button */}
              <div className="mt-8 p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="text-center mb-4">
                  <h4 className="text-white font-bold mb-1">Connect Your Wallet</h4>
                  <p className="text-white/70 text-xs">Access the security operations platform</p>
                </div>
                <div className="flex justify-center">
                  <ConnectButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}