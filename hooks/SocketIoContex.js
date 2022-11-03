import { createContext } from 'react';

export const SocketIoContext = createContext({
    socket: null,
    isConnected: false
});