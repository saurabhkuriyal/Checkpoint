"use client";

import React, { useEffect, useState } from 'react';
import InventoryTable from '@/component/InventoryTable';
import { getInventory } from '@/services/inventory.services';

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
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const data = await getInventory();
                // Assumes the backend returns { success: true, data: [...] }
                if (data && data.data) {
                    setItems(data.data);
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
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Inventory Status</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        View current stock levels for all mess inventory items.
                    </p>
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
                    <InventoryTable items={items} />
                )}
            </div>
        </div>
    );
};

export default InventoryStatusPage;
