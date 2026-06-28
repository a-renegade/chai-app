import axios from "axios"

const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
const normalizedBaseUrl = apiBaseUrl.replace(/\/$/, "");
const baseURL = normalizedBaseUrl.endsWith("/chaiShop/api")
    ? normalizedBaseUrl
    : `${normalizedBaseUrl}/chaiShop/api`;

export const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
})
