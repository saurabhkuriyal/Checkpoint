'use client';

import React from 'react';
import { StaffQRCodeForm } from '@/component/mess/StaffQRCodeForm';

export default function StaffFeedbackFormPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4 py-12">
      <StaffQRCodeForm />
    </div>
  );
}
