import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : initialValue;
        } catch (err) {
            console.error("Error reading localStorage:", err);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (err) {
            console.error("Error saving to localStorage:", err);
        }
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;