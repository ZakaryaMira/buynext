'use client';
import { useEffect } from 'react';

export default function SuccessModal({ onClose, message }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-sm w-full">
        <h2 className="text-2xl font-bold text-green-600 mb-2">Succès</h2>
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
}
