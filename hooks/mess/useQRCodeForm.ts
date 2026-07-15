import { useState, ChangeEvent, FormEvent } from 'react';

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

  const handleSubmit = async (e: FormEvent, onSubmit: (data: QRCodeFormData) => Promise<void> | void) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      console.log("QR code Hook", formData);

    } catch (error) {
      console.error("Form submission failed", error);


    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    handleTextChange,
    handleImageChange,
    handleSubmit,
  };
};
