import react, { useState } from "react";

export default function useSignUp() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        console.log("forData", formData);

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");

            return;
        }
        console.log(formData);
    };

    return {
        formData,
        handleChange,
        handleSubmit,
    };
}