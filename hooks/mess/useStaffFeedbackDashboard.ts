import { useState, useEffect } from 'react';
import { getStaffFeedback } from '@/services/mess.services';

export interface StaffFeedbackData {
  _id: string;
  name: string;
  email: string;
  number: string;
  batchNumber?: string;
  staffName: string;
  ratingBehaviour: number;
  ratingHygiene: number;
  ratingSpeed: number;
  ratingCleanliness: number;
  ratingOverall: number;
  message: string;
  image?: string;
  createdAt: string;
}

export const useStaffFeedbackDashboard = () => {
  const [feedbacks, setFeedbacks] = useState<StaffFeedbackData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeedbacks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getStaffFeedback();
      if (response.success) {
        setFeedbacks(response.data);
      } else {
        setError(response.message || "Failed to fetch staff feedback");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching staff feedback");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return { feedbacks, isLoading, error, refetch: fetchFeedbacks };
};
