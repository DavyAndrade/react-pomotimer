import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        const savedItem = localStorage.getItem(key);

        if (!savedItem) {
            return initialValue;
        }

        try {
            return JSON.parse(savedItem);
    } catch (error) {
            console.error("Error loading from localStorage", error);
            return initialValue;
        }
    });

    const setValue = (value: T) => {
        try {
            setStoredValue(value);
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Error saving to localStorage", error);
        }
    }

    return [storedValue, setValue] as const;
}