import { useState, useEffect, useContext, useRef } from 'react';
import { SocketIoContext } from '../../hooks/SocketIoContex';

export default function Test({ username }) {

    const [ messages, setMessages ] = useState([]);

    const { socket, isConnected, updateSocket } = useContext(SocketIoContext);

    const handleNewMessage = (message) => {
        setMessages(currentMessages => {
            return [
                ...currentMessages,
                message
            ]
        });
    }

    useEffect(() => {
        if(!socket) return;
        socket.on('message', handleNewMessage);
        updateSocket(socket);   
    }, [socket]);

    useEffect(() => {
        console.log(messages);
    }, [messages]);

    return (
        <>
            <h1>
                { isConnected ? 'Connected' : 'Disconnected' }
            </h1>
            <div>
                {
                    messages.length && messages.map((message, i) => (
                        <div key={ i }>{ message }</div>
                    ))
                }
            </div>
            <div>
                <button onClick={() => {
                    socket.emit('join_queue', username);
                }}>Click me to join room</button>
            </div>
            {/* <button onClick={() => {
                socket.emit('request', 'no payload xd');
            }}>Click me to send request</button> */}
        </>
    );
}