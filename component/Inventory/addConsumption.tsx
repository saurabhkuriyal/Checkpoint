"use client";

import React, { useState, useEffect } from 'react';
import useAddConsumption from '@/hooks/inventory/useAddConsumption';

interface InventoryItem {
  _id: string;
  item_id?: string;
  item_name: string;
  unit: string;
}

interface ConsumptionRow {
  id: number;
  item_name: string;
  quantity: number | string;
  unit: string;
}

export default function AddConsumption() {

  const {
    items,
    error,
    isLoading,
    rows,
    handleAddRow,
    handleRemoveRow,
    handleItemChange,
    handleQuantityChange,
    image,
    setImage,
    handleSubmit
  } = useAddConsumption()

  if (isLoading) return <div className="p-6 text-center text-gray-500">Loading items...</div>;
  if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 mt-6 mx-auto max-w-5xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Consumption</h2>

      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm bg-white">
        {/* Desktop Header */}
        <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
          <div className="col-span-1 text-center">S.No</div>
          <div className="col-span-4">Item</div>
          <div className="col-span-3">Quantity</div>
          <div className="col-span-2">Unit</div>
          <div className="col-span-2 text-center">Actions</div>
        </div>
        
        {/* Rows */}
        <div className="divide-y divide-gray-200">
          {rows.map((row, index) => (
            <div key={row.id} className="p-4 md:p-6 md:grid md:grid-cols-12 md:gap-4 md:items-center hover:bg-gray-50 transition-colors duration-150 ease-in-out flex flex-col gap-4 relative">
              
              {/* Mobile S.No Badge */}
              <div className="md:hidden absolute top-4 right-4 text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
                #{index + 1}
              </div>

              {/* Desktop S.No */}
              <div className="hidden md:block col-span-1 text-center text-sm font-medium text-gray-500">
                {index + 1}
              </div>

              <div className="md:col-span-4 flex flex-col md:block">
                <label className="md:hidden text-xs font-semibold text-gray-600 uppercase mb-1">Item</label>
                <select
                  value={row.item_name}
                  onChange={(e) => handleItemChange(row.id, e.target.value)}
                  className="block w-full py-2.5 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow"
                >
                  <option value="" disabled>Select an item...</option>
                  {items && items.map((item) => (
                    <option key={item._id || item.item_id || item.item_name} value={item.item_name}>
                      {item.item_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-3 flex flex-col md:block">
                <label className="md:hidden text-xs font-semibold text-gray-600 uppercase mb-1">Quantity</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={row.quantity}
                  onChange={(e) => handleQuantityChange(row.id, e.target.value)}
                  className="block w-full py-2.5 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow"
                  placeholder="e.g. 5"
                />
              </div>

              <div className="md:col-span-2 flex flex-col md:block">
                <label className="md:hidden text-xs font-semibold text-gray-600 uppercase mb-1">Unit</label>
                <input
                  type="text"
                  value={row.unit}
                  readOnly
                  className="block w-full py-2.5 px-3 bg-gray-100 border border-gray-200 rounded-md shadow-sm text-gray-500 sm:text-sm cursor-not-allowed"
                  placeholder="Unit"
                />
              </div>

              <div className="md:col-span-2 flex items-center justify-start md:justify-center mt-2 md:mt-0 space-x-3">
                <button
                  onClick={handleAddRow}
                  title="Add Row"
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-full p-2 text-center inline-flex items-center shadow-sm transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                </button>
                {rows.length > 1 && (
                  <button
                    onClick={() => handleRemoveRow(row.id)}
                    title="Remove Row"
                    className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-full p-2 text-center inline-flex items-center shadow-sm transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" /></svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Image</label>
        <input 
          type="file" 
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImage(e.target.files[0]);
            }
          }}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
        {image && <p className="mt-2 text-sm text-gray-600 font-medium">Selected file: {image.name}</p>}
      </div>

      <div className="mt-8 flex justify-end">
        <button 
          onClick={handleSubmit}
          className="px-6 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Submit Consumption
        </button>
      </div>
    </div>
  );
}
