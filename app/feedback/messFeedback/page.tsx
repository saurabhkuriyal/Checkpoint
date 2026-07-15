'use client';

import React from 'react';
import { MessFeedbackTable } from '@/component/feedback/MessFeedbackTable';

export default function MessFeedbackPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Mess Feedback</h1>
          <p className="mt-2 text-sm text-gray-600">Review all feedback submitted by users via the QR Code form.</p>
        </div>
        
        <MessFeedbackTable />
      </div>
    </div>
  );
}
