import axios from 'axios';
import { API } from "@/constants/api";
import { defaultInventoryItems } from "@/public/inventory.data";

export const getInventory = async () => {
    try {
        console.log("reacher here in inventory service");

        const data = defaultInventoryItems
        const response = await axios.post(API.inventory, data);
        console.log("response", response);

        return response.data;
    } catch (error: any) {
        console.error("Error fetching inventory:", error.response?.data || error.message);
        throw error;
    }
};
