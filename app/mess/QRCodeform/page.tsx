'use client';

import React from 'react';
import { QRCodeForm } from '../../../component/mess/QRCodeForm';

export default function QRCodeFormPage() {
  const handleFormSubmit = async (data: any) => {
    console.log('Form Submitted with data:', data);
    alert(`Submitted subject: ${data.subject}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <QRCodeForm onSubmit={handleFormSubmit} />
    </div>
  );
}
