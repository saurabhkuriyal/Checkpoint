"use client";

import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';

function page() {
    useEffect(() => {
        const fetchTask = async () => {
            const response = await axios.post("/api/create-task");

            console.log("task is", response.data);
        }
        fetchTask();
    }, []);
    return (
        <div>
            <h1>Hello fro manager tracking</h1>
        </div>
    )
}

export default page