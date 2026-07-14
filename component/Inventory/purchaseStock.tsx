"use client";

import React from 'react';
import usePurchaseStock from '@/hooks/inventory/usePurchaseStock';
import AnimatedLoader from '@/component/AnimatedLoader';

export default function PurchaseStock() {
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
  } = usePurchaseStock();

  if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;

  return (
    <>
      {isLoading && <AnimatedLoader />}
      <div className={`p-6 bg-white rounded-xl shadow-lg border border-gray-100 mt-6 mx-auto max-w-5xl ${isLoading ? 'blur-sm pointer-events-none' : ''}`}>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Purchase Stock</h2>

        <div className="mb-8 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 gap-2 md:gap-4 px-2 md:px-6 py-3 bg-white border-b border-gray-100 text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <div className="hidden md:block col-span-1 text-center">S.No</div>
            <div className="col-span-5 md:col-span-4 pl-1">Item</div>
            <div className="col-span-3">Quantity</div>
            <div className="col-span-2">Unit</div>
            <div className="col-span-2 text-center">Actions</div>
          </div>
          
          {/* Rows */}
          <div className="divide-y divide-gray-100 bg-white">
            {rows.map((row, index) => (
              <div key={row.id} className="px-2 py-3 md:p-6 grid grid-cols-12 gap-2 md:gap-4 items-center hover:bg-blue-50/50 transition-colors duration-150 ease-in-out">
                
                {/* Desktop S.No */}
                <div className="hidden md:block col-span-1 text-center text-sm font-medium text-gray-500">
                  {index + 1}
                </div>

                <div className="col-span-5 md:col-span-4">
                  <select
                    value={row.item_name}
                    onChange={(e) => handleItemChange(row.id, e.target.value)}
                    className="block w-full py-2 px-1 md:px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs md:text-sm transition-shadow truncate"
                  >
                    <option value="" disabled>Item...</option>
                    {items && items.map((item) => (
                      <option key={item._id || item.item_id || item.item_name} value={item.item_name}>
                        {item.item_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-3">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={row.quantity}
                    onChange={(e) => handleQuantityChange(row.id, e.target.value)}
                    className="block w-full py-2 px-1 md:px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs md:text-sm transition-shadow"
                    placeholder="Qty"
                  />
                </div>

                <div className="col-span-2">
                  <input
                    type="text"
                    value={row.unit}
                    readOnly
                    className="block w-full py-2 px-1 md:px-3 bg-gray-100 border border-gray-200 rounded-md shadow-sm text-gray-500 text-xs md:text-sm cursor-not-allowed"
                    placeholder="Unit"
                  />
                </div>

                <div className="col-span-2 flex items-center justify-center space-x-1 md:space-x-3">
                  <button
                    onClick={() => handleAddRow()}
                    title="Add Row"
                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-full p-1.5 md:p-2 text-center inline-flex items-center shadow-sm transition-colors"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                  </button>
                  {rows.length > 1 && (
                    <button
                      onClick={() => handleRemoveRow(row.id)}
                      title="Remove Row"
                      className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-full p-1.5 md:p-2 text-center inline-flex items-center shadow-sm transition-colors"
                    >
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" /></svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Invoice / Image</label>
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
            Submit Purchase
          </button>
        </div>
      </div>
    </>
  );
}
