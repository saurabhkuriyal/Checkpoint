'use client';

import React from 'react';
import { useQRCodeForm, QRCodeFormData } from '@/hooks/mess/useQRCodeForm';

interface QRCodeFormProps {
  onSubmit: (data: QRCodeFormData) => void | Promise<void>;
}

export const QRCodeForm: React.FC<QRCodeFormProps> = ({ onSubmit }) => {
  const { formData, isSubmitting, handleTextChange, handleImageChange, handleSubmit } = useQRCodeForm();

  return (
    <form onSubmit={(e) => handleSubmit(e, onSubmit)} className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 text-center">QR Code Details</h2>

      <div className="space-y-2">
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleTextChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter subject"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleTextChange}
          required
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter message"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};
