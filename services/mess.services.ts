import axios from 'axios';
import { API } from '../constants/api';

export const submitFeedback = async (data: { subject: string; message: string; image?: File | string | null }) => {
    try {
        const response = await axios.post(API.feedback, data);
        return response.data;
    } catch (error: any) {
        console.error("Error submitting feedback:", error);
        throw error.response?.data || error.message;
    }
};
