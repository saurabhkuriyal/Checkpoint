'use client';

import React from 'react';
import Link from 'next/link';
import { StaffFeedbackTable } from '@/component/mess/StaffFeedbackTable';

export default function StaffFeedbackDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient Background Glow Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-emerald-50/80 to-transparent z-0 pointer-events-none"></div>
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl z-0 pointer-events-none mix-blend-multiply"></div>
      <div className="absolute top-[20%] left-[-10%] w-72 h-72 bg-teal-200/30 rounded-full blur-3xl z-0 pointer-events-none mix-blend-multiply"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Navigation / Back Button */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/mess"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-all bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-full shadow-sm border border-gray-200/60 hover:shadow-md hover:-translate-y-0.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Mess Dashboard
          </Link>

          <Link
            href="/mess/staffFeedbackForm"
            className="inline-flex items-center gap-2 text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transition-all px-5 py-2.5 rounded-full shadow-md shadow-emerald-600/20 hover:shadow-lg active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Submit Staff Feedback
          </Link>
        </div>

        {/* Premium Header Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 shadow-xl shadow-emerald-100/40 border border-white/60 mb-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
          {/* Subtle Background Pattern */}
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-400 via-transparent to-transparent group-hover:opacity-30 transition-opacity duration-700"></div>

          <div className="flex items-start sm:items-center gap-6 z-10 w-full flex-col sm:flex-row">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 shrink-0 transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-emerald-900 mb-3 tracking-tight">
                Staff Feedback Dashboard
              </h1>
              <p className="text-base text-gray-500 max-w-2xl font-medium leading-relaxed">
                Review and monitor staff performance ratings submitted by students. Track behaviour, hygiene, speed, and cleanliness feedback to maintain top-tier service.
              </p>
            </div>
          </div>
        </div>

        {/* Main Feedback Table / List Content */}
        <div className="relative z-10">
          <StaffFeedbackTable />
        </div>
      </div>
    </div>
  );
}
