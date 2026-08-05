"use client";
import React, { useEffect, useState } from 'react';
import { getAllRecci } from '@/services/recci.services';
import Link from 'next/link';

export default function AllResortsPage() {
    const [resorts, setResorts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedResortId, setExpandedResortId] = useState<string | null>(null);

    const categoriesList = [
        "Location", "Exterior", "Reception", "Rooms", "Bathrooms", "Dining", "Kitchen",
        "Food", "Safety", "Activities", "Medical", "Staff", "Commercial"
    ];

    useEffect(() => {
        const fetchResorts = async () => {
            try {
                console.log("----RECCI GET ALL from AllResortsPage");

                const response = await getAllRecci();
                if (response.success) {
                    setResorts(response.data);
                } else {
                    setError('Failed to fetch resorts');
                }
            } catch (err: any) {
                setError(err.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchResorts();
    }, []);

    console.log("----", resorts);


    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-5 font-sans">
            {resorts.map((resort) => <h1>{resort.schoolName}</h1>)}
        </div>
    );
}
