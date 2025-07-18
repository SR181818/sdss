import React from 'react'
import { ConnectButton, useCurrentAccount } from '@iota/dapp-kit'
import DashboardRouter from './DashboardRouter'

export default function App() {
  const account = useCurrentAccount()
  
  return (
    <div className="min-h-screen bg-black overflow-hidden">
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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated 3D Background */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-3xl rotate-45 animate-bounce opacity-20 blur-sm"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute bottom-32 left-40 w-40 h-40 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl rotate-12 animate-spin opacity-15" style={{animationDuration: '20s'}}></div>
        <div className="absolute top-60 left-1/2 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl -rotate-12 animate-bounce opacity-25" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-20 w-36 h-36 bg-gradient-to-r from-red-400 to-pink-500 rounded-full animate-pulse opacity-20" style={{animationDelay: '1s'}}></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 gap-4 h-full">
            {Array.from({length: 144}).map((_, i) => (
              <div key={i} className="border border-white/10"></div>
            ))}
          </div>
        </div>
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-pink-900/20 via-transparent to-blue-900/20"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-3xl mb-8 shadow-2xl animate-pulse">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            
            <h1 className="text-7xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
              NEXUS
            </h1>
            <p className="text-2xl text-gray-300 mb-4 font-light">3D Security Operations Platform</p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Experience the future of cybersecurity with our revolutionary 3D visualization platform. 
              Immerse yourself in data like never before.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 hover:border-cyan-500/50 transition-all duration-500 hover:transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">3D Threat Visualization</h3>
                <p className="text-gray-400 leading-relaxed">
                  Visualize security threats in stunning 3D environments. See attacks unfold in real-time with immersive data representation.
                </p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">AI-Powered Analysis</h3>
                <p className="text-gray-400 leading-relaxed">
                  Advanced machine learning algorithms analyze security patterns and predict threats before they happen.
                </p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 hover:border-green-500/50 transition-all duration-500 hover:transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Real-time Response</h3>
                <p className="text-gray-400 leading-relaxed">
                  Instant threat response with automated countermeasures and real-time collaboration tools.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="inline-block relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl p-1">
                <div className="bg-black rounded-xl px-8 py-4">
                  <ConnectButton />
                </div>
              </div>
            </div>
            <p className="text-gray-400 mt-6 text-lg">
              Connect your wallet to enter the future of cybersecurity
            </p>
          </div>
        </div>
      </div>

      {/* Floating Action Elements */}
      <div className="absolute bottom-8 left-8 flex space-x-4">
        <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
          </svg>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="absolute top-8 right-8 flex items-center space-x-3">
        <div className="flex items-center space-x-2 bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-full px-4 py-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-sm font-medium">System Online</span>
        </div>
      </div>
    </div>
  )
}