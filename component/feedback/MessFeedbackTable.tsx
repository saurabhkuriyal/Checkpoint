'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useMessFeedback } from '@/hooks/feedback/useMessFeedback';

export const MessFeedbackTable: React.FC = () => {
  const { feedbacks, isLoading, error, refetch } = useMessFeedback();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-500 p-4 rounded-xl text-center font-medium">
        {error}
        <button onClick={refetch} className="block mx-auto mt-2 text-sm underline hover:text-red-700">Try Again</button>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-xl overflow-hidden relative">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <h2 className="text-xl font-bold text-gray-800">Mess Feedback Responses</h2>
        <button 
          onClick={refetch}
          className="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          Refresh
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold border-b border-gray-100">Date</th>
              <th className="p-4 font-semibold border-b border-gray-100">Subject</th>
              <th className="p-4 font-semibold border-b border-gray-100">Message</th>
              <th className="p-4 font-semibold border-b border-gray-100">Attachment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {feedbacks.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  No feedback received yet.
                </td>
              </tr>
            ) : (
              feedbacks.map((item) => (
                <tr key={item._id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                    {new Date(item.createdAt).toLocaleDateString()} <br />
                    <span className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleTimeString()}</span>
                  </td>
                  <td className="p-4 text-sm font-medium text-gray-800">
                    {item.subject}
                  </td>
                  <td className="p-4 text-sm text-gray-600 max-w-xs truncate" title={item.message}>
                    {item.message}
                  </td>
                  <td className="p-4 text-sm">
                    {item.image ? (
                      <button 
                        onClick={() => setSelectedImage(item.image!)}
                        className="text-blue-500 hover:text-blue-700 font-medium underline text-xs flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                        View Image
                      </button>
                    ) : (
                      <span className="text-gray-400 text-xs italic">None</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedImage(null)}>
          <div className="relative bg-white p-2 rounded-2xl max-w-3xl max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-gray-900/50 text-white hover:bg-gray-900 rounded-full p-2 transition-colors z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <div className="relative w-[80vw] h-[80vh] max-w-[800px] max-h-[800px]">
              <Image 
                src={selectedImage} 
                alt="Feedback Attachment" 
                fill 
                className="object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
