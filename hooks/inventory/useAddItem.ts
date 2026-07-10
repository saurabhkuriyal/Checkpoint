import { useState } from "react";

export const useAddItem = () => {
    const [formData, setFormData] = useState({
        item_name: '',
        item_id: '',
        unit: '',
        quantity: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitting:', formData);

        // TODO: Implement API call here to actually save the item
        alert("Form submitted! Check console for data.");
    };

    return {
        formData,
        handleChange,
        handleSubmit
    };
}   