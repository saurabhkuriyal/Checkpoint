import axios from 'axios';
import { API } from "@/constants/api";

export default async function saveRecci(data: any) {
    try {
        console.log("----RECCI", data);

        const response = await axios.post(API.recciSave, data);
        return response.data;
    } catch (error: any) {
        console.error("Error saving RECCI:", error.response?.data || error.message);
        throw error;
    }
}

export async function getAllRecci() {
    try {
        console.log("----RECCI GET ALL");

        const response = await axios.get(API.recciGetAll);
        console.log("Recci data", response.data);

        return response.data;

    } catch (error: any) {
        console.error("Error fetching RECCI tours:", error.response?.data || error.message);
        throw error;
    }
}
