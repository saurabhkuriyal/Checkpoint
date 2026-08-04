import React, { useState } from 'react';
import saveRecci from '@/services/recci.services';
export default function useRecciTour() {
    const [formData, setFormData] = useState({
        schoolName: '',
        coordinatorName: '',
        travelDate: '',
        location: '',
    });

    const [expandedCategory, setExpandedCategory] = useState<string | null>("Location");
    const [categoryData, setCategoryData] = useState<Record<string, Record<string, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCategoryFieldChange = (category: string, field: string, value: string) => {
        setCategoryData(prev => ({
            ...prev,
            [category]: {
                ...(prev[category] || {}),
                [field]: value
            }
        }));
    };

    const toggleCategory = (category: string) => {
        setExpandedCategory(prev => prev === category ? null : category);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const formattedCategoryData: Record<string, any> = {};
            for (const [category, fields] of Object.entries(categoryData)) {
                let totalScore = 0;
                let count = 0;
                for (const [key, value] of Object.entries(fields)) {
                    // Check if value is a number (rating) and not a review or empty text
                    if (!isNaN(Number(value)) && String(value).trim() !== "" && key !== "Review") {
                        totalScore += Number(value);
                        count++;
                    }
                }
                const score = count > 0 ? Number((totalScore / count).toFixed(1)) : 0;
                formattedCategoryData[category] = {
                    ...fields,
                    score
                };
            }

            const dataToSave = { ...formData, ...formattedCategoryData };
            console.log("Submitting Data:", dataToSave);
            
            const response = await saveRecci(dataToSave);
            if (response?.success) {
                alert('RECCI Tour Request Submitted Successfully!');
                // Reset form (optional) or redirect
                setFormData({ schoolName: '', coordinatorName: '', travelDate: '', location: '' });
                setCategoryData({});
            } else {
                alert('Failed to submit RECCI Tour Request.');
            }
        } catch (error) {
            console.error("Error submitting RECCI Form:", error);
            alert('An error occurred while saving.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        expandedCategory,
        categoryData,
        isSubmitting,
        handleChange,
        handleCategoryFieldChange,
        toggleCategory,
        handleSubmit,
    };
}
