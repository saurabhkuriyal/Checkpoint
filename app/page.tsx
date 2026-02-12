"use client";

import axios from "axios";
import { useState } from "react";

interface Task {
  id: string;
  name: string;
  time: string;
  isDone: boolean;
  remarks: string;
  submittedAt?: string;
}

export default function page() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", name: "Vehicle Exterior Wash", time: "07:30", isDone: false, remarks: "" },
    { id: "2", name: "Engine Fluid Check", time: "08:15", isDone: true, remarks: "Oil levels optimal" },
    { id: "3", name: "Interior Sanitization", time: "09:00", isDone: false, remarks: "" },
    { id: "4", name: "Tire Pressure Verification", time: "10:00", isDone: false, remarks: "" },
  ]);

  const [submittingId, setSubmittingId] = useState<string | null>(null);

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const addNewRow = () => {
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      time: "12:00",
      isDone: false,
      remarks: "",
    };
    setTasks([...tasks, newTask]);
  };

  const handleSubmit = async (task: Task) => {
    setSubmittingId(task.id);
    const now = new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });

    const taskData = { ...task, submittedAt: now };
    console.log("Submitting Task Data:", taskData);

    try {
      const response = await axios.post(
        "https://n8n.srv1134060.hstgr.cloud/webhook-test/ee5a691f-2d88-4824-88b5-762346d5b3fe",
        taskData
      );
      console.log("Response:", response.data);
      updateTask(task.id, { submittedAt: now });
      alert(`Task "${task.name || "Untitled"}" submitted successfully at ${now}!`);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Submission failed. Check console for details.");
    } finally {
      setSubmittingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 p-4 md:p-12 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <main className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-14 text-center">
          <div className="inline-block p-2 px-5 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-bold mb-6 animate-fade-in shadow-sm uppercase tracking-widest">
            Task Management System
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-4 bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-500">
            Daily Operations Checklist
          </h1>
          <p className="max-w-2xl mx-auto text-slate-500 text-lg md:text-xl font-medium">
            Manage, track, and submit operational tasks in real-time.
          </p>
        </header>

        {/* Task Table Container */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden animate-slide-up">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 backdrop-blur-md border-b border-slate-100">
                  <th className="px-8 py-7 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Task Description</th>
                  <th className="px-8 py-7 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Scheduled Time</th>
                  <th className="px-8 py-7 text-xs font-black text-slate-400 uppercase tracking-[0.2em] text-center">Status Slider</th>
                  <th className="px-8 py-7 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Additional Remarks</th>
                  <th className="px-8 py-7 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Submitted At</th>
                  <th className="px-8 py-7 text-xs font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tasks.map((task) => (
                  <tr key={task.id} className="group hover:bg-slate-50/50 transition-all duration-300">
                    <td className="px-8 py-8">
                      <input
                        type="text"
                        value={task.name}
                        onChange={(e) => updateTask(task.id, { name: e.target.value })}
                        placeholder="Define task..."
                        className="w-full bg-transparent text-lg font-bold text-slate-800 placeholder:text-slate-300 outline-none focus:text-emerald-600 transition-colors"
                      />
                    </td>
                    <td className="px-8 py-8 text-center">
                      <div className="relative inline-block">
                        <input
                          type="time"
                          value={task.time}
                          onChange={(e) => updateTask(task.id, { time: e.target.value })}
                          className="bg-slate-100/80 border border-slate-200 text-slate-700 px-4 py-2 rounded-2xl text-sm font-black outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all appearance-none cursor-pointer hover:bg-white"
                        />
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <div className="flex flex-col items-center gap-2">
                        <label className="relative inline-flex items-center cursor-pointer select-none">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={task.isDone}
                            onChange={(e) => updateTask(task.id, { isDone: e.target.checked })}
                          />
                          <div className="w-20 h-9 bg-slate-200 rounded-full peer peer-checked:bg-emerald-500 transition-all duration-500 ease-in-out shadow-inner relative ring-4 ring-slate-100 peer-checked:ring-emerald-50/50">
                            <div className="absolute inset-0 flex items-center justify-between px-2 text-[10px] font-black uppercase text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-300">
                              <span>Done</span>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-end px-2 text-[10px] font-black uppercase text-slate-400 peer-checked:opacity-0 transition-opacity duration-300">
                              <span>Pending</span>
                            </div>
                            <div className="absolute top-[3px] left-[3px] bg-white w-[30px] h-[30px] rounded-full transition-all duration-500 ease-in-out shadow-lg peer-checked:translate-x-[44px] flex items-center justify-center">
                              {task.isDone ? (
                                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                              )}
                            </div>
                          </div>
                        </label>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <div className="relative">
                        <textarea
                          rows={1}
                          value={task.remarks}
                          onChange={(e) => updateTask(task.id, { remarks: e.target.value })}
                          placeholder="Observation details..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-medium outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all placeholder:text-slate-400 resize-none overflow-hidden"
                        />
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      {task.submittedAt ? (
                        <div className="flex flex-col">
                          <span className="text-emerald-600 font-black text-sm">{task.submittedAt}</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Verified Submission</span>
                        </div>
                      ) : (
                        <span className="text-slate-300 text-xs font-bold italic">Not yet submitted</span>
                      )}
                    </td>
                    <td className="px-8 py-8 text-right">
                      <button
                        onClick={() => handleSubmit(task)}
                        disabled={submittingId !== null}
                        className={`group relative overflow-hidden px-8 py-3.5 rounded-2xl font-black text-sm tracking-widest uppercase transition-all active:scale-95 ${submittingId === task.id
                          ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                          : "bg-slate-900 hover:bg-emerald-600 text-white shadow-xl shadow-slate-200 hover:shadow-emerald-200/50"
                          }`}
                      >
                        <span className={`flex items-center gap-3 ${submittingId === task.id ? "opacity-0" : "opacity-100"}`}>
                          {task.submittedAt ? "Update" : "Submit"}
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                        {submittingId === task.id && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-5 h-5 border-3 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                          </div>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Add Action */}
          <div className="bg-slate-50/50 p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-100">
            <button
              onClick={addNewRow}
              className="flex items-center gap-4 bg-white border-2 border-slate-200 hover:border-emerald-500 hover:text-emerald-600 text-slate-500 px-8 py-4 rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all shadow-sm hover:shadow-lg active:scale-95 group"
            >
              <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              Insert New Task Entry
            </button>
            <div className="flex items-center gap-10">
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Queue Status</p>
                <p className="text-lg font-black text-slate-800 tracking-tight">
                  {tasks.filter(t => t.isDone).length} / {tasks.length} Completed
                </p>
              </div>
              <div className="h-12 w-[1px] bg-slate-200 hidden md:block" />
              <div className="hidden md:block">
                <div className="w-32 h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-1000"
                    style={{ width: `${(tasks.filter(t => t.isDone).length / tasks.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes fade-in { 
          from { opacity: 0; transform: translateY(-10px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        @keyframes slide-up { 
          from { opacity: 0; transform: translateY(30px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        .animate-fade-in { animation: fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-up { animation: slide-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { 
          background: #cbd5e1; 
          border-radius: 10px; 
          border: 3px solid #f1f5f9;
        }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
}
