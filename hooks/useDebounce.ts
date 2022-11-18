import { useEffect, useState } from "react";

const useDebounce = (value: string, delay = 300): string => {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => {
            clearTimeout(debounceTimeout);
        };
    }, [value, delay]);

    return debounceValue;
};

export default useDebounce;
