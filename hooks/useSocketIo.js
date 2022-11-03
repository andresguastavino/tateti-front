import { useState, useEffect } from 'react';
import io from 'socket.io-client';

export default function useSocketIo (endpoint) {
    
    const [ socket, setSocket ] = useState(null);
    const [ isConnected, setIsConnected ] = useState(false);

    useEffect(() => {
        const socket = io(endpoint);
        setSocket(socket);

        socket.on('connect', () => {
            setIsConnected(true);
        });
      
        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect'); 
        }
    }, []);

    const updateSocket = updatedSocket => setSocket(updatedSocket);

    return { socket, isConnected, updateSocket };
}