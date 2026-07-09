"use client";

import React, { useEffect, useState } from 'react';
import InventoryTable from '@/component/InventoryTable';
import { getInventory } from '@/services/inventory.services';
import Link from 'next/link';

interface InventoryItem {
    _id: string;
    item_id: string;
    item_name: string;
    unit: string;
    current_stock: number;
    last_updated: string;
}

const InventoryStatusPage = () => {
    const [items, setItems] = useState<InventoryItem[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const filteredItems = items.filter(item =>
        item.item_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const id = "6a4fe5ee25faa16a764e7b2b";

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const data = await getInventory(id);
                // Assumes the backend returns { success: true, data: [...] }
                console.log("from get invenroty", data.data.items);

                if (data && data.data.items) {
                    setItems(data.data.items);
                } else if (Array.isArray(data)) {
                    setItems(data);
                }
            } catch (err: any) {
                setError(err.message || 'Failed to fetch inventory data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchInventory();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Inventory Status</h1>
                        <p className="mt-2 text-sm text-gray-600">
                            View current stock levels for all mess inventory items.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-full sm:w-64"
                        />
                        <Link href={`/mess/addItems/${id}`}>
                            <button className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 whitespace-nowrap">
                                Add Item
                            </button>
                        </Link>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                        <p>{error}</p>
                    </div>
                )}

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                ) : (
                    <InventoryTable items={filteredItems} />
                )}
            </div>
        </div>
    );
};

export default InventoryStatusPage;
