'use client';

import React from 'react';
import { QRCodeForm } from '../../../component/mess/QRCodeForm';

export default function QRCodeFormPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 flex items-center justify-center p-4">
      <QRCodeForm />
    </div>
  );
}
