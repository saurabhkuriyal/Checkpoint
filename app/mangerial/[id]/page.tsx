"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

interface Task {
    _id?: string;
    task: string;
    time?: string;
    status: "pending" | "done" | "raise";
    submittedAt?: string;
    firstImageUrl?: string;
    secondImageUrl?: string;
    firstImageFile?: File;
    secondImageFile?: File;
}

export default function ManagerialPage() {


    const [dayId, setDayId] = useState<string>("");
    const [month, setMonth] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        fetchTask();

    }, []);

    const fetchTask = async () => {
        const now = new Date();
        const day = now.getDate();
        const monthIndex = now.getMonth() + 1;
        const year = now.getFullYear();
        const formattedDate = `${day}/${monthIndex}/${year}`;
        const monthName = now.toLocaleString('default', { month: 'long' });

        setDate(formattedDate);
        setMonth(monthName);

        const data = {
            formattedDate: formattedDate,
            monthName: monthName,
        }
        try {
            const response = await axios.post("/api/manager/create-task", { data: data });
            console.log("Response: ", response.data);
            if (response.data.taskId) {
                getAllTasks(response.data.taskId);
            }
        } catch (error) {
            console.log("error in", error);
            setLoading(false);
        }
    }

    const getAllTasks = async (taskId: string) => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/manager/gettask/${taskId}`);
            console.log("------", response.data);
            const data = response.data.tasks;
            setDayId(data._id);
            setTasks(data.tasks);
            setDate(data.date);
            setMonth(data.month);

        } catch (error) {
            console.log("error in getting tasks", error);
        } finally {
            setLoading(false);
        }
    }

    const handleAddTaskRow = () => {
        const newTask: Task = {
            task: "",
            status: "pending",
        };
        setTasks([...tasks, newTask]);
    };

    const handleTaskChange = (index: number, field: keyof Task, value: string) => {
        const updatedTasks = [...tasks];
        updatedTasks[index] = { ...updatedTasks[index], [field]: value } as Task;
        setTasks(updatedTasks);
    };

    const handleFileChange = (index: number, field: "firstImage" | "secondImage", e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            const updatedTasks = [...tasks];
            updatedTasks[index] = {
                ...updatedTasks[index],
                [`${field}Url`]: objectUrl,
                [`${field}File`]: file
            } as Task;
            setTasks(updatedTasks);
        }
    };

    const handleSubmitRow = async (index: number) => {
        const taskToSubmit = tasks[index];
        console.log("Submitting task:", taskToSubmit);

        const formData = new FormData();

        const taskData = { ...taskToSubmit };
        delete taskData.firstImageFile;
        delete taskData.secondImageFile;
        taskData.submittedAt = new Date().toISOString();

        formData.append("taskData", JSON.stringify(taskData));

        if (taskToSubmit.firstImageFile) {
            formData.append("firstImage", taskToSubmit.firstImageFile);
        }
        if (taskToSubmit.secondImageFile) {
            formData.append("secondImage", taskToSubmit.secondImageFile);
        }

        try {
            const response = await axios.post("/api/manager/update-task", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                params: {
                    dayId: dayId
                }
            });
            console.log("Response:", response.data);

            const updatedTasks = [...tasks];
            updatedTasks[index].submittedAt = taskData.submittedAt;
            setTasks(updatedTasks);

            alert(`Task submitted successfully!`);
        } catch (error) {
            console.error("Error submitting task:", error);
            alert("Failed to submit task.");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-800">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Managerial Task Dashboard
                        </h1>
                        <p className="text-slate-500 mt-1 text-sm font-medium">
                            {date && month ? `${date} • ${month}` : "Loading date..."}
                        </p>
                    </div>
                    <button
                        onClick={handleAddTaskRow}
                        className="mt-4 md:mt-0 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-md shadow-indigo-200 active:scale-95"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Add New Row
                    </button>
                </div>

                {/* Table/List Area */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                                    <th className="px-6 py-4 w-16">S.No</th>
                                    <th className="px-6 py-4 w-1/3">Task Description</th>
                                    <th className="px-6 py-4 w-48">Evidence (2 Images)</th>
                                    <th className="px-6 py-4 w-40">Status</th>
                                    <th className="px-6 py-4 text-center w-32">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium">
                                            <div className="flex justify-center items-center gap-3">
                                                <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                                                Loading tasks...
                                            </div>
                                        </td>
                                    </tr>
                                ) : tasks.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium">
                                            No tasks found for this date.
                                        </td>
                                    </tr>
                                ) : (
                                    tasks.map((task, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4 text-slate-500 font-medium">
                                                {(idx + 1).toString().padStart(2, '0')}
                                            </td>
                                            <td className="px-6 py-4">
                                                <input
                                                    type="text"
                                                    placeholder="Enter task description..."
                                                    value={task.task}
                                                    onChange={(e) => handleTaskChange(idx, "task", e.target.value)}
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-3">
                                                    {/* Image 1 */}
                                                    <div className="relative group/img">
                                                        <input
                                                            type="file"
                                                            id={`file1-${idx}`}
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={(e) => handleFileChange(idx, "firstImage", e)}
                                                        />
                                                        <label
                                                            htmlFor={`file1-${idx}`}
                                                            title="Upload First Evidence Image"
                                                            className={`flex items-center justify-center w-12 h-12 rounded-lg border-2 border-dashed cursor-pointer transition-all overflow-hidden ${task.firstImageUrl ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'}`}
                                                        >
                                                            {task.firstImageUrl ? (
                                                                <img src={task.firstImageUrl} alt="Evidence 1" className="w-full h-full object-cover" />
                                                            ) : (
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                            )}
                                                        </label>
                                                    </div>
                                                    {/* Image 2 */}
                                                    <div className="relative group/img">
                                                        <input
                                                            type="file"
                                                            id={`file2-${idx}`}
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={(e) => handleFileChange(idx, "secondImage", e)}
                                                        />
                                                        <label
                                                            htmlFor={`file2-${idx}`}
                                                            title="Upload Second Evidence Image"
                                                            className={`flex items-center justify-center w-12 h-12 rounded-lg border-2 border-dashed cursor-pointer transition-all overflow-hidden ${task.secondImageUrl ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'}`}
                                                        >
                                                            {task.secondImageUrl ? (
                                                                <img src={task.secondImageUrl} alt="Evidence 2" className="w-full h-full object-cover" />
                                                            ) : (
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                            )}
                                                        </label>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="relative">
                                                    <select
                                                        value={task.status}
                                                        onChange={(e) => handleTaskChange(idx, "status", e.target.value as Task["status"])}
                                                        className={`w-full appearance-none pl-4 pr-8 py-2.5 rounded-lg text-sm font-semibold border focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all cursor-pointer shadow-sm
                                                            ${task.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                                                task.status === 'done' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                                                    'bg-rose-50 text-rose-700 border-rose-200'}
                                                        `}
                                                    >
                                                        <option value="pending">⏳ Pending</option>
                                                        <option value="done">✅ Done</option>
                                                        <option value="raise">🚨 Raise</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    onClick={() => handleSubmitRow(idx)}
                                                    className="inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm active:scale-95 gap-2 w-full"
                                                >
                                                    <span>Submit</span>
                                                </button>
                                                {task.submittedAt && (
                                                    <div className="text-[10px] text-slate-400 mt-2 font-medium">
                                                        Submitted: {new Date(task.submittedAt).toLocaleTimeString()}
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}