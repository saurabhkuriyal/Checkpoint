import { useState, ChangeEvent, FormEvent } from 'react';
import { submitFeedback } from '@/services/mess.services';

export interface QRCodeFormData {
  subject: string;
  message: string;
  image: File | null;
}

export const useQRCodeForm = () => {
  const [formData, setFormData] = useState<QRCodeFormData>({
    subject: '',
    message: '',
    image: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        image: e.target.files![0],
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await submitFeedback(formData);
      console.log("QR code Hook", res);
      
      if (res.success) {
        setIsSuccess(true);
        setFormData({ subject: '', message: '', image: null });
      }

    } catch (error) {
      console.error("Form submission failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeSuccessModal = () => {
    setIsSuccess(false);
  };

  return {
    formData,
    isSubmitting,
    isSuccess,
    handleTextChange,
    handleImageChange,
    handleSubmit,
    closeSuccessModal
  };
};
