import { resolve } from "path";
import axios from 'axios'
import { API } from "@/constants/api"

export default async function Login(data: any) {
    try {

        console.log("Hitting here");

        const response = await axios.post("something", data)

        console.log("Login respoonse", response);

    } catch (error) {
        console.error("error", error)
        return error
    }
}