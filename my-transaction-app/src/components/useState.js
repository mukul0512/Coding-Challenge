import { useState } from 'react';

const useStateWithLocalStorage = (localStorageKey, initialValue) => {
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(localStorageKey);
        return storedValue !== null ? JSON.parse(storedValue) : initialValue;
    });

    const setValueWithLocalStorage = (newValue) => {
        setValue(newValue);
        localStorage.setItem(localStorageKey, JSON.stringify(newValue));
    };

    return [value, setValueWithLocalStorage];
};

export default useStateWithLocalStorage;
