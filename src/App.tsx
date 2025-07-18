import React from 'react'
import { ConnectButton, useCurrentAccount } from '@iota/dapp-kit'
import DashboardRouter from './DashboardRouter'

export default function App() {
  const account = useCurrentAccount()
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">🛡️</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">dSOC</span>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">HOME</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">ABOUT</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">SERVICES</a>
            </nav>
            
            <div className="flex items-center space-x-4">
              <ConnectButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
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
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-50 via-white to-purple-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-3xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-20 sm:px-6 md:mt-24 lg:mt-32 lg:px-8 xl:mt-40">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-5xl tracking-tight font-black text-gray-900 sm:text-6xl md:text-7xl lg:text-8xl leading-none">
                  <span className="block">SECURE HARD.</span>
                  <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    LIVE BETTER
                  </span>
                </h1>
                <h2 className="text-3xl font-bold text-gray-900 mt-6 lg:text-4xl">
                  FOR THE COMMITTED
                </h2>
                <p className="mt-6 text-lg text-gray-600 sm:mt-8 sm:text-xl sm:max-w-xl sm:mx-auto md:mt-8 md:text-2xl lg:mx-0 leading-relaxed">
                  Secure your digital assets with top-tier security operations and expert analysis.
                  Whether you're protecting infrastructure or investigating incidents, we help you
                  push past limits.
                </p>
                <div className="mt-10 sm:mt-12 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-lg shadow-lg">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 rounded-lg p-1">
                      <div className="bg-white rounded-md px-8 py-3">
                        <ConnectButton />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        
        {/* Hero Image */}
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
          <div className="relative h-64 w-full sm:h-72 md:h-96 lg:w-full lg:h-full">
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white lg:to-transparent opacity-60"></div>
          <img
              className="h-full w-full object-cover object-center"
            src="https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Security Operations"
          />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-4 text-4xl leading-8 font-black tracking-tight text-gray-900 sm:text-5xl">
              GUIDED BY EXPERTS
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
              Professional security operations with cutting-edge blockchain technology
            </p>
          </div>

          <div className="mt-16">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-16">
              <div className="relative group">
                <div className="absolute flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg group-hover:shadow-xl transition-shadow">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="ml-20 text-xl leading-6 font-bold text-gray-900">Secure Ticket System</p>
                <p className="mt-3 ml-20 text-base text-gray-600 leading-relaxed">
                  Submit security incidents and evidence through our decentralized platform.
                </p>
              </div>

              <div className="relative group">
                <div className="absolute flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg group-hover:shadow-xl transition-shadow">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="ml-20 text-xl leading-6 font-bold text-gray-900">Expert Analysis</p>
                <p className="mt-3 ml-20 text-base text-gray-600 leading-relaxed">
                  Professional security analysts review and investigate your cases.
                </p>
              </div>

              <div className="relative group">
                <div className="absolute flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg group-hover:shadow-xl transition-shadow">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <p className="ml-20 text-xl leading-6 font-bold text-gray-900">Blockchain Security</p>
                <p className="mt-3 ml-20 text-base text-gray-600 leading-relaxed">
                  All operations secured by IOTA's distributed ledger technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-black text-white sm:text-5xl">
              READY TO SECURE?
            </h2>
            <p className="mt-4 text-xl text-purple-100">
              Join the decentralized security operations center today
            </p>
            <div className="mt-8">
              <div className="inline-flex rounded-lg shadow-lg">
                <div className="bg-white hover:bg-gray-50 transition-colors rounded-lg p-1">
                  <div className="px-8 py-3">
                    <ConnectButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}