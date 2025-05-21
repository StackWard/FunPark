import { useState } from "react";
import axios from "./axios";

function useAxios() {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchData = async ({ url, method = "GET", headers = {}, body = null }) => {
        setLoading(true);

        try {
            const config = {
                url,
                method,
                headers,
            };

            if (body && method !== "GET") {
                config.data = body;
            }

            const res = await axios(config);
            setData(res.data);
            return res.data;

        } catch (err) {
            setError(err.message || "خطا در دریافت داده‌ها");
            throw err;

        } finally {
            setLoading(false);
        }
    };

    return { fetchData, data, loading, error };
};

export default useAxios;
