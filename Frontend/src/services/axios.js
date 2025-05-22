import axios from "axios";

const BASE_URL = "http://YOUR_API/api/v1"

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;