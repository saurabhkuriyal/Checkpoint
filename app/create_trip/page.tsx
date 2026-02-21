"use client";

import axios from "axios";
import { useState } from "react";

interface TaskRow {
    TripId: string;
    name: string;
    description: string;
    time: string;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const emptyTask = (): TaskRow => ({
    TripId: generateId(),
    name: "",
    description: "",
    time: "",
});

export default function page() {
    const [tripName, setTripName] = useState("");
    const [tripDate, setTripDate] = useState("");
    const [tasks, setTasks] = useState<TaskRow[]>([emptyTask()]);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const addRow = () => setTasks((p) => [...p, emptyTask()]);

    const removeRow = (id: string) => {
        if (tasks.length === 1) return;
        setTasks((p) => p.filter((t) => t.TripId !== id));
    };

    const updateRow = (id: string, field: keyof TaskRow, value: string) =>
        setTasks((p) =>
            p.map((t) => (t.TripId === id ? { ...t, [field]: value } : t))
        );

    const handleSave = async () => {
        setSaving(true);


        const payload = { tripName, tripDate, tasks, createdAt: new Date().toISOString() };
        console.log("Saving:", payload);
        try {
            const response = await axios.post("/api/new_trip", payload);
            console.log("Response:", response.data);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch {
            alert("Failed to save. Try again.");
        } finally {
            setSaving(false);
        }
    };

    const isValid =
        tripName.trim() !== "" &&
        tripDate !== "" &&
        tasks.every((t) => t.name.trim() !== "" && t.time !== "");

    return (
        <div className="min-h-screen bg-[#f8fafc] font-sans">

            {/* ── Sticky Top Bar ── */}
            <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 shrink-0 rounded-lg bg-blue-600 flex items-center justify-center shadow shadow-blue-200">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <div className="min-w-0">
                            <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest leading-none">Admin</p>
                            <h1 className="text-sm font-black text-slate-800 truncate">Create New Trip</h1>
                        </div>
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={!isValid || saving}
                        className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all active:scale-95
              ${isValid && !saving
                                ? "bg-blue-600 text-white shadow-md shadow-blue-200 hover:bg-blue-700"
                                : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}
                    >
                        {saving ? (
                            <><div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving</>
                        ) : saved ? (
                            <><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg> Saved!</>
                        ) : (
                            <><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg> Save Trip</>
                        )}
                    </button>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-5 space-y-5">

                {/* ── Trip Info ── */}
                <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center gap-2">
                        <span className="text-white text-xs font-black uppercase tracking-widest">Trip Info</span>
                    </div>
                    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                                Trip Name <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                value={tripName}
                                onChange={(e) => setTripName(e.target.value)}
                                placeholder="e.g. Morning School Run"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-500 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                                Trip Date <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="date"
                                value={tripDate}
                                onChange={(e) => setTripDate(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-500 transition-all"
                            />
                        </div>
                    </div>
                </section>

                {/* ── Task Grid ── */}
                <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                    {/* Section Header */}
                    <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                        <div>
                            <h2 className="text-sm font-black text-slate-800">Task Checklist</h2>
                            <p className="text-[10px] text-slate-400 font-medium">Each row = one task the driver/staff must complete</p>
                        </div>
                        <span className="bg-blue-100 text-blue-700 text-[11px] font-black px-2.5 py-1 rounded-full">
                            {tasks.length} {tasks.length === 1 ? "row" : "rows"}
                        </span>
                    </div>

                    {/* Grid Table – scrollable on small screens */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left" style={{ minWidth: "520px" }}>

                            {/* Column Headers */}
                            <thead>
                                <tr className="bg-slate-50/80 border-b border-slate-100">
                                    <th className="px-3 py-2.5 w-8 text-center">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">#</span>
                                    </th>
                                    <th className="px-3 py-2.5">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                            Task Name <span className="text-red-400">*</span>
                                        </span>
                                    </th>
                                    <th className="px-3 py-2.5">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Description</span>
                                    </th>
                                    <th className="px-3 py-2.5 w-32">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                            Time <span className="text-red-400">*</span>
                                        </span>
                                    </th>
                                    <th className="px-3 py-2.5 w-10" />
                                </tr>
                            </thead>

                            {/* Task Rows */}
                            <tbody className="divide-y divide-slate-50">
                                {tasks.map((task, index) => (
                                    <tr
                                        key={task.TripId}
                                        className="group hover:bg-blue-50/30 transition-colors duration-150"
                                    >
                                        {/* Row Number */}
                                        <td className="px-3 py-3 text-center">
                                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-slate-100 text-[10px] font-black text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                                {index + 1}
                                            </span>
                                        </td>

                                        {/* Task Name */}
                                        <td className="px-3 py-3">
                                            <input
                                                type="text"
                                                value={task.name}
                                                onChange={(e) => updateRow(task.TripId, "name", e.target.value)}
                                                placeholder="Enter task name..."
                                                className="w-full bg-transparent border-b-2 border-slate-100 focus:border-blue-500 px-0 py-1 text-sm font-semibold text-slate-800 placeholder:text-slate-300 outline-none transition-colors"
                                            />
                                        </td>

                                        {/* Description */}
                                        <td className="px-3 py-3">
                                            <input
                                                type="text"
                                                value={task.description}
                                                onChange={(e) => updateRow(task.TripId, "description", e.target.value)}
                                                placeholder="Optional notes..."
                                                className="w-full bg-transparent border-b-2 border-slate-100 focus:border-blue-500 px-0 py-1 text-sm text-slate-600 placeholder:text-slate-300 outline-none transition-colors"
                                            />
                                        </td>

                                        {/* Time */}
                                        <td className="px-3 py-3">
                                            <input
                                                type="time"
                                                value={task.time}
                                                onChange={(e) => updateRow(task.TripId, "time", e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-black text-slate-700 outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-500 transition-all"
                                            />
                                        </td>

                                        {/* Remove Button */}
                                        <td className="px-3 py-3 text-center">
                                            <button
                                                onClick={() => removeRow(task.TripId)}
                                                disabled={tasks.length === 1}
                                                title="Remove row"
                                                className={`w-7 h-7 rounded-lg flex items-center justify-center mx-auto transition-all
                          ${tasks.length === 1
                                                        ? "opacity-20 cursor-not-allowed"
                                                        : "text-slate-300 hover:text-red-400 hover:bg-red-50 active:scale-90"}`}
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Add Row Button */}
                    <div className="p-3 border-t border-slate-100 bg-slate-50/50">
                        <button
                            onClick={addRow}
                            className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 text-xs font-black uppercase tracking-wider transition-all hover:gap-3 active:scale-95"
                        >
                            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm shadow-blue-200">
                                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            Add New Row
                        </button>
                    </div>
                </section>

                {/* ── Save Button ── */}
                <div className="space-y-2 pb-6">
                    <button
                        onClick={handleSave}
                        disabled={!isValid || saving}
                        className={`w-full py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all active:scale-[0.98]
              ${isValid && !saving
                                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-200"
                                : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}
                    >
                        {saving ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Saving Trip...
                            </span>
                        ) : saved ? "✓ Trip Saved Successfully!" : "Save Trip & Checklist"}
                    </button>
                    {!isValid && (
                        <p className="text-center text-[11px] text-slate-400 font-medium">
                            Fill Trip Name, Date, and all Task Names + Times to save
                        </p>
                    )}
                </div>

            </main>
        </div>
    );
}
