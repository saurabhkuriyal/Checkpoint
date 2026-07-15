'use client';

import React from 'react';
import Image from 'next/image';
import { useQRCodeForm } from '@/hooks/mess/useQRCodeForm';

export const QRCodeForm: React.FC = () => {
  const { formData, isSubmitting, isSuccess, handleTextChange, handleImageChange, handleSubmit, closeSuccessModal } = useQRCodeForm();

  return (
    <div className="relative w-full max-w-lg">
      {/* Background glowing effects for premium look */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>

      <form onSubmit={handleSubmit} className="relative bg-white/80 backdrop-blur-xl border border-white/50 p-8 sm:p-10 rounded-3xl shadow-2xl space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
            Delhi Delight Feedback form
          </h2>
          <p className="mt-2 text-gray-500 text-sm">We'd love to hear your thoughts to improve our services!</p>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="subject" className="block text-sm font-semibold text-gray-700">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleTextChange}
              required
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shadow-sm"
              placeholder="What is this regarding?"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleTextChange}
              required
              rows={4}
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shadow-sm resize-none"
              placeholder="Tell us everything..."
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="image" className="block text-sm font-semibold text-gray-700">Upload Image <span className="text-gray-400 font-normal">(Optional)</span></label>
            <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-purple-500 transition-colors bg-white/50">
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-4 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold rounded-xl shadow-lg transform hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : 'Submit Feedback'}
        </button>

        {/* Quote at the bottom */}
        <div className="pt-6 border-t border-gray-100 text-center">
           <p className="text-gray-400 italic text-sm">"Your feedback is the compass that guides our continuous improvement."</p>
        </div>
      </form>

      {/* Success Modal */}
      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl transform scale-100 transition-transform flex flex-col items-center text-center">
            <div className="w-28 h-28 bg-purple-50 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-inner">
              <Image 
                src="/backpackers.png" 
                alt="Success" 
                width={80} 
                height={80} 
                className="object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-500 mb-8">Your feedback has been successfully submitted. We appreciate your input!</p>
            <button
              onClick={closeSuccessModal}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold rounded-xl transition-colors shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
