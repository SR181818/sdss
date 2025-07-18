import React from 'react'
import { ConnectButton, useCurrentAccount } from '@iota/dapp-kit'
import DashboardRouter from './DashboardRouter'

export default function App() {
  const account = useCurrentAccount()
  
  return (
    <div className="min-h-screen bg-white">
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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🛡️</span>
              </div>
              <span className="text-xl font-bold text-gray-900">dSOC</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Home</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">About</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Services</a>
              <ConnectButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight">
                  SECURE HARD.
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    LIVE BETTER
                  </span>
                </h1>
                <p className="text-xl text-gray-600 font-medium">
                  FOR THE COMMITTED
                </p>
              </div>
              
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                Secure your digital assets with top-tier security operations and expert analysis. 
                Whether you're protecting infrastructure or investigating incidents, we help you 
                push past limits.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-0.5 rounded-lg">
                  <div className="bg-white rounded-md px-1 py-1">
                    <ConnectButton />
                  </div>
                </div>
                <button className="px-8 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Security Operations"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20"></div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Secure</p>
                    <p className="text-sm text-gray-600">100% Protected</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Expert</p>
                    <p className="text-sm text-gray-600">Analysis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              GUIDED BY <span className="text-blue-600">EXPERTS</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional security operations with cutting-edge blockchain technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Secure Ticket System",
                description: "Submit security incidents and evidence through our decentralized platform with full transparency."
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Expert Analysis",
                description: "Professional security analysts review and investigate your cases with detailed reporting."
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                title: "Blockchain Security",
                description: "All operations secured by IOTA's distributed ledger technology for maximum trust."
              }
            ].map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 h-full border border-gray-100 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "99.9%", label: "Uptime" },
              { number: "24/7", label: "Support" },
              { number: "1000+", label: "Cases Solved" },
              { number: "50+", label: "Expert Analysts" }
            ].map((stat, index) => (
              <div key={index} className="text-white">
                <div className="text-4xl lg:text-5xl font-black mb-2">{stat.number}</div>
                <div className="text-lg font-medium opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-6">
            READY TO <span className="text-blue-400">SECURE?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the decentralized security operations center today and protect what matters most.
          </p>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-0.5 rounded-lg inline-block">
            <div className="bg-gray-900 rounded-md px-1 py-1">
              <ConnectButton />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🛡️</span>
              </div>
              <span className="text-xl font-bold text-gray-900">dSOC</span>
            </div>
            <div className="flex space-x-6 text-gray-600">
              <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-100 text-center text-gray-600">
            <p>&copy; 2024 dSOC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}