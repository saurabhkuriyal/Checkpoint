import React, { useState } from 'react';

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        console.log("Submitted Data:", { ...formData, categoryData });
        setTimeout(() => {
            setIsSubmitting(false);
            alert('RECCI Tour Request Submitted Successfully!');
        }, 1500);
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
