"use client"

import Link from "next/link"
import WelcomeAnimation from "../component/WelcomeAnimation"

export default function page() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200 overflow-hidden">
      <WelcomeAnimation />

      <main className="pt-28 pb-24 px-4 md:px-8 max-w-7xl mx-auto space-y-24">

        {/* Hero Section */}
        <section className="relative flex flex-col lg:flex-row items-center gap-12 mt-4 lg:mt-12">
          {/* Text Content */}
          <div className="flex-1 space-y-8 z-10 text-center lg:text-left">
            <div className="inline-block px-5 py-2 rounded-full bg-blue-100/80 text-blue-700 font-bold text-sm tracking-widest uppercase shadow-sm border border-blue-200/50 backdrop-blur-sm">
              Discover The World
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight">
              Embark on your next <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Great Adventure
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Experience breathtaking destinations, manage your itineraries effortlessly, and join a vibrant community of passionate travelers. Your journey starts right here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link href="#development" className="px-8 py-4 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold transition-all shadow-xl shadow-gray-900/20 hover:shadow-gray-900/40 hover:-translate-y-1 text-lg">
                Start Exploring
              </Link>
            </div>
          </div>

          {/* Image Content */}
          <div className="flex-1 w-full relative group">
            <div className="relative h-[450px] lg:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Beautiful mountain landscape with a traveler"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            {/* Decorative abstract elements behind image */}
            <div className="absolute -z-10 -bottom-8 -right-8 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
            <div className="absolute -z-10 -top-8 -left-8 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
        </section>

        {/* Current Development Section */}
        <section id="development" className="py-16 relative">
          {/* Decorative background for the section */}
          <div className="absolute inset-0 bg-white rounded-[3rem] shadow-sm border border-slate-100 -z-10 transform scale-x-[1.02]"></div>

          <div className="text-center mb-16 space-y-4 px-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Current Development</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
              Choose your dedicated dashboard below. Plan personal travels or oversee branch operations.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 md:px-8">
            {/* TRIP Box */}
            <Link href="/trips" className="group relative overflow-hidden bg-white rounded-3xl p-8 lg:p-10 shadow-lg border border-slate-200 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 flex flex-col items-center text-center">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-blue-100 to-transparent rounded-full z-0 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>

              <div className="relative z-10 w-24 h-24 mb-8 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white shadow-xl shadow-cyan-500/30 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="relative z-10 text-2xl lg:text-3xl font-extrabold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">TRIP</h3>
              <p className="relative z-10 text-slate-500 text-lg leading-relaxed">
                Plan your next great adventure, view comprehensive itineraries, and manage all your travel details seamlessly in one unified space.
              </p>

              <div className="relative z-10 mt-10 flex items-center text-blue-600 font-bold text-lg group-hover:gap-3 transition-all">
                Enter Portal
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </Link>

            {/* Manager Box */}
            <Link href="/manager" className="group relative overflow-hidden bg-white rounded-3xl p-8 lg:p-10 shadow-lg border border-slate-200 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2 flex flex-col items-center text-center">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-purple-100 to-transparent rounded-full z-0 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>

              <div className="relative z-10 w-24 h-24 mb-8 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300 group-hover:-rotate-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="relative z-10 text-2xl lg:text-3xl font-extrabold text-slate-900 mb-4 group-hover:text-purple-600 transition-colors">Manager</h3>
              <p className="relative z-10 text-slate-500 text-lg leading-relaxed">
                Access your secure administrative dashboard to oversee global bookings, manage branches, and view high-level analytics.
              </p>

              <div className="relative z-10 mt-10 flex items-center text-purple-600 font-bold text-lg group-hover:gap-3 transition-all">
                Enter Portal
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </Link>

            {/* Inventory Box */}
            <Link href="/mess" className="group relative overflow-hidden bg-white rounded-3xl p-8 lg:p-10 shadow-lg border border-slate-200 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2 flex flex-col items-center text-center">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-emerald-100 to-transparent rounded-full z-0 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>

              <div className="relative z-10 w-24 h-24 mb-8 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-xl shadow-teal-500/30 group-hover:scale-110 transition-transform duration-300 group-hover:-rotate-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="relative z-10 text-2xl lg:text-3xl font-extrabold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">Inventory</h3>
              <p className="relative z-10 text-slate-500 text-lg leading-relaxed">
                Track mess stock levels, manage supplies, and ensure everything runs smoothly in your inventory system.
              </p>

              <div className="relative z-10 mt-10 flex items-center text-emerald-600 font-bold text-lg group-hover:gap-3 transition-all">
                Enter Portal
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </Link>

            {/* Social Media Automation Box */}
            <Link href="/social-media-automation" className="group relative overflow-hidden bg-white rounded-3xl p-8 lg:p-10 shadow-lg border border-slate-200 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/10 hover:-translate-y-2 flex flex-col items-center text-center">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-pink-100 to-transparent rounded-full z-0 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>

              <div className="relative z-10 w-24 h-24 mb-8 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white shadow-xl shadow-pink-500/30 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h3 className="relative z-10 text-2xl lg:text-3xl font-extrabold text-slate-900 mb-4 group-hover:text-pink-600 transition-colors leading-tight">Social Media Automation</h3>
              <p className="relative z-10 text-slate-500 text-lg leading-relaxed">
                Automate your social media presence, schedule engaging posts, and seamlessly interact with your community.
              </p>

              <div className="relative z-10 mt-10 flex items-center text-pink-600 font-bold text-lg group-hover:gap-3 transition-all">
                Enter Portal
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </Link>
          </div>
        </section>

      </main>
    </div>
  )
}