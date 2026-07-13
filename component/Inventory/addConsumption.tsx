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
    handleQuantityChange
  } = useAddConsumption()

  if (isLoading) return <div className="p-6 text-center text-gray-500">Loading items...</div>;
  if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 mt-6 mx-auto max-w-5xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Consumption</h2>

      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-16">S.No</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Item</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-40">Quantity</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-40">Unit</th>
              <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-32">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((row, index) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors duration-150 ease-in-out">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 text-center">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">
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
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={row.quantity}
                    onChange={(e) => handleQuantityChange(row.id, e.target.value)}
                    className="block w-full py-2.5 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow"
                    placeholder="e.g. 5"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    value={row.unit}
                    readOnly
                    className="block w-full py-2.5 px-3 bg-gray-100 border border-gray-200 rounded-md shadow-sm text-gray-500 sm:text-sm cursor-not-allowed"
                    placeholder="Unit"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <div className="flex items-center justify-center space-x-3">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex justify-end">
        <button className="px-6 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
          Submit Consumption
        </button>
      </div>
    </div>
  );
}
