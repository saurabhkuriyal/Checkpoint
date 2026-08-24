'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { useStaffQRCodeForm } from '@/hooks/mess/useStaffQRCodeForm';

const STAFF_LIST = [
  "Aakash",
  "Akhlesh",
  "Anuj",
  "Bhagwati",
  "Brij Kishore",
  "Mahendra",
  "Monu",
  "Pappu",
  "Raju",
  "Rajveer",
  "Ravindra",
  "Santosh Bhola",
  "Saurav Kumar",
  "Seelu",
  "Other",
];

const RATING_CRITERIA = [
  { id: 'ratingBehaviour', label: '1. Behaviour & Politeness' },
  { id: 'ratingHygiene', label: '2. Personal Hygiene & Grooming' },
  { id: 'ratingSpeed', label: '3. Speed & Quality of Service' },
  { id: 'ratingCleanliness', label: '4. Cleanliness During Service' },
  { id: 'ratingOverall', label: '5. Overall Performance' },
];

export const StaffQRCodeForm: React.FC = () => {
  const {
    formData,
    isSubmitting,
    isSuccess,
    handleTextChange,
    handleRatingChange,
    handleImageChange,
    handleSubmit,
    closeSuccessModal,
  } = useStaffQRCodeForm();

  useEffect(() => {
    if (isSuccess) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#10b981', '#84cc16', '#fcd34d'],
      });
    }
  }, [isSuccess]);

  return (
    <div className="relative w-full max-w-lg">
      {/* Background glowing ambient effects */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>

      <form onSubmit={handleSubmit} className="relative bg-white/80 backdrop-blur-xl border border-white/50 p-8 sm:p-10 rounded-3xl shadow-2xl space-y-8">
        {/* Form Title & Subtitle */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
            Delhi Delight Staff Feedback Form
          </h2>
          <p className="mt-2 text-gray-500 text-sm">
            We value your feedback on our mess staff to maintain the highest standards of service!
          </p>
        </div>

        <div className="space-y-6">
          {/* User Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleTextChange}
              required
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm"
              placeholder="Your Full Name"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleTextChange}
              required
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label htmlFor="number" className="block text-sm font-semibold text-gray-700">Phone Number</label>
            <input
              type="tel"
              id="number"
              name="number"
              value={formData.number}
              onChange={handleTextChange}
              required
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm"
              placeholder="Your Phone Number"
            />
          </div>

          {/* Batch Number */}
          <div className="space-y-2">
            <label htmlFor="batchNumber" className="block text-sm font-semibold text-gray-700">
              Batch No <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              id="batchNumber"
              name="batchNumber"
              value={formData.batchNumber}
              onChange={handleTextChange}
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm"
              placeholder="e.g. Batch 2024-A"
            />
          </div>

          {/* Name of Staff (Dropdown to choose or write) */}
          <div className="space-y-2">
            <label htmlFor="staffName" className="block text-sm font-semibold text-gray-700">
              Name of Staff
            </label>
            <div className="relative">
              <select
                id="staffName"
                name="staffName"
                value={formData.staffName}
                onChange={handleTextChange}
                required
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm appearance-none cursor-pointer"
              >
                <option value="" disabled>Select Staff Member</option>
                {STAFF_LIST.map((staff, idx) => (
                  <option key={idx} value={staff === 'Other' ? 'Other' : staff}>
                    {staff === 'Other' ? '✍️ Write custom staff name...' : staff}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Custom Staff Input when "Other" or custom is chosen */}
            {formData.staffName === 'Other' && (
              <div className="pt-2 animate-fadeIn">
                <input
                  type="text"
                  id="customStaffName"
                  name="customStaffName"
                  value={formData.customStaffName}
                  onChange={handleTextChange}
                  required
                  className="w-full px-4 py-3 bg-emerald-50/50 border border-green-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm"
                  placeholder="Enter staff name..."
                />
              </div>
            )}
          </div>

          {/* 5-Star Rating Criteria Section */}
          <div className="space-y-5 bg-white/60 p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div className="text-sm font-bold text-gray-800 border-b pb-3 border-gray-200 flex items-center justify-between">
              <span>Rate Staff Performance (1 to 5 Stars)</span>
              <span className="text-xs text-emerald-600 font-medium">5 = Excellent</span>
            </div>

            {RATING_CRITERIA.map((q) => {
              const currentValue = (formData as any)[q.id] || 0;
              return (
                <div key={q.id} className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">{q.label}</label>
                  <div className="flex max-w-sm gap-2">
                    {[1, 2, 3, 4, 5].map((num) => {
                      const isFilled = num <= currentValue;
                      return (
                        <label
                          key={num}
                          className="cursor-pointer transition-all hover:scale-110 flex items-center justify-center p-1"
                          title={`${num} Star${num > 1 ? 's' : ''}`}
                        >
                          <input
                            type="radio"
                            name={q.id}
                            value={num}
                            checked={currentValue === num}
                            onChange={() => handleRatingChange(q.id, num)}
                            className="hidden"
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill={isFilled ? "currentColor" : "none"}
                            stroke="currentColor"
                            strokeWidth={1.5}
                            className={`w-8 h-8 sm:w-10 sm:h-10 transition-colors ${isFilled
                              ? 'text-yellow-400 drop-shadow-sm'
                              : 'text-gray-300 hover:text-yellow-300'
                              }`}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                            />
                          </svg>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message (At Last) */}
          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleTextChange}
              required
              rows={3}
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm resize-none"
              placeholder="Share details or specific compliments/suggestions..."
            />
          </div>

          {/* Upload Image (Optional) */}
          <div className="space-y-2">
            <label htmlFor="image" className="block text-sm font-semibold text-gray-700">
              Upload Image <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-green-500 transition-colors bg-white/50">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="text-center flex flex-col items-center justify-center">
                <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="mt-1 text-sm text-gray-500">
                  {formData.image ? formData.image.name : "Click or drag image to upload"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-4 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-bold rounded-xl shadow-lg transform hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting Feedback...
            </>
          ) : (
            'Submit Staff Feedback'
          )}
        </button>

        {/* Quote at the bottom */}
        <div className="pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-400 italic text-sm">
            "Recognizing great service helps us build a better mess experience for everyone."
          </p>
        </div>
      </form>

      {/* Success Modal */}
      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="relative bg-white rounded-3xl p-10 max-w-md w-full shadow-2xl transform scale-100 transition-transform flex flex-col items-center text-center">
            {/* Top Right Close Button */}
            <button
              onClick={closeSuccessModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            <div className="w-28 h-28 bg-green-50 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-inner">
              <Image
                src="/DD.webp"
                alt="Delhi Delight"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">Thank You!</h3>
            <p className="text-gray-500 mb-8 text-lg">
              Your staff feedback has been successfully submitted. We appreciate your valuable input!
            </p>

            <button
              onClick={closeSuccessModal}
              className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-bold text-lg rounded-xl shadow-[0_10px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_30px_rgba(16,185,129,0.4)] hover:-translate-y-1 transition-all duration-300"
            >
              Feedback Submitted
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
