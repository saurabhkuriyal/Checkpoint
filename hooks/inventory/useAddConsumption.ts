
import React, { useState, useEffect } from 'react';
import { getInventory } from '@/services/inventory.services';

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

export default function useAddConsumption() {
    const [items, setItems] = useState<InventoryItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [rows, setRows] = useState<ConsumptionRow[]>([{ id: Date.now(), item_name: '', quantity: '', unit: '' }]);


    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const id = "6a4fe5ee25faa16a764e7b2b";
                const data = await getInventory(id);

                if (data && data.data && data.data.items) {
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

    const handleAddRow = () => {
        setRows([...rows, { id: Date.now(), item_name: '', quantity: '', unit: '' }]);
    };

    const handleRemoveRow = (idToRemove: number) => {
        if (rows.length > 1) {
            setRows(rows.filter(row => row.id !== idToRemove));
        }
    };

    const handleItemChange = (idToUpdate: number, selectedItemName: string) => {
        const selectedItem = items.find(item => item.item_name === selectedItemName);
        setRows(rows.map(row =>
            row.id === idToUpdate
                ? { ...row, item_name: selectedItemName, unit: selectedItem ? selectedItem.unit : '' }
                : row
        ));
    };

    const handleQuantityChange = (idToUpdate: number, quantity: string) => {
        setRows(rows.map(row =>
            row.id === idToUpdate ? { ...row, quantity } : row
        ));
    };

    return {
        items,
        error,
        isLoading,
        rows,
        handleAddRow,
        handleRemoveRow,
        handleItemChange,
        handleQuantityChange
    }
}