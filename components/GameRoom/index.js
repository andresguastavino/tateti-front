import { useState } from 'react';
import { SocketIoContext } from '../../hooks/SocketIoContex';
import useSocketIo from '../../hooks/useSocketIo';
import Test from '../Test';
import Login from '../LoginForm';

export default function GameRoom () {

    const [ username, setUsername ] = useState('');

    const socketIo = useSocketIo('http://localhost:3001');

    return (
        <SocketIoContext.Provider value={ socketIo }>
            {
                !username.length && <Login setUsername={setUsername} />
            }
            {
                username.length && <Test username={username} />
            }
        </SocketIoContext.Provider>
    );
}