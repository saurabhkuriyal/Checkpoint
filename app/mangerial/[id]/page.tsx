"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Task {
    id?: string;
    _id?: string;
    sNo?: number;
    name: string;
    description: string;
    time: string;
    status?: boolean;
    evidence?: string | null;
    evidence2?: string | null;
    submittedAt?: string;
    userRemark?: string;
    isNew?: boolean; // Indicates if this task was newly added by the user
}

interface TaskGroup {
    _id: string;
    groupId: string;
    date: string;
    tasks: Task[];
}

export default function Page() {
    const newId = useParams();
    console.log("New id is-=-=-==-=-=-=-=-=-= ", newId.id);
    
    const [tripName, setTripName] = useState<string>("");
    const [tripId, setTripId] = useState<string>("");
    const [groups, setGroups] = useState<TaskGroup[]>([]);
    const [selectedGroupIndex, setSelectedGroupIndex] = useState<number>(0);
    const tasks = groups[selectedGroupIndex]?.tasks || [];
    const [firstImage, setFirstImage] = useState<File | null>(null);
    const [secondImage, setSecondImage] = useState<File | null>(null);

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const response = await axios.get(`/api/get_trip/${newId.id}`);
                console.log("Response:-------", response.data);
                const thisTripId = response.data.trip._id;
                setTripId(thisTripId);
                console.log("Trip-----", response.data.trip.groups);
                setGroups(response.data.trip.groups);
                if (response.data.trip.groups && response.data.trip.groups.length > 0) {
                    setSelectedGroupIndex(0);
                }
            } catch (error) {
                console.error("Error fetching trip:", error);
            }
        };
        fetchTrip();
    }, [newId.id]);

    const [submittingId, setSubmittingId] = useState<string | null>(null);

    const updateTask = (id: string, updates: Partial<Task>) => {
        setGroups((prev) => prev.map((group, idx) => {
            if (idx === selectedGroupIndex) {
                return {
                    ...group,
                    tasks: group.tasks.map((task) => (task.id === id || task._id === id ? { ...task, ...updates } : task))
                };
            }
            return group;
        }));
    };

    const handleFileUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>, imageIndex: number = 1) => {
        const file = e.target.files?.[0];
        console.log("filess", file);

        if (file) {
            if (imageIndex === 1) {
                updateTask(id, { evidence: file.name });
                setFirstImage(file)
            } else {
                updateTask(id, { evidence2: file.name });
                setSecondImage(file)
            }
        }
    };

    const handleSubmit = async (task: Task) => {
        console.log("Got hitted ihihihihihih");

        const taskId = task.id || task._id || '';
        setSubmittingId(taskId);
        const now = new Date().toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });

        const taskData = { ...task, submittedAt: now };
        
        const formData = new FormData();
        formData.append("taskData", JSON.stringify(taskData));
        if (firstImage) formData.append("firstImage", firstImage);
        if (secondImage) formData.append("secondImage", secondImage);

        console.log("Here is the formData", formData);

        try {
            const response = await axios.post(
                "/api/task-submission",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    params: {
                        tripId: tripId
                    }
                }
            );
            console.log("Response:", response.data);
            updateTask(taskId, { submittedAt: now });
            alert(`Task "${task.name || "Untitled"}" submitted successfully at ${now}!`);
        } catch (error) {
            console.error("Submission error:", error);
            alert("Submission failed. Check console for details.");
        } finally {
            setSubmittingId(null);
        }
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption: number = Number(e.target.value);
        if (selectedOption !== -1) {
            setSelectedGroupIndex(selectedOption);
        }
    };

    const addNewRow = () => {
        setGroups((prev) => prev.map((group, idx) => {
            if (idx === selectedGroupIndex) {
                const newTask: Task = {
                    id: `temp-${Date.now()}`,
                    sNo: group.tasks.length + 1,
                    name: "",
                    description: "",
                    time: "",
                    isNew: true
                };
                return {
                    ...group,
                    tasks: [...group.tasks, newTask]
                };
            }
            return group;
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/80 text-zinc-900 p-2 sm:p-4 md:p-8 lg:p-12 font-sans selection:bg-indigo-200 selection:text-indigo-900 transition-all duration-500 overflow-x-hidden">
            <style>{`
                @keyframes slideFadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slide-fade {
                    animation: slideFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .stagger-1 { animation-delay: 0.1s; opacity: 0; }
                .stagger-2 { animation-delay: 0.2s; opacity: 0; }
                .stagger-3 { animation-delay: 0.3s; opacity: 0; }
            `}</style>
            <main className="max-w-7xl mx-auto animate-slide-fade">
                {/* Header Section */}
                <header className="mb-8 md:mb-14 text-center transform hover:scale-[1.01] transition-transform duration-500 px-2">
                    <div className="inline-block px-4 md:px-5 py-1.5 md:py-2 rounded-full bg-white/80 backdrop-blur-sm border border-indigo-100 text-indigo-600 text-[10px] md:text-xs font-bold mb-4 md:mb-6 shadow-sm tracking-wide uppercase letter-spacing-widest">
                        Operations Dashboard
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 mb-3 md:mb-4 pb-1 md:pb-2 drop-shadow-sm">
                        Megha Catereres Manager Task Checklist
                    </h1>
                    <p className="max-w-xl mx-auto text-zinc-600 text-sm md:text-base font-medium">
                        Complete your assigned tasks, upload evidence, and submit for verification.
                    </p>
                </header>

                <div className="mb-6 flex justify-end animate-slide-fade stagger-1">
                    <select
                        className="border border-indigo-100 rounded-xl h-10 px-4 text-sm font-medium text-zinc-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 bg-white shadow-sm hover:border-indigo-300 transition-all duration-300 cursor-pointer"
                        onChange={handleSelectChange}
                        value={selectedGroupIndex}
                    >
                        {groups.length === 0 && <option value="-1">Loading dates...</option>}
                        {groups.map((group, idx) => (
                            <option key={group.groupId || idx} value={idx}>
                                {new Date(group.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Panel Container */}
                <div className="animate-slide-fade stagger-2 transition-all duration-300">
                    <div className="overflow-x-auto pb-8 px-2 -mx-2">
                        <table className="w-full text-left border-separate border-spacing-y-4">
                            <thead>
                                <tr className="text-[10px] md:text-xs font-extrabold text-indigo-900/50 uppercase tracking-widest">
                                    <th className="sticky left-0 z-20 px-3 md:px-6 py-3 whitespace-nowrap min-w-[40px] md:min-w-[80px]">S.No.</th>
                                    <th className=" left-[40px] md:left-[80px] z-20 px-4 md:px-6 py-3 whitespace-nowrap min-w-[140px] md:min-w-[180px]">Task Name</th>
                                    <th className="px-4 md:px-6 py-3 whitespace-nowrap min-w-[160px] md:min-w-[200px]">Description</th>
                                    <th className="px-4 md:px-6 py-3 whitespace-nowrap text-center">Status</th>
                                    <th className="px-4 md:px-6 py-3 whitespace-nowrap text-center">Time</th>
                                    <th className="px-4 md:px-6 py-3 whitespace-nowrap min-w-[150px]">Remarks</th>
                                    <th className="px-4 md:px-6 py-3 whitespace-nowrap text-center">Evidence</th>
                                    <th className="px-4 md:px-6 py-3 whitespace-nowrap text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {tasks.map((task, idx) => {
                                    const taskId = task.id || task._id || `task-${idx}`;
                                    return (
                                        <tr key={taskId} className="group transition-all duration-500 hover:-translate-y-1 drop-shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:drop-shadow-[0_12px_28px_rgba(79,70,229,0.15)] relative">
                                            <td className="sticky left-0 z-10 bg-white/95 backdrop-blur-md group-hover:bg-white px-3 md:px-6 py-4 md:py-5 text-zinc-400 font-medium min-w-[40px] md:min-w-[80px] transition-colors duration-300 rounded-l-xl md:rounded-l-2xl border-y border-l border-white/60 group-hover:border-indigo-100">
                                                <div className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600 text-[10px] md:text-xs font-bold shadow-inner">
                                                    {task.sNo || idx + 1}
                                                </div>
                                            </td>

                                            <td className="left-[40px] md:left-[80px] z-10 bg-white/95 backdrop-blur-md group-hover:bg-white px-4 md:px-6 py-4 md:py-5 min-w-[140px] md:min-w-[180px] transition-colors duration-300 border-y border-white/60 group-hover:border-indigo-100">
                                                {task.isNew ? (
                                                    <input
                                                        type="text"
                                                        value={task.name}
                                                        onChange={(e) => updateTask(taskId, { name: e.target.value })}
                                                        placeholder="Task Name"
                                                        className="w-full bg-indigo-50/30 rounded-lg px-3 py-2 text-zinc-800 font-bold placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white transition-all"
                                                    />
                                                ) : (
                                                    <span className="font-bold text-zinc-800 text-[15px]">{task.name}</span>
                                                )}
                                            </td>

                                            <td className="px-4 md:px-6 py-4 md:py-5 bg-white/95 backdrop-blur-md group-hover:bg-white transition-colors duration-300 border-y border-white/60 group-hover:border-indigo-100">
                                                {task.isNew ? (
                                                    <textarea
                                                        rows={1}
                                                        value={task.description}
                                                        onChange={(e) => updateTask(taskId, { description: e.target.value })}
                                                        placeholder="Task Description"
                                                        className="w-full min-w-[140px] bg-indigo-50/30 rounded-lg px-3 py-2 text-zinc-600 text-[13px] md:text-sm placeholder:text-zinc-400 outline-none resize-none overflow-hidden focus:ring-2 focus:ring-indigo-300 focus:bg-white transition-all"
                                                    />
                                                ) : (
                                                    <span className="text-zinc-500 text-[13px] md:text-sm block min-w-[140px] max-w-[250px] line-clamp-2 leading-relaxed" title={task.description}>
                                                        {task.description}
                                                    </span>
                                                )}
                                            </td>

                                            <td className="px-4 md:px-6 py-4 md:py-5 bg-white/95 backdrop-blur-md group-hover:bg-white transition-colors duration-300 border-y border-white/60 group-hover:border-indigo-100 text-center">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only peer"
                                                        checked={task.status === true}
                                                        onChange={(e) => updateTask(taskId, { status: e.target.checked })}
                                                    />
                                                    <div className="w-9 h-5 md:w-11 md:h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 md:after:h-5 md:after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-indigo-500 peer-checked:to-purple-500 shadow-inner"></div>
                                                </label>
                                            </td>

                                            <td className="px-4 md:px-6 py-4 md:py-5 bg-white/95 backdrop-blur-md group-hover:bg-white transition-colors duration-300 border-y border-white/60 group-hover:border-indigo-100 text-center">
                                                {task.isNew ? (
                                                    <input
                                                        type="text"
                                                        value={task.time}
                                                        onChange={(e) => updateTask(taskId, { time: e.target.value })}
                                                        placeholder="10:00 AM"
                                                        className="w-20 md:w-24 text-center mx-auto bg-indigo-50/30 rounded-lg px-1 md:px-2 py-1.5 text-zinc-600 text-[13px] md:text-sm font-medium placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white transition-all"
                                                    />
                                                ) : (
                                                    <span className="inline-block px-2 md:px-3 py-1 bg-zinc-50 text-zinc-600 font-semibold text-[10px] md:text-xs rounded-full border border-zinc-200 shadow-sm whitespace-nowrap">{task.time}</span>
                                                )}
                                            </td>

                                            <td className="px-4 md:px-6 py-4 md:py-5 bg-white/95 backdrop-blur-md group-hover:bg-white transition-colors duration-300 border-y border-white/60 group-hover:border-indigo-100">
                                                <textarea
                                                    rows={1}
                                                    value={task.userRemark || ''}
                                                    onChange={(e) => updateTask(taskId, { userRemark: e.target.value })}
                                                    placeholder="Add remarks..."
                                                    className="w-full min-w-[120px] bg-zinc-50/50 hover:bg-zinc-50 focus:bg-white rounded-lg px-2 md:px-3 py-1.5 md:py-2 text-[13px] md:text-sm text-zinc-800 placeholder:text-zinc-400 outline-none resize-none overflow-hidden focus:ring-2 focus:ring-indigo-200 transition-all border border-transparent focus:border-indigo-100"
                                                />
                                            </td>

                                            <td className="px-4 md:px-6 py-4 md:py-5 bg-white/95 backdrop-blur-md group-hover:bg-white transition-colors duration-300 border-y border-white/60 group-hover:border-indigo-100 text-center">
                                                <div className="flex justify-center items-center gap-1 md:gap-2">
                                                    <label className="cursor-pointer group flex flex-col items-center gap-1">
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => handleFileUpload(taskId, e, 1)}
                                                            className="hidden"
                                                        />
                                                        {task.evidence ? (
                                                            <div className="px-2 md:px-3 py-1 md:py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] md:text-xs font-medium flex items-center gap-1 md:gap-2 border border-indigo-100 hover:bg-indigo-100 transition-colors" title={task.evidence}>
                                                                <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                                                <span className="max-w-[40px] md:max-w-[60px] truncate">{task.evidence}</span>
                                                            </div>
                                                        ) : (
                                                            <div className="p-1.5 md:p-2 text-zinc-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-xl transition-all border border-transparent hover:border-indigo-100">
                                                                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                                            </div>
                                                        )}
                                                    </label>
                                                    <label className="cursor-pointer group flex flex-col items-center gap-1">
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => handleFileUpload(taskId, e, 2)}
                                                            className="hidden"
                                                        />
                                                        {task.evidence2 ? (
                                                            <div className="px-2 md:px-3 py-1 md:py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] md:text-xs font-medium flex items-center gap-1 md:gap-2 border border-indigo-100 hover:bg-indigo-100 transition-colors" title={task.evidence2}>
                                                                <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                                                <span className="max-w-[40px] md:max-w-[60px] truncate">{task.evidence2}</span>
                                                            </div>
                                                        ) : (
                                                            <div className="p-1.5 md:p-2 text-zinc-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-xl transition-all border border-transparent hover:border-indigo-100">
                                                                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                                            </div>
                                                        )}
                                                    </label>
                                                </div>
                                            </td>

                                            <td className="px-4 md:px-6 py-4 md:py-5 bg-white/95 backdrop-blur-md group-hover:bg-white transition-colors duration-300 rounded-r-xl md:rounded-r-2xl border-y border-r border-white/60 group-hover:border-indigo-100 text-right">
                                                <button
                                                    onClick={() => handleSubmit(task)}
                                                    className={`relative px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl font-bold text-[10px] md:text-xs transition-all duration-300 transform ${task.submittedAt
                                                        ? "bg-zinc-50 text-zinc-400 cursor-not-allowed border border-zinc-200 shadow-inner"
                                                        : submittingId === taskId
                                                            ? "bg-indigo-100 text-indigo-400 cursor-not-allowed animate-pulse"
                                                            : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-200/50 hover:shadow-indigo-400/50 hover:-translate-y-0.5 active:scale-95 active:translate-y-0"
                                                        }`}
                                                >
                                                    {task.submittedAt ? "Submitted" : submittingId === taskId ? "Submitting..." : "Submit"}
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer */}
                    <div className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl shadow-2xl shadow-indigo-100/40 p-6 flex flex-col md:flex-row items-center justify-between gap-4 mt-2">
                        <button
                            onClick={addNewRow}
                            className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-white transition-all duration-300 px-5 py-2.5 rounded-xl hover:bg-indigo-600 bg-indigo-50 hover:shadow-lg hover:shadow-indigo-200/50 hover:-translate-y-0.5 active:translate-y-0 group"
                        >
                            <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                            Add Task Record
                        </button>

                        <div className="flex items-center gap-4 text-sm font-medium text-zinc-500">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                                <span>{tasks.filter(t => t.status === true).length} of {tasks.length} Completed</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
