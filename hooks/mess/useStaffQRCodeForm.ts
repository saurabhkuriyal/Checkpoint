import { useState, ChangeEvent, FormEvent } from 'react';
import { submitStaffFeedback } from '@/services/mess.services';

export interface StaffQRCodeFormData {
  name: string;
  email: string;
  number: string;
  batchNumber: string;
  staffName: string;
  customStaffName: string;
  ratingBehaviour: number;
  ratingHygiene: number;
  ratingSpeed: number;
  ratingCleanliness: number;
  ratingOverall: number;
  message: string;
  image: File | null;
}

export const useStaffQRCodeForm = () => {
  const [formData, setFormData] = useState<StaffQRCodeFormData>({
    name: '',
    email: '',
    number: '',
    batchNumber: '',
    staffName: '',
    customStaffName: '',
    ratingBehaviour: 0,
    ratingHygiene: 0,
    ratingSpeed: 0,
    ratingCleanliness: 0,
    ratingOverall: 0,
    message: '',
    image: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (name: string, value: number) => {
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

    const effectiveStaffName = formData.staffName === 'Other' ? formData.customStaffName : formData.staffName;

    if (!effectiveStaffName || effectiveStaffName.trim() === '') {
      alert("Please select or specify the name of the staff member.");
      return;
    }

    if (
      !formData.ratingBehaviour ||
      !formData.ratingHygiene ||
      !formData.ratingSpeed ||
      !formData.ratingCleanliness ||
      !formData.ratingOverall
    ) {
      alert("Please provide a rating for all performance criteria before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        number: formData.number,
        batchNumber: formData.batchNumber,
        staffName: effectiveStaffName,
        ratingBehaviour: formData.ratingBehaviour,
        ratingHygiene: formData.ratingHygiene,
        ratingSpeed: formData.ratingSpeed,
        ratingCleanliness: formData.ratingCleanliness,
        ratingOverall: formData.ratingOverall,
        message: formData.message,
        image: formData.image,
      };

      const res = await submitStaffFeedback(payload);
      console.log("Staff Feedback submit response", res);

      if (res.success || res.data) {
        setIsSuccess(true);
        setFormData({
          name: '',
          email: '',
          number: '',
          batchNumber: '',
          staffName: '',
          customStaffName: '',
          ratingBehaviour: 0,
          ratingHygiene: 0,
          ratingSpeed: 0,
          ratingCleanliness: 0,
          ratingOverall: 0,
          message: '',
          image: null,
        });
      }
    } catch (error) {
      console.error("Staff feedback submission failed", error);
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
    handleRatingChange,
    handleImageChange,
    handleSubmit,
    closeSuccessModal,
  };
};
