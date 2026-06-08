"use client";

import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';

function page() {
    useEffect(() => {


        fetchTask();
    }, []);

    const fetchTask = async () => {

        const now = new Date();
        const day = now.getDate();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        const monthName = now.toLocaleString('default', { month: 'long' });

        console.log("date is", formattedDate);
        console.log("month is", monthName);

        const data = {
            formattedDate: formattedDate,
            monthName: monthName,
        }

        const response = await axios.post("/api/create-task", { data: data });

        console.log("task is", response.data);
    }
    return (
        <div>
            <h1>Hello fro manager tracking</h1>
        </div>
    )
}

export default page