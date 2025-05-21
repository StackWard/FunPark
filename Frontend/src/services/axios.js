import axios from "axios";

const BASE_URL = "http://usereb4064820dba043.app.vtxhub.com/api/v1"

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;