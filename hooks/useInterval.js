import { useState, useEffect } from 'react';

export default function useInterval (callback) {
    
    const [ intervalId, setIntervalId ] = useState(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if(callback()) {
                clearInterval(intervalId);
            }
        }, 100);
        setIntervalId(intervalId);
    }, []);
}