"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function AddMessPage() {
    const [formData, setFormData] = useState({
        messName: '',
        branchCode: '',
        messType: 'Hostel Mess',
        status: 'Active',
        campusName: '',
        buildingWing: '',
        contactPhone: '',
        contactEmail: '',
        seatingCapacity: '',
        dailyMealCapacity: '',
        servingStyle: 'Buffet',
        managerName: '',
        managerPhone: '',
        fssaiLicense: '',
        monthlyBudget: '',
        notes: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
        }, 800);
    };

    return (
        <div className="min-h-screen bg-slate-50/80 pt-24 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-5xl mx-auto space-y-8">
                
                {/* Navigation / Breadcrumb Header */}
                <div className="flex items-center justify-between">
                    <Link 
                        href="/mess" 
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 bg-white rounded-xl shadow-sm border border-slate-200 hover:border-slate-300 transition-all hover:-translate-x-0.5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Mess Dashboard
                    </Link>

                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100/80 text-orange-700 text-xs font-bold tracking-wider uppercase border border-orange-200/60">
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                        Corporate Registration
                    </div>
                </div>

                {/* Page Title Section */}
                <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/50 border border-slate-200/80 relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-gradient-to-br from-orange-400/10 to-red-500/10 rounded-full blur-2xl pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-red-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/25">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Register New Mess Branch</h1>
                                    <p className="text-slate-500 text-sm font-medium">Onboard a new facility, assign management staff, and set operational parameters.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-2xl border border-slate-200/60 self-start md:self-auto">
                            <div className="px-3 py-1.5 bg-white rounded-xl shadow-xs border border-slate-200 text-xs font-semibold text-slate-700">
                                Step 1 of 1
                            </div>
                            <span className="text-xs font-semibold text-slate-400">Complete Profile</span>
                        </div>
                    </div>
                </div>

                {/* Success Notification */}
                {isSubmitted && (
                    <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-6 shadow-sm flex items-start gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-lg font-bold text-emerald-900">Mess Registered Successfully!</h4>
                            <p className="text-emerald-700 text-sm mt-0.5 font-medium">
                                Branch <span className="font-bold text-emerald-900">{formData.messName || 'New Mess Branch'}</span> has been added to the corporate registry.
                            </p>
                            <div className="mt-4 flex gap-3">
                                <Link 
                                    href="/mess" 
                                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                                >
                                    Return to Mess Dashboard
                                </Link>
                                <button 
                                    type="button" 
                                    onClick={() => setIsSubmitted(false)}
                                    className="px-4 py-2 bg-white hover:bg-emerald-100/50 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold transition-all"
                                >
                                    Register Another Mess
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Form Card */}
                {!isSubmitted && (
                    <form onSubmit={handleSubmit} className="space-y-8">
                        
                        {/* Section 1: General Facility Details */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/40 border border-slate-200/80 space-y-6">
                            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                                <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
                                    1
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Facility Identity & Classification</h2>
                                    <p className="text-xs text-slate-500 font-medium">Basic identifying attributes for system identification</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Mess Name */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                                        Mess Facility Name <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        name="messName" 
                                        required
                                        value={formData.messName}
                                        onChange={handleChange}
                                        placeholder="e.g. ITS Greater Noida Campus Mess"
                                        className="w-full px-4 py-3 bg-slate-50/50 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all"
                                    />
                                </div>

                                {/* Branch Code */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                                        Corporate Branch Code <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        name="branchCode" 
                                        required
                                        value={formData.branchCode}
                                        onChange={handleChange}
                                        placeholder="e.g. MESS-GN-004"
                                        className="w-full px-4 py-3 bg-slate-50/50 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all"
                                    />
                                </div>

                                {/* Mess Type */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                                        Operational Classification
                                    </label>
                                    <select 
                                        name="messType"
                                        value={formData.messType}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-50/50 rounded-xl border border-slate-200 text-slate-900 text-sm font-medium focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all"
                                    >
                                        <option value="Hostel Mess">Hostel Mess</option>
                                        <option value="Executive Dining">Executive Dining</option>
                                        <option value="Campus Canteen">Campus Canteen</option>
                                        <option value="Staff Dining Hall">Staff Dining Hall</option>
                                        <option value="Special Events Mess">Special Events Mess</option>
                                    </select>
                                </div>

                                {/* Initial Status */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                                        Operational Status
                                    </label>
                                    <select 
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-50/50 rounded-xl border border-slate-200 text-slate-900 text-sm font-medium focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all"
                                    >
                                        <option value="Active">Active (Fully Operational)</option>
                                        <option value="Onboarding">Onboarding / Setup Phase</option>
                                        <option value="Under Maintenance">Under Maintenance</option>
                                        <option value="Inactive">Inactive / Suspended</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Location & Address */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/40 border border-slate-200/80 space-y-6">
                            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                                <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
                                    2
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Campus Location & Contact Info</h2>
                                    <p className="text-xs text-slate-500 font-medium">Physical address details and emergency communication channels</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Campus Name */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                                        Campus / Facility Complex <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        name="campusName" 
                                        required
                                        value={formData.campusName}
                                        onChange={handleChange}
                                        placeholder="e.g. ITS Engineering Campus"
                                        className="w-full px-4 py-3 bg-slate-50/50 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all"
                                    />
                                </div>

                                {/* Building / Wing */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                                        Building / Block / Wing
                                    </label>
                                    <input 
                                        type="text" 
                                        name="buildingWing" 
                                        value={formData.buildingWing}
                                        onChange={handleChange}
                                        placeholder="e.g. Block B, Ground Floor"
                                        className="w-full px-4 py-3 bg-slate-50/50 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all"
                                    />
                                </div>

                                {/* Contact Phone */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                                        Desk / Contact Phone
                                    </label>
                                    <input 
                                        type="tel" 
                                        name="contactPhone" 
                                        value={formData.contactPhone}
                                        onChange={handleChange}
                                        placeholder="+91 98765 43210"
                                        className="w-full px-4 py-3 bg-slate-50/50 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all"
                                    />
                                </div>

                                {/* Official Email */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                                        Mess Helpdesk Email
                                    </label>
                                    <input 
                                        type="email" 
                                        name="contactEmail" 
                                        value={formData.contactEmail}
                                        onChange={handleChange}
                                        placeholder="mess.gn@its.edu.in"
                                        className="w-full px-4 py-3 bg-slate-50/50 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Capacity & Operations */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/40 border border-slate-200/80 space-y-6">
                            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                                <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
                                    3
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Capacity & Operational Logistics</h2>
                                    <p className="text-xs text-slate-500 font-medium">Daily throughput metrics and meal distribution model</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Seating Capacity */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                                        Seating Capacity (Seats)
                                    </label>
                                    <input 
                                        type="number" 
                                        name="seatingCapacity" 
                                        value={formData.seatingCapacity}
                                        onChange={handleChange}
                                        placeholder="e.g. 450"
                                        className="w-full px-4 py-3 bg-slate-50/50 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all"
                                    />
                                </div>

                                {/* Daily Meal Capacity */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                                        Daily Meal Service Limit
                                    </label>
                                    <input 
                                        type="number" 
                                        name="dailyMealCapacity" 
                                        value={formData.dailyMealCapacity}
                                        onChange={handleChange}
                                        placeholder="e.g. 1800"
                                        className="w-full px-4 py-3 bg-slate-50/50 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all"
                                    />
                                </div>

                                {/* Serving Style */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                                        Serving Format
                                    </label>
                                    <select 
                                        name="servingStyle"
                                        value={formData.servingStyle}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-50/50 rounded-xl border border-slate-200 text-slate-900 text-sm font-medium focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all"
                                    >
                                        <option value="Buffet">Self-Service Buffet</option>
                                        <option value="Counter Token">Counter Token System</option>
                                        <option value="Table Service">Table Service / Plated</option>
                                        <option value="Packaged Meal">Pre-Packaged Meal Boxes</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Section 4: Management & Compliance */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/40 border border-slate-200/80 space-y-6">
                            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                                <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
                                    4
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Managerial Lead & Regulatory Compliance</h2>
                                    <p className="text-xs text-slate-500 font-medium">Assigned administrative lead and food safety registration</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Manager Name */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                                        Assigned Mess Manager Name <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        name="managerName" 
                                        required
                                        value={formData.managerName}
                                        onChange={handleChange}
                                        placeholder="e.g. Rajesh Sharma"
                                        className="w-full px-4 py-3 bg-slate-50/50 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all"
                                    />
                                </div>

                                {/* Manager Phone */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                                        Manager Direct Phone
                                    </label>
                                    <input 
                                        type="tel" 
                                        name="managerPhone" 
                                        value={formData.managerPhone}
                                        onChange={handleChange}
                                        placeholder="+91 91234 56789"
                                        className="w-full px-4 py-3 bg-slate-50/50 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all"
                                    />
                                </div>

                                {/* FSSAI License */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                                        FSSAI License / Registration No.
                                    </label>
                                    <input 
                                        type="text" 
                                        name="fssaiLicense" 
                                        value={formData.fssaiLicense}
                                        onChange={handleChange}
                                        placeholder="e.g. 10021051000123"
                                        className="w-full px-4 py-3 bg-slate-50/50 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all"
                                    />
                                </div>

                                {/* Monthly Budget */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                                        Allocated Monthly Budget (₹)
                                    </label>
                                    <input 
                                        type="number" 
                                        name="monthlyBudget" 
                                        value={formData.monthlyBudget}
                                        onChange={handleChange}
                                        placeholder="e.g. 500000"
                                        className="w-full px-4 py-3 bg-slate-50/50 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Additional Notes */}
                            <div className="space-y-2 pt-2">
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                                    Special Operations / Facilities Notes
                                </label>
                                <textarea 
                                    name="notes"
                                    rows={3}
                                    value={formData.notes}
                                    onChange={handleChange}
                                    placeholder="Enter any additional remarks, vendor SLAs, dietary restrictions handling, etc."
                                    className="w-full px-4 py-3 bg-slate-50/50 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all resize-none"
                                />
                            </div>
                        </div>

                        {/* Form Submit & Reset Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4">
                            <button 
                                type="button" 
                                onClick={() => setFormData({
                                    messName: '', branchCode: '', messType: 'Hostel Mess', status: 'Active',
                                    campusName: '', buildingWing: '', contactPhone: '', contactEmail: '',
                                    seatingCapacity: '', dailyMealCapacity: '', servingStyle: 'Buffet',
                                    managerName: '', managerPhone: '', fssaiLicense: '',
                                    monthlyBudget: '', notes: ''
                                })}
                                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-700 rounded-2xl text-sm font-bold border border-slate-300 transition-all shadow-sm cursor-pointer"
                            >
                                Reset Form
                            </button>

                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-2xl text-sm font-extrabold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Registering Mess Facility...
                                    </>
                                ) : (
                                    <>
                                        Register Mess Branch
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                )}

            </div>
        </div>
    );
}
