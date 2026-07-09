import { getInventory } from "@/services/inventory.services";

export const API = {
    signup: "http://localhost:4000/api/v1/auth/signup",
    login: "http://localhost:4000/api/v1/auth/login",
    // inventory: "http://localhost:4000/api/v1/mess/updatestock"
    inventory: "http://localhost:3000/api/mess/putstock",
    getInventory: "http://localhost:3000/api/mess/getStock"
}