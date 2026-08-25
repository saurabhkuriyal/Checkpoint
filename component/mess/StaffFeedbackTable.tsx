'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useStaffFeedbackDashboard, StaffFeedbackData } from '@/hooks/mess/useStaffFeedbackDashboard';

const renderStars = (rating: number) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${star <= (rating || 0) ? 'text-amber-400 drop-shadow-sm' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export const StaffFeedbackTable: React.FC = () => {
  const { feedbacks, isLoading, error, refetch } = useStaffFeedbackDashboard();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStaff, setSelectedStaff] = useState('ALL');

  // Extract unique staff names for filtering
  const staffList = useMemo(() => {
    const names = feedbacks.map(f => f.staffName).filter(Boolean);
    return Array.from(new Set(names));
  }, [feedbacks]);

  // Filtered feedbacks based on search & staff selection
  const filteredFeedbacks = useMemo(() => {
    return feedbacks.filter(item => {
      const matchesStaff = selectedStaff === 'ALL' || item.staffName === selectedStaff;
      const matchesSearch =
        searchQuery === '' ||
        (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.staffName && item.staffName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.email && item.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.message && item.message.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesStaff && matchesSearch;
    });
  }, [feedbacks, searchQuery, selectedStaff]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center py-24">
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-emerald-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin"></div>
        </div>
        <p className="text-gray-500 font-medium">Fetching staff feedback responses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-rose-50 text-rose-600 p-8 rounded-3xl text-center font-medium shadow-sm border border-rose-100 max-w-xl mx-auto">
        <svg className="w-12 h-12 mx-auto mb-3 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-lg font-bold mb-1">Failed to load feedback</p>
        <p className="text-sm text-rose-500 mb-4">{error}</p>
        <button
          onClick={refetch}
          className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-rose-200 active:scale-95"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.4s ease-out forwards;
        }
      `}</style>

      {/* Filter and Search Bar */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 md:p-6 mb-8 border border-gray-200/80 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-1">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <svg className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by student or staff name..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>

          {/* Staff Filter Dropdown */}
          <div className="w-full sm:w-56">
            <select
              value={selectedStaff}
              onChange={e => setSelectedStaff(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all cursor-pointer"
            >
              <option value="ALL">All Staff Members ({feedbacks.length})</option>
              {staffList.map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200">
            Showing {filteredFeedbacks.length} of {feedbacks.length}
          </span>
          <button
            onClick={refetch}
            className="p-2.5 md:px-4 md:py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md shadow-emerald-600/20 text-sm font-semibold transition-all active:scale-95 flex items-center gap-2"
            aria-label="Refresh feedback"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Grid of Staff Feedback Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFeedbacks.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-gray-100 shadow-sm">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-gray-600 font-semibold text-lg">No staff feedback found</p>
            <p className="text-gray-400 text-sm mt-1">Try clearing filters or submitting feedback from the QR form.</p>
          </div>
        ) : (
          filteredFeedbacks.map((item, index) => (
            <div
              key={item._id}
              className="bg-white border border-gray-100 rounded-3xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_35px_-4px_rgba(16,185,129,0.12)] transition-all duration-300 hover:-translate-y-1 animate-fade-in-up flex flex-col justify-between"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div>
                {/* Header Badge & Staff Name */}
                <div className="mb-4 pb-3 border-b border-gray-100 flex items-start justify-between gap-3">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-bold rounded-full mb-2">
                      <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Staff Member
                    </span>
                    <h3 className="text-xl font-extrabold text-gray-900 leading-tight capitalize">
                      {item.staffName || "General Staff"}
                    </h3>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md">
                      {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                    <p className="text-[10px] text-gray-400 mt-1">
                      {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                {/* Submitter Info */}
                <div className="mb-4 bg-slate-50/70 p-3 rounded-2xl border border-slate-100/80">
                  <p className="text-xs font-bold text-gray-700 truncate capitalize">{item.name || "Anonymous Student"}</p>
                  <p className="text-xs text-gray-500 truncate">{item.email}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                    <span>Phone: {item.number}</span>
                    {item.batchNumber && <span>• Batch: {item.batchNumber}</span>}
                  </div>
                </div>

                {/* Detailed Ratings */}
                <div className="bg-slate-50/90 rounded-2xl p-3.5 mb-4 border border-slate-100">
                  <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2.5">Performance Ratings</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center bg-white px-2.5 py-1.5 rounded-lg shadow-2xs border border-slate-100">
                      <span className="text-gray-700 font-medium">Behaviour</span>
                      {renderStars(item.ratingBehaviour)}
                    </div>
                    <div className="flex justify-between items-center bg-white px-2.5 py-1.5 rounded-lg shadow-2xs border border-slate-100">
                      <span className="text-gray-700 font-medium">Hygiene</span>
                      {renderStars(item.ratingHygiene)}
                    </div>
                    <div className="flex justify-between items-center bg-white px-2.5 py-1.5 rounded-lg shadow-2xs border border-slate-100">
                      <span className="text-gray-700 font-medium">Service Speed</span>
                      {renderStars(item.ratingSpeed)}
                    </div>
                    <div className="flex justify-between items-center bg-white px-2.5 py-1.5 rounded-lg shadow-2xs border border-slate-100">
                      <span className="text-gray-700 font-medium">Cleanliness</span>
                      {renderStars(item.ratingCleanliness)}
                    </div>
                    <div className="flex justify-between items-center pt-2 mt-1 border-t border-slate-200">
                      <span className="text-gray-900 font-bold text-sm">Overall</span>
                      <div className="scale-110 origin-right">
                        {renderStars(item.ratingOverall)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="mb-4">
                  <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">Feedback & Remarks</h4>
                  <p className="text-gray-700 text-sm leading-relaxed bg-gray-50/60 p-3 rounded-xl border border-gray-100 min-h-[60px]">
                    {item.message || <span className="text-gray-400 italic">No detailed remarks provided.</span>}
                  </p>
                </div>
              </div>

              {/* Attachment Footer */}
              <div className="pt-4 border-t border-gray-100">
                {item.image ? (
                  <button
                    onClick={() => setSelectedImage(item.image!)}
                    className="w-full bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 text-emerald-700 py-2.5 px-4 rounded-xl text-sm font-bold transition-all active:scale-95 flex items-center justify-center gap-2 border border-emerald-100 group"
                  >
                    <svg className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    View Photo Evidence
                  </button>
                ) : (
                  <div className="w-full bg-gray-50 py-2 px-3 rounded-xl text-xs font-medium text-gray-400 flex items-center justify-center gap-1.5 border border-gray-100/60">
                    <svg className="w-4 h-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                    No Attachment Included
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-md transition-opacity"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-black rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up flex flex-col items-center justify-center"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full p-2.5 transition-all active:scale-90 z-10"
              aria-label="Close image modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative w-full min-h-[50vh] max-h-[85vh] flex items-center justify-center p-2">
              <Image
                src={selectedImage}
                alt="Staff Feedback Photo"
                layout="fill"
                objectFit="contain"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
