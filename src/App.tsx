import React from 'react'
import { ConnectButton, useCurrentAccount } from '@iota/dapp-kit'
import DashboardRouter from './DashboardRouter'

export default function App() {
  const account = useCurrentAccount()
  
  return (
    <div className="min-h-screen bg-gray-900">
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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-6xl h-[700px] overflow-hidden">
          {/* Window Controls */}
          <div className="flex items-center justify-between bg-gray-800 px-4 py-3 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="ml-4 text-gray-300 text-sm">Explore</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gray-700 rounded-lg px-3 py-1 text-gray-300 text-sm">Search</div>
              <div className="flex space-x-1">
                <div className="w-4 h-4 bg-gray-600 rounded"></div>
                <div className="w-4 h-4 bg-gray-600 rounded"></div>
                <div className="w-4 h-4 bg-gray-600 rounded"></div>
              </div>
            </div>
          </div>

          <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 p-4 space-y-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-white font-semibold">dSOC</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-gray-700 text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <span>Home</span>
                </div>
                
                <div className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span>Tickets</span>
                </div>
                
                <div className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Gaming</span>
                </div>
                
                <div className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Education</span>
                </div>
                
                <div className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Science & Tech</span>
                </div>
                
                <div className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Entertainment</span>
                </div>
                
                <div className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Student Hubs</span>
                </div>
              </div>

              {/* Bottom Audio Player */}
              <div className="absolute bottom-4 left-4 right-64">
                <div className="bg-gray-700 rounded-lg p-3 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
                  <div className="flex-1">
                    <div className="text-white text-sm">LOFI BEATS</div>
                    <div className="w-full bg-gray-600 rounded-full h-1 mt-1">
                      <div className="bg-purple-500 h-1 rounded-full w-1/3"></div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-gray-400 hover:text-white">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button className="text-gray-400 hover:text-white">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.824L4.5 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.5l3.883-3.824zM15 8a2 2 0 012 2v0a2 2 0 01-2 2" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {/* Hero Card */}
              <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-2xl p-6 mb-6 relative overflow-hidden">
                <div className="relative z-10">
                  <h1 className="text-white text-2xl font-bold mb-2">Find Your Community</h1>
                  <p className="text-white/80 mb-4">on Discord</p>
                  <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
                    Join Now
                  </button>
                </div>
                <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute right-8 bottom-8 w-16 h-16 bg-white/10 rounded-full"></div>
              </div>

              {/* Featured Community */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-white text-lg font-semibold">Featured Community</h2>
                  <button className="text-gray-400 text-sm hover:text-white">See All</button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-4 relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="w-8 h-8 bg-white/20 rounded-lg mb-3"></div>
                      <h3 className="text-white font-semibold mb-1">Virtual Reality</h3>
                      <p className="text-white/70 text-sm">Join the future of immersive experiences</p>
                    </div>
                    <div className="absolute right-0 bottom-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mb-10"></div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl p-4 relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="w-8 h-8 bg-white/20 rounded-lg mb-3"></div>
                      <h3 className="text-white font-semibold mb-1">Game Play</h3>
                      <p className="text-white/70 text-sm">Connect with fellow gamers worldwide</p>
                    </div>
                    <div className="absolute right-0 bottom-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mb-10"></div>
                  </div>
                </div>
              </div>

              {/* Popular Right Now */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-white text-lg font-semibold">Popular Right Now</h2>
                  <button className="text-gray-400 text-sm hover:text-white">See All</button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-3"></div>
                    <h3 className="text-white font-semibold mb-1">3D Art</h3>
                    <p className="text-gray-400 text-sm">Create stunning 3D masterpieces</p>
                  </div>
                  
                  <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mb-3"></div>
                    <h3 className="text-white font-semibold mb-1">NFT</h3>
                    <p className="text-gray-400 text-sm">Explore the world of digital collectibles</p>
                  </div>
                </div>
              </div>

              {/* Recent Add */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-white text-lg font-semibold">Recent Add</h2>
                  <button className="text-gray-400 text-sm hover:text-white">See All</button>
                </div>
                
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl h-24 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10 p-4 flex items-center">
                    <div className="text-white">
                      <h3 className="font-semibold">Security Operations</h3>
                      <p className="text-white/70 text-sm">Professional security analysis platform</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-80 bg-gray-800 p-4">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                <div>
                  <div className="text-white font-semibold">Sophia Jackson</div>
                  <div className="text-gray-400 text-sm">@sophia.jackson</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3">FRIENDS</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                    <div>
                      <div className="text-white text-sm">Anna Graham</div>
                      <div className="text-gray-400 text-xs">Online</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full"></div>
                    <div>
                      <div className="text-white text-sm">Marvin McKinney</div>
                      <div className="text-gray-400 text-xs">Away</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                    <div>
                      <div className="text-white text-sm">Darlene Robertson</div>
                      <div className="text-gray-400 text-xs">Busy</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                    <div>
                      <div className="text-white text-sm">Jane Cooper</div>
                      <div className="text-gray-400 text-xs">Online</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-gray-700 rounded-lg p-3 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white text-sm">SketchFab</span>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-3 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <span className="text-white text-sm">Discord</span>
                </div>
              </div>

              {/* Connect Wallet Button */}
              <div className="mt-8">
                <ConnectButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}